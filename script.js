const deck = document.querySelector('.cards');
const message = document.querySelector('#message');
const movesLabel = document.querySelector('#moves');
const restart = document.querySelector('#restart');
let firstCard = null;
let secondCard = null;
let locked = false;
let matched = 0;
let moves = 0;

function resetTurn() {
  firstCard = secondCard = null;
  locked = false;
}

function shuffleCards() {
  const cards = [...deck.children];
  cards.sort(() => Math.random() - 0.5);
  cards.forEach(card => {
    card.classList.remove('flip', 'matched');
    deck.appendChild(card);
  });
  matched = moves = 0;
  movesLabel.textContent = 'Moves: 0';
  message.textContent = 'Find all eight pairs.';
  resetTurn();
}

function flipCard() {
  if (locked || this === firstCard || this.classList.contains('matched')) return;
  this.classList.add('flip');
  if (!firstCard) {
    firstCard = this;
    return;
  }
  secondCard = this;
  locked = true;
  moves++;
  movesLabel.textContent = `Moves: ${moves}`;

  if (firstCard.dataset.card === secondCard.dataset.card) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matched += 2;
    resetTurn();
    if (matched === deck.children.length) message.textContent = `You won in ${moves} moves!`;
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetTurn();
    }, 850);
  }
}

deck.querySelectorAll('.card').forEach(card => card.addEventListener('click', flipCard));
restart.addEventListener('click', shuffleCards);
shuffleCards();