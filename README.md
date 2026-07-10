# 🎮 Brain Task Diver - Underwater Puzzle Game

A thrilling underwater diving game where you navigate through the ocean depths, collect treasures, avoid dangerous creatures, and unlock speed boosts with friendly dolphins!

## 🌊 Game Features

### Core Gameplay
- **Constant Rightward Movement**: Your diver automatically swims to the right
- **Control the Ascent**: Hold SPACE or click/tap the screen to swim upward
- **Dynamic Depth System**: Dive deeper to reach new ocean zones and unlock rare creatures
- **Progressive Difficulty**: New challenges and creatures appear as you descend

### Ocean Environment
The game features **4 distinct depth zones**, each with unique color schemes and creatures:

| Depth | Zone | Color Scheme | Creatures |
|-------|------|--------------|-----------|
| 0-99m | Shallow Waters | Bright Blue-Green | Fish, Jellyfish |
| 100-199m | Twilight Zone | Deep Blue | Octopus, Eel, Shark |
| 200-299m | Midnight Zone | Very Dark Blue | Shark, Anglerfish, Squid |
| 300m+ | Abyssal Zone | Nearly Black | Anglerfish, Squid, Whale |

### Sea Creatures

#### Friendly Creatures (Collectible - No Collision Damage)
- 🐠 **Fish** (Yellow) - +10 points
- 🪼 **Jellyfish** (Pink) - +10 points
- 🐙 **Octopus** (Purple) - +10 points
- 🦑 **Squid** (Red) - +10 points
- 🐳 **Whale** (Blue) - +10 points

#### Special Creature
- 🐬 **Dolphin** (Cyan) - +100 points + **2x Speed Boost for 10 seconds!**

#### Dangerous Creatures (Game Over)
- 🦈 **Shark** (Gray) - DEADLY
- 🐍 **Eel** (Green) - DEADLY
- 🪶 **Anglerfish** (Indigo) - DEADLY

### Speed Boost System
When you collide with a **Dolphin**:
- Gain 100 bonus points
- Activate 2x speed multiplier
- Boost lasts for 10 seconds
- Speed boost indicator shows countdown timer

### Scoring System
- **Collecting Fish/Jellyfish/Other Friendly Creatures**: +10 points each
- **Collecting Dolphins**: +100 points + 2x speed boost
- **Reaching Deeper Zones**: Depth rewards accumulate as you dive

### Collision Detection
- **Safe Collisions**: Friendly creatures disappear and award points
- **Dangerous Collisions**: Sharks, Eels, and Anglerfish end the game
- **Boundary Collisions**: Going out of bounds (top/bottom) ends the game

## 🎮 How to Play

### Controls
- **SPACE Key** or **Click/Tap**: Hold to swim UP
- **Release**: Diver sinks downward (gravity effect)
- **Automatic**: Diver continuously moves RIGHT

### Game Objective
1. **Navigate** through the underwater obstacles
2. **Collect** friendly creatures for points
3. **Hunt Dolphins** for massive score boosts and speed multipliers
4. **Avoid** dangerous creatures (Sharks, Eels, Anglerfish)
5. **Dive Deeper** to unlock new zones and creatures
6. **Score Points** by collecting creatures and reaching milestones

## 📊 Game Interface

### Scoreboard (Top of Screen)
- **Depth**: Current depth in meters
- **Score**: Total points accumulated
- **Speed Boost**: Current boost status (OFF or countdown timer)

### Depth Indicator (Right Side)
- Visual bar showing your current depth level
- Green bar indicates your position

### Game Over Screen
- Final depth reached
- Final score achieved
- Play Again button to restart

## 🎨 Visual Design

- **Ocean Gradient Backgrounds**: Each zone has a unique color palette
- **Glowing Effects**: All creatures and player have glow effects for visibility
- **Particle Effects**: Ambient bubbles represent ocean depth
- **Smooth Animations**: Fluid movement and creature animations
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Technical Details

- **Built with**: HTML5, CSS3, JavaScript
- **Canvas Rendering**: Custom 2D graphics for all elements
- **Collision Detection**: Distance-based circular collision system
- **Frame Rate**: 60 FPS gameplay
- **Responsive**: Automatically adjusts to screen size

## 📁 Files

- `index.html` - Main game HTML structure
- `styles.css` - Game styling and animations
- `game.js` - Core game logic and mechanics

## 🚀 How to Run

1. Clone or download the repository
2. Open `index.html` in a modern web browser
3. Start playing!

No additional dependencies or installations required.

## 💡 Tips & Strategies

- **Rhythm Tapping**: Practice smooth control for consistent upward movement
- **Dolphin Hunting**: When speed boosted, use the extra momentum to catch more creatures
- **Depth Zones**: Each new zone introduces faster and more dangerous creatures
- **Balanced Play**: Balance between collecting points and avoiding dangers
- **Horizontal Navigation**: Use the rightward movement to position yourself to avoid threats

## 🎯 Future Enhancements

Potential features for future versions:
- Power-ups (shields, slow-motion)
- Multiplayer leaderboards
- Special boss creatures
- Underwater treasures
- Sound effects and music
- Difficulty levels
- Achievements system

## 📝 License

Free to use and modify

---

**Ready to dive into the abyss? Start the game and see how deep you can go!** 🌊🐬
