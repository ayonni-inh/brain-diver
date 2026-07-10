const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth * 0.95;
canvas.height = window.innerHeight * 0.85;

// Game Variables
const game = {
    score: 0,
    depth: 0,
    gameOver: false,
    maxDepth: 0,
    speedBoostActive: false,
    speedBoostTimer: 0,
    speedBoostDuration: 10000, // 10 seconds in milliseconds
    currentEnvironment: 0
};

// Player object
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 30,
    height: 30,
    velocityY: 0,
    velocityX: 2,
    isSwimmingUp: false,
    color: '#00ff00'
};

// Environment zones (depth-based)
const environments = [
    { depth: 0, color: '#1e5f74', lightColor: '#3a9fb8', creatures: ['fish', 'jellyfish'] },
    { depth: 100, color: '#0d3d52', lightColor: '#1a6b7f', creatures: ['octopus', 'eel', 'shark'] },
    { depth: 200, color: '#051f2a', lightColor: '#0d4a5f', creatures: ['shark', 'anglerfish', 'squid'] },
    { depth: 300, color: '#001f3f', lightColor: '#0a3a6e', creatures: ['anglerfish', 'squid', 'whale'] }
];

// Input handling
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    if (e.key === ' ') e.preventDefault();
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Touch/Click handling for swim up
document.addEventListener('mousedown', () => {
    player.isSwimmingUp = true;
});

document.addEventListener('mouseup', () => {
    player.isSwimmingUp = false;
});

document.addEventListener('touchstart', () => {
    player.isSwimmingUp = true;
});

document.addEventListener('touchend', () => {
    player.isSwimmingUp = false;
});

// Sea creatures
class SeaCreature {
    constructor(type, x, y) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = this.getWidth();
        this.height = this.getHeight();
        this.velocityX = this.getVelocityX();
        this.velocityY = Math.random() * 2 - 1;
        this.color = this.getColor();
    }

    getWidth() {
        const widths = { fish: 25, jellyfish: 30, shark: 50, octopus: 40, eel: 35, anglerfish: 45, squid: 40, whale: 80, dolphin: 50 };
        return widths[this.type] || 25;
    }

    getHeight() {
        const heights = { fish: 15, jellyfish: 35, shark: 25, octopus: 35, eel: 15, anglerfish: 30, squid: 30, whale: 40, dolphin: 30 };
        return heights[this.type] || 15;
    }

    getVelocityX() {
        const velocities = { fish: 1.5, jellyfish: 0.5, shark: 3, octopus: 1, eel: 2, anglerfish: 1.5, squid: 2, whale: 0.8, dolphin: 3.5 };
        return velocities[this.type] || 1;
    }

    getColor() {
        const colors = {
            fish: '#FFD700',
            jellyfish: '#FF69B4',
            shark: '#666666',
            octopus: '#8B008B',
            eel: '#228B22',
            anglerfish: '#4B0082',
            squid: '#DC143C',
            whale: '#4B7BA7',
            dolphin: '#00BFFF'
        };
        return colors[this.type] || '#00ff00';
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;

        switch (this.type) {
            case 'fish':
                // Simple fish shape
                ctx.beginPath();
                ctx.ellipse(this.x, this.y, this.width / 2, this.height / 2, 0, 0, Math.PI * 2);
                ctx.fill();
                // Fish tail
                ctx.beginPath();
                ctx.moveTo(this.x - this.width / 2, this.y);
                ctx.lineTo(this.x - this.width, this.y - this.height / 2);
                ctx.lineTo(this.x - this.width, this.y + this.height / 2);
                ctx.fill();
                break;

            case 'shark':
                // Shark shape
                ctx.beginPath();
                ctx.moveTo(this.x, this.y - this.height / 2);
                ctx.lineTo(this.x + this.width / 2, this.y);
                ctx.lineTo(this.x, this.y + this.height / 2);
                ctx.lineTo(this.x - this.width / 2, this.y - this.height / 4);
                ctx.closePath();
                ctx.fill();
                // Shark eye
                ctx.fillStyle = '#FFFFFF';
                ctx.beginPath();
                ctx.arc(this.x + this.width / 4, this.y - this.height / 4, 3, 0, Math.PI * 2);
                ctx.fill();
                break;

            case 'dolphin':
                // Dolphin shape
                ctx.beginPath();
                ctx.ellipse(this.x, this.y, this.width / 2, this.height / 2, 0.2, 0, Math.PI * 2);
                ctx.fill();
                // Dolphin fin
                ctx.beginPath();
                ctx.moveTo(this.x, this.y - this.height / 2);
                ctx.lineTo(this.x - this.width / 6, this.y - this.height);
                ctx.lineTo(this.x + this.width / 6, this.y - this.height / 2);
                ctx.fill();
                break;

            case 'jellyfish':
                // Jellyfish bell
                ctx.beginPath();
                ctx.arc(this.x, this.y - this.height / 4, this.width / 2, 0, Math.PI * 2);
                ctx.fill();
                // Tentacles
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 2;
                for (let i = -2; i < 3; i++) {
                    ctx.beginPath();
                    ctx.moveTo(this.x + i * this.width / 6, this.y + this.height / 4);
                    ctx.quadraticCurveTo(this.x + i * this.width / 5, this.y + this.height / 2, this.x + i * this.width / 6, this.y + this.height);
                    ctx.stroke();
                }
                break;

            case 'octopus':
                // Octopus head
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.width / 3, 0, Math.PI * 2);
                ctx.fill();
                // Tentacles
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 3;
                for (let i = 0; i < 8; i++) {
                    const angle = (i / 8) * Math.PI * 2;
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y);
                    ctx.quadraticCurveTo(
                        this.x + Math.cos(angle) * this.width / 2,
                        this.y + Math.sin(angle) * this.width / 2,
                        this.x + Math.cos(angle) * this.width,
                        this.y + Math.sin(angle) * this.width
                    );
                    ctx.stroke();
                }
                break;

            case 'squid':
                // Squid body
                ctx.beginPath();
                ctx.ellipse(this.x, this.y - this.height / 4, this.width / 2, this.height / 2, 0, 0, Math.PI * 2);
                ctx.fill();
                // Squid tentacles
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 2;
                for (let i = 0; i < 6; i++) {
                    ctx.beginPath();
                    ctx.moveTo(this.x + (i - 2.5) * this.width / 8, this.y + this.height / 4);
                    ctx.lineTo(this.x + (i - 2.5) * this.width / 8, this.y + this.height);
                    ctx.stroke();
                }
                break;

            case 'anglerfish':
                // Anglerfish body
                ctx.beginPath();
                ctx.ellipse(this.x, this.y, this.width / 2, this.height / 2, 0, 0, Math.PI * 2);
                ctx.fill();
                // Lure
                ctx.fillStyle = '#FFD700';
                ctx.beginPath();
                ctx.arc(this.x - this.width / 2 - 10, this.y - this.height / 3, 5, 0, Math.PI * 2);
                ctx.fill();
                break;

            case 'eel':
                // Eel body
                ctx.beginPath();
                ctx.moveTo(this.x + this.width / 2, this.y);
                ctx.quadraticCurveTo(this.x, this.y - this.height / 2, this.x - this.width / 2, this.y);
                ctx.quadraticCurveTo(this.x, this.y + this.height / 2, this.x + this.width / 2, this.y);
                ctx.fill();
                break;

            case 'whale':
                // Whale body
                ctx.beginPath();
                ctx.ellipse(this.x, this.y, this.width / 2, this.height / 2, 0, 0, Math.PI * 2);
                ctx.fill();
                // Whale eye
                ctx.fillStyle = '#FFFFFF';
                ctx.beginPath();
                ctx.arc(this.x + this.width / 4, this.y - this.height / 3, 4, 0, Math.PI * 2);
                ctx.fill();
                break;

            default:
                ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        }

        ctx.shadowColor = 'transparent';
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Wrap around screen
        if (this.x > canvas.width + 50) this.x = -50;
        if (this.x < -50) this.x = canvas.width + 50;

        // Keep in reasonable vertical bounds
        if (this.y > canvas.height + 50) this.y = -50;
        if (this.y < -50) this.y = canvas.height + 50;
    }
}

