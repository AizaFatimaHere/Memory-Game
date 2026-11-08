const deck = document.querySelector('.cards');
const message = document.querySelector('#message');
const restart = document.querySelector('#restart');
let firstCard = null;
let secondCard = null;
let locked = false;
let matched = 0;

function shuffleCards() {
  const cards = [...deck.children];
  cards.sort(() => Math.random() - 0.5);
  cards.forEach(card => {
    card.classList.remove('flip', 'matched');
    deck.appendChild(card);
  });
  firstCard = secondCard = null;
  locked = false;
  matched = 0;
  message.textContent = 'Find all eight pairs.';
}

function resetTurn() {
  firstCard = secondCard = null;
  locked = false;
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

  if (firstCard.dataset.card === secondCard.dataset.card) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matched += 2;
    resetTurn();
    if (matched === deck.children.length) {
      message.textContent = 'You won! Starting a new game...';
      setTimeout(shuffleCards, 1200);
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetTurn();
    }, 900);
  }
}

deck.querySelectorAll('.card').forEach(card => card.addEventListener('click', flipCard));
restart.addEventListener('click', shuffleCards);
shuffleCards();