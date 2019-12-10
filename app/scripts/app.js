// cards array holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card];

//deck of all cards in the game
const deck = document.getElementById("card-deck");

//declaring move variables
let moves = 0;
let counter = document.querySelector(".moves");

//array for opened cards
var openedCards = [];


// toggles open and show class to display cards
var displayCard = function() {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
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

//loop to add event listener to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
}