/**
 * WeCrafter (formerly TestCraft) Showcase Experience
 * Interactive 3D Voxel Lab, 50-Block Codex, Climate Matrix, Fluid Dynamics, Mining Simulator & 2x2 Crafting
 */

// ==========================================
// 1. SOUND SYNTHESIZER (Web Audio API)
// ==========================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type = 'sine', duration = 0.08, gainVal = 0.08) {
    if (!this.enabled) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  click() {
    this.playTone(880, 'triangle', 0.04, 0.05);
  }

  hover() {
    this.playTone(440, 'sine', 0.03, 0.02);
  }

  laser(progress = 0) {
    if (!this.enabled) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      const baseFreq = 160 + progress * 240;
      osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(baseFreq + 60, this.ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch (e) {}
  }

  shatter() {
    this.playTone(180, 'square', 0.15, 0.12);
    setTimeout(() => this.playTone(520, 'sine', 0.2, 0.08), 30);
    setTimeout(() => this.playTone(780, 'triangle', 0.25, 0.05), 60);
  }

  craft() {
    this.playTone(330, 'sine', 0.08, 0.08);
    setTimeout(() => this.playTone(493, 'sine', 0.1, 0.08), 70);
    setTimeout(() => this.playTone(659, 'sine', 0.2, 0.1), 140);
  }

  inject() {
    this.playTone(580, 'sine', 0.06, 0.08);
    setTimeout(() => this.playTone(920, 'triangle', 0.12, 0.09), 50);
  }

  drink() {
    this.playTone(340, 'sine', 0.08, 0.08);
    setTimeout(() => this.playTone(480, 'sine', 0.1, 0.08), 80);
  }

  eat() {
    this.playTone(220, 'square', 0.05, 0.06);
    setTimeout(() => this.playTone(280, 'square', 0.05, 0.06), 60);
  }

  equip() {
    this.playTone(420, 'sine', 0.06, 0.08);
    setTimeout(() => this.playTone(640, 'triangle', 0.1, 0.09), 40);
  }

  shield() {
    this.playTone(280, 'sawtooth', 0.15, 0.1);
    setTimeout(() => this.playTone(560, 'sine', 0.2, 0.08), 50);
  }

  lightning() {
    if (!this.enabled) return;
    this.init();
    try {
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.45);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.09));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.4);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.22, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.42);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();
    } catch (e) {
      this.playTone(95, 'sawtooth', 0.35, 0.18);
    }
  }

  creature() {
    this.playTone(340, 'triangle', 0.08, 0.08);
    setTimeout(() => this.playTone(510, 'sine', 0.12, 0.06), 40);
  }

  save() {
    this.playTone(520, 'sine', 0.08, 0.08);
    setTimeout(() => this.playTone(680, 'triangle', 0.1, 0.08), 60);
    setTimeout(() => this.playTone(1040, 'sine', 0.18, 0.09), 120);
  }

  swim() {
    this.playTone(180, 'sine', 0.12, 0.05);
    setTimeout(() => this.playTone(260, 'sine', 0.15, 0.04), 80);
  }
}

const sfx = new SoundFX();

// ==========================================
// 2. 50-BLOCK DATABASE SPECIFICATION
// ==========================================
const BLOCKS = [
  { id: 0, name: "Air", rarity: "Common", type: "Gas / Void", hardness: 0.0, emissive: false, tile: 0, category: "fluids", desc: "Empty atmospheric volume across celestial space." },
  { id: 1, name: "Titanium Plating", rarity: "Common", type: "Solid / Alloy", hardness: 3.0, emissive: false, tile: 1, category: "industrial", desc: "Hardened aerospace alloy panel with reinforced structural rivets." },
  { id: 2, name: "Carbon Composite", rarity: "Common", type: "Solid / Weave", hardness: 2.5, emissive: false, tile: 2, category: "industrial", desc: "High-tensile woven carbon weave used for deep space hull bulkheads." },
  { id: 3, name: "Quantum Core", rarity: "Epic", type: "Solid / Tech", hardness: 4.0, emissive: true, tile: 3, category: "bioluminescent", desc: "Pulsing zero-point containment cube radiating high-frequency electric energy." },
  { id: 4, name: "Plasma Conduit", rarity: "Rare", type: "Solid / Tech", hardness: 2.0, emissive: true, tile: 4, category: "bioluminescent", desc: "Heavy industrial thermal conduit channeling superheated ionized gas." },
  { id: 5, name: "Holo-Glass", rarity: "Rare", type: "Transparent", hardness: 0.8, emissive: false, tile: 5, category: "industrial", desc: "Magnetic containment barrier with luminous holographic hex lattice." },
  { id: 6, name: "Alien Regolith", rarity: "Common", type: "Soil / Mineral", hardness: 1.0, emissive: false, tile: 6, category: "geological", desc: "Fine crimson extraterrestrial soil rich in iron oxide and silicates." },
  { id: 7, name: "Bioluminescent Flora", rarity: "Common", type: "Surface Turf", hardness: 1.2, emissive: true, tile: 7, category: "bioluminescent", desc: "Alien turf glowing with neon green bio-photonic photosynthetic spores." },
  { id: 8, name: "Basalt Bedrock", rarity: "Common", type: "Bedrock / Mantle", hardness: 5.0, emissive: false, tile: 9, category: "geological", desc: "Dense volcanic rock fractured with hairline fissures of glowing magma." },
  { id: 9, name: "Nanite Sand", rarity: "Common", type: "Granular", hardness: 0.9, emissive: false, tile: 10, category: "geological", desc: "Shimmering dunes composed of billions of inert microscopic nanobots." },
  { id: 10, name: "Xenocrystal Ore", rarity: "Rare", type: "Ore / Mineral", hardness: 3.5, emissive: true, tile: 11, category: "geological", desc: "Deep stone embedded with resonant piezoelectric magenta crystals." },
  { id: 11, name: "Cyber Crate", rarity: "Uncommon", type: "Interactive", hardness: 1.5, emissive: false, tile: 12, category: "industrial", desc: "Reinforced titanium composite cargo pod dropping high-tier salvage items." },
  { id: 12, name: "Solar Panel", rarity: "Rare", type: "Solid / Tech", hardness: 1.8, emissive: false, tile: 13, category: "energy", desc: "High-efficiency photovoltaic receiver grid for orbital solar harvesting." },
  { id: 13, name: "Alien Foliage", rarity: "Common", type: "Foliage", hardness: 0.5, emissive: true, tile: 16, category: "bioluminescent", desc: "Dense canopy of bioluminescent alien leaves with glowing spores." },
  { id: 14, name: "Crystal Sprout", rarity: "Uncommon", type: "Flora / Deco", hardness: 0.4, emissive: true, tile: 17, category: "bioluminescent", desc: "Delicate crystalline exoflora that resonates with piezoelectric hum." },
  { id: 15, name: "Thermal Brick", rarity: "Common", type: "Structural", hardness: 2.8, emissive: false, tile: 18, category: "industrial", desc: "Refractory basalt brick bonded with high-temperature plasma mortar." },
  { id: 16, name: "Carbon Rod", rarity: "Common", type: "Structural", hardness: 1.5, emissive: false, tile: 19, category: "industrial", desc: "Ultra-dense structural carbon fiber rod used for crafting tools and components." },
  { id: 17, name: "Rusted Debris", rarity: "Common", type: "Terrain / Ruin", hardness: 1.5, emissive: false, tile: 20, category: "geological", desc: "Weathered metallic hull fragments salvaged from ancient space crash sites." },
  { id: 18, name: "Reinforced Concrete", rarity: "Common", type: "Structural", hardness: 4.0, emissive: false, tile: 21, category: "industrial", desc: "Heavy military-grade aggregate bunker block with expansion joints." },
  { id: 19, name: "Obsidian Slag", rarity: "Common", type: "Stone / Slag", hardness: 6.0, emissive: false, tile: 22, category: "geological", desc: "Vitrified black volcanic glass formed when liquid water rapidly chills magma." },
  { id: 20, name: "Silica Shale", rarity: "Common", type: "Stone / Crust", hardness: 1.8, emissive: false, tile: 23, category: "geological", desc: "Pale sedimentary stone rich in micro-crystalline silicon deposits." },
  { id: 21, name: "Corrugated Steel", rarity: "Common", type: "Structural", hardness: 3.2, emissive: false, tile: 24, category: "industrial", desc: "Industrial cold-rolled ribbed sheet panels for modular outpost construction." },
  { id: 22, name: "Xeno Gravel", rarity: "Common", type: "Granular", hardness: 1.0, emissive: false, tile: 25, category: "geological", desc: "Loose alien scree and crushed mineral debris." },
  { id: 23, name: "Copper Alloy", rarity: "Uncommon", type: "Ore / Metal", hardness: 2.2, emissive: false, tile: 26, category: "industrial", desc: "Conductive reddish-bronze alloy panels with natural verdigris patina." },
  { id: 24, name: "Ferrofluid Ore", rarity: "Uncommon", type: "Ore / Metal", hardness: 3.0, emissive: false, tile: 27, category: "industrial", desc: "Subterranean rock permeated with colloidal magnetic iron nanoparticles." },
  { id: 25, name: "Lumen Mushroom", rarity: "Uncommon", type: "Flora / Spore", hardness: 0.3, emissive: true, tile: 28, category: "bioluminescent", desc: "Bioluminescent underground cave fungus emitting pale azure ambient light." },
  { id: 26, name: "Permafrost Crust", rarity: "Uncommon", type: "Ice / Stone", hardness: 2.0, emissive: false, tile: 29, category: "geological", desc: "Cryogenic sub-surface stone and methane ice crust." },
  { id: 27, name: "Aluminum Girder", rarity: "Uncommon", type: "Structural", hardness: 2.5, emissive: false, tile: 30, category: "industrial", desc: "Cross-braced structural aerospace lattice girder for elevated catwalks." },
  { id: 28, name: "Sulfur Crystal", rarity: "Uncommon", type: "Mineral", hardness: 1.4, emissive: false, tile: 31, category: "geological", desc: "Bright yellow volcanic mineral clusters found around geothermal vents." },
  { id: 29, name: "Cryo Glass", rarity: "Uncommon", type: "Transparent", hardness: 1.2, emissive: false, tile: 32, category: "fluids", desc: "Ultra-dense frosted vitreous ice block with crystalline thermal lattice." },
  { id: 30, name: "Auric Nanite Ore", rarity: "Rare", type: "Precious Ore", hardness: 3.8, emissive: true, tile: 33, category: "geological", desc: "Precious ore containing self-assembling microscopic gold nanite filaments." },
  { id: 31, name: "Neodymium Magnet", rarity: "Rare", type: "Mineral / Tech", hardness: 4.0, emissive: false, tile: 34, category: "energy", desc: "High-flux rare-earth permanent magnet block for maglev rail systems." },
  { id: 32, name: "Cobalt Reactive", rarity: "Rare", type: "Ore / Metal", hardness: 4.2, emissive: true, tile: 35, category: "geological", desc: "High-energy electrochemical cobalt matrix storing massive charge." },
  { id: 33, name: "Aerogel Tile", rarity: "Rare", type: "Tech / Insul", hardness: 0.8, emissive: false, tile: 36, category: "energy", desc: "Ultra-light translucent synthetic solid with 99.8% air porosity." },
  { id: 34, name: "Uranium Ore", rarity: "Rare", type: "Radioactive", hardness: 4.5, emissive: true, tile: 37, category: "geological", desc: "Unstable fissile actinide ore glowing with fluorescent ionizing radiation." },
  { id: 35, name: "Graphene Sheet", rarity: "Rare", type: "Tech / Carbon", hardness: 5.0, emissive: false, tile: 38, category: "industrial", desc: "Single-atom thick hexagonal honeycomb carbon lattice with extreme tensile strength." },
  { id: 36, name: "Diamond Crystal Ore", rarity: "Epic", type: "Ultra Ore", hardness: 6.5, emissive: true, tile: 39, category: "geological", desc: "Deep kimberlite matrix embedded with hyper-hard prismatic alien diamonds." },
  { id: 37, name: "Tachyon Conduit", rarity: "Epic", type: "Tech / Energy", hardness: 5.5, emissive: true, tile: 40, category: "energy", desc: "Superluminal quantum waveguide that manipulates local relativistic time flow." },
  { id: 38, name: "Dark Matter Crystal", rarity: "Epic", type: "Cosmic", hardness: 9.0, emissive: true, tile: 41, category: "bioluminescent", desc: "Non-baryonic matter crystal distorting local spacetime gravity." },
  { id: 39, name: "Warp Coil", rarity: "Epic", type: "Tech / Drive", hardness: 7.0, emissive: true, tile: 42, category: "energy", desc: "Superconducting electromagnetic toroidal stator for gravitational warp drives." },
  { id: 40, name: "Void Obsidian", rarity: "Epic", type: "Abyssal Stone", hardness: 8.0, emissive: false, tile: 43, category: "geological", desc: "Ultra-dense abyssal bedrock inscribed with ancient extraterrestrial glyphs." },
  { id: 41, name: "Pulsar Quartz", rarity: "Epic", type: "Mineral / Tech", hardness: 5.0, emissive: true, tile: 44, category: "bioluminescent", desc: "High-frequency oscillating quartz harvested from neutron star emissions." },
  { id: 42, name: "Antimatter Cell", rarity: "Legendary", type: "Power Core", hardness: 10.0, emissive: true, tile: 45, category: "energy", desc: "Magnetic confinement bottle harboring high-yield positron antimatter plasma." },
  { id: 43, name: "Dyson Shard", rarity: "Legendary", type: "Megastructure", hardness: 12.0, emissive: true, tile: 46, category: "bioluminescent", desc: "Crystalline fragment forged inside the corona of a stellar power megastructure." },
  { id: 44, name: "Chrono Matrix", rarity: "Legendary", type: "Temporal Tech", hardness: 14.0, emissive: true, tile: 47, category: "bioluminescent", desc: "Lattice framework that stabilizes localized closed timelike curves." },
  { id: 45, name: "Singularity Core", rarity: "Legendary", type: "Cosmic Engine", hardness: 15.0, emissive: true, tile: 48, category: "energy", desc: "Micro-black hole suspended inside a high-gravity ergosphere containment ring." },
  { id: 46, name: "Planetary Water", rarity: "Fluid", type: "Liquid (Aquatic)", hardness: 100.0, emissive: false, tile: 49, category: "fluids", desc: "Dynamic planetary fluid with hydrostatic pressure and corner-averaged sloped flow." },
  { id: 47, name: "Toxic Acid Lake", rarity: "Fluid", type: "Liquid (Corrosive)", hardness: 100.0, emissive: true, tile: 50, category: "fluids", desc: "Fluorescent toxic liquid found in chasm reservoirs that dissolves flesh." },
  { id: 48, name: "Molten Magma", rarity: "Fluid", type: "Liquid (Thermal)", hardness: 100.0, emissive: true, tile: 51, category: "fluids", desc: "Superheated incandescent liquid silicate rock with extreme thermal convection." },
  { id: 49, name: "Heavy Water", rarity: "Fluid", type: "Liquid (Nuclear)", hardness: 100.0, emissive: true, tile: 52, category: "fluids", desc: "Iridescent cryogenic deuterium oxide fluid utilized in quantum reactors." }
];

// ==========================================
// 2.5 NON-BLOCK ITEMS DATABASE (ItemRegistry)
// ==========================================
const ITEMS = [
  // Tools
  {
    id: 64,
    name: "Mining Laser",
    rarity: "Rare",
    category: "tool",
    toolType: "drill",
    miningMultiplier: 2.5,
    reachBonus: 0,
    tile: 4,
    linkedSkill: "Mining Efficiency",
    xpAwarded: 15,
    desc: "Coherent plasma beam drill for accelerated mineral and stone extraction.",
    specText: "2.5x Mining Speed on Stone/Ores"
  },
  {
    id: 65,
    name: "Thermal Plasma Drill",
    rarity: "Epic",
    category: "tool",
    toolType: "drill",
    miningMultiplier: 4.5,
    reachBonus: 0,
    tile: 35,
    linkedSkill: "Mining Efficiency",
    xpAwarded: 25,
    desc: "Heavy industrial thermal bore melting through dense mantle rock, obsidian, and titanium.",
    specText: "4.5x Heavy Mining Speed on Mantle/Obsidian"
  },
  {
    id: 66,
    name: "Vibro-Cutter",
    rarity: "Uncommon",
    category: "tool",
    toolType: "cutter",
    miningMultiplier: 4.0,
    reachBonus: 0,
    tile: 1,
    linkedSkill: "Astrobiology",
    xpAwarded: 15,
    desc: "High-frequency ultrasonic blade slicing cleanly through alien mega-trees and foliage.",
    specText: "4.0x Speed on Mega-Trees & Foliage"
  },
  {
    id: 67,
    name: "Sonic Excavator",
    rarity: "Uncommon",
    category: "tool",
    toolType: "excavator",
    miningMultiplier: 4.0,
    reachBonus: 0,
    tile: 34,
    linkedSkill: "Terraforming Mastery",
    xpAwarded: 15,
    desc: "Acoustic resonance shovel displacing granular sands, soils, and loose gravel instantly.",
    specText: "4.0x Speed on Sand, Dirt & Gravel"
  },
  {
    id: 68,
    name: "Quantum Multitool Spanner",
    rarity: "Rare",
    category: "tool",
    toolType: "spanner",
    miningMultiplier: 1.3,
    reachBonus: 3.0,
    tile: 3,
    linkedSkill: "Terraforming Mastery",
    xpAwarded: 20,
    desc: "Spatial harmonic calibrator extending player reach and terraforming range by +3.0m.",
    specText: "+3.0m Extended Raycast Placement & Dig Reach"
  },

  // Food
  {
    id: 80,
    name: "Nutrient Paste Tube",
    rarity: "Common",
    category: "food",
    foodRestored: 25,
    waterRestored: 0,
    healthRestored: 0,
    staminaRestored: 0,
    tile: 6,
    linkedSkill: "Astrobiology",
    xpAwarded: 20,
    desc: "Concentrated synthetic carbohydrates and essential minerals.",
    specText: "+25 Food / Hunger"
  },
  {
    id: 81,
    name: "Bioluminescent Spore Fruit",
    rarity: "Uncommon",
    category: "food",
    foodRestored: 40,
    waterRestored: 12,
    healthRestored: 0,
    staminaRestored: 0,
    tile: 25,
    linkedSkill: "Astrobiology",
    xpAwarded: 35,
    desc: "Succulent glowing wild fruit rich in bio-sugars and clean water.",
    specText: "+40 Food, +12 Water"
  },
  {
    id: 82,
    name: "Expedition Combat MRE",
    rarity: "Rare",
    category: "food",
    foodRestored: 75,
    waterRestored: 0,
    healthRestored: 10,
    staminaRestored: 25,
    tile: 11,
    linkedSkill: "Astrobiology",
    xpAwarded: 50,
    desc: "Self-heating vacuum sealed combat meal packed with high-density proteins.",
    specText: "+75 Food, +25 Stamina, +10 HP"
  },

  // Drink
  {
    id: 96,
    name: "Purified Hydro-Pouch",
    rarity: "Common",
    category: "drink",
    foodRestored: 0,
    waterRestored: 35,
    healthRestored: 0,
    staminaRestored: 0,
    tile: 49,
    linkedSkill: "Astrobiology",
    xpAwarded: 20,
    desc: "Sterile demineralized liquid water filtered from planetary aquifers.",
    specText: "+35 Water / Hydration"
  },
  {
    id: 97,
    name: "Ionized Electrolyte Flask",
    rarity: "Uncommon",
    category: "drink",
    foodRestored: 0,
    waterRestored: 60,
    healthRestored: 0,
    staminaRestored: 40,
    tile: 28,
    linkedSkill: "Astrobiology",
    xpAwarded: 35,
    desc: "Mineral-fortified athletic fluid sustaining neurological stamina.",
    specText: "+60 Water, +40 Stamina"
  },
  {
    id: 98,
    name: "Glacial Cryo-Nectar",
    rarity: "Rare",
    category: "drink",
    foodRestored: 0,
    waterRestored: 85,
    healthRestored: 0,
    staminaRestored: 50,
    tile: 29,
    linkedSkill: "Astrobiology",
    xpAwarded: 50,
    desc: "Sub-zero geothermal condensate that hyper-quenches thirst and mitigates volcanic heat.",
    specText: "+85 Water, +50 Stamina"
  },

  // Medical Stims ("Potions")
  {
    id: 112,
    name: "Medi-Stim Auto-Injector",
    rarity: "Uncommon",
    category: "stim",
    healthRestored: 40,
    foodRestored: 0,
    waterRestored: 0,
    staminaRestored: 0,
    tile: 30,
    linkedSkill: "Cybernetics",
    xpAwarded: 30,
    desc: "Emergency coagulant and cellular stimulant rapidly sealing tissue trauma.",
    specText: "+40 Health / Vitality"
  },
  {
    id: 113,
    name: "Nano-Repair Trauma Kit",
    rarity: "Epic",
    category: "stim",
    healthRestored: 85,
    foodRestored: 0,
    waterRestored: 0,
    staminaRestored: 0,
    tile: 3,
    linkedSkill: "Cybernetics",
    xpAwarded: 60,
    desc: "Swarm of programmed surgical nanites restoring structural hull and organic vitality.",
    specText: "+85 Health / Vitality"
  },
  {
    id: 114,
    name: "Oxygen Rebreather Capsule",
    rarity: "Rare",
    category: "stim",
    healthRestored: 0,
    foodRestored: 0,
    waterRestored: 0,
    staminaRestored: 0,
    oxygenRestored: 60,
    tile: 33,
    linkedSkill: "Cybernetics",
    xpAwarded: 35,
    desc: "Pressurized hyperbaric oxygen cartridge replenishing vital breathing supply.",
    specText: "+60s Oxygen Tank Refill"
  },
  {
    id: 115,
    name: "Adrenaline Overdrive Inoculant",
    rarity: "Rare",
    category: "stim",
    healthRestored: 0,
    foodRestored: 0,
    waterRestored: 0,
    staminaRestored: 100,
    speedBoost: 1.25,
    buffDuration: 12.0,
    tile: 4,
    linkedSkill: "Cybernetics",
    xpAwarded: 40,
    desc: "Neuro-muscular stimulant restoring full stamina and accelerating sprint velocity by 25%.",
    specText: "+100 Stamina, +25% Sprint Speed (12s)"
  },
  {
    id: 116,
    name: "Rad-Purge & Hazard Antidote",
    rarity: "Rare",
    category: "stim",
    healthRestored: 30,
    foodRestored: 0,
    waterRestored: 0,
    staminaRestored: 0,
    hazardImmunity: true,
    buffDuration: 15.0,
    tile: 34,
    linkedSkill: "Cybernetics",
    xpAwarded: 45,
    desc: "Chelating biochem serum purging toxic radiation and neutralizing environmental damage.",
    specText: "+30 HP, Hazard Immunity (15s)"
  },

  // Wearable Armor & Exosuit Rigs
  {
    id: 120,
    name: "EVA Recon Visor",
    rarity: "Rare",
    category: "armor",
    armorSlot: "head",
    defense: 0.15,
    oxygenBonus: 50.0,
    speedBonus: 0.0,
    tile: 28,
    linkedSkill: "Cybernetics",
    xpAwarded: 35,
    desc: "Pressurized life support helmet with HUD optics, providing +15% damage defense and +50 Max O2.",
    specText: "+15% Defense, +50 Max O2 [HEAD]"
  },
  {
    id: 121,
    name: "Titanium Hazard Exosuit",
    rarity: "Rare",
    category: "armor",
    armorSlot: "chest",
    defense: 0.30,
    oxygenBonus: 0.0,
    speedBonus: 0.0,
    tile: 0,
    linkedSkill: "Cybernetics",
    xpAwarded: 50,
    desc: "High-tensile plating dissipating thermal blasts and radiation trauma, granting +30% damage defense.",
    specText: "+30% Defense [CHEST]"
  },
  {
    id: 122,
    name: "Carbon Exoskeleton Greaves",
    rarity: "Uncommon",
    category: "armor",
    armorSlot: "legs",
    defense: 0.20,
    oxygenBonus: 0.0,
    speedBonus: 0.0,
    tile: 2,
    linkedSkill: "Cybernetics",
    xpAwarded: 30,
    desc: "Hydraulic leg braces reinforcing jumps and kinetic dampening, offering +20% damage defense.",
    specText: "+20% Defense [LEGS]"
  },
  {
    id: 123,
    name: "Mag-Lev Thruster Boots",
    rarity: "Rare",
    category: "armor",
    armorSlot: "feet",
    defense: 0.10,
    oxygenBonus: 0.0,
    speedBonus: 0.15,
    tile: 26,
    linkedSkill: "Cybernetics",
    xpAwarded: 40,
    desc: "Magnetic repulsive grav-soles boosting sprint velocity by +15% and providing +10% damage defense.",
    specText: "+10% Defense, +15% Sprint Speed [FEET]"
  },
  {
    id: 124,
    name: "Quantum Aegis Cuirass",
    rarity: "Epic",
    category: "armor",
    armorSlot: "chest",
    defense: 0.45,
    oxygenBonus: 0.0,
    speedBonus: 0.05,
    tile: 35,
    linkedSkill: "Cybernetics",
    xpAwarded: 75,
    desc: "Superconducting micro-forcefield chest rig providing +45% damage defense and kinetic dissipation.",
    specText: "+45% Defense, +5% Speed [CHEST - EPIC]"
  },

  // Fauna Ecosystem Harvesting & Biological Materials
  {
    id: 83,
    name: "Raw Alien Meat",
    rarity: "Common",
    category: "food",
    foodRestored: 20,
    waterRestored: 0,
    healthRestored: 5,
    staminaRestored: 0,
    tile: 6,
    linkedSkill: "Astrobiology",
    xpAwarded: 15,
    desc: "Fibrous raw protein harvested from planetary fauna. Slightly replenishes hunger and vitality.",
    specText: "+20 Food, +5 HP [RAW PROTEIN]"
  },
  {
    id: 84,
    name: "Roasted Alien Steak",
    rarity: "Uncommon",
    category: "food",
    foodRestored: 65,
    waterRestored: 0,
    healthRestored: 25,
    staminaRestored: 20,
    tile: 11,
    linkedSkill: "Astrobiology",
    xpAwarded: 35,
    desc: "Seared alien steak flame-cooked over thermal bricks. Generously restores nourishment and stamina.",
    specText: "+65 Food, +25 HP, +20 Stamina [SEALED COOKED]"
  },
  {
    id: 125,
    name: "Bio-Synthetic Sinew",
    rarity: "Uncommon",
    category: "material",
    tile: 2,
    linkedSkill: "Astrobiology",
    xpAwarded: 20,
    desc: "High-tensile fibrous biological muscle extracted from Cyber-Hogs. Crucial for bio-composite weaves.",
    specText: "High-Tensile Organic Fiber [BIO-MATERIAL]"
  },
  {
    id: 126,
    name: "Iridescent Aero-Plumage",
    rarity: "Rare",
    category: "material",
    tile: 25,
    linkedSkill: "Astrobiology",
    xpAwarded: 25,
    desc: "Ultra-lightweight photonic plumage shed by Xeno-Birds. Channels kinetic lift for aerodynamic flight gear.",
    specText: "Photonic Lift Fiber [AERO-MATERIAL]"
  },
  {
    id: 127,
    name: "Armored Nanite Pelt",
    rarity: "Uncommon",
    category: "material",
    tile: 0,
    linkedSkill: "Astrobiology",
    xpAwarded: 20,
    desc: "Sub-dermal nanite-infused hide harvested from Nanite Hounds. Reinforces advanced exosuit plating.",
    specText: "Sub-Dermal Nanite Weave [ARMOR-MATERIAL]"
  },
  {
    id: 85,
    name: "Raw Fish Filet",
    rarity: "Common",
    category: "food",
    foodRestored: 18,
    waterRestored: 0,
    healthRestored: 8,
    staminaRestored: 0,
    tile: 46,
    linkedSkill: "Astrobiology",
    xpAwarded: 15,
    desc: "Tender raw aquatic fish filet rich in bio-nutrients. Can be cooked over thermal bricks.",
    specText: "+18 Food, +8 HP [RAW SEAFOOD]"
  },
  {
    id: 86,
    name: "Smoked Glaze Filet",
    rarity: "Uncommon",
    category: "food",
    foodRestored: 55,
    waterRestored: 0,
    healthRestored: 20,
    staminaRestored: 25,
    tile: 47,
    linkedSkill: "Astrobiology",
    xpAwarded: 30,
    desc: "Glazed and smoked aquatic filet prepared with thermal heat. Excellent field rations.",
    specText: "+55 Food, +20 HP, +25 Stamina [HOT SMOKED]"
  },
  {
    id: 128,
    name: "Bioluminescent Scale",
    rarity: "Uncommon",
    category: "material",
    tile: 43,
    linkedSkill: "Astrobiology",
    xpAwarded: 20,
    desc: "Fluorescent aquatic scale harvested from Neon Tetra Rays and Void Eels. Used in optical plating.",
    specText: "Photonic Aquatic Scale [BIO-MATERIAL]"
  },
  {
    id: 129,
    name: "Reinforced Chitin Carapace",
    rarity: "Uncommon",
    category: "material",
    tile: 2,
    linkedSkill: "Astrobiology",
    xpAwarded: 25,
    desc: "Dense mineralized carapace harvested from Magma Tortoises and Chameleon Stalkers.",
    specText: "Blast-Resistant Mineral Shell [BIO-ARMOR]"
  },
  {
    id: 130,
    name: "Electrified Barb",
    rarity: "Rare",
    category: "material",
    tile: 38,
    linkedSkill: "Cybernetics",
    xpAwarded: 30,
    desc: "Piezoelectric barb extracted from Cyber Pikes and Void Eels. Discharges pulse arc energy.",
    specText: "High-Voltage Piezo Spine [TECH-MATERIAL]"
  },
  {
    id: 131,
    name: "Prismatic Fin",
    rarity: "Rare",
    category: "material",
    tile: 36,
    linkedSkill: "Astrobiology",
    xpAwarded: 35,
    desc: "Iridescent hydro-fin harvested from Prismatic Gliders. Manipulates hydrodynamic flow fields.",
    specText: "Hydrodynamic Resonator [AERO-AQUATIC]"
  },
  {
    id: 132,
    name: "Volcanic Thermal Gland",
    rarity: "Rare",
    category: "material",
    tile: 33,
    linkedSkill: "Astrobiology",
    xpAwarded: 30,
    desc: "Endothermic organ from Magma Vent Guppies and Cinder Stalkers that radiates geothermal heat.",
    specText: "Geothermal Heat Core [THERMAL-ORGAN]"
  },
  {
    id: 133,
    name: "Abyssal Jelly Venom",
    rarity: "Uncommon",
    category: "material",
    tile: 37,
    linkedSkill: "Astrobiology",
    xpAwarded: 25,
    desc: "Potent paralytic bioluminescent venom sac harvested from Glowing Jellyfish.",
    specText: "Paralytic Bio-Venom [BIO-CHEMICAL]"
  },
  {
    id: 134,
    name: "Weathered Dune Hide",
    rarity: "Uncommon",
    category: "material",
    tile: 0,
    linkedSkill: "Astrobiology",
    xpAwarded: 20,
    desc: "Abrasion-resistant leathery pelt harvested from Dune Striders and Sand Vipers.",
    specText: "Silica-Resistant Leather [BIO-HIDE]"
  },
  {
    id: 135,
    name: "Razor Crystal Claw",
    rarity: "Epic",
    category: "material",
    tile: 35,
    linkedSkill: "Cybernetics",
    xpAwarded: 40,
    desc: "Hyper-resonant diamond crystal pincer harvested from Crystal Scorpions. Slices through alloys.",
    specText: "Resonant Monomolecular Claw [EXO-CLAW]"
  }
];

