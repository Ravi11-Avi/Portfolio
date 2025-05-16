// Navbar animation on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    setTimeout(() => {
        navbar.classList.add('show');
    }, 100);
});





// Clock initialization and setup
$(function() {
    // Cache selectors
    var clock = $('#clock'),
        alarm = clock.find('.alarm'),
        ampm = clock.find('.ampm');

    // Map digits to their names
    var digit_to_name = 'zero one two three four five six seven eight nine'.split(' ');

    // Object to hold digit elements
    var digits = {};

    // Positions for hours, minutes, and seconds
    var positions = ['h1', 'h2', ':', 'm1', 'm2', ':', 's1', 's2'];

    // Generate digits and add to the clock
    var digit_holder = clock.find('.digits');
    $.each(positions, function() {
        if (this == ':') {
            digit_holder.append('<div class="dots">');
        } else {
            var pos = $('<div>');
            for (var i = 1; i < 8; i++) {
                pos.append('<span class="d' + i + '">');
            }
            digits[this] = pos;
            digit_holder.append(pos);
        }
    });

    // Add weekday names
    var weekday_names = 'SUN MON TUE WED THU FRI SAT'.split(' '),
        weekday_holder = clock.find('.weekdays');
    $.each(weekday_names, function() {
        weekday_holder.append('<span>' + this + '</span>');
    });
    var weekdays = clock.find('.weekdays span');

    // Timer to update the clock every second
    (function update_time() {
        var now = moment().format("hhmmssdA");
        digits.h1.attr('class', digit_to_name[now[0]]);
        digits.h2.attr('class', digit_to_name[now[1]]);
        digits.m1.attr('class', digit_to_name[now[2]]);
        digits.m2.attr('class', digit_to_name[now[3]]);
        digits.s1.attr('class', digit_to_name[now[4]]);
        digits.s2.attr('class', digit_to_name[now[5]]);

        // Adjust day of the week
        var dow = now[6];
        if (dow < 0) {
            dow = 6;
        }
        weekdays.removeClass('active').eq(dow).addClass('active');

        // Set AM/PM text
        ampm.text(now[7] + now[8]);

        // Schedule next update
        setTimeout(update_time, 1000);
    })();
});







// Intersection Observer for animations
document.addEventListener("DOMContentLoaded", function() {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3});

    document.querySelectorAll(".About-me-Content").forEach(el => observer.observe(el));
    document.querySelectorAll(".single-word").forEach(el => observer.observe(el));
    document.querySelectorAll(".project-container").forEach(el => observer.observe(el));
    document.querySelectorAll(".title-work").forEach(el => observer.observe(el));
    document.querySelectorAll(".project-Menu").forEach(el => observer.observe(el));
    document.querySelectorAll(".My-Skills-title").forEach(el => observer.observe(el));
    document.querySelectorAll(".certificate-title").forEach(el => observer.observe(el));
    document.querySelectorAll("#Certificate-head").forEach(el => observer.observe(el));
    document.querySelectorAll(".content-container").forEach(el => observer.observe(el));
    document.querySelectorAll(".contact-us-container").forEach(el => observer.observe(el));
    document.querySelectorAll(".Blog-title").forEach(el => observer.observe(el));
    document.querySelectorAll(".blogs-menu button").forEach(el => observer.observe(el));
    document.querySelectorAll("#blog-content-container").forEach(el => observer.observe(el));
});








document.addEventListener("DOMContentLoaded", () => {
  const skillItems = document.querySelectorAll(".skills-container li, .social-media3 li, .social-media2 li");

  const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
              setTimeout(() => {
                  entry.target.classList.add("show");
              }, index * 150); // Delay effect for each item (150ms between each)
          }
      });
  }, { threshold: 0.1 });

  skillItems.forEach((item) => observer.observe(item));
});















// projects section

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

//show for all "All" except digital art
projectCards.forEach(card => {
    if (card.getAttribute('data-category') !== 'Digital-Art') {
    card.classList.remove('hidden');
  } else {
    card.classList.add('hidden');
  }
});
filterButtons.forEach(btn => {
  if (btn.getAttribute('data-category') === 'all') {
    btn.classList.add('active');
  }
});
filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent page jump
      const selectedCategory = button.getAttribute('data-category');

      // Remove active class from all buttons, add to clicked one
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Filter projects
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all') {
          // Show all except Digital-Art
          if (cardCategory !== 'Digital-Art') {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        } else if (cardCategory === selectedCategory) {
          // Show only the selected category
          card.classList.remove('hidden');
        } else {
          // Hide everything else
          card.classList.add('hidden');
        }
      });
    });
});







