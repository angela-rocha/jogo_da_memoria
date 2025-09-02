const gameBoard = document.getElementById('gameBoard');
const attemptsElement = document.getElementById('attempts');

const emojis = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🍑', '🥝'];
let cards = [...emojis, ...emojis]; // Duplicar os emojis
let firstCard, secondCard;
let lockBoard = false;
let attempts = 0;

// Embaralhar cartas
cards.sort(() => 0.5 - Math.random());

// Criar as cartas no tabuleiro
cards.forEach(emoji => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="front">${emoji}</div>
    <div class="back"></div>
  `;
  card.addEventListener('click', flipCard);
  gameBoard.appendChild(card);
});

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  attempts++;
  attemptsElement.textContent = attempts;

  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.innerHTML === secondCard.innerHTML;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}
