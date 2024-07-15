
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height / 2 - 25,
    width: 50,
    height: 50,
    color: 'white',
    speed: 5,
    dx: 0,
    dy: 0
};

const enemies = [];
for (let i = 0; i < 5; i++) {
    enemies.push({
        x: Math.random() * (canvas.width - 50),
        y: Math.random() * (canvas.height - 50),
        width: 50,
        height: 50,
        color: 'black'
    });
}

function drawPlayer() {
    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, player.width, player.height);
}

function drawEnemies() {
    enemies.forEach(enemy => {
        context.fillStyle = enemy.color;
        context.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function newPos() {
    player.x += player.dx;
    player.y += player.dy;

    // Boundary detection
    if (player.x < 0) player.x = 0;
    if (player.y < 0) player.y = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

function detectCollision() {
    enemies.forEach(enemy => {
        if (player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y) {
            console.log("Spieler hat einen Gegner getroffen!");
        }
    });
}

function update() {
    clearCanvas();
    drawPlayer();
    drawEnemies();
    newPos();
    detectCollision();

    requestAnimationFrame(update);
}

function moveRight() { player.dx = player.speed; }
function moveLeft() { player.dx = -player.speed; }
function moveUp() { player.dy = -player.speed; }
function moveDown() { player.dy = player.speed; }
function stopX() { player.dx = 0; }
function stopY() { player.dy = 0; }

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'd') moveRight();
    if (e.key === 'ArrowLeft' || e.key === 'a') moveLeft();
    if (e.key === 'ArrowUp' || e.key === 'w') moveUp();
    if (e.key === 'ArrowDown' || e.key === 's') moveDown();
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'd') stopX();
    if (e.key === 'ArrowLeft' || e.key === 'a') stopX();
    if (e.key === 'ArrowUp' || e.key === 'w') stopY();
    if (e.key === 'ArrowDown' || e.key === 's') stopY();
});

update();
