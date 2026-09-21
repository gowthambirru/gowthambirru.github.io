export const PROJECTS = [
  {
    id: "edit-1",
    title: "JAMES WHITMORE // CRIME DOCUMENTARY",
    category: "documentary",
    categoryLabel: "Crime Documentary",
    aspectRatio: "16:9",
    duration: "Full Cut",
    tools: ["CapCut PC"],
    description: "Atmospheric true crime documentary edit created using CapCut PC. Features tense investigative pacing, multi-track audio foley, archival document motion graphics, and dark cinematic color grading.",
    techniques: ["Archival Motion Graphics", "Documentary Pacing", "Multi-Track Foley", "Cinematic Mood"],
    thumbnail: `${import.meta.env.BASE_URL}images/crime_doc_thumb.jpg`,
    driveId: "1eqgmKuxZkrAgtOwKuiOBwrIWi4jdlH1e",
    driveUrl: "https://drive.google.com/file/d/1eqgmKuxZkrAgtOwKuiOBwrIWi4jdlH1e/view?usp=sharing",
    isLongForm: true,
    previewTimeLimit: 60,
    featured: true
  },
  {
    id: "edit-2",
    title: "TRADING MEMECOINS EDIT",
    category: "commercial",
    categoryLabel: "Trading & Memecoins",
    aspectRatio: "16:9",
    duration: "Full Cut",
    tools: ["CapCut PC", "Premiere Pro"],
    description: "High-tempo trading video edited with CapCut PC and Premiere Pro. Incorporates jumpcut rhythm, dynamic chart callouts, financial HUD overlays, sound transient impacts, and retention-focused storytelling.",
    techniques: ["Jumpcut Velocity", "Financial HUD Overlays", "Chart Motion Tracking", "Audio Impacts"],
    thumbnail: `${import.meta.env.BASE_URL}images/trading_thumb.jpg`,
    driveId: "1S-2dwoo492d3IR9jDIrsX-9PPv_lYdn5",
    driveUrl: "https://drive.google.com/file/d/1S-2dwoo492d3IR9jDIrsX-9PPv_lYdn5/view?usp=sharing",
    isLongForm: true,
    previewTimeLimit: 60,
    featured: true
  },
  {
    id: "edit-3",
    title: "PAWN STARS COMMENTARY STYLE EDIT",
    category: "commentary",
    categoryLabel: "Pawn Stars Style",
    aspectRatio: "9:16",
    duration: "0:53 (Short Form)",
    tools: ["Premiere Pro", "CapCut PC"],
    description: "Fast-paced commentary edit created in Premiere Pro and CapCut PC. Featuring crisp J-cuts, dynamic punch-in zooms, sound effect transients, and high-retention narrative timing.",
    techniques: ["Punch Zooms", "Sound FX Transients", "High-Retention J-Cuts", "Dialogue Cleanup"],
    thumbnail: `${import.meta.env.BASE_URL}images/pawn_stars_thumb.jpg`,
    driveId: "1bi-8Dy_LoGWu1kWFJq9h3R-QRJHmYnDH",
    driveUrl: "https://drive.google.com/file/d/1bi-8Dy_LoGWu1kWFJq9h3R-QRJHmYnDH/view?usp=sharing",
    isLongForm: false,
    featured: false
  },
  {
    id: "edit-5",
    title: "BASKETBALL & SKULL // COMMENTARY EDIT",
    category: "commentary",
    categoryLabel: "Commentary & Edit",
    aspectRatio: "9:16",
    duration: "Short Form",
    tools: ["After Effects", "CapCut PC"],
    description: "Stylized commentary edit produced with After Effects and CapCut PC. Blends custom skull visual transitions with high-energy sports commentary pacing, audio sidechaining, and visual beat drops.",
    techniques: ["Skull VFX Transitions", "Beat Syncing", "Audio Sidechaining", "Velocity Cuts"],
    thumbnail: `${import.meta.env.BASE_URL}images/basketball_skull_thumb.jpg`,
    driveId: "1MwVPWOeiUiTXOsSG-Rx4SMyhj1-ZqnJA",
    driveUrl: "https://drive.google.com/file/d/1MwVPWOeiUiTXOsSG-Rx4SMyhj1-ZqnJA/view?usp=sharing",
    isLongForm: false,
    featured: false
  }
];

export const CATEGORIES = [
  { id: "all", label: "All Works" },
  { id: "documentary", label: "Crime Documentary" },
  { id: "commercial", label: "Trading & Memecoins" },
  { id: "commentary", label: "Commentary & Shorts" }
];
