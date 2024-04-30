function init() {
    render();
    showPlayers();
    highlightCurrentPlayer();
}

function render() {
    let content = document.getElementById('content');
    let table = '<table>';

    for (let i = 0; i < 3; i++) {
        table += '<tr>';
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let symbol = fields[index] ? fields[index] : ''; // Der Ausdruck vor dem ? wird ausgewertet. Ist er true, wird der Wert zwischen dem ? und dem : als Wert für die Variable 'symbol' verwendet. Ist er false, wird der Wert nach dem : als Wert für die Variable 'symbol' verwendet, also ein leerer String.
            if (symbol === 'circle') {
                symbol = generateCircleSVG();
            } else if (symbol === 'cross') {
                symbol = generateCrossSVG();
            }
            table += `<td onclick="handleClick(${index})" class="hover">${symbol}</td>`;
        }
        table += '</tr>';
    }

    table += '</table>';
    content.innerHTML = table;
}

function showPlayers() {
    let currentPlayerCross = document.getElementById('currentPlayerCross');
    let currentPlayerCircle = document. getElementById('currentPlayerCircle');
    currentPlayerCross.innerHTML = '';
    currentPlayerCircle.innerHTML = '';
    currentPlayerCross.innerHTML = generateCrossSVG();
    currentPlayerCircle.innerHTML = generateCircleSVG();
}

function highlightCurrentPlayer() {
    let currentPlayerCross = document.getElementById('currentPlayerCross');
    let currentPlayerCircle = document. getElementById('currentPlayerCircle');
    if (isThereAWinner == '') {        
        if (currentPlayer === 'cross') {
            currentPlayerCross.classList.add('highlighted');
            currentPlayerCircle.classList.remove('highlighted');
        } else {
            currentPlayerCross.classList.remove('highlighted');
            currentPlayerCircle.classList.add('highlighted');
        }
    }
}

function highlightWinner(winner) {
    let currentPlayerCross = document.getElementById('currentPlayerCross');
    let currentPlayerCircle = document. getElementById('currentPlayerCircle');    
    if (winner === 'cross') {
        currentPlayerCross.classList.add('highlightedWinner');
        currentPlayerCircle.classList.remove('highlighted');
    } else {
        currentPlayerCircle.classList.add('highlightedWinner');
        currentPlayerCross.classList.remove('highlighted');
    }
}

function handleClick(index) {
    if (!fields[index]) {
        fields[index] = currentPlayer;
        let currentTd = document.getElementsByTagName('td')[index];
        let symbol = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG(); // ternärer Operator; Kurzschreibweise für ein if-Statement        
        currentTd.innerHTML = symbol;
        currentTd.onclick = null;
        currentTd.classList.remove('hover');
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';        
    }
    checkWinner();
}

function checkWinner() {
    // Durchlaufen aller Gewinnkombinationen
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        // Überprüfen, ob die Felder in der aktuellen Kombination alle vom selben Spieler belegt sind
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) { // Steht etwas in Feld "a" und steht in allen drei Feldern dasselbe?
            let winner = fields[a];
            highlightWinner(winner);
            isThereAWinner = 1;
            stopGame();
            let winningCells = [a, b, c];
            // for (let cellIndex of winningCells) {
            //     let cell = document.getElementsByTagName('td')[cellIndex];
            //     cell.style.background = 'rgba(236, 122, 8, 0.6)';
            // }
            drawWinningLine(winningCells);
            showRestartButton();
            break;
        }        
    }
    if (fields.every(field => field)) {
        let currentPlayerCross = document.getElementById('currentPlayerCross');
        let currentPlayerCircle = document. getElementById('currentPlayerCircle');
        currentPlayerCircle.classList.remove('highlighted');
        currentPlayerCross.classList.remove('highlighted');
        showRestartButton();
    } else {
        highlightCurrentPlayer();
    }        
}

function stopGame() {
    let allTd = document.getElementsByTagName('td');
    for (let i = 0; i < allTd.length; i++) {
        allTd[i].classList.remove('hover');
        allTd[i].onclick = null;
    }
}

function drawWinningLine(winningCells) {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("style", "position:absolute; top:0; left:0");

    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    let x1, y1, x2, y2;

    // Berechnung der Koordinaten der Linie basierend auf den Positionen der Gewinnsymbole
    for (let cellIndex of winningCells) {
        let cell = document.getElementsByTagName('td')[cellIndex];
        let rect = cell.getBoundingClientRect();
        if (!x1 && !y1) {
            x1 = rect.left + rect.width / 2;
            y1 = rect.top + rect.height / 2;
        } else {
            x2 = rect.left + rect.width / 2;
            y2 = rect.top + rect.height / 2;
        }
    }

    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "white");
    line.setAttribute("stroke-width", "5");

    svg.appendChild(line);
    document.getElementById('content').appendChild(svg);
}

function showRestartButton() {
    let restartButtonContainer = document.getElementById('restartButtonContainer');
    restartButtonContainer.innerHTML = '';
    restartButtonContainer.innerHTML = generateButtonHTML();
}

function restartGame() {
    // Zurücksetzen der Spielfelder
    fields = fields.map(() => null);
    // Zurücksetzen des aktuellen Spielers
    currentPlayer = 'cross';
    // Zurücksetzen des Siegerindikators
    isThereAWinner = [];
    init();
    // Entfernen der Winner-Markierung
    let currentPlayerCross = document.getElementById('currentPlayerCross');
    let currentPlayerCircle = document. getElementById('currentPlayerCircle');
    currentPlayerCircle.classList.remove('highlightedWinner');
    currentPlayerCross.classList.remove('highlightedWinner');
    // Entfernen des Neustart-Buttons
    let restartButtonContainer = document.getElementById('restartButtonContainer');
    restartButtonContainer.innerHTML = '';
}