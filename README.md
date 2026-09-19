# WeCrafter 🪐

> **Sci-fi voxel sandbox** set on the alien world of **Astraea-IV**.  
> Mine exotic resources, build incredible structures, and encounter the native fauna — all in a procedurally generated world that's different every time you play.

*Created by Kynlo — Development Build*

---

## 🚀 Quick Start

1. **Download** `WeCrafter-v1.0-portable.zip` from the [latest release](../../releases/latest)
2. **Extract** the zip to any folder (keep the `assets/` folder next to `WeCrafter.exe`)
3. **Double-click** `WeCrafter.exe` — no installation required!

> **Requirements:** Windows 10/11 (64-bit), OpenGL 3.3+ compatible GPU

---

## 🎮 Controls

### Movement
| Key | Action |
|-----|--------|
| `W A S D` | Move forward / left / backward / right |
| `Space` | Jump |
| `Space` (double-tap) | Toggle fly mode |
| `Space` (hold, while flying) | Ascend |
| `Left Shift` | Sprint / descend while flying |
| `Left Ctrl` | Crouch |

### World Interaction
| Key / Button | Action |
|---|---|
| `Left Click` | Mine / break block |
| `Right Click` | Place block / use item |
| `Q` | Drop active item |
| `B` | Cycle block scale (1×, 2×, 3×, 4×) |
| `1` – `9` | Select hotbar slot |
| Mouse Scroll | Scroll hotbar |

### UI & Systems
| Key | Action |
|-----|--------|
| `E` | Open / close Inventory |
| `X` | Open Xenoscanner (NPC & world info) |
| `F3` | Toggle Debug overlay |
| `Esc` | Pause menu / back |
| `Tab` | Cycle camera modes |

---

## 🌍 Game Modes

### 🌿 Peaceful
The recommended starting mode. NPCs never attack — even if you strike them. Survival stats (hunger, thirst, oxygen) are **not active**, so you can focus entirely on exploration and building. You still need to **collect all resources** the old-fashioned way — mine blocks, gather drops, and craft your way up.

- Stack size: up to **1,000 items per slot**
- Perfect for learning the world and building freely

### 🔧 Creative Sandbox
Full god-mode. Unlimited block placement (no resource consumption), flight always active, no damage. Ideal for large-scale building projects and experimentation.

- Blocks are placed without consuming inventory
- No vital drain of any kind

> Switch between modes any time in **Settings → Game Mode**.

---

## 🗺️ World Generation & Seeds

Every new game generates a **unique procedural world** from a seed. If you leave the seed as `< RANDOM >`, each launch creates a brand-new Astraea-IV sector to explore. Set a specific numeric seed in **Settings → World Seed** to share or revisit a favourite world.

Saves preserve the exact seed, so loading a save always returns you to the same world.

---

## 🏔️ Biomes

| Biome | Description |
|-------|-------------|
| **Nanite Plains** | Rolling flatlands of grey-blue nanite dust — the most common starting biome |
| **Xenoflora Basin** | Dense alien vegetation; rich in exotic flora materials |
| **Crystal Wastes** | Jagged crystalline formations, rare mineral veins |
| **Volcanic Rifts** | Lava-scarred badlands with obsidian and ignite deposits |
| **Frozen Tundra** | Ice-locked plateaus; cryo-minerals and unique fauna |
| **Deep Ocean** | Vast underwater expanses teeming with aquatic life |
| **Quantum Anomaly Zone** | Reality-warped regions with exotic loot and hazards |
| **Bioluminescent Caves** | Underground caverns lit by glowing fungi |
| **Arid Badlands** | Scorched red desert with sandstone and mesa structures |
| **Fungal Forest** | Towering alien mushroom canopy |

---

## 🐾 Wildlife & NPCs

