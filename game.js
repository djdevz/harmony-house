const container = document.getElementById('game-container');
const introScreen = document.getElementById('intro-screen');
const bgm = document.getElementById('bgm');
const sfxPop = document.getElementById('sfx-pop');
const sfxClick = document.getElementById('sfx-click');
const sfxSlide = document.getElementById('sfx-slide');
const audioBtn = document.getElementById('audio-btn');

let currentLevel = 1;
let isMuted = true;

// --- INTRO SEQUENCE ---
window.onload = () => {
    setTimeout(() => {
        // Fade out logo
        introScreen.classList.add('fade-out');
        // Start Game
        setTimeout(() => {
            introScreen.style.display = 'none';
            loadLevel1();
        }, 1500);
    }, 2000); // Logo stays for 2 seconds
};

// --- AUDIO SYSTEM ---
function toggleAudio() {
    isMuted = !isMuted;
    if (!isMuted) {
        bgm.volume = 0.2; 
        bgm.play().catch(e => console.log("No music file found yet"));
        audioBtn.innerText = "🔊";
    } else {
        bgm.pause();
        audioBtn.innerText = "🔇";
    }
}

function playSound(type) {
    if (isMuted) return;
    // Reset time to allow rapid playback
    if (type === 'pop') { sfxPop.currentTime = 0; sfxPop.play(); }
    if (type === 'click') { sfxClick.currentTime = 0; sfxClick.play(); }
    if (type === 'slide') { sfxSlide.currentTime = 0; sfxSlide.play(); }
}

// --- ART GENERATOR (SVGs) ---
function generateFunkyArt() {
    // Artsy Palette
    const colors = ['#e27d60', '#85dcba', '#e8a87c', '#c38d9e', '#41b3a3', '#2c3e50'];
    const shapes = [];
    
    // Create 3-5 random shapes per canvas
    const count = Math.floor(Math.random() * 3) + 3;
    
    for(let i=0; i<count; i++) {
        const type = Math.random();
        const color = colors[Math.floor(Math.random() * colors.length)];
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 40 + 10;
        
        if(type < 0.33) {
            // Circle
            shapes.push(`<circle cx="${x}%" cy="${y}%" r="${size/2}%" fill="${color}" opacity="0.8"/>`);
        } else if (type < 0.66) {
            // Rect
            shapes.push(`<rect x="${x}%" y="${y}%" width="${size}%" height="${size}%" fill="${color}" transform="rotate(${Math.random()*90}, 50, 50)" opacity="0.8"/>`);
        } else {
            // Line
            shapes.push(`<line x1="${x}%" y1="${y}%" x2="${x+20}%" y2="${y+20}%" stroke="${color}" stroke-width="5" stroke-linecap="round"/>`);
        }
    }
    
    return `<svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="background:#f4f4f4">${shapes.join('')}</svg>`;
}

// --- LEVEL 1: THE GALLERY ---
function loadLevel1() {
    container.innerHTML = '<div class="gallery-grid" id="grid"></div>';
    const grid = document.getElementById('grid');

    // Create 9 frames
    for(let i=0; i<9; i++) {
        const frame = document.createElement('div');
        frame.className = 'photo-frame';
        
        // Random bad rotation
        let rot = Math.floor(Math.random() * 40) - 20;
        if(Math.abs(rot) < 5) rot = 10; // Ensure it's crooked
        
        frame.style.transform = `rotate(${rot}deg)`;
        frame.dataset.rot = rot;

        // Inject Funky Art
        const canvas = document.createElement('div');
        canvas.className = 'art-canvas';
        canvas.innerHTML = generateFunkyArt();
        frame.appendChild(canvas);

        frame.onclick = () => {
            playSound('click');
            let r = parseInt(frame.dataset.rot);
            
            // Interaction: Nudge towards 0
            if (r > 0) r -= 5;
            else r += 5;

            // Snap
            if (Math.abs(r) < 5) r = 0;

            frame.style.transform = `rotate(${r}deg)`;
            frame.dataset.rot = r;

            checkWinCondition1();
        };
        grid.appendChild(frame);
    }
}

function checkWinCondition1() {
    const frames = document.querySelectorAll('.photo-frame');
    let allStraight = true;
    frames.forEach(f => {
        if (parseInt(f.dataset.rot) !== 0) allStraight = false;
    });

    if (allStraight) {
        playSound('slide'); // Satisfying slide sound on win
        setTimeout(() => {
            alert("Perfectly Aligned."); // Placeholder for next level transition
            // loadLevel2(); 
        }, 500);
    }
}

// Start sequence handled by window.onload