function openPopup() {
    document.getElementById("popup").style.display = "flex";
}
const closePopup=()=>{
    document.getElementById("popup").style.display ="none";
}
function openPopupLive() {
    document.getElementById("live-popup").style.display = "flex";
}
const closePopupLive=()=>{
    document.getElementById("live-popup").style.display ="none";
}





var swiper = new Swiper(".mySwiper", {
  loop: true,
  pagination: {
      el: ".swiper-pagination",
      clickable: true,
  },
  autoplay: {
    delay: 4000, // Change slide every 4 seconds
    disableOnInteraction: false,
},
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
  },
  
});











document.addEventListener("DOMContentLoaded", function () {
  fetch("projects.json")
    .then(response => response.json())
    .then(data => {
      const container = document.querySelector(".project-container");

      if (!container) {
        console.error("Error: .project-container not found!");
        return;
      }

      window.projects = data;

      data.forEach(project => {
        const card = document.createElement("div");
        card.classList.add("project-card");
        card.setAttribute("data-category", project.category);

        let mediaHTML = "";
        if (project.media) {
          mediaHTML = project.media
            .map(item =>
              item.type === "video"
                ? `<div class="swiper-slide"><video src="${item.src}" autoplay loop muted playsinline></video></div>`
                : `<div class="swiper-slide"><img src="${item.src}" alt="${project.title}"></div>`
            )
            .join("");
        }

        const buttonAction =
          project.category === "Game" || project.category === "Mini-Project"
            ? `onclick="openPopupLive(${project.id})"`
            : `onclick="openPopup(${project.id})"`;

        card.innerHTML = `
          <div class="swiper mySwiper">
              <div class="swiper-wrapper">${mediaHTML}</div>
              <div class="swiper-pagination"></div>
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
          </div>
          <div class="card-details">
              <h1>${project.title}</h1>
              <p>${project.description}</p>
          </div>
          <div class="card-buttons">
              <button class="github" onclick="window.open('${project.github}', '_blank')">
                  Git Repository <i class="fa-brands fa-github"></i>
              </button>
              <button class="show-more" ${buttonAction}>
                  Show More <i class="fa-solid fa-chevron-right"></i>
              </button>
          </div>
        `;

        container.appendChild(card);

        // Initialize Swiper for this card
        new Swiper(card.querySelector(".mySwiper"), {
          loop: true,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          autoplay: {
            delay: 4000,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      });

      applyFilters();
    })
    .catch(error => console.error("Error loading JSON:", error));
});


// if i want to show project insted of all

// function applyFilters() {
//   const filterButtons = document.querySelectorAll(".filter-btn");
//   const projectCards = document.querySelectorAll(".project-card");

//   // Set "Project" as the default filter
//   const defaultCategory = "Project";

//   // Remove the "hidden" class from cards in the "Project" category
//   projectCards.forEach(card => {
//     const cardCategory = card.getAttribute("data-category");
//     if (cardCategory === defaultCategory) {
//       card.classList.remove("hidden");
//     } else {
//       card.classList.add("hidden");
//     }
//   });







// Function to apply filters (same logic as your existing code)
function applyFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach(card => {
    if (card.getAttribute("data-category") !== "Digital-Art") {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });

  filterButtons.forEach(btn => {
    if (btn.getAttribute("data-category") === "all") {
      btn.classList.add("active");
    }
  });

  filterButtons.forEach(button => {
    button.addEventListener("click", e => {
      e.preventDefault(); // Prevent page jump
      const selectedCategory = button.getAttribute("data-category");

      // Remove active class from all buttons, add to clicked one
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter projects
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        if (selectedCategory === "all") {
          // Show all except Digital-Art
          if (cardCategory !== "Digital-Art") {
            card.classList.remove("hidden");
          } else {
            card.classList.add("hidden");
          }
        } else if (cardCategory === selectedCategory) {
          // Show only the selected category
          card.classList.remove("hidden");
        } else {
          // Hide everything else
          card.classList.add("hidden");
        }
      });
    });
  });
}

function openPopup(id) {
    const project = window.projects.find(p => p.id == id);

    if (!project) {
        console.error("Error: Project not found!");
        return;
    }

    // Clear existing content
    document.querySelector(".popup-show").innerHTML = "";
    document.querySelector(".popup-content").innerHTML = "";

    // Populate media inside the popup
    document.querySelector(".popup-show").innerHTML = `
        <div class="swiper mySwiper">
            <div class="swiper-wrapper">
                ${project.media.map(item =>
                    item.type === "video"
                        ? `<div class="swiper-slide"><video src="${item.src}" autoplay loop muted playsinline></video></div>`
                        : `<div class="swiper-slide"><img src="${item.src}" alt="${project.title}"></div>`
                ).join('')}
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
        </div>
    `;

    // Populate description
    document.querySelector(".popup-content").innerHTML = `
        <div class="About-popup">
            <h1>${project.title}</h1>
            <p>${project.description}</p>
            <ul class="language">${project.languages.map(lang => `<li>${lang}</li>`).join('')}</ul>
            <div class="gitLinks">
                <a href="${project.github}" target="_blank">Github Repository</a>
                <a href="${project.liveDemo}" target="_blank">Live Demo</a>
            </div>
        </div>
    `;

    // Show popup
    document.getElementById("popup").style.display = "flex";
}


function openPopup(id) {
  const project = window.projects.find(p => p.id == id);

  if (!project) {
      console.error("Error: Project not found!");
      return;
  }

  // Clear existing content
  document.querySelector(".popup-show").innerHTML = "";
  document.querySelector(".popup-content").innerHTML = "";

  // Populate media inside the popup
  document.querySelector(".popup-show").innerHTML = `
      <div class="swiper mySwiper">
          <div class="swiper-wrapper">
              ${project.media.map(item =>
                  item.type === "video"
                      ? `<div class="swiper-slide"><video src="${item.src}" autoplay loop muted playsinline></video></div>`
                      : `<div class="swiper-slide"><img src="${item.src}" alt="${project.title}"></div>`
              ).join('')}
          </div>
          <div class="swiper-pagination"></div>
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
      </div>
  `;

  // Populate description
  document.querySelector(".popup-content").innerHTML = `
      <div class="About-popup">
          <h1>${project.title}</h1>
          <p>${project.description}</p>
          <ul class="language">${project.languages.map(lang => `<li>${lang}</li>`).join('')}</ul>
          <div class="gitLinks">
              <a href="${project.github}" target="_blank">Github Repository</a>
              <a href="${project.liveDemo}" target="_blank">Live Demo</a>
          </div>
      </div>
  `;

  // Show popup
  document.getElementById("popup").style.display = "flex";
}












function openPopup(id) {
  const project = window.projects.find(p => p.id == id);
  if (!project) {
    console.error("Error: Project not found!");
    return;
  }

  const popupShow = document.querySelector(".popup-show");
  const popupDetails = document.querySelector(".popup-details"); // Target the new container

  popupShow.innerHTML = "";
  popupDetails.innerHTML = "";

  popupShow.innerHTML = `
    <div class="swiper mySwiper">
        <div class="swiper-wrapper">
            ${project.media.map(item =>
              item.type === "video"
                ? `<div class="swiper-slide"><video src="${item.src}" autoplay loop muted playsinline></video></div>`
                : `<div class="swiper-slide"><img src="${item.src}" alt="${project.title}"></div>`
            ).join('')}
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
    </div>
  `;

  popupDetails.innerHTML = `
    <div class="About-popup">
        <h1>${project.title}</h1>
        <p>${project.details}</p>
        <ul class="language">${project.languages.map(lang => `<li>${lang}</li>`).join('')}</ul>
        <div class="gitLinks">
            <a href="${project.github}" target="_blank">Github Repository  <i class="fa-brands fa-github"></i></a>
            <a href="${project.liveDemo}" target="_blank">Live Demo</a>
        </div>
    </div>
  `;

  document.getElementById("popup").style.display = "flex";

  new Swiper(popupShow.querySelector(".mySwiper"), {
    loop: true,
    pagination: { el: ".swiper-pagination", clickable: true },
    autoplay: { delay: 4000, disableOnInteraction: false },
    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
  });
}

function openPopupLive(id) {
  const project = window.projects.find(p => p.id == id);
  if (!project) {
    console.error("Error: Project not found!");
    return;
  }

  const livePopupShow = document.querySelector(".live-popup-show");
  const livePopupDetails = document.querySelector(".live-popup-details"); // Target the new container

  livePopupShow.innerHTML = "";
  livePopupDetails.innerHTML = "";

  livePopupShow.innerHTML = `
    <iframe src="${project.iframe}" allowfullscreen></iframe>
  `;

  livePopupDetails.innerHTML = `
    <div class="live-About-popup">
        <h1>${project.title}</h1>
        <p>${project.description}</p>
        <ul class="language">${project.languages.map(lang => `<li>${lang}</li>`).join('')}</ul>
        <div class="gitLinks">
            <a href="${project.github}" target="_blank">Github Repository  <i class="fa-brands fa-github"></i></a>
        </div>
    </div>
  `;

  document.getElementById("live-popup").style.display = "flex";
}





document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll("#Certificate-head li");
  const contentContainer = document.getElementById("content-container");
  const modal = document.getElementById("popup-modal");
  const modalContent = document.getElementById("modal-content");
  const closeModal = document.getElementById("close-modal");

  modal.style.display = "none";

  function loadCategory(category) {
      fetch("data.json")
          .then(response => response.json())
          .then(data => {
              contentContainer.innerHTML = ""; // Clear previous content

              let itemsToShow = [];

              if (category === "all") {
                  // Combine all categories into one array
                  Object.values(data).forEach(arr => {
                      itemsToShow = itemsToShow.concat(arr);
                  });
              } else {
                  itemsToShow = data[category] || [];
              }

              itemsToShow.forEach(item => {
                  const card = document.createElement("div");
                  card.classList.add("card");

                  card.innerHTML = `
                      <img src="${item.image}" alt="${item.title}">
                      <h3>${item.title}</h3>
                  `;

                  // Click event to open modal
                  card.addEventListener("click", () => {
                      modalContent.innerHTML = `
                      <div class ="certificate-pop">
                        <div>
                          <img src="${item.image}" alt="${item.title}">
                        </div>
                        <div class="certificate-details">
                          <h2>${item.title}</h2>
                          <p><strong>${item.company || item.provider || item.platform}</strong></p>
                          <p>${item.duration || item.year}</p>
                          <p>${item.description}</p>
                          <h5>${item.keypoint1}</h5>
                          <h5>${item.keypoint2}</h5>
                        </div>
                      </div>
                      `;
                      modal.style.display = "flex";
                  });

                  contentContainer.appendChild(card);
              });
          })
          .catch(error => console.error("Error loading JSON:", error));
  }

  // Add event listener to each menu item
  menuItems.forEach(item => {
    item.addEventListener("click", () => {
        const category = item.getAttribute("data-category");
        
        // Remove active class from all items
        menuItems.forEach(menu => menu.classList.remove("active"));
        
        // Add active class to the clicked item
        item.classList.add("active");

        loadCategory(category);
    });
});

// Load "All" category by default
loadCategory("all");

// Highlight the "All" category by default
const defaultCategory = document.querySelector('[data-category="all"]');
if (defaultCategory) {
    defaultCategory.classList.add("active");
}

// Close modal on button click
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close modal when clicking outside
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
});



