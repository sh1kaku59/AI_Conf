//Menu
// Toggle menu on hamburger click
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});
// menu pop up
// Lấy các nút mở và đóng pop-up
const openPopupButtons = document.querySelectorAll('.open-popup');
const closePopupButton = document.getElementById('closePopup');
const popupForm = document.getElementById('popupForm');

// Thêm sự kiện để mở pop-up
openPopupButtons.forEach(button => {
    button.addEventListener('click', () => {
        popupForm.classList.add('active');
    });
});

// Thêm sự kiện để đóng pop-up
closePopupButton.addEventListener('click', () => {
    popupForm.classList.remove('active');
});

// Đóng pop-up khi nhấn ra ngoài
popupForm.addEventListener('click', (e) => {
    if (e.target === popupForm) {
        popupForm.classList.remove('active');
    }
});

//ung dung AI
document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll(".counter-box");
    const options = { threshold: 0.6 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCount(entry.target);
                entry.target.classList.add("show");
            } else {
                resetCount(entry.target);
            }
        });
    }, options);

    counters.forEach(counter => observer.observe(counter));

    // Function to start counting
    function startCount(counterBox) {
        const target = +counterBox.getAttribute("data-target");
        const counterNumber = counterBox.querySelector(".counter-number");
        let count = 0;

        const duration = 8000; // Total duration in ms
        const increment = Math.ceil(target / (duration / 200)); // Increase amount per frame

        const updateCount = () => {
            count += increment;
            if (count > target) count = target;
            //counterNumber.textContent = count + "+";
            counterNumber.innerHTML = `<strong>${Math.ceil(count)}</strong><span class="plus">+</span>`; // Sử dụng in đậm và thêm dấu cộng
            if (count < target) {
                requestAnimationFrame(updateCount);
            }
        };

        updateCount();
    }

    // Reset count to 0 when element leaves view
    function resetCount(counterBox) {
        const counterNumber = counterBox.querySelector(".counter-number");
        counterNumber.textContent = "0";
    }
});


//JavaScript for Scroll Animation
document.addEventListener("DOMContentLoaded", function () {
    const conferenceContent = document.getElementById("conference-content");

    function handleScroll() {
        const contentPosition = conferenceContent.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (contentPosition < screenHeight - 100 && contentPosition > -200) {
            conferenceContent.classList.add("show");
            conferenceContent.classList.remove("hide");
        } else {
            conferenceContent.classList.remove("show");
            conferenceContent.classList.add("hide");
        }
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger on load in case already in view
});

// khach moi
//Dien gia khach moi
const slides = document.querySelectorAll('.speaker-card1');
const container = document.querySelector('.speakers-container1');
const prevButton = document.querySelector('.arrow-left');
const nextButton = document.querySelector('.arrow-right');
const dotsContainer = document.createElement('div');

dotsContainer.classList.add('dots-container');
document.querySelector('.diengia1').appendChild(dotsContainer);

// Create dots
slides.forEach((_, index) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  dot.dataset.slide = index;
  if (index === 0) dot.classList.add('active');
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

let currentSlide = 0;

// Update the slider position
function updateSlide(index) {
  container.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

// Go to the next slide
nextButton.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlide(currentSlide);
});

// Go to the previous slide
prevButton.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlide(currentSlide);
});

// Click on dots to navigate
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    currentSlide = parseInt(dot.dataset.slide, 10);
    updateSlide(currentSlide);
  });
});

// Auto slide (optional)
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlide(currentSlide);
}, 4000); // Change slides every 7 seconds

setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    document.querySelector('.schedule-container').style.transform = `translateX(-${currentSlide * 100}%)`;
    arrowButtons.forEach(button => button.classList.remove('hidden')); // Hiển thị lại nút
  }, 5000);

// Bắt đầu tự động chuyển slide khi tải trang
startAutoSlide();