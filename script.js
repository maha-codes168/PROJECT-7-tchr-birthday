// 1. Loader Removal
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.style.opacity = '0';
    loader.style.visibility = 'hidden';
  }, 800);
});

// 2. Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// 3. Scroll Reveal Animation & Active Navigation Indicator
const reveals = document.querySelectorAll('.reveal');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

function handleScroll() {
  const windowHeight = window.innerHeight;

  // Reveal elements
  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.classList.add('active');
    }
  });

  // Active menu indicator
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 150) {
      currentSection = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${currentSection}`) {
      item.classList.add('active');
    }
  });
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);

// 4. Interactive Letter Envelope Modal
const openEnvelopeBtn = document.getElementById('open-envelope-btn');
const letterModal = document.getElementById('letter-modal-overlay');
const closeLetterBtn = document.getElementById('close-letter-btn');

openEnvelopeBtn.addEventListener('click', () => {
  letterModal.classList.add('active');
});

closeLetterBtn.addEventListener('click', () => {
  letterModal.classList.remove('active');
  window.location.href = '#cake';
});

// 5. Cake Candle Blowout Interaction
const wishBtn = document.getElementById('wish-btn');
const flame = document.getElementById('flame');
const wishMsg = document.getElementById('wish-msg');
const cakeNextBtn = document.getElementById('cake-next-btn');

wishBtn.addEventListener('click', () => {
  // Extinguish flame
  flame.classList.add('off');
  
  // Trigger Confetti
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E8A5B8', '#D4AF37', '#8C4A5A', '#FBF0F3']
    });
  }

  // Show wish reveal message
  wishMsg.classList.add('show');
  wishBtn.style.display = 'none';
  cakeNextBtn.style.display = 'inline-flex';
});

// 6. Ambient Canvas Background Particles (Petals/Sparkles)
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height - canvas.height;
    this.size = Math.random() * 8 + 4;
    this.speedY = Math.random() * 1 + 0.5;
    this.speedX = Math.random() * 0.6 - 0.3;
    this.opacity = Math.random() * 0.5 + 0.3;
    this.color = ['#E8A5B8', '#FBF0F3', '#D4AF37', '#E3D7EC'][Math.floor(Math.random() * 4)];
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    if (this.y > canvas.height) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function initParticles() {
  particles = [];
  const count = window.innerWidth < 768 ? 25 : 50;
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();