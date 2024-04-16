import data from "./data.json" assert { type: "json" };

function new_project_mobile(data) {
  let template = document.getElementById("project-template-mobile");

  let clone_mobile = template.content.cloneNode(true);

  let img = clone_mobile.querySelectorAll("img");
  img[0].src = data.image;
  img[0].alt = data.alt;
  img[1].src = data.image;
  img[1].alt = data.alt;
  let h3 = clone_mobile.querySelectorAll("h3");
  h3[0].textContent = data.title;
  h3[1].textContent = data.title;
  clone_mobile.querySelector(".project-description").textContent =
    data.short_description + " " + data.description;
  let a = clone_mobile.querySelectorAll("a");
  a[0].href = data.link;
  a[1].href = data.link;
  a[2].href = data.link;

  let tech = clone_mobile.querySelector(".project-tech");
  data.tech.forEach((element) => {
    let skill = document.createElement("i");
    skill.className = element;
    tech.appendChild(skill);
  });

  document.getElementById("projects-mobile").appendChild(clone_mobile);
}

function new_project_desktop(data, number) {
  let template = document.getElementById("project-template-desktop");

  let clone_desktop = template.content.cloneNode(true);

  let img = clone_desktop.querySelectorAll("img");
  for (let i = 0; i < img.length; i++) {
    img[i].src = data.image;
    img[i].alt = data.alt;
  }
  let h3 = clone_desktop.querySelectorAll("h3");
  for (let i = 0; i < h3.length; i++) {
    h3[i].textContent = data.title;
  }
  let sdesc = clone_desktop.querySelectorAll(".short-description");
  for (let i = 0; i < sdesc.length; i++) {
    sdesc[i].textContent = data.short_description;
  }
  clone_desktop.querySelector(".project-description").textContent =
    data.description;
  let a = clone_desktop.querySelectorAll("a");
  for (let i = 0; i < a.length; i++) {
    a[i].href = data.link;
  }

  let tech = clone_desktop.querySelector(".project-tech");
  data.tech.forEach((element) => {
    let skill = document.createElement("i");
    skill.className = element;
    tech.appendChild(skill);
  });

  let project_card = clone_desktop.querySelector(".project-card");
  if (number % 2) {
    project_card.classList.add("flex-row-reverse");
    project_card.classList.add("left-timeline");
  } else {
    project_card.style.flexDirection = "row";
    project_card.classList.add("right-timeline");
  }

  let arrow = document.createElement("i");
  if (number % 2) {
    arrow.className = "fas fa-chevron-left";
  } else {
    arrow.className = "fas fa-chevron-right";
  }
  clone_desktop.querySelector("h1").appendChild(arrow);

  document.getElementById("projects-desktop").appendChild(clone_desktop);
}

function new_skill(skill_name, number) {
  let skill_template = document.getElementById("skill-template");

  let skill_proficient = document.getElementById("skill-proficient-svg");

  let clone_skill = skill_template.content.cloneNode(true);

  let skill_span = document.createElement("span");
  skill_span.textContent = skill_name;

  let skill = clone_skill.querySelector("li");
  skill.appendChild(skill_span);
  skill.setAttribute("data-aos-delay", `${number * 150}`);
  let skill_svg = skill.querySelector("svg");

  function replaceSVG() {
    setTimeout(() => {
      skill_svg.replaceWith(skill_proficient.content.cloneNode(true));
    }, 100);
  }

  skill.addEventListener("transitionend", replaceSVG, { once: true });

  document.getElementById("skills-container").appendChild(clone_skill);
}

function typingEffect() {
  let i = 1;
  let txt = "I am Parth, a coding enthusiast.";
  document.getElementById("typing-effect").textContent = txt.charAt(0);
  let speed = 50;

  function typeWriter() {
    if (i < txt.length) {
      document.getElementById("typing-effect").textContent += txt.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }

  setTimeout(typeWriter, speed);
}

function submitForm() {
  let form = document.getElementById("contact-form");

  let data = new FormData(form);
  data = Object.fromEntries(data.entries());

  let url =
    "https://script.google.com/macros/s/AKfycbzDn4APmXzAYuuVRd22ev5DFzncFxHfnwC-fuoXg8N-gfrUPYbws_2jcUSc7QfEtZmN/exec";

  fetch(url, {
    redirect: "follow",
    method: "POST",
    contentType: "text/plain",
    cors: "no-cors",
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 200) {
        form.reset();
        alert("Message sent successfully!");
      } else {
        alert("There was an error sending your message. Please try again.");
      }
    })
    .catch((error) => {
      // console.error("Error:", error);
      alert("There was an error sending your message. Please try again.");
    });
}

function init() {
  // console.log("Starting script");

  // Add Projects
  for (let i = 0; i < data.projects.length; i++) {
    new_project_mobile(data.projects[i]);
    new_project_desktop(data.projects[i], i + 1);
  }
  const EOJ = document.getElementById("project-template-EOJ");
  const EOJ_clone = EOJ.content.cloneNode(true);
  document.getElementById("projects-desktop").appendChild(EOJ_clone);

  // Add Skills
  for (let i = 0; i < data.skills.proficient.length; i++) {
    new_skill(data.skills.proficient[i], i + 1);
  }

  AOS.init({
    duration: 600,
    once: true,
  });

  // Tailwind CSS dark mode
  tailwind.config = {
    darkMode: "selector",
  };

  setTimeout(typingEffect, 700);

  // Mobile navigation toggle
  const navToggle = document.getElementById("nav-toggle");
  const navContent = document.getElementById("nav-content");

  navToggle.addEventListener("click", () => {
    navContent.classList.toggle("hidden");
  });

  // Form submission
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitForm();
  });

  // add email ID
  const email = document.getElementById("mail-id");
  const mail = "psp90804@gmail.com";
  email.textContent = mail;
  email.href = `mailto:${mail}`;

  // console.log("Script loaded");
}

document.addEventListener("DOMContentLoaded", init);
