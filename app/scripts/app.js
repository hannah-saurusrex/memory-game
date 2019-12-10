// cards array holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card];

//deck of all cards in the game
const deck = document.getElementById("card-deck");

//declaring move variables
let moves = 0;
let counter = document.querySelector(".moves");

// declare variable for stars icon
const stars = document.querySelectorAll(".fa-star");

// declare variable of matched cards
let matchedCard = document.getElementsByClassName("match");

// stars list
let starsList = document.querySelectorAll(".stars li");

// close icon in congtarulations modal
let closeIcon = document.querySelector(".close");

//declare modal
let modal = document.getElementById("popup1");

//array for opened cards
var openedCards = [];

// shuffle all cards on the board
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

// shuffles cards when page is refreshed/loads
document.body.onload = startGame();

// function to start a new play, and clear all appropriate settings
function startGame(){

    // empty the openedcards array
    openedCards = [];

    // shuffle all the cards in the deck so their position on the board changes
    cards = shuffle(cards);

    // remove all existing classes from each card
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }

    // reset game moves
    moves = 0;
    counter.innerHTML = moves;
    // reset star rating to 3
    for (var i = 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    // reset timer to 0
    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}


// toggles open and show class to display cards
var displayCard = function() {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
}

//add opened cards to OpenedCards list and check if cards are a match or not
function cardOpen(){
    openedCards.push(this);
    var len = openedCards.length;
    if (len === 2){
        moveCounter(); // once two cards are clicked open, start the move counter function
        if(openedCards[0].type === openedCards[1].type){
            matched(); // if opened card 0 type and opened card 1 type are the same, run the matched function
        } else {
            unmatched(); // otherwise, run the unmatched function
        }
    }
};

// what to do when cards match
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}

// what to do when cards don't match
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
        openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
        enable();
        openedCards = [];
    }, 1100)
}

// disable all other cards temporarily
function disable(){
    cards.forEach(function(card){
        card.classList.add("disabled");
    });
}

// enable all cards and disable any matched cards
function enable(){
    cards.forEach(function(card){
        card.classList.remove("disabled");
        for (var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}

// count player's moves
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first tile click
    if(moves == 1){
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
    // set a star rating based on number of moves
    if (moves > 10 && moves < 14){
        for (i = 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 15){
        for (i = 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

// game timer
var second = 0; minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    }, 1000);
}

// congratulations when all cards match, show modal and moves, time and star rating
function congratulations(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");

        // declare star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        // show moves, rating and time in the modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        // close icon on modal
        closeModal();
    };
}

// close icon on modal
function closeModal(){
    closeIcon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}

// for user to play again
function playAgain(){
    modal.classList.remove("show");
    startGame();
}

//loop to add event listener to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click", congratulations);
};