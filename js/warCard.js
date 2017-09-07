// DOM Elements
var suits = ["spades", "hearts", "clubs", "diams"];
var cardFace = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var cards = [];
var players = [[], []];
var firstRun = true;
var gameover = false;
var timer;
var r = 0;
var round = 1;
var fightButton = document.getElementById("btnBattle");
var fightButton10 = document.getElementById("btnBattle10");
var fightButton50 = document.getElementById("btnBattle50");
var newGameButton = document.getElementById("newGame");
var p1 = document.querySelector("#player1 .hand");
var p2 = document.querySelector("#player2 .hand");
var s1 = document.querySelector("#player1 .score");
var s2 = document.querySelector("#player2 .score");

// event listeners

fightButton.addEventListener("click", function () {
    rounds(1);
});
fightButton10.addEventListener("click", function () {
    rounds(10);
});
fightButton50.addEventListener("click", function () {
    rounds(50);
});
newGameButton.addEventListener("click", setNewGame);

// functions

function setNewGame() {
    cards = [];
    players = [[], []];
    firstRun = true;
    gameover = false;
    timer;
    r = 0;
    round = 1;
    outputMessage("Click Fight to Start Game");
    p1.innerHTML = "";
    p2.innerHTML = "";
    s1.innerHTML = "";
    s2.innerHTML = "";
}

function rounds(a) {
    window.clearInterval(timer);
    r = a;
    timer = setInterval(function () {
        battle();
    }, 100);
}

function battle() {
    if (timer) {
        r--;
        outputMessage("Rounds left " + r);
        if (r < 1) {
            window.clearInterval(timer);
        }
    }
    if (firstRun) {
        firstRun = false;
        buildCards();
        shuffleArray(cards);
        dealCards(cards);
    }
    attack();
}

function attack() {
    if (!gameover) {
        var card1 = players[0].shift();
        var card2 = players[1].shift();
        var pot = [card1, card2];
        p1.innerHTML = showCard(card1, 0);
        p2.innerHTML = showCard(card2, 0);
        checkWinner(card1, card2, pot);
        s1.innerHTML = players[0].length;
        s2.innerHTML = players[1].length;
        round++;
    } else {
        outputMessage('Round ' + round + ': Game Over');
    }
}

function outputMessage(message) {
    document.getElementById("message").innerHTML = message;
}

function checkWinner(card1, card2, pot) {
    if ((players[0].length <= 4) || (players[1].length <= 4)) {
        if (players[0].length <= 4) {
            players[1] = players[1].concat(pot);
        } else {
            players[0] = players[0].concat(pot);
        }
        gameover = true;
        return;
    }
    if (card1.cardValue > card2.cardValue) {
        outputMessage('Round ' + round + ': Player 1 wins');
        players[0] = players[0].concat(pot);
    } else if (card1.cardValue < card2.cardValue) {
        outputMessage('Round ' + round + ': Player 2 wins');
        players[1] = players[1].concat(pot);
    } else {
        battlemode(pot);
        outputMessage('Round ' + round + ': Battle Mode');
    }
}

function battlemode(pot) {
    var card1, card2;
    var pos = (pot.length / 2);
    if ((players[0].length < 4) || (players[1].length < 4)) {
        return;
    } else {
        for (var i = 0; i < 4; i++) {
            card1 = players[0].shift();
            pot = pot.concat(card1);
            p1.innerHTML += showCard(card1, (pos + i), i);
        }
        for (var i = 0; i < 4; i++) {
            card2 = players[1].shift();
            pot = pot.concat(card2);
            p2.innerHTML += showCard(card2, (pos + i), i);
        }
        checkWinner(card1, card2, pot);
    }
}

function showCard(c, p, i) {
    var move = p * 40;
    if (i == 0 || i == 1 || i == 2) {
        var bCard = '<div class="icard blank" style="left:' + move + 'px">';        
    } else {
        var bCard = '<div class="icard ' + c.suit + ' " style="left:' + move + 'px">';
        bCard += '<div class="cardTop suit">' + c.num + '<br></div>';
        bCard += '<div class="cardMid suit"></div>';
        bCard += '<div class="cardBottom suit">' + c.num + '<br></div></div>';
    }
    return bCard;
}

function buildCards() {
    cards = [];
    for (s in suits) {
        var suitNew = suits[s][0].toUpperCase();
        for (n in cardFace) {
            var card = {
                suit: suits[s],
                num: cardFace[n],
                cardValue: parseInt(n) + 2,
                icon: suitNew
            };
            cards.push(card);
        }
    }
}

function dealCards(array) {
    for (var i = 0; i < array.length; i++) {
        var m = i % 2;
        players[m].push(array[i]);
    }
}

function shuffleArray(array) {
    for (var x = array.length - 1; x > 0; x--) {
        var ii = Math.floor(Math.random() * (x + 1));
        var temp = array[x];
        array[x] = array[ii];
        array[ii] = temp;
    }
    return array;
}