// Game state
let creatures = [];
let spawnRate = 0;

function spawnCreatures() {
    spawnRate++;
    if (spawnRate > 30) {
        spawnRate = 0;
        const environment = environments[game.currentEnvironment];
        const creatureTypes = environment.creatures;
        const randomType = creatureTypes[Math.floor(Math.random() * creatureTypes.length)];
        
        // Occasionally spawn dolphins
        if (Math.random() > 0.85) {
            creatures.push(new SeaCreature('dolphin', Math.random() * canvas.width, Math.random() * canvas.height));
        } else {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            creatures.push(new SeaCreature(randomType, x, y));
        }
    }

    // Limit creature count
    if (creatures.length > 30) {
        creatures.shift();
    }
}

function drawPlayer() {
    // Draw diver with glow effect
    ctx.fillStyle = player.color;
    ctx.shadowColor = player.color;
    ctx.shadowBlur = 15;

    // Head
    ctx.beginPath();
    ctx.arc(player.x, player.y - 8, 8, 0, Math.PI * 2);
    ctx.fill();

    // Body
    ctx.fillRect(player.x - 10, player.y, 20, 15);

    // Fins
    ctx.beginPath();
    ctx.ellipse(player.x - 15, player.y + 10, 8, 4, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(player.x + 15, player.y + 10, 8, 4, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Bubble trail
    ctx.fillStyle = 'rgba(0, 255, 136, 0.3)';
    ctx.beginPath();
    ctx.arc(player.x + 5, player.y + 20, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowColor = 'transparent';
}

function drawEnvironment() {
    const env = environments[game.currentEnvironment];
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, env.lightColor);
    gradient.addColorStop(1, env.color);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add some depth particles/bubbles
    ctx.fillStyle = `rgba(0, 212, 255, ${0.1 + (game.currentEnvironment * 0.05)})`;
    for (let i = 0; i < 5; i++) {
        const bubbleX = (game.depth * 2 + i * 100) % canvas.width;
        const bubbleY = (game.depth + i * 50) % canvas.height;
        ctx.beginPath();
        ctx.arc(bubbleX, bubbleY, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

function updateEnvironment() {
    const newEnvironment = Math.floor(game.depth / 100);
    if (newEnvironment < environments.length && newEnvironment !== game.currentEnvironment) {
        game.currentEnvironment = newEnvironment;
    }
}

function checkCollisions() {
    for (let creature of creatures) {
        const distance = Math.hypot(
            player.x - creature.x,
            player.y - creature.y
        );

        if (distance < (player.width / 2 + creature.width / 2)) {
            if (creature.type === 'dolphin') {
                // Dolphin gives speed boost
                game.speedBoostActive = true;
                game.speedBoostTimer = game.speedBoostDuration;
                game.score += 100;
                creatures.splice(creatures.indexOf(creature), 1);
                document.getElementById('boost').textContent = '2x SPEED';
                document.getElementById('boost').style.color = '#ff00ff';
            } else if (creature.type === 'shark' || creature.type === 'anglerfish' || creature.type === 'eel') {
                // Dangerous creatures - game over
                game.gameOver = true;
                showGameOver();
            } else {
                // Regular creatures - gain points
                game.score += 10;
                creatures.splice(creatures.indexOf(creature), 1);
            }
        }
    }

    // Check if player went out of bounds vertically (hit top or bottom)
    if (player.y < 0 || player.y > canvas.height) {
        game.gameOver = true;
        showGameOver();
    }
}

function updateSpeedBoost() {
    if (game.speedBoostActive) {
        game.speedBoostTimer -= 16; // Approximate delta time
        
        if (game.speedBoostTimer <= 0) {
            game.speedBoostActive = false;
            document.getElementById('boost').textContent = 'OFF';
            document.getElementById('boost').style.color = '#00ff88';
        } else {
            const remainingSeconds = Math.ceil(game.speedBoostTimer / 1000);
            document.getElementById('boost').textContent = `2x (${remainingSeconds}s)`;
        }
    }
}

function update() {
    if (game.gameOver) return;

    // Handle input
    if (keys[' '] || player.isSwimmingUp) {
        player.velocityY = -3;
    } else {
        player.velocityY = 2; // Gravity
    }

    // Apply speed boost
    if (game.speedBoostActive) {
        player.velocityX = 4;
    } else {
        player.velocityX = 2;
    }

    // Update player position
    player.x += player.velocityX;
    player.y += player.velocityY;

    // Wrap around horizontally
    if (player.x > canvas.width) {
        player.x = 0;
        game.depth += 10; // Reward for moving right
    }
    if (player.x < 0) {
        player.x = canvas.width;
    }

    // Clamp vertical position
    player.y = Math.max(0, Math.min(canvas.height, player.y));

    // Update depth based on Y position
    game.depth = Math.max(game.depth, Math.floor((canvas.height - player.y) / 5));
    game.maxDepth = Math.max(game.maxDepth, game.depth);

    // Update creatures
    for (let creature of creatures) {
        creature.update();
    }

    // Spawn new creatures
    spawnCreatures();

    // Update environment
    updateEnvironment();

    // Check collisions
    checkCollisions();

    // Update speed boost
    updateSpeedBoost();

    // Update UI
    document.getElementById('depth').textContent = game.depth + 'm';
    document.getElementById('score').textContent = game.score;
}

function draw() {
    // Draw environment
    drawEnvironment();

    // Draw creatures
    for (let creature of creatures) {
        creature.draw();
    }

    // Draw player
    drawPlayer();

    // Draw depth indicator on side
    ctx.fillStyle = 'rgba(0, 212, 255, 0.3)';
    ctx.fillRect(canvas.width - 20, 0, 20, canvas.height);
    const depthIndicator = ((canvas.height - player.y) / canvas.height) * canvas.height;
    ctx.fillStyle = '#00ff88';
    ctx.fillRect(canvas.width - 20, canvas.height - depthIndicator, 20, depthIndicator);
}

function showGameOver() {
    document.getElementById('gameOverScreen').classList.remove('hidden');
    document.getElementById('finalDepth').textContent = game.maxDepth;
    document.getElementById('finalScore').textContent = game.score;
}

document.getElementById('restartBtn').addEventListener('click', () => {
    // Reset game
    game.score = 0;
    game.depth = 0;
    game.gameOver = false;
    game.maxDepth = 0;
    game.speedBoostActive = false;
    game.currentEnvironment = 0;
    creatures = [];
    
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;
    player.velocityY = 0;
    
    document.getElementById('gameOverScreen').classList.add('hidden');
    document.getElementById('boost').textContent = 'OFF';
    document.getElementById('boost').style.color = '#00ff88';
    
    gameLoop();
});

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth * 0.95;
    canvas.height = window.innerHeight * 0.85;
});

// Start game
gameLoop();
