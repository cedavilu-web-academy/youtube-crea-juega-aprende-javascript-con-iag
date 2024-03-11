document.addEventListener('DOMContentLoaded', function () {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const memoryBoard = document.getElementById('memory-board');
    const messageElement = document.getElementById('message');
    let selectedCards = [];
    let matchedPairs = 0;

    // Duplica las letras para tener pares
    const cardValues = [...letters, ...letters];

    // Baraja las cartas
    const shuffledCards = shuffleArray(cardValues);

    // Crea las cartas en el tablero
    createMemoryBoard();

    // Agrega event listener al tablero
    memoryBoard.addEventListener('click', flipCard);

    function createMemoryBoard() {
        shuffledCards.forEach(value => {
            const card = document.createElement('div');
            card.className = 'memory-card hidden';
            card.textContent = value;
            memoryBoard.appendChild(card);
        });
    }

    function flipCard(event) {
        const clickedCard = event.target;
        if (!clickedCard.classList.contains('hidden') || selectedCards.length === 2) {
            return;
        }

        clickedCard.classList.remove('hidden');
        selectedCards.push(clickedCard);

        if (selectedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }

    function checkMatch() {
        const [card1, card2] = selectedCards;
        const value1 = card1.textContent;
        const value2 = card2.textContent;

        if (value1 === value2) {
            matchedPairs++;
            if (matchedPairs === letters.length) {
                messageElement.textContent = '¡Felicidades! Has encontrado todas las letras del abecedario.';
            } else {
                messageElement.textContent = '¡Coincidencia! Sigue buscando.';
            }
            selectedCards = [];
        } else {
            setTimeout(() => {
                card1.classList.add('hidden');
                card2.classList.add('hidden');
                selectedCards = [];
                messageElement.textContent = '';
            }, 800);
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});
