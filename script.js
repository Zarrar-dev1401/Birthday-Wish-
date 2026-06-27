/* =====================================================
   STATE
===================================================== */
let currentScreen = 1;
let totalScreens  = 9;
let musicPlaying  = false;
let lbImages      = [];
let lbIndex       = 0;
let heartTimer    = null;
let starCtx       = null;
let stars         = [];

/* =====================================================
   INIT
===================================================== */
window.addEventListener('load', () => {

  // Hide all screens
  document.querySelectorAll('.screen').forEach(s => {
    s.style.display = 'none';
    s.classList.remove('active');
  });

  // Show screen 1
  const first = document.getElementById('screen1');
  first.style.display = 'flex';
  first.classList.add('active', 'entering');

  // Stars
  initStars();

  // Preload images
  for (let i = 1; i <= 9; i++) {
    const img = new Image();
    img.src = 'images/' + i + '.jpg';
    lbImages.push('images/' + i + '.jpg');
  }

  // Hearts loop
  heartTimer = setInterval(createHeart, 600);

  // Gallery click
  document.getElementById('galleryGrid').addEventListener('click', e => {
    const photoEl = e.target.closest('.photo');
    if (!photoEl) return;
    lbIndex = parseInt(photoEl.dataset.index);
    openLightbox(lbIndex);
  });

  // Keyboard
  document.addEventListener('keydown', onKey);

  // Progress dots click
  document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const n = parseInt(dot.dataset.screen);
      if (n !== currentScreen) nextScreen(n);
    });
  });

  // Glide touch on buttons
  document.querySelectorAll('.glowBtn').forEach(btn => {
    btn.addEventListener('touchstart', () => btn.style.transform = 'scale(.96)', {passive:true});
    btn.addEventListener('touchend',   () => btn.style.transform = '', {passive:true});
  });
});

