let fields = [
    null, // Feld 0
    null, // Feld 1
    null, // 2
    null, // 3
    null, // 4
    null, // 5
    null, // 6
    null, // 7
    null, // 8
];

let currentPlayer = 'cross';

let winningCombos = [
    [0, 1, 2], // erste Reihe
    [3, 4, 5], // zweite Reihe
    [6, 7, 8], // dritte Reihe
    [0, 3, 6], // erste Spalte
    [1, 4, 7], // zweite Spalte
    [2, 5, 8], // dritte Spalte
    [0, 4, 8], // diagonal von links oben nach rechts unten
    [2, 4, 6]  // diagonal von rechts oben nach links unten
];

let isThereAWinner = [];