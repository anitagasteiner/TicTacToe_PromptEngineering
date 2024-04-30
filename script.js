function init() {
    render();
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
            table += `<td onclick="handleClick(${index})">${symbol}</td>`;
        }
        table += '</tr>';
    }

    table += '</table>';
    content.innerHTML = table;
}

function handleClick(index) {
    if (!fields[index]) {
        fields[index] = currentPlayer;
        let symbol = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG(); // ternärer Operator; Kurzschreibweise für ein if-Statement
        document.getElementsByTagName('td')[index].innerHTML = symbol;
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
        document.getElementsByTagName('td')[index].onclick = null;
    }
}