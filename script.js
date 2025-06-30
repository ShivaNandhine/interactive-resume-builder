// Add live validation listeners
document.addEventListener("DOMContentLoaded", () => {
  const requiredFields = ["name", "email", "phone", "location", "summary"];

  requiredFields.forEach(id => {
    const field = document.getElementById(id);
    field.addEventListener("input", () => validateField(field));
    field.addEventListener("blur", () => validateField(field));
  });

  document.getElementById("email").addEventListener("input", validateEmail);
  document.getElementById("phone").addEventListener("input", validatePhone);

  // Skills live validation
  document.querySelectorAll(".skill").forEach(skill => {
    skill.addEventListener("change", validateSkills);
  });

  // Education block validation
  document.querySelectorAll(".edu-institute, .edu-degree, .edu-duration, .edu-percent").forEach(input => {
    input.addEventListener("input", validateEducation);
  });
});

// === Validation Functions ===
function validateField(field) {
  if (!field.value.trim()) {
    field.classList.add("input-error");
  } else {
    field.classList.remove("input-error");
  }
}

function validateEmail() {
  const email = document.getElementById("email");
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value.trim() && !regex.test(email.value.trim())) {
    email.classList.add("input-error");
  } else {
    email.classList.remove("input-error");
  }
}

function validatePhone() {
  const phone = document.getElementById("phone");
  const digits = phone.value.replace(/\D/g, "");
  if (phone.value.trim() && digits.length <= 10) {
    phone.classList.add("input-error");
  } else {
    phone.classList.remove("input-error");
  }
}

function validateSkills() {
  const skillsChecked = document.querySelectorAll(".skill:checked").length > 0;
  const container = document.getElementById("skills-container");
  if (!skillsChecked) {
    container.classList.add("input-error");
  } else {
    container.classList.remove("input-error");
  }
}

function validateEducation() {
  const entry = document.querySelector(".education-entry");
  const anyFilled = [...entry.querySelectorAll("input")].some(input => input.value.trim());
  if (!anyFilled) {
    entry.classList.add("input-error");
  } else {
    entry.classList.remove("input-error");
  }
}

// === Auto-resizing Textareas ===
document.querySelectorAll("textarea").forEach(textarea => {
  textarea.addEventListener("input", () => autoResizeTextarea(textarea));
});

function autoResizeTextarea(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

// === Live Preview: Basic Info ===
document.getElementById("name").addEventListener("input", () => {
  document.getElementById("preview-name").textContent = document.getElementById("name").value || "Your Name";
});

["email", "phone", "location"].forEach(id => {
  document.getElementById(id).addEventListener("input", updateContact);
});

function updateContact() {
  document.getElementById("preview-email").textContent = document.getElementById("email").value || "your.email@example.com";
  document.getElementById("preview-phone").textContent = document.getElementById("phone").value || "0000000000";
  document.getElementById("preview-location").textContent = document.getElementById("location").value || "Your City";
}

document.getElementById("linkedin").addEventListener("input", () => {
  const link = document.getElementById("linkedin").value.replace(/^https?:\/\//, "").replace(/^www\./, "");
  document.getElementById("preview-linkedin").textContent = link || "linkedin.com/in/yourprofile";
});

document.getElementById("github").addEventListener("input", () => {
  const link = document.getElementById("github").value.replace(/^https?:\/\//, "").replace(/^www\./, "");
  document.getElementById("preview-github").textContent = link || "github.com/yourprofile";
});

document.getElementById("summary").addEventListener("input", () => {
  document.getElementById("preview-summary").textContent = document.getElementById("summary").value || "A brief profile summary will appear here...";
});

// === Skills Update ===
document.querySelectorAll(".skill").forEach(skill => {
  skill.addEventListener("change", updateSkillsPreview);
});

function updateSkillsPreview() {
  const skillsList = document.getElementById("preview-skills");
  skillsList.innerHTML = "";
  document.querySelectorAll(".skill:checked").forEach(skill => {
    const li = document.createElement("li");
    li.textContent = skill.value;
    skillsList.appendChild(li);
  });
}

// === Add Dynamic Entries ===
function addEducation() {
  const container = document.getElementById("education-fields");
  const div = document.createElement("div");
  div.classList.add("education-entry");
  div.innerHTML = `
    <input type="text" placeholder="Institute Name" class="edu-institute" />
    <input type="text" placeholder="Degree" class="edu-degree" />
    <input type="text" placeholder="Duration" class="edu-duration" />
    <input type="text" placeholder="Percentage" class="edu-percent" />
  `;
  container.appendChild(div);
}

function addExperience() {
  const container = document.getElementById("experience-fields");
  const div = document.createElement("div");
  div.classList.add("experience-entry");
  div.innerHTML = `
    <input type="text" placeholder="Company Name" class="exp-company" />
    <input type="text" placeholder="Role" class="exp-role" />
    <input type="text" placeholder="Duration" class="exp-duration" />
  `;
  container.appendChild(div);
}

function addProject() {
  const container = document.getElementById("project-fields");
  const div = document.createElement("div");
  div.classList.add("project-entry");
  div.innerHTML = `
    <input type="text" placeholder="Project Title" class="project-title" />
    <textarea rows="2" placeholder="Project Description" class="project-desc"></textarea>
  `;
  container.appendChild(div);
}

function handleOtherSkill(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const input = event.target;
    const skillValue = input.value.trim();
    if (skillValue) {
      const label = document.createElement("label");
      label.innerHTML = `<input type="checkbox" class="skill" value="${skillValue}" checked /> ${skillValue}`;
      document.getElementById("skills-container").appendChild(label);
      input.value = "";
      updateSkillsPreview();
    }
  }
}

function handleCertInput(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const input = event.target;
    const certValue = input.value.trim();
    if (certValue) {
      const li = document.createElement("li");
      li.textContent = certValue;
      li.addEventListener("click", () => li.remove());
      document.getElementById("certification-list").appendChild(li);
      input.value = "";
    }
  }
}

function handleAchieveInput(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const input = event.target;
    const achieveValue = input.value.trim();
    if (achieveValue) {
      const li = document.createElement("li");
      li.textContent = achieveValue;
      li.addEventListener("click", () => li.remove());
      document.getElementById("achievement-list").appendChild(li);
      input.value = "";
    }
  }
}

