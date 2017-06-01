
document.getElementById('instructions').innerHTML = 'Press ESC key to begin/restart!';

var hangmanWords = ['motorcycle', 'parkway', 'bootcamp', 'algorithms', 'pizza', 'methods'];

var word = '';
var wrongChar = [];
var rightChar = [];
var rightCharIndex = [];
var triesLeft = 0;
var playing = false;

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
    if (currentWord.indexOf(currentLetter) > -1) {
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
        updateAttempts();
    }
}

function updateAttempts() {
    triesLeft--;
}

function printGuessed (arrayIn) {
    var stringResult = '';
    for (var i=0; i<arrayIn.length; i++) {
        stringResult += arrayIn[i];
        stringResult += ' ';
    }
    return stringResult;
}

function printWord (wordIndex, currentWord) {
    var stringResult = '';
    for (var i=0; i<currentWord.length; i++) {
        if (wordIndex.indexOf(i) > -1) {
            stringResult += currentWord.charAt(i);
        } else {
            stringResult += '-';
        }
    }
    return stringResult;
}

document.onkeyup = function(event) {
    keyPressed = event.key.toLowerCase();

    if (keyPressed == 'escape') {
        reset();
        alert('Game Reset!');
    } else {
        if (!playing) {
            return;
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

    document.getElementById('keystroke').innerHTML = 'Key pressed: ' + keyPressed;
    //document.getElementById('word').innerHTML = 'Word is: ' + word;
    document.getElementById('attemptsRemaining').innerHTML = 'Attempts Remaining: ' + triesLeft;
    document.getElementById('correctGuessed').innerHTML = 'Correct: ' + printGuessed(rightChar);
    //document.getElementById('correctIndex').innerHTML = 'Index: ' + printGuessed(rightCharIndex);
    document.getElementById('wrongGuessed').innerHTML = 'Wrong: ' + printGuessed(wrongChar);
    document.getElementById('wordProgress').innerHTML = 'Progress: ' + printWord(rightCharIndex, word);
    if (rightCharIndex.length === word.length) {
        document.getElementById('message').innerHTML = 'You Win!';
        playing = false;
        return;
    }
    if (triesLeft === 0) {
        document.getElementById('message').innerHTML = 'You Lose! Answer: "' + word + '"';
        playing = false;
        return;
    } else {
        document.getElementById('message').innerHTML = 'Press letter keys to continue guesing!';
    }
}
