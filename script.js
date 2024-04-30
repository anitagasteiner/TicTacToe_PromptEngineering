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
            table += `<td>${symbol}</td>`;
        }
        table += '</tr>';
    }

    table += '</table>';
    content.innerHTML = table;
}