# Gowtham — a continuous editing sequence

Prepared 24 September 2026, before implementation.

## Intent and boundaries

Keep the Oregairu setting, black/cyan palette, Jersey 10 pixel headlines, editing-room details, existing projects, and straightforward client-facing language. Take spatial continuity and response to input from the Lusion reference, not its branding or copy. Build on the existing dirty checkout; do not reset earlier work. No deployment is included.

The experience should feel like moving through one sequence. Motion earns its place by showing where something came from, where it went, or what the visitor just changed. Reading areas stay still.

## Observed baseline

- React 18 / Vite 5, GSAP and Motion are already installed. The production build passes, with a 609 kB main JS chunk warning.
- Video sources depend on Catbox and GitHub release redirects. Catbox did not answer a 20-second probe. Release preview files are large (roughly 45–159 MB each).
- The player changes child source elements without explicitly reloading the video, hides rejected play promises, and has no useful source-error recovery.
- Playback UI can drift from native playback events. Keyboard shortcuts, duplicate vertical/wide controls and animation effects are intertwined.
- The supplied card rectangle is unused by the modal. Opening and closing scale from the center regardless of the clicked location.
- The typewriter changes headline width and starts blank. Equal-width gallery columns make portrait cards disproportionately tall.
- A full-screen fake loading sequence delays access. Multiple unrelated hover scales, springs, glows, border animations and a hidden native cursor compete for attention.
- Copy actions claim success before clipboard writes resolve. The modal lacks complete focus containment and return.

## Layout

### 00 — Opening / hero

- Full-height atmospheric scene with the existing artwork still recognizable; darken behind text, not uniformly over the entire image.
- A left-aligned large `EDITING FOR` / `STORIES.` headline with the existing formats available through explicit format controls. Reserve headline space; use a short vertical word replacement rather than character deletion.
- Keep the five-years experience statement in plain language.
- Two primary paths: watch the work and commission an edit. Put the email with contact instead of a third competing hero button.
- On desktop, an offset preview monitor on the right shows the selected edit. A short clip strip under the monitor changes that preview and its title together. Clicking its play control opens that exact project from that frame.
- On mobile, text then monitor, then the same strip. No hover-only functions.
- One narrow bottom sequence rail acts as section navigation and page progress; no second floating icon dock.

### 01 — Selected work

- Header with a small sequence number, `WORK.` and the existing short description.
- Filter buttons have real pressed states and one moving active treatment. The same cards retain identity during filtering.
- The first landscape project leads across the full width with a restrained caption beside it. Supporting landscape edits form a pair. Two portrait edits sit in a compact pair, with aspect ratio preserved and deliberate height limits.
- No tiny image hidden inside layers of nested rounded boxes. Use image, thin frame, index, title and plain description.
- Pointer/focus previews are muted, optional, and stop when no longer relevant. Posters remain usable when autoplay or data-saving prevents playback.

### 02 — Editing craft

- Replace oversized generic bento tiles with a two-column editing desk: short tools list on one side; an accordion of concrete editing skills on the other.
- One item opens at a time, from the row clicked. Expanded content names what the client gets and links to relevant existing work.
- Keep CapCut, Premiere Pro and After Effects. Do not invent services, clients, metrics or capabilities.

### 03 — Contact

- Large `LET'S MAKE THE CUT.` ending, a short availability sentence and two clear contact channels.
- Email opens the mail app. Explicit copy controls display success only after the write succeeds; failed writes leave the address visible and give useful feedback.
- Quiet copyright and return-to-top action. Enough clearance for the persistent rail.

## Motion system

| Interaction | Relationship | Timing |
| --- | --- | --- |
| Button / focus response | Color and 2–4 px directional icon shift | 160–220 ms |
| Format / preview switch | Old and new occupy the same monitor; caption changes with image | 240–320 ms |
| Filter | Stable project identities move to their new positions | 420 ms |
| Open project | Selected media bounds grow into the player frame | 480 ms |
| Close project | Frame returns to its current source bounds; short fade if source is offscreen | 360–420 ms |
| Previous / next project | Short horizontal movement in the chosen direction inside the same player | 260 ms |
| Section arrival | Small bottom-to-top mask / 20 px rise, once | 480–560 ms |
| Scroll | Native scroll, continuously linked progress; restrained artwork depth | Direct input |

