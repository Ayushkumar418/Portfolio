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
});

// Update sendEmail to be used as a form submit handler
function sendEmail(event) {
  if (event) event.preventDefault();

  const submitBtn = document.getElementById("submit");
  const originalText = submitBtn.textContent;
  
  // Disable button and show loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Sending...";

  var params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    number: document.getElementById("number").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("Message").value,
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