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

  clone_desktop.querySelector("h1").textContent = number;

  document.getElementById("projects-desktop").appendChild(clone_desktop);
}

function new_skill(skill, isProficient) {
  let skill_template;
  if (isProficient) {
    skill_template = document.getElementById("skill-proficient-template");
  } else {
    skill_template = document.getElementById("skill-learning-template");
  }

  let clone_skill = skill_template.content.cloneNode(true);
  let skill_span = document.createElement("span");
  skill_span.textContent = skill;
  clone_skill.querySelector("li").appendChild(skill_span);

  document.getElementById("skills-container").appendChild(clone_skill);
}

function init() {
  console.log("Starting script");

  for (let i = 0; i < data.projects.length; i++) {
    new_project_mobile(data.projects[i]);
    new_project_desktop(data.projects[i], i + 1);
    new_skill(`Skill ${i + 1}`, 2 * i < data.projects.length);
  }

  // Tailwind CSS dark mode
  tailwind.config = {
    darkMode: "selector",
  };

  // Mobile navigation toggle
  const navToggle = document.getElementById("nav-toggle");
  const navContent = document.getElementById("nav-content");

  navToggle.addEventListener("click", () => {
    navContent.classList.toggle("hidden");
  });

  console.log("Script loaded");
}

document.addEventListener("DOMContentLoaded", init);
