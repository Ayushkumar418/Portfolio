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

// GitHub Projects Integration
// ========================================
// Just add your repository names to this array!
// The script will fetch details from GitHub API automatically.
// ========================================

const GITHUB_USERNAME = 'Ayushkumar418';

// ADD YOUR PROJECT REPOSITORY NAMES HERE
const MY_PROJECTS = [
  'OS_SIMULATOR-Web_App',
  'SecBootKIVS',
  'Hostel-Management-System',
  'Student_Performance_Predictor',
  'VotingSystem',
  'student-data-manager'
];

// FALLBACK DATA - Used when GitHub API is rate limited
// Update this with your actual project info
const FALLBACK_PROJECTS = [
  {
    name: 'OS_SIMULATOR-Web_App',
    description: 'An interactive web-based Operating System simulator for learning OS concepts like process scheduling, memory management, and file systems.',
    language: 'JavaScript',
    html_url: 'https://github.com/Ayushkumar418/OS_SIMULATOR-Web_App',
    homepage: 'https://ayushkumar418.github.io/OS_SIMULATOR-Web_App/',
    stargazers_count: 0,
    forks_count: 0,
    topics: ['os', 'simulator', 'web-app']
  },
  {
    name: 'SecBootKIVS',
    description: 'Secure Boot Kernel Integrity Verification System - A security-focused project for boot process integrity.',
    language: 'Shell',
    html_url: 'https://github.com/Ayushkumar418/SecBootKIVS',
    homepage: '',
    stargazers_count: 0,
    forks_count: 0,
    topics: ['security', 'boot', 'linux']
  },
  {
    name: 'Hostel-Management-System',
    description: 'A comprehensive hostel management system for managing student accommodations, room allocations, and hostel operations.',
    language: 'JavaScript',
    html_url: 'https://github.com/Ayushkumar418/Hostel-Management-System',
    homepage: '',
    stargazers_count: 0,
    forks_count: 0,
    topics: ['hostel', 'management', 'web']
  },
  {
    name: 'Student_Performance_Predictor',
    description: 'Machine learning project to predict student academic performance based on various factors.',
    language: 'Python',
    html_url: 'https://github.com/Ayushkumar418/Student_Performance_Predictor',
    homepage: '',
    stargazers_count: 0,
    forks_count: 0,
    topics: ['ml', 'python', 'prediction']
  },
  {
    name: 'VotingSystem',
    description: 'A secure online voting system with authentication and result management features.',
    language: 'JavaScript',
    html_url: 'https://github.com/Ayushkumar418/VotingSystem',
    homepage: '',
    stargazers_count: 0,
    forks_count: 0,
    topics: ['voting', 'web', 'security']
  },
  {
    name: 'student-data-manager',
    description: 'A student data management application for handling student records and information.',
    language: 'Python',
    html_url: 'https://github.com/Ayushkumar418/student-data-manager',
    homepage: '',
    stargazers_count: 0,
    forks_count: 0,
    topics: ['data', 'management', 'python']
  }
];

// Language to icon mapping
const languageIcons = {
  'JavaScript': 'bxl-javascript',
  'HTML': 'bxl-html5',
  'CSS': 'bxl-css3',
  'Python': 'bxl-python',
  'Java': 'bxl-java',
  'TypeScript': 'bxl-typescript',
  'C++': 'bxs-file-cpp',
  'C': 'bxs-file-c',
  'Shell': 'bx-terminal',
  'default': 'bx-code-alt'
};

