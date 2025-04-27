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
emailjs.init("oAS-cnz0TAfeeISZf");  // Replace with your actual public key

// Handle form submission
document.querySelector(".contact form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get form field values
    const fullName = document.querySelector(".contact input[placeholder='Full Name']").value.trim();
    const email = document.querySelector(".contact input[placeholder='Email Address']").value.trim();
    const mobileNumber = document.querySelector(".contact input[placeholder='Mobile Number']").value.trim();
    const emailSubject = document.querySelector(".contact input[placeholder='Email Subject']").value.trim();
    const message = document.querySelector(".contact textarea").value.trim();

    // Validate form fields
    if (!fullName || !email || !mobileNumber || !emailSubject || !message) {
        alert("Please fill in all the fields.");
        return;
    }

    // Prepare the email data
    const templateParams = {
        fullName: fullName,
        email: email,
        mobileNumber: mobileNumber,
        emailSubject: emailSubject,
        message: message,
    };

    // Send the email using EmailJS
    emailjs.send("service_h19uc1r", "template_n3t070j", templateParams)
        .then(function(response) {
            alert("Message sent successfully!");
            document.querySelector(".contact form").reset(); // Clear the form
        })
        .catch(function(error) {
            alert("Failed to send message. Please try again.");
            console.error("EmailJS Error:", error); // Log the error for debugging
            // Optionally, you can provide more user-friendly feedback based on the error
        });
});