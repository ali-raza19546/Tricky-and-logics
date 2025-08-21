// ===== Config =====
const BLOB_COUNT = 5;          // Number of blobs
const SIZE_MIN = 28;            // in vmin
const SIZE_MAX = 42;            // in vmin
const SPEED_MIN = 10;           // seconds
const SPEED_MAX = 26;           // seconds

const colors = [
    [280, 90, 60], // pink/purple
    [200, 90, 60], // cyan
    [160, 85, 55], // green-teal
    [45, 95, 60],  // golden
    [330, 85, 60], // magenta
    [15, 90, 60],  // orange
    [220, 85, 60], // blue
];

const blobsEl = document.getElementById('blobs');

// Utility random helpers
const rand = (min, max) => min + Math.random() * (max - min);
const pick = arr => arr[Math.floor(Math.random() * arr.length)];

function makeBlob(i) {
    const d = document.createElement('div');
    d.className = 'blob';
    const size = rand(SIZE_MIN, SIZE_MAX);
    d.style.width = size + 'vmin';
    d.style.height = size + 'vmin';

    // color gradient
    const [h, s, l] = pick(colors);
    d.style.background = `radial-gradient(circle at 35% 35%, hsl(${h} ${s}% ${l}%), hsl(${h} ${s}% ${Math.max(30, l - 20)}%) 45%, transparent 65%)`;

    blobsEl.appendChild(d);
    return d;
}

function animateBlob(el) {
    const bounds = () => ({
        x: window.innerWidth,
        y: window.innerHeight,
    });
    const pos = () => ({ x: rand(-0.1, 0.9) * bounds().x, y: rand(-0.1, 0.9) * bounds().y });

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    const steps = Math.floor(rand(3, 6));
    for (let i = 0; i < steps; i++) {
        const p = pos();
        tl.to(el, {
            x: p.x,
            y: p.y,
            scale: rand(0.8, 1.3),
            rotation: rand(-45, 45),
            duration: rand(SPEED_MIN, SPEED_MAX),
            ease: 'sine.inOut',
        });
    }
    return tl;
}

// Build scene
const blobs = Array.from({ length: BLOB_COUNT }, (_, i) => makeBlob(i));
const timelines = blobs.map(animateBlob);

// Interactions: double click to randomize positions/colors
function recolor() {
    blobs.forEach((el) => {
        const [h, s, l] = pick(colors);
        el.style.background = `radial-gradient(circle at 35% 35%, hsl(${h} ${s}% ${l}%), hsl(${h} ${s}% ${Math.max(30, l - 20)}%) 45%, transparent 65%)`;
    });
}
function randomize() {
    timelines.forEach(tl => tl.kill());
    blobs.forEach(el => { el.style.transform = 'translate(0,0)'; });
    blobs.forEach(animateBlob);
    recolor();
}

window.addEventListener('dblclick', randomize);
window.addEventListener('keydown', (e) => { if (e.key.toLowerCase() === 'r') recolor(); });

// Resize handling keeps motion fluid
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        randomize();
    }, 200);
});