function getItemById(id) {
  return ITEMS.find(item => item.id === id);
}

function getEntityById(id) {
  if (id >= 64) {
    return getItemById(id);
  }
  return BLOCKS.find(b => b.id === id);
}

// ==========================================
// 3. 38 CRAFTING RECIPES (2x2 Matrix)
// ==========================================
const RECIPES = [
  // 1-17: Architectural Block Recipes
  {
    name: "Carbon Rod (x4)",
    category: "block",
    isItem: false,
    result: { id: 16, count: 4 },
    inputs: [ { id: 2, count: 1 } ],
    grid: [2, null, null, null],
    desc: "1x Carbon Composite yields 4x high-tensile structural rods."
  },
  {
    name: "Cyber Crate (x1)",
    category: "block",
    isItem: false,
    result: { id: 11, count: 1 },
    inputs: [ { id: 2, count: 2 } ],
    grid: [2, 2, null, null],
    desc: "2x Carbon Composite creates a heavy-duty cargo container."
  },
  {
    name: "Solar Panel (x2)",
    category: "block",
    isItem: false,
    result: { id: 12, count: 2 },
    inputs: [ { id: 1, count: 1 }, { id: 3, count: 1 } ],
    grid: [1, 3, null, null],
    desc: "1x Titanium Plating + 1x Quantum Core."
  },
  {
    name: "Holo-Glass (x2)",
    category: "block",
    isItem: false,
    result: { id: 5, count: 2 },
    inputs: [ { id: 9, count: 2 } ],
    grid: [9, 9, null, null],
    desc: "2x Nanite Sand fused into holographic magnetic containment glass."
  },
  {
    name: "Thermal Brick (x4)",
    category: "block",
    isItem: false,
    result: { id: 15, count: 4 },
    inputs: [ { id: 8, count: 1 }, { id: 4, count: 1 } ],
    grid: [8, 4, null, null],
    desc: "1x Basalt Bedrock + 1x Plasma Conduit for volcanic kiln shielding."
  },
  {
    name: "Crystal Sprout (x2)",
    category: "block",
    isItem: false,
    result: { id: 14, count: 2 },
    inputs: [ { id: 10, count: 1 } ],
    grid: [10, null, null, null],
    desc: "1x Xenocrystal Ore cultured into resonant decorative flora."
  },
  {
    name: "Quantum Core (x1)",
    category: "block",
    isItem: false,
    result: { id: 3, count: 1 },
    inputs: [ { id: 1, count: 1 }, { id: 16, count: 2 } ],
    grid: [1, 16, 16, null],
    desc: "1x Titanium Plating + 2x Carbon Rods into a zero-point power cube."
  },
  {
    name: "Nanite Sand (x4)",
    category: "block",
    isItem: false,
    result: { id: 9, count: 4 },
    inputs: [ { id: 6, count: 4 } ],
    grid: [6, 6, 6, 6],
    desc: "4x Alien Regolith refined into microscopic nanite granules."
  },
  {
    name: "Reinforced Concrete (x4)",
    category: "block",
    isItem: false,
    result: { id: 18, count: 4 },
    inputs: [ { id: 20, count: 2 }, { id: 22, count: 2 } ],
    grid: [20, 20, 22, 22],
    desc: "2x Silica Shale + 2x Xeno Gravel for blast bunker construction."
  },
  {
    name: "Corrugated Steel (x4)",
    category: "block",
    isItem: false,
    result: { id: 21, count: 4 },
    inputs: [ { id: 1, count: 2 } ],
    grid: [1, 1, null, null],
    desc: "2x Titanium Plating forged into industrial fluted steel paneling."
  },
  {
    name: "Aluminum Girder (x2)",
    category: "block",
    isItem: false,
    result: { id: 27, count: 2 },
    inputs: [ { id: 16, count: 4 } ],
    grid: [16, 16, 16, 16],
    desc: "4x Carbon Rods extruded into lightweight structural catwalk beams."
  },
  {
    name: "Neodymium Magnet (x2)",
    category: "block",
    isItem: false,
    result: { id: 31, count: 2 },
    inputs: [ { id: 24, count: 2 }, { id: 23, count: 1 } ],
    grid: [24, 24, 23, null],
    desc: "2x Ferrofluid Ore + 1x Copper Alloy for high-field permanent magnets."
  },
  {
    name: "Graphene Sheet (x2)",
    category: "block",
    isItem: false,
    result: { id: 35, count: 2 },
    inputs: [ { id: 2, count: 4 } ],
    grid: [2, 2, 2, 2],
    desc: "4x Carbon Composite compressed into single-atom tensile sheets."
  },
  {
    name: "Cryo-Glass (x2)",
    category: "block",
    isItem: false,
    result: { id: 29, count: 2 },
    inputs: [ { id: 5, count: 2 }, { id: 26, count: 1 } ],
    grid: [5, 5, 26, null],
    desc: "2x Holo-Glass + 1x Permafrost Crust for zero-deg vitreous blocks."
  },
  {
    name: "Tachyon Conduit (x1)",
    category: "block",
    isItem: false,
    result: { id: 37, count: 1 },
    inputs: [ { id: 4, count: 1 }, { id: 10, count: 1 } ],
    grid: [4, 10, null, null],
    desc: "1x Plasma Conduit + 1x Xenocrystal Ore for superluminal waveguides."
  },
  {
    name: "Warp Coil (x1)",
    category: "block",
    isItem: false,
    result: { id: 39, count: 1 },
    inputs: [ { id: 23, count: 2 }, { id: 31, count: 2 } ],
    grid: [23, 23, 31, 31],
    desc: "2x Copper Alloy + 2x Neodymium Magnet creates FTL warp stator."
  },
  {
    name: "Antimatter Cell (x1)",
    category: "block",
    isItem: false,
    result: { id: 42, count: 1 },
    inputs: [ { id: 3, count: 2 }, { id: 37, count: 2 } ],
    grid: [3, 3, 37, 37],
    desc: "2x Quantum Core + 2x Tachyon Conduit for positron containment."
  },

  // 18-22: Tools Recipes
  {
    name: "Mining Laser",
    category: "tool",
    isItem: true,
    result: { id: 64, count: 1 },
    inputs: [ { id: 1, count: 1 }, { id: 23, count: 1 }, { id: 16, count: 1 } ],
    grid: [1, 23, 16, null],
    desc: "1x Titanium Plating + 1x Copper Alloy + 1x Carbon Rod. (2.5x Mining Speed)"
  },
  {
    name: "Thermal Plasma Drill",
    category: "tool",
    isItem: true,
    result: { id: 65, count: 1 },
    inputs: [ { id: 1, count: 1 }, { id: 36, count: 1 }, { id: 3, count: 1 } ],
    grid: [1, 36, 3, null],
    desc: "1x Titanium Plating + 1x Diamond Crystal Ore + 1x Quantum Core. (4.5x Heavy Speed)"
  },
  {
    name: "Vibro-Cutter",
    category: "tool",
    isItem: true,
    result: { id: 66, count: 1 },
    inputs: [ { id: 2, count: 1 }, { id: 16, count: 1 } ],
    grid: [2, 16, null, null],
    desc: "1x Carbon Composite + 1x Carbon Rod. (4.0x Foliage & Wood Speed)"
  },
  {
    name: "Sonic Excavator",
    category: "tool",
    isItem: true,
    result: { id: 67, count: 1 },
    inputs: [ { id: 20, count: 1 }, { id: 16, count: 1 }, { id: 31, count: 1 } ],
    grid: [20, 16, 31, null],
    desc: "1x Silica Shale + 1x Carbon Rod + 1x Neodymium Magnet. (4.0x Soil & Sand Speed)"
  },
  {
    name: "Quantum Multitool Spanner",
    category: "tool",
    isItem: true,
    result: { id: 68, count: 1 },
    inputs: [ { id: 3, count: 1 }, { id: 23, count: 1 }, { id: 16, count: 1 } ],
    grid: [3, 23, 16, null],
    desc: "1x Quantum Core + 1x Copper Alloy + 1x Carbon Rod. (+3.0m Reach Bonus)"
  },

  // 23-25: Food Recipes
  {
    name: "Nutrient Paste Tube (x2)",
    category: "food_drink",
    isItem: true,
    result: { id: 80, count: 2 },
    inputs: [ { id: 13, count: 2 }, { id: 7, count: 1 } ],
    grid: [13, 13, 7, null],
    desc: "2x Alien Foliage + 1x Bioluminescent Flora -> 2x Nutrient Paste (+25 Food)."
  },
  {
    name: "Bioluminescent Spore Fruit (x2)",
    category: "food_drink",
    isItem: true,
    result: { id: 81, count: 2 },
    inputs: [ { id: 25, count: 2 }, { id: 14, count: 1 } ],
    grid: [25, 25, 14, null],
    desc: "2x Lumen Mushroom + 1x Crystal Sprout -> 2x Spore Fruit (+40 Food, +12 Water)."
  },
  {
    name: "Expedition Combat MRE",
    category: "food_drink",
    isItem: true,
    result: { id: 82, count: 1 },
    inputs: [ { id: 80, count: 1 }, { id: 2, count: 1 }, { id: 96, count: 1 } ],
    grid: [80, 2, 96, null],
    desc: "1x Nutrient Paste + 1x Carbon Composite + 1x Purified Water (+75 Food, +25 Stamina)."
  },

  // 26-28: Drink Recipes
  {
    name: "Purified Hydro-Pouch (x2)",
    category: "food_drink",
    isItem: true,
    result: { id: 96, count: 2 },
    inputs: [ { id: 46, count: 1 }, { id: 9, count: 1 } ],
    grid: [46, 9, null, null],
    desc: "1x Planetary Water + 1x Nanite Sand filter -> 2x Purified Hydro-Pouch (+35 Water)."
  },
  {
    name: "Ionized Electrolyte Flask",
    category: "food_drink",
    isItem: true,
    result: { id: 97, count: 1 },
    inputs: [ { id: 96, count: 1 }, { id: 10, count: 1 } ],
    grid: [96, 10, null, null],
    desc: "1x Purified Water + 1x Xenocrystal Ore -> 1x Electrolyte Flask (+60 Water, +40 Stamina)."
  },
  {
    name: "Glacial Cryo-Nectar",
    category: "food_drink",
    isItem: true,
    result: { id: 98, count: 1 },
    inputs: [ { id: 96, count: 1 }, { id: 26, count: 1 } ],
    grid: [96, 26, null, null],
    desc: "1x Purified Water + 1x Permafrost Crust -> 1x Cryo-Nectar (+85 Water, +50 Stamina)."
  },

  // 29-33: Medical Stim Recipes
  {
    name: "Medi-Stim Auto-Injector",
    category: "stim",
    isItem: true,
    result: { id: 112, count: 1 },
    inputs: [ { id: 7, count: 1 }, { id: 9, count: 1 }, { id: 5, count: 1 } ],
    grid: [7, 9, 5, null],
    desc: "1x Bioluminescent Flora + 1x Nanite Sand + 1x Holo-Glass -> 1x Medi-Stim (+40 HP)."
  },
  {
    name: "Nano-Repair Trauma Kit",
    category: "stim",
    isItem: true,
    result: { id: 113, count: 1 },
    inputs: [ { id: 112, count: 1 }, { id: 30, count: 1 } ],
    grid: [112, 30, null, null],
    desc: "1x Medi-Stim + 1x Auric Nanite Ore -> 1x Nano-Repair Kit (+85 HP Emergency Heal)."
  },
  {
    name: "Oxygen Rebreather Capsule (x2)",
    category: "stim",
    isItem: true,
    result: { id: 114, count: 2 },
    inputs: [ { id: 5, count: 1 }, { id: 13, count: 1 }, { id: 16, count: 1 } ],
    grid: [5, 13, 16, null],
    desc: "1x Holo-Glass + 1x Alien Foliage + 1x Carbon Rod -> 2x Oxygen Capsules (+60s EVA)."
  },
  {
    name: "Adrenaline Overdrive Inoculant",
    category: "stim",
    isItem: true,
    result: { id: 115, count: 1 },
    inputs: [ { id: 112, count: 1 }, { id: 24, count: 1 } ],
    grid: [112, 24, null, null],
    desc: "1x Medi-Stim + 1x Ferrofluid Ore -> 1x Adrenaline Inoculant (+100 Stamina, +25% Speed [12s])."
  },
  {
    name: "Rad-Purge & Hazard Antidote",
    category: "stim",
    isItem: true,
    result: { id: 116, count: 1 },
    inputs: [ { id: 96, count: 1 }, { id: 10, count: 1 }, { id: 34, count: 1 } ],
    grid: [96, 10, 34, null],
    desc: "1x Purified Water + 1x Xenocrystal + 1x Radioactive Uranium -> 1x Rad-Purge (Hazard Immunity [15s])."
  },

  // 34-38: Exosuit Armor Recipes
  {
    name: "EVA Pressurized Helmet",
    category: "armor",
    isItem: true,
    result: { id: 120, count: 1 },
    inputs: [ { id: 5, count: 1 }, { id: 1, count: 2 } ],
    grid: [5, 1, 1, null],
    desc: "1x Holo-Glass + 2x Titanium Plating -> 1x EVA Recon Visor (+15% Def, +50s Max O2)."
  },
  {
    name: "Titanium Plated Exosuit Chest",
    category: "armor",
    isItem: true,
    result: { id: 121, count: 1 },
    inputs: [ { id: 1, count: 2 }, { id: 2, count: 1 }, { id: 23, count: 1 } ],
    grid: [1, 1, 2, 23],
    desc: "2x Titanium Plating + 1x Carbon Composite + 1x Copper Alloy -> 1x Titanium Hazard Exosuit (+30% Def)."
  },
  {
    name: "Reinforced Exo-Greaves",
    category: "armor",
    isItem: true,
    result: { id: 122, count: 1 },
    inputs: [ { id: 16, count: 2 }, { id: 1, count: 1 }, { id: 23, count: 1 } ],
    grid: [16, 16, 1, 23],
    desc: "2x Carbon Rod + 1x Titanium Plating + 1x Copper Alloy -> 1x Carbon Exoskeleton Greaves (+20% Def)."
  },
  {
    name: "Mag-Lev Thruster Boots",
    category: "armor",
    isItem: true,
    result: { id: 123, count: 1 },
    inputs: [ { id: 31, count: 2 }, { id: 1, count: 1 } ],
    grid: [31, 31, 1, null],
    desc: "2x Neodymium Magnet + 1x Titanium Plating -> 1x Mag-Lev Thruster Boots (+10% Def, +15% Sprint Speed)."
  },
  {
    name: "Quantum Aegis Power Chest",
    category: "armor",
    isItem: true,
    result: { id: 124, count: 1 },
    inputs: [ { id: 3, count: 1 }, { id: 1, count: 2 }, { id: 2, count: 1 } ],
    grid: [3, 1, 1, 2],
    desc: "1x Quantum Core + 2x Titanium Plating + 1x Carbon Composite -> 1x Quantum Aegis Cuirass (+45% Def, +5% Speed)."
  },

  // 39-42: Fauna Ecosystem & Biological Recipes
  {
    name: "Roasted Alien Steak (x1)",
    category: "food_drink",
    isItem: true,
    result: { id: 84, count: 1 },
    inputs: [ { id: 83, count: 1 }, { id: 15, count: 1 } ],
    grid: [83, 15, null, null],
    desc: "1x Raw Alien Meat + 1x Thermal Brick -> 1x Roasted Alien Steak (+65 Food, +25 HP, +20 Stamina)."
  },
  {
    name: "Bio-Composite Weave (x2)",
    category: "block",
    isItem: false,
    result: { id: 2, count: 2 },
    inputs: [ { id: 125, count: 4 } ],
    grid: [125, 125, 125, 125],
    desc: "4x Bio-Synthetic Sinew woven into high-tensile Carbon Composite structural panels."
  },
  {
    name: "Aerodynamic Flight Boots (x1)",
    category: "armor",
    isItem: true,
    result: { id: 123, count: 1 },
    inputs: [ { id: 126, count: 2 }, { id: 16, count: 2 } ],
    grid: [126, 126, 16, 16],
    desc: "2x Iridescent Aero-Plumage + 2x Carbon Rod -> 1x Mag-Lev Thruster Boots (+10% Def, +15% Speed)."
  },
  {
    name: "Armored Nanite Exosuit (x1)",
    category: "armor",
    isItem: true,
    result: { id: 121, count: 1 },
    inputs: [ { id: 127, count: 2 }, { id: 1, count: 2 } ],
    grid: [127, 127, 1, 1],
    desc: "2x Armored Nanite Pelt + 2x Titanium Plating -> 1x Titanium Hazard Exosuit (+30% Def)."
  },
  {
    name: "Smoked Glaze Filet (x1)",
    category: "food_drink",
    isItem: true,
    result: { id: 86, count: 1 },
    inputs: [ { id: 85, count: 1 }, { id: 15, count: 1 } ],
    grid: [85, 15, null, null],
    desc: "1x Raw Fish Filet + 1x Thermal Brick -> 1x Smoked Glaze Filet (+55 Food, +20 HP, +25 Stamina)."
  },
  {
    name: "Chitin Carapace Exosuit (x1)",
    category: "armor",
    isItem: true,
    result: { id: 121, count: 1 },
    inputs: [ { id: 129, count: 2 }, { id: 2, count: 2 } ],
    grid: [129, 129, 2, 2],
    desc: "2x Reinforced Chitin Carapace + 2x Carbon Composite -> 1x Titanium Hazard Exosuit (+30% Def)."
  }
];

// ==========================================
// 4. ATLAS IMAGE & TILE COORDINATE HELPERS
// ==========================================
const atlasImg = new Image();
atlasImg.src = 'assets/atlas.png';

function getTileCoord(tileIndex) {
  const col = tileIndex % 16;
  const row = Math.floor(tileIndex / 16);
  return { x: col * 32, y: row * 32, size: 32 };
}

function getRarityClass(rarity) {
  const r = rarity.toLowerCase();
  if (r.includes('uncommon')) return 'rarity-uncommon';
  if (r.includes('rare')) return 'rarity-rare';
  if (r.includes('epic')) return 'rarity-epic';
  if (r.includes('legendary')) return 'rarity-legendary';
  if (r.includes('fluid')) return 'rarity-fluid';
  return 'rarity-common';
}

// ==========================================
// 5. 3D VOXEL BLOCK LAB (Canvas 3D Renderer)
// ==========================================
class Voxel3DRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.rotX = -0.45;
    this.rotY = 0.65;
    this.zoom = 1.0;
    this.autoRotate = true;
    this.currentBlock = BLOCKS[3]; // Quantum Core by default
    this.isDragging = false;
    this.lastMouse = { x: 0, y: 0 };
    this.pulsePhase = 0;

    this.setupEvents();
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.animate();
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width * (window.devicePixelRatio || 1);
    this.canvas.height = rect.height * (window.devicePixelRatio || 1);
  }

  setupEvents() {
    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.lastMouse = { x: e.clientX, y: e.clientY };
      sfx.click();
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.lastMouse.x;
      const dy = e.clientY - this.lastMouse.y;
      this.rotY += dx * 0.01;
      this.rotX += dy * 0.01;
      this.lastMouse = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.zoom = Math.max(0.6, Math.min(2.0, this.zoom - e.deltaY * 0.0015));
    }, { passive: false });
  }

  setBlock(block) {
    this.currentBlock = block;
    this.updateHUD();
  }

  updateHUD() {
    const idEl = document.getElementById('stageBlockId');
    const nameEl = document.getElementById('stageBlockName');
    const rarityEl = document.getElementById('stageBlockRarity');
    const descEl = document.getElementById('stageBlockDesc');
    const categoryEl = document.getElementById('stageBlockCategory');
    const hardnessEl = document.getElementById('stageBlockHardness');
    const emissiveEl = document.getElementById('stageBlockEmissive');
    const tileEl = document.getElementById('stageBlockTile');

    if (idEl) idEl.textContent = `#${this.currentBlock.id.toString().padStart(2, '0')}`;
    if (nameEl) nameEl.textContent = this.currentBlock.name;
    if (rarityEl) {
      rarityEl.textContent = this.currentBlock.rarity;
      rarityEl.className = `rarity-pill ${getRarityClass(this.currentBlock.rarity)}`;
    }
    if (descEl) descEl.textContent = this.currentBlock.desc;
    if (categoryEl) categoryEl.textContent = this.currentBlock.type;
    if (hardnessEl) hardnessEl.textContent = `${this.currentBlock.hardness.toFixed(1)} (${this.currentBlock.hardness >= 5.0 ? 'Heavy / Indestructible' : this.currentBlock.hardness >= 3.0 ? 'Tough' : 'Standard'})`;
    if (emissiveEl) emissiveEl.textContent = this.currentBlock.emissive ? "Emissive (Radiant Glow)" : "Non-Emissive";
    if (tileEl) {
      const tileCol = this.currentBlock.tile % 16;
      const tileRow = Math.floor(this.currentBlock.tile / 16);
      tileEl.textContent = `Tile (${tileCol}, ${tileRow})`;
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    if (this.autoRotate && !this.isDragging) {
      this.rotY += 0.008;
    }
    this.pulsePhase += 0.03;
    this.render();
  }

  render() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;
    const size = Math.min(w, h) * 0.28 * this.zoom;

    // Perspective transformation calculation
    const cosY = Math.cos(this.rotY);
    const sinY = Math.sin(this.rotY);
    const cosX = Math.cos(this.rotX);
    const sinX = Math.sin(this.rotX);

    // 8 vertices of cube in local 3D space [-1, 1]
    const rawVertices = [
      [-1, -1, -1], [ 1, -1, -1], [ 1,  1, -1], [-1,  1, -1],
      [-1, -1,  1], [ 1, -1,  1], [ 1,  1,  1], [-1,  1,  1]
    ];

    const projected = rawVertices.map(v => {
      // Y rotation
      let x1 = v[0] * cosY - v[2] * sinY;
      let z1 = v[0] * sinY + v[2] * cosY;
      let y1 = v[1];

      // X rotation
      let y2 = y1 * cosX - z1 * sinX;
      let z2 = y1 * sinX + z1 * cosX;
      let x2 = x1;

      // Project to 2D screen
      const dist = 3.8;
      const f = dist / (dist + z2);
      return {
        x: cx + x2 * size * f,
        y: cy + y2 * size * f,
        z: z2
      };
    });

    // 6 Faces defined by vertex indices and normal vectors
    // 0: Back (-Z), 1: Front (+Z), 2: Top (-Y), 3: Bottom (+Y), 4: Left (-X), 5: Right (+X)
    const faces = [
      { indices: [0, 1, 2, 3], normal: [0, 0, -1], shade: 0.75, name: "Back" },
      { indices: [5, 4, 7, 6], normal: [0, 0, 1], shade: 0.95, name: "Front" },
      { indices: [4, 5, 1, 0], normal: [0, -1, 0], shade: 1.15, name: "Top" },
      { indices: [3, 2, 6, 7], normal: [0, 1, 0], shade: 0.5, name: "Bottom" },
      { indices: [4, 0, 3, 7], normal: [-1, 0, 0], shade: 0.8, name: "Left" },
      { indices: [1, 5, 6, 2], normal: [1, 0, 0], shade: 0.9, name: "Right" }
    ];

    // Compute face depth for painter's algorithm
    faces.forEach(face => {
      let sumZ = 0;
      face.indices.forEach(idx => sumZ += projected[idx].z);
      face.avgZ = sumZ / 4;

      // Rotate normal
      let nx1 = face.normal[0] * cosY - face.normal[2] * sinY;
      let nz1 = face.normal[0] * sinY + face.normal[2] * cosY;
      let ny1 = face.normal[1];
      let ny2 = ny1 * cosX - nz1 * sinX;
      let nz2 = ny1 * sinX + nz1 * cosX;
      face.rotatedNormalZ = nz2;
    });

    // Sort back to front
    faces.sort((a, b) => b.avgZ - a.avgZ);

    // Glow aura for emissive / epic / legendary blocks
    if (this.currentBlock.emissive || this.currentBlock.rarity === 'Legendary') {
      const pulse = Math.sin(this.pulsePhase) * 0.2 + 0.8;
      const glowGrad = ctx.createRadialGradient(cx, cy, size * 0.5, cx, cy, size * 1.8);
      const glowColor = this.currentBlock.rarity === 'Legendary' ? 'rgba(255, 60, 90,' : (this.currentBlock.emissive ? 'rgba(0, 240, 255,' : 'rgba(160, 80, 255,');
      glowGrad.addColorStop(0, `${glowColor} ${0.35 * pulse})`);
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, w, h);
    }

    // Render faces
    const tile = getTileCoord(this.currentBlock.tile);
    faces.forEach(face => {
      // Backface culling
      if (face.rotatedNormalZ > 0.05) return;

      const p0 = projected[face.indices[0]];
      const p1 = projected[face.indices[1]];
      const p2 = projected[face.indices[2]];
      const p3 = projected[face.indices[3]];

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.closePath();
      ctx.clip();

      // Draw texture if loaded
      if (atlasImg.complete && atlasImg.naturalWidth > 0) {
        // Approximate texture mapping with bilinear transform / bounding box
        const minX = Math.min(p0.x, p1.x, p2.x, p3.x);
        const maxX = Math.max(p0.x, p1.x, p2.x, p3.x);
        const minY = Math.min(p0.y, p1.y, p2.y, p3.y);
        const maxY = Math.max(p0.y, p1.y, p2.y, p3.y);

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(atlasImg, tile.x, tile.y, 32, 32, minX, minY, maxX - minX, maxY - minY);
      } else {
        ctx.fillStyle = "#1e293b";
        ctx.fill();
      }

      // Lighting modulation overlay
      const shade = Math.min(1.4, Math.max(0.3, face.shade));
      ctx.fillStyle = `rgba(0, 0, 0, ${Math.max(0, 1.0 - shade * 0.85)})`;
      ctx.fill();

      // Ambient Occlusion / Sci-fi edge wire
      ctx.restore();
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.closePath();
      ctx.strokeStyle = this.currentBlock.emissive ? "rgba(0, 240, 255, 0.6)" : "rgba(255, 255, 255, 0.18)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
  }
}

