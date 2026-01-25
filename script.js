const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let index = 0;

function showSlide(i) {
    slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === i);
        dots[idx].classList.toggle('active', idx === i);
    });
}

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        index = i;
        showSlide(index);
    });
});

setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
}, 5000);

// Hotel filtering functionality
const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
const hotelCards = document.querySelectorAll('.hotel-card');
const submitFiltersBtn = document.getElementById('submit-filters');
const clearFiltersBtn = document.getElementById('clear-filters');
const priceSlider = document.getElementById('price-slider');
const priceValue = document.getElementById('price-value');
const countNumber = document.getElementById('count-number');

// Update price display
priceSlider.addEventListener('input', function() {
  const value = this.value;
  if (value >= 2000) {
    priceValue.textContent = '$2000+';
  } else {
    priceValue.textContent = '$' + value;
  }
});

function applyFilters() {
  const maxPrice = parseInt(priceSlider.value);
  
  const activeFilters = {
    location: [],
    type: [],
    facilities: [],
    stars: []
  };

  // Collect active filters
  filterCheckboxes.forEach(checkbox => {
    if (checkbox.checked) {
      const filterType = checkbox.dataset.filter;
      activeFilters[filterType].push(checkbox.value);
    }
  });

  let visibleCount = 0;

  // Filter hotels
  hotelCards.forEach(card => {
    const cardPrice = parseInt(card.dataset.price);
    const cardLocation = card.dataset.location;
    const cardType = card.dataset.type;
    const cardFacilities = card.dataset.facilities.split(',');
    const cardStars = card.dataset.stars;

    // Check price
    const matchesPrice = cardPrice <= maxPrice;

    // Check if card matches all active filters
    const matchesLocation = activeFilters.location.length === 0 || activeFilters.location.includes(cardLocation);
    const matchesType = activeFilters.type.length === 0 || activeFilters.type.includes(cardType);
    const matchesFacilities = activeFilters.facilities.length === 0 || 
      activeFilters.facilities.every(facility => cardFacilities.includes(facility));
    const matchesStars = activeFilters.stars.length === 0 || activeFilters.stars.includes(cardStars);

    // Show or hide card
    if (matchesPrice && matchesLocation && matchesType && matchesFacilities && matchesStars) {
      card.style.display = 'block';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  // Update count
  countNumber.textContent = visibleCount;
}

// Submit filters button
submitFiltersBtn.addEventListener('click', applyFilters);

// Clear filters button
clearFiltersBtn.addEventListener('click', () => {
  filterCheckboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
  priceSlider.value = 2000;
  priceValue.textContent = '$2000+';
  applyFilters();
});