Use one decelerating curve for entrances and responses. Reverse spatial paths for closing. Animate transforms and opacity rather than layout on every scroll tick. Use one motion owner per element. Do not hijack wheel/touch scroll or pin a long sequence. Avoid automatic rotating headlines and perpetual decorative movement. Reduced motion disables spatial transitions, preview autoplay and background drift while preserving every action.

## Media repair

1. Download the project's existing release assets into a temporary staging directory, leaving remote originals untouched.
2. Inspect codecs, dimensions and durations with ffprobe.
3. Make same-origin H.264 / yuv420p MP4 web copies with AAC audio, a front-loaded metadata atom (`faststart`), and a sensible 720p-class resolution/bitrate. Preserve source duration; accurately label the longer edits as previews.
4. Generate small silent loop excerpts for the hero and hover previews, plus first-frame posters only where useful. Never fetch all full videos on page load.
5. One native video element per open project with native accessible controls. Key its media session by project/source so switching always loads the requested file.
6. Drive state from `playing`, `pause`, `waiting`, `canplay`, `ended` and `error`; show loading, explicit retry and the original Drive link on failure. A stalled loading state must have a bounded timeout.
7. Stop inactive preview videos and all project audio on close. Keep aspect ratio correct in both orientations, with no cropped playback.

## Ambient soundtrack

- Requested source: https://www.youtube.com/watch?v=y_HdvkRYMfE (Yukitoki instrumental / karaoke).
- Obtain the requested audio using yt-dlp, then make an efficient local audio asset; record source and processing in a media manifest. No substitute track.
- Small top-right `SOUND OFF / ON` control with an accessible label and pressed state. Load only after intent; start through a direct user gesture to meet browser playback policy.
- Start quiet, loop, and fade volume on changes. Remember the preference but do not claim playback until `play()` succeeds.
- Pause while the project viewer is open and when the page is hidden; resume only when previously enabled. Playback failure presents a retryable state.

## Implementation order

1. Save this plan (this document) before changing site code.
2. Acquire and optimize media; record the resulting dimensions, durations and sizes.
3. Repair the project player and audio lifecycle, then connect the gallery and hero to those sessions.
4. Implement the new composition and shared motion treatment, including mobile, keyboard and reduced-motion paths.
5. Verify a production build and live browser behavior; fix issues before recording results here.

## Acceptance checks

- Every one of the five project videos reaches a decoded frame and advances time; previous/next changes the actual source.
- Pause, seek, mute and close work; closing stops media and returns focus to the opener.
- Invalid or stalled media produces a recovery action rather than an endless spinner.
- Sound toggle starts the requested track only after user action, pauses for project viewing, resumes afterward, and stays off when disabled.
- Filters keep the correct set, keyboard interactions work, contact feedback is truthful and no background UI is reachable inside the modal.
- Desktop and narrow mobile layouts have no horizontal overflow, cropped copy or inaccessible controls.
- Reduced-motion mode keeps all content and actions without automatic preview motion.
- Verify console errors and build output. Build success alone is not playback or visual acceptance.

## Implementation and verification log

Pending. Add actual results, changed decisions and remaining limitations here after implementation.

## Direction update — user review, 24 September

The user rejected the small interface text and sharp corners in the first implementation. They also clarified that the original rotating `EDITING FOR...` headline names their target customers and must be retained: they want to be hired as an outsourced editor. They explicitly requested more animation.

Before the next changes:

- Restore the full headline rotation: Reels, Podcasts, Podcast Clips, Shorts, Commentary, Stories, The Internet. Keep the real work preview independently labeled so it does not falsely claim to be a podcast example.
- Position the offer directly: an editor creators, agencies and teams can outsource to. Keep the original five-years experience and plain editing language.
- Increase body copy to around 16 px, controls to 12–14 px, and most small metadata to 11–12 px. No microtype for navigation or important instructions.
- Restore soft, substantial corner radii: 16–24 px on media, monitor and player; rounded pills for filters and navigation. Keep black/cyan and Oregairu artwork.
- Make motion more visible: rotating headline with a blinking pixel cursor, monitor depth following the pointer, a real preview progress line, an animated format ribbon, gentle background petals, and stronger linked media hover/reveal responses. Motion still has consistent direction and easing, and all continuous motion respects reduced-motion preference.
- Retain the completed local-video reliability work, soundtrack control, same-frame player transitions and accessible controls. Recheck mobile proportions after type sizes change.
