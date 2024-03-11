document.addEventListener('DOMContentLoaded', function () {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const letterContainer = document.getElementById('letter-container');
    const selectedLetterDropdown = document.getElementById('selected-letter');
    const startBtn = document.getElementById('start-btn');
    const resultMessage = document.getElementById('result');
    let shuffledLetters = [];

    // Llenar el dropdown con las letras
    letters.split('').forEach(letter => {
        const option = document.createElement('option');
        option.value = letter;
        option.text = letter;
        selectedLetterDropdown.add(option);
    });

    startBtn.addEventListener('click', startGame);

    function startGame() {
        resultMessage.textContent = '';
        const selectedLetter = selectedLetterDropdown.value;
        shuffledLetters = shuffleArray([...letters]);
        renderLetters(selectedLetter);
    }

    function renderLetters(selectedLetter) {
        letterContainer.innerHTML = '';
        shuffledLetters.forEach(letter => {
            const letterElement = document.createElement('div');
            letterElement.className = 'letter';
            letterElement.textContent = letter;
            letterElement.addEventListener('click', () => checkLetter(letter, selectedLetter));
            letterContainer.appendChild(letterElement);
        });
    }

    function checkLetter(clickedLetter, selectedLetter) {
        if (clickedLetter === selectedLetter) {
            resultMessage.textContent = `¡Correcto! Has encontrado la letra ${selectedLetter}.`;
        } else {
            resultMessage.textContent = `Incorrecto. La letra correcta era ${selectedLetter}. Inténtalo de nuevo.`;
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