document.addEventListener("DOMContentLoaded", () => {
  emailjs.init("SkaA_1nub-mthAJkc"); // Replace with your EmailJS Public Key

  const form = document.getElementById("contact-form");

  form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;
      const time = new Date().toLocaleString(); // Get current date & time

      const templateParams = {
          name: name,
          email: email,
          message: message,
          time: time
      };

      emailjs.send("service_6vee7fg", "template_82h0ure", templateParams)
          .then(() => {
              document.getElementById("status-message").innerText = "✅ Message sent successfully!";
              document.getElementById("status-message").style.color = "lightgreen";
              form.reset();
          })
          .catch((error) => {
              document.getElementById("status-message").innerText = "❌ Failed to send message!";
              document.getElementById("status-message").style.color = "red";
              console.error("EmailJS Error:", error);
          });
  });
});




document.getElementById("contact-container").style.display = "none";
document.getElementById("contactBtn").addEventListener("click", function() {
  document.getElementById("contact-container").style.display = "block";
  this.scrollIntoView({ behavior: "smooth" });
});












let CardData = {};

const blogConntant = document.getElementById("blog-content-container");
const blogPopup = document.getElementById("blog-popup");
const blogPopContent = document.getElementById("blog-popup-content");
const blogPopClose = document.getElementById("blog-popup-close"); // The close button

