// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loading-screen').classList.add('hidden');
  }, 2500);
});

// ===== FLOATING HEARTS =====
function createFloatingHearts() {
  const container = document.getElementById('floating-hearts');
  const hearts = ['💖', '💕', '❤️', '💗', '🖤', '✨', '💛'];
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (8 + Math.random() * 12) + 's';
    heart.style.animationDelay = Math.random() * 10 + 's';
    heart.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
    container.appendChild(heart);
  }
}
createFloatingHearts();

// ===== NAV DOTS =====
const sections = document.querySelectorAll('section');
const navDots = document.getElementById('nav-dots');
sections.forEach((sec) => {
  const dot = document.createElement('a');
  dot.href = '#' + sec.id;
  dot.title = sec.id;
  navDots.appendChild(dot);
});

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + window.innerHeight / 2;
  document.querySelectorAll('.nav-dots a').forEach((dot, i) => {
    const sec = sections[i];
    if (sec.offsetTop <= scrollPos && sec.offsetTop + sec.offsetHeight > scrollPos) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });
revealElements.forEach((el) => revealObserver.observe(el));

// ===== MUSIC PLAYER (Nora Dean - Play Me A Love Song) =====
const musicBtn = document.getElementById('music-toggle');
const bgMusic = new Audio('background-music.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.4;
let isPlaying = false;

function playMusic() {
  bgMusic.play().then(() => {
    isPlaying = true;
    musicBtn.textContent = '🎶';
    musicBtn.classList.add('playing');
  }).catch(() => {});
}

function pauseMusic() {
  bgMusic.pause();
  isPlaying = false;
  musicBtn.textContent = '🎵';
  musicBtn.classList.remove('playing');
}

musicBtn.addEventListener('click', () => {
  if (!isPlaying) {
    playMusic();
  } else {
    pauseMusic();
  }
});

// Auto-start music on first interaction anywhere on the page
let musicStarted = false;
document.addEventListener('click', () => {
  if (!musicStarted) {
    musicStarted = true;
    playMusic();
  }
}, { once: true });

// ===== QUIZ =====
const quizData = [
  {
    q: "What's your favourite colour, Smiley?",
    options: ["Red", "Black", "Pink", "Gold"],
    answer: 1
  },
  {
    q: "What do you do when a system goes down at work?",
    options: ["Panic", "Fix it like a boss", "Blame someone", "Go for lunch"],
    answer: 1
  },
  {
    q: "Your dreads are best described as...?",
    options: ["Just hair", "A whole CROWN 👑", "Needs work", "Meh"],
    answer: 1
  },
  {
    q: "When the beat drops, Smiley will...?",
    options: ["Sit down", "Check her phone", "OWN the dance floor 💃", "Leave"],
    answer: 2
  },
  {
    q: "How many smiles has Smiley given today?",
    options: ["Zero", "A few", "Lost count — it's unlimited ✨", "Just one"],
    answer: 2
  },
  {
    q: "If Wanjiru was a song genre, she'd be...?",
    options: ["Country", "Heavy Metal", "Afrobeats & R&B 🔥", "Classical"],
    answer: 2
  },
  {
    q: "What does 'Smiley' mean to everyone around her?",
    options: ["Nothing much", "Pure good vibes & warmth 💖", "Annoyance", "Just a name"],
    answer: 1
  }
];

let quizIndex = 0, quizScore = 0, quizAnswered = false;

function startQuiz() {
  quizIndex = 0;
  quizScore = 0;
  document.getElementById('quiz-result').style.display = 'none';
  document.getElementById('quiz-options').style.display = 'flex';
  document.getElementById('quiz-question').style.display = 'block';
  document.getElementById('quiz-progress').style.display = 'flex';
  renderQuizProgress();
  renderQuizQuestion();
}

function renderQuizProgress() {
  const prog = document.getElementById('quiz-progress');
  prog.innerHTML = '';
  quizData.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i < quizIndex ? ' active' : '');
    prog.appendChild(dot);
  });
}

function renderQuizQuestion() {
  quizAnswered = false;
  const q = quizData[quizIndex];
  document.getElementById('quiz-question').textContent = q.q;
  const optionsEl = document.getElementById('quiz-options');
  optionsEl.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('div');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.addEventListener('click', () => handleQuizAnswer(i, btn));
    optionsEl.appendChild(btn);
  });
}

