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

// Email handling
(function() {
    const EMAIL_CONFIG = {
        publicKey: "oAS-cnz0TAfeeISZf",
        serviceID: "service_h19uc1r",
        templateID: "template_n3t070j"
    };

    function loadEmailJS() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.emailjs.com/sdk/2.6.4/email.min.js';
            
            script.onload = function() {
                try {
                    emailjs.init(EMAIL_CONFIG.publicKey);
                    console.log("EmailJS initialized successfully");
                    resolve();
                } catch (error) {
                    reject(error);
                }
            };

            script.onerror = reject;
            document.body.appendChild(script);
        });
    }

    // Initialize EmailJS with async load
    window.addEventListener('load', () => {
        loadEmailJS().catch(error => console.error("EmailJS loading failed:", error));
    });
})();

// Handle form submission
document.querySelector(".contact form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = this;
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Get and validate form fields
    const formFields = {
        fullName: document.querySelector(".contact input[placeholder='Full Name']").value.trim(),
        email: document.querySelector(".contact input[placeholder='Email Address']").value.trim(),
        mobileNumber: document.querySelector(".contact input[placeholder='Mobile Number']").value.trim(),
        emailSubject: document.querySelector(".contact input[placeholder='Email Subject']").value.trim(),
        message: document.querySelector(".contact textarea").value.trim()
    };

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formFields.email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Validate all fields are filled
    if (Object.values(formFields).some(field => !field)) {
        alert("Please fill in all the fields.");
        return;
    }

    try {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';

        // Verify EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS is not loaded');
        }

        const emailPromise = emailjs.send(
            "service_h19uc1r",
            "template_n3t070j",
            {
                from_name: formFields.fullName, // Used in subject
                fullName: formFields.fullName,  // Used in content
                email: formFields.email,
                mobileNumber: formFields.mobileNumber,
                emailSubject: formFields.emailSubject,
                message: formFields.message
            }
        ).catch(error => {
            console.error("Send Error:", error);
            throw new Error(error.text || 'Failed to send email');
        });

        const response = await Promise.race([
            emailPromise,
            new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), 30000))
        ]);

        if (response.status === 200) {
            alert("Message sent successfully!");
            form.reset();
        }
    } catch (error) {
        console.error("EmailJS Error:", error);
        alert(error.message || "Failed to send message. Please try again later.");
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Submit';
    }
});

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
});
