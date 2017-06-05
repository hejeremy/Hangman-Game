
document.getElementById('instructions').innerHTML = 'Press any key to get started!';

var hangmanWords = ['blender', 'oven', 'stove', 'refrigerator', 'microwave', 'table', 'utensils', 'dishwasher', 'sink'];

var word = '';
var wrongChar = [];
var rightChar = [];
var rightCharIndex = [];
var triesLeft = 0;
var playing = false;
var wins = 0;
var manual = false;
document.getElementById('manualToggle').innerHTML = 'Auto';

function reset() {
    word = hangmanWords[Math.floor(Math.random()*hangmanWords.length)];
    wrongChar = [];
    rightChar = [];
    rightCharIndex = [];
    triesLeft = 10;
    playing = true;
}

function isLetter(charIn) {
    var value = (charIn == charIn.match(/[a-z]/i));
    return value;
}

function checkChar(currentLetter, currentWord, wrongList, rightList, rightListIndex) {
    var sound = '';
    if (currentWord.indexOf(currentLetter) > -1) {
        sound = document.getElementById("audioRight");
        sound.play();
        for (var i=0; i<currentWord.length; i++) {
            if (currentLetter === currentWord.charAt(i)) {
                if (rightList.indexOf(currentLetter) > -1) {
                    rightListIndex.push(i);
                } else {
                    rightList.push(currentLetter);
                    rightListIndex.push(i);
                }
            }
        }
    } else {
        wrongList.push(currentLetter);
        sound = document.getElementById("audioWrong");
        sound.play();
        updateAttempts();
    }
}

function updateAttempts() {
    triesLeft--;
}

function printGuessed (arrayIn) {
    var stringResult = '';
    for (var i=0; i<arrayIn.length; i++) {
        stringResult += arrayIn[i].toUpperCase();
        stringResult += ' ';
    }
    return stringResult;
}

function printWord (wordIndex, currentWord) {
    var stringResult = '';
    for (var i=0; i<currentWord.length; i++) {
        if (wordIndex.indexOf(i) > -1) {
            stringResult += currentWord.charAt(i).toUpperCase() + ' ';
        } else {
            stringResult += '_ ';
        }
    }
    return stringResult;
}

//document.onkeyup = function(event) {
//keyPressed = event.key.toLowerCase();
function keyPressHandler(inputEvent) {
    keyPressed = inputEvent;

    if (keyPressed == 'escape') {
        reset();
        //alert('Game Reset!');
    } else {
        if (!playing) {
            if (manual) {
                alert('Most key inputs are locked when playing on manuel. Press ESC to start or click to toggle the manual/auto button.');
                return;
            } else {
                reset();
            }
        } else {
            if (rightChar.indexOf(keyPressed) > -1 || wrongChar.indexOf(keyPressed) > -1) {
                alert('You have already guessed that letter!');
            } else {
                if (isLetter(keyPressed)) {
                    checkChar(keyPressed, word, wrongChar, rightChar, rightCharIndex);
                } else {
                    alert("'" + keyPressed + "' is not a valid guess!");
                }
                //checkChar(keyPressed, word, wrongChar, rightChar, rightCharIndex);
            }
        }
    }

    //document.getElementById('keystroke').innerHTML = 'Key pressed: ' + keyPressed;
    //document.getElementById('word').innerHTML = 'Word is: ' + word;
    document.getElementById('attemptsRemaining').innerHTML = 'Attempts Remaining: ' + triesLeft;
    document.getElementById('correctGuessed').innerHTML = 'Correct: ' + printGuessed(rightChar);
    //document.getElementById('correctIndex').innerHTML = 'Index: ' + printGuessed(rightCharIndex);
    document.getElementById('wrongGuessed').innerHTML = 'Misses: ' + printGuessed(wrongChar);
    document.getElementById('wordProgress').innerHTML = 'Progress: ' + printWord(rightCharIndex, word);
    document.getElementById('wins').innerHTML = 'Wins: ' + wins;
    if (rightCharIndex.length === word.length) {
        document.getElementById('message').innerHTML = 'You Win!';
        wins++;
        document.getElementById('wins').innerHTML = 'Wins: ' + wins;
        document.getElementById("audioWin").play();
        playing = false;
        return;
    }
    if (triesLeft === 0) {
        document.getElementById('message').innerHTML = 'You Lose! Answer: "' + word + '"';
        playing = false;
        document.getElementById("audioLose").play();
        return;
    } else {
        document.getElementById('message').innerHTML = 'Press letter keys to continue guesing!';
    }
}

function manualToggle() {
    if (manual) {
        document.getElementById('manualToggle').innerHTML = 'Auto';
        manual = false;
    } else {
        document.getElementById('manualToggle').innerHTML = 'Manual';
        manual = true;
    }
}

document.onkeyup = function(event) {
    keyInput = event.key.toLowerCase();
    keyPressHandler(keyInput);
}