// ==========================================
// 6. CODEX COMPENDIUM SYSTEM
// ==========================================
class CodexManager {
  constructor(blocks, voxelLab) {
    this.blocks = blocks;
    this.voxelLab = voxelLab;
    this.container = document.getElementById('blockGrid');
    this.searchInput = document.getElementById('codexSearch');
    this.filterTabs = document.querySelectorAll('#codexTabs .tab-btn');
    this.activeFilter = 'all';
    this.searchTerm = '';

    this.init();
  }

  init() {
    this.render();

    this.filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        sfx.click();
        this.filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.activeFilter = tab.dataset.filter;
        this.render();
      });
    });

    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchTerm = e.target.value.toLowerCase().trim();
        this.render();
      });
    }
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = '';

    const filtered = this.blocks.filter(b => {
      if (this.activeFilter !== 'all') {
        if (b.category !== this.activeFilter) return false;
      }
      if (this.searchTerm) {
        return b.name.toLowerCase().includes(this.searchTerm) ||
               b.desc.toLowerCase().includes(this.searchTerm) ||
               b.type.toLowerCase().includes(this.searchTerm) ||
               b.rarity.toLowerCase().includes(this.searchTerm);
      }
      return true;
    });

    if (filtered.length === 0) {
      this.container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-dim); font-family: var(--font-mono);">No telemetry signals found matching query.</div>`;
      return;
    }

    filtered.forEach(block => {
      const card = document.createElement('div');
      const isActive = (this.voxelLab && this.voxelLab.currentBlock && this.voxelLab.currentBlock.id === block.id);
      card.className = `block-card ${isActive ? 'active' : ''}`;
      
      const tile = getTileCoord(block.tile);
      const bgPosX = -(tile.x / 32) * 52;
      const bgPosY = -(tile.y / 32) * 52;

      card.innerHTML = `
        <span class="block-id-badge">#${block.id.toString().padStart(2, '0')}</span>
        <div class="block-sprite" style="background-position: ${bgPosX}px ${bgPosY}px; background-size: 832px 832px;"></div>
        <div class="block-name">${block.name}</div>
        <span class="rarity-pill ${getRarityClass(block.rarity)}">${block.rarity}</span>
        <div class="block-stats">
          <span>H: ${block.hardness.toFixed(1)}</span>
          <span>•</span>
          <span>${block.emissive ? '⚡ Radiance' : 'Solid'}</span>
        </div>
      `;

      card.addEventListener('mouseenter', () => sfx.hover());
      card.addEventListener('click', () => {
        sfx.click();
        document.querySelectorAll('.block-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        if (this.voxelLab) {
          this.voxelLab.setBlock(block);
        }
      });

      this.container.appendChild(card);
    });
  }
}

// ==========================================
// 7. INTERACTIVE 2D CLIMATE MATRIX
// ==========================================
class ClimateMatrixExplorer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.temp = 0.4;
    this.moist = 0.5;
    this.tempSlider = document.getElementById('tempSlider');
    this.moistSlider = document.getElementById('moistSlider');
    this.tempValDisplay = document.getElementById('tempValDisplay');
    this.moistValDisplay = document.getElementById('moistValDisplay');

    this.init();
    this.render();
  }

  init() {
    this.canvas.addEventListener('click', (e) => {
      sfx.click();
      const rect = this.canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      this.temp = Math.max(-1, Math.min(1, nx));
      this.moist = Math.max(-1, Math.min(1, ny));
      this.syncSliders();
      this.render();
    });

    if (this.tempSlider) {
      this.tempSlider.addEventListener('input', (e) => {
        this.temp = parseFloat(e.target.value);
        this.syncSliders();
        this.render();
      });
    }

    if (this.moistSlider) {
      this.moistSlider.addEventListener('input', (e) => {
        this.moist = parseFloat(e.target.value);
        this.syncSliders();
        this.render();
      });
    }
  }

  syncSliders() {
    if (this.tempSlider) this.tempSlider.value = this.temp;
    if (this.moistSlider) this.moistSlider.value = this.moist;
    if (this.tempValDisplay) this.tempValDisplay.textContent = this.temp.toFixed(2);
    if (this.moistValDisplay) this.moistValDisplay.textContent = this.moist.toFixed(2);
  }

  getBiome(t, m) {
    if (t > 0.05 && m > 0.0) {
      return {
        name: "Xenoflora Basin",
        badge: "Warm & Moist Rainforest",
        badgeColor: "rgba(0, 255, 157, 0.2)",
        surface: "Bioluminescent Flora (ID #07)",
        subsurface: "Alien Regolith (ID #06)",
        fogColor: "rgb(26, 230, 191)",
        fogHex: "#1ae6bf",
        structures: "Mega-Trees with Quantum Core nodes, Lumen Mushrooms, Aquifers",
        desc: "Fertile extraterrestrial rainforest with massive canopy trees, hanging bio-photonic lumen pods, and zero-seam continuous turf edge bleeding."
      };
    } else if (t > 0.05 && m <= 0.0) {
      return {
        name: "Nanite Plains",
        badge: "Warm & Arid Dunes",
        badgeColor: "rgba(255, 183, 0, 0.2)",
        surface: "Nanite Sand (ID #09)",
        subsurface: "Carbon Composite (ID #02)",
        fogColor: "rgb(230, 184, 64)",
        fogHex: "#e6b840",
        structures: "Crashed Recon Probes, Titanium Pillars, Solar Collector Arrays",
        desc: "Rolling dunes of metallic nanobots shimmering in planetary sunlight. Subsurface layers host salvageable titanium wreckage and cyber crates."
      };
    } else if (t <= 0.05 && m <= 0.0) {
      return {
        name: "Basalt Badlands",
        badge: "Cold & Arid Volcanic",
        badgeColor: "rgba(255, 51, 88, 0.2)",
        surface: "Basalt Bedrock (ID #08)",
        subsurface: "Basalt Bedrock & Obsidian Slag",
        fogColor: "rgb(194, 66, 39)",
        fogHex: "#c24227",
        structures: "Hollow Basalt Chimneys, Molten Magma Shafts, Thermal Brick Hearths",
        desc: "Scorched volcanic crags fractured with incandescent molten lava lakes. Water breaches instantly solidify into glossy Obsidian Slag."
      };
    } else {
      return {
        name: "Crystal Highlands",
        badge: "Cryogenic Volatile Peaks",
        badgeColor: "rgba(217, 70, 239, 0.2)",
        surface: "Permafrost Crust (ID #26)",
        subsurface: "Basalt Bedrock & Silica Shale",
        fogColor: "rgb(108, 66, 166)",
        fogHex: "#6c42a6",
        structures: "Prismatic Crystal Spires (8-18 blocks tall), Diamond Ore, Cryo Spouts",
        desc: "Majestic sub-zero mountain peaks rich with piezoelectric xenocrystal veins and towering stepped crystalline monoliths."
      };
    }
  }

  render() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    ctx.clearRect(0, 0, w, h);

    // 4 Quadrants background
    // Top-Right: Xenoflora (Emerald/Cyan)
    ctx.fillStyle = "rgba(0, 255, 157, 0.18)";
    ctx.fillRect(w/2, 0, w/2, h/2);

    // Bottom-Right: Nanite Plains (Amber/Gold)
    ctx.fillStyle = "rgba(255, 183, 0, 0.18)";
    ctx.fillRect(w/2, h/2, w/2, h/2);

    // Bottom-Left: Basalt Badlands (Crimson/Magma)
    ctx.fillStyle = "rgba(255, 51, 88, 0.18)";
    ctx.fillRect(0, h/2, w/2, h/2);

    // Top-Left: Crystal Highlands (Purple/Glacial)
    ctx.fillStyle = "rgba(217, 70, 239, 0.18)";
    ctx.fillRect(0, 0, w/2, h/2);

    // Grid lines & cross axes
    ctx.strokeStyle = "rgba(0, 240, 255, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(w/2, 0); ctx.lineTo(w/2, h);
    ctx.moveTo(0, h/2); ctx.lineTo(w, h/2);
    ctx.stroke();

    // Subtle noise grid marks
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    for (let i = 1; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo((w/6)*i, 0); ctx.lineTo((w/6)*i, h);
      ctx.moveTo(0, (h/6)*i); ctx.lineTo(w, (h/6)*i);
      ctx.stroke();
    }

    // Quadrant Labels
    ctx.font = "700 12px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#00ff9d";
    ctx.fillText("XENOFLORA BASIN", w/2 + 16, 28);
    ctx.fillStyle = "#d946ef";
    ctx.fillText("CRYSTAL HIGHLANDS", 16, 28);
    ctx.fillStyle = "#ff3358";
    ctx.fillText("BASALT BADLANDS", 16, h - 16);
    ctx.fillStyle = "#ffb700";
    ctx.fillText("NANITE PLAINS", w/2 + 16, h - 16);

    // Axis Labels
    ctx.font = "600 10px 'JetBrains Mono', monospace";
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.fillText("MOISTURE (+1.0)", w/2 - 45, 14);
    ctx.fillText("ARID (-1.0)", w/2 - 30, h - 6);
    ctx.fillText("COLD (-1.0)", 8, h/2 - 8);
    ctx.fillText("WARM (+1.0)", w - 75, h/2 - 8);

    // Active Reticle Position
    const px = ((this.temp + 1) / 2) * w;
    const py = ((-this.moist + 1) / 2) * h;

    // Glowing target cursor
    ctx.beginPath();
    ctx.arc(px, py, 9, 0, Math.PI * 2);
    ctx.strokeStyle = "#00f0ff";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(px, py, 3, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    // Update Report Panel
    const biome = this.getBiome(this.temp, this.moist);
    const nameEl = document.getElementById('biomeReportName');
    const badgeEl = document.getElementById('biomeReportBadge');
    const surfEl = document.getElementById('biomeReportSurface');
    const subEl = document.getElementById('biomeReportSubsurface');
    const fogEl = document.getElementById('biomeReportFog');
    const swatchEl = document.getElementById('biomeFogSwatch');
    const structEl = document.getElementById('biomeReportStructures');
    const descEl = document.getElementById('biomeReportDesc');

    if (nameEl) nameEl.textContent = biome.name;
    if (badgeEl) {
      badgeEl.textContent = biome.badge;
      badgeEl.style.backgroundColor = biome.badgeColor;
    }
    if (surfEl) surfEl.textContent = biome.surface;
    if (subEl) subEl.textContent = biome.subsurface;
    if (fogEl) fogEl.textContent = biome.fogColor;
    if (swatchEl) swatchEl.style.backgroundColor = biome.fogHex;
    if (structEl) structEl.textContent = biome.structures;
    if (descEl) descEl.textContent = biome.desc;
  }
}

// ==========================================
// 8. FLUID DYNAMICS & THERMODYNAMICS SANDBOX
// ==========================================
class FluidSandbox {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.cols = 64;
    this.rows = 40;
    this.grid = new Array(this.cols * this.rows).fill(0); // 0: empty, 1: solid, 2: water, 3: magma, 4: obsidian
    this.steamParticles = [];
    this.sprayParticles = [];
    this.selectedFluid = 'water';
    this.hydroHead = 6;

    this.initTerrain();
    this.setupEvents();
    this.animate();
  }

  idx(x, y) {
    return y * this.cols + x;
  }

  initTerrain() {
    this.grid.fill(0);
    // Boundaries
    for (let x = 0; x < this.cols; x++) {
      this.grid[this.idx(x, this.rows - 1)] = 1; // bottom floor
    }
    for (let y = 0; y < this.rows; y++) {
      this.grid[this.idx(0, y)] = 1;
      this.grid[this.idx(this.cols - 1, y)] = 1;
    }
    // Submerged terrain shelves & chasm
    for (let x = 8; x < 28; x++) {
      this.grid[this.idx(x, 26)] = 1;
    }
    for (let x = 36; x < 56; x++) {
      this.grid[this.idx(x, 22)] = 1;
    }
    // High-pressure containment chamber on left
    for (let y = 10; y < 26; y++) {
      this.grid[this.idx(27, y)] = 1;
    }

    // Pre-populate chamber with pressurized water
    for (let y = 14; y < 26; y++) {
      for (let x = 10; x < 27; x++) {
        this.grid[this.idx(x, y)] = 2;
      }
    }

    // Pre-populate right reservoir with magma
    for (let y = 30; y < 39; y++) {
      for (let x = 38; x < 54; x++) {
        this.grid[this.idx(x, y)] = 3;
      }
    }
  }

  setupEvents() {
    let isDrawing = false;
    const addAt = (clientX, clientY) => {
      const rect = this.canvas.getBoundingClientRect();
      const gx = Math.floor(((clientX - rect.left) / rect.width) * this.cols);
      const gy = Math.floor(((clientY - rect.top) / rect.height) * this.rows);
      if (gx > 0 && gx < this.cols - 1 && gy > 0 && gy < this.rows - 1) {
        const type = this.selectedFluid === 'water' ? 2 : (this.selectedFluid === 'magma' ? 3 : 1);
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            const nx = gx + dx;
            const ny = gy + dy;
            if (nx > 0 && nx < this.cols - 1 && ny > 0 && ny < this.rows - 1) {
              if (this.grid[this.idx(nx, ny)] !== 1) {
                this.grid[this.idx(nx, ny)] = type;
              }
            }
          }
        }
      }
    };

    this.canvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      sfx.click();
      addAt(e.clientX, e.clientY);
    });

    window.addEventListener('mousemove', (e) => {
      if (isDrawing) addAt(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', () => { isDrawing = false; });

    document.querySelectorAll('.fluid-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sfx.click();
        document.querySelectorAll('.fluid-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedFluid = btn.dataset.type;
      });
    });

    const resetBtn = document.getElementById('resetFluidBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        sfx.click();
        this.initTerrain();
      });
    }

    const breachBtn = document.getElementById('triggerBreachBtn');
    if (breachBtn) {
      breachBtn.addEventListener('click', () => {
        sfx.shatter();
        // Break 3 blocks in containment wall
        for (let y = 20; y <= 23; y++) {
          this.grid[this.idx(27, y)] = 0;
        }
        // Spawn ballistic spray particles
        for (let i = 0; i < 40; i++) {
          this.sprayParticles.push({
            x: 28, y: 21 + Math.random() * 2,
            vx: 1.5 + Math.random() * 2.5,
            vy: (Math.random() - 0.4) * 1.5,
            life: 1.0
          });
        }
      });
    }
  }

  step() {
    // Cellular automata fluid simulation
    // Downwards gravity priority, lateral spreading, and thermodynamic reactions
    for (let y = this.rows - 2; y >= 1; y--) {
      for (let x = 1; x < this.cols - 1; x++) {
        const cur = this.grid[this.idx(x, y)];
        if (cur === 2 || cur === 3) { // Fluid (2: Water, 3: Magma)
          // 1. Thermodynamic reaction: Water meets Magma
          const neighbors = [
            this.idx(x+1, y), this.idx(x-1, y),
            this.idx(x, y+1), this.idx(x, y-1)
          ];
          let reacted = false;
          for (let nIdx of neighbors) {
            const nVal = this.grid[nIdx];
            if ((cur === 2 && nVal === 3) || (cur === 3 && nVal === 2)) {
              // Convert to Obsidian Slag!
              this.grid[this.idx(x, y)] = 4;
              this.grid[nIdx] = 4;
              reacted = true;
              sfx.laser(0.8);
              // Spawn buoyant steam plume
              for (let s = 0; s < 6; s++) {
                this.steamParticles.push({
                  x: x + (Math.random() - 0.5),
                  y: y,
                  vx: (Math.random() - 0.5) * 0.4,
                  vy: -0.8 - Math.random() * 0.6,
                  life: 1.0
                });
              }
              break;
            }
          }
          if (reacted) continue;

          // 2. Downward gravity priority
          const downIdx = this.idx(x, y + 1);
          if (this.grid[downIdx] === 0) {
            this.grid[downIdx] = cur;
            this.grid[this.idx(x, y)] = 0;
          } else {
            // Lateral spreading with hydrostatic reach
            const dir = Math.random() < 0.5 ? 1 : -1;
            const side1 = this.idx(x + dir, y);
            const side2 = this.idx(x - dir, y);
            if (this.grid[side1] === 0) {
              this.grid[side1] = cur;
              this.grid[this.idx(x, y)] = 0;
            } else if (this.grid[side2] === 0) {
              this.grid[side2] = cur;
              this.grid[this.idx(x, y)] = 0;
            }
          }
        }
      }
    }

    // Update steam particles
    for (let i = this.steamParticles.length - 1; i >= 0; i--) {
      const p = this.steamParticles[i];
      p.x += p.vx + Math.sin(p.life * 10) * 0.05;
      p.y += p.vy;
      p.life -= 0.015;
      if (p.life <= 0) this.steamParticles.splice(i, 1);
    }

    // Update spray particles
    for (let i = this.sprayParticles.length - 1; i >= 0; i--) {
      const p = this.sprayParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08; // gravity
      p.life -= 0.025;
      if (p.life <= 0) this.sprayParticles.splice(i, 1);
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.step();
    this.render();
  }

  render() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    ctx.clearRect(0, 0, w, h);

    const cellW = w / this.cols;
    const cellH = h / this.rows;

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const val = this.grid[this.idx(x, y)];
        if (val === 1) { // Solid rock / obstacle
          ctx.fillStyle = "#1e293b";
          ctx.fillRect(x * cellW, y * cellH, cellW + 0.5, cellH + 0.5);
          ctx.strokeStyle = "rgba(0, 240, 255, 0.15)";
          ctx.strokeRect(x * cellW, y * cellH, cellW, cellH);
        } else if (val === 2) { // Planetary Water
          ctx.fillStyle = "rgba(0, 180, 255, 0.75)";
          ctx.fillRect(x * cellW, y * cellH, cellW, cellH);
        } else if (val === 3) { // Molten Magma
          ctx.fillStyle = "rgba(255, 90, 20, 0.9)";
          ctx.fillRect(x * cellW, y * cellH, cellW, cellH);
        } else if (val === 4) { // Obsidian Slag
          ctx.fillStyle = "#0d0b14";
          ctx.fillRect(x * cellW, y * cellH, cellW, cellH);
          ctx.strokeStyle = "#8b5cf6";
          ctx.strokeRect(x * cellW, y * cellH, cellW, cellH);
        }
      }
    }

    // Render steam plumes
    this.steamParticles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x * cellW, p.y * cellH, cellW * (2 - p.life), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220, 240, 255, ${p.life * 0.5})`;
      ctx.fill();
    });

    // Render breach spray
    this.sprayParticles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x * cellW, p.y * cellH, cellW * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 240, 255, ${p.life * 0.9})`;
      ctx.fill();
    });
  }
}

// ==========================================
// 9. PROGRESSIVE MINING SIMULATION & DECALS
// ==========================================
class MiningSimulator {
  constructor() {
    this.zone = document.getElementById('miningZone');
    this.targetFace = document.getElementById('miningFace');
    this.decalCanvas = document.getElementById('miningDecalCanvas');
    this.gaugeFill = document.getElementById('reticleFill');
    this.pctDisplay = document.getElementById('miningPctDisplay');
    this.blockSelector = document.getElementById('miningBlockSelector');
    this.toolSelector = document.getElementById('miningToolSelector');

    this.ctx = this.decalCanvas ? this.decalCanvas.getContext('2d') : null;
    this.isMining = false;
    this.progress = 0; // 0.0 to 1.0
    this.selectedBlock = BLOCKS[1]; // Titanium Plating default
    this.selectedTool = 'none';
    this.toolMultiplier = 1.0;
    this.requiredDuration = 2.10;
    this.lastTime = 0;

    this.init();
  }

  init() {
    if (!this.zone) return;

    this.calculateDuration();
    this.updateTarget();

    if (this.blockSelector) {
      this.blockSelector.addEventListener('change', (e) => {
        const id = parseInt(e.target.value, 10);
        this.selectedBlock = BLOCKS.find(b => b.id === id) || BLOCKS[1];
        this.progress = 0;
        this.calculateDuration();
        this.updateTarget();
        sfx.click();
      });
    }

    if (this.toolSelector) {
      this.toolSelector.addEventListener('change', (e) => {
        this.selectedTool = e.target.value;
        this.progress = 0;
        this.calculateDuration();
        this.updateTarget();
        sfx.click();
      });
    }

    const startMining = (e) => {
      e.preventDefault();
      this.isMining = true;
      this.lastTime = performance.now();
      sfx.click();
    };

    const stopMining = () => {
      this.isMining = false;
      this.progress = 0;
      this.updateHUD();
      this.clearDecals();
    };

    this.zone.addEventListener('mousedown', startMining);
    window.addEventListener('mouseup', stopMining);
    this.zone.addEventListener('touchstart', startMining, { passive: false });
    window.addEventListener('touchend', stopMining);

    this.loop();
  }

  calculateDuration() {
    let mult = 1.0;
    const bId = this.selectedBlock.id;
    if (this.selectedTool === 'laser') {
      // Mining Laser: 2.5x on stone & ores
      mult = (bId === 20 || bId === 1 || bId === 40 || bId === 45) ? 2.5 : 1.2;
    } else if (this.selectedTool === 'drill') {
      // Thermal Plasma Drill: 4.5x on dense mantle, titanium, obsidian
      mult = (bId === 1 || bId === 40 || bId === 45 || bId === 20) ? 4.5 : 1.5;
    } else if (this.selectedTool === 'cutter') {
      // Vibro-Cutter: 4.0x on foliage
      mult = (bId === 13) ? 4.0 : 1.0;
    } else if (this.selectedTool === 'excavator') {
      // Sonic Excavator: 4.0x on soils / sands
      mult = (bId === 20) ? 2.0 : 1.0;
    }
    this.toolMultiplier = mult;
    const baseDuration = Math.max(0.12, this.selectedBlock.hardness * 0.70);
    this.requiredDuration = Math.max(0.12, baseDuration / mult);
  }

  updateTarget() {
    if (!this.targetFace) return;
    const tile = getTileCoord(this.selectedBlock.tile);
    const scale = 130;
    const bgX = -(tile.x / 32) * scale;
    const bgY = -(tile.y / 32) * scale;
    this.targetFace.style.backgroundPosition = `${bgX}px ${bgY}px`;
    this.targetFace.style.backgroundSize = `${scale * 16}px ${scale * 16}px`;

    const infoEl = document.getElementById('miningDurationInfo');
    if (infoEl) {
      infoEl.textContent = `Hardness: ${this.selectedBlock.hardness.toFixed(1)} | Tool Multiplier: ${this.toolMultiplier.toFixed(1)}x | Excavation Time: ${this.requiredDuration.toFixed(2)}s`;
    }
  }

  loop() {
    requestAnimationFrame(() => this.loop());
    const now = performance.now();
    const dt = (now - this.lastTime) / 1000;
    this.lastTime = now;

    if (this.isMining) {
      this.progress += dt / this.requiredDuration;
      sfx.laser(this.progress);

      // Micro vibration on target block
      if (this.targetFace) {
        const wobble = (Math.random() - 0.5) * 4 * this.progress;
        this.targetFace.style.transform = `translate(${wobble}px, ${wobble}px)`;
      }

      if (this.progress >= 1.0) {
        this.progress = 1.0;
        this.shatterBlock();
        this.progress = 0;
      }

      this.updateHUD();
      this.drawDecals();
    } else {
      if (this.targetFace) this.targetFace.style.transform = 'translate(0, 0)';
    }
  }

  drawDecals() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const w = this.decalCanvas.width;
    const h = this.decalCanvas.height;
    ctx.clearRect(0, 0, w, h);

    if (this.progress <= 0.05) return;

    // Decal stage (1 to 10)
    const stage = Math.min(10, Math.floor(this.progress * 10) + 1);

    // Chromatic stress coloration
    let strokeColor;
    if (this.progress < 0.35) {
      strokeColor = "rgba(0, 240, 255, 0.85)"; // High-frequency Cyan
    } else if (this.progress < 0.70) {
      strokeColor = "rgba(255, 183, 0, 0.9)"; // Amber structural stress
    } else {
      strokeColor = "rgba(255, 51, 88, 0.95)"; // Critical Red-Orange
    }

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2 + stage * 0.3;
    ctx.lineCap = "round";

    // 10 distinct procedural fracture lines
    const cracks = [
      [[w*0.5, h*0.5], [w*0.3, h*0.3], [w*0.15, h*0.25]],
      [[w*0.5, h*0.5], [w*0.7, h*0.4], [w*0.85, h*0.3]],
      [[w*0.5, h*0.5], [w*0.55, h*0.75], [w*0.45, h*0.9]],
      [[w*0.3, h*0.3], [w*0.25, h*0.55], [w*0.1, h*0.65]],
      [[w*0.7, h*0.4], [w*0.8, h*0.65], [w*0.95, h*0.7]],
      [[w*0.5, h*0.5], [w*0.4, h*0.2], [w*0.35, h*0.05]],
      [[w*0.55, h*0.75], [w*0.75, h*0.85], [w*0.9, h*0.95]],
      [[w*0.4, h*0.2], [w*0.65, h*0.15], [w*0.8, h*0.05]],
      [[w*0.25, h*0.55], [w*0.35, h*0.8], [w*0.2, h*0.95]],
      [[w*0.5, h*0.5], [w*0.1, h*0.5], [w*0.05, h*0.45]]
    ];

    for (let s = 0; s < stage; s++) {
      const c = cracks[s];
      ctx.beginPath();
      ctx.moveTo(c[0][0], c[0][1]);
      for (let i = 1; i < c.length; i++) {
        ctx.lineTo(c[i][0], c[i][1]);
      }
      ctx.stroke();
    }
  }

  clearDecals() {
    if (this.ctx) this.ctx.clearRect(0, 0, this.decalCanvas.width, this.decalCanvas.height);
  }

  updateHUD() {
    const pct = Math.floor(this.progress * 100);
    if (this.gaugeFill) this.gaugeFill.style.width = `${pct}%`;
    if (this.pctDisplay) this.pctDisplay.textContent = `${pct}%`;
  }

  shatterBlock() {
    sfx.shatter();
    // Spawn 18 ballistic debris particles
    const rect = this.targetFace.getBoundingClientRect();
    const zoneRect = this.zone.getBoundingClientRect();

    for (let i = 0; i < 18; i++) {
      const part = document.createElement('div');
      part.className = 'mining-debris-particle';
      const size = 6 + Math.random() * 8;
      part.style.width = `${size}px`;
      part.style.height = `${size}px`;
      part.style.backgroundColor = this.selectedBlock.emissive ? "#00f0ff" : "#94a3b8";
      part.style.left = `${rect.left - zoneRect.left + rect.width / 2}px`;
      part.style.top = `${rect.top - zoneRect.top + rect.height / 2}px`;

      const angle = Math.random() * Math.PI * 2;
      const speed = 80 + Math.random() * 120;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed - 40;

      this.zone.appendChild(part);

      let startTime = performance.now();
      const animatePart = (now) => {
        const elapsed = (now - startTime) / 1000;
        if (elapsed > 0.8) {
          part.remove();
          return;
        }
        const px = (rect.left - zoneRect.left + rect.width / 2) + vx * elapsed;
        const py = (rect.top - zoneRect.top + rect.height / 2) + vy * elapsed + 0.5 * 380 * elapsed * elapsed;
        part.style.left = `${px}px`;
        part.style.top = `${py}px`;
        part.style.opacity = `${1.0 - elapsed / 0.8}`;
        requestAnimationFrame(animatePart);
      };
      requestAnimationFrame(animatePart);
    }
  }
}

// ==========================================
// 10. HOLOGRAPHIC 2x2 CRAFTING MATRIX (33 RECIPES)
// ==========================================
class CraftingMatrixLab {
  constructor() {
    this.slots = [
      document.getElementById('craftSlot0'),
      document.getElementById('craftSlot1'),
      document.getElementById('craftSlot2'),
      document.getElementById('craftSlot3')
    ];
    this.resultSlot = document.getElementById('craftResultSlot');
    this.recipeList = document.getElementById('recipeList');
    this.filterBtns = document.querySelectorAll('#recipeFilterTabs button');
    this.gridState = [null, null, null, null];
    this.activeFilter = 'all';

    this.init();
  }

