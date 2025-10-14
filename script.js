// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Fade in animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Form submission
document
  .querySelector(".contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Mensagem enviada! Entrarei em contato em breve.");
  });

// Header background on scroll
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(10, 10, 10, 0.98)";
  } else {
    header.style.background = "rgba(10, 10, 10, 0.95)";
  }
});

// Carousel functionality
class Carousel {
  constructor() {
    this.track = document.getElementById("carouselTrack");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.dotsContainer = document.getElementById("carouselDots");
    this.cards = this.track.querySelectorAll(".project-card");
    this.currentIndex = 0;
    this.cardsPerView = this.getCardsPerView();
    this.totalSlides = Math.ceil(this.cards.length / this.cardsPerView);

    this.init();
  }

  getCardsPerView() {
    if (window.innerWidth <= 768) return 1; // Mobile: 1 card
    if (window.innerWidth <= 1024) return 2; // Tablet: 2 cards
    return 2; // Desktop: 2 cards
  }

  init() {
    this.createDots();
    this.updateCarousel();
    this.bindEvents();
    this.updateCardsPerView();
  }

  createDots() {
    this.dotsContainer.innerHTML = "";

    let totalDots;
    if (window.innerWidth >= 1025) {
      // Desktop: dots based on total slides (2 cards per slide)
      totalDots = this.totalSlides;
    } else {
      // Tablet and mobile: normal behavior
      totalDots = this.totalSlides;
    }

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement("button");
      dot.className = "carousel-dot";
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => this.goToSlide(i));
      this.dotsContainer.appendChild(dot);
    }
  }

  bindEvents() {
    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());

    window.addEventListener("resize", () => {
      this.cardsPerView = this.getCardsPerView();
      this.totalSlides = Math.ceil(this.cards.length / this.cardsPerView);
      this.currentIndex = 0;
      this.createDots();
      this.updateCarousel();
      this.updateCardsPerView();
    });
  }

  updateCardsPerView() {
    const cardWidth = 100 / this.cardsPerView;
    this.cards.forEach((card) => {
      if (window.innerWidth >= 1025) {
        // Desktop: exactly 2 cards, 45% each with margins
        card.style.flex = "0 0 45%";
        card.style.maxWidth = "500px";
        card.style.margin = "0 2.5%";
      } else {
        // Tablet and mobile: normal behavior
        card.style.flex = `0 0 ${cardWidth}%`;
        card.style.maxWidth = window.innerWidth >= 769 ? "320px" : "none";
        card.style.margin = "0";
      }
      card.style.minWidth = "0";
    });
  }

  updateCarousel() {
    let translateX;

    if (window.innerWidth >= 1025) {
      // Desktop: show exactly 2 cards, move by 1 card at a time
      translateX = -(this.currentIndex * (100 / this.cardsPerView));
    } else {
      // Tablet and mobile: normal behavior
      translateX = -(this.currentIndex * (100 / this.cardsPerView));
    }

    this.track.style.transform = `translateX(${translateX}%)`;

    // Update dots
    document.querySelectorAll(".carousel-dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentIndex);
    });
  }

  prevSlide() {
    if (window.innerWidth >= 1025) {
      // Desktop: move by 1 card, but ensure we don't go beyond available cards
      this.currentIndex =
        this.currentIndex > 0 ? this.currentIndex - 1 : this.totalSlides - 1;
    } else {
      // Tablet and mobile: normal behavior
      this.currentIndex =
        this.currentIndex > 0 ? this.currentIndex - 1 : this.totalSlides - 1;
    }
    this.updateCarousel();
  }

  nextSlide() {
    if (window.innerWidth >= 1025) {
      // Desktop: move by 1 card, but ensure we don't go beyond available cards
      this.currentIndex =
        this.currentIndex < this.totalSlides - 1 ? this.currentIndex + 1 : 0;
    } else {
      // Tablet and mobile: normal behavior
      this.currentIndex =
        this.currentIndex < this.totalSlides - 1 ? this.currentIndex + 1 : 0;
    }
    this.updateCarousel();
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateCarousel();
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new Carousel();
});
