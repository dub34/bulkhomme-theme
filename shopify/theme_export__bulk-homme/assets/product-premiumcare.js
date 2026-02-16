/**
 * Product PremiumCare Gallery Slider
 * Handles image gallery navigation and quantity controls
 */

class ProductSlider {
  constructor(container) {
    this.container = container;
    this.slides = container.querySelectorAll('[data-slide]');
    this.dots = container.querySelectorAll('[data-slider-dots] .slider-dot');
    this.prevBtn = container.querySelector('[data-slider-prev]');
    this.nextBtn = container.querySelector('[data-slider-next]');
    this.currentIndex = 0;

    this.init();
  }

  init() {
    if (this.slides.length <= 1) return;

    // Bind events
    this.prevBtn?.addEventListener('click', () => this.prev());
    this.nextBtn?.addEventListener('click', () => this.next());

    // Dot navigation
    this.dots.forEach((dot, index) => {
      const btn = dot.querySelector('button');
      btn?.addEventListener('click', () => this.goToSlide(index));
    });

    // Touch/swipe support
    this.addSwipeSupport();
  }

  goToSlide(index) {
    // Remove active class from current
    this.slides[this.currentIndex]?.classList.remove('active');
    this.dots[this.currentIndex]?.classList.remove('active');

    // Add active class to new
    this.currentIndex = index;
    this.slides[this.currentIndex]?.classList.add('active');
    this.dots[this.currentIndex]?.classList.add('active');
  }

  next() {
    const nextIndex = (this.currentIndex + 1) % this.slides.length;
    this.goToSlide(nextIndex);
  }

  prev() {
    const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prevIndex);
  }

  addSwipeSupport() {
    let touchStartX = 0;
    let touchEndX = 0;

    this.container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    this.container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    });

    const handleSwipe = () => {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        this.next();
      }
      if (touchEndX > touchStartX + swipeThreshold) {
        this.prev();
      }
    };

    this.handleSwipe = handleSwipe;
  }
}

/**
 * Quantity Controls
 * Handles increment/decrement of product quantity
 */
class QuantityControl {
  constructor(container) {
    this.container = container;
    this.input = container.querySelector('#quantity-input');
    this.minusBtn = container.querySelector('[data-quantity-minus]');
    this.plusBtn = container.querySelector('[data-quantity-plus]');

    this.init();
  }

  init() {
    if (!this.input) return;

    this.minusBtn?.addEventListener('click', () => this.decrease());
    this.plusBtn?.addEventListener('click', () => this.increase());

    // Validate input on change
    this.input.addEventListener('change', () => this.validate());
  }

  decrease() {
    const currentValue = parseInt(this.input.value) || 1;
    const minValue = parseInt(this.input.min) || 1;

    if (currentValue > minValue) {
      this.input.value = currentValue - 1;
      this.input.dispatchEvent(new Event('change'));
    }
  }

  increase() {
    const currentValue = parseInt(this.input.value) || 1;
    const maxValue = parseInt(this.input.max) || 999;

    if (currentValue < maxValue) {
      this.input.value = currentValue + 1;
      this.input.dispatchEvent(new Event('change'));
    }
  }

  validate() {
    const value = parseInt(this.input.value);
    const min = parseInt(this.input.min) || 1;
    const max = parseInt(this.input.max) || 999;

    if (isNaN(value) || value < min) {
      this.input.value = min;
    } else if (value > max) {
      this.input.value = max;
    }
  }
}

/**
 * Initialize all components when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize slider
  const sliderContainer = document.querySelector('[data-product-slider]');
  if (sliderContainer) {
    new ProductSlider(sliderContainer);
  }

  // Initialize quantity controls
  const quantityContainer = document.querySelector('.prod-quantity');
  if (quantityContainer) {
    new QuantityControl(quantityContainer);
  }

  // Handle add to cart form submission
  const productForm = document.querySelector('#product-form-premiumcare');
  if (productForm) {
    productForm.addEventListener('submit', (e) => {
      const button = productForm.querySelector('[data-add-to-cart]');
      if (button) {
        button.disabled = true;
        button.textContent = 'Adding...';

        // Re-enable after a delay (actual cart handling is done by Shopify)
        setTimeout(() => {
          button.disabled = false;
          button.textContent = button.dataset.originalText || 'Add to Cart';
        }, 2000);
      }
    });
  }
});
