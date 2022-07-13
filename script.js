const gameContainer = document.getElementById("game");

let cards = [];

let flippedCard = null;

let flipping = false;

class Card {
  constructor(color, flipped, index) {
    this.color = color;
    this.flipped = flipped;
    this.index = index;
  }
}

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  let count = 0; // used to set index of each card
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);


    // give newDiv a dataset.index and color to identify it later
    newDiv.dataset.index = count;
    newDiv.dataset.color = color;

    cards.push(color); // add the color to the list to identify it later
    count++;

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if (!flipping) { // do the following only when the flipping animation is not playing
    if (flippedCard == null) { // case 1: no card is flipped
      flippedCard = event.target;
      event.target.style.backgroundColor = event.target.dataset.color;
    } else { // case 2: one card is already flipped
      if (event.target.dataset.index != flippedCard.dataset.index) { // only do things if card is not already flipped
        event.target.style.backgroundColor = event.target.dataset.color;
        event.target.removeEventListener('click', handleCardClick);
        flippedCard.removeEventListener('click', handleCardClick);
        if (event.target.dataset.color != flippedCard.dataset.color) { // if color does not match
          flipping = true;
          setTimeout(function () {
            event.target.addEventListener('click', handleCardClick);
            flippedCard.addEventListener('click', handleCardClick);
            event.target.style.backgroundColor = 'white';
            flippedCard.style.backgroundColor = 'white';
            flipping = false;
            flippedCard = null;
          }, 1000)
        } else {
          flippedCard = null;
        }


      }
    }
  }





  console.log("you just clicked", event.target);
}

// when the DOM loads
createDivsForColors(shuffledColors);

/* */