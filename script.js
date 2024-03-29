//----------------------------------------------------------------------
// Global variables
//----------------------------------------------------------------------
var wordPiles = [
    ["OF", "THE", "JEDI", "RETURN"], // Pile 1: Initial words
    [], // Pile 2: Empty initially
    [], // Pile 3: Empty initially
    [], // Pile 4: Empty initially
    []  // Pile 5: Empty initially
];

var currentPileIndex = 0;
var currentWordIndex = -1;

//----------------------------------------------------------------------
// Functions
//----------------------------------------------------------------------
function updatePileNumbers() {
	for (i=0; i<wordPiles.length; i++) {
		document.getElementById('pile-' + (i+1)).innerHTML = wordPiles[i].length;
	}
}

function moveToNextPile(wordIndex, fromPileIndex) {
    let nextPile = fromPileIndex + 1;
    if (nextPile >= wordPiles.length) nextPile--;
	let word = wordPiles[fromPileIndex].splice(wordIndex, 1)[0]; // Remove the word from the current pile
	wordPiles[nextPile].push(word); // Add the word to the next pile
    updatePileNumbers();
}

function moveToFirstPile(wordIndex, fromPileIndex) {
    let word = wordPiles[fromPileIndex].splice(wordIndex, 1)[0]; // Remove the word from the current pile
    wordPiles[0].push(word); // Add the word back to the first pile
    updatePileNumbers();
}

function drawWord(pileIndex) {
	if (pileIndex < 0) pileIndex++;
	while (wordPiles[pileIndex].length == 0) {
		pileIndex++;
	}
	currentPileIndex = pileIndex;
	currentWordIndex = 0;	// (draw from top)
	return wordPiles[currentPileIndex][currentWordIndex];
}

function showWord() {
    document.getElementById('word').innerHTML = drawWord(currentPileIndex);
    document.getElementById('word').style.fontFamily = 'Aurebesh';
    document.getElementById('check-btn').style.display = 'block'; // Show Check button
    document.getElementById('missed-btn').style.display = 'none'; // Hide Missed button
    document.getElementById('good-btn').style.display = 'none'; // Hide Good button
}

function check() {
    document.getElementById('word').style.fontFamily = 'sans-serif';
    document.getElementById('check-btn').style.display = 'none'; // Hide Check button
    document.getElementById('missed-btn').style.display = 'inline-block'; // Show Missed button
    document.getElementById('good-btn').style.display = 'inline-block'; // Show Good button
}

function handleMissed() {
	moveToFirstPile(currentWordIndex, currentPileIndex);
	showWord();
}

function handleGood() {
	moveToNextPile(currentWordIndex, currentPileIndex);
	showWord();
}

function setup() {
	updatePileNumbers();
	showWord();
}

//----------------------------------------------------------------------
// Event listeners
//----------------------------------------------------------------------
document.getElementById('check-btn').addEventListener('click', check);
document.getElementById('missed-btn').addEventListener('click', handleMissed);
document.getElementById('good-btn').addEventListener('click', handleGood);

document.getElementById('about-btn').addEventListener('click', function() {
    alert('About this app: [Your explanation here]');
});

document.getElementById('help-btn').addEventListener('click', function() {
    alert('Cheat Sheet: [Your cheat sheet here]');
});


//----------------------------------------------------------------------
// Main program
//----------------------------------------------------------------------
setup();
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