// === Live Preview Update (Every Second) ===
setInterval(() => {
  const eduList = document.getElementById("preview-education");
  eduList.innerHTML = "";
  document.querySelectorAll(".education-entry").forEach(entry => {
    const inst = entry.querySelector(".edu-institute")?.value;
    const deg = entry.querySelector(".edu-degree")?.value;
    const dur = entry.querySelector(".edu-duration")?.value;
    const percent = entry.querySelector(".edu-percent")?.value;

    if (inst || deg || dur) {
      const li = document.createElement("li");
      li.textContent = `${deg || ""} at ${inst || ""} (${dur || ""}) ${percent ? "- " + percent + "%" : ""}`;
      eduList.appendChild(li);
    }
  });

  const expList = document.getElementById("preview-experience");
  expList.innerHTML = "";
  document.querySelectorAll(".experience-entry").forEach(entry => {
    const comp = entry.querySelector(".exp-company")?.value;
    const role = entry.querySelector(".exp-role")?.value;
    const dur = entry.querySelector(".exp-duration")?.value;

    if (comp || role || dur) {
      const li = document.createElement("li");
      li.textContent = `${role || ""} at ${comp || ""} (${dur || ""})`;
      expList.appendChild(li);
    }
  });

  const projectList = document.getElementById("preview-projects");
  const projectSection = document.getElementById("preview-projects-section");
  projectList.innerHTML = "";
  let hasProject = false;

  document.querySelectorAll(".project-entry").forEach(entry => {
    const title = entry.querySelector(".project-title")?.value.trim();
    const desc = entry.querySelector(".project-desc")?.value.trim();
    if (title || desc) {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${title || "Untitled Project"}</strong>: ${desc || "No description."}`;
      projectList.appendChild(li);
      hasProject = true;
    }
  });

  projectSection.style.display = hasProject ? "block" : "none";

  const certPreview = document.getElementById("preview-certifications");
  const certItems = document.querySelectorAll("#certification-list li");
  certPreview.innerHTML = "";
  certItems.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.textContent;
    certPreview.appendChild(li);
  });
  document.getElementById("preview-certifications-section").style.display = certItems.length ? "block" : "none";

  const achievePreview = document.getElementById("preview-achievements");
  const achieveItems = document.querySelectorAll("#achievement-list li");
  achievePreview.innerHTML = "";
  achieveItems.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.textContent;
    achievePreview.appendChild(li);
  });
  document.getElementById("preview-achievements-section").style.display = achieveItems.length ? "block" : "none";

  updateProgressBar();
}, 1000);

// === PDF Download ===
function downloadPDF() {
  const element = document.getElementById("resume-box");

  document.body.classList.add("pdf-mode");

  const opt = {
    margin: 0.5,
    filename: "resume.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      scrollY: 0
    },
    jsPDF: {
      unit: "in",
      format: "letter",
      orientation: "portrait"
    },
    pagebreak: {
      mode: ['css', 'legacy'], // enables CSS breaks
      avoid: ['.avoid-break']
    }
  };

  html2pdf().set(opt).from(element).save().then(() => {
    document.body.classList.remove("pdf-mode");
  });
}

// === Reset Form ===
function resetForm() {
  document.getElementById("resume-form").reset();
  document.getElementById("preview-name").textContent = "Your Name";
  document.getElementById("preview-email").textContent = "your.email@example.com";
  document.getElementById("preview-phone").textContent = "0000000000";
  document.getElementById("preview-location").textContent = "Your City";
  document.getElementById("preview-linkedin").textContent = "linkedin.com/in/yourprofile";
  document.getElementById("preview-github").textContent = "github.com/yourprofile";
  document.getElementById("preview-summary").textContent = "A brief profile summary will appear here...";
  document.getElementById("preview-skills").innerHTML = "";
  document.getElementById("preview-education").innerHTML = "";
  document.getElementById("preview-experience").innerHTML = "";
  document.getElementById("preview-projects").innerHTML = "";
  document.getElementById("preview-certifications").innerHTML = "";
  document.getElementById("preview-achievements").innerHTML = "";

  document.getElementById("education-fields").innerHTML = `
    <div class="education-entry">
      <input type="text" placeholder="Institute Name" class="edu-institute" />
      <input type="text" placeholder="Degree" class="edu-degree" />
      <input type="text" placeholder="Duration" class="edu-duration" />
      <input type="text" placeholder="Percentage" class="edu-percent" />
    </div>
  `;

  document.getElementById("experience-fields").innerHTML = `
    <div class="experience-entry">
      <input type="text" placeholder="Company Name" class="exp-company" />
      <input type="text" placeholder="Role" class="exp-role" />
      <input type="text" placeholder="Duration" class="exp-duration" />
    </div>
  `;

  document.getElementById("project-fields").innerHTML = `
    <div class="project-entry">
      <input type="text" placeholder="Project Title" class="project-title" />
      <textarea rows="2" placeholder="Project Description" class="project-desc"></textarea>
    </div>
  `;

  document.querySelectorAll(".skills-group input[type='checkbox']").forEach(cb => cb.checked = false);

  document.querySelectorAll("#skills-container label").forEach(label => {
    const input = label.querySelector("input.skill");
    if (input && input.value && !["HTML5", "CSS3", "JavaScript", "Python", "Java", "C", "SQL"].includes(input.value)) {
      label.remove();
    }
  });

  document.getElementById("certification-list").innerHTML = "";
  document.getElementById("achievement-list").innerHTML = "";
  document.getElementById("preview-projects-section").style.display = "none";
  document.getElementById("preview-certifications-section").style.display = "none";
  document.getElementById("preview-achievements-section").style.display = "none";

  updateProgressBar();
}

// === Progress Bar Update ===
function updateProgressBar() {
  const requiredFieldIds = ["name", "email", "phone", "location", "summary"];
  let filledCount = 0;

  requiredFieldIds.forEach(id => {
    const input = document.getElementById(id);
    if (input && input.value.trim()) filledCount++;
  });

  if (document.querySelectorAll(".skill:checked").length > 0) filledCount++;

  let hasEducation = false;
  document.querySelectorAll(".education-entry").forEach(entry => {
    if ([...entry.querySelectorAll("input")].some(input => input.value.trim())) hasEducation = true;
  });
  if (hasEducation) filledCount++;

  let hasExperience = false;
  document.querySelectorAll(".experience-entry").forEach(entry => {
    if ([...entry.querySelectorAll("input")].some(input => input.value.trim())) hasExperience = true;
  });
  if (hasExperience) filledCount++;

  if (document.getElementById("linkedin").value.trim()) filledCount++;
  if (document.getElementById("github").value.trim()) filledCount++;

  const totalSteps = 10;
  const percent = Math.round((filledCount / totalSteps) * 100);
  document.getElementById("progress-bar").style.width = percent + "%";
}