  init() {
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sfx.click();
        this.filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeFilter = btn.dataset.filter;
        this.renderRecipes();
      });
    });

    this.renderRecipes();
    this.loadRecipe(RECIPES[17]); // Default to Mining Laser
  }

  renderRecipes() {
    if (!this.recipeList) return;
    this.recipeList.innerHTML = '';

    const filtered = RECIPES.filter(rec => {
      if (this.activeFilter === 'all') return true;
      if (this.activeFilter === 'block') return rec.category === 'block';
      if (this.activeFilter === 'tool') return rec.category === 'tool';
      if (this.activeFilter === 'food_drink') return rec.category === 'food_drink';
      if (this.activeFilter === 'stim') return rec.category === 'stim';
      if (this.activeFilter === 'armor') return rec.category === 'armor';
      return true;
    });

    filtered.forEach((rec, idx) => {
      const item = document.createElement('div');
      item.className = `recipe-item ${idx === 0 ? 'active' : ''}`;
      const entity = rec.isItem ? getItemById(rec.result.id) : BLOCKS.find(b => b.id === rec.result.id);
      const rarity = entity ? entity.rarity : 'Common';

      item.innerHTML = `
        <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${rec.name}</span>
        <span class="rarity-pill ${getRarityClass(rarity)}">${rarity}</span>
      `;

      item.addEventListener('mouseenter', () => sfx.hover());
      item.addEventListener('click', () => {
        sfx.craft();
        document.querySelectorAll('.recipe-item').forEach(r => r.classList.remove('active'));
        item.classList.add('active');
        this.loadRecipe(rec);
      });

      this.recipeList.appendChild(item);
    });

    if (filtered.length > 0) {
      this.loadRecipe(filtered[0]);
    }
  }

  loadRecipe(recipe) {
    this.gridState = [...recipe.grid];
    this.updateGridDisplay(recipe);
  }

  updateGridDisplay(recipe) {
    this.slots.forEach((slot, i) => {
      if (!slot) return;
      slot.innerHTML = '';
      const entId = this.gridState[i];
      if (entId !== null && entId !== undefined) {
        const ent = getEntityById(entId);
        if (ent) {
          const tile = getTileCoord(ent.tile);
          const bgX = -(tile.x / 32) * 44;
          const bgY = -(tile.y / 32) * 44;
          slot.innerHTML = `
            <div class="block-sprite" style="width: 44px; height: 44px; background-position: ${bgX}px ${bgY}px; background-size: 704px 704px;" title="${ent.name}"></div>
          `;
        }
      }
    });

    if (this.resultSlot) {
      this.resultSlot.innerHTML = '';
      const resultEnt = recipe.isItem ? getItemById(recipe.result.id) : BLOCKS.find(b => b.id === recipe.result.id);
      if (resultEnt) {
        const tile = getTileCoord(resultEnt.tile);
        const bgX = -(tile.x / 32) * 52;
        const bgY = -(tile.y / 32) * 52;
        this.resultSlot.innerHTML = `
          <div class="block-sprite" style="width: 52px; height: 52px; background-position: ${bgX}px ${bgY}px; background-size: 832px 832px;" title="${resultEnt.name}"></div>
          <span style="position: absolute; bottom: 4px; right: 6px; font-family: var(--font-mono); font-size: 0.8rem; font-weight: 800; color: #fff; text-shadow: 0 0 6px #000;">x${recipe.result.count}</span>
        `;
      }
    }

    const descEl = document.getElementById('craftRecipeDesc');
    if (descEl) descEl.textContent = recipe.desc;
  }
}

// ==========================================
// 10.5 CYBERNETIC ARMORY & ITEMS MANAGER
// ==========================================
class ArmoryManager {
  constructor(rpg, rigManager = null) {
    this.rpg = rpg;
    this.rigManager = rigManager;
    this.container = document.getElementById('armoryGrid');
    this.tabs = document.querySelectorAll('#armoryTabs .tab-btn');
    this.searchInput = document.getElementById('armorySearch');
    this.activeFilter = 'all';
    this.searchTerm = '';

    this.init();
  }

  init() {
    this.render();

    this.tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        sfx.click();
        this.tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.activeFilter = tab.dataset.filter;
        this.render();
      });
    });

    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchTerm = e.target.value.toLowerCase().trim();
        this.render();
      });
    }
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = '';

    const filtered = ITEMS.filter(item => {
      if (this.activeFilter !== 'all') {
        if (this.activeFilter !== item.category) return false;
      }
      if (this.searchTerm) {
        return item.name.toLowerCase().includes(this.searchTerm) ||
               item.desc.toLowerCase().includes(this.searchTerm) ||
               item.specText.toLowerCase().includes(this.searchTerm);
      }
      return true;
    });

    if (filtered.length === 0) {
      this.container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-dim); font-family: var(--font-mono);">No armory items matching query.</div>`;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'item-card';

      const tile = getTileCoord(item.tile);
      const bgX = -(tile.x / 32) * 44;
      const bgY = -(tile.y / 32) * 44;

      let catClass = 'cat-tool';
      let catLabel = 'TOOL';
      let actionLabel = 'Equip In Mining Lab';
      let actionIcon = '⚡';
      let isItemEquipped = false;

      if (item.category === 'armor') {
        catClass = 'cat-armor';
        catLabel = `ARMOR: ${item.armorSlot.toUpperCase()}`;
        isItemEquipped = this.rigManager && this.rigManager.isEquipped(item.id);
        if (isItemEquipped) {
          actionLabel = '✓ Equipped in Rig';
          actionIcon = '🛡️';
        } else {
          actionLabel = 'Equip In Exosuit Rig';
          actionIcon = '🛡️';
        }
      } else if (item.category === 'food') {
        catClass = 'cat-food';
        catLabel = 'FOOD';
        actionLabel = 'Consume Ration';
        actionIcon = '🍏';
      } else if (item.category === 'drink') {
        catClass = 'cat-drink';
        catLabel = 'DRINK';
        actionLabel = 'Drink Hydration';
        actionIcon = '💧';
      } else if (item.category === 'stim') {
        catClass = 'cat-stim';
        catLabel = 'MEDICAL STIM';
        actionLabel = 'Inject Bio-Stim';
        actionIcon = '💉';
      } else if (item.category === 'material') {
        catClass = 'cat-material';
        catLabel = 'FAUNA MATERIAL';
        actionLabel = 'Crafting Component';
        actionIcon = '🧬';
      }

      card.innerHTML = `
        <div>
          <div class="item-header">
            <div class="item-icon-frame">
              <div class="block-sprite" style="width: 44px; height: 44px; background-position: ${bgX}px ${bgY}px; background-size: 704px 704px;"></div>
            </div>
            <div class="item-title-col">
              <div class="item-title" title="${item.name}">${item.name}</div>
              <div class="item-badges">
                <span class="item-cat-tag ${catClass}">${catLabel}</span>
                <span class="rarity-pill ${getRarityClass(item.rarity)}">${item.rarity}</span>
                <span style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-dim);">#${item.id}</span>
              </div>
            </div>
          </div>

          <p class="item-desc" style="margin-top: 10px;">${item.desc}</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px;">
          <div class="item-specs-box">
            <div class="spec-row">
              <span style="color: var(--text-dim);">Effect:</span>
              <span class="text-cyan font-mono" style="font-weight: 700;">${item.specText}</span>
            </div>
            <div class="spec-row">
              <span style="color: var(--text-dim);">Mastery XP:</span>
              <span class="text-emerald font-mono">+${item.xpAwarded} XP (${item.linkedSkill})</span>
            </div>
          </div>

          <button class="item-action-btn ${isItemEquipped ? 'equipped' : ''}">
            <span>${actionIcon}</span>
            <span>${actionLabel}</span>
          </button>
        </div>
      `;

      const actBtn = card.querySelector('.item-action-btn');
      actBtn.addEventListener('click', () => {
        if (item.category === 'armor') {
          if (this.rigManager) {
            if (this.rigManager.isEquipped(item.id)) {
              this.rigManager.unequipSlot(item.armorSlot);
            } else {
              this.rigManager.equipItem(item);
            }
            this.render();
          }
        } else if (item.category === 'tool') {
          sfx.click();
          const toolSelect = document.getElementById('miningToolSelector');
          if (toolSelect) {
            if (item.id === 64) toolSelect.value = 'laser';
            else if (item.id === 65) toolSelect.value = 'drill';
            else if (item.id === 66) toolSelect.value = 'cutter';
            else if (item.id === 67) toolSelect.value = 'excavator';
            toolSelect.dispatchEvent(new Event('change'));
          }
          if (this.rpg) {
            this.rpg.addMasteryXP(item.linkedSkill, item.xpAwarded);
            this.rpg.spawnToast("Equipped", `Equipped ${item.name} (${item.specText})`);
          }
        } else if (item.category === 'material') {
          sfx.craft();
          if (this.rpg) {
            this.rpg.addMasteryXP(item.linkedSkill, item.xpAwarded);
            this.rpg.spawnToast("Bio-Sample", `Harvested ${item.name} (+${item.xpAwarded} XP Astrobiology)`);
          }
          const craftSec = document.getElementById('crafting');
          if (craftSec) craftSec.scrollIntoView({ behavior: 'smooth' });
        } else {
          if (this.rpg) {
            this.rpg.applyItem(item);
          }
        }
      });

      this.container.appendChild(card);
    });
  }
}

// ==========================================
// 10.8 EXOSUIT RIG & DEFENSE SIMULATOR
// ==========================================
class ExosuitRigManager {
  constructor(rpg) {
    this.rpg = rpg;
    this.armoryManager = null;

    this.equipped = {
      head: null,
      chest: null,
      legs: null,
      feet: null
    };

    this.container = document.getElementById('exosuitRigBay');
    this.statusPill = document.getElementById('rigStatusPill');
    this.totalDefenseVal = document.getElementById('totalDefenseVal');
    this.defenseTrackFill = document.getElementById('defenseTrackFill');
    this.rigOxygenVal = document.getElementById('rigOxygenVal');
    this.rigSpeedVal = document.getElementById('rigSpeedVal');
    this.blastOutcomeReadout = document.getElementById('blastOutcomeReadout');

    this.socketCards = {
      head: document.getElementById('socketHead'),
      chest: document.getElementById('socketChest'),
      legs: document.getElementById('socketLegs'),
      feet: document.getElementById('socketFeet')
    };

    this.socketFrames = {
      head: document.getElementById('socketHeadFrame'),
      chest: document.getElementById('socketChestFrame'),
      legs: document.getElementById('socketLegsFrame'),
      feet: document.getElementById('socketFeetFrame')
    };

    this.socketNames = {
      head: document.getElementById('socketHeadName'),
      chest: document.getElementById('socketChestName'),
      legs: document.getElementById('socketLegsName'),
      feet: document.getElementById('socketFeetName')
    };

    this.socketBonuses = {
      head: document.getElementById('socketHeadBonus'),
      chest: document.getElementById('socketChestBonus'),
      legs: document.getElementById('socketLegsBonus'),
      feet: document.getElementById('socketFeetBonus')
    };

    this.socketUnequipBtns = {
      head: document.getElementById('socketHeadUnequip'),
      chest: document.getElementById('socketChestUnequip'),
      legs: document.getElementById('socketLegsUnequip'),
      feet: document.getElementById('socketFeetUnequip')
    };

    this.blastBtn = document.getElementById('simulateHazardBlastBtn');
    this.titaniumSetBtn = document.getElementById('equipTitaniumSetBtn');
    this.quantumSetBtn = document.getElementById('equipQuantumSetBtn');
    this.unequipAllBtn = document.getElementById('unequipAllArmorBtn');

    this.init();
  }

  init() {
    for (let slot in this.socketUnequipBtns) {
      const btn = this.socketUnequipBtns[slot];
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.unequipSlot(slot);
        });
      }
    }

    for (let slot in this.socketCards) {
      const card = this.socketCards[slot];
      if (card) {
        card.addEventListener('click', () => {
          if (this.equipped[slot]) {
            this.unequipSlot(slot);
          } else {
            sfx.click();
            const armorTab = document.querySelector('#armoryTabs [data-filter="armor"]');
            if (armorTab) armorTab.click();
          }
        });
      }
    }

    if (this.titaniumSetBtn) {
      this.titaniumSetBtn.addEventListener('click', () => {
        this.equipFullTitaniumSet();
      });
    }

    if (this.quantumSetBtn) {
      this.quantumSetBtn.addEventListener('click', () => {
        this.equipQuantumAegisSet();
      });
    }

    if (this.unequipAllBtn) {
      this.unequipAllBtn.addEventListener('click', () => {
        this.unequipAll();
      });
    }

    if (this.blastBtn) {
      this.blastBtn.addEventListener('click', () => {
        this.simulateHazardBlast();
      });
    }

    this.updateUI();
  }

  isEquipped(itemId) {
    return Object.values(this.equipped).some(item => item && item.id === itemId);
  }

  equipItem(item) {
    if (!item || !item.armorSlot) return;
    sfx.equip();
    this.equipped[item.armorSlot] = item;
    if (this.rpg) {
      this.rpg.addMasteryXP('Cybernetics', item.xpAwarded);
      this.rpg.spawnToast("Exosuit Fitted", `Equipped ${item.name} in [${item.armorSlot.toUpperCase()}] (+${Math.round(item.defense * 100)}% Def)`);
    }
    this.updateUI();
    if (this.armoryManager) this.armoryManager.render();
  }

  unequipSlot(slot) {
    if (!this.equipped[slot]) return;
    sfx.click();
    const prev = this.equipped[slot];
    this.equipped[slot] = null;
    if (this.rpg) {
      this.rpg.spawnToast("Socket Cleared", `Unequipped ${prev.name}`);
    }
    this.updateUI();
    if (this.armoryManager) this.armoryManager.render();
  }

  equipFullTitaniumSet() {
    sfx.equip();
    this.equipped.head = getItemById(120);
    this.equipped.chest = getItemById(121);
    this.equipped.legs = getItemById(122);
    this.equipped.feet = getItemById(123);

    if (this.rpg) {
      this.rpg.addMasteryXP('Cybernetics', 60);
      this.rpg.spawnToast("Full Titanium Exosuit", "Equipped full 4-piece Hazard Rig (75% Kinetic Defense)!");
    }
    this.updateUI();
    if (this.armoryManager) this.armoryManager.render();
  }

  equipQuantumAegisSet() {
    sfx.equip();
    this.equipped.head = getItemById(120);
    this.equipped.chest = getItemById(124);
    this.equipped.legs = getItemById(122);
    this.equipped.feet = getItemById(123);

    if (this.rpg) {
      this.rpg.addMasteryXP('Cybernetics', 100);
      this.rpg.spawnToast("Quantum Aegis Rig", "Equipped high-tier Quantum Rig (90% Kinetic Defense)!");
    }
    this.updateUI();
    if (this.armoryManager) this.armoryManager.render();
  }

  unequipAll() {
    sfx.click();
    this.equipped.head = null;
    this.equipped.chest = null;
    this.equipped.legs = null;
    this.equipped.feet = null;

    if (this.rpg) {
      this.rpg.spawnToast("Exosuit Stripped", "All armor sockets emptied. 0% Defense.");
    }
    this.updateUI();
    if (this.armoryManager) this.armoryManager.render();
  }

  calculateTotalDefense() {
    let total = 0;
    for (let slot in this.equipped) {
      if (this.equipped[slot] && this.equipped[slot].defense) {
        total += this.equipped[slot].defense;
      }
    }
    return Math.min(1.0, total);
  }

  calculateOxygenBonus() {
    let total = 0;
    for (let slot in this.equipped) {
      if (this.equipped[slot] && this.equipped[slot].oxygenBonus) {
        total += this.equipped[slot].oxygenBonus;
      }
    }
    return total;
  }

  calculateSpeedBonus() {
    let total = 0;
    for (let slot in this.equipped) {
      if (this.equipped[slot] && this.equipped[slot].speedBonus) {
        total += this.equipped[slot].speedBonus;
      }
    }
    return total;
  }

  updateUI() {
    const totalDef = this.calculateTotalDefense();
    const oxyBonus = this.calculateOxygenBonus();
    const speedBonus = this.calculateSpeedBonus();
    const defPct = Math.round(totalDef * 100);

    if (this.totalDefenseVal) {
      this.totalDefenseVal.textContent = `${defPct}%`;
      if (defPct >= 90) {
        this.totalDefenseVal.style.color = '#e879f9';
        this.totalDefenseVal.style.textShadow = '0 0 18px rgba(217, 70, 239, 0.8)';
      } else if (defPct > 0) {
        this.totalDefenseVal.style.color = 'var(--cyan-core)';
        this.totalDefenseVal.style.textShadow = '0 0 16px var(--cyan-glow)';
      } else {
        this.totalDefenseVal.style.color = 'var(--text-dim)';
        this.totalDefenseVal.style.textShadow = 'none';
      }
    }

    if (this.defenseTrackFill) {
      this.defenseTrackFill.style.width = `${defPct}%`;
      if (defPct >= 90) {
        this.defenseTrackFill.style.background = 'linear-gradient(90deg, #00f0ff 0%, #d946ef 100%)';
        this.defenseTrackFill.style.boxShadow = '0 0 16px rgba(217, 70, 239, 0.6)';
      } else {
        this.defenseTrackFill.style.background = 'linear-gradient(90deg, #00f0ff 0%, #00ff9d 70%, #d946ef 100%)';
        this.defenseTrackFill.style.boxShadow = '0 0 12px var(--cyan-glow)';
      }
    }

    if (this.rigOxygenVal) {
      if (oxyBonus > 0) {
        this.rigOxygenVal.textContent = `${(25.0 + oxyBonus).toFixed(1)}s (+${oxyBonus.toFixed(0)}s EVA)`;
      } else {
        this.rigOxygenVal.textContent = "25.0s (Base)";
      }
    }

    if (this.rigSpeedVal) {
      if (speedBonus > 0) {
        this.rigSpeedVal.textContent = `${(1.0 + speedBonus).toFixed(2)}x (+${Math.round(speedBonus * 100)}% Sprint)`;
      } else {
        this.rigSpeedVal.textContent = "1.00x (Normal)";
      }
    }

    if (this.statusPill) {
      this.statusPill.className = 'rig-status-pill';
      if (defPct >= 90) {
        this.statusPill.classList.add('epic-armored');
        this.statusPill.textContent = `Aegis Forcefield (${defPct}% Absorption)`;
      } else if (defPct > 0) {
        this.statusPill.classList.add('armored');
        this.statusPill.textContent = `Armored (${defPct}% Absorption)`;
      } else {
        this.statusPill.textContent = "Unarmored (0% Absorption)";
      }
    }

    if (this.blastOutcomeReadout) {
      const raw = 40.0;
      const mitigated = raw * (1.0 - totalDef);
      const absorbed = raw * totalDef;
      if (totalDef > 0) {
        this.blastOutcomeReadout.innerHTML = `Shielded: <strong style="color: var(--emerald-turf);">-${mitigated.toFixed(1)} HP taken</strong> (<span style="color: var(--cyan-core);">${absorbed.toFixed(1)} HP absorbed</span>)`;
      } else {
        this.blastOutcomeReadout.innerHTML = `Unshielded: <strong style="color: var(--crimson-hazard);">-40.0 HP damage taken</strong>`;
      }
    }

    const slotIcons = { head: '⛑️', chest: '🦺', legs: '👖', feet: '👢' };

    for (let slot in this.equipped) {
      const item = this.equipped[slot];
      const card = this.socketCards[slot];
      const frame = this.socketFrames[slot];
      const nameEl = this.socketNames[slot];
      const bonusEl = this.socketBonuses[slot];
      const unequipBtn = this.socketUnequipBtns[slot];

      if (!card || !frame || !nameEl || !bonusEl) continue;

      if (item) {
        card.classList.add('equipped');
        if (item.rarity === 'Epic') {
          card.classList.add('epic');
        } else {
          card.classList.remove('epic');
        }

        const tile = getTileCoord(item.tile);
        const bgX = -(tile.x / 32) * 36;
        const bgY = -(tile.y / 32) * 36;

        frame.innerHTML = `<div class="block-sprite" style="width: 36px; height: 36px; background-position: ${bgX}px ${bgY}px; background-size: 576px 576px;" title="${item.name}"></div>`;
        nameEl.textContent = item.name;
        bonusEl.textContent = item.specText;
        if (unequipBtn) unequipBtn.style.display = 'flex';
      } else {
        card.classList.remove('equipped', 'epic');
        frame.innerHTML = `<span class="socket-placeholder-icon">${slotIcons[slot]}</span>`;
        nameEl.textContent = `Empty ${slot.charAt(0).toUpperCase() + slot.slice(1)} Slot`;
        bonusEl.textContent = "No Defense";
        if (unequipBtn) unequipBtn.style.display = 'none';
      }
    }

    if (this.rpg) {
      this.rpg.applyExosuitBonuses(totalDef, oxyBonus, speedBonus);
    }
  }

  simulateHazardBlast() {
    const totalDef = this.calculateTotalDefense();
    const rawDamage = 40.0;
    const damageTaken = rawDamage * (1.0 - totalDef);
    const damageAbsorbed = rawDamage * totalDef;

    if (totalDef > 0) {
      sfx.shield();
    } else {
      sfx.shatter();
    }

    if (this.container) {
      this.container.classList.remove('hazard-blast-flash');
      void this.container.offsetWidth;
      this.container.classList.add('hazard-blast-flash');
    }

    if (this.blastOutcomeReadout) {
      if (totalDef > 0) {
        this.blastOutcomeReadout.innerHTML = `
          <span style="color: var(--emerald-turf); font-weight: 800;">
            🛡️ DEFLECTED: -${damageTaken.toFixed(1)} HP taken (${damageAbsorbed.toFixed(1)} HP absorbed by Exosuit Rig)
          </span>
        `;
      } else {
        this.blastOutcomeReadout.innerHTML = `
          <span style="color: var(--crimson-hazard); font-weight: 800;">
            💥 CRITICAL HIT: -40.0 HP unmitigated trauma taken!
          </span>
        `;
      }
    }

    if (this.rpg) {
      this.rpg.takeDamage(damageTaken);
      if (totalDef > 0) {
        this.rpg.spawnToast(
          "Blast Absorbed",
          `Exosuit deflected ${damageAbsorbed.toFixed(0)} HP! Vitality deducted by only ${damageTaken.toFixed(0)} HP.`
        );
      } else {
        this.rpg.spawnToast(
          "Hazard Trauma Taken",
          `Unshielded! Vitality deducted by full 40 HP trauma!`
        );
      }
    }
  }
}

// ==========================================
// 11. RPG SURVIVAL & LIFE SUPPORT HUD
// ==========================================
class RPGSubsystem {
  constructor() {
    this.health = 100.0;
    this.hunger = 88.0;
    this.water = 92.0;
    this.maxOxygen = 25.0;
    this.oxygenTimer = 25.0; // 25s underwater rule (expandable to 75s with EVA Visor)
    this.armorDefense = 0.0;
    this.speedMultiplier = 1.0;
    this.stamina = 100.0;

    this.isUnderwater = false;
    this.flightActive = false;
    this.difficulty = 'survival';

    this.activeBuffs = []; // Array of { id, title, desc, duration, maxDuration, icon, color }

    this.masteries = {
      'Mining Efficiency': { lvl: 1, xp: 25, max: 100, fillEl: 'miningXpFill', lvlEl: 'miningLvlDisplay' },
      'Terraforming Mastery': { lvl: 1, xp: 20, max: 100, fillEl: 'terraXpFill', lvlEl: 'terraLvlDisplay' },
      'Astrobiology': { lvl: 1, xp: 35, max: 100, fillEl: 'astroXpFill', lvlEl: 'astroLvlDisplay' },
      'Cybernetics': { lvl: 1, xp: 30, max: 100, fillEl: 'cyberXpFill', lvlEl: 'cyberLvlDisplay' }
    };

    this.healthBar = document.getElementById('gaugeHealth');
    this.hungerBar = document.getElementById('gaugeHunger');
    this.waterBar = document.getElementById('gaugeWater');
    this.oxygenBar = document.getElementById('gaugeOxygen');
    this.staminaBar = document.getElementById('gaugeStamina');

    this.healthVal = document.getElementById('healthVal');
    this.hungerVal = document.getElementById('hungerVal');
    this.waterVal = document.getElementById('waterVal');
    this.oxygenVal = document.getElementById('oxygenVal');
    this.staminaVal = document.getElementById('staminaVal');

    this.buffsContainer = document.getElementById('activeBuffsContainer');
    this.quickBeltGrid = document.getElementById('quickBeltGrid');
    this.drainBtn = document.getElementById('drainStatsBtn');

    this.diveBtn = document.getElementById('toggleDiveBtn');
    this.flightBtn = document.getElementById('toggleFlightBtn');
    this.diffBtns = document.querySelectorAll('.diff-btn');

    this.init();
  }

