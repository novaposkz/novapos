(function($){
  $(function(){


    $('.navbar ul li a:not(:only-child)').click(function(e){
      $(this).siblings('.nav-dropdown').toggle();
      $('.nav-dropdown').not($(this).siblings()).hide();
      e.stopPropagation();
    });


    $('html').click(function(){
      $('.nav-dropdown').hide();
    });


    $('#nav-toggle').click(function(){
      $('.navbar ul').slideToggle();
    });


    $('#nav-toggle').on('click', function(){
      this.classList.toggle('active');
    });


  });
})(jQuery);


document.addEventListener("DOMContentLoaded", function () {
  const carouselInner = document.querySelector(".carousel-inner");
  const carouselItems = document.querySelectorAll(".carousel-item");
  const prevButton = document.querySelector(".carousel-control.prev");
  const nextButton = document.querySelector(".carousel-control.next");
  const dotsContainer = document.querySelector(".carousel-dots");

  let currentIndex = 0;

  // Create dots
  carouselItems.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("carousel-dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".carousel-dot");

  // Update carousel
  function updateCarousel() {
    if (window.innerWidth <= 768) {
      // Mobile version: Use scroll behavior
      carouselItems[currentIndex].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    } else {
      // Desktop version: Use transform
      carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Update active dot
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  // Go to a specific slide
  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  // Next slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    updateCarousel();
  }

  // Previous slide
  function prevSlide() {
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    updateCarousel();
  }

  // Event listeners
  prevButton.addEventListener("click", prevSlide);
  nextButton.addEventListener("click", nextSlide);

  // Touch events for mobile
  let touchStartX = 0;
  carouselInner.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });

  carouselInner.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  });
});

// Optional: Add smooth scrolling behavior for touch devices
const galleryContainer = document.querySelector('.gallery-container');
let isDragging = false;
let startX, scrollLeft;

galleryContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - galleryContainer.offsetLeft;
    scrollLeft = galleryContainer.scrollLeft;
});

galleryContainer.addEventListener('mouseleave', () => {
    isDragging = false;
});

galleryContainer.addEventListener('mouseup', () => {
    isDragging = false;
});

galleryContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - galleryContainer.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    galleryContainer.scrollLeft = scrollLeft - walk;
});

// Touch events for mobile devices
galleryContainer.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - galleryContainer.offsetLeft;
    scrollLeft = galleryContainer.scrollLeft;
});

galleryContainer.addEventListener('touchend', () => {
    isDragging = false;
});

galleryContainer.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - galleryContainer.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    galleryContainer.scrollLeft = scrollLeft - walk;
});


// Function to handle redirection
function redirectToPage(url) {
  window.location.href = url;
}

// Add event listeners for mobile card clicks
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("click", function () {
      if (window.innerWidth <= 768) { // Only apply to mobile
        const url = card.getAttribute("data-url"); // Get URL from data attribute
        if (url) {
          window.location.href = url;
        }
      }
    });
  });
});



// Feedback section

function sendEmail() {
    const topic = document.getElementById('topic').value;
    if (!topic) {
        alert('Please choose a topic before submitting.');
        return;
    }
    const email = "director@example.com";
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(topic)}`;
    window.location.href = mailtoLink;
}