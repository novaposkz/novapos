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
        alert('Пожалуйста, выберите тему перед отправкой.');
        return;
    }
    const email = "info@novapos.kz";
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(topic)}`;
    window.location.href = mailtoLink;
}

document.getElementById('phone').addEventListener('input', function(e) {
    // Remove all non-digits
    let value = e.target.value.replace(/\D/g, '');
    
    // Limit to 10 digits
    value = value.substring(0, 10);
    
    // Format the number
    if (value.length > 0) {
        value = value.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
        e.target.value = !value[2] ? value[1] : '(' + value[1] + ') ' + value[2] + (value[3] ? '-' + value[3] + (value[4] ? '-' + value[4] : '') : '');
    }
});

// Add this function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    // Create message text
    const messageText = `Новая заявка на партнерство:\n\nИмя: ${name}\nEmail: ${email}\nТелефон: +7${phone}`;
    
    // WhatsApp link
    const whatsappLink = `https://wa.me/77765595726?text=${encodeURIComponent(messageText)}`;
    
    // Email link
    const emailSubject = "Новая заявка на партнерство";
    const emailLink = `mailto:info@novapos.kz?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(messageText)}`;
    
    // Create buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
        z-index: 1000;
        text-align: center;
    `;
    
    buttonsContainer.innerHTML = `
        <h3 style="margin-bottom: 20px;">Выберите способ отправки:</h3>
        <button onclick="window.open('${whatsappLink}', '_blank')" style="margin: 10px; padding: 10px 20px; background: #25d366; color: white; border: none; border-radius: 5px; cursor: pointer;">
            Отправить в WhatsApp
        </button>
        <button onclick="window.location.href='${emailLink}'" style="margin: 10px; padding: 10px 20px; background: #0078D4; color: white; border: none; border-radius: 5px; cursor: pointer;">
            Отправить на Email
        </button>
        <button onclick="this.parentElement.remove()" style="margin: 10px; padding: 10px 20px; background: #gray; color: white; border: none; border-radius: 5px; cursor: pointer;">
            Отмена
        </button>
    `;
    
    document.body.appendChild(buttonsContainer);
}