  init() {
    if (this.diveBtn) {
      this.diveBtn.addEventListener('click', () => {
        sfx.click();
        this.isUnderwater = !this.isUnderwater;
        this.diveBtn.classList.toggle('active', this.isUnderwater);
        this.diveBtn.textContent = this.isUnderwater ? "Surfacing..." : "Submerge (25s EVA)";
      });
    }

    if (this.flightBtn) {
      this.flightBtn.addEventListener('click', () => {
        sfx.click();
        this.flightActive = !this.flightActive;
        this.flightBtn.classList.toggle('active', this.flightActive);
        this.flightBtn.textContent = this.flightActive ? "Flight: 2x ACTIVE" : "Flight: INACTIVE";
      });
    }

    this.diffBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sfx.click();
        this.diffBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.difficulty = btn.dataset.diff;
      });
    });

    if (this.drainBtn) {
      this.drainBtn.addEventListener('click', () => {
        sfx.click();
        this.health = Math.max(15, this.health - 30);
        this.hunger = Math.max(15, this.hunger - 35);
        this.water = Math.max(15, this.water - 35);
        this.stamina = Math.max(10, this.stamina - 45);
        this.oxygenTimer = Math.max(5, this.oxygenTimer - 10);
        this.updateGauges();
        this.spawnToast("Vitals Depleted", "Health, Hunger & Water drained! Click belt items to test.");
      });
    }

    this.renderQuickBelt();
    this.updateGauges();
    this.updateMasteriesUI();

    setInterval(() => this.tick(), 100);
  }

  renderQuickBelt() {
    if (!this.quickBeltGrid) return;
    this.quickBeltGrid.innerHTML = '';

    const beltItemIds = [112, 113, 80, 81, 96, 98, 114, 115, 116];
    beltItemIds.forEach(id => {
      const item = getItemById(id);
      if (!item) return;

      const btn = document.createElement('button');
      btn.className = 'quick-belt-btn';
      const tile = getTileCoord(item.tile);
      const bgX = -(tile.x / 32) * 28;
      const bgY = -(tile.y / 32) * 28;

      btn.innerHTML = `
        <div class="block-sprite" style="width: 28px; height: 28px; background-position: ${bgX}px ${bgY}px; background-size: 448px 448px; flex-shrink: 0;"></div>
        <div class="quick-belt-info">
          <span class="quick-belt-title">${item.name}</span>
          <span class="quick-belt-effect">${item.specText}</span>
        </div>
      `;

      btn.addEventListener('click', () => {
        this.applyItem(item);
      });

      this.quickBeltGrid.appendChild(btn);
    });
  }

  applyItem(item) {
    if (item.category === 'food') {
      sfx.eat();
      if (item.foodRestored) this.hunger = Math.min(100, this.hunger + item.foodRestored);
      if (item.waterRestored) this.water = Math.min(100, this.water + item.waterRestored);
      if (item.healthRestored) this.health = Math.min(100, this.health + item.healthRestored);
      if (item.staminaRestored) this.stamina = Math.min(100, this.stamina + item.staminaRestored);
      this.spawnToast("Ration Consumed", `Consumed ${item.name} (+${item.foodRestored} Food)`);
    } else if (item.category === 'drink') {
      sfx.drink();
      if (item.waterRestored) this.water = Math.min(100, this.water + item.waterRestored);
      if (item.staminaRestored) this.stamina = Math.min(100, this.stamina + item.staminaRestored);
      this.spawnToast("Hydration Restored", `Drank ${item.name} (+${item.waterRestored} Water)`);
    } else if (item.category === 'stim') {
      sfx.inject();
      if (item.healthRestored) this.health = Math.min(100, this.health + item.healthRestored);
      if (item.staminaRestored) this.stamina = Math.min(100, this.stamina + item.staminaRestored);
      if (item.oxygenRestored) this.oxygenTimer = Math.min(this.maxOxygen, this.oxygenTimer + item.oxygenRestored);

      if (item.speedBoost) {
        this.addBuff({
          id: 'speed',
          title: 'Adrenaline Overdrive',
          desc: '+25% Sprint Speed',
          duration: item.buffDuration || 12.0,
          maxDuration: item.buffDuration || 12.0,
          icon: '⚡',
          color: '#00f0ff'
        });
      }

      if (item.hazardImmunity) {
        this.addBuff({
          id: 'hazard',
          title: 'Rad-Purge Shield',
          desc: '100% Hazard Immunity',
          duration: item.buffDuration || 15.0,
          maxDuration: item.buffDuration || 15.0,
          icon: '🛡',
          color: '#ffb700'
        });
      }

      this.spawnToast("Stim Injected", `Injected ${item.name} (${item.specText})`);
    }

    this.addMasteryXP(item.linkedSkill, item.xpAwarded);
    this.updateGauges();
  }

  applyExosuitBonuses(defense, oxyBonus, speedBonus) {
    this.armorDefense = defense;
    this.maxOxygen = 25.0 + (oxyBonus || 0);
    this.speedMultiplier = 1.0 + (speedBonus || 0);
    this.updateGauges();
  }

  takeDamage(amount) {
    this.health = Math.max(5, this.health - amount);
    this.updateGauges();
  }

  addBuff(buff) {
    const existing = this.activeBuffs.find(b => b.id === buff.id);
    if (existing) {
      existing.duration = buff.maxDuration;
    } else {
      this.activeBuffs.push({ ...buff });
    }
    this.updateBuffsUI();
  }

  addMasteryXP(skillName, xp) {
    const m = this.masteries[skillName];
    if (!m) return;
    m.xp += xp;
    if (m.xp >= m.max) {
      m.xp -= m.max;
      m.lvl += 1;
      m.max = Math.floor(m.max * 1.5);
      this.spawnToast("Mastery Level Up", `${skillName} upgraded to Level ${m.lvl}!`);
    }
    this.updateMasteriesUI();
  }

  updateMasteriesUI() {
    for (let skill in this.masteries) {
      const m = this.masteries[skill];
      const fillEl = document.getElementById(m.fillEl);
      const lvlEl = document.getElementById(m.lvlEl);
      if (fillEl) {
        const pct = Math.min(100, (m.xp / m.max) * 100);
        fillEl.style.width = `${pct}%`;
      }
      if (lvlEl) {
        lvlEl.textContent = `Lvl ${m.lvl} (${Math.floor(m.xp)}/${m.max} XP)`;
      }
    }
  }

  updateGauges() {
    if (this.healthBar) this.healthBar.style.width = `${this.health}%`;
    if (this.hungerBar) this.hungerBar.style.width = `${this.hunger}%`;
    if (this.waterBar) this.waterBar.style.width = `${this.water}%`;
    if (this.staminaBar) this.staminaBar.style.width = `${this.stamina}%`;

    if (this.healthVal) this.healthVal.textContent = `${Math.round(this.health)} / 100`;
    if (this.hungerVal) this.hungerVal.textContent = `${Math.round(this.hunger)} / 100`;
    if (this.waterVal) this.waterVal.textContent = `${Math.round(this.water)} / 100`;
    if (this.staminaVal) this.staminaVal.textContent = `${Math.round(this.stamina)}%`;
  }

  updateBuffsUI() {
    if (!this.buffsContainer) return;
    this.buffsContainer.innerHTML = '';

    this.activeBuffs.forEach(buff => {
      const chip = document.createElement('div');
      chip.className = 'buff-chip';
      const pct = (buff.duration / buff.maxDuration) * 100;

      chip.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
          <span>${buff.icon}</span>
          <span style="font-weight: 700; color: ${buff.color};">${buff.title}</span>
          <span style="color: var(--text-dim); font-size: 0.72rem;">${buff.desc}</span>
        </div>
        <span class="font-mono text-cyan" style="font-size: 0.75rem;">${buff.duration.toFixed(1)}s</span>
        <div class="buff-chip-timer" style="width: ${pct}%; background: ${buff.color};"></div>
      `;
      this.buffsContainer.appendChild(chip);
    });
  }

  tick() {
    // Oxygen
    if (this.flightActive || this.difficulty === 'creative') {
      this.oxygenTimer = this.maxOxygen;
    } else if (this.isUnderwater) {
      this.oxygenTimer = Math.max(0, this.oxygenTimer - 0.1);
    } else {
      this.oxygenTimer = Math.min(this.maxOxygen, this.oxygenTimer + 0.625); // recharges in 4s
    }

    if (this.oxygenBar) {
      const pct = (this.oxygenTimer / this.maxOxygen) * 100;
      this.oxygenBar.style.width = `${pct}%`;
    }
    if (this.oxygenVal) {
      this.oxygenVal.textContent = `${this.oxygenTimer.toFixed(1)}s / ${this.maxOxygen.toFixed(0)}s`;
    }

    // Buffs Countdown
    let changed = false;
    for (let i = this.activeBuffs.length - 1; i >= 0; i--) {
      this.activeBuffs[i].duration -= 0.1;
      if (this.activeBuffs[i].duration <= 0) {
        this.activeBuffs.splice(i, 1);
        changed = true;
      }
    }
    if (this.activeBuffs.length > 0 || changed) {
      this.updateBuffsUI();
    }
  }

  spawnToast(title, msg) {
    const tc = document.getElementById('discoveryToastContainer');
    if (!tc) return;
    const toast = document.createElement('div');
    toast.className = `discovery-toast-banner toast-landmark`;
    toast.innerHTML = `
      <span style="font-size: 1.1rem;">⚡</span>
      <div>
        <div style="font-size: 0.68rem; text-transform: uppercase; letter-spacing: 1px; color: var(--cyan-core); font-weight: 700;">
          ${title}
        </div>
        <div style="font-size: 0.82rem;">${msg}</div>
      </div>
    `;
    tc.prepend(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }
}

// ==========================================
// 12. 14 PROCEDURAL STRUCTURES & POIS
// ==========================================
const STRUCTURES = [
  {
    id: 1,
    name: "Branched Xenoflora Mega-Tree",
    biome: "Xenoflora Basin",
    blocks: "Carbon Rod buttress roots, Alien Foliage canopy, Quantum Core sap node",
    desc: "Colossal 8–11 block tall alien tree with diagonal limbs and hanging lumen mushrooms, radiating zero-point energy at its crown.",
    badge: "Flora Megastructure",
    badgeColor: "rgba(0, 255, 157, 0.2)"
  },
  {
    id: 2,
    name: "Giant Bioluminescent Fungi",
    biome: "Xenoflora & Caverns",
    blocks: "Reinforced Concrete stalk, 5x5 Pulsar Quartz umbrella cap",
    desc: "Towering subterranean toadstools casting azure photon fields across cavern ceilings with drooping bio-spore rims.",
    badge: "Cavern Flora",
    badgeColor: "rgba(0, 240, 255, 0.2)"
  },
  {
    id: 3,
    name: "Prismatic Crystal Spire",
    biome: "Crystal Highlands",
    blocks: "Cryo-Glass facets, Diamond Crystal Ore peaks",
    desc: "Faceted stepped crystalline towers reaching 8–18 blocks high, humming with piezoelectric voltage in mountain blizzards.",
    badge: "Mineral Monolith",
    badgeColor: "rgba(217, 70, 239, 0.2)"
  },
  {
    id: 4,
    name: "Basalt Chimney Monolith",
    biome: "Basalt Badlands",
    blocks: "Hollow Basalt Bedrock, Molten Magma shaft, Thermal Brick vents",
    desc: "Volcanic conduits venting incandescent mantle magma and convective steam plumes into the arid atmosphere.",
    badge: "Geothermal",
    badgeColor: "rgba(255, 51, 88, 0.2)"
  },
  {
    id: 5,
    name: "Surface Alien Monolith",
    biome: "All Terrains",
    blocks: "12-block Void Obsidian pillar, levitating Singularity Core, Warp Coils",
    desc: "Ancient cyclopean obelisks inscribed with extraterrestrial glyphs, defying planetary gravity with zero-point cores.",
    badge: "Precursor Relic",
    badgeColor: "rgba(255, 183, 0, 0.2)"
  },
  {
    id: 6,
    name: "Crashed Recon Probe",
    biome: "Nanite Plains",
    blocks: "Rusted Debris fuselage, Titanium Plating, Solar Arrays, Cyber Crates",
    desc: "Impact craters containing wreckage from Astraea-IV exploratory drones with salvageable orbital supply pods.",
    badge: "Expedition Wreckage",
    badgeColor: "rgba(160, 170, 180, 0.2)"
  },
  {
    id: 7,
    name: "Subterranean Cyber Bunker",
    biome: "Deep Mantle (Y=8 to 22)",
    blocks: "Sealed 5x4x5 Reinforced Concrete vault, Plasma Conduits, High-tier Crates",
    desc: "Hermetically sealed subterranean bunkers embedded in deep mantle rock housing rare quantum tech salvage.",
    badge: "Subsurface Vault",
    badgeColor: "rgba(0, 240, 255, 0.2)"
  },
  {
    id: 8,
    name: "Cyber Crate Cache",
    biome: "Global Spawns",
    blocks: "Titanium Composite casing, Holographic locking latch",
    desc: "Orbital cargo pods dropping 2–4 rare salvage entities (Quantum Cores, Solar Panels, Cryo Glass) + Astraea-IV lore datalogs.",
    badge: "Interactive Salvage",
    badgeColor: "rgba(0, 255, 157, 0.2)"
  },
  {
    id: 9,
    name: "Cosmic Impact Crater",
    biome: "Highlands & Plains",
    blocks: "14-block Cryo-Glass rim, Obsidian Slag floor, Antimatter Cell meteorite core",
    desc: "Vast circular impact basins vitrified by hypervelocity collisions, harboring dense antimatter cores at ground zero.",
    badge: "Meteorite Basin",
    badgeColor: "rgba(255, 51, 88, 0.2)"
  },
  {
    id: 10,
    name: "Precursor Relay Tower",
    biome: "Basin & Highlands",
    blocks: "16-block Aluminum Girder mast, Catwalks, Cyber Crates, Warp Coil beacon",
    desc: "Monolithic aerospace communications relay towering over terrain, transmitting long-range subspace signals.",
    badge: "Deep-Space Array",
    badgeColor: "rgba(0, 240, 255, 0.2)"
  },
  {
    id: 11,
    name: "Crystal Geode Cavern",
    biome: "Subterranean (Y=16)",
    blocks: "Spherical hollow chamber, Pulsar Quartz, Diamond Ore, Dark Matter Crystal",
    desc: "Rare mantle cavities encrusted with exotic gems, featuring a levitating non-baryonic dark matter crystal suspended at its center.",
    badge: "Subterranean Geode",
    badgeColor: "rgba(217, 70, 239, 0.2)"
  },
  {
    id: 12,
    name: "Hydrothermal Vent Field",
    biome: "Badlands & Oceans",
    blocks: "Volcanic Sulfur Chimneys, Sulfur Crystals, Molten Magma, Steam plumes",
    desc: "Active geothermal vent clusters discharging mineral-rich superheated fluids and convective steam plumes.",
    badge: "Geothermal Field",
    badgeColor: "rgba(255, 183, 0, 0.2)"
  },
  {
    id: 13,
    name: "Cyclopean Gateway Arch",
    biome: "Planetary Ridges",
    blocks: "8-block wide Void Obsidian arch, Aerogel Tiles, Singularity Core keystone",
    desc: "Gigantic precursor portal arches spanning mountain saddles, holding stable localized closed timelike curves.",
    badge: "Precursor Gate",
    badgeColor: "rgba(255, 71, 87, 0.2)"
  },
  {
    id: 14,
    name: "Subterranean Research Bunker",
    biome: "Mantle Caverns",
    blocks: "Reinforced Concrete bulkheads, Holo-Glass observation bays, Cyber Crates",
    desc: "Ancient underground science stations built to study extraterrestrial biosignatures and subterranean anomalies.",
    badge: "Research Facility",
    badgeColor: "rgba(0, 255, 157, 0.2)"
  }
];

// ==========================================
// 13. ASTRAEA-IV EXPEDITION LORE LOGS (8 LOGS)
// ==========================================
const LORE_LOGS = [
  {
    id: 1,
    title: "Log #01: Orbital Insertion Vector",
    date: "Astraea-IV Subspace Telemetry // Day 01",
    content: "Orbital entry sequence complete. Planetary sensors confirm a massive continental landmass spanning thousands of kilometers. Atmosphere is breathable with trace noble gas anomalies. Deploying exploratory recon drones to survey golden nanite formations detected in sector 4-B."
  },
  {
    id: 2,
    title: "Log #02: Emerald Canopy Biosignatures",
    date: "Astraea-IV Surface Science // Day 04",
    content: "Entered the Xenoflora Basin. The vegetation is unlike anything in catalogued space: giant multi-limbed trees utilize quantum energy nodes within their sap conduits rather than simple chlorophyll. Turf samples exhibit high-frequency bioluminescent luminescence with zero seam transitions."
  },
  {
    id: 3,
    title: "Log #03: Nanite Sand Inertia",
    date: "Astraea-IV Geological Survey // Day 11",
    content: "Surveying the Nanite Plains. The golden dunes are not mineral granules—they are billions of microscopic cybernetic nanobots in suspended dormancy. If excited by electromagnetic pulses, micro-currents flow across the entire dune surface. Subsurface sweeps reveal crashed probe debris."
  },
  {
    id: 4,
    title: "Log #04: Deep Mantle Seismic Solvers",
    date: "Astraea-IV Deep Exploration // Day 19",
    content: "Subterranean acoustic probes confirm dual-noise 3D spaghetti cave networks carving through upper shale strata. At Y=16, seismic sensors detected a hollow spherical cavity. We have discovered a crystal geode cavern encrusted with diamond veins and a non-baryonic dark matter singularity."
  },
  {
    id: 5,
    title: "Log #05: Hydrothermal Magma Alchemy",
    date: "Astraea-IV Thermodynamic Study // Day 26",
    content: "Field test in the Basalt Badlands: When liquid water breaches into molten magma reservoirs, hydrostatic pressure causes instantaneous vitreous solidification into Obsidian Slag. Superheated steam plumes rise over 40 meters with aerodynamic drag."
  },
  {
    id: 6,
    title: "Log #06: Precursor Relay Intercept",
    date: "Astraea-IV Signal Analysis // Day 34",
    content: "Located a 16-block aerospace girder relay tower perched on a mountain saddle. It is still transmitting a pulsed carrier wave on 1420 MHz. The beacon platform houses a superconducting Warp Coil toroidal stator. Whoever erected this installation possessed interstellar FTL capability."
  },
  {
    id: 7,
    title: "Log #07: Relativistic Dilation Anomaly",
    date: "Astraea-IV Quantum Lab // Day 48",
    content: "Recovered a Chrono Matrix lattice from an orbital salvage crate. Atomic clocks placed adjacent to the matrix experience measurable time dilation. We hypothesize these artifacts were synthesized to manipulate localized closed timelike curves."
  },
  {
    id: 8,
    title: "Log #08: Final Transmission: The Gateway",
    date: "Astraea-IV Chief Science Officer // Day 62",
    content: "We have reached the Cyclopean Precursor Gateway Arch. The keystone is a stabilized micro-black hole inside an ergosphere frame. Energy signatures are spiking across all spectra. If you are reading this decrypted manifest: the stars are waiting. Planetfall is imminent."
  }
];

// ==========================================
// 14. EXPLORATION & ANOMALY SCANNER MANAGER
// ==========================================
class ExplorationScannerManager {
  constructor() {
    this.bearing = 45; // degrees 0-360
    this.compassTrack = document.getElementById('compassTrack');
    this.bearingReadout = document.getElementById('compassBearingReadout');
    this.waypointMarker = document.getElementById('compassWaypoint');
    this.radarBeam = document.getElementById('radarSweepBeam');
    this.radarBlip = document.getElementById('radarBlip');
    this.radarDist = document.getElementById('scannerDistance');
    this.radarTarget = document.getElementById('scannerTargetName');
    this.radarBearing = document.getElementById('scannerBearingVal');
    this.radarElevation = document.getElementById('scannerElevation');
    this.toastContainer = document.getElementById('toastContainer');
    this.scanBtn = document.getElementById('triggerScanBtn');
    this.loreList = document.getElementById('loreLogList');
    this.loreScreen = document.getElementById('loreLogScreen');

    this.isScanning = false;
    this.currentLockedStructure = STRUCTURES[9]; // Precursor Relay Tower
    this.lockedBearing = 72;

    this.init();
  }

  init() {
    // 1. Compass tape tracking
    const compassBox = document.getElementById('compassTapeWrapper');
    if (compassBox) {
      compassBox.addEventListener('mousemove', (e) => {
        const rect = compassBox.getBoundingClientRect();
        const ratio = (e.clientX - rect.left) / rect.width;
        this.bearing = Math.floor(ratio * 360);
        this.updateCompass();
      });
    }

    // Auto-drift compass subtly
    setInterval(() => {
      if (!this.isScanning) {
        this.bearing = (this.bearing + 0.25) % 360;
        this.updateCompass();
      }
    }, 80);

    // 2. Anomaly scanner trigger [X] or button
    if (this.scanBtn) {
      this.scanBtn.addEventListener('click', () => this.triggerPing());
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'x' || e.key === 'X') {
        // Prevent triggering when typing in inputs
        if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) return;
        this.triggerPing();
      }
    });

    // 3. Render 14 structures grid
    this.renderStructures();

    // 4. Render Lore Logs Terminal
    this.renderLoreLogs();
  }

  updateCompass() {
    if (!this.compassTrack) return;
    const offset = -(this.bearing * 4);
    this.compassTrack.style.transform = `translateX(calc(-50% + ${offset}px))`;

    if (this.bearingReadout) {
      const b = Math.floor(this.bearing);
      let card = "N";
      if (b >= 23 && b < 68) card = "NE";
      else if (b >= 68 && b < 113) card = "E";
      else if (b >= 113 && b < 158) card = "SE";
      else if (b >= 158 && b < 203) card = "S";
      else if (b >= 203 && b < 248) card = "SW";
      else if (b >= 248 && b < 293) card = "W";
      else if (b >= 293 && b < 338) card = "NW";
      this.bearingReadout.textContent = `${b.toString().padStart(3, '0')}° ${card}`;
    }
  }

  triggerPing() {
    if (this.isScanning) return;
    this.isScanning = true;
    sfx.laser(0.9);

    if (this.scanBtn) {
      this.scanBtn.disabled = true;
      this.scanBtn.textContent = "📡 Scanning [350m Radial Ping]...";
    }

    const randStruct = STRUCTURES[Math.floor(Math.random() * STRUCTURES.length)];
    const dist = Math.floor(65 + Math.random() * 260);
    const bearing = Math.floor(Math.random() * 360);
    const deltaY = Math.floor((Math.random() - 0.3) * 35);

    let start = performance.now();
    const animateSweep = (now) => {
      const elapsed = (now - start) / 1000;
      if (this.radarBeam) {
        this.radarBeam.style.transform = `rotate(${elapsed * 720}deg)`;
      }
      if (elapsed < 1.2) {
        requestAnimationFrame(animateSweep);
      } else {
        this.isScanning = false;
        this.currentLockedStructure = randStruct;
        this.lockedBearing = bearing;

        if (this.scanBtn) {
          this.scanBtn.disabled = false;
          this.scanBtn.textContent = "📡 Ping Radar [Press X]";
        }

        if (this.radarTarget) this.radarTarget.textContent = randStruct.name;
        if (this.radarDist) this.radarDist.textContent = `${dist}m`;
        if (this.radarBearing) this.radarBearing.textContent = `${bearing.toString().padStart(3, '0')}°`;
        if (this.radarElevation) this.radarElevation.textContent = `${deltaY >= 0 ? '+' : ''}${deltaY}m`;

        if (this.radarBlip) {
          const rad = (bearing - 90) * (Math.PI / 180);
          const r = (dist / 350) * 130;
          this.radarBlip.style.left = `calc(50% + ${Math.cos(rad) * r}px)`;
          this.radarBlip.style.top = `calc(50% + ${Math.sin(rad) * r}px)`;
          this.radarBlip.style.display = 'block';
        }

        sfx.shatter();
        this.spawnToast("landmark", `LANDMARK DETECTED: ${randStruct.name} (${dist}m, ${bearing}°)`, "+250 XP");
      }
    };
    requestAnimationFrame(animateSweep);
  }

  spawnToast(type, text, xp) {
    if (!this.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `discovery-toast-banner toast-${type}`;
    const icon = type === 'biome' ? '🌐' : (type === 'landmark' ? '🏛' : '📜');

    toast.innerHTML = `
      <span style="font-size: 1.2rem;">${icon}</span>
      <div>
        <div style="font-size: 0.68rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-dim);">
          ${type === 'biome' ? 'BIOME DISCOVERY' : (type === 'landmark' ? 'LANDMARK CATALOGED' : 'EXPEDITION LOG DECRYPTED')}
        </div>
        <div style="font-size: 0.88rem; font-weight: 700;">${text}</div>
      </div>
      <span class="toast-xp-pill text-emerald">${xp}</span>
    `;

    this.toastContainer.prepend(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }

  renderStructures() {
    const grid = document.getElementById('structuresGrid');
    if (!grid) return;
    grid.innerHTML = '';

    STRUCTURES.forEach(st => {
      const card = document.createElement('div');
      card.className = 'structure-item-card';
      card.innerHTML = `
        <div>
          <span class="structure-badge-tag" style="background: ${st.badgeColor}; color: #fff;">${st.badge}</span>
          <h4 class="structure-item-title">${st.name}</h4>
          <div style="font-size: 0.75rem; color: var(--cyan-core); font-family: var(--font-mono); margin-bottom: 8px;">
            ${st.biome}
          </div>
          <p class="structure-item-desc">${st.desc}</p>
        </div>
        <div class="structure-loot-tag">
          <strong>COMPONENTS:</strong> ${st.blocks}
        </div>
      `;
      grid.appendChild(card);
    });
  }

  renderLoreLogs() {
    if (!this.loreList) return;
    this.loreList.innerHTML = '';

    LORE_LOGS.forEach((log, idx) => {
      const btn = document.createElement('button');
      btn.className = `lore-btn ${idx === 0 ? 'active' : ''}`;
      btn.innerHTML = `
        <span>${log.title}</span>
        <span class="text-emerald" style="font-size: 0.7rem;">DECRYPTED</span>
      `;

      btn.addEventListener('click', () => {
        sfx.craft();
        document.querySelectorAll('.lore-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.displayLore(log);
        this.spawnToast("log", `DECRYPTED: ${log.title}`, "+150 XP");
      });

      this.loreList.appendChild(btn);
    });

    this.displayLore(LORE_LOGS[0]);
  }

  displayLore(log) {
    if (!this.loreScreen) return;
    this.loreScreen.innerHTML = `
      <div style="color: var(--emerald-turf); font-size: 0.75rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px; margin-bottom: 14px;">
        ASTRAEA-IV ARCHIVE RECOVERY // ${log.date}
      </div>
      <h3 style="color: #fff; font-size: 1.15rem; margin-bottom: 12px; font-weight: 700;">
        ${log.title}
      </h3>
      <p style="color: var(--text-dim); line-height: 1.7; font-size: 0.9rem;">
        ${log.content}
      </p>
      <div style="margin-top: 24px; padding-top: 12px; border-top: 1px dashed rgba(255, 255, 255, 0.1); display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--cyan-core);">
        <span>AUTHENTICATION: ASTRAEA-IV DEEP SPACE COMMAND</span>
        <span>STATUS: VERIFIED</span>
      </div>
    `;
  }
}

// ==========================================
// 14.5 CELESTIAL SKYBOX & ATMOSPHERE SIMULATOR
// ==========================================
class AtmosphereSimulator {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.time = 12.0; // 0 to 24 hours
    this.weather = 'clear'; // 'clear', 'ion_storm', 'nanite_fog'
    this.cloudDensity = 0.55;
    this.windSpeed = 1.0;
    this.cloudOffset = 0;
    this.lightningArcs = [];
    this.stars = [];

    // Generate 85 stars with static coordinates
    for (let i = 0; i < 85; i++) {
      this.stars.push({
        x: Math.random(),
        y: Math.random() * 0.75, // top 75% of sky
        r: 0.7 + Math.random() * 1.5,
        twinkleSeed: Math.random() * 10
      });
    }

    this.initControls();
    this.animate();
  }

  initControls() {
    const timeSlider = document.getElementById('skyboxTimeSlider');
    const timeVal = document.getElementById('skyboxTimeVal');
    const timeDisplay = document.getElementById('skyboxTimeDisplay');
    const sunElevDisplay = document.getElementById('skyboxSunElevDisplay');
    const presetBtns = document.querySelectorAll('.time-preset-btn');
    const weatherBtns = document.querySelectorAll('.weather-btn');
    const lightningBtn = document.getElementById('triggerLightningBtn');
    const cloudSlider = document.getElementById('cloudDensitySlider');
    const cloudVal = document.getElementById('cloudDensityVal');
    const windSlider = document.getElementById('windSpeedSlider');
    const windVal = document.getElementById('windSpeedVal');

    const updateTimeUI = (t) => {
      this.time = t;
      const hrs = Math.floor(t);
      const mins = Math.floor((t % 1) * 60);
      const timeStr = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
      if (timeVal) timeVal.textContent = timeStr;
      
      let label = "NOON";
      if (t < 5) label = "DEEP NIGHT";
      else if (t < 7) label = "DAWN TRANSITION";
      else if (t < 11) label = "MORNING";
      else if (t < 14) label = "SOLAR NOON";
      else if (t < 17) label = "AFTERNOON";
      else if (t < 19.5) label = "DUSK / TWILIGHT";
      else label = "COSMIC NIGHT";

      if (timeDisplay) timeDisplay.textContent = `${timeStr} ${label}`;

      // Solar Elevation
      const theta = ((t - 6.0) / 12.0) * Math.PI;
      const elevDeg = Math.sin(theta) * 72.0;
      if (sunElevDisplay) {
        sunElevDisplay.textContent = `SOLAR ELEV: ${elevDeg >= 0 ? '+' : ''}${elevDeg.toFixed(1)}°`;
      }
    };

    if (timeSlider) {
      timeSlider.addEventListener('input', (e) => {
        updateTimeUI(parseFloat(e.target.value));
        presetBtns.forEach(b => b.classList.remove('active'));
      });
    }

    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sfx.click();
        presetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const t = parseFloat(btn.dataset.time);
        if (timeSlider) timeSlider.value = t;
        updateTimeUI(t);
      });
    });

    weatherBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sfx.click();
        weatherBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.weather = btn.dataset.weather;
      });
    });

    if (lightningBtn) {
      lightningBtn.addEventListener('click', () => {
        this.triggerLightning();
      });
    }

    if (cloudSlider && cloudVal) {
      cloudSlider.addEventListener('input', (e) => {
        this.cloudDensity = parseFloat(e.target.value);
        cloudVal.textContent = `${Math.round(this.cloudDensity * 100)}%`;
      });
    }

    if (windSlider && windVal) {
      windSlider.addEventListener('input', (e) => {
        this.windSpeed = parseFloat(e.target.value);
        windVal.textContent = `${this.windSpeed.toFixed(1)}x`;
      });
    }

    updateTimeUI(this.time);
  }

  triggerLightning() {
    sfx.lightning();
    const flashEl = document.getElementById('skyboxLightningFlash');
    if (flashEl) {
      flashEl.style.opacity = '0.9';
      setTimeout(() => {
        flashEl.style.opacity = '0.2';
        setTimeout(() => {
          flashEl.style.opacity = '0.8';
          setTimeout(() => {
            flashEl.style.opacity = '0';
          }, 80);
        }, 40);
      }, 50);
    }

    // Generate jagged procedural arcs
    const startX = this.canvas.width * (0.2 + Math.random() * 0.6);
    let curX = startX;
    let curY = 0;
    const arc = [];
    while (curY < this.canvas.height * 0.85) {
      arc.push({ x: curX, y: curY });
      curY += 12 + Math.random() * 18;
      curX += (Math.random() - 0.5) * 36;
    }
    this.lightningArcs.push({ points: arc, alpha: 1.0 });
  }

  animate() {
    this.cloudOffset += 0.3 * this.windSpeed;
    this.render();

    // Occasional subtle lightning during ion storm
    if (this.weather === 'ion_storm') {
      if (Math.random() < 0.008) {
        this.triggerLightning();
      }
    }

    requestAnimationFrame(() => this.animate());
  }

  render() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const ctx = this.ctx;

    // Time angle theta
    const t = this.time;
    const theta = ((t - 6.0) / 12.0) * Math.PI;
    const sunHeight = Math.sin(theta); // 1.0 noon, -1.0 midnight, 0.0 dawn/dusk
    const sunX = w * (0.15 + 0.7 * ((t % 24) / 24.0));
    const sunY = h * (0.68 - 0.58 * sunHeight);

    // 1. Sky Gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h);

    if (this.weather === 'ion_storm') {
      skyGrad.addColorStop(0, '#0e051c');
      skyGrad.addColorStop(0.5, '#281144');
      skyGrad.addColorStop(1, '#471c6d');
    } else if (this.weather === 'nanite_fog') {
      skyGrad.addColorStop(0, '#1c1206');
      skyGrad.addColorStop(0.6, '#4f3412');
      skyGrad.addColorStop(1, '#8c5e23');
    } else {
      // Clear sky with time blend
      if (sunHeight > 0.4) {
        // Full day
        skyGrad.addColorStop(0, '#09366e');
        skyGrad.addColorStop(0.5, '#176bb8');
        skyGrad.addColorStop(1, '#62aff3');
      } else if (sunHeight > -0.1) {
        // Dawn or Dusk
        skyGrad.addColorStop(0, '#151433');
        skyGrad.addColorStop(0.4, '#58214f');
        skyGrad.addColorStop(0.8, '#c84b26');
        skyGrad.addColorStop(1, '#f98a3b');
      } else {
        // Night
        skyGrad.addColorStop(0, '#020409');
        skyGrad.addColorStop(0.5, '#060d1f');
        skyGrad.addColorStop(1, '#0e1c38');
      }
    }

    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h);

    // 2. Stars (visible when sun is low and not heavy fog)
    const starOpacity = Math.max(0, Math.min(1, -sunHeight * 1.5 + 0.2)) * (this.weather === 'nanite_fog' ? 0.2 : 1.0);
    if (starOpacity > 0.05) {
      const now = performance.now() * 0.003;
      this.stars.forEach(st => {
        const twinkle = 0.5 + 0.5 * Math.sin(now * 3 + st.twinkleSeed);
        ctx.fillStyle = `rgba(255, 255, 255, ${starOpacity * twinkle})`;
        ctx.beginPath();
        ctx.arc(st.x * w, st.y * h, st.r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // 3. Sun or Moon Disc
    if (sunHeight > -0.2) {
      // Sun
      const sunAlpha = Math.max(0, Math.min(1, (sunHeight + 0.2) * 2.5));
      const corona = ctx.createRadialGradient(sunX, sunY, 6, sunX, sunY, 60);
      corona.addColorStop(0, `rgba(255, 255, 220, ${0.95 * sunAlpha})`);
      corona.addColorStop(0.3, `rgba(255, 200, 80, ${0.45 * sunAlpha})`);
      corona.addColorStop(1, 'rgba(255, 140, 40, 0)');
      ctx.fillStyle = corona;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 60, 0, Math.PI * 2);
      ctx.fill();

      // Sharp Solar Core
      ctx.fillStyle = `rgba(255, 255, 250, ${sunAlpha})`;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 14, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Moon (Astraea-IV Binary Satellite)
      const moonX = w - sunX;
      const moonY = h * (0.35 + 0.3 * Math.abs(sunHeight));
      const moonGrad = ctx.createRadialGradient(moonX, moonY, 4, moonX, moonY, 35);
      moonGrad.addColorStop(0, 'rgba(0, 240, 255, 0.9)');
      moonGrad.addColorStop(0.4, 'rgba(0, 180, 255, 0.35)');
      moonGrad.addColorStop(1, 'rgba(0, 180, 255, 0)');
      ctx.fillStyle = moonGrad;
      ctx.beginPath();
      ctx.arc(moonX, moonY, 35, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#d2f3ff';
      ctx.beginPath();
      ctx.arc(moonX, moonY, 11, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. Volumetric FBM Procedural Clouds
    const cloudCount = Math.floor(14 * this.cloudDensity);
    for (let i = 0; i < cloudCount; i++) {
      const seed = i * 137.5;
      const cloudW = 100 + (Math.sin(seed) * 0.5 + 0.5) * 140;
      const cloudH = 30 + (Math.cos(seed * 2) * 0.5 + 0.5) * 35;
      const baseX = ((seed * 20 + this.cloudOffset * (0.6 + (i % 3) * 0.4)) % (w + cloudW * 2)) - cloudW;
      const baseY = 40 + (i * 18) % (h * 0.5);

      const cloudGrad = ctx.createRadialGradient(baseX + cloudW * 0.5, baseY + cloudH * 0.5, 10, baseX + cloudW * 0.5, baseY + cloudH * 0.5, cloudW * 0.55);
      
      let cloudColor = 'rgba(255, 255, 255, ';
      if (this.weather === 'ion_storm') {
        cloudColor = 'rgba(160, 110, 210, ';
      } else if (this.weather === 'nanite_fog') {
        cloudColor = 'rgba(210, 165, 90, ';
      } else if (sunHeight < 0) {
        cloudColor = 'rgba(30, 45, 80, ';
      }

      cloudGrad.addColorStop(0, cloudColor + (0.35 * this.cloudDensity) + ')');
      cloudGrad.addColorStop(0.7, cloudColor + (0.15 * this.cloudDensity) + ')');
      cloudGrad.addColorStop(1, cloudColor + '0)');

      ctx.fillStyle = cloudGrad;
      ctx.beginPath();
      ctx.ellipse(baseX + cloudW * 0.5, baseY + cloudH * 0.5, cloudW * 0.5, cloudH * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // 5. Zero-Seam Horizon Fog Blend
    const fogGrad = ctx.createLinearGradient(0, h * 0.7, 0, h);
    if (this.weather === 'ion_storm') {
      fogGrad.addColorStop(0, 'rgba(71, 28, 109, 0)');
      fogGrad.addColorStop(1, 'rgba(71, 28, 109, 0.85)');
    } else if (this.weather === 'nanite_fog') {
      fogGrad.addColorStop(0, 'rgba(140, 94, 35, 0)');
      fogGrad.addColorStop(1, 'rgba(140, 94, 35, 0.9)');
    } else if (sunHeight > 0.1) {
      fogGrad.addColorStop(0, 'rgba(98, 175, 243, 0)');
      fogGrad.addColorStop(1, 'rgba(98, 175, 243, 0.7)');
    } else {
      fogGrad.addColorStop(0, 'rgba(14, 28, 56, 0)');
      fogGrad.addColorStop(1, 'rgba(14, 28, 56, 0.85)');
    }
    ctx.fillStyle = fogGrad;
    ctx.fillRect(0, h * 0.7, w, h * 0.3);

    // 6. Active Lightning Arcs
    for (let i = this.lightningArcs.length - 1; i >= 0; i--) {
      const arc = this.lightningArcs[i];
      ctx.strokeStyle = `rgba(225, 210, 255, ${arc.alpha})`;
      ctx.shadowColor = '#d8b4fe';
      ctx.shadowBlur = 15;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      arc.points.forEach((pt, idx) => {
        if (idx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.stroke();
      ctx.shadowBlur = 0;

      arc.alpha -= 0.08;
      if (arc.alpha <= 0) {
        this.lightningArcs.splice(i, 1);
      }
    }
  }
}

// ==========================================
// 14.8 FAUNA ECOSYSTEM & ARTIFICIAL INTELLIGENCE (21 SPECIES)
// ==========================================
const FAUNA_SPECIES = [
  // Aquatic Species (8) - Strict Geological Water Depth >= 3.0m
  { id: 13, key: 'neon_tetra_ray', name: 'Neon Tetra Ray', habitat: 'aquatic', hp: 12, speed: 1.8, minDepth: 3.0, dropId: 128, dropName: 'Bioluminescent Scale', xp: 20, desc: 'Bioluminescent aquatic manta ray gliding across shallow planetary reefs.' },
  { id: 14, key: 'void_eel', name: 'Void Eel', habitat: 'aquatic', hp: 18, speed: 2.2, minDepth: 4.0, dropId: 130, dropName: 'Electrified Barb', xp: 25, desc: 'Piezoelectric serpentine predator that stalks submerged cavern trenches.' },
  { id: 15, key: 'abyssal_angler', name: 'Abyssal Angler', habitat: 'aquatic', hp: 24, speed: 1.2, minDepth: 5.0, dropId: 128, dropName: 'Bioluminescent Scale', xp: 30, desc: 'Deep-sea carnivore utilizing an organic photonic lure to attract prey.' },
  { id: 16, key: 'prismatic_glider', name: 'Prismatic Glider', habitat: 'aquatic', hp: 15, speed: 2.5, minDepth: 3.0, dropId: 131, dropName: 'Prismatic Fin', xp: 35, desc: 'Fast iridescent reef glider with translucent light-refracting pectoral fins.' },
  { id: 17, key: 'magma_vent_guppy', name: 'Magma Vent Guppy', habitat: 'aquatic', hp: 10, speed: 2.0, minDepth: 3.0, dropId: 132, dropName: 'Volcanic Thermal Gland', xp: 30, desc: 'Thermophilic schooling fish thriving in boiling hydrothermal ocean vents.' },
  { id: 18, key: 'cyber_pike', name: 'Cyber Pike', habitat: 'aquatic', hp: 22, speed: 2.8, minDepth: 3.0, dropId: 130, dropName: 'Electrified Barb', xp: 25, desc: 'Aggressive predatory fish with reinforced metallic scales and barbed jaws.' },
  { id: 19, key: 'glowing_jellyfish', name: 'Glowing Jellyfish', habitat: 'aquatic', hp: 14, speed: 0.8, minDepth: 3.0, dropId: 133, dropName: 'Abyssal Jelly Venom', xp: 25, desc: 'Pulsing cnidarian drifting through open oceanic water columns with toxic bioluminescence.' },
  { id: 20, key: 'auric_koi', name: 'Auric Koi', habitat: 'aquatic', hp: 16, speed: 1.6, minDepth: 3.0, dropId: 128, dropName: 'Bioluminescent Scale', xp: 30, desc: 'Golden nanite-infused freshwater fish prized for rare catalytic scales.' },

  // Terrestrial Species (12)
  { id: 0, key: 'hog', name: 'Cyber-Hog', habitat: 'terrestrial', hp: 35, speed: 1.4, dropId: 125, dropName: 'Bio-Synthetic Sinew', xp: 20, desc: 'Heavy quadruped with cybernetic tusks root-foraging alien turf.' },
  { id: 1, key: 'hound', name: 'Nanite Hound', habitat: 'terrestrial', hp: 28, speed: 2.4, dropId: 127, dropName: 'Armored Nanite Pelt', xp: 25, desc: 'Sleek predator with nanite armor plating and tactical thermal visor.' },
  { id: 3, key: 'dune_strider', name: 'Dune Strider', habitat: 'terrestrial', hp: 30, speed: 2.2, dropId: 134, dropName: 'Weathered Dune Hide', xp: 20, desc: 'Long-legged desert herbivore striding gracefully across high nanite sand dunes.' },
  { id: 4, key: 'scrap_scavenger', name: 'Scrap Scavenger', habitat: 'terrestrial', hp: 20, speed: 2.0, dropId: 127, dropName: 'Armored Nanite Pelt', xp: 20, desc: 'Agile bipedal rodent scavenging fallen robotic wreckage and alloy debris.' },
  { id: 5, key: 'sand_viper', name: 'Sand Viper', habitat: 'terrestrial', hp: 18, speed: 2.6, dropId: 134, dropName: 'Weathered Dune Hide', xp: 25, desc: 'Venomous serpentine burrower ambushing prey from granular desert sands.' },
  { id: 6, key: 'spore_grazer', name: 'Spore Grazer', habitat: 'terrestrial', hp: 40, speed: 1.0, dropId: 125, dropName: 'Bio-Synthetic Sinew', xp: 20, desc: 'Massive gentle beast with mushroom flora growing symbiotically upon its back.' },
  { id: 7, key: 'chameleon_stalker', name: 'Chameleon Stalker', habitat: 'terrestrial', hp: 32, speed: 1.8, dropId: 129, dropName: 'Reinforced Chitin Carapace', xp: 30, desc: 'Adaptive camouflage predator blending invisibly into bioluminescent alien forests.' },
  { id: 8, key: 'lumen_beetle', name: 'Lumen Beetle', habitat: 'terrestrial', hp: 22, speed: 1.2, dropId: 129, dropName: 'Reinforced Chitin Carapace', xp: 20, desc: 'Heavy armored coleopteran glowing with pulsing yellow bio-luminescence.' },
  { id: 9, key: 'magma_tortoise', name: 'Magma Tortoise', habitat: 'terrestrial', hp: 60, speed: 0.6, dropId: 129, dropName: 'Reinforced Chitin Carapace', xp: 25, desc: 'Dense basalt-shelled reptile grazing near boiling lava lakes.' },
  { id: 10, key: 'cinder_stalker', name: 'Cinder Stalker', habitat: 'terrestrial', hp: 38, speed: 2.3, dropId: 132, dropName: 'Volcanic Thermal Gland', xp: 30, desc: 'Aggressive feline quadrapod with incandescent smoldering claws and eyes.' },
  { id: 11, key: 'frost_yeti', name: 'Frost Yeti', habitat: 'terrestrial', hp: 70, speed: 1.2, dropId: 127, dropName: 'Armored Nanite Pelt', xp: 35, desc: 'Apex glacial predator insulated by sub-zero thermal blubber and crystalline fur.' },
  { id: 12, key: 'crystal_scorpion', name: 'Crystal Scorpion', habitat: 'terrestrial', hp: 45, speed: 1.6, dropId: 135, dropName: 'Razor Crystal Claw', xp: 40, desc: 'Subterranean arachnid with resonant diamond crystal stingers and pincer claws.' },

  // Avian Species (1)
  { id: 2, key: 'bird', name: 'Xeno-Bird', habitat: 'avian', hp: 15, speed: 3.2, dropId: 126, dropName: 'Iridescent Aero-Plumage', xp: 30, desc: 'Aerodynamic avian with articulated photonic wings cruising high planetary updrafts.' }
];

class FaunaEcosystemManager {
  constructor(canvas, rpg = null) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.rpg = rpg;
    this.currentSpecies = FAUNA_SPECIES.find(s => s.id === 13); // Neon Tetra Ray default
    this.waterDepth = 4.0; // Geological water depth (m)
    this.aiState = 'wander'; // 'wander', 'idle', 'graze', 'flee', 'soar'
    this.animTime = 0;
    this.posX = 260;
    this.posY = 170;
    this.facing = 1;
    this.fleeTimer = 0;
    this.floaters = [];
    this.bubbles = [];

    // Initialize bubbles for aquatic ambiance
    for (let i = 0; i < 20; i++) {
      this.bubbles.push({
        x: Math.random() * 520,
        y: Math.random() * 340,
        r: 1.5 + Math.random() * 3.5,
        speed: 0.6 + Math.random() * 1.2,
        wobble: Math.random() * Math.PI * 2
      });
    }

    this.initControls();
    this.updateWaterDepthUI();
    this.updateAiTelemetry();
    this.updateLootPreview();
    this.animate();
  }

  initControls() {
    const habitatTabs = document.querySelectorAll('#faunaHabitatTabs .stage-btn');
    const speciesSelect = document.getElementById('faunaSpeciesSelect');
    const depthSlider = document.getElementById('waterDepthSlider');
    const stateBtns = document.querySelectorAll('#faunaStateBtns .stage-btn');
    const huntBtn = document.getElementById('faunaHuntBtn');
    const resetBtn = document.getElementById('faunaResetBtn');
    const soarBtn = document.getElementById('soarStateBtn');

    // Habitat Tabs Filter
    habitatTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        sfx.click();
        habitatTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const hab = tab.dataset.habitat;

        if (speciesSelect) {
          const optgroups = speciesSelect.querySelectorAll('optgroup');
          let firstMatch = null;
          optgroups.forEach((og, idx) => {
            let matches = false;
            if (hab === 'all') matches = true;
            else if (hab === 'aquatic' && idx === 0) matches = true;
            else if (hab === 'terrestrial' && idx === 1) matches = true;
            else if (hab === 'avian' && idx === 2) matches = true;

            og.style.display = matches ? '' : 'none';
            if (matches && !firstMatch) {
              const firstOpt = og.querySelector('option');
              if (firstOpt) firstMatch = parseInt(firstOpt.value);
            }
          });

          if (firstMatch !== null) {
            speciesSelect.value = firstMatch;
            this.setSpecies(firstMatch);
          }
        }
      });
    });

    // Species Select Dropdown
    if (speciesSelect) {
      speciesSelect.addEventListener('change', (e) => {
        sfx.click();
        this.setSpecies(parseInt(e.target.value));
      });
    }

    // Strict Water Depth Law Slider
    if (depthSlider) {
      depthSlider.addEventListener('input', (e) => {
        this.waterDepth = parseFloat(e.target.value);
        this.updateWaterDepthUI();
        if (this.currentSpecies.habitat === 'aquatic') {
          sfx.hover();
        }
      });
    }

    // AI Behavior State Machine Controls
    stateBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sfx.click();
        this.setState(btn.dataset.state);
      });
    });

    // Hunt Raycast Combat Strike
    if (huntBtn) {
      huntBtn.addEventListener('click', () => {
        this.huntStrike();
      });
    }

    // Reset Mob Position
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        sfx.click();
        this.posX = 260;
        this.posY = this.getDefaultY();
        this.setState('wander');
      });
    }
  }

  setSpecies(id) {
    const found = FAUNA_SPECIES.find(s => s.id === id);
    if (!found) return;
    this.currentSpecies = found;

    const soarBtn = document.getElementById('soarStateBtn');
    if (soarBtn) {
      soarBtn.style.display = (this.currentSpecies.habitat === 'avian') ? 'inline-block' : 'none';
    }

    if (this.currentSpecies.habitat === 'avian' && this.aiState === 'graze') {
      this.setState('wander');
    } else if (this.currentSpecies.habitat !== 'avian' && this.aiState === 'soar') {
      this.setState('wander');
    }

    this.posY = this.getDefaultY();
    this.updateAiTelemetry();
    this.updateLootPreview();
  }

  getDefaultY() {
    if (this.currentSpecies.habitat === 'aquatic') return 165;
    if (this.currentSpecies.habitat === 'avian') return 120;
    return 215;
  }

  setState(newState) {
    this.aiState = newState;
    const stateBtns = document.querySelectorAll('#faunaStateBtns .stage-btn');
    stateBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.state === newState);
    });
    this.updateAiTelemetry();
  }

  updateWaterDepthUI() {
    const valEl = document.getElementById('waterDepthVal');
    const statusEl = document.getElementById('waterDepthStatus');
    if (valEl) valEl.textContent = `${this.waterDepth.toFixed(1)}m`;

    if (statusEl) {
      if (this.waterDepth < 3.0) {
        statusEl.className = 'rig-status-pill hazard-danger';
        statusEl.textContent = `⚠️ REJECTED (Depth: ${this.waterDepth.toFixed(1)}m < 3m - Shallow Water Violation)`;
      } else {
        statusEl.className = 'rig-status-pill armored';
        statusEl.textContent = `✓ PERMITTED (Depth: ${this.waterDepth.toFixed(1)}m ≥ 3m - Fluid Swimming Active)`;
      }
    }
  }

  updateAiTelemetry() {
    const badge = document.getElementById('faunaAiBadge');
    const desc = document.getElementById('faunaStateDesc');
    let speedVal = (this.currentSpecies.speed || 1.4);
    let descStr = `Patrolling ${this.currentSpecies.habitat} waypoint path`;

    if (this.aiState === 'idle') {
      speedVal = 0.0;
      descStr = "Stationary observation & hydrodynamic stabilization";
    } else if (this.aiState === 'graze') {
      speedVal = (speedVal * 0.25).toFixed(1);
      descStr = "Root foraging & sampling micro-nutrient spores";
    } else if (this.aiState === 'flee') {
      speedVal = (speedVal * 3.2).toFixed(1);
      descStr = "Evasive emergency sprint vector!";
    } else if (this.aiState === 'soar') {
      speedVal = (speedVal * 2.5).toFixed(1);
      descStr = "Ascending planetary thermal updraft layers";
    }

    if (this.currentSpecies.habitat === 'aquatic' && this.waterDepth < 3.0) {
      descStr = "⚠️ STRANDED: Depth < 3m Geological Violation! Cannot swim in shallow pool.";
    }

    if (badge) badge.textContent = `AI: ${this.aiState.toUpperCase()} (${speedVal} m/s)`;
    if (desc) desc.textContent = descStr;
  }

  updateLootPreview() {
    const details = document.getElementById('faunaLootDetails');
    if (!details) return;

    const isAquatic = (this.currentSpecies.habitat === 'aquatic');
    const primaryFood = isAquatic ?
      `• <strong>1x Raw Fish Filet (#85)</strong> (+18 Food, +8 HP)` :
      `• <strong>1x Raw Alien Meat (#83)</strong> (+20 Food, +5 HP)`;

    const secondaryLoot = `• <strong>1x ${this.currentSpecies.dropName} (#${this.currentSpecies.dropId})</strong>`;
    const xpSkill = (this.currentSpecies.key === 'crystal_scorpion') ? 'Cybernetics' : 'Astrobiology';
    const xpBadge = `<div class="text-emerald">• <strong>+${this.currentSpecies.xp} XP ${xpSkill}</strong></div>`;
    const depthRule = isAquatic ?
      `<div class="text-cyan" style="margin-top: 4px; font-size: 0.7rem;">⚖️ Geological Law: Requires Water Depth &ge; 3.0m</div>` : '';

    details.innerHTML = `
      <div style="color: var(--cyan-core); font-weight: 700; margin-bottom: 4px;">
        ${this.currentSpecies.name.toUpperCase()} [${this.currentSpecies.habitat.toUpperCase()}] HARVEST:
      </div>
      <div>${primaryFood}</div>
      <div>${secondaryLoot}</div>
      ${xpBadge}
      ${depthRule}
    `;
  }

  huntStrike() {
    sfx.laser(0.6);
    sfx.creature();
    if (this.currentSpecies.habitat === 'aquatic') {
      sfx.swim();
    }

    const hurtEl = document.getElementById('faunaHurtOverlay');
    if (hurtEl) {
      hurtEl.style.opacity = '1';
      setTimeout(() => { hurtEl.style.opacity = '0'; }, 180);
    }

    const dmg = Math.floor(45 + Math.random() * 30);
    this.floaters.push({
      x: this.posX,
      y: this.posY - 35,
      text: `-${dmg} CRIT`,
      color: '#ff3358',
      alpha: 1.0
    });

    const isAquatic = (this.currentSpecies.habitat === 'aquatic');
    const meatName = isAquatic ? "Raw Fish Filet (#85)" : "Raw Meat (#83)";

    setTimeout(() => {
      this.floaters.push({
        x: this.posX,
        y: this.posY - 55,
        text: `+${meatName}`,
        color: '#ffb700',
        alpha: 1.0
      });
      this.floaters.push({
        x: this.posX,
        y: this.posY - 75,
        text: `+${this.currentSpecies.dropName}`,
        color: '#00f0ff',
        alpha: 1.0
      });
    }, 120);

    const xpSkill = (this.currentSpecies.key === 'crystal_scorpion') ? 'Cybernetics' : 'Astrobiology';
    if (this.rpg) {
      this.rpg.addMasteryXP(xpSkill, this.currentSpecies.xp);
      this.rpg.spawnToast(
        "Hunt Strike Success",
        `Harvested ${this.currentSpecies.dropName} & ${meatName} (+${this.currentSpecies.xp} ${xpSkill} XP)`
      );
    }

    this.setState('flee');
    this.fleeTimer = 180;
  }

  animate() {
    this.animTime += 0.05;
    const w = this.canvas.width;

    let baseSpeed = this.currentSpecies.speed || 1.4;
    let speed = 0;
    if (this.aiState === 'wander') speed = baseSpeed;
    else if (this.aiState === 'flee') speed = baseSpeed * 2.8;
    else if (this.aiState === 'graze') speed = baseSpeed * 0.2;
    else if (this.aiState === 'soar') speed = baseSpeed * 2.0;

    // Aquatic check: shallow water stops swimming
    const isAquatic = (this.currentSpecies.habitat === 'aquatic');
    if (isAquatic && this.waterDepth < 3.0) {
      speed = 0.1; // Grounded struggle
    }

    if (this.fleeTimer > 0) {
      this.fleeTimer--;
      if (this.fleeTimer === 0) {
        this.setState('wander');
      }
    }

    this.posX += this.facing * speed;
    if (this.posX > w - 65) {
      this.facing = -1;
    } else if (this.posX < 65) {
      this.facing = 1;
    }

    // Vertical positioning
    if (isAquatic) {
      if (this.waterDepth < 3.0) {
        // Stranded near sea bed
        this.posY = 230 + Math.sin(this.animTime * 12) * 2;
      } else {
        // Deep swimming undulation
        const depthFactor = Math.min(1.0, this.waterDepth / 6.0);
        this.posY = 160 + Math.sin(this.animTime * 2.2) * (15 * depthFactor);
      }
    } else if (this.currentSpecies.habitat === 'avian') {
      if (this.aiState === 'soar') {
        this.posY = 105 + Math.sin(this.animTime * 1.5) * 45;
      } else {
        this.posY = 145 + Math.sin(this.animTime * 0.8) * 16;
      }
    } else {
      this.posY = 215;
    }

    // Update rising bubbles for aquatic
    if (isAquatic) {
      this.bubbles.forEach(b => {
        b.y -= b.speed;
        b.x += Math.sin(this.animTime * 2 + b.wobble) * 0.5;
        if (b.y < 35) {
          b.y = 280 + Math.random() * 40;
          b.x = Math.random() * w;
        }
      });
    }

    this.render();
    requestAnimationFrame(() => this.animate());
  }

  render() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    ctx.clearRect(0, 0, w, h);

    const hab = this.currentSpecies.habitat;

    if (hab === 'aquatic') {
      this.renderAquaticEnvironment(ctx, w, h);
    } else if (hab === 'avian') {
      this.renderAvianEnvironment(ctx, w, h);
    } else {
      this.renderTerrestrialEnvironment(ctx, w, h);
    }

    // Render Entity
    ctx.save();
    ctx.translate(this.posX, this.posY);
    ctx.scale(this.facing, 1);
    this.renderEntitySilhouette(ctx);
    ctx.restore();

    // Floating Combat & Harvest Texts
    for (let i = this.floaters.length - 1; i >= 0; i--) {
      const fl = this.floaters[i];
      ctx.fillStyle = fl.color;
      ctx.globalAlpha = fl.alpha;
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(fl.text, fl.x, fl.y);
      ctx.globalAlpha = 1.0;

      fl.y -= 0.9;
      fl.alpha -= 0.018;
      if (fl.alpha <= 0) {
        this.floaters.splice(i, 1);
      }
    }
  }

  renderAquaticEnvironment(ctx, w, h) {
    // 1. Deep caustic water gradient
    const waterGrad = ctx.createLinearGradient(0, 0, 0, h);
    waterGrad.addColorStop(0, '#02182b');
    waterGrad.addColorStop(0.4, '#042847');
    waterGrad.addColorStop(0.85, '#011c33');
    waterGrad.addColorStop(1, '#08121f');
    ctx.fillStyle = waterGrad;
    ctx.fillRect(0, 0, w, h);

    // 2. Animated Caustic Light Web
    ctx.save();
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 6; i++) {
      const offset = (this.animTime * 18 + i * 90) % (w + 100);
      ctx.beginPath();
      ctx.moveTo(offset - 60, 0);
      ctx.bezierCurveTo(offset + 30, 90, offset - 40, 190, offset + 50, 260);
      ctx.stroke();
    }
    ctx.restore();

    // 3. Water Surface line at top
    ctx.strokeStyle = 'rgba(0, 255, 200, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 28);
    for (let x = 0; x <= w; x += 20) {
      const waveY = 28 + Math.sin(this.animTime * 3 + x * 0.08) * 3;
      ctx.lineTo(x, waveY);
    }
    ctx.stroke();

    // 4. Seafloor (Sand / Reef)
    const floorY = 260;
    const floorGrad = ctx.createLinearGradient(0, floorY, 0, h);
    floorGrad.addColorStop(0, '#0f2438');
    floorGrad.addColorStop(1, '#050c14');
    ctx.fillStyle = floorGrad;
    ctx.fillRect(0, floorY, w, h - floorY);

    // Seafloor grid lines
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 45) {
      ctx.beginPath();
      ctx.moveTo(x, floorY);
      ctx.lineTo(x + 20, h);
      ctx.stroke();
    }

    // 5. Rising Ambient Bubbles
    ctx.fillStyle = 'rgba(0, 240, 255, 0.45)';
    this.bubbles.forEach(b => {
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // 6. Strict Geological Water Depth HUD Overlay
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    if (this.waterDepth < 3.0) {
      ctx.fillStyle = 'rgba(255, 51, 88, 0.9)';
      ctx.fillText(`⚠️ RULE VIOLATION: WATER DEPTH ${this.waterDepth.toFixed(1)}m < 3.0m (SPAWN PROHIBITED)`, 20, 52);
    } else {
      ctx.fillStyle = 'rgba(0, 240, 255, 0.8)';
      ctx.fillText(`✓ SUBMERGED HYDRODYNAMIC COLUMN [DEPTH: ${this.waterDepth.toFixed(1)}m ≥ 3.0m]`, 20, 52);
    }
  }

  renderAvianEnvironment(ctx, w, h) {
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
    skyGrad.addColorStop(0, '#091c36');
    skyGrad.addColorStop(0.6, '#13355e');
    skyGrad.addColorStop(1, '#2b4d75');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h);

    // High altitude thermal updraft ripples
    ctx.strokeStyle = 'rgba(217, 70, 239, 0.18)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 4; i++) {
      const y = 80 + i * 45;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(w * 0.3, y - 15, w * 0.7, y + 15, w, y);
      ctx.stroke();
    }

    // Ground horizon far below
    ctx.fillStyle = '#060d19';
    ctx.fillRect(0, 290, w, h - 290);
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
    ctx.beginPath();
    ctx.moveTo(0, 290);
    ctx.lineTo(w, 290);
    ctx.stroke();
  }

  renderTerrestrialEnvironment(ctx, w, h) {
    const groundY = 240;
    const groundGrad = ctx.createLinearGradient(0, groundY, 0, h);
    groundGrad.addColorStop(0, '#0c1a2f');
    groundGrad.addColorStop(1, '#050a16');
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, groundY, w, h - groundY);

    // Cyber grid lines
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, groundY);
      ctx.lineTo(x + 25, h);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    ctx.lineTo(w, groundY);
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
    ctx.stroke();

    // Alien foliage tufts
    for (let x = 40; x < w; x += 90) {
      ctx.fillStyle = 'rgba(0, 255, 157, 0.35)';
      ctx.fillRect(x, groundY - 8, 4, 8);
      ctx.fillRect(x + 5, groundY - 14, 4, 14);
      ctx.fillRect(x + 10, groundY - 6, 4, 6);
    }
  }

  renderEntitySilhouette(ctx) {
    const key = this.currentSpecies.key;

    if (key === 'neon_tetra_ray') {
      this.renderNeonTetraRay(ctx);
    } else if (key === 'void_eel') {
      this.renderVoidEel(ctx);
    } else if (key === 'abyssal_angler') {
      this.renderAbyssalAngler(ctx);
    } else if (key === 'glowing_jellyfish') {
      this.renderGlowingJellyfish(ctx);
    } else if (this.currentSpecies.habitat === 'aquatic') {
      this.renderGenericAquaticFish(ctx);
    } else if (key === 'hog') {
      this.renderCyberHog(ctx);
    } else if (key === 'hound') {
      this.renderNaniteHound(ctx);
    } else if (key === 'bird') {
      this.renderXenoBird(ctx);
    } else if (key === 'magma_tortoise') {
      this.renderMagmaTortoise(ctx);
    } else if (key === 'crystal_scorpion') {
      this.renderCrystalScorpion(ctx);
    } else if (key === 'sand_viper') {
      this.renderSandViper(ctx);
    } else {
      this.renderGenericTerrestrial(ctx);
    }
  }

  // 1. Neon Tetra Ray
  renderNeonTetraRay(ctx) {
    const wingFlap = Math.sin(this.animTime * 4) * 14;

    // Diamond Body
    ctx.fillStyle = '#0a3a60';
    ctx.beginPath();
    ctx.moveTo(34, 0);
    ctx.lineTo(0, -18 + wingFlap * 0.4);
    ctx.lineTo(-32, 0);
    ctx.lineTo(0, 18 - wingFlap * 0.4);
    ctx.closePath();
    ctx.fill();

    // Fluorescent Spine Stripe
    ctx.fillStyle = '#00f0ff';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 12;
    ctx.fillRect(-22, -2, 44, 4);
    ctx.shadowBlur = 0;

    // Trailing Whip Tail
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-32, 0);
    ctx.quadraticCurveTo(-46, Math.sin(this.animTime * 6) * 12, -64, Math.sin(this.animTime * 6) * 16);
    ctx.stroke();

    // Eye
    ctx.fillStyle = '#fff';
    ctx.fillRect(20, -4, 4, 4);
  }

  // 2. Void Eel
  renderVoidEel(ctx) {
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#3b1d60';

    ctx.beginPath();
    for (let i = 0; i < 7; i++) {
      const segX = 35 - i * 14;
      const segY = Math.sin(this.animTime * 5 + i * 0.6) * 12;
      if (i === 0) ctx.moveTo(segX, segY);
      else ctx.lineTo(segX, segY);
    }
    ctx.stroke();

    // Piezoelectric Node nodes
    for (let i = 1; i < 6; i++) {
      const segX = 35 - i * 14;
      const segY = Math.sin(this.animTime * 5 + i * 0.6) * 12;
      ctx.fillStyle = (i % 2 === 0) ? '#a855f7' : '#00f0ff';
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(segX, segY, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    // Glowing Jaws & Eye
    ctx.fillStyle = '#00f0ff';
    ctx.fillRect(32, -3 + Math.sin(this.animTime * 5) * 12, 5, 4);
  }

  // 3. Abyssal Angler
  renderAbyssalAngler(ctx) {
    const finWag = Math.sin(this.animTime * 6) * 8;

    // Bulbous Body
    ctx.fillStyle = '#112233';
    ctx.beginPath();
    ctx.ellipse(0, 0, 32, 22, 0, 0, Math.PI * 2);
    ctx.fill();

    // Jagged Teeth
    ctx.fillStyle = '#e2e8f0';
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(14 + i * 4, 10);
      ctx.lineTo(16 + i * 4, 2);
      ctx.lineTo(18 + i * 4, 10);
      ctx.fill();
    }

    // Tail Fin
    ctx.fillStyle = '#0f4c81';
    ctx.beginPath();
    ctx.moveTo(-32, 0);
    ctx.lineTo(-48, -14 + finWag);
    ctx.lineTo(-48, 14 + finWag);
    ctx.closePath();
    ctx.fill();

    // Photonic Lure Stalk
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(12, -20);
    ctx.quadraticCurveTo(26, -38, 38, -26);
    ctx.stroke();

    // Glowing Bulb
    ctx.fillStyle = '#fffa65';
    ctx.shadowColor = '#fffa65';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(38, -26, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  // 4. Glowing Jellyfish
  renderGlowingJellyfish(ctx) {
    const pulse = Math.sin(this.animTime * 4) * 4;

    // Translucent Bell Dome
    ctx.fillStyle = 'rgba(0, 240, 255, 0.7)';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(0, -6 + pulse, 24, Math.PI, 0, false);
    ctx.closePath();
    ctx.fill();

    // Nucleus
    ctx.fillStyle = '#d946ef';
    ctx.beginPath();
    ctx.arc(0, -6 + pulse, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Undulating Tentacles
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
    ctx.lineWidth = 2;
    for (let i = -3; i <= 3; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 6, -6 + pulse);
      ctx.bezierCurveTo(
        i * 6 + Math.sin(this.animTime * 4 + i) * 8, 14,
        i * 6 - Math.sin(this.animTime * 4 + i) * 8, 32,
        i * 6, 46
      );
      ctx.stroke();
    }
  }

  // 5. Generic Aquatic Fish (Prismatic Glider, Magma Guppy, Cyber Pike, Auric Koi)
  renderGenericAquaticFish(ctx) {
    const finWag = Math.sin(this.animTime * 8) * 12;
    const isMagma = (this.currentSpecies.key === 'magma_vent_guppy');
    const isKoi = (this.currentSpecies.key === 'auric_koi');
    const isPike = (this.currentSpecies.key === 'cyber_pike');

    const primaryColor = isMagma ? '#e65100' : isKoi ? '#f59e0b' : isPike ? '#475569' : '#06b6d4';
    const finColor = isMagma ? '#ff3d00' : isKoi ? '#fbbf24' : isPike ? '#00f0ff' : '#ec4899';

    // Streamlined Fish Body
    ctx.fillStyle = primaryColor;
    ctx.beginPath();
    ctx.ellipse(0, 0, 28, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Tail Fin
    ctx.fillStyle = finColor;
    ctx.beginPath();
    ctx.moveTo(-26, 0);
    ctx.lineTo(-44, -14 + finWag);
    ctx.lineTo(-40, 0);
    ctx.lineTo(-44, 14 + finWag);
    ctx.closePath();
    ctx.fill();

    // Dorsal Fin
    ctx.fillStyle = finColor;
    ctx.beginPath();
    ctx.moveTo(-6, -12);
    ctx.lineTo(8, -20);
    ctx.lineTo(14, -12);
    ctx.closePath();
    ctx.fill();

    // Glowing Eye
    ctx.fillStyle = '#fff';
    ctx.fillRect(16, -4, 4, 4);
    ctx.fillStyle = '#000';
    ctx.fillRect(18, -3, 2, 2);
  }

  // 6. Cyber-Hog
  renderCyberHog(ctx) {
    const legCycle = Math.sin(this.animTime * 6) * 16;
    const bodyBob = Math.abs(Math.sin(this.animTime * 6)) * 3;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.ellipse(0, 25, 34, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#5c3826';
    ctx.fillRect(-22, 10 - bodyBob, 8, 16 - legCycle * 0.4);
    ctx.fillRect(14, 10 - bodyBob, 8, 16 + legCycle * 0.4);

    ctx.fillStyle = '#8c5332';
    ctx.fillRect(-28, -14 - bodyBob, 52, 28);
    ctx.fillStyle = '#5e341b';
    ctx.fillRect(-28, 6 - bodyBob, 52, 8);

    ctx.fillStyle = '#00f0ff';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 10;
    ctx.fillRect(-20, -18 - bodyBob, 36, 4);
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#9e603b';
    ctx.fillRect(20, -10 - bodyBob, 20, 22);
    ctx.fillStyle = '#4a2510';
    ctx.fillRect(38, -2 - bodyBob, 8, 12);

    ctx.fillStyle = '#d4f7ff';
    ctx.beginPath();
    ctx.moveTo(38, 8 - bodyBob);
    ctx.lineTo(44, 2 - bodyBob);
    ctx.lineTo(44, 10 - bodyBob);
    ctx.fill();

    ctx.fillStyle = '#00ff9d';
    ctx.fillRect(28, -6 - bodyBob, 4, 4);

    ctx.fillStyle = '#8c5332';
    ctx.fillRect(-16, 12 - bodyBob, 8, 16 + legCycle * 0.5);
    ctx.fillRect(8, 12 - bodyBob, 8, 16 - legCycle * 0.5);
  }

  // 7. Nanite Hound
  renderNaniteHound(ctx) {
    const legCycle = Math.sin(this.animTime * 8) * 22;
    const spineArch = Math.sin(this.animTime * 8) * 3;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.beginPath();
    ctx.ellipse(0, 25, 36, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#232b38';
    ctx.fillRect(-26, 8, 6, 18 - legCycle * 0.5);
    ctx.fillRect(16, 8, 6, 18 + legCycle * 0.5);

    ctx.fillStyle = '#3a4759';
    ctx.fillRect(-30, -8 + spineArch, 56, 18);
    ctx.fillStyle = '#1c2533';
    ctx.fillRect(-20, -12 + spineArch, 24, 6);
    ctx.fillRect(6, -10 + spineArch, 12, 4);

    ctx.strokeStyle = '#3a4759';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-30, -2 + spineArch);
    ctx.lineTo(-44, -14 + legCycle * 0.3);
    ctx.stroke();

    ctx.fillStyle = '#47566b';
    ctx.fillRect(22, -14 + spineArch, 18, 16);

    ctx.fillStyle = '#00f0ff';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 8;
    ctx.fillRect(32, -10 + spineArch, 8, 4);
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#1c2533';
    ctx.fillRect(22, -22 + spineArch, 4, 8);

    ctx.fillStyle = '#4a5b73';
    ctx.fillRect(-18, 10, 6, 16 + legCycle * 0.5);
    ctx.fillRect(10, 10, 6, 16 - legCycle * 0.5);
  }

  // 8. Xeno-Bird
  renderXenoBird(ctx) {
    const flap = Math.sin(this.animTime * 10) * 26;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.beginPath();
    ctx.ellipse(0, 130 - (this.posY - 100), 22, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#1a365d';
    ctx.beginPath();
    ctx.ellipse(0, 0, 24, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#d946ef';
    ctx.beginPath();
    ctx.moveTo(-20, 0);
    ctx.lineTo(-38, -6);
    ctx.lineTo(-34, 4);
    ctx.fill();

    ctx.fillStyle = '#2b6cb0';
    ctx.beginPath();
    ctx.arc(20, -4, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffb700';
    ctx.beginPath();
    ctx.moveTo(27, -6);
    ctx.lineTo(38, -3);
    ctx.lineTo(27, 0);
    ctx.fill();

    ctx.fillStyle = '#00f0ff';
    ctx.fillRect(22, -6, 3, 3);

    // Photonic Wing
    ctx.fillStyle = 'rgba(0, 240, 255, 0.85)';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(-6, -2);
    ctx.lineTo(4, -28 + flap);
    ctx.lineTo(22, -2);
    ctx.fill();

    ctx.fillStyle = 'rgba(217, 70, 239, 0.75)';
    ctx.beginPath();
    ctx.moveTo(-2, 0);
    ctx.lineTo(8, -20 + flap * 0.8);
    ctx.lineTo(18, 0);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  // 9. Magma Tortoise
  renderMagmaTortoise(ctx) {
    const legWalk = Math.sin(this.animTime * 3) * 6;

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-24, 14, 10, 10 - legWalk);
    ctx.fillRect(14, 14, 10, 10 + legWalk);

    // Heavy Basalt Shell
    ctx.fillStyle = '#262626';
    ctx.beginPath();
    ctx.ellipse(0, 4, 34, 20, 0, Math.PI, 0, false);
    ctx.closePath();
    ctx.fill();

    // Magma Fissures
    ctx.strokeStyle = '#ff4500';
    ctx.shadowColor = '#ff4500';
    ctx.shadowBlur = 8;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-16, -6);
    ctx.lineTo(-4, 2);
    ctx.lineTo(12, -8);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Head
    ctx.fillStyle = '#404040';
    ctx.fillRect(28, 4, 14, 12);
    ctx.fillStyle = '#ff8c00';
    ctx.fillRect(36, 6, 3, 3);
  }

  // 10. Crystal Scorpion
  renderCrystalScorpion(ctx) {
    const stingWag = Math.sin(this.animTime * 5) * 8;

    // Body
    ctx.fillStyle = '#18181b';
    ctx.fillRect(-18, 6, 36, 12);

    // Arched Tail
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-18, 10);
    ctx.quadraticCurveTo(-32, -18, -16 + stingWag, -26);
    ctx.stroke();

    // Magenta Crystal Stinger
    ctx.fillStyle = '#d946ef';
    ctx.shadowColor = '#d946ef';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(-16 + stingWag, -26);
    ctx.lineTo(-8 + stingWag, -32);
    ctx.lineTo(-12 + stingWag, -20);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;

    // Front Pincers
    ctx.strokeStyle = '#3f3f46';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(18, 8);
    ctx.lineTo(32, 2);
    ctx.stroke();
  }

  // 11. Sand Viper
  renderSandViper(ctx) {
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#ca8a04';

    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const segX = 28 - i * 12;
      const segY = 18 + Math.sin(this.animTime * 6 + i * 0.7) * 5;
      if (i === 0) ctx.moveTo(segX, segY);
      else ctx.lineTo(segX, segY);
    }
    ctx.stroke();

    // Eye
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(26, 15 + Math.sin(this.animTime * 6) * 5, 3, 3);
  }

  // 12. Generic Terrestrial Beast
  renderGenericTerrestrial(ctx) {
    const walk = Math.sin(this.animTime * 5) * 12;
    ctx.fillStyle = '#334155';
    ctx.fillRect(-22, 10, 8, 14 - walk * 0.4);
    ctx.fillRect(14, 10, 8, 14 + walk * 0.4);

    ctx.fillStyle = '#475569';
    ctx.fillRect(-26, -10, 48, 22);

    ctx.fillStyle = '#00f0ff';
    ctx.fillRect(18, -4, 4, 4);
  }
}

// ==========================================
// 14.9 4x4 MICRO-VOXEL CARVING WORKBENCH
// ==========================================
class MicroBlockCarver {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    // 4x4x4 grid = 64 voxels. 1 = solid, 0 = carved
    this.grid = new Uint8Array(64).fill(1);
    this.hoverIdx = -1;
    this.isMouseDown = false;

    this.init();
  }

  init() {
    const sphereBtn = document.getElementById('carverSphereBtn');
    const resetBtn = document.getElementById('carverResetBtn');

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      this.hoverIdx = this.pickVoxel(mx, my);
      if (this.isMouseDown && this.hoverIdx !== -1) {
        this.carveVoxel(this.hoverIdx);
      }
      this.render();
    });

    this.canvas.addEventListener('mousedown', (e) => {
      this.isMouseDown = true;
      const rect = this.canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const idx = this.pickVoxel(mx, my);
      if (idx !== -1) {
        this.carveVoxel(idx);
      }
    });

    window.addEventListener('mouseup', () => {
      this.isMouseDown = false;
    });

    if (sphereBtn) {
      sphereBtn.addEventListener('click', () => {
        sfx.craft();
        this.carveSphere();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        sfx.shatter();
        this.grid.fill(1);
        this.updateCountUI();
        this.render();
      });
    }

    this.updateCountUI();
    this.render();
  }

  carveVoxel(idx) {
    if (this.grid[idx] === 1) {
      this.grid[idx] = 0;
      sfx.click();
      this.updateCountUI();
      this.render();
    }
  }

  carveSphere() {
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        for (let z = 0; z < 4; z++) {
          const dx = x - 1.5;
          const dy = y - 1.5;
          const dz = z - 1.5;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          const idx = x + y * 4 + z * 16;
          this.grid[idx] = (dist <= 1.85) ? 1 : 0;
        }
      }
    }
    this.updateCountUI();
    this.render();
  }

  updateCountUI() {
    let count = 0;
    for (let i = 0; i < 64; i++) {
      if (this.grid[i] === 1) count++;
    }
    const countEl = document.getElementById('carverVoxelCount');
    if (countEl) {
      countEl.textContent = `${count} / 64 Voxels`;
    }
  }

  project(x, y, z) {
    const cx = this.canvas.width * 0.5;
    const cy = this.canvas.height * 0.62;
    const tileW = 24;
    const tileH = 12;
    const voxelH = 16;

    const isoX = cx + (x - z) * tileW;
    const isoY = cy + (x + z) * tileH * 0.5 - y * voxelH;
    return { x: isoX, y: isoY };
  }

  pickVoxel(mx, my) {
    for (let y = 3; y >= 0; y--) {
      for (let x = 3; x >= 0; x--) {
        for (let z = 3; z >= 0; z--) {
          const idx = x + y * 4 + z * 16;
          if (this.grid[idx] === 1) {
            const pt = this.project(x, y, z);
            const dist = Math.hypot(mx - pt.x, my - pt.y);
            if (dist < 15) {
              return idx;
            }
          }
        }
      }
    }
    return -1;
  }

  render() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Subtle background grid
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let i = 20; i < w; i += 30) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, h);
      ctx.stroke();
    }

    const tileW = 24;
    const tileH = 12;
    const voxelH = 16;

    for (let y = 0; y < 4; y++) {
      for (let z = 0; z < 4; z++) {
        for (let x = 0; x < 4; x++) {
          const idx = x + y * 4 + z * 16;
          if (this.grid[idx] === 0) continue;

          const isHovered = (idx === this.hoverIdx);
          const pt = this.project(x, y, z);

          // Top Face
          ctx.beginPath();
          ctx.moveTo(pt.x, pt.y - voxelH);
          ctx.lineTo(pt.x + tileW, pt.y - voxelH + tileH * 0.5);
          ctx.lineTo(pt.x, pt.y - voxelH + tileH);
          ctx.lineTo(pt.x - tileW, pt.y - voxelH + tileH * 0.5);
          ctx.closePath();
          ctx.fillStyle = isHovered ? '#ff3358' : '#2dd4bf';
          ctx.fill();
          ctx.strokeStyle = isHovered ? '#fff' : 'rgba(255, 255, 255, 0.3)';
          ctx.stroke();

          // Left Face
          ctx.beginPath();
          ctx.moveTo(pt.x - tileW, pt.y - voxelH + tileH * 0.5);
          ctx.lineTo(pt.x, pt.y - voxelH + tileH);
          ctx.lineTo(pt.x, pt.y + tileH);
          ctx.lineTo(pt.x - tileW, pt.y + tileH * 0.5);
          ctx.closePath();
          ctx.fillStyle = isHovered ? '#e11d48' : '#0f766e';
          ctx.fill();
          ctx.strokeStyle = isHovered ? '#fff' : 'rgba(0, 0, 0, 0.4)';
          ctx.stroke();

          // Right Face
          ctx.beginPath();
          ctx.moveTo(pt.x, pt.y - voxelH + tileH);
          ctx.lineTo(pt.x + tileW, pt.y - voxelH + tileH * 0.5);
          ctx.lineTo(pt.x + tileW, pt.y + tileH * 0.5);
          ctx.lineTo(pt.x, pt.y + tileH);
          ctx.closePath();
          ctx.fillStyle = isHovered ? '#be123c' : '#115e59';
          ctx.fill();
          ctx.strokeStyle = isHovered ? '#fff' : 'rgba(0, 0, 0, 0.4)';
          ctx.stroke();
        }
      }
    }
  }
}