### 🐟 Aquatic (spawn in water ≥ 3 blocks deep)
| NPC | Notes |
|-----|-------|
| **Nanite Eel** | Thin bio-electric predator; drops Eel Conductor |
| **Crystal Jellyfish** | Passive drifter; drops Prismatic Membrane |
| **Abyssal Kraken** | Massive deep-water boss; rare Echo Core drop |
| **Glowfin** | Peaceful bioluminescent fish; drops Glow Essence |
| **Void Ray** | Flat predatory ray; drops Dark Cartilage |
| **Coral Serpent** | Coils around reefs; drops Reef Scale |

### 🦎 Land (biome-specific)
| NPC | Biome | Notes |
|-----|-------|-------|
| **Nanite Crawler** | Nanite Plains | Skittering insectoid; drops Crawler Chitin |
| **Xenoflora Grazer** | Xenoflora Basin | Passive herd animal; drops Flora Membrane |
| **Crystal Stalker** | Crystal Wastes | Ambush predator; drops Crystal Shard |
| **Lava Brute** | Volcanic Rifts | Slow, high-HP bruiser; drops Ignite Core |
| **Frost Wraith** | Frozen Tundra | Fast ethereal hunter; drops Cryo Essence |
| **Quantum Sprite** | Quantum Anomaly Zone | Teleporting nuisance; drops Quantum Dust |
| **Fungal Creeper** | Fungal Forest | Exploding spore bomb; drops Spore Pod |
| **Sand Lurker** | Arid Badlands | Burrows underground; drops Silicate Fang |
| **Biolum Moth** | Bioluminescent Caves | Gentle cave-dweller; drops Glow Silk |
| **Tundra Colossus** | Frozen Tundra | Rare roaming giant; drops Colossus Bone |

> In **Peaceful** mode all NPCs are completely passive and will never attack.

---

## 🎒 Inventory & Crafting

- **45 slots**: 9 hotbar + 27 main inventory + 5 crafting grid + 4 armor
- Stack limit: **1,000 per slot**
- Hover over any item for a detailed tooltip: rarity, stats, lore, and stack info
- **Crafting**: place ingredients in the 2×2 grid (top-right of inventory panel) to produce items
- **Armor slots**: equip chest, legs, helmet and boots for protection bonuses

---

## 🛠️ Block Scales

Press `B` to cycle through four placement scales:
- **1× (Full)** — standard block size
- **2×** — half-size sub-blocks
- **3×** — third-size sub-blocks  
- **4×** — quarter-size (finest detail)

Smaller scales let you build intricate details, decorative trim, and micro-structures inside standard block spaces.

---

## 💾 Save System

- Three save slots (Save A / B / C) accessible from the main menu
- Saves store: world seed, all blocks placed/removed, inventory, player position, equipment
- Loading a save always restores the exact world state — world seed is **not** re-randomised on load

---

## 🔬 RPG & Scanner Systems

- **Xenoscanner** (`X`) — scan the environment for NPC info, block composition, biome data, and resource hints
- **RPG Stats** — in future Survival mode: health, hunger, thirst, oxygen, and temperature all tracked in real time
- **Item rarity tiers**: Common → Uncommon → Rare → Epic → Legendary

---

## 📋 System Requirements

| | Minimum |
|--|--|
| **OS** | Windows 10 64-bit |
| **GPU** | OpenGL 3.3 compatible (integrated graphics OK) |
| **RAM** | 4 GB |
| **Storage** | 10 MB |
| **CPU** | Any dual-core 2 GHz+ |

---

## 📁 Folder Structure (portable)

```
WeCrafter-v1.0-portable/
├── WeCrafter.exe          ← Launch this!
└── assets/
    ├── textures/          ← Block & entity atlas
    ├── shaders/           ← GLSL rendering shaders
    └── ui/                ← Fonts & UI sprites
```

> ⚠️ Do **not** move `WeCrafter.exe` out of the folder — the `assets/` directory must remain alongside it.

---

## 🙏 Credits

- **Created by Kynlo**
- UI assets: [Kenney.nl](https://kenney.nl) (CC0)
- Font: *Kenney Future* (CC0)

---

*WeCrafter — Development Build*
