const cards = document.querySelectorAll('.card');
let firstCard = null;
let secondCard = null;
let locked = false;
let matched = 0;

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
    if (matched === cards.length) {
      document.querySelector('#message').textContent = 'You matched every pair!';
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetTurn();
    }, 900);
  }
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  locked = false;
}

cards.forEach(card => card.addEventListener('click', flipCard));