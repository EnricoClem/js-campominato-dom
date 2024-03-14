// L’utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.

console.log('Campominato.');

// Collegare con il bottone start
const startGame = document.getElementById('start-button');
// Collegare il livello di difficoltà

// Ascoltare azione di click su bottone start
startGame.addEventListener('click', function () {
    console.log('Inizio gioco!');

    const gridElement = document.querySelector('.grid');

    let rowSize = 0;
    let inputDifficultyElement = document.getElementById('difficulty').value;

    if (inputDifficultyElement === "hard") {
        rowSize = 10;
    } else if (inputDifficultyElement === "mid") {
        rowSize = 9;
    } else if (inputDifficultyElement === "easy") {
        rowSize = 7;
    }

    console.log('Difficoltà selezionata:', inputDifficultyElement);

    const numberOfCells = rowSize ** 2;

    // Generare tante celle all'interno della griglia quante ne richiede il livello di difficoltà selezionato

    gridElement.innerHTML = '';
 
    for (let i = 0; i < numberOfCells; i++) {
        const num = 1+ i;

        let cellElement = document.createElement('div');

        if (inputDifficultyElement === "hard") {
            cellElement.classList.add ('cell-10');
        } else if (inputDifficultyElement === "mid") {
            cellElement.className = "cell-9";
        } else if (inputDifficultyElement === "easy") {
            cellElement.className = "cell-7";
        }
        
        cellElement.innerHTML = num;

        gridElement.append(cellElement);

        // Permettere di cambiare colore alle celle al click
        cellElement.addEventListener('click', function () {
            console.log('Hai selezionato la casella numero', num);

            cellElement.classList.toggle('selected');
        })

    }

});