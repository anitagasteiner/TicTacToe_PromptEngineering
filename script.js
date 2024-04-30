function init() {
    render();
    showPlayers();
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
    highlightCurrentPlayer(currentPlayerCross, currentPlayerCircle);
}

function highlightCurrentPlayer(currentPlayerCross, currentPlayerCircle) {
    if (currentPlayer === 'cross') {
        currentPlayerCross.classList.add('highlighted');
        currentPlayerCircle.classList.remove('highlighted');
    } else {
        currentPlayerCross.classList.remove('highlighted');
        currentPlayerCircle.classList.add('highlighted');
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
    showPlayers();
}