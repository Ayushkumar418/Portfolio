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

// contact send message on gmail
// Initialize EmailJS with Public Key
emailjs.init("oAS-cnz0TAfeeISZf"); // Replace with your actual public key

// Handle form submission
document.querySelector(".contact form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = this;
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Get form field values
    const fullName = document.querySelector(".contact input[placeholder='Full Name']").value.trim();
    const email = document.querySelector(".contact input[placeholder='Email Address']").value.trim();
    const mobileNumber = document.querySelector(".contact input[placeholder='Mobile Number']").value.trim();
    const emailSubject = document.querySelector(".contact input[placeholder='Email Subject']").value.trim();
    const message = document.querySelector(".contact textarea").value.trim();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Validate form fields
    if (!fullName || !email || !mobileNumber || !emailSubject || !message) {
        alert("Please fill in all the fields.");
        return;
    }

    try {
        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        const templateParams = {
            from_name: fullName,
            email_id: email,
            phone: mobileNumber,
            subject: emailSubject,
            message: message
        };

        const response = await emailjs.send("service_h19uc1r", "template_n3t070j", templateParams);
        
        if (response.status === 200) {
            alert("Message sent successfully!");
            form.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        console.error("EmailJS Error:", error);
        alert("Failed to send message. Please try again later.");
    } finally {
        // Re-enable submit button and restore text
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
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
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const certificateImages = document.querySelectorAll('.certificate-image');

certificateImages.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'block';
        lightboxImg.src = img.src.replace('c2.jpg', 'c.jpg');
    });
});

document.querySelector('.close').addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});