function handleQuizAnswer(selected, btn) {
  if (quizAnswered) return;
  quizAnswered = true;
  const q = quizData[quizIndex];
  const allOpts = document.querySelectorAll('.quiz-option');

  if (selected === q.answer) {
    btn.classList.add('correct');
    quizScore++;
  } else {
    btn.classList.add('wrong');
    allOpts[q.answer].classList.add('correct');
  }

  setTimeout(() => {
    quizIndex++;
    if (quizIndex < quizData.length) {
      renderQuizProgress();
      renderQuizQuestion();
    } else {
      showQuizResult();
    }
  }, 1200);
}

function showQuizResult() {
  document.getElementById('quiz-options').style.display = 'none';
  document.getElementById('quiz-question').style.display = 'none';
  document.getElementById('quiz-progress').style.display = 'none';
  const result = document.getElementById('quiz-result');
  result.style.display = 'block';
  document.getElementById('quiz-score').textContent = quizScore + '/' + quizData.length;
  const remarks = [
    "Hmm, Smiley... do you even know yourself? 😂",
    "Getting there, Queen! 😄",
    "Not bad! You're pretty self-aware 😊",
    "You know yourself well, Smiley! 💖",
    "PERFECT! You truly are the main character 👑✨"
  ];
  const ri = quizScore <= 1 ? 0 : quizScore <= 3 ? 1 : quizScore <= 5 ? 2 : quizScore <= 6 ? 3 : 4;
  document.getElementById('quiz-remark').textContent = remarks[ri];
}

startQuiz();

// ===== HEART CATCHER GAME =====
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
let gameRunning = false, gameScore = 0, gameHearts = [], gameBasket, gameAnimId;

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
}

function startGame() {
  resizeCanvas();
  gameScore = 0;
  gameHearts = [];
  document.getElementById('game-score-val').textContent = '0';
  document.getElementById('game-start-btn').textContent = 'Playing... 💖';

  gameBasket = {
    x: canvas.width / 2,
    y: canvas.height - 40,
    w: 60, h: 30
  };

  gameRunning = true;
  spawnHeart();
  gameLoop();
}

canvas.addEventListener('mousemove', (e) => {
  if (!gameRunning || !gameBasket) return;
  const rect = canvas.getBoundingClientRect();
  gameBasket.x = (e.clientX - rect.left) * (canvas.width / rect.width);
});

canvas.addEventListener('touchmove', (e) => {
  if (!gameRunning || !gameBasket) return;
  e.preventDefault();
  const rect = canvas.getBoundingClientRect();
  gameBasket.x = (e.touches[0].clientX - rect.left) * (canvas.width / rect.width);
}, { passive: false });

function spawnHeart() {
  if (!gameRunning) return;
  const hearts = ['💖', '❤️', '💗', '💕', '🖤'];
  gameHearts.push({
    x: Math.random() * (canvas.width - 30) + 15,
    y: -20,
    emoji: hearts[Math.floor(Math.random() * hearts.length)],
    speed: 1.5 + Math.random() * 2,
    size: 20 + Math.random() * 10
  });
  const delay = Math.max(300, 800 - gameScore * 15);
  setTimeout(spawnHeart, delay);
}

function gameLoop() {
  if (!gameRunning) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw basket
  ctx.fillStyle = '#d4a853';
  const bx = gameBasket.x - gameBasket.w / 2;
  ctx.beginPath();
  ctx.roundRect(bx, gameBasket.y, gameBasket.w, gameBasket.h, 8);
  ctx.fill();
  ctx.font = '16px Poppins';
  ctx.fillStyle = '#000';
  ctx.textAlign = 'center';
  ctx.fillText('🧺', gameBasket.x, gameBasket.y + 22);

  // Update & draw hearts
  let missed = 0;
  gameHearts = gameHearts.filter((h) => {
    h.y += h.speed;
    ctx.font = h.size + 'px serif';
    ctx.textAlign = 'center';
    ctx.fillText(h.emoji, h.x, h.y);

    // Check catch
    if (h.y >= gameBasket.y - 10 && h.y <= gameBasket.y + gameBasket.h &&
        h.x >= bx && h.x <= bx + gameBasket.w) {
      gameScore++;
      document.getElementById('game-score-val').textContent = gameScore;
      return false;
    }
    if (h.y > canvas.height + 30) {
      missed++;
      return false;
    }
    return true;
  });

  if (gameScore >= 30) {
    gameRunning = false;
    document.getElementById('game-start-btn').textContent = '🎉 You Won! Play Again?';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '24px Dancing Script';
    ctx.fillStyle = '#d4a853';
    ctx.textAlign = 'center';
    ctx.fillText('You caught all the love! 💖', canvas.width / 2, canvas.height / 2);
    return;
  }

  gameAnimId = requestAnimationFrame(gameLoop);
}
