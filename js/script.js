// fetch blog post
(async () => {
  const postsDiv = document.getElementById("posts");
  await fetch(
    "https://health.gov/myhealthfinder/api/v3/myhealthfinder.json?age=30&sex=male"
  )
    .then((res) => res.json())
    .then((data) => {
      const results = data.Result.Resources.all.Resource;
      const show1 = Math.floor(Math.random() * 10);
      const show2 =
        show1 === Math.floor(Math.random() * 10)
          ? Math.floor(Math.random() * 8) + 1
          : Math.floor(Math.random() * 10);
      results.forEach((result, i) => {
        if (i === show1 || i === show2) {
          postsDiv.innerHTML += `
          <div class="d-flex mb-4 post">
            <img
              src=${result.ImageUrl}
              class="img-fluid blog-img"
              alt=${result.ImageAlt}
            />
            <div class="content ml-4">
              <h6>${result.Title}</h6>
              <p> <a href=${result.AccessibleVersion} target="blank"> Read Post... </a></p>
            </div>
          </div>
          `;
        }
      });
    })
    .catch((error) => {
      return error;
    });
})();

// handle email
const submit = document.getElementById("submit_btn");
submit.addEventListener("click", () => {
  const client_name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const number = document.getElementById("number").value;
  const reason = document.getElementById("select").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const message = document.getElementById("message").value;
  const mail = document.getElementById("send_mail");
  const data = {
    "client name": client_name,
    email,
    number,
    reason,
    date,
    time,
    message,
  };
  mail.href = `mailto:admin@regency-hospital.com?cc=kelechiraja@regency-hospital.com&subject=New%20Appointment&body=${JSON.stringify(
    data
  )}`;
  console.log(mail);
});

//UI VARS
const header = document.querySelector("header");
(navLinks = document.querySelectorAll(".nav-link")),
  (sections = document.querySelectorAll("section"));
//Animate on Scroll
AOS.init({
  easing: "ease-in-out-sine",
  offset: 120,
  duration: 500,
});

// Listen for scrolling event on the browser
window.addEventListener("scroll", (e) => {
  const offset = window.pageYOffset;
  // Checks if 100px of the page has been scrolled
  if (offset > 100) {
    header.classList.add("header-scroll");
    // mainNav.classList.add('main-nav-scroll');
  } else {
    header.classList.remove("header-scroll");
    // mainNav.classList.remove('main-nav-scroll');
  }
});

// Set threshold for the observer
const options = {
  threshold: 0.5,
};

// Create a new intersection observer
let observer = new IntersectionObserver(navCheck, options);

function navCheck(entries) {
  entries.forEach((entry) => {
    // Get classname of the section in view
    const idName = entry.target.id;
    // Gets the links tied to its section
    const activeAnchor = document.querySelector(`[data-page=${idName}]`);
    // Checks if section is in view
    if (entry.isIntersecting) {
      // Clears the active class from all links
      for (i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove("active");
      }
      //   navLinks.forEach(navLink => {
      //   navLink.classList.remove('active');
      // });
      //Adds the class active to the link whose section is in view
      activeAnchor.classList.add("active");
    }
  });
}
sections.forEach((section) => {
  // Observes all section element on the page
  observer.observe(section);
});
