"""Rebuild web media from the existing release assets staged in a directory.
Usage: python scripts/prepare_media.py /tmp/gowtham-source-media
Originals are never changed. Requires ffmpeg and ffprobe.
"""
import concurrent.futures
import hashlib
import json
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
STAGING = Path(sys.argv[1])
ASSETS = [
    ('juices', 'juices_preview_fast.mp4'),
    ('crime', 'crime_doc_preview.mp4'),
    ('trading', 'trading_preview.mp4'),
    ('pawn', 'pawn_stars_fast.mp4'),
    ('basketball', 'basketballv2F.mp4'),
]
BASE = 'https://github.com/gowthambirru/gowthambirru.github.io/releases/download/v-media/'

def probe(path):
    return json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', str(path)]))

def encode(item):
    slug, filename = item
    source = STAGING / filename
    output = ROOT / 'public' / 'videos' / f'{slug}.mp4'
    preview = output.with_name(f'{slug}-loop.mp4')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(source), '-map', '0:v:0', '-map', '0:a:0?',
        '-vf', "scale=w='min(1280,iw)':h='min(720,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2,setsar=1",
        '-c:v', 'libx264', '-preset', 'fast', '-crf', '23', '-maxrate', '2200k', '-bufsize', '4400k',
        '-pix_fmt', 'yuv420p', '-r', '30', '-c:a', 'aac', '-b:a', '96k', '-ac', '2', '-movflags', '+faststart',
        '-threads', '2', str(output)], check=True)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', '3', '-i', str(output), '-t', '8', '-an',
        '-vf', "scale=w='min(640,iw)':h='min(480,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2",
        '-c:v', 'libx264', '-preset', 'fast', '-crf', '27', '-maxrate', '600k', '-bufsize', '1200k',
        '-pix_fmt', 'yuv420p', '-r', '24', '-movflags', '+faststart', '-threads', '2', str(preview)], check=True)
    details = probe(output)
    video = next(stream for stream in details['streams'] if stream['codec_type'] == 'video')
    record = dict(id=slug, source=BASE+filename, original_bytes=source.stat().st_size,
        path=f'videos/{output.name}', bytes=output.stat().st_size, duration=float(details['format']['duration']),
        width=video['width'], height=video['height'], codec=video['codec_name'], pixel_format=video['pix_fmt'],
        sha256=hashlib.sha256(output.read_bytes()).hexdigest(), preview=f'videos/{preview.name}', preview_bytes=preview.stat().st_size)
    print(json.dumps(record), flush=True)
    return record

with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
    records = list(pool.map(encode, ASSETS))
manifest = {'videos': records}
audio_source = STAGING / 'yukitoki.webm'
if audio_source.exists():
    duration = float(probe(audio_source)['format']['duration'])
    audio_output = ROOT / 'public' / 'audio' / 'yukitoki-instrumental.m4a'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(audio_source), '-vn',
        '-af', f'afade=t=in:d=1.2,afade=t=out:st={duration-2}:d=2',
        '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', str(audio_output)], check=True)
    manifest['audio'] = dict(source='https://www.youtube.com/watch?v=y_HdvkRYMfE',
        title='Oregairu OP KARAOKE | Yukitoki - Yanagi Nagi (Instrumental/Lyrics)',
        path='audio/yukitoki-instrumental.m4a', bytes=audio_output.stat().st_size,
        duration=float(probe(audio_output)['format']['duration']),
        processing='AAC 128 kbps; 1.2s fade in and 2s fade out; full duration preserved')
(ROOT / 'public' / 'media-manifest.json').write_text(json.dumps(manifest, indent=2)+'\n')