// Get language class for color dot
function getLanguageClass(language) {
  if (!language) return 'lang-default';
  const lang = language.toLowerCase().replace(/\+/g, 'p').replace(/#/g, 'sharp');
  return `lang-${lang}`;
}

// Get project icon based on language or name
function getProjectIcon(repo) {
  const name = repo.name.toLowerCase();

  // Check for specific project types
  if (name.includes('portfolio')) return 'bx-user';
  if (name.includes('weather')) return 'bx-cloud';
  if (name.includes('calculator')) return 'bx-calculator';
  if (name.includes('game') || name.includes('quiz')) return 'bx-game';
  if (name.includes('chat') || name.includes('message')) return 'bx-message-rounded-dots';
  if (name.includes('api') || name.includes('backend')) return 'bx-server';
  if (name.includes('blog') || name.includes('post')) return 'bx-edit';
  if (name.includes('shop') || name.includes('store') || name.includes('ecommerce')) return 'bx-cart';
  if (name.includes('music') || name.includes('audio')) return 'bx-music';
  if (name.includes('video') || name.includes('youtube')) return 'bx-video';
  if (name.includes('book') || name.includes('library')) return 'bx-book';
  if (name.includes('todo') || name.includes('task')) return 'bx-task';
  if (name.includes('dashboard') || name.includes('admin')) return 'bx-grid-alt';
  if (name.includes('simulator') || name.includes('os')) return 'bx-chip';
  if (name.includes('hostel') || name.includes('management')) return 'bx-building-house';
  if (name.includes('voting') || name.includes('vote')) return 'bx-check-square';
  if (name.includes('student') || name.includes('predictor')) return 'bx-line-chart';
  if (name.includes('boot') || name.includes('secure')) return 'bx-shield';
  if (name.includes('data') || name.includes('science')) return 'bx-data';
  if (name.includes('os') || name.includes('simulator')) return 'bx-chip';
  if (name.includes('codsoft')) return 'bx-code';
  if (name.includes('hostel') || name.includes('management')) return 'bx-building-house';


  // Fallback to language icon
  const langIcon = languageIcons[repo.language] || languageIcons['default'];
  return langIcon;
}

// Create project card HTML
function createProjectCard(repo) {
  const icon = getProjectIcon(repo);
  const description = repo.description || 'No description available';
  const language = repo.language || 'Unknown';
  const langClass = getLanguageClass(repo.language);

  return `
    <div class="project-card">
      <div class="project-header">
        <i class='bx ${icon} project-icon'></i>
        <div class="project-links">
          ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" title="Live Demo"><i class='bx bx-link-external'></i></a>` : ''}
          <a href="${repo.html_url}" target="_blank" title="View Code"><i class='bx bxl-github'></i></a>
        </div>
      </div>
      <h3 class="project-title">${repo.name.replace(/-|_/g, ' ')}</h3>
      <p class="project-description">${description}</p>
      <div class="project-tech">
        <span>${language}</span>
        ${repo.topics && repo.topics.length > 0 ? repo.topics.slice(0, 3).map(topic => `<span>${topic}</span>`).join('') : ''}
      </div>
      <div class="project-stats">
        <span class="stars"><i class='bx bxs-star'></i> ${repo.stargazers_count}</span>
        <span class="forks"><i class='bx bx-git-repo-forked'></i> ${repo.forks_count}</span>
        <span class="language"><span class="language-dot ${langClass}"></span> ${language}</span>
      </div>
    </div>
  `;
}

// Fetch a single repository's details from GitHub API
async function fetchRepoDetails(repoName) {
  try {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`, {
      headers: {
        'Accept': 'application/vnd.github.mercy-preview+json'
      }
    });

    if (response.status === 403) {
      console.error(`Rate limited or forbidden: ${repoName}`);
      throw new Error('RATE_LIMITED');
    }

    if (response.status === 404) {
      console.warn(`Repository not found: ${repoName}`);
      return null;
    }

    if (!response.ok) {
      console.warn(`Failed to fetch repo: ${repoName}, Status: ${response.status}`);
      return null;
    }

    const data = await response.json();
    console.log(`Fetched: ${repoName}`, data.name);
    return data;
  } catch (error) {
    if (error.message === 'RATE_LIMITED') {
      throw error;
    }
    console.error(`Error fetching ${repoName}:`, error);
    return null;
  }
}

// Fetch all projects from the MY_PROJECTS array
async function fetchMyProjects() {
  const results = [];

  for (const repoName of MY_PROJECTS) {
    const repo = await fetchRepoDetails(repoName);
    if (repo) {
      results.push(repo);
    }
  }

  return results;
}

// Cache key for localStorage
const PROJECTS_CACHE_KEY = 'portfolio_projects_cache';
const CACHE_TIMESTAMP_KEY = 'portfolio_projects_cache_time';

// Save projects to localStorage cache
function saveProjectsToCache(projects) {
  try {
    localStorage.setItem(PROJECTS_CACHE_KEY, JSON.stringify(projects));
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    console.log('Projects cached successfully!');
  } catch (e) {
    console.warn('Failed to cache projects:', e);
  }
}

// Get projects from localStorage cache
function getProjectsFromCache() {
  try {
    const cached = localStorage.getItem(PROJECTS_CACHE_KEY);
    if (cached) {
      const projects = JSON.parse(cached);
      const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
      if (timestamp) {
        const cacheAge = Date.now() - parseInt(timestamp);
        const hoursOld = Math.round(cacheAge / (1000 * 60 * 60));
        console.log(`Using cached projects (${hoursOld} hours old)`);
      }
      return projects;
    }
  } catch (e) {
    console.warn('Failed to read cache:', e);
  }
  return null;
}

