// L’utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.

// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
// In seguito l’utente clicca su una cella:
// se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso.
// Altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
// Attenzione che l’utente potrebbe cliccare due volte sulla stessa casella…


console.log('Campominato.');

// Collegare elementi DOM
const startGame = document.getElementById('start-button');
const pointsDisplay = document.getElementById('points');
let gameOver = document.getElementsByClassName('game-over-hidden')[0];
let gameGrid = document.getElementById('grid-wrapper');

// Creare un array punteggio vuoto
let pointsCounter = [];

// Ascoltare azione di click su bottone start
startGame.addEventListener('click', function () {
    console.log('Inizio gioco!');

    // Regole di reset per far ripartire il gioco
    pointsCounter.length = 0;
    gameGrid.classList.remove('endgame');
    gameOver.classList.remove('game-over');

    const gridElement = document.querySelector('.grid');

    let rowSize = 0;

    // Collegare il livello di difficoltà
    let inputDifficultyElement = document.getElementById('difficulty').value;

    if (inputDifficultyElement === "easy") {
        rowSize = 10;
    } else if (inputDifficultyElement === "mid") {
        rowSize = 9;
    } else if (inputDifficultyElement === "hard") {
        rowSize = 7;
    }

    console.log('Difficoltà selezionata:', inputDifficultyElement);

    const numberOfCells = rowSize ** 2;

    gridElement.innerHTML = '';

            // Generare 16 numeri casuali all'interno del range di difficoltà che corrisponderanno alle celle bomba
            let bombs = [];
            for (let n = 0; n < 16; ){
                let randomNumber = Math.floor(Math.random() * numberOfCells);
                if (!bombs.includes(randomNumber)) {
                    bombs = bombs.concat(randomNumber);
                    n++
                }
            }
            console.log(bombs)
    
    // Generare tante celle all'interno della griglia quante ne richiede il livello di difficoltà selezionato
 
    for (let i = 0; i < numberOfCells; i++) {
        const num = 1+ i;

        let cellElement = document.createElement('div');

        if (inputDifficultyElement === "easy") {
            cellElement.className = 'cell cell-10';
        } else if (inputDifficultyElement === "mid") {
            cellElement.className = "cell cell-9";
        } else if (inputDifficultyElement === "hard") {
            cellElement.className = "cell cell-7";
        }

        // Segnare sulla cella il numero corrispondente
        cellElement.innerHTML = num;

        gridElement.append(cellElement);

        // Permettere di cambiare colore alle celle al click
        cellElement.addEventListener('click', function () {
            console.log('Hai selezionato la casella numero', num);

            // Applicare la classe bomb alla cella corrispondente al numero dell'array apposito
            if (bombs.includes(i)) {
                cellElement.classList.add('bomb');
                cellElement.innerHTML = 'BOOM';
                gameOver.classList.add('game-over');

                // Raccogliere i numeri corrispondenti delle celle clicckate senza accettare ripetizioni all'interno dell'array punteggio
                gameGrid.classList.add('endgame');
                
                // Selezionare tutte le celle
                let allCell = document.querySelectorAll("[class^='cell']");

                // Rendere visibili tutte le celle bomba
                for (let y=0; y< numberOfCells; y++){
                    let intToCheck = parseInt(allCell[y].innerHTML)-1;
                    if (bombs.includes(intToCheck)) {
                        allCell[y].classList.add('bomb');
                    }
                }
            // Applicare un punto se la cella non era una bomba    
            } else if (!pointsCounter.includes(i)) {
                pointsCounter = pointsCounter.concat(i);
            };

            // Mettere l'elemento dom del puntoggio con riferimento al valore "punteggio"
            pointsDisplay.innerHTML = `<h3>Il tuo punteggio: ${pointsCounter.length}</h3>`;


            cellElement.classList.add ('selected');

        })
    }
});