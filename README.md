# WeCrafter 🪐

> **Sci-fi voxel sandbox** set on the alien world of **Astraea-IV**.  
> Mine exotic resources, build incredible structures, and encounter the native fauna — all in a procedurally generated world that's different every time you play.

*Created by Kynlo — Development Build*

---

## 🚀 Quick Start

1. **Download** [`WeCrafter-v1.4-portable.zip`](../../releases/latest) from the [latest release](../../releases/latest)
2. **Extract** the zip to any folder (keep the `assets/` folder next to `WeCrafter.exe`)
3. **Double-click** `WeCrafter.exe` — no installation required!

> **Requirements:** Windows 10/11 (64-bit), OpenGL 3.3+ compatible GPU

---

## 🌐 Multiplayer & Dedicated Server

Play with your friends anywhere across the internet — even behind strict CGNAT home connections — with zero port forwarding required!

### 1-Click Server Hosting (with Ngrok Static Domain)
1. Double-click `start_server.cmd` in your game folder.
2. The script launches the dedicated server on port 7777 and spins up an encrypted Ngrok tunnel bound to the official static domain (`https://causal-tranquil-tag.ngrok-free.dev`).
3. The script automatically copies the public tunnel URL (`wss://causal-tranquil-tag.ngrok-free.dev`) directly to your Windows clipboard!

### Joining a Multiplayer Sector (In-Game Server Browser)
1. In the main menu, click **MULTIPLAYER**.
2. Browse the live sector list:
   - **Development**: The official persistent sector hosted over Ngrok. Shows live `[ONLINE]`, online player count (e.g. `0/32 Players`), and real-time ping latency.
   - **Local Sector**: Connects directly to `localhost:7777` for local LAN testing.
   - **Custom Sector Gateway**: Enter or paste any custom IP / tunnel URL.
3. Click the **[REFRESH PING]** button at any time to re-probe server statuses.
4. Select your desired sector, enter your **Explorer Call-Sign**, and click **CONNECT TO SECTOR**!

### Multiplayer Features & Controls
- **Live Server Browser**: Shows online/offline status, live connected player counts, and ping latency before connecting.
- **F11 — Player List & Teleportation**: View all active explorers in your sector with ping and coordinates. Click **[TELEPORT]** to warp safely within 10 blocks facing that player!
- **Enter — In-Game Chat**: Press `Enter` to open chat, type your transmission, and hit `Enter` to broadcast to the sector. Press `Esc` to cancel.
- **Synchronized Player Models**: See other explorers in real-time with full 3D biped astronaut meshes, custom skin suits, head pitch, and movement animations.
- **World & Block Sync**: Block placements, mining, and chunk edits are synchronized across all connected players with delta updates.

---

## 🎮 Controls

### Movement
| Key | Action |
|-----|--------|
| `W A S D` | Move forward / left / backward / right |
| `Space` | Jump / Swim up |
| `Space` (double-tap) | Toggle fly mode (Creative / Flight) |
| `Space` (hold, while flying) | Ascend |
| `Left Shift` | Sprint / Descend while flying / Dive in water |
| `Left Ctrl` | Crouch |

### World Interaction
| Key / Button | Action |
|---|---|
| `Left Click` | Mine / break block |
| `Right Click` | Place block / use item |
| `Q` | Drop active item |
| `B` | Cycle block scale (1×, 2×, 3×, 4×) |
| `1` – `9` | Select hotbar slot |
| `Mouse Scroll` | Scroll hotbar |

### UI & Systems
| Key | Action |
|-----|--------|
| `E` | Open / close Inventory |
| `X` | Open Xenoscanner (NPC & world info) |
| `F11` | Open Multiplayer Player Roster & Teleport menu |
| `Enter` | Open Multiplayer Chat |
| `F3` | Toggle Debug overlay |
| `Esc` | Pause menu / cancel / back |
| `Tab` | Cycle camera modes (First-person / Third-person) |

---

## 🛠️ Crafting Book, Doors & Outpost Housing