const Recent = document.getElementById("Recent");
const Blogs = document.getElementById("Bloges");
const DigitalArt = document.getElementById("Digital-Art");



fetch("blogANDart.json")
    .then(response => response.json())
    .then(data => {
        CardData = data;
        console.log("Data loaded: ", CardData); // Check if the data is loaded correctly
        showRecent(); // Show recent blog posts by default
    })
    .catch(error => {
        console.error("Error loading JSON:", error);
    });

const showRecent = () => {
    if (!CardData.Blogs) {
        console.log("No blogs found in the data.");
        return;
    }
    blogConntant.innerHTML = "";
    const RecentPost = CardData.Blogs.slice(-3);
    RecentPost.forEach(card => createCard(card, "Blogs"));
};

const createCard = (card, category) => {
    let cardElement = document.createElement("div");
    cardElement.classList.add(category === "Blogs" ? "blog-card" : "art-card");
    cardElement.onclick = () => showPopup(card, category);

    if (category === "Blogs") {
        cardElement.innerHTML = `
         
                <img src="${card.image}" alt="${card.title}" class="blog-card-image">
                <div class="blog-card-details">
                    <h1>${card.title}</h1>
                    <p>${card.content}</p>
                    <h5>-${card.author}</h5>

            </div>`;
    } else if (category === "Digital Art") {
        cardElement.innerHTML = `
            
                <img src="${card.image}" alt="${card.title}" class="art-card-image">
            `;
    }

    blogConntant.appendChild(cardElement);
};