/* =====================================================
   STAR CANVAS
===================================================== */
function initStars() {
  const canvas = document.getElementById('starCanvas');
  if (!canvas) return;

  starCtx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Build stars
  for (let i = 0; i < 180; i++) {
    stars.push({
      x:    Math.random() * canvas.width,
      y:    Math.random() * canvas.height,
      r:    Math.random() * 1.4 + 0.2,
      a:    Math.random(),
      d:    Math.random() * 0.008 + 0.002,
      up:   Math.random() > 0.5,
    });
  }

  function draw() {
    starCtx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      // Twinkle
      s.a += s.up ? s.d : -s.d;
      if (s.a > 1)   { s.a = 1; s.up = false; }
      if (s.a < 0.1) { s.a = 0.1; s.up = true; }

      starCtx.beginPath();
      starCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      starCtx.fillStyle = `rgba(255, 245, 230, ${s.a})`;
      starCtx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* =====================================================
   NEXT SCREEN
===================================================== */
function nextScreen(next) {
  const currentEl = document.getElementById('screen' + currentScreen);
  const targetEl  = document.getElementById('screen' + next);
  if (!targetEl) return;

  // Exit current
  if (currentEl) {
    currentEl.classList.add('exiting');
    setTimeout(() => {
      currentEl.style.display = 'none';
      currentEl.classList.remove('active', 'entering', 'exiting');
    }, 400);
  }

  // Enter target
  setTimeout(() => {
    targetEl.style.display = 'flex';
    targetEl.classList.add('active');
    void targetEl.offsetWidth; // reflow
    targetEl.classList.add('entering');
  }, 200);

  currentScreen = next;
  updateDots(next);

  // Screen-specific hooks
  if (next === 9) {
    setTimeout(animateUrduLetter, 500);
  }
}

/* =====================================================
   PROGRESS DOTS
===================================================== */
function updateDots(n) {
  document.querySelectorAll('.dot').forEach(d => {
    d.classList.toggle('active', parseInt(d.dataset.screen) === n);
  });
}

/* =====================================================
   HEARTS
===================================================== */
function createHeart() {
  const container = document.getElementById('heartsContainer');
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.innerHTML = Math.random() > 0.7 ? '🌸' : '❤';
  heart.style.left   = Math.random() * 100 + '%';
  heart.style.bottom = '-40px';
  heart.style.fontSize = (10 + Math.random() * 24) + 'px';
  const dur = 8 + Math.random() * 6;
  heart.style.animationDuration = dur + 's';
  heart.style.opacity = 0.5 + Math.random() * 0.5;
  container.appendChild(heart);
  setTimeout(() => heart.remove(), dur * 1000);
}

/* =====================================================
   FAIRY LIGHTS
===================================================== */
function turnOnLights() {
  const container = document.getElementById('fairyLights');
  container.innerHTML = '';

  const colors = [
    '#ffd65a','#ff6b6b','#6bffd4','#a78bfa','#ff9f43','#54a0ff','#ffeaa7'
  ];

  for (let i = 0; i < 30; i++) {
    const wrap = document.createElement('div');
    wrap.className = 'light-wrap';

    const string = document.createElement('div');
    string.className = 'light-string';

    const bulb = document.createElement('div');
    bulb.className = 'light';
    bulb.style.background = colors[i % colors.length];
    bulb.style.boxShadow  = `0 0 10px ${colors[i % colors.length]}, 0 0 25px ${colors[i % colors.length]}`;
    bulb.style.animationDelay = (Math.random() * 2) + 's';
    bulb.style.animationDuration = (1 + Math.random() * 1.5) + 's';

    wrap.appendChild(string);
    wrap.appendChild(bulb);
    container.appendChild(wrap);
  }

  setTimeout(() => nextScreen(6), 1300);
}

/* =====================================================
   MUSIC
===================================================== */
function playMusic() {
  const music = document.getElementById('birthdayMusic');
  if (music) {
    music.volume = 0;
    music.play().catch(() => {});
    musicPlaying = true;
    document.getElementById('volumeBtn').textContent = '🔊';
    // Fade in
    let vol = 0;
    const fade = setInterval(() => {
      vol = Math.min(vol + 0.05, 0.8);
      music.volume = vol;
      if (vol >= 0.8) clearInterval(fade);
    }, 100);
  }
  setTimeout(() => nextScreen(7), 800);
}

function toggleVolume() {
  const music = document.getElementById('birthdayMusic');
  const btn   = document.getElementById('volumeBtn');
  if (!music) return;

  if (music.paused) {
    music.play().catch(() => {});
    musicPlaying = true;
    btn.textContent = '🔊';
  } else {
    music.pause();
    musicPlaying = false;
    btn.textContent = '🔇';
  }
}

/* =====================================================
   BALLOONS
===================================================== */
function flyBalloons() {
  const container = document.getElementById('balloonsContainer');
  container.innerHTML = '';

  const colors = ['#ff4d6d','#4dabff','#ffd43b','#69db7c','#da77f2','#ff922b','#fff','#f06595'];

  for (let i = 0; i < 40; i++) {
    const b = document.createElement('div');
    b.className = 'balloon';
    b.style.left   = (Math.random() * 100) + '%';
    b.style.bottom = '-200px';

    const color = colors[Math.floor(Math.random() * colors.length)];
    b.style.background = color;
    b.style.boxShadow  = `0 0 20px ${color}55`;

    const w = 48 + Math.random() * 30;
    b.style.width  = w + 'px';
    b.style.height = (w * 1.3) + 'px';

    const dur = 7 + Math.random() * 6;
    b.style.animationDuration = dur + 's';
    b.style.animationDelay    = (Math.random() * 2) + 's';

    container.appendChild(b);
    setTimeout(() => b.remove(), (dur + 3) * 1000);
  }

  setTimeout(() => nextScreen(8), 5000);
}

/* =====================================================
   CONFETTI
===================================================== */
function createConfetti() {
  const container = document.getElementById('confettiContainer');
  const colors = ['#ff4d6d','#ffd43b','#4dabff','#69db7c','#fff','#da77f2','#ff922b'];

  for (let i = 0; i < 200; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.left   = Math.random() * 100 + '%';
    p.style.top    = '-30px';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    const dur = 3 + Math.random() * 3.5;
    p.style.animationDuration = dur + 's';
    p.style.animationDelay    = Math.random() * 2.5 + 's';
    p.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
    p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    container.appendChild(p);
    setTimeout(() => p.remove(), (dur + 3) * 1000);
  }
}

/* =====================================================
   GALLERY
===================================================== */
function showGallery() {
  createConfetti();

  // Hide screen 9
  const s9 = document.getElementById('screen9');
  if (s9) {
    s9.classList.add('exiting');
    setTimeout(() => {
      s9.style.display = 'none';
      s9.classList.remove('active','entering','exiting');
    }, 400);
  }

  // Hide progress dots in gallery
  document.getElementById('progressDots').style.opacity = '0';

  // Show gallery
  const gallery = document.getElementById('gallerySection');
  gallery.style.display = 'block';

  setTimeout(() => {
    gallery.scrollIntoView({ behavior: 'smooth' });
    // Stagger photo entries
    const photos = document.querySelectorAll('.photo');
    photos.forEach((photo, i) => {
      setTimeout(() => photo.classList.add('visible'), i * 120);
    });
  }, 200);
}

/* =====================================================
   URDU LETTER ANIMATION
===================================================== */
function animateUrduLetter() {
  const paras = document.querySelectorAll('.urduLetter p');
  paras.forEach((p, i) => {
    setTimeout(() => p.classList.add('visible'), i * 350);
  });
}

/* =====================================================
   LIGHTBOX
===================================================== */
function openLightbox(index) {
  lbIndex = index;
  const lb   = document.getElementById('lightbox');
  const img  = document.getElementById('lbImg');
  const cap  = document.getElementById('lbCaption');
  img.src    = lbImages[lbIndex];
  cap.textContent = 'Memory ' + (lbIndex + 1) + ' of ' + lbImages.length;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function lbPrev(e) {
  e.stopPropagation();
  lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length;
  openLightbox(lbIndex);
}

function lbNext(e) {
  e.stopPropagation();
  lbIndex = (lbIndex + 1) % lbImages.length;
  openLightbox(lbIndex);
}

/* =====================================================
   KEYBOARD
===================================================== */
function onKey(e) {
  // Music on Enter
  if (e.key === 'Enter') {
    const music = document.getElementById('birthdayMusic');
    if (music && music.paused) music.play().catch(() => {});
  }
  // Lightbox arrows
  if (document.getElementById('lightbox').classList.contains('open')) {
    if (e.key === 'ArrowLeft')  lbPrev(e);
    if (e.key === 'ArrowRight') lbNext(e);
    if (e.key === 'Escape')     closeLightbox();
  }
}

/* =====================================================
   SWIPE SUPPORT (mobile gallery)
===================================================== */
let touchStartX = 0;
document.getElementById ? (() => {
  document.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, {passive: true});

  document.addEventListener('touchend', e => {
    const lb = document.getElementById('lightbox');
    if (!lb || !lb.classList.contains('open')) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) lbNext(e);
    else        lbPrev(e);
  }, {passive: true});
})() : null;

/* =====================================================
   LOG
===================================================== */
console.log('%c🎂 Birthday Website Loaded ❤️', 'color:#e8335a;font-size:18px;font-weight:bold;');