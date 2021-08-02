let randomNumber = Math.floor(Math.random() * 100 ) + 1;

const resultParas = document.querySelector('.resultParas');
let guesses =  document.querySelector('.guesses');
let lastResult = document.querySelector('.lastResult');
let lowOrHi = document.querySelector('.lowOrHi');
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');
let guessCount = 1;
let resetButton;
let surrender = document.querySelector('.surrender')
const answer = document.querySelector('.answer');
let numberOfRestChallenges = document.querySelector('.numberOfRestChallenges')
let description = document.querySelector('.description')



numberOfChallenges = 10
numberOfRestChallenges.textContent ='残りの挑戦回数: ' + numberOfChallenges;


function checkGuess() {
        
    let userGuess = Number(guessField.value);
    // if (guessCount === 1) {
    //     guesses.textContent = '前回の予想: ';
    // }

    guesses.textContent += userGuess + '点 ';

    if (userGuess === randomNumber) {
        lowOrHi.textContent = '';
        finishGame();
    }else if (guessCount === 10) {
        lastResult.textContent = '!!!ゲームオーバー!!!';
        setGameOver();
    } else {
        lastResult.textContent = '間違いです！';
        if (userGuess < randomNumber) {
            lowOrHi.textContent='今の予想は小さすぎです！';
        }else if (userGuess > randomNumber) {
            lowOrHi.textContent='今の予想は大きすぎです！';
        }
    }


guessCount++;
guessField.value=' ';
guessField.focus();

countGuess();
}


guessSubmit.addEventListener('click', checkGuess);


function finishGame() {
    
    lastResult.textContent = '正解!俺の国語の点数は' + randomNumber + 'でしたー！よくわかったね！'
    guessField.disabled = true;
    guessSubmit.disabled = true;
    surrender.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = '新しいゲームを始める';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}

function setGameOver() {
    finishGame();
    lastResult.textContent='残念！たかしの点数は' + randomNumber + '点でした～！'
    
}


surrender.addEventListener('click', setGameOver)




function resetGame() {
    guessCount = 1;

    const resetParas = document.querySelector('.resultParas p');
    for (let i = 0 ; i < resetParas.length ; i++) {
        resetParas[i].textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);


    //前回の予想を削除
    guesses.remove();
    guesses = document.createElement('p');
    resultParas.insertBefore(guesses, lastResult);
    guesses.classList.add('guesses');
    guesses.textContent = '前回の予想: '

    //前回のアドバイスを削除
    lowOrHi.remove();
    lowOrHi = document.createElement('p');
    resultParas.appendChild(lowOrHi);
    lowOrHi.classList.add('lowOrHi');


    //前回の答えを削除
    lastResult.remove();
    lastResult = document.createElement('p');
    resultParas.insertBefore(lastResult, lowOrHi);
    lastResult.classList.add('lastResult');

    //前回の試行回数を削除
    numberOfRestChallenges.remove();
    numberOfRestChallenges = document.createElement('p');
    description.appendChild(numberOfRestChallenges);
    numberOfRestChallenges.classList.add('numberOfRestChallenges');
    numberOfChallenges = 10
    numberOfRestChallenges.textContent ='残りの挑戦回数: ' + numberOfChallenges;

    guessField.disabled = false;
    guessSubmit.disabled = false;
    surrender.disabled = false;
    guessField.value = '';
    guessField.focus();


    randomNumber = Math.floor(Math.random() * 100) + 1;
}

//試行回数を表示
function countGuess() {
    numberOfChallenges =10 - (guessCount-1);
    numberOfRestChallenges.textContent ='残りの挑戦回数: ' + numberOfChallenges;
}