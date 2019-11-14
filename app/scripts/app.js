import { DH_NOT_SUITABLE_GENERATOR, ALPN_ENABLED } from "constants";

// requirement #1 -- shuffle the cards

// cards holds all of our card options
let card = document.getElementsByClassName("card");
let cards = [...card];
// loop through the cards and add an evey listener that will display the card on click
for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', displayCard);
};

var displayCard = function () { // above we are running the display card function on click.
    // here we created the displayCard function to toggle a class list on when the click event is activated.
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled"); // this class is saying that when a card is shown, if it's clicked again, nothing will happen. 
    //it's 'disabled'.
};

// use the fisher-yates shuffle so that all cards are shuffled on page load, or restart
function shuffle(cards) {
    var currentIndex = cards.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex =- 1;

        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = cards[temporaryValue];
    }
    return cards;
}
// this will shuffle the cards, but will not change the position of the cards on the game board

// we need to loop through the shuffled array and display each card deck
const deck = document.querySelector(".deck");
function startGame() {
    var shuffledCards = shuffle(cards);
    for (var i = 0; i < shuffledCards.length; i++) {
        [].forEach.call(shuffledCards, function(item) {
            deck.appendChild(item);
        });
    }
}

window.onload = startGame(); // when the window is reloaded, run the startGame() function;

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
}