// ==========================================
// 14.10 SAVE & LOAD MATRIX SYSTEM (Sector Memory Bank & Binary Serializer)
// ==========================================
class SaveMatrixManager {
  constructor(rpg = null) {
    this.rpg = rpg;
    this.backend = 'local'; // 'local' | 'cloud'
    this.cloudToken = 'WCSV-0x5352';
    this.activeSlotIdx = 0; // 0-indexed (Slot 1 active)
    this.slots = this.initSlots();

    this.initDOM();
    this.renderSlots();
    this.bindEvents();
  }

  initSlots() {
    return [
      {
        id: 1,
        name: "Astraea-IV Basin",
        occupied: true,
        level: 14,
        voxels: 182490,
        deltas: 84,
        playtime: "08h 42m",
        sizeKb: 42.8,
        backend: "local",
        timestamp: "2026-09-19 13:40 UTC",
        stats: { hp: 100, maxHp: 100, oxygen: 100, maxOxygen: 150, hunger: 85, water: 90, stamina: 100 }
      },
      {
        id: 2,
        name: "Caldera Outpost Alpha",
        occupied: true,
        level: 11,
        voxels: 142100,
        deltas: 62,
        playtime: "05h 15m",
        sizeKb: 36.2,
        backend: "cloud",
        timestamp: "2026-09-19 11:22 UTC",
        stats: { hp: 88, maxHp: 100, oxygen: 90, maxOxygen: 100, hunger: 72, water: 65, stamina: 95 }
      },
      {
        id: 3,
        name: "Alpine Crystal Observatory",
        occupied: true,
        level: 8,
        voxels: 98340,
        deltas: 38,
        playtime: "03h 20m",
        sizeKb: 27.5,
        backend: "local",
        timestamp: "2026-09-18 19:45 UTC",
        stats: { hp: 95, maxHp: 100, oxygen: 100, maxOxygen: 100, hunger: 60, water: 80, stamina: 90 }
      },
      {
        id: 4,
        name: "Deep Trench Sub-Base",
        occupied: true,
        level: 16,
        voxels: 210800,
        deltas: 114,
        playtime: "12h 08m",
        sizeKb: 51.4,
        backend: "cloud",
        timestamp: "2026-09-18 14:10 UTC",
        stats: { hp: 100, maxHp: 100, oxygen: 140, maxOxygen: 150, hunger: 92, water: 95, stamina: 100 }
      },
      { id: 5, name: "[EMPTY SECTOR]", occupied: false, level: 0, voxels: 0, deltas: 0, playtime: "00h 00m", sizeKb: 0, backend: "local", timestamp: "NEVER", stats: null },
      { id: 6, name: "[EMPTY SECTOR]", occupied: false, level: 0, voxels: 0, deltas: 0, playtime: "00h 00m", sizeKb: 0, backend: "local", timestamp: "NEVER", stats: null },
      { id: 7, name: "[EMPTY SECTOR]", occupied: false, level: 0, voxels: 0, deltas: 0, playtime: "00h 00m", sizeKb: 0, backend: "local", timestamp: "NEVER", stats: null },
      { id: 8, name: "[EMPTY SECTOR]", occupied: false, level: 0, voxels: 0, deltas: 0, playtime: "00h 00m", sizeKb: 0, backend: "local", timestamp: "NEVER", stats: null },
      { id: 9, name: "[EMPTY SECTOR]", occupied: false, level: 0, voxels: 0, deltas: 0, playtime: "00h 00m", sizeKb: 0, backend: "local", timestamp: "NEVER", stats: null },
      { id: 10, name: "[EMPTY SECTOR]", occupied: false, level: 0, voxels: 0, deltas: 0, playtime: "00h 00m", sizeKb: 0, backend: "local", timestamp: "NEVER", stats: null }
    ];
  }

