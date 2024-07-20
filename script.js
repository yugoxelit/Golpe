const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player1 = {
    x: 50, y: 200, width: 50, height: 50, color: 'blue', dx: 0, dy: 0, health: 100,
    attack: false
};
const player2 = {
    x: 700, y: 200, width: 50, height: 50, color: 'red', dx: 0, dy: 0, health: 100,
    attack: false
};

let gameOver = false;

function drawPlayer(player) {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    if (player.attack) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(player.x + player.width / 2, player.y - 10, 10, 10);
    }
}

function update() {
    if (gameOver) return;

    player1.x += player1.dx;
    player1.y += player1.dy;
    player2.x += player2.dx;
    player2.y += player2.dy;

    // Lógica para evitar que los jugadores salgan del canvas
    player1.x = Math.max(0, Math.min(canvas.width - player1.width, player1.x));
    player1.y = Math.max(0, Math.min(canvas.height - player1.height, player1.y));
    player2.x = Math.max(0, Math.min(canvas.width - player2.width, player2.x));
    player2.y = Math.max(0, Math.min(canvas.height - player2.height, player2.y));

    // Chequear colisiones (sólo un ejemplo simple)
    if (player1.attack && player1.x + player1.width > player2.x && player1.x < player2.x + player2.width &&
        player1.y + player1.height > player2.y && player1.y < player2.y + player2.height) {
        player2.health -= 1;
        player1.attack = false;
    }
    if (player2.attack && player2.x + player2.width > player1.x && player2.x < player1.x + player1.width &&
        player2.y + player2.height > player1.y && player2.y < player1.y + player1.height) {
        player1.health -= 1;
        player2.attack = false;
    }

    // Verificar si el juego ha terminado
    if (player1.health <= 0 || player2.health <= 0) {
        gameOver = true;
    }
}

function drawHealthBars() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(10, 10, 200, 20);
    ctx.fillRect(canvas.width - 210, 10, 200, 20);

    ctx.fillStyle = '#ff0000';
    ctx.fillRect(10, 10, player1.health * 2, 20);
    ctx.fillRect(canvas.width - 210, 10, player2.health * 2, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawHealthBars();
    drawPlayer(player1);
    drawPlayer(player2);

    // Mostrar mensaje de Game Over
    if (gameOver) {
        ctx.fillStyle = 'black';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
    }
}

document.addEventListener('keydown', (e) => {
    if (gameOver) return;
    
    switch (e.key) {
        case 'a': player1.dx = -5; break;
        case 'd': player1.dx = 5; break;
        case 'w': player1.dy = -5; break;
        case 's': player1.dy = 5; break;
        case 'ArrowLeft': player2.dx = -5; break;
        case 'ArrowRight': player2.dx = 5; break;
        case 'ArrowUp': player2.dy = -5; break;
        case 'ArrowDown': player2.dy = 5; break;
        case ' ': player1.attack = true; break;  // Espacio para atacar
        case 'Enter': player2.attack = true; break;  // Enter para atacar
    }
});

document.addEventListener('keyup', (e) => {
    if (gameOver) return;
    
    switch (e.key) {
        case 'a':
        case 'd': player1.dx = 0; break;
        case 'w':
        case 's': player1.dy = 0; break;
        case 'ArrowLeft':
        case 'ArrowRight': player2.dx = 0; break;
        case 'ArrowUp':
        case 'ArrowDown': player2.dy = 0; break;
        case ' ': player1.attack = false; break;
        case 'Enter': player2.attack = false; break;
    }
});

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
