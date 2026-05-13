 CARRUSEL AUTOMÁTICO - cada 2 segundos
// =============================================

class Carousel {
  constructor(selector) {
    this.carousel = document.querySelector(selector);
    if (!this.carousel) return;

    this.slides = this.carousel.querySelectorAll('.slide');
    this.prevBtn = this.carousel.querySelector('.prev-btn');
    this.nextBtn = this.carousel.querySelector('.next-btn');
    this.dotsContainer = this.carousel.querySelector('.dots');

    this.currentIndex = 0;
    this.totalSlides = this.slides.length;
    this.interval = null;
    this.delay = 2000; // 2 segundos

    this.init();
  }

  init() {
    // Crear puntos de navegación
    this.slides.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => this.goTo(i));
      this.dotsContainer.appendChild(dot);
    });

    // Botones anterior / siguiente
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());

    // Pausar al pasar el mouse
    this.carousel.addEventListener('mouseenter', () => this.pause());
    this.carousel.addEventListener('mouseleave', () => this.play());

    // Soporte táctil (swipe)
    let startX = 0;
    this.carousel.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    this.carousel.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? this.next() : this.prev();
    });

    this.updateSlides();
    this.play(); // Iniciar automático
  }

  updateSlides() {
    this.slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === this.currentIndex);
    });

    const dots = this.dotsContainer?.querySelectorAll('.dot');
    dots?.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.currentIndex);
    });
  }

  goTo(index) {
    this.currentIndex = (index + this.totalSlides) % this.totalSlides;
    this.updateSlides();
  }

  next() { this.goTo(this.currentIndex + 1); }
  prev() { this.goTo(this.currentIndex - 1); }

  play() {
    this.pause(); // Evitar duplicados
    this.interval = setInterval(() => this.next(), this.delay);
  }

  pause() {
    clearInterval(this.interval);
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new Carousel('.carousel-container');
});

HTML necesario en tu index.html
html<div class="carousel-container">
  <div class="slides-wrapper">
    <div class="slide active">
      <img src="imagen1.jpg" alt="Slide 1">
    </div>
    <div class="slide">
      <img src="imagen2.jpg" alt="Slide 2">
    </div>
    <div class="slide">
      <img src="imagen3.jpg" alt="Slide 3">
    </div>
  </div>

  <button class="prev-btn">&#10094;</button>
  <button class="next-btn">&#10095;</button>
  <div class="dots"></div>
</div>

CSS mínimo en tu styles.css
css.carousel-container {
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: auto;
  overflow: hidden;
}

.slide { display: none; }
.slide.active { display: block; }
.slide img { width: 100%; border-radius: 8px; }

.prev-btn, .next-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.5);
  color: white;
  border: none;
  padding: 10px 16px;
  cursor: pointer;
  font-size: 18px;
  border-radius: 4px;
}
.prev-btn { left: 10px; }
.next-btn { right: 10px; }

.dots { text-align: center; padding: 10px 0; }
.dot {
  display: inline-block;
  width: 12px; height: 12px;
  margin: 0 4px;
  background: #bbb;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s;
}
.dot.active { background: #333; }