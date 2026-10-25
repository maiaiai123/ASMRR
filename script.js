```javascript
const mainMenu = document.getElementById('main-menu');
const slimeGame = document.getElementById('slime-game');
const popGame = document.getElementById('pop-game');
const popGrid = document.getElementById('pop-grid');

// --- Навигация ---
function startGame(game) {
    mainMenu.style.display = 'none';
    if (game === 'slime') {
        slimeGame.style.display = 'flex';
        initSlime();
    } else if (game === 'pop') {
        popGame.style.display = 'flex';
        initPopIt();
    }
}

function goBack() {
    slimeGame.style.display = 'none';
    popGame.style.display = 'none';
    mainMenu.style.display = 'flex';
}

// --- Логика Слайма ---
function initSlime() {
    slimeGame.onclick = (e) => {
        createBlob(e.clientX, e.clientY);
        playPopSound();
    };
}

function createBlob(x, y) {
    const blob = document.createElement('div');
    blob.className = 'slime-blob';

    const size = 100;
    blob.style.left = (x - size/2) + 'px';
    blob.style.top = (y - size/2) + 'px';
    blob.style.width = size + 'px';
    blob.style.height = size + 'px';

    const colors = ['#ffdde1', '#ee9ca7', '#a8e6cf', '#dcedc1', '#ffd3b6', '#c7ceea'];
    blob.style.background = colors[Math.floor(Math.random() * colors.length)];

    slimeGame.appendChild(blob);
    setTimeout(() => blob.remove(), 800);
}

// --- Логика Поп-ита ---
function initPopIt() {
    popGrid.innerHTML = ''; 
    for (let i = 0; i < 16; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.addEventListener('pointerdown', () => {
            if (!bubble.classList.contains('popped')) {
                bubble.classList.add('popped');
                playPopSound();
            }
        });
        popGrid.appendChild(bubble);
    }
}

// --- Синтезатор звука (ASMR Pop) ---
function playPopSound() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    const freq = 400 + Math.random() * 300;
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
}

// Запрет масштабирования для мобилок
