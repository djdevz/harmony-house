const container = document.getElementById('game-container');
const splash = document.getElementById('splash-screen');
const bgm = document.getElementById('bgm');

let currentLevel = 1;
let isMuted = false;

// --- SYSTEM ---

function startGame() {
    // Hide Intro
    const intro = document.getElementById('intro-screen');
    intro.style.opacity = '0';
    setTimeout(() => { intro.style.display = 'none'; }, 1000);
    
    // Attempt Auto-Play Audio (Allowed because user clicked 'Start')
    bgm.volume = 0.3;
    bgm.play().catch(e => console.log("Audio blocked", e));
    
    loadLevel(currentLevel);
}

function toggleAudio() {
    isMuted = !isMuted;
    const btn = document.getElementById('audio-btn');
    if (isMuted) {
        bgm.pause();
        btn.innerText = "🔇";
    } else {
        bgm.play();
        btn.innerText = "🔊";
    }
}

function playSound(id) {
    if(isMuted) return;
    const sfx = document.getElementById(id);
    sfx.currentTime = 0;
    sfx.play();
}

function shareGame() {
    navigator.clipboard.writeText(window.location.href);
    const btn = document.getElementById('share-btn');
    btn.innerText = "✓";
    setTimeout(() => btn.innerText = "🔗", 2000);
}

function showSplash(title, msg, isEnd = false) {
    playSound('sfx-slide');
    const t = document.querySelector('.splash-title');
    const m = document.getElementById('splash-msg');
    const b = document.querySelector('.splash-btn');
    
    t.innerText = title;
    m.innerText = msg;
    
    if(isEnd) {
        b.innerText = "Play Again";
        b.onclick = () => location.reload();
    } else {
        b.innerText = "Continue";
        b.onclick = () => {
            splash.classList.remove('active');
            currentLevel++;
            loadLevel(currentLevel);
        };
    }
    splash.classList.add('active');
}

function loadLevel(lvl) {
    container.innerHTML = ''; // Clear container
    if (lvl === 1) loadGallery();
    if (lvl === 2) loadBooks();
    if (lvl === 3) loadCutlery();
    if (lvl === 4) loadPantry();
    if (lvl === 5) loadTiles();
}

// --- LEVEL 1: GALLERY ---
function loadGallery() {
    const grid = document.createElement('div');
    grid.className = 'gallery-grid';
    
    // Generate Artsy SVGs
    for(let i=0; i<9; i++) {
        const frame = document.createElement('div');
        frame.className = 'photo-frame';
        let rot = (Math.random() > 0.5 ? 10 : -10) * (Math.floor(Math.random()*2)+1);
        frame.style.transform = `rotate(${rot}deg)`;
        frame.dataset.rot = rot;
        frame.innerHTML = generateArtSVG(); // Helper function below
        
        frame.onclick = () => {
            playSound('sfx-click');
            let r = parseInt(frame.dataset.rot);
            if (r > 0) r -= 10; else r += 10;
            frame.style.transform = `rotate(${r}deg)`;
            frame.dataset.rot = r;
            checkGalleryWin();
        };
        grid.appendChild(frame);
    }
    container.appendChild(grid);
}

function checkGalleryWin() {
    const frames = document.querySelectorAll('.photo-frame');
    let win = true;
    frames.forEach(f => { if(parseInt(f.dataset.rot) !== 0) win = false; });
    if(win) setTimeout(() => showSplash("Lovely.", "Everything is aligned."), 500);
}

// --- LEVEL 2: BOOKS ---
function loadBooks() {
    const shelf = document.createElement('div');
    shelf.className = 'shelf';
    const colors = ['#2c3e50', '#34495e', '#5d6d7e', '#85929e', '#aeb6bf', '#d5d8dc'];
    
    let books = colors.map((c, i) => ({ id: i, color: c, h: 100 + (i*20) }));
    books.sort(() => Math.random() - 0.5); // Shuffle
    
    books.forEach(b => {
        const el = document.createElement('div');
        el.className = 'book';
        el.style.height = b.h + 'px';
        el.style.background = b.color;
        el.dataset.id = b.id;
        el.onclick = () => handleBookClick(el);
        shelf.appendChild(el);
    });
    container.appendChild(shelf);
}

let selectedBook = null;
function handleBookClick(book) {
    playSound('sfx-pop');
    if(!selectedBook) {
        selectedBook = book;
        book.classList.add('floating');
    } else {
        // Swap logic
        const p1 = selectedBook.nextSibling;
        const p2 = book.nextSibling;
        const parent = book.parentNode;
        
        // Simple swap
        if(p1 === book) parent.insertBefore(book, selectedBook);
        else if(p2 === selectedBook) parent.insertBefore(selectedBook, book);
        else {
            parent.insertBefore(selectedBook, p2);
            parent.insertBefore(book, p1);
        }
        
        selectedBook.classList.remove('floating');
        selectedBook = null;
        checkBookWin();
    }
}
function checkBookWin() {
    const books = document.querySelectorAll('.book');
    let win = true;
    books.forEach((b, i) => { if(parseInt(b.dataset.id) !== i) win = false; });
    if(win) setTimeout(() => showSplash("Serene.", "Knowledge is ordered."), 500);
}

