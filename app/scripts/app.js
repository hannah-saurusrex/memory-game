// cards array holds all of our card options
let card = document.getElementsByClassName("card");
let cards = [...card];
// loop through the cards array and add an evey listener that will display the card on click
for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', displayCard);
};

var displayCard = function () { // above we are running the display card function on click.
    // here we created the displayCard function to toggle a class list on when the click event is activated.
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
}