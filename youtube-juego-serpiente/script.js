document.addEventListener('DOMContentLoaded', function () {
    const gameBoard = document.getElementById('game-board');
    const scoreValue = document.getElementById('score-value');
    const gridSize = 20;
    const cellSize = 20;
    const snakeSpeed = 150; // milisegundos
    let snake = [{ x: 10, y: 10 }];
    let food = {};
    let direction = 'right';
    let score = 0;
    let gameInterval;

    // Inicializa el juego
    function initializeGame() {
        createGameBoard();
        createSnake();
        createFood();
        startGame();
    }

    // Crea el tablero de juego
    function createGameBoard() {
        gameBoard.innerHTML = '';
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const cell = document.createElement('div');
                cell.className = 'game-cell';
                gameBoard.appendChild(cell);
            }
        }
    }

    // Crea la serpiente en el tablero
    function createSnake() {
        snake.forEach(segment => {
            const snakeCell = getCell(segment.x, segment.y);
            snakeCell.classList.add('snake');
        });
    }

    // Crea la comida en el tablero
    function createFood() {
        const emptyCells = getEmptyCells();
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        food = emptyCells[randomIndex];
        const foodCell = getCell(food.x, food.y);
        foodCell.classList.add('food');
    }

    // Obtiene la celda en las coordenadas dadas
    function getCell(x, y) {
        return gameBoard.children[y * gridSize + x];
    }

    // Obtiene las celdas vacías en el tablero
    function getEmptyCells() {
        const emptyCells = [];
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                if (!isSnakeCell(col, row)) {
                    emptyCells.push({ x: col, y: row });
                }
            }
        }
        return emptyCells;
    }

    // Comienza el juego y establece el intervalo de movimiento de la serpiente
    function startGame() {
        gameInterval = setInterval(moveSnake, snakeSpeed);
        document.addEventListener('keydown', handleKeyPress);
    }

    // Maneja las teclas de flecha para cambiar la dirección de la serpiente
    function handleKeyPress(event) {
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
        }
    }

    // Mueve la serpiente en la dirección actual
    function moveSnake() {
        const head = { ...snake[0] };
        switch (direction) {
            case 'up':
                head.y--;
                break;
            case 'down':
                head.y++;
                break;
            case 'left':
                head.x--;
                break;
            case 'right':
                head.x++;
                break;
        }

        // Comprueba si la cabeza de la serpiente choca con las paredes o consigo misma
        if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize || isSnakeCell(head.x, head.y)) {
            endGame();
            return;
        }

        // Comprueba si la cabeza de la serpiente come la comida
        if (head.x === food.x && head.y === food.y) {
            score++;
            scoreValue.textContent = score;
            snake.unshift(head);
            const foodCell = getCell(food.x, food.y);
            foodCell.classList.remove('food');
            createFood();
        } else {
            // Mueve la serpiente y actualiza las clases de las celdas
            const tail = snake.pop();
            const tailCell = getCell(tail.x, tail.y);
            tailCell.classList.remove('snake');

            snake.unshift(head);
            const headCell = getCell(head.x, head.y);
            headCell.classList.add('snake');
        }
    }

    // Comprueba si una celda es parte de la serpiente
    function isSnakeCell(x, y) {
        return snake.some(segment => segment.x === x && segment.y === y);
    }

    // Finaliza el juego y muestra un mensaje
    function endGame() {
        clearInterval(gameInterval);
        document.removeEventListener('keydown', handleKeyPress);
        alert(`¡Juego terminado! Puntuación: ${score}`);
        resetGame();
    }

    // Reinicia el juego
    function resetGame() {
        snake = [{ x: 10, y: 10 }];
        score = 0;
        scoreValue.textContent = score;
        initializeGame();
    }

    // Inicializa el juego al cargar la página
    initializeGame();
});