function showPopup(card, category) {
    let details = "";

    if (category === "Blogs") {
        details = `
        
            <div class="blog-pop-imageContainer">
                <img src="${card.image}" alt="${card.title}">
            </div>
            <div class="blog-pop-content">
                <h2>${card.title}</h2>
                <p>${card.moredetails}</p>
                <p><strong>Author:</strong> ${card.author}</p>
                <p><strong>Year:</strong> ${card.year}</p>
            </div>`;
    } else if (category === "Digital Art") {
        details = `
           
            <div class="Art-pop">
            <img src="${card.image}" alt="${card.title}" class="popup-art-image">
           
            <p><strong>Year:</strong> ${card.year}</p>
            </div>`;
    }         

    blogPopContent.innerHTML = `${details} `;
    blogPopup.style.display = "flex"; // Display the popup
}

// Add event listeners for category buttons
Blogs.addEventListener("click", () => {
    blogConntant.innerHTML = "";
    CardData.Blogs.forEach(card => createCard(card, "Blogs"));
});

DigitalArt.addEventListener("click", () => {
    blogConntant.innerHTML = "";
    CardData.Art.forEach(card => createCard(card, "Digital Art"));
});

Recent.addEventListener("click", () => showRecent());

// Default "Recent" section on page load
document.addEventListener("DOMContentLoaded", () => {
    const Recent = document.getElementById("Recent");
    if (Recent && !Recent.classList.contains("active")) {
        Recent.click(); // Trigger click event to load "Recent" section
    }
});



blogPopClose.addEventListener("click", ()=>{
   blogPopup.style.display = "none"
})








const contactUsSection=()=>{
  event.preventDefault();
  document.getElementById("contact-me").scrollIntoView({ behavior: "smooth"   , block: "center"});
}

const AboutMeSection=()=>{
  event.preventDefault();
   document.getElementById("About-me").scrollIntoView({behavior:"smooth", block: "center"})
}

const WorkSection=()=>{
  event.preventDefault();
  document.getElementById("Works").scrollIntoView({behavior:"smooth", block: "center"})
}

const MySkillSection=()=>{
  event.preventDefault();
  document.getElementById("My-Skills").scrollIntoView({behavior:"smooth", block: "center"})

}

const ExpSection=()=>{
  event.preventDefault();
  document.getElementById("exprince").scrollIntoView({behavior:"smooth", block: "center"})

}

const HomeSection=()=>{
  event.preventDefault();
  document.getElementById("home").scrollIntoView({behavior:"smooth", block: "center"})

}



//Resume download

const DownloadResume =()=>{
  const pdf = "/pdf/CV.pdf"

  const Link = document.createElement('a')
  Link.href = pdf

  Link.download = "Ravi Ranjan Bhakt resume";

  document.body.appendChild(Link)
  Link.click()
  document.body.removeChild(Link)

  setTimeout(()=>{
    window.URL.revokeObjectURL(pdf)
  },100)
}