let card = document.getElementsByClassName("card");// requirement #1 -- shuffle the cards; cards holds all of our card options
let cards = [...card];

const deck = document.getElementById(".card-deck");

var displayCard = function () { // above we are running the display card function on click.
    // here we created the displayCard function to toggle a class list on when the click event is activated.
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled"); // this class is saying that when a card is shown, if it's clicked again, nothing will happen. 
    //it's 'disabled'.
};

// use the fisher-yates shuffle so that all cards are shuffled on page load, or restart
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex =- 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = array[temporaryValue];
    }

    return array;
}
// this will shuffle the cards, but will not change the position of the cards on the game board

document.body.onload = startGame(); // when the window is reloaded, run the startGame() function;

// we need to loop through the shuffled array and display each card deck
function startGame() {
    var shuffledCards = shuffle(cards);
    for (var i = 0; i < shuffledCards.length; i++) {
        [].forEach.call(shuffledCards, function(item) {
            deck.appendChild(item);
        });
    }

    //reset timer (from requirement #5);
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}



//requirement #2 -- handling matched & unmatched cards. we've made each card unique with the 'type' property in our html
// first, let's create a new array called openedCards that will hold the two selected cards and check if they are matched
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if (len === 2) {
        moveCounter();
        if (openedCards[0].type === openedCards[1].type) { // if the type of card 0 and the type of card 1 are the same, run the matched function
            matched();
        } else { // otherwise, run the unmatched function.
            unmatched();
        }
    }
}

// add and remove the appropriate classes to each card when matched
function matched() {
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    openedCards[0].classList.remove("open", "show");
    openedCards[1].classList.remove("open", "show");
    openedCards = [];
}

// for when cards don't match, remove and add appropriate classes
function unmatched() {
    openedCards[0].classList.add("unmatched"); // add the class name unmatched
    openedCards[1].classList.add("unmatched");
    disable(); // run the disable function when you have a match
    setTimeout(function() { // this function turns the cards over to hide them when time has run out - meaning you have to use your memory to remember where cards live!
        openedCards[0].classList.remove("open", "show", "unmatched");
        openedCards[1].classList.remove("open", "show", "unmatched");
        enable(); // when cards are unmatched, after the time runs out, all cards become enabled again, meaning the player can select two new cards to find a match
        openedCards = [];
    }, 1100); // this sets the time, meaning how long the unmatched cards appear before turning back over.
}

// disable all other cards temporarily
function disable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.add("disabled");
    });
}

function enable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.remove("disabled");
        for (var i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.remove("disabled");
        }
    });
}

// requirement #3 -- game should display the current number of moves a user has made.
// we will create a function to move the counter and only count moves when two cards are selected
function moveCounter() {
    moves++;
    counter.innerHTML = moves;
    // set timer (requirement 5) on first move
    if (moves == 1) {
        second == 0;
        minute == 0;
        hour == 0;
        startTimer();
    }

    // requirement #4 -- star rating. The game should display a star rating between 1 & 3 to reflect the player's performance
    // we can set the rating based on moves made, hence why we're in the moveCounter() function.
    if (moves > 10 && moves < 14) { 
        for (var i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = "collapse";
            }
        }
    } else if (moves > 15) {
        for (var i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

// requirement #5 -- game timer. The timer should start when a player makes a move, and stop when the player wins the game
var second = 0, minute = 0;
var timer = document.querySelector(".timer");
var interval;

function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}

// requirement #6 -- a restart button!

// requirement #7 -- a congratulations modal. modal should show how much time it took and star rating
// first, grab the modal box from the html
let modal = document.getElementById("popup1");
// grab the stars
let starsList = document.querySelectorAll(".stars li");
// grab the close icon
let closeIcon = document.querySelector(".close");
// when all cards have been matched, show the modal, the star rating, and time elapsed and close button
function congratulations() {
    if (matchedCard.length == 16) {
        clearInterval(interval);
        finalTime = timer.innerHTML;
        // show congrats modal
        modal.classList.add("show");
        // declare the star rating variable
        var starRating = document.querySelector(".stars").innerHTML;
        // show moves made, time and star rating
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("totalTime").innerHTML = finalTime;
        document.getElementById("starRating").innerHTML = finalTime;
        // close icon on modal
        closeModal();
        }
    }

// this is the function to close the modal on click event
function closeModal() {
    closeIcon.addEventListener('click', function(e) {
        modal.classList.remove("show");
        startGame();
    });
}

function playAgain() {
    modal.classList.remove("show");
    startGame();
}

// loop through the cards and add an event listener that will display the card on click
for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener('click', displayCard);
    card.addEventListener('click', cardOpen);
    card.addEventListener('click', congratulations);
};