// Get fallback projects (from cache or hardcoded)
function getFallbackProjects() {
  const cached = getProjectsFromCache();
  if (cached && cached.length > 0) {
    return cached;
  }
  return FALLBACK_PROJECTS;
}

// Load GitHub projects
async function loadGitHubProjects() {
  const loadingEl = document.getElementById('projects-loading');
  const gridEl = document.getElementById('projects-grid');
  const errorEl = document.getElementById('projects-error');

  // Show loading state
  loadingEl.style.display = 'flex';
  gridEl.innerHTML = '';
  errorEl.style.display = 'none';

  // Helper function to render projects
  function renderProjects(projects) {
    projects.forEach((repo, index) => {
      const card = document.createElement('div');
      card.innerHTML = createProjectCard(repo);
      card.firstElementChild.style.opacity = '0';
      card.firstElementChild.style.transform = 'translateY(20px)';
      gridEl.appendChild(card.firstElementChild);

      // Animate in
      setTimeout(() => {
        const addedCard = gridEl.children[index];
        if (addedCard) {
          addedCard.style.transition = 'all 0.5s ease';
          addedCard.style.opacity = '1';
          addedCard.style.transform = 'translateY(0)';
        }
      }, index * 100);
    });
  }

  try {
    console.log('Fetching projects from GitHub API...');
    console.log('Projects to fetch:', MY_PROJECTS);

    const repos = await fetchMyProjects();

    // Hide loading
    loadingEl.style.display = 'none';

    if (repos.length > 0) {
      console.log('Successfully loaded projects from API:', repos.length);

      // Save to cache for future use (auto-update)
      saveProjectsToCache(repos);

      // Render the fresh data
      renderProjects(repos);
    } else {
      // API returned no projects, use fallback
      console.log('No projects from API, using fallback...');
      const fallback = getFallbackProjects();
      renderProjects(fallback);
    }

  } catch (error) {
    console.error('API Error:', error.message);
    console.log('Using cached/fallback project data...');

    // Hide loading
    loadingEl.style.display = 'none';

    // Get best available fallback (cached > hardcoded)
    const fallback = getFallbackProjects();
    console.log('Fallback projects:', fallback.length);

    // Render fallback projects
    renderProjects(fallback);
  }
}

// Load projects when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  loadGitHubProjects();
});

// Lightbox functionality
document.addEventListener('DOMContentLoaded', function () {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const close = document.querySelector('.close');

  // Get all certificate images
  const certificateImages = document.querySelectorAll('.certificate-image');

  // Open lightbox function
  function openLightbox(imgSrc) {
    lightbox.style.display = 'flex';
    lightboxImg.src = imgSrc;
    // Trigger reflow for animation
    setTimeout(() => lightbox.classList.add('show'), 10);
    document.body.style.overflow = 'hidden'; // Prevent scroll
  }

  // Close lightbox function
  function closeLightbox() {
    lightbox.classList.remove('show');
    setTimeout(() => {
      lightbox.style.display = 'none';
      document.body.style.overflow = ''; // Restore scroll
    }, 300);
  }

  // Add click event to each certificate image
  certificateImages.forEach(img => {
    img.addEventListener('click', function () {
      openLightbox(this.src);
    });
  });

  // Close lightbox when clicking the close button
  close.addEventListener('click', closeLightbox);

  // Close lightbox when clicking outside the image
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close lightbox with Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
      closeLightbox();
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

    input.element.addEventListener('input', function () {
      validateWithDebounce(this);
    });

    // Validate on blur immediately
    input.element.addEventListener('blur', function () {
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

function showPopup(type, title, message) {
  // Create popup element
  const popup = document.createElement('div');
  popup.className = `popup ${type}`;
  popup.innerHTML = `
        <i class='bx ${type === 'success' ? 'bxs-check-circle' : 'bxs-x-circle'}'></i>
        <h2>${title}</h2>
        <p>${message}</p>
        <button onclick="this.parentElement.remove()">OK</button>
    `;
  document.body.appendChild(popup);

  // Show popup with animation
  setTimeout(() => popup.classList.add('show'), 10);

  // Auto remove after 5 seconds
  setTimeout(() => {
    popup.classList.remove('show');
    setTimeout(() => popup.remove(), 300);
  }, 5000);
}

function sendEmail(event) {
  if (event) event.preventDefault();

  // Validate form before sending
  if (!validateForm()) {
    return;
  }

  const submitBtn = document.getElementById("submit");
  const originalText = submitBtn.textContent;

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
      showPopup('success', 'Success!', 'Your message has been sent successfully!');
    })
    .catch((err) => {
      console.log(err);
      showPopup('error', 'Error!', 'Failed to send message. Please try again later.');
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      submitBtn.classList.remove("sending");
    });
}