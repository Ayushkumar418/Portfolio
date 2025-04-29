// toggle icon navbar
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// scroll section
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      // active navbar links
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
      // active section for animation on scroll
      sec.classList.add("show-animate");
    }
    // if want to use animation that repeats on scroll use this
    else {
      sec.classList.remove("show-animate");
    }
  });

  // sticky header
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  // remove toggle icon and bavbar when click navbar links (scroll)
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");

  // Animation footer on scroll
  let footer = document.querySelector(".footer");
  // Animation footer on scroll
  if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 100) {
    footer.classList.add("show-animate");
  } else {
    footer.classList.remove("show-animate");
  }
};

// text animation
const titles = [
  "B.Tech(CSE) Student",
  "Software Engineer",
  "Full Stack Developer",
  "Cybersecurity Professional",
  "Frontend Developer",
  "Web Designer",
  "Web Developer",
];

let currentIndex = 0;
const textElement = document.getElementById("dynamic-text");

function animateText(text) {
  textElement.innerHTML = "";
  const words = text.split(" ");
  let letterDelay = 0;

  words.forEach((word, wordIndex) => {
    // Add space between words
    if (wordIndex > 0) {
      const spaceSpan = document.createElement("span");
      spaceSpan.innerHTML = "&nbsp;";
      spaceSpan.style.opacity = "1";
      spaceSpan.style.width = "0.5em";
      spaceSpan.style.display = "inline-block";
      textElement.appendChild(spaceSpan);
    }

    // Animate letters in each word
    [...word].forEach((letter) => {
      const span = document.createElement("span");
      span.textContent = letter;
      span.style.opacity = "0";
      span.style.display = "inline-block";
      textElement.appendChild(span);

      setTimeout(() => {
        span.style.animation = "slideIn 0.3s ease forwards";
      }, letterDelay);
      letterDelay += 50;
    });
  });

  // Wait and slide out
  setTimeout(() => {
    const letters = textElement.querySelectorAll('span:not([style*="width"])');
    letters.forEach((span, i) => {
      setTimeout(() => {
        span.style.animation = "slideOut 0.3s ease forwards";
      }, 30 * i);
    });

    setTimeout(changeText, letters.length * 30 + 300);
  }, text.length * 50 + 1500);
}

function changeText() {
  currentIndex = (currentIndex + 1) % titles.length;
  animateText(titles[currentIndex]);
}

// Start the animation
animateText(titles[0]);

// Lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const close = document.querySelector('.close');
    
    // Get all certificate images
    const certificateImages = document.querySelectorAll('.certificate-image');
    
    // Add click event to each certificate image
    certificateImages.forEach(img => {
        img.addEventListener('click', function() {
            lightbox.style.display = 'flex';
            lightboxImg.src = this.src;
        });
    });
    
    // Close lightbox when clicking the close button
    close.addEventListener('click', function() {
        lightbox.style.display = 'none';
    });
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // Attach sendEmail to the form's submit event
    const contactForm = document.querySelector('section.contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', sendEmail);
    }

    // Real-time validation
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    const inputs = {
        name: {
            element: document.getElementById('name'),
            validate: (value) => value.trim().length >= 2 || 'Name must be at least 2 characters'
        },
        email: {
            element: document.getElementById('email'),
            validate: (value) => {
                if (!value) return 'Email is required';
                return validateEmail(value) || 'Please enter a valid email address';
            }
        },
        number: {
            element: document.getElementById('number'),
            validate: (value) => {
                if (!value) return 'Phone number is required';
                return validatePhone(value) || 'Please enter a valid 10-digit number';
            }
        },
        subject: {
            element: document.getElementById('subject'),
            validate: (value) => value.trim().length >= 3 || 'Subject must be at least 3 characters'
        },
        message: {
            element: document.getElementById('Message'),
            validate: (value) => value.trim().length >= 10 || 'Message must be at least 10 characters'
        }
    };

    // Add real-time validation with debounce
    Object.keys(inputs).forEach(key => {
        const input = inputs[key];
        const validateWithDebounce = debounce((element) => {
            const result = input.validate(element.value);
            if (result === true) {
                removeError(element);
                element.classList.add('valid');
            } else {
                showError(element, result);
                element.classList.remove('valid');
            }
        }, 500); // 500ms debounce delay

        input.element.addEventListener('input', function() {
            validateWithDebounce(this);
        });

        // Validate on blur immediately
        input.element.addEventListener('blur', function() {
            const result = input.validate(this.value);
            if (result === true) {
                removeError(this);
                this.classList.add('valid');
            } else {
                showError(this, result);
                this.classList.remove('valid');
            }
        });
    });
});

// Form validation functions
function showError(input, message) {
  const formControl = input.parentElement;
  const errorDiv = formControl.querySelector('.error-message') || document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.innerText = message;
  if (!formControl.querySelector('.error-message')) {
    formControl.appendChild(errorDiv);
  }
  input.classList.add('error');
}

function removeError(input) {
  const formControl = input.parentElement;
  const errorDiv = formControl.querySelector('.error-message');
  if (errorDiv) {
    formControl.removeChild(errorDiv);
  }
  input.classList.remove('error');
}

function validateEmail(email) {
    // More comprehensive email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const isValid = emailRegex.test(email);
    return isValid;
}

function validatePhone(phone) {
    // Allow only numbers and exact length of 10
    const phoneRegex = /^\d{10}$/;
    const isValid = phoneRegex.test(phone.replace(/\D/g, ''));
    return isValid;
}

function validateForm() {
  let isValid = true;
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const number = document.getElementById('number');
  const subject = document.getElementById('subject');
  const message = document.getElementById('Message');

  // Name validation
  if (name.value.trim().length < 2) {
    showError(name, 'Name must be at least 2 characters');
    isValid = false;
  } else {
    removeError(name);
  }

  // Email validation
  if (!validateEmail(email.value)) {
    showError(email, 'Please enter a valid email address');
    isValid = false;
  } else {
    removeError(email);
  }

  // Phone validation
  if (!validatePhone(number.value)) {
    showError(number, 'Please enter a valid 10-digit phone number');
    isValid = false;
  } else {
    removeError(number);
  }

  // Subject validation
  if (subject.value.trim().length < 3) {
    showError(subject, 'Subject must be at least 3 characters');
    isValid = false;
  } else {
    removeError(subject);
  }

  // Message validation
  if (message.value.trim().length < 10) {
    showError(message, 'Message must be at least 10 characters');
    isValid = false;
  } else {
    removeError(message);
  }

  return isValid;
}

// Update sendEmail function
function sendEmail(event) {
  if (event) event.preventDefault();

  // Validate form before sending
  if (!validateForm()) {
    return; // Stop if validation fails
  }

  const submitBtn = document.getElementById("submit");
  const originalText = submitBtn.textContent;
  
  // Disable button and show loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Sending...";

  var params = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    number: document.getElementById("number").value.trim(),
    subject: document.getElementById("subject").value.trim(),
    message: document.getElementById("Message").value.trim(),
  };

  const serviceID = "service_5h6hpmr";
  const templateID = "template_b3y89oe";

  emailjs.send(serviceID, templateID, params)
    .then((res) => {
      // Clear all fields
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("number").value = "";
      document.getElementById("subject").value = "";
      document.getElementById("Message").value = "";
      console.log(res);
      alert("Your message has been sent successfully!");
    })
    .catch((err) => {
      console.log(err);
      alert("Failed to send message. Please try again later.");
    })
    .finally(() => {
      // Reset button state
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      submitBtn.classList.remove("sending");
    });
}