WeCrafter v1.3 introduces a complete blueprint fabrication catalog, working pneumatic airlocks, fire, lighting, and interactive housing furniture!

### 📖 Fabrication Recipe Book (Keys: `E` or Right-Click Workbench)
- **Interactive Recipe Catalog**: Switch effortlessly between the classic **[2x2 MATRIX]** and the **[RECIPE BOOK]** tab in your inventory console.
- **Category Filtering**: Filter blueprints by `ALL`, `BUILD`, `TOOLS`, `FURNI`, `SURV`, and `TECH`.
- **Material Inspection**: Click any recipe to view required ingredients color-coded in real time (bright green when available in inventory, soft red when missing).
- **Quantity Controls**: Adjust crafting quantity with `[-]`, `[+]`, or `[MAX]`, and click **[FABRICATE]** to automatically deduct ingredients and craft items directly!
- **[LOAD 2x2] Helper**: Instantly places the recipe's ingredients directly into the 2x2 crafting grid for manual tinkering.

### 🚪 Working Pneumatic Airlocks & Doors
- **2-Block Height Synchronization**: Placing a door automatically establishes both upper and lower halves. Breaking either half cleanly breaks the entire door and drops the door item.
- **Dynamic Collision States**: Closed doors block players and hostile entities (`Solid`). Right-click either half to open: both halves swing open 90 degrees with pass-through collision (`Passable`), allowing seamless walking through outposts.

### 🔥 Campfires, Cooking & Ambient Lighting
- **Campfire Cooking**: Right-click a burning campfire with raw alien meat or raw fish filets to sizzle and cook hearty steaks and crispy filets (+Food and +Health).
- **Plasma Torches & Lumen Lamps**: Emissive phosphor illumination blocks that shine brightly through the alien night and illuminate subterranean caverns.

### 🪑 Outpost Furniture & Cryo-Pods
- **Ergonomic Chairs**: Right-click to rest and recover stamina and health.
- **Reinforced Tables**: Modular interior decoration surfaces for bases.
- **Cryo-Bed Respawn Sync**: Right-click any Cryo-Bed station to calibrate your emergency locator. If you perish or fall into the void, life support automatically recovers you safely back to your Cryo-Bed!
- **Engineering Workbench**: Right-click on a placed workbench in the world to open the full Crafting Recipe Book on demand.

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

- **Guaranteed Safe Surface Spawns**: You will always spawn safely on dry land under the open sky — never trapped inside solid blocks or underground.
- **Fluid & Ocean Realism**: Transparent water surfaces (~72% opacity) with real-time wave shimmer and seamless chunk boundary rendering.

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

- Save slots accessible from the main menu and in-game pause menu
- Preserves world seed, all placed/mined blocks, inventory, coordinates, and RPG stats
- Multi-backend architecture supports local disk slots and central server replication

---

## 📋 System Requirements

| | Minimum |
|---|---|
| **OS** | Windows 10/11 64-bit |
| **GPU** | OpenGL 3.3 compatible (integrated graphics OK) |
| **RAM** | 4 GB |
| **Storage** | 15 MB |
| **CPU** | Any dual-core 2 GHz+ |

---

## 📁 Folder Structure (Portable Bundle)

```
WeCrafter-v1.2-portable/
├── WeCrafter.exe          ← Double-click to play!
├── WeCrafterServer.exe    ← Headless dedicated server
├── start_server.cmd       ← 1-Click host server + Cloudflare Tunnel
├── scripts/
│   └── launch_server.ps1  ← Server launcher automation
├── assets/
│   ├── textures/          ← Block & entity textures
│   ├── shaders/           ← GLSL rendering shaders
│   └── ui/                ← Fonts & HUD elements
└── README.md
```

> ⚠️ Keep the `assets/` directory alongside `WeCrafter.exe`.

---

## 🙏 Credits

- **Created by Kynlo**
- UI & Sprites: [Kenney.nl](https://kenney.nl) (CC0)
- Font: *Kenney Future* (CC0)

---

*WeCrafter — Development Build*