// --- LEVEL 3: CUTLERY ---
function loadCutlery() {
    const grid = document.createElement('div');
    grid.className = 'drawer-grid';
    
    // 0: Fork, 1: Knife, 2: Spoon
    const icons = ['🍴', '🔪', '🥄'];
    let items = [0, 1, 2]; 
    items.sort(() => Math.random() - 0.5); // Shuffle what's currently in slots
    
    // We create slots that "expect" 0, 1, 2 but contain random items
    items.forEach((itemIndex, slotIndex) => {
        const slot = document.createElement('div');
        slot.className = 'utensil-slot';
        slot.innerText = icons[itemIndex];
        slot.dataset.current = itemIndex; // What is inside now
        slot.dataset.target = slotIndex;  // What SHOULD be inside (0, 1, 2)
        slot.onclick = () => handleCutleryClick(slot);
        grid.appendChild(slot);
    });
    container.appendChild(grid);
}

let selectedSlot = null;
function handleCutleryClick(slot) {
    playSound('sfx-click');
    if(!selectedSlot) {
        selectedSlot = slot;
        slot.classList.add('selected');
    } else {
        // Swap Content (Text and Dataset)
        let tempText = slot.innerText;
        let tempData = slot.dataset.current;
        
        slot.innerText = selectedSlot.innerText;
        slot.dataset.current = selectedSlot.dataset.current;
        
        selectedSlot.innerText = tempText;
        selectedSlot.dataset.current = tempData;
        
        selectedSlot.classList.remove('selected');
        selectedSlot = null;
        checkCutleryWin();
    }
}
function checkCutleryWin() {
    const slots = document.querySelectorAll('.utensil-slot');
    let win = true;
    slots.forEach(s => { if(s.dataset.current !== s.dataset.target) win = false; });
    if(win) setTimeout(() => showSplash("Sharp.", "Ready for dinner."), 500);
}

// --- LEVEL 4: PANTRY CANS ---
function loadPantry() {
    const shelf = document.createElement('div');
    shelf.className = 'pantry-shelf';
    
    for(let i=0; i<5; i++) {
        const can = document.createElement('div');
        can.className = 'can';
        // Random start face: back, side, or front
        let faces = ['back', 'side', 'front'];
        let start = faces[Math.floor(Math.random()*2)]; // Only pick back or side to ensure puzzle
        can.dataset.face = start; 
        
        const label = document.createElement('div');
        label.className = 'label';
        label.innerText = "SOUP";
        can.appendChild(label);
        
        can.onclick = () => {
            playSound('sfx-pop');
            let f = can.dataset.face;
            if(f === 'back') can.dataset.face = 'side';
            else if(f === 'side') can.dataset.face = 'front';
            else can.dataset.face = 'back'; // Can rotate past front if desired
            checkPantryWin();
        }
        shelf.appendChild(can);
    }
    container.appendChild(shelf);
}
function checkPantryWin() {
    const cans = document.querySelectorAll('.can');
    let win = true;
    cans.forEach(c => { if(c.dataset.face !== 'front') win = false; });
    if(win) setTimeout(() => showSplash("Delicious.", "Labels forward."), 500);
}

// --- LEVEL 5: TILES ---
function loadTiles() {
    const grid = document.createElement('div');
    grid.className = 'tile-grid';
    
    // 4 Tiles that form a circle
    for(let i=0; i<4; i++) {
        const tile = document.createElement('div');
        tile.className = `tile t${i}`; // t0, t1, t2, t3
        // Random rotation 90, 180, 270
        let r = (Math.floor(Math.random()*3)+1) * 90;
        tile.style.transform = `rotate(${r}deg)`;
        tile.dataset.rot = r;
        
        tile.onclick = () => {
            playSound('sfx-click');
            let r = parseInt(tile.dataset.rot);
            r += 90;
            tile.style.transform = `rotate(${r}deg)`;
            tile.dataset.rot = r;
            checkTileWin();
        }
        grid.appendChild(tile);
    }
    container.appendChild(grid);
}
function checkTileWin() {
    const tiles = document.querySelectorAll('.tile');
    let win = true;
    tiles.forEach(t => { 
        // 0, 360, 720 are all "upright"
        if(parseInt(t.dataset.rot) % 360 !== 0) win = false; 
    });
    if(win) setTimeout(() => showSplash("Zen.", "You found harmony.", true), 500);
}

// --- HELPER: GENERATE ART ---
function generateArtSVG() {
    const colors = ['#e27d60', '#85dcba', '#e8a87c', '#c38d9e'];
    let shapes = '';
    for(let i=0; i<3; i++) {
        let c = colors[Math.floor(Math.random()*colors.length)];
        let x = Math.random()*80; let y = Math.random()*80;
        shapes += `<circle cx="${x}%" cy="${y}%" r="15%" fill="${c}" opacity="0.6"/>`;
    }
    return `<svg width="100%" height="100%">${shapes}</svg>`;
}