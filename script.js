//----------------------------------------------------------------------
// Global variables
//----------------------------------------------------------------------
var sourceWords = [
	"?", "CHECK", "GOOD", "MISSED", "A", "N", "I", "IN", "T", "O", "ON", "TO", "NOT", 
	"ION", "E", "ONE", "S", "IS", "R", "OR", "ARE", "ORES", "H", "THE", "THIS", "D", 
	"AND", "DEAD", "DROID", "HONDO", "TRADES", "DETONATOR", "L", "ALL", "OIL", "SOLD",
	"SALES", "DETAIL", "SLASHED", "U", "OUT", "RUST", "OUTER", "RETURN", "C", "CODE", 
	"COCA-COLA",
	"SCORE", "SCENE", "CAUTION", "COURSES", "CORUSCANT", "M", "RIM", "MOM", "MOST", 
	"MASS", "SOME", "CRIME", "MURDER", "CONSUME", "MAINTENANCE", "F", "OF", "FOR", 
	"OFF", "SAFE", "FLUID", "THEFT", "INFLATE", "LIFEFORMS", "Y", "ONLY", "DAILY", 
	"MEMORY", "W", "WITH", "WATER", "SWITCH", "WANTED", "REWARD", "SOMEWHERE", "G", 
	"GUYS", "LAUGH", "DANGER", "GUIDES", "WARNING", "CHANGES", "FLEEING", "CLONING", 
	"GENERAL", "LANGUAGE", "FLUSHING", "TRAINING", "DESIGNATOR", "RESTRAINING", "P", 
	"PULL", "STOP", "PERSON", "POLICE", "REPAIR", "PRICES", "SUPPLY", "PLEASE",
	"REPAIR", "SPEEDER", "CORRUPT", "PLANNING", "POSITION", "SPACEWARD", "POLISHING", 
	"APPOINTMENT", "APPLICATION", "B", "ABOUT", "BOLT", "B", "BY", "BASIC", "BLASTER", 
	"V", "HAVE", "ALIVE", "SAVAGE", "REMOVAL", "SERVICE", "SALVAGE", "PRIVATE", 
	"VIOLENCE", "SURVIVAL", "AVAILABLE", "MOTIVATOR", "OVERHAULS", "X", "TOXIC", 
	"EXTORTION", "EXPEDITION", "K", "ASK", "LUCK", "DRINK", "LUCKY", "WEEKLY", 
	"KIDNAPPING", "Q", "J", "JUNK", "JEDI", "Z", "SPECIALIZED", "&"
];

var wordPiles = [ [], [], [], [], [] ];

var currentPileIndex = 4;
var currentWordIndex = -1;
var loopToPile = 4;

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
	// Try to draw from the given pile; if we can't, then try the next pile down.
	// If we get to pile 0 and it's empty, then pull 5 more words from the source
	// words (if any are left).
	if (pileIndex < 0) pileIndex = wordPiles.length - 1;
	while (wordPiles[pileIndex].length == 0) {
		pileIndex--;
		if (pileIndex < 0) pileIndex = wordPiles.length - 1;
		if (pileIndex == 0 && wordPiles[0].length == 0) {
			// refill pile 0 from the source words!
			for (i=0; i<5 && sourceWords.length > 0; i++) {
				wordPiles[0].push(sourceWords.splice(0, 1)[0]);
			}
		}
	}
	currentPileIndex = pileIndex;
	currentWordIndex = 0;	// (draw from top)
	return wordPiles[currentPileIndex][currentWordIndex];
}

function showWord() {
	currentPileIndex -= 1;
	if (currentPileIndex < 0) {
		currentPileIndex = loopToPile;
		loopToPile -= 1;
		if (loopToPile < 0) loopToPile = wordPiles.length - 1;
		console.log("looped to " + currentPileIndex + "; next loop is to " + loopToPile);
	}
    document.getElementById('word').innerHTML = drawWord(currentPileIndex);
    document.getElementById('word').style.fontFamily = 'Aurebesh';
    document.getElementById('check-btn').style.display = 'block'; // Show Check button
    document.getElementById('missed-btn').style.display = 'none'; // Hide Missed button
    document.getElementById('good-btn').style.display = 'none'; // Hide Good button
    updatePileNumbers();
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

function showAbout() {
    document.getElementById('about').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function hideAbout() {
    document.getElementById('about').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function showHelp() {
    document.getElementById('help').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function hideHelp() {
    document.getElementById('help').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
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
document.getElementById('about-btn').addEventListener('click', showAbout);
document.getElementById('help-btn').addEventListener('click', showHelp);
document.getElementById('close-about').addEventListener('click', hideAbout);
document.getElementById('close-help').addEventListener('click', hideHelp);

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