  initDOM() {
    this.grid = document.getElementById('saveSlotsGrid');
    this.localBtn = document.getElementById('backendLocalBtn');
    this.cloudBtn = document.getElementById('backendCloudBtn');
    this.statusEl = document.getElementById('saveActiveStatus');
    this.quickSaveBtn = document.getElementById('quickSaveBtn');
    this.quickLoadBtn = document.getElementById('quickLoadBtn');
    this.exportBtn = document.getElementById('exportBinaryBtn');
    this.importBtn = document.getElementById('importBinaryBtn');
  }

  bindEvents() {
    if (this.localBtn) {
      this.localBtn.addEventListener('click', () => {
        this.setBackend('local');
      });
    }
    if (this.cloudBtn) {
      this.cloudBtn.addEventListener('click', () => {
        this.setBackend('cloud');
      });
    }
    if (this.quickSaveBtn) {
      this.quickSaveBtn.addEventListener('click', () => {
        this.quickSave();
      });
    }
    if (this.quickLoadBtn) {
      this.quickLoadBtn.addEventListener('click', () => {
        this.quickLoad();
      });
    }
    if (this.exportBtn) {
      this.exportBtn.addEventListener('click', () => {
        this.exportBinary(this.activeSlotIdx);
      });
    }
    if (this.importBtn) {
      this.importBtn.addEventListener('click', () => {
        this.importBinary();
      });
    }

    // Keyboard shortcuts F5 (Quick-Save) and F9 (Quick-Load)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'F5') {
        e.preventDefault();
        this.quickSave();
      } else if (e.key === 'F9') {
        e.preventDefault();
        this.quickLoad();
      }
    });
  }

  setBackend(backend) {
    this.backend = backend;
    sfx.click();
    if (this.localBtn) this.localBtn.classList.toggle('active', backend === 'local');
    if (this.cloudBtn) this.cloudBtn.classList.toggle('active', backend === 'cloud');

    if (this.statusEl) {
      if (backend === 'local') {
        this.statusEl.textContent = "BACKEND: LOCAL DISK // READY (SSD NVMe 1.4ms)";
        this.statusEl.style.color = "var(--emerald-turf)";
      } else {
        this.statusEl.textContent = `BACKEND: CLOUD SERVER // CONNECTED [TOKEN: ${this.cloudToken}]`;
        this.statusEl.style.color = "var(--cyan-core)";
      }
    }

    if (this.rpg) {
      this.rpg.spawnToast(
        "Storage Backend",
        `Active storage switched to ${backend === 'local' ? 'Local Disk (IndexedDB NVMe)' : 'Central Cloud Server (Sync Token: WCSV-0x5352)'}`
      );
    }
  }

  renderSlots() {
    if (!this.grid) return;
    this.grid.innerHTML = '';

    this.slots.forEach((slot, idx) => {
      const card = document.createElement('div');
      card.className = `save-slot-card ${slot.occupied ? 'occupied' : 'empty'} ${idx === this.activeSlotIdx ? 'active-slot' : ''}`;

      const padNum = String(slot.id).padStart(2, '0');
      const statusPillClass = slot.occupied ?
        (slot.backend === 'cloud' ? 'cloud-synced' : 'disk-synced') : 'unoccupied';
      const statusPillText = slot.occupied ?
        (slot.backend === 'cloud' ? '☁️ CLOUD SYNCED' : '💾 DISK SYNCED') : 'AVAILABLE';

      card.innerHTML = `
        <div class="save-slot-header">
          <span class="save-slot-num">SLOT ${padNum}</span>
          <span class="save-status-pill ${statusPillClass}">${statusPillText}</span>
        </div>

        <div class="save-slot-sector-name">${slot.name}</div>

        <div class="save-slot-meta-row">
          <span class="meta-tag">LVL ${slot.level}</span>
          <span class="meta-tag">${slot.voxels.toLocaleString()} Voxels</span>
          <span class="meta-tag text-cyan">${slot.deltas} Deltas</span>
          <span class="meta-tag text-amber">${slot.sizeKb} KB</span>
          <span class="meta-tag">⏱️ ${slot.playtime}</span>
        </div>

        <div class="save-slot-timestamp">
          COMMITTED: <span class="font-mono text-dim">${slot.timestamp}</span>
        </div>

        <div class="save-slot-actions">
          <button class="stage-btn save-btn" data-slot="${idx}" title="Save Current State into Slot ${slot.id}">
            💾 Save
          </button>
          <button class="stage-btn load-btn" data-slot="${idx}" ${!slot.occupied ? 'disabled style="opacity:0.4;cursor:not-allowed;"' : ''} title="Restore Memory from Slot ${slot.id}">
            🔄 Restore
          </button>
          <button class="stage-btn erase-btn" data-slot="${idx}" ${!slot.occupied ? 'disabled style="opacity:0.4;cursor:not-allowed;"' : ''} title="Wipe Slot ${slot.id}">
            🗑️ Erase
          </button>
        </div>
      `;

      // Event handlers for slot buttons
      const saveBtn = card.querySelector('.save-btn');
      const loadBtn = card.querySelector('.load-btn');
      const eraseBtn = card.querySelector('.erase-btn');

      if (saveBtn) {
        saveBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.saveSlot(idx);
        });
      }
      if (loadBtn && slot.occupied) {
        loadBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.loadSlot(idx);
        });
      }
      if (eraseBtn && slot.occupied) {
        eraseBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.eraseSlot(idx);
        });
      }

      card.addEventListener('click', () => {
        this.activeSlotIdx = idx;
        this.renderSlots();
        sfx.click();
      });

      this.grid.appendChild(card);
    });
  }

  saveSlot(idx) {
    const slot = this.slots[idx];
    const now = new Date();
    const timeStr = now.toISOString().replace('T', ' ').substring(0, 16) + ' UTC';

    let sectorName = slot.name;
    if (!slot.occupied || sectorName === '[EMPTY SECTOR]') {
      const defaultNames = [
        "Astraea Crater Outpost",
        "Caldera Geothermal Base",
        "Crystalline Ridge",
        "Sub-Oceanic Abyss Vault",
        "Tachyon Core Station",
        "Polar Cryo Citadel",
        "Nanite Dune Haven"
      ];
      sectorName = defaultNames[idx % defaultNames.length];
    }

    const deltas = Math.floor(45 + Math.random() * 80);
    const voxels = 120000 + Math.floor(Math.random() * 95000);
    const sizeKb = Number(((24 + deltas * 16 + 210) / 1024).toFixed(1));
    const level = this.rpg ? this.rpg.stats.level || 12 : 12;

    const statsSnapshot = this.rpg ? {
      hp: this.rpg.stats.health,
      maxHp: this.rpg.stats.maxHealth,
      oxygen: this.rpg.stats.oxygen,
      maxOxygen: this.rpg.stats.maxOxygen,
      hunger: this.rpg.stats.hunger,
      water: this.rpg.stats.water,
      stamina: this.rpg.stats.stamina
    } : { hp: 100, maxHp: 100, oxygen: 100, maxOxygen: 100, hunger: 85, water: 85, stamina: 100 };

    this.slots[idx] = {
      id: idx + 1,
      name: sectorName,
      occupied: true,
      level: level,
      voxels: voxels,
      deltas: deltas,
      playtime: "06h " + Math.floor(10 + Math.random() * 45) + "m",
      sizeKb: sizeKb,
      backend: this.backend,
      timestamp: timeStr,
      stats: statsSnapshot
    };

    this.activeSlotIdx = idx;
    sfx.save();

    if (this.rpg) {
      this.rpg.spawnToast(
        "Sector Memory Saved",
        `Slot ${idx + 1} (${sectorName}) serialized into 0x57435356 binary payload (${this.backend.toUpperCase()} backend)!`
      );
    }

    this.renderSlots();
  }

  loadSlot(idx) {
    const slot = this.slots[idx];
    if (!slot || !slot.occupied) {
      if (this.rpg) {
        this.rpg.spawnToast("Load Failed", `Slot ${idx + 1} is empty.`);
      }
      return;
    }

    this.activeSlotIdx = idx;

    if (this.rpg && slot.stats) {
      this.rpg.stats.health = slot.stats.hp;
      this.rpg.stats.maxHealth = slot.stats.maxHp;
      this.rpg.stats.oxygen = slot.stats.oxygen;
      this.rpg.stats.maxOxygen = slot.stats.maxOxygen;
      this.rpg.stats.hunger = slot.stats.hunger;
      this.rpg.stats.water = slot.stats.water;
      this.rpg.stats.stamina = slot.stats.stamina;
      this.rpg.updateUI();
    }

    sfx.equip();

    if (this.rpg) {
      this.rpg.spawnToast(
        "Sector Memory Restored",
        `Restored ${slot.name}: Reconciled ${slot.deltas} sparse block deltas from ${slot.backend.toUpperCase()} storage!`
      );
    }

    this.renderSlots();
  }

  eraseSlot(idx) {
    const slot = this.slots[idx];
    if (!slot.occupied) return;

    this.slots[idx] = {
      id: idx + 1,
      name: "[EMPTY SECTOR]",
      occupied: false,
      level: 0,
      voxels: 0,
      deltas: 0,
      playtime: "00h 00m",
      sizeKb: 0,
      backend: this.backend,
      timestamp: "NEVER",
      stats: null
    };

    sfx.shatter();

    if (this.rpg) {
      this.rpg.spawnToast("Sector Erased", `Slot ${idx + 1} memory bank completely wiped.`);
    }

    this.renderSlots();
  }

  quickSave() {
    this.saveSlot(this.activeSlotIdx);
  }

  quickLoad() {
    this.loadSlot(this.activeSlotIdx);
  }

  exportBinary(slotIdx) {
    const slot = this.slots[slotIdx];
    if (!slot || !slot.occupied) {
      if (this.rpg) {
        this.rpg.spawnToast("Export Notice", `Please select an active occupied slot to export.`);
      }
      return;
    }

    // Binary Serialization: Magic 'WCSV' (0x57, 0x43, 0x53, 0x56) + Version 1 (0x00, 0x01)
    const headerBytes = new Uint8Array([
      0x57, 0x43, 0x53, 0x56, // Magic
      0x00, 0x01,             // Version 1
      slot.id,                // Slot index
      slot.level,             // Player Level
      (slot.deltas >> 8) & 0xFF,
      slot.deltas & 0xFF      // Deltas count
    ]);

    const payloadData = new TextEncoder().encode(JSON.stringify({
      sector: slot.name,
      voxels: slot.voxels,
      deltas: slot.deltas,
      backend: slot.backend,
      timestamp: slot.timestamp,
      stats: slot.stats
    }));

    const blob = new Blob([headerBytes, payloadData], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `astraea_sector_slot_${slot.id}.wcsv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    sfx.save();
    if (this.rpg) {
      this.rpg.spawnToast(
        "Binary WCSV Exported",
        `Downloaded astraea_sector_slot_${slot.id}.wcsv (Magic 0x57435356 Verified)`
      );
    }
  }

  importBinary() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.wcsv,.bin,*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (evt) => {
        const buffer = evt.target.result;
        const bytes = new Uint8Array(buffer);

        // Check magic 'WCSV' = 0x57, 0x43, 0x53, 0x56
        if (bytes.length >= 6 &&
            bytes[0] === 0x57 && bytes[1] === 0x43 &&
            bytes[2] === 0x53 && bytes[3] === 0x56) {
          // Valid WCSV binary
          const textDecoder = new TextDecoder();
          let importedSector = null;
          try {
            const jsonText = textDecoder.decode(bytes.slice(8));
            importedSector = JSON.parse(jsonText);
          } catch (err) {
            importedSector = { sector: "Imported Sector Archive", voxels: 145000, deltas: 76, stats: null };
          }

          // Place into first empty slot or active slot
          let targetIdx = this.slots.findIndex(s => !s.occupied);
          if (targetIdx === -1) targetIdx = this.activeSlotIdx;

          this.slots[targetIdx] = {
            id: targetIdx + 1,
            name: importedSector.sector || "Imported Binary Sector",
            occupied: true,
            level: bytes[7] || 10,
            voxels: importedSector.voxels || 150000,
            deltas: importedSector.deltas || 64,
            playtime: "07h 30m",
            sizeKb: Number((buffer.byteLength / 1024).toFixed(1)),
            backend: this.backend,
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
            stats: importedSector.stats || { hp: 100, maxHp: 100, oxygen: 100, maxOxygen: 100, hunger: 80, water: 80, stamina: 100 }
          };

          this.activeSlotIdx = targetIdx;
          sfx.craft();
          if (this.rpg) {
            this.rpg.spawnToast(
              "Sector Import Success",
              `Magic 0x57435356 verified! Imported into Slot ${targetIdx + 1} (${this.slots[targetIdx].name}).`
            );
          }
          this.renderSlots();
        } else {
          // Invalid header
          sfx.shatter();
          if (this.rpg) {
            this.rpg.spawnToast(
              "Import Rejected",
              "File lacks valid WCSV binary magic header (Expected 0x57435356)."
            );
          }
        }
      };
      reader.readAsArrayBuffer(file);
    };
    input.click();
  }
}

// ==========================================
// 16. MULTI-SCALE 4x4 SUB-BLOCK SYSTEM ([B] KEY)
// ==========================================
class SubBlockManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas ? canvas.getContext('2d') : null;
    this.currentScale = 0; // 0: 1.0x, 1: 0.75x, 2: 0.5x, 3: 0.25x
    this.scaleModes = [
      { id: 0, name: "1.0x Full Block", ratio: "1.0x", voxels: 64, dim: "1.00m", grid: 4, desc: "Standard 1-meter cube (4×4×4 = 64 micro-voxels)" },
      { id: 1, name: "0.75x Medium Block", ratio: "0.75x", voxels: 27, dim: "0.75m", grid: 3, desc: "Medium machine volume (3×3×3 = 27 micro-voxels)" },
      { id: 2, name: "0.5x Half Block", ratio: "0.5x", voxels: 8, dim: "0.50m", grid: 2, desc: "Steps & slabs (2×2×2 = 8 micro-voxels)" },
      { id: 3, name: "0.25x Micro Block", ratio: "0.25x", voxels: 1, dim: "0.25m", grid: 1, desc: "Precision sculpting (1×1×1 = 1 micro-voxel)" }
    ];

    this.hudBadge = document.getElementById('subblockHudBadge');
    this.toast = document.getElementById('subblockToast');
    this.simHotbarHudTag = document.getElementById('simHotbarHudTag');
    this.buttons = document.querySelectorAll('.subblock-btn');
    this.cards = document.querySelectorAll('.scale-card');
    this.cycleBtn = document.getElementById('cycleScaleBtn');

    this.rotY = 0.55;
    this.toastTimeout = null;

    this.init();
  }

  init() {
    this.buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const scale = parseInt(btn.dataset.scale, 10);
        this.setScale(scale);
      });
    });

    this.cards.forEach(card => {
      card.addEventListener('click', () => {
        const scale = parseInt(card.dataset.scale, 10);
        this.setScale(scale);
      });
    });

    if (this.cycleBtn) {
      this.cycleBtn.addEventListener('click', () => {
        this.cycle();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.code === 'KeyB' || e.key.toLowerCase() === 'b') {
        this.cycle();
      }
    });

    if (this.ctx) {
      this.render();
      setInterval(() => {
        this.rotY += 0.015;
        this.render();
      }, 30);
    }
  }

  cycle() {
    this.setScale((this.currentScale + 1) % this.scaleModes.length);
  }

  setScale(scale) {
    this.currentScale = scale;
    const mode = this.scaleModes[this.currentScale];
    sfx.click();

    this.buttons.forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.scale, 10) === this.currentScale);
    });
    this.cards.forEach(card => {
      card.classList.toggle('active', parseInt(card.dataset.scale, 10) === this.currentScale);
    });

    if (this.hudBadge) {
      this.hudBadge.textContent = `[ BUILD: ${mode.name} (${mode.voxels} voxels) ] [B]`;
    }
    if (this.simHotbarHudTag) {
      this.simHotbarHudTag.textContent = `[ BUILD: ${mode.ratio} ] [B]`;
    }

    if (this.toast) {
      this.toast.textContent = `SCALE SWITCH: ${mode.name.toUpperCase()} (${mode.dim})`;
      this.toast.classList.add('show');
      clearTimeout(this.toastTimeout);
      this.toastTimeout = setTimeout(() => {
        this.toast.classList.remove('show');
      }, 1400);
    }

    this.render();
  }

  render() {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    ctx.clearRect(0, 0, w, h);

    const mode = this.scaleModes[this.currentScale];
    const centerX = w / 2;
    const centerY = h / 2 + 10;
    const isoSize = 26;

    const project = (x, y, z) => {
      const cos = Math.cos(this.rotY);
      const sin = Math.sin(this.rotY);
      const rx = x * cos - z * sin;
      const rz = x * sin + z * cos;
      const isoX = (rx - rz) * Math.cos(Math.PI / 6) * isoSize;
      const isoY = (y * isoSize * 1.1) + (rx + rz) * Math.sin(Math.PI / 6) * (isoSize * 0.75);
      return { x: centerX + isoX, y: centerY - isoY };
    };

    // Draw 4x4x4 outer boundary wireframe (1.0m cube)
    ctx.strokeStyle = "rgba(0, 240, 255, 0.25)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);

    const corners = [
      project(-2, -2, -2), project(2, -2, -2), project(2, 2, -2), project(-2, 2, -2),
      project(-2, -2, 2), project(2, -2, 2), project(2, 2, 2), project(-2, 2, 2)
    ];

    const edges = [
      [0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]
    ];
    edges.forEach(([i, j]) => {
      ctx.beginPath();
      ctx.moveTo(corners[i].x, corners[i].y);
      ctx.lineTo(corners[j].x, corners[j].y);
      ctx.stroke();
    });

    ctx.setLineDash([]);

    // Draw active sub-block voxels (grid x grid x grid)
    const g = mode.grid;
    const startOffset = -2;
    const voxelList = [];

    for (let x = 0; x < g; x++) {
      for (let y = 0; y < g; y++) {
        for (let z = 0; z < g; z++) {
          const vx = startOffset + x;
          const vy = startOffset + y;
          const vz = startOffset + z;
          const depth = vx * Math.sin(this.rotY) + vz * Math.cos(this.rotY) - vy * 0.5;
          voxelList.push({ vx, vy, vz, depth });
        }
      }
    }

    voxelList.sort((a, b) => a.depth - b.depth);

    voxelList.forEach(vox => {
      this.drawIsoCube(ctx, project, vox.vx, vox.vy, vox.vz);
    });

    // Dimension label
    ctx.font = "bold 13px JetBrains Mono, monospace";
    ctx.fillStyle = "#00f0ff";
    ctx.textAlign = "center";
    ctx.fillText(`${mode.name}: ${mode.dim} (${mode.voxels} micro-voxels)`, centerX, h - 16);
  }

  drawIsoCube(ctx, project, x, y, z) {
    const p000 = project(x, y, z);
    const p100 = project(x + 1, y, z);
    const p110 = project(x + 1, y + 1, z);
    const p010 = project(x, y + 1, z);
    const p001 = project(x, y, z + 1);
    const p101 = project(x + 1, y, z + 1);
    const p111 = project(x + 1, y + 1, z + 1);
    const p011 = project(x, y + 1, z + 1);

    // Top face
    ctx.fillStyle = "rgba(0, 240, 255, 0.45)";
    ctx.strokeStyle = "rgba(0, 240, 255, 0.9)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(p010.x, p010.y);
    ctx.lineTo(p110.x, p110.y);
    ctx.lineTo(p111.x, p111.y);
    ctx.lineTo(p011.x, p011.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Right face
    ctx.fillStyle = "rgba(0, 180, 230, 0.35)";
    ctx.beginPath();
    ctx.moveTo(p100.x, p100.y);
    ctx.lineTo(p110.x, p110.y);
    ctx.lineTo(p111.x, p111.y);
    ctx.lineTo(p101.x, p101.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Left face
    ctx.fillStyle = "rgba(0, 130, 190, 0.25)";
    ctx.beginPath();
    ctx.moveTo(p000.x, p000.y);
    ctx.lineTo(p010.x, p010.y);
    ctx.lineTo(p011.x, p011.y);
    ctx.lineTo(p001.x, p001.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}

// ==========================================
// 17. CONTINENTAL OCEAN BIOMES & DEPTH STRATIFICATION
// ==========================================
class MarineDepthManager {
  constructor() {
    this.layers = document.querySelectorAll('.depth-layer-strip');
    this.init();
  }

  init() {
    this.layers.forEach(layer => {
      layer.addEventListener('click', () => {
        sfx.hover();
        this.layers.forEach(l => l.classList.remove('active'));
        layer.classList.add('active');
      });
    });
  }
}

// ==========================================
// 18. TARGETED MOB COMBAT & TACTICAL HEALTH HUD
// ==========================================
class CombatManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas ? canvas.getContext('2d') : null;

    this.mobs = {
      abyssal_angler: { name: "Abyssal Angler", taxonomy: "[AQUATIC]", maxHp: 34, xp: 35, drops: [{ name: "Raw Fish Filet (#85)", icon: "🐟" }, { name: "Bioluminescent Scale (#128)", icon: "✨" }], color: "#00f0ff" },
      cyber_hog: { name: "Cyber-Hog", taxonomy: "[FAUNA]", maxHp: 20, xp: 20, drops: [{ name: "Raw Alien Meat (#83)", icon: "🥩" }, { name: "Bio-Synthetic Sinew (#125)", icon: "🧬" }], color: "#10b981" },
      void_eel: { name: "Void Eel", taxonomy: "[AQUATIC]", maxHp: 26, xp: 30, drops: [{ name: "Raw Fish Filet (#85)", icon: "🐟" }, { name: "Electrified Barb (#130)", icon: "⚡" }], color: "#a855f7" },
      xeno_bird: { name: "Xeno-Bird", taxonomy: "[AVIAN]", maxHp: 14, xp: 15, drops: [{ name: "Raw Alien Meat (#83)", icon: "🥩" }, { name: "Prismatic Fin (#131)", icon: "🪶" }], color: "#38bdf8" },
      frost_yeti: { name: "Frost Yeti", taxonomy: "[FAUNA]", maxHp: 65, xp: 60, drops: [{ name: "Reinforced Chitin (#129)", icon: "🛡️" }, { name: "Weathered Dune Hide (#134)", icon: "🧥" }], color: "#cbd5e1" }
    };

    this.currentMobKey = 'abyssal_angler';
    this.currentMob = this.mobs[this.currentMobKey];
    this.hp = this.currentMob.maxHp;
    this.selectedDamage = 8;
    this.lastAttackTime = 0;
    this.attackCadenceMs = 320; // 0.32s cadence
    this.particles = [];
    this.knockbackX = 0;
    this.knockbackDecay = 0.9;
    this.isDead = false;

    this.taxonomyBadge = document.getElementById('targetTaxonomyBadge');
    this.mobName = document.getElementById('targetMobName');
    this.hpText = document.getElementById('targetHpText');
    this.barFill = document.getElementById('targetBarFill');
    this.barFlash = document.getElementById('targetBarFlash');
    this.gradientStatus = document.getElementById('hudGradientStatus');
    this.mobSelect = document.getElementById('combatMobSelect');
    this.strikeBtn = document.getElementById('combatStrikeBtn');
    this.respawnBtn = document.getElementById('combatRespawnBtn');
    this.toast = document.getElementById('combatToast');
    this.damageOverlay = document.getElementById('damageOverlay');
    this.lootTray = document.getElementById('combatLootTray');
    this.weaponBtns = document.querySelectorAll('.weapon-btn');

    this.init();
  }

  init() {
    if (this.mobSelect) {
      this.mobSelect.addEventListener('change', (e) => {
        this.selectMob(e.target.value);
      });
    }

    this.weaponBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sfx.click();
        this.weaponBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedDamage = parseInt(btn.dataset.dmg, 10);
      });
    });

    if (this.strikeBtn) {
      this.strikeBtn.addEventListener('click', () => this.strike());
      let holdInterval = null;
      this.strikeBtn.addEventListener('mousedown', () => {
        holdInterval = setInterval(() => this.strike(), this.attackCadenceMs);
      });
      window.addEventListener('mouseup', () => {
        if (holdInterval) clearInterval(holdInterval);
      });
    }

    if (this.respawnBtn) {
      this.respawnBtn.addEventListener('click', () => this.respawn());
    }

    if (this.canvas) {
      this.canvas.addEventListener('click', () => this.strike());
      this.loop();
    }

    this.updateHUD();
  }

  selectMob(key) {
    if (!this.mobs[key]) return;
    this.currentMobKey = key;
    this.currentMob = this.mobs[key];
    this.respawn();
  }

  respawn() {
    this.hp = this.currentMob.maxHp;
    this.isDead = false;
    this.knockbackX = 0;
    this.particles = [];
    sfx.creature();
    this.updateHUD();
  }

  strike() {
    const now = Date.now();
    if (now - this.lastAttackTime < this.attackCadenceMs) return;
    this.lastAttackTime = now;

    if (this.isDead) {
      this.respawn();
      return;
    }

    const dmg = this.selectedDamage;
    this.hp = Math.max(0, this.hp - dmg);
    this.knockbackX = -18;

    for (let i = 0; i < 12; i++) {
      this.particles.push({
        x: this.canvas.width / 2,
        y: this.canvas.height / 2,
        vx: (Math.random() - 0.5) * 8 + 4,
        vy: (Math.random() - 0.5) * 8,
        life: 1.0,
        color: Math.random() > 0.5 ? '#ffcc00' : '#ffffff'
      });
    }

    if (this.barFlash) {
      this.barFlash.classList.add('flash');
      setTimeout(() => this.barFlash.classList.remove('flash'), 120);
    }

    this.spawnDamageNumber(dmg);

    if (this.selectedDamage > 30) {
      sfx.laser();
    } else {
      sfx.click();
    }

    if (this.hp === 0) {
      this.handleDeath();
    }

    this.updateHUD();
  }

  handleDeath() {
    this.isDead = true;
    sfx.shatter();

    for (let i = 0; i < 28; i++) {
      this.particles.push({
        x: this.canvas.width / 2,
        y: this.canvas.height / 2,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.5) * 14,
        life: 1.5,
        color: this.currentMob.color
      });
    }

    if (this.toast) {
      this.toast.textContent = `TARGET ELIMINATED: +${this.currentMob.xp} XP`;
      this.toast.classList.add('show');
      setTimeout(() => this.toast.classList.remove('show'), 1600);
    }

    if (this.lootTray) {
      this.currentMob.drops.forEach(drop => {
        const pill = document.createElement('div');
        pill.className = 'loot-item-pill';
        pill.innerHTML = `<span class="loot-icon">${drop.icon}</span><span>${drop.name}</span>`;
        this.lootTray.prepend(pill);
        if (this.lootTray.children.length > 8) {
          this.lootTray.removeChild(this.lootTray.lastChild);
        }
      });
    }
  }

  spawnDamageNumber(dmg) {
    if (!this.damageOverlay) return;
    const num = document.createElement('div');
    num.className = 'floating-damage-num';
    num.textContent = `-${dmg}`;
    const x = this.canvas.offsetWidth / 2 + (Math.random() - 0.5) * 40;
    const y = this.canvas.offsetHeight / 2 - 20 + (Math.random() - 0.5) * 20;
    num.style.left = `${x}px`;
    num.style.top = `${y}px`;
    this.damageOverlay.appendChild(num);
    setTimeout(() => num.remove(), 700);
  }

  updateHUD() {
    const ratio = this.hp / this.currentMob.maxHp;
    const pct = Math.round(ratio * 100);

    if (this.taxonomyBadge) this.taxonomyBadge.textContent = this.currentMob.taxonomy;
    if (this.mobName) this.mobName.textContent = this.currentMob.name;
    if (this.hpText) this.hpText.textContent = `${this.hp} / ${this.currentMob.maxHp} HP`;

    if (this.barFill) {
      this.barFill.style.width = `${pct}%`;
      if (pct > 50) {
        this.barFill.style.background = "linear-gradient(90deg, #10b981, #34d399)";
        if (this.gradientStatus) {
          this.gradientStatus.textContent = `Emerald Green (${pct}%)`;
          this.gradientStatus.style.color = "#10b981";
        }
      } else if (pct >= 20) {
        this.barFill.style.background = "linear-gradient(90deg, #f59e0b, #fbbf24)";
        if (this.gradientStatus) {
          this.gradientStatus.textContent = `Amber Gold (${pct}%)`;
          this.gradientStatus.style.color = "#f59e0b";
        }
      } else {
        this.barFill.style.background = "linear-gradient(90deg, #ef4444, #f87171)";
        if (this.gradientStatus) {
          this.gradientStatus.textContent = `Crimson Red (${pct}%)`;
          this.gradientStatus.style.color = "#ef4444";
        }
      }
    }
  }

  loop() {
    this.render();
    requestAnimationFrame(() => this.loop());
  }

  render() {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    ctx.clearRect(0, 0, w, h);

    this.knockbackX *= this.knockbackDecay;

    const mobX = w / 2 + this.knockbackX;
    const mobY = h / 2 + 10;

    if (!this.isDead) {
      ctx.save();
      ctx.translate(mobX, mobY);

      ctx.strokeStyle = "rgba(0, 240, 255, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-55, -45, 110, 90);

      ctx.strokeStyle = "#00f0ff";
      ctx.lineWidth = 2.5;
      const bLen = 12;
      ctx.beginPath(); ctx.moveTo(-55, -45 + bLen); ctx.lineTo(-55, -45); ctx.lineTo(-55 + bLen, -45); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(55 - bLen, -45); ctx.lineTo(55, -45); ctx.lineTo(55, -45 + bLen); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-55, 45 - bLen); ctx.lineTo(-55, 45); ctx.lineTo(-55 + bLen, 45); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(55 - bLen, 45); ctx.lineTo(55, 45); ctx.lineTo(55, 45 - bLen); ctx.stroke();

      ctx.fillStyle = this.currentMob.color;
      ctx.beginPath();
      ctx.arc(0, 0, 32, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(12, -6, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#050811";
      ctx.beginPath();
      ctx.arc(14, -6, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = "bold 11px JetBrains Mono, monospace";
      ctx.fillStyle = "rgba(0, 240, 255, 0.8)";
      ctx.textAlign = "center";
      ctx.fillText("[10.0m LOCK]", 0, 62);

      ctx.restore();
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.035;

      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3 * p.life, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1.0;
    }
  }
}
// 15. INITIALIZATION ON DOM READY
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Exploration and Anomaly Scanner
  new ExplorationScannerManager();
  // Audio toggle
  const audioBtn = document.getElementById('audioToggleBtn');
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      sfx.enabled = !sfx.enabled;
      audioBtn.classList.toggle('active', sfx.enabled);
      audioBtn.title = sfx.enabled ? "Audio: Online" : "Audio: Muted";
      sfx.click();
    });
  }

  // 3D Voxel Stage
  const stageCanvas = document.getElementById('voxelLabCanvas');
  const voxelLab = stageCanvas ? new Voxel3DRenderer(stageCanvas) : null;

  const orbitBtn = document.getElementById('stageOrbitBtn');
  if (orbitBtn && voxelLab) {
    orbitBtn.addEventListener('click', () => {
      sfx.click();
      voxelLab.autoRotate = !voxelLab.autoRotate;
      orbitBtn.textContent = voxelLab.autoRotate ? "Orbit: ON" : "Orbit: OFF";
      orbitBtn.classList.toggle('active', voxelLab.autoRotate);
    });
  }

  const resetBtn = document.getElementById('stageZoomReset');
  if (resetBtn && voxelLab) {
    resetBtn.addEventListener('click', () => {
      sfx.click();
      voxelLab.rotX = -0.45;
      voxelLab.rotY = 0.65;
      voxelLab.zoom = 1.0;
    });
  }

  // Codex
  if (voxelLab) {
    new CodexManager(BLOCKS, voxelLab);
  }

  // Dynamic Celestial Skybox & Atmosphere Simulator
  const skyboxCanvas = document.getElementById('skyboxCanvas');
  if (skyboxCanvas) {
    new AtmosphereSimulator(skyboxCanvas);
  }

  // Climate Matrix
  const climateCanvas = document.getElementById('climateCanvas');
  if (climateCanvas) {
    new ClimateMatrixExplorer(climateCanvas);
  }

  // Fluid Dynamics
  const fluidCanvas = document.getElementById('fluidCanvas');
  if (fluidCanvas) {
    new FluidSandbox(fluidCanvas);
  }

  // Mining Lab
  new MiningSimulator();

  // Crafting Lab
  new CraftingMatrixLab();

  // RPG Life Support
  const rpg = new RPGSubsystem();

  // 4x4 Micro-Voxel Fauna Ecosystem (21 Species & Water Depth Law)
  const faunaCanvas = document.getElementById('faunaCanvas');
  if (faunaCanvas) {
    new FaunaEcosystemManager(faunaCanvas, rpg);
  }

  // 4x4 Micro-Block Carver Workbench
  const carverCanvas = document.getElementById('carverCanvas');
  if (carverCanvas) {
    new MicroBlockCarver(carverCanvas);
  }

  // 10-Slot Sector Memory Bank & Save Matrix System
  new SaveMatrixManager(rpg);

  // Exosuit Rig Fitting Bay & Defense Simulator
  const rigManager = new ExosuitRigManager(rpg);

  // Cybernetic Armory & Items
  const armoryManager = new ArmoryManager(rpg, rigManager);
  rigManager.armoryManager = armoryManager;

  // Multi-Scale 4x4 Sub-Block Building System ([B] Key)
  const subblockCanvas = document.getElementById('subblockCanvas');
  if (subblockCanvas) {
    new SubBlockManager(subblockCanvas);
  }

  // Continental Ocean Biomes & Depth Stratification
  new MarineDepthManager();

  // Targeted Mob Combat & Tactical HUD
  const combatCanvas = document.getElementById('combatCanvas');
  if (combatCanvas) {
    new CombatManager(combatCanvas);
  }

  // Early Access Transmission signal
  const transmitBtn = document.getElementById('transmitSignalBtn');
  const callsignInput = document.getElementById('callsignInput');
  const signalStatusMsg = document.getElementById('signalStatusMsg');

  if (transmitBtn && callsignInput && signalStatusMsg) {
    transmitBtn.addEventListener('click', () => {
      const val = callsignInput.value.trim();
      sfx.craft();
      if (!val) {
        signalStatusMsg.textContent = "Please enter a Call-Sign or Frequency ID to register.";
        signalStatusMsg.style.color = "var(--amber-gold)";
        return;
      }
      transmitBtn.disabled = true;
      transmitBtn.textContent = "Transmitting...";
      setTimeout(() => {
        transmitBtn.textContent = "Registered";
        signalStatusMsg.textContent = `✓ Transmission Locked: [${val}] registered on the expedition manifest. Awaiting planetfall signal.`;
        signalStatusMsg.style.color = "var(--emerald-turf)";
      }, 600);
    });
  }
});
