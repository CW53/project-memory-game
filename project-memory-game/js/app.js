/*
 * Create a list that holds all of your cards
 */

var cards = ['fa fa-paper-plane-o', 'fa fa-diamond', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicylcle','fa fa-bomb'];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


             
// Shuffle function from http://stackoverflow.com/a/2450976 //

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
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 const cards = document.querySelectorAll('.card');
  console.log(cards);

for (card of cards){
  card.addEventListener('click', () =>{
    console.log("Card Time!");
  });
}

let toggledCards = [];

deck.addEventListener('click', event => {
  const clickTarget = event.target;
    clickTarget.classList.toggle('open');
    clickTarget.classList.toggle('show');
    addToggleCard(clickTarget);
    if (toggledCards.length === 2) {
      console.log("Two cards");
      if (isClickValid(clickTarget)) {
        if (clockOff) {
          startClock();
          clockOff = false;
        }
      }
    }
});

function addToggleCard(clickTarget) {
  toggledCards.push(clickTarget);
  console.log(toggledCards);
}

let matched = 0; //global scope

const TOTAL_PAIRS = 8;
if (matched === TOTAL_PAIRS) {
  gameOver();
}
    
function checkForMatch () {
  if (
  toggledCards[0].firstElementChild.className === 
  toggledCards[1].firstElementChild.className)
{
  toggledCards[0].classList.toggle("Match");
  toggledCards[1].classList.toggle("Match");
  toggledCards = [];
  matched++;

} else {
  console.log("No soup for you!");
  setTimeout(() => {
  toggleCard(toggledCards[0]);
  toggleCard(toggledCards[1]);
  toggledCards = [];
}, 1000);
}
function toggleCard(card) {
  card.classList.toggle('open');
  card.classList.toggle('show');
}
}
if (toggledCards.length === 2) {
  checkForMatch(clickTarget);
  addMove();
  checkScore();
}

function isClickValid(clickTarget) {
return (clickTarget.classList.contains('card') && 
      !clickTarget.classList.contains('match') &&
      toggledCards.length < 2 && 
      !toggledCards.includes(clickTarget));
}

//Deck Shuffle//

const deck = document.querySelector('.deck');

function shuffleDeck() {
  const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
  const shuffledCards = shuffle(cardsToShuffle);
  for (card of shuffledCards) {
    deck.appendChild(card);
  }
}
shuffleDeck();

//Money Moves//

let moves = 0;

function addMove() {
  moves++;
  const movesText = document.querySelector('.moves');
  movesText.innerHTML = moves;
}

//Lives (stars) remaining//

function checkScore() {
  if (moves === 16 || moves === 24)
{  removeStar(); 
    }
}

function hideStar() {
  const starList = document.querySelectorAll('.stars li');
  for (star of starList) {
    if (star.style.display !== 'none') {
      star.style.display = 'none';
      break;
    }
  }
}
hideStar();
hideStar();

//Clock//

function startClock() {
  clockId = setInterval(() => {
    time++;
    displayTime();
    console.log(time);
  }, 1000);
}
startClock();

let clockOff = true;
let time = 0;

//Show Time//

function displayTime() {
  const clock = document.querySelector('.clock');
  console.log(clock);
  clock.innerHTML = time;
}

const minutes = Math.floor(time / 60);
if (seconds < 10) {
  clock.innerHTML = ${miutes}:0${seconds} ;
} else {
  clock.innerHTML = ${minutes}:${seconds} ;
}

//Clock, stop //

let clockId;

function stopClock() {
  clearInterval(clockId);
}

//Modal Moves//

function toggleModal() {
  const modal = document.querySelector('.modal_background');
  modal.classList.toggle('hide');
}

toggleModal() //Open Seasame
toggleModal() //Close Seasame

//Modal Tests//

time = 121;
displayTime();
moves = 16;
checkScore();

writeModalStats(); //Write stats to modal
toggleModal(); //Open Seasame

function writeModalStats() {
  const timeStat = document.querySelector('.modal_time');
  const clockTime = document.querySelector('.clock').innerHTML;
  const movesStat = document.querySelector('.modal_moves');
  const starsStat = document.querySelector('.modal_stars');
  const stars = getStars();
  
  timeStat.innerHTML = Time = ${clockTime} ;
  movesStat.innerHTML = Moves = ${moves} ;
  starsStat.innerHTML = Stars = ${stars} ;
}

//GetStars//

function getStars() {
  stars = document.querySelectorAll('.stars li');
  starCount = 0;
  for (star of stars) {
    if (star.style.display !== 'none') {
      starCount++;
    }
  }
  console.log(starCount); //2
  return starCount;
}

//Modal buttons get Java//

document.querySelector('.modal_cancel').addEventListener('click', () => {
  toggleModal();
});

document.querySelector('.modal_replay').addEventListener('click', () => {
  //TODO: Call reset game HEREEEE
  console.log('replay');
});

//Game Over by Lil Flip//

function resetGame() {
  resetClockAndTime();
}
function resetClockAndTime() {
  stopClock();
  clockOff = true;
  time = 0;
  displayTime();
}

function resetMoves() {
  moves = 0;
  document.querySelector('.moves').innerHTML = moves;
}

function resetStars() {
  stars = 0;
  const starList = document.querySelectorAll('.stars li');
  for (star of starList) {
    star.style.display = 'inline';
  }
}

function gameOver() {
  stopClock();
  writeModalStats();
  toggleModal();
}

///Reset Functions//
function resetGame() {
  resetClockAndTime();
  resetMoves();
  resetStars();
  shuffleDeck();
}

document.querySelector('.restart').addEventListener('click', resetGame);
document.querySelector('.modal_replay').addEventListener('click', resetGame);

///Let's play again! ///

function replayGame() {
  resetGame();
  toggleModal();
}
document.querySelector('.modal_replay').addEventListener('click', replayGame);
