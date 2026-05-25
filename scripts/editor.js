let currentData = null;
let saveTimeout = null;

function initEditor() {
  const panel = document.getElementById("editor-panel");
  if (!panel) return;
  renderEditor(panel);
}

function renderEditor(container) {
  container.innerHTML =
    '<div class="editor-header">' +
    "<h2>CV Editor</h2>" +
    '<span id="save-status" class="save-status">Ready</span>' +
    "</div>" +
    '<div class="editor-tabs">' +
    '<button class="editor-tab active" data-tab="content">Content</button>' +
    '<button class="editor-tab" data-tab="customize">Customize</button>' +
    "</div>" +
    '<div class="editor-body" id="editor-body">' +
    renderContentTab() +
    "</div>";
}

function renderContentTab() {
  const d = currentData;
  return (
    renderSection("personal", "Personal Info", renderPersonalFields(d)) +
    renderSection("profile", "Profile", renderProfileFields(d)) +
    renderSection("skills-editor", "Skills", renderSkillsFields(d)) +
    renderSection("education-editor", "Education", renderEducationFields(d)) +
    renderSection("experience-editor", "Experience", renderExperienceFields(d)) +
    renderSection("projects-editor", "Projects", renderProjectFields(d))
  );
}

function renderSection(dataSection, title, fields) {
  return (
    '<div class="editor-section">' +
    '<h3 class="editor-section-title" data-section="' +
    dataSection +
    '">' +
    title +
    "</h3>" +
    '<div class="editor-section-body">' +
    fields +
    "</div>" +
    "</div>"
  );
}

function renderPersonalFields(d) {
  const p = d.personal;
  return (
    '<label>Full Name</label><input type="text" id="ef-name" value="' +
    escapeHtml(p.fullName) +
    '">' +
    '<label>Title</label><input type="text" id="ef-title" value="' +
    escapeHtml(p.title) +
    '">' +
    '<label>Location</label><input type="text" id="ef-location" value="' +
    escapeHtml(p.location) +
    '">' +
    '<label>Phone</label><input type="text" id="ef-phone" value="' +
    escapeHtml(p.phone) +
    '">' +
    '<label>Email</label><input type="email" id="ef-email" value="' +
    escapeHtml(p.email) +
    '">' +
    '<label>GitHub</label><input type="url" id="ef-github" value="' +
    escapeHtml(p.github) +
    '">' +
    '<label>LinkedIn</label><input type="url" id="ef-linkedin" value="' +
    escapeHtml(p.linkedin) +
    '">' +
    '<label>Portfolio</label><input type="url" id="ef-portfolio" value="' +
    escapeHtml(p.portfolio) +
    '">'
  );
}

function renderProfileFields(d) {
  const pr = d.profile;
  return (
    '<label class="checkbox-label"><input type="checkbox" id="ef-profile-visible"' +
    (pr.visible ? " checked" : "") +
    "> Show Profile Section</label>" +
    '<label>Section Title</label><input type="text" id="ef-profile-title" value="' +
    escapeHtml(pr.title) +
    '">' +
    '<label>Profile Text</label><textarea id="ef-profile-text" rows="4" maxlength="500">' +
    escapeHtml(pr.text) +
    '</textarea><span class="char-count"><span id="profile-char-count">' +
    pr.text.length +
    "</span>/500</span>"
  );
}

function renderSkillsFields(d) {
  const sk = d.skills;
  return (
    '<label class="checkbox-label"><input type="checkbox" id="ef-skills-visible"' +
    (sk.visible ? " checked" : "") +
    "> Show Skills Section</label>" +
    '<label>Section Title</label><input type="text" id="ef-skills-title" value="' +
    escapeHtml(sk.title) +
    '"><div id="skills-list">' +
    sk.categories
      .map((cat, i) => renderSkillCategory(cat, i))
      .join("") +
    '</div><button class="btn btn-sm btn-add" onclick="addSkillCategory()">+ Add Category</button>'
  );
}

function renderEducationFields(d) {
  const ed = d.education;
  return (
    '<label class="checkbox-label"><input type="checkbox" id="ef-edu-visible"' +
    (ed.visible ? " checked" : "") +
    "> Show Education Section</label>" +
    '<label>Section Title</label><input type="text" id="ef-edu-title" value="' +
    escapeHtml(ed.title) +
    '"><div id="education-list">' +
    ed.items
      .map((item, i) => renderEducationItem(item, i))
      .join("") +
    '</div><button class="btn btn-sm btn-add" onclick="addEducationItem()">+ Add Education</button>'
  );
}

function renderExperienceFields(d) {
  const ex = d.experience;
  return (
    '<label class="checkbox-label"><input type="checkbox" id="ef-experience-visible"' +
    (ex.visible ? " checked" : "") +
    "> Show Experience Section</label>" +
    '<label>Section Title</label><input type="text" id="ef-experience-title" value="' +
    escapeHtml(ex.title) +
    '"><div id="experience-list">' +
    ex.items
      .map((item, i) => renderExperienceItem(item, i))
      .join("") +
    '</div><button class="btn btn-sm btn-add" onclick="addExperienceItem()">+ Add Experience</button>'
  );
}

function renderProjectFields(d) {
  const pr = d.projects;
  return (
    '<label class="checkbox-label"><input type="checkbox" id="ef-projects-visible"' +
    (pr.visible ? " checked" : "") +
    "> Show Projects Section</label>" +
    '<label>Section Title</label><input type="text" id="ef-projects-title" value="' +
    escapeHtml(pr.title) +
    '"><div id="projects-list">' +
    pr.items
      .map((proj, i) => renderProjectItem(proj, i))
      .join("") +
    '</div><button class="btn btn-sm btn-add" onclick="addProject()">+ Add Project</button>'
  );
}

function renderSkillCategory(cat, i) {
  return (
    '<div class="editor-item" data-index="' +
    i +
    '"><div class="editor-item-header"><span>' +
    escapeHtml(cat.category) +
    '</span><div class="editor-item-actions">' +
    '<button class="btn-icon" onclick="moveSkillCategory(' +
    i +
    ',-1)" aria-label="Move up">\u25B2</button>' +
    '<button class="btn-icon" onclick="moveSkillCategory(' +
    i +
    ',1)" aria-label="Move down">\u25BC</button>' +
    '<button class="btn-icon btn-icon-danger" onclick="deleteSkillCategory(' +
    i +
    ')" aria-label="Delete">\u2716</button>' +
    "</div></div>" +
    '<div class="editor-item-body">' +
    "<label>Category Name</label>" +
    '<input type="text" class="ef-skill-cat" value="' +
    escapeHtml(cat.category) +
    '" maxlength="90">' +
    '<span class="char-count"><span class="skill-cat-count">' +
    escapeHtml(cat.category).length +
    "</span>/90</span>" +
    "<label>Skills (comma separated)</label>" +
    '<input type="text" class="ef-skill-items" value="' +
    escapeHtml(cat.items.join(", ")) +
    '">' +
    "</div></div>"
  );
}

function renderEducationItem(item, i) {
  return (
    '<div class="editor-item" data-index="' +
    i +
    '"><div class="editor-item-header"><span>' +
    escapeHtml(item.title) +
    '</span><div class="editor-item-actions">' +
    '<button class="btn-icon" onclick="moveEducationItem(' +
    i +
    ',-1)" aria-label="Move up">\u25B2</button>' +
    '<button class="btn-icon" onclick="moveEducationItem(' +
    i +
    ',1)" aria-label="Move down">\u25BC</button>' +
    '<button class="btn-icon btn-icon-danger" onclick="deleteEducationItem(' +
    i +
    ')" aria-label="Delete">\u2716</button>' +
    "</div></div>" +
    '<div class="editor-item-body">' +
    "<label>Title</label>" +
    '<input type="text" class="ef-edu-title" value="' +
    escapeHtml(item.title) +
    '">' +
    "<label>School</label>" +
    '<input type="text" class="ef-edu-school" value="' +
    escapeHtml(item.school) +
    '">' +
    "<label>Description</label>" +
    '<textarea class="ef-edu-desc" rows="2" maxlength="95">' +
    escapeHtml(item.description) +
    '</textarea><span class="char-count"><span class="edu-desc-count">' +
    escapeHtml(item.description).length +
    "</span>/95</span>" +
    "</div></div>"
  );
}

function renderExperienceItem(item, i) {
  return (
    '<div class="editor-item" data-index="' +
    i +
    '"><div class="editor-item-header"><span>' +
    escapeHtml(item.role) +
    " @ " +
    escapeHtml(item.company) +
    '</span><div class="editor-item-actions">' +
    '<button class="btn-icon" onclick="moveExperienceItem(' +
    i +
    ',-1)" aria-label="Move up">\u25B2</button>' +
    '<button class="btn-icon" onclick="moveExperienceItem(' +
    i +
    ',1)" aria-label="Move down">\u25BC</button>' +
    '<button class="btn-icon btn-icon-danger" onclick="deleteExperienceItem(' +
    i +
    ')" aria-label="Delete">\u2716</button>' +
    "</div></div>" +
    '<div class="editor-item-body">' +
    "<label>Role</label>" +
    '<input type="text" class="ef-exp-role" value="' +
    escapeHtml(item.role) +
    '">' +
    "<label>Company</label>" +
    '<input type="text" class="ef-exp-company" value="' +
    escapeHtml(item.company) +
    '">' +
    "<label>Location</label>" +
    '<input type="text" class="ef-exp-location" value="' +
    escapeHtml(item.location) +
    '">' +
    "<label>Period</label>" +
    '<input type="text" class="ef-exp-period" value="' +
    escapeHtml(item.period) +
    '">' +
    "<label>Bullets (one per line)</label>" +
    '<textarea class="ef-exp-bullets" rows="4">' +
    escapeHtml(item.bullets.join("\n")) +
    "</textarea>" +
    "</div></div>"
  );
}

function renderProjectItem(proj, i) {
  return (
    '<div class="editor-item" data-index="' +
    i +
    '"><div class="editor-item-header"><span>' +
    escapeHtml(proj.title) +
    '</span><div class="editor-item-actions">' +
    '<button class="btn-icon" onclick="moveProject(' +
    i +
    ',-1)" aria-label="Move up">\u25B2</button>' +
    '<button class="btn-icon" onclick="moveProject(' +
    i +
    ',1)" aria-label="Move down">\u25BC</button>' +
    '<button class="btn-icon btn-icon-danger" onclick="deleteProject(' +
    i +
    ')" aria-label="Delete">\u2716</button>' +
    "</div></div>" +
    '<div class="editor-item-body">' +
    "<label>Title</label>" +
    '<input type="text" class="ef-proj-title" value="' +
    escapeHtml(proj.title) +
    '">' +
    "<label>Role</label>" +
    '<input type="text" class="ef-proj-role" value="' +
    escapeHtml(proj.role) +
    '">' +
    "<label>Year</label>" +
    '<input type="text" class="ef-proj-year" value="' +
    escapeHtml(proj.year) +
    '">' +
    "<label>Bullets (one per line)</label>" +
    '<textarea class="ef-proj-bullets" rows="4">' +
    escapeHtml(proj.bullets.join("\n")) +
    "</textarea>" +
    "<label>Live Demo URL</label>" +
    '<input type="url" class="ef-proj-demo" value="' +
    escapeHtml(proj.liveDemo) +
    '">' +
    "<label>Source Code URL</label>" +
    '<input type="url" class="ef-proj-source" value="' +
    escapeHtml(proj.sourceCode) +
    '">' +
    "</div></div>"
  );
}

function renderCustomizeTab() {
  const d = currentData;
  const theme = d.theme;
  const c = theme.colors;
  return (
    '<div class="editor-section">' +
    '<h3 class="editor-section-title" data-section="theme-presets">Theme Presets</h3>' +
    '<div class="editor-section-body">' +
    "<label>Color Theme</label>" +
    '<select id="ef-theme-preset" onchange="applyThemePreset(this.value)">' +
    '<option value="classic-dark"' +
    (theme.preset === "classic-dark" ? " selected" : "") +
    ">Classic Dark</option>" +
    '<option value="modern-blue"' +
    (theme.preset === "modern-blue" ? " selected" : "") +
    ">Modern Blue</option>" +
    '<option value="emerald"' +
    (theme.preset === "emerald" ? " selected" : "") +
    ">Emerald Professional</option>" +
    '<option value="burgundy"' +
    (theme.preset === "burgundy" ? " selected" : "") +
    ">Burgundy Executive</option>" +
    '<option value="minimal"' +
    (theme.preset === "minimal" ? " selected" : "") +
    ">Minimal Black & White</option>" +
    '<option value="soft-gray"' +
    (theme.preset === "soft-gray" ? " selected" : "") +
    ">Soft Gray</option>" +
    '<option value="creative-purple"' +
    (theme.preset === "creative-purple" ? " selected" : "") +
    ">Creative Purple</option>" +
    '<option value="custom"' +
    (theme.preset === "custom" ? " selected" : "") +
    ">Custom</option>" +
    "</select></div></div>" +
    '<div class="editor-section">' +
    '<h3 class="editor-section-title" data-section="custom-colors">Custom Colors</h3>' +
    '<div class="editor-section-body">' +
    renderColorPicker("Body Background", "bodyBg", c.bodyBg) +
    renderColorPicker("Page Background", "pageBg", c.pageBg) +
    renderColorPicker("Sidebar Background", "sidebarBg", c.sidebarBg) +
    renderColorPicker("Sidebar Card", "sidebarCardBg", c.sidebarCardBg) +
    renderColorPicker("Sidebar Border", "sidebarBorder", c.sidebarBorder) +
    renderColorPicker("Text Light", "textLight", c.textLight) +
    renderColorPicker("Text Dark", "textDark", c.textDark) +
    renderColorPicker("Heading Color", "heading", c.heading) +
    renderColorPicker("Accent Color", "accent", c.accent) +
    renderColorPicker("Section Title BG", "sectionTitleBg", c.sectionTitleBg) +
    renderColorPicker("Link Color", "linkColor", c.linkColor || c.accent) +
    "</div></div>" +
    '<div class="editor-section">' +
    '<h3 class="editor-section-title" data-section="title-colors">Section Title Colors</h3>' +
    '<div class="editor-section-body">' +
    renderColorPicker("Info Title", "titleInfoBg", c.titleInfoBg || "#2c3e50") +
    renderColorPicker("Profile Title", "titlePerfilBg", c.titlePerfilBg || "#34495e") +
    renderColorPicker("Skills Title", "titleSkillsBg", c.titleSkillsBg || "#2d3e3f") +
    renderColorPicker("Education Title", "titleEduBg", c.titleEduBg || "#3a2e3e") +
    "</div></div>" +
    '<div class="editor-section">' +
    '<h3 class="editor-section-title" data-section="font-settings">Font Settings</h3>' +
    '<div class="editor-section-body">' +
    "<label>Body Font</label>" +
    '<select id="ef-font-body" onchange="onFontChange()">' +
    FONT_OPTIONS.map(
      (f) =>
        '<option value="' +
        f.value +
        '"' +
        (theme.fonts.body === f.value ? " selected" : "") +
        ">" +
        f.label +
        "</option>"
    ).join("") +
    "</select>" +
    "<label>Heading Font</label>" +
    '<select id="ef-font-heading" onchange="onFontChange()">' +
    FONT_OPTIONS.map(
      (f) =>
        '<option value="' +
        f.value +
        '"' +
        (theme.fonts.heading === f.value ? " selected" : "") +
        ">" +
        f.label +
        "</option>"
    ).join("") +
    "</select>" +
    "<label>Name Font</label>" +
    '<select id="ef-font-name" onchange="onFontChange()">' +
    FONT_OPTIONS.map(
      (f) =>
        '<option value="' +
        f.value +
        '"' +
        (theme.fonts.name === f.value ? " selected" : "") +
        ">" +
        f.label +
        "</option>"
    ).join("") +
    "</select>" +
    "<label>Font Size</label>" +
    '<select id="ef-font-size" onchange="onFontChange()">' +
    '<option value="compact"' +
    (theme.fonts.size === "compact" ? " selected" : "") +
    ">Compact</option>" +
    '<option value="small"' +
    (theme.fonts.size === "small" ? " selected" : "") +
    ">Small</option>" +
    '<option value="normal"' +
    (theme.fonts.size === "normal" ? " selected" : "") +
    ">Normal</option>" +
    '<option value="large"' +
    (theme.fonts.size === "large" ? " selected" : "") +
    ">Large</option>" +
    "</select></div></div>" +
    '<div class="editor-section">' +
    '<h3 class="editor-section-title" data-section="image-settings">Profile Picture</h3>' +
    '<div class="editor-section-body">' +
    "<label>Image Shape</label>" +
    '<select id="ef-img-shape" onchange="onImageChange()">' +
    '<option value="rectangle"' +
    (d.image.shape === "rectangle" ? " selected" : "") +
    ">Rectangle</option>" +
    '<option value="rounded"' +
    (d.image.shape === "rounded" ? " selected" : "") +
    ">Rounded</option>" +
    '<option value="circle"' +
    (d.image.shape === "circle" ? " selected" : "") +
    ">Circle</option>" +
    "</select>" +
    "<label>Image Size</label>" +
    '<select id="ef-img-size" onchange="onImageChange()">' +
    '<option value="small"' +
    (d.image.size === "small" ? " selected" : "") +
    ">Small</option>" +
    '<option value="medium"' +
    (d.image.size === "medium" ? " selected" : "") +
    ">Medium</option>" +
    '<option value="large"' +
    (d.image.size === "large" ? " selected" : "") +
    ">Large</option>" +
    '<option value="full"' +
    (d.image.size === "full" ? " selected" : "") +
    ">Full Width</option>" +
    "</select>" +
    "<label>Upload Image</label>" +
    '<input type="file" id="ef-img-upload-custom" accept="image/jpeg,image/png,image/webp" onchange="onImageUpload(event)">' +
    '<button class="btn btn-sm btn-danger" onclick="removeProfileImage()">Remove Image</button>' +
    "</div></div>"
  );
}

const FONT_OPTIONS = [
  { value: "Arial, Helvetica, sans-serif", label: "Arial" },
  { value: "Helvetica, sans-serif", label: "Helvetica" },
  { value: "'Inter', sans-serif", label: "Inter" },
  { value: "'Roboto', sans-serif", label: "Roboto" },
  { value: "'Open Sans', sans-serif", label: "Open Sans" },
  { value: "'Lato', sans-serif", label: "Lato" },
  { value: "'Poppins', sans-serif", label: "Poppins" },
  { value: "'Montserrat', sans-serif", label: "Montserrat" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "'Times New Roman', serif", label: "Times New Roman" },
];

function renderColorPicker(label, key, value) {
  return (
    '<div class="color-picker-row"><label>' +
    label +
    '</label><div class="color-input-group">' +
    '<input type="color" class="ef-color" data-key="' +
    key +
    '" value="' +
    value +
    '" onchange="onColorChange()">' +
    '<input type="text" class="ef-color-text" data-key="' +
    key +
    '" value="' +
    value +
    '" oninput="onColorTextChange(this)">' +
    "</div></div>"
  );
}

function attachEditorEvents() {
  document.querySelectorAll("#editor-personal input").forEach((el) => {
    el.addEventListener("input", debounceSave);
  });
  document
    .getElementById("ef-profile-visible")
    ?.addEventListener("change", debounceSave);
  document
    .getElementById("ef-profile-title")
    ?.addEventListener("input", debounceSave);
  document
    .getElementById("ef-profile-text")
    ?.addEventListener("input", debounceSave);
  document
    .getElementById("ef-profile-text")
    ?.addEventListener("input", updateCharCount);
  document
    .getElementById("ef-skills-visible")
    ?.addEventListener("change", debounceSave);
  document
    .getElementById("ef-skills-title")
    ?.addEventListener("input", debounceSave);
  document
    .getElementById("ef-edu-visible")
    ?.addEventListener("change", debounceSave);
  document
    .getElementById("ef-edu-title")
    ?.addEventListener("input", debounceSave);
  document
    .getElementById("ef-experience-visible")
    ?.addEventListener("change", debounceSave);
  document
    .getElementById("ef-experience-title")
    ?.addEventListener("input", debounceSave);
  document
    .getElementById("ef-projects-visible")
    ?.addEventListener("change", debounceSave);
  document
    .getElementById("ef-projects-title")
    ?.addEventListener("input", debounceSave);
  document
    .querySelectorAll(".ef-skill-cat, .ef-skill-items")
    .forEach((el) => {
      el.addEventListener("input", debounceSave);
    });
  document.querySelectorAll(".ef-skill-cat").forEach((el) => {
    el.addEventListener("input", updateSkillCatCount);
  });
  document
    .querySelectorAll(
      ".ef-edu-title, .ef-edu-school, .ef-edu-desc"
    )
    .forEach((el) => {
      el.addEventListener("input", debounceSave);
    });
  document.querySelectorAll(".ef-edu-desc").forEach((el) => {
    el.addEventListener("input", updateEduDescCount);
  });
  document
    .querySelectorAll(
      ".ef-exp-role, .ef-exp-company, .ef-exp-location, .ef-exp-period, .ef-exp-bullets"
    )
    .forEach((el) => {
      el.addEventListener("input", debounceSave);
    });
  document
    .querySelectorAll(
      ".ef-proj-title, .ef-proj-role, .ef-proj-year, .ef-proj-bullets, .ef-proj-demo, .ef-proj-source"
    )
    .forEach((el) => {
      el.addEventListener("input", debounceSave);
    });
}

const debounceSave = debounce(function () {
  collectAndSave();
}, 300);

function collectAndSave() {
  try {
    const activeTab = document.querySelector(".editor-tab.active")?.dataset.tab;
    const isContentTab = activeTab === "content";

    const personal = isContentTab
      ? {
          fullName: getVal("ef-name"),
          title: getVal("ef-title"),
          location: getVal("ef-location"),
          phone: getVal("ef-phone"),
          email: getVal("ef-email"),
          github: getVal("ef-github"),
          linkedin: getVal("ef-linkedin"),
          portfolio: getVal("ef-portfolio"),
        }
      : currentData.personal;

    const profile = isContentTab
      ? {
          visible:
            document.getElementById("ef-profile-visible")?.checked ??
            currentData.profile.visible,
          title: getVal("ef-profile-title"),
          text: getVal("ef-profile-text"),
        }
      : currentData.profile;

    const skills = isContentTab
      ? {
          visible:
            document.getElementById("ef-skills-visible")?.checked ??
            currentData.skills.visible,
          title: getVal("ef-skills-title"),
          categories: collectSkillCategories(),
        }
      : currentData.skills;

    const education = isContentTab
      ? {
          visible:
            document.getElementById("ef-edu-visible")?.checked ??
            currentData.education.visible,
          title: getVal("ef-edu-title"),
          items: collectEducationItems(),
        }
      : currentData.education;

    const experience = isContentTab
      ? {
          visible:
            document.getElementById("ef-experience-visible")?.checked ??
            currentData.experience.visible,
          title: getVal("ef-experience-title"),
          items: collectExperienceItems(),
        }
      : currentData.experience;

    const projects = isContentTab
      ? {
          visible:
            document.getElementById("ef-projects-visible")?.checked ??
            currentData.projects.visible,
          title: getVal("ef-projects-title"),
          items: collectProjectItems(),
        }
      : currentData.projects;

    const image = {
      ...currentData.image,
      shape:
        document.getElementById("ef-img-shape")?.value ??
        currentData.image.shape,
      size:
        document.getElementById("ef-img-size")?.value ??
        currentData.image.size,
    };

    const hasCustomizeElements =
      document.querySelector(".ef-color") !== null;
    const theme = hasCustomizeElements
      ? {
          ...currentData.theme,
          preset:
            document.getElementById("ef-theme-preset")?.value ??
            currentData.theme.preset,
          colors: sanitizeThemeColors(
            collectColors(),
            DEFAULT_CV_DATA.theme.colors
          ),
          fonts: collectFonts(),
        }
      : currentData.theme;

    currentData = {
      ...currentData,
      personal,
      profile,
      skills,
      education,
      experience,
      projects,
      image,
      theme,
    };
    saveCvData(currentData);
    renderPreview(currentData);
    updateSaveStatus("Saved");
  } catch (e) {
    console.error("Save error:", e);
    showToast("Error saving. Try Reset.", "error");
  }
}

function getVal(id) {
  return document.getElementById(id)?.value ?? "";
}

function collectSkillCategories() {
  const items = [];
  document.querySelectorAll("#skills-list .editor-item").forEach((el) => {
    const cat = el.querySelector(".ef-skill-cat")?.value ?? "";
    const itemsStr = el.querySelector(".ef-skill-items")?.value ?? "";
    if (cat) {
      items.push({
        id: el.dataset.id || createId("skill"),
        category: cat,
        items: itemsStr
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      });
    }
  });
  return items;
}

function collectEducationItems() {
  const items = [];
  document.querySelectorAll("#education-list .editor-item").forEach((el) => {
    const title = el.querySelector(".ef-edu-title")?.value ?? "";
    if (title) {
      items.push({
        id: el.dataset.id || createId("edu"),
        title,
        school: el.querySelector(".ef-edu-school")?.value ?? "",
        description: el.querySelector(".ef-edu-desc")?.value ?? "",
      });
    }
  });
  return items;
}

function collectExperienceItems() {
  const items = [];
  document.querySelectorAll("#experience-list .editor-item").forEach((el) => {
    const role = el.querySelector(".ef-exp-role")?.value ?? "";
    if (role) {
      const bullets = (
        el.querySelector(".ef-exp-bullets")?.value ?? ""
      )
        .split("\n")
        .filter(Boolean);
      items.push({
        id: el.dataset.id || createId("exp"),
        role,
        company: el.querySelector(".ef-exp-company")?.value ?? "",
        location: el.querySelector(".ef-exp-location")?.value ?? "",
        period: el.querySelector(".ef-exp-period")?.value ?? "",
        bullets,
      });
    }
  });
  return items;
}

function collectProjectItems() {
  const items = [];
  document.querySelectorAll("#projects-list .editor-item").forEach((el) => {
    const title = el.querySelector(".ef-proj-title")?.value ?? "";
    if (title) {
      const bullets = (
        el.querySelector(".ef-proj-bullets")?.value ?? ""
      )
        .split("\n")
        .filter(Boolean);
      items.push({
        id: el.dataset.id || createId("proj"),
        title,
        role: el.querySelector(".ef-proj-role")?.value ?? "",
        year: el.querySelector(".ef-proj-year")?.value ?? "",
        bullets,
        liveDemo: el.querySelector(".ef-proj-demo")?.value ?? "",
        sourceCode: el.querySelector(".ef-proj-source")?.value ?? "",
      });
    }
  });
  return items;
}

function collectColors() {
  const colors = {};
  document.querySelectorAll(".ef-color").forEach((el) => {
    colors[el.dataset.key] = el.value;
  });
  return colors;
}

function collectFonts() {
  return {
    body:
      document.getElementById("ef-font-body")?.value ??
      currentData.theme.fonts.body,
    heading:
      document.getElementById("ef-font-heading")?.value ??
      currentData.theme.fonts.heading,
    name:
      document.getElementById("ef-font-name")?.value ??
      currentData.theme.fonts.name,
    size:
      document.getElementById("ef-font-size")?.value ??
      currentData.theme.fonts.size,
  };
}

function onColorChange() {
  document.querySelectorAll(".ef-color").forEach((el) => {
    const text = el
      .closest(".color-input-group")
      ?.querySelector(".ef-color-text");
    if (text) text.value = el.value;
  });
  collectAndSave();
}

function onColorTextChange(input) {
  if (/^#[0-9a-f]{6}$/i.test(input.value)) {
    const color = input
      .closest(".color-input-group")
      ?.querySelector(".ef-color");
    if (color) color.value = input.value;
    collectAndSave();
  }
}

function onFontChange() {
  collectAndSave();
}

function onImageChange() {
  collectAndSave();
}

function onImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  try {
    validateImageFile(file);
  } catch (err) {
    showToast(err.message, "error");
    e.target.value = "";
    return;
  }
  const reader = new FileReader();
  reader.onload = (event) => {
    currentData.image.src = event.target.result;
    currentData.image.alt = "Uploaded photo";
    saveCvData(currentData);
    renderPreview(currentData);
    showToast("Photo updated", "success");
  };
  reader.readAsDataURL(file);
}

function removeProfileImage() {
  currentData.image.src = "";
  currentData.image.alt = "No image";
  saveCvData(currentData);
  renderPreview(currentData);
  showToast("Photo removed", "success");
}

function applyThemePreset(value) {
  if (value === "custom") {
    currentData.theme.preset = "custom";
    collectAndSave();
    return;
  }
  const themeColors = {
    "classic-dark": {
      bodyBg: "#bcbcbc", pageBg: "#ffffff", sidebarBg: "#000000", sidebarCardBg: "#313131", sidebarBorder: "#282828", textLight: "#ffffff", textDark: "#000000", heading: "#4c4c4c", accent: "#7d7dbb", sectionTitleBg: "#eaeaea", linkColor: "#7d7dbb", titleInfoBg: "#2c3e50", titlePerfilBg: "#34495e", titleSkillsBg: "#2d3e3f", titleEduBg: "#3a2e3e"
    },
    "modern-blue": {
      bodyBg: "#e8f0f8", pageBg: "#ffffff", sidebarBg: "#1a365d", sidebarCardBg: "#2a4a7f", sidebarBorder: "#3a5a9f", textLight: "#ffffff", textDark: "#1a202c", heading: "#2a4a7f", accent: "#3182ce", sectionTitleBg: "#ebf4ff", linkColor: "#3182ce", titleInfoBg: "#1e4a6e", titlePerfilBg: "#2a5a8a", titleSkillsBg: "#1e5a5a", titleEduBg: "#3a4a6e"
    },
    emerald: {
      bodyBg: "#ecfdf5", pageBg: "#ffffff", sidebarBg: "#064e3b", sidebarCardBg: "#065f46", sidebarBorder: "#047857", textLight: "#ffffff", textDark: "#111827", heading: "#065f46", accent: "#059669", sectionTitleBg: "#d1fae5", linkColor: "#059669", titleInfoBg: "#065f46", titlePerfilBg: "#047857", titleSkillsBg: "#03644a", titleEduBg: "#0d6e52"
    },
    burgundy: {
      bodyBg: "#fdf2f4", pageBg: "#ffffff", sidebarBg: "#4a1a2e", sidebarCardBg: "#5e2238", sidebarBorder: "#7a2d46", textLight: "#ffffff", textDark: "#1a0a12", heading: "#5e2238", accent: "#9b2c4a", sectionTitleBg: "#fce7ef", linkColor: "#9b2c4a", titleInfoBg: "#5e2238", titlePerfilBg: "#7a2d46", titleSkillsBg: "#6a2640", titleEduBg: "#4a1a2e"
    },
    minimal: {
      bodyBg: "#f5f5f5", pageBg: "#ffffff", sidebarBg: "#1a1a1a", sidebarCardBg: "#2a2a2a", sidebarBorder: "#3a3a3a", textLight: "#ffffff", textDark: "#000000", heading: "#333333", accent: "#555555", sectionTitleBg: "#eeeeee", linkColor: "#555555", titleInfoBg: "#2a2a2a", titlePerfilBg: "#333333", titleSkillsBg: "#3a3a3a", titleEduBg: "#2a2a2a"
    },
    "soft-gray": {
      bodyBg: "#eaeaea", pageBg: "#fafafa", sidebarBg: "#2d2d2d", sidebarCardBg: "#404040", sidebarBorder: "#505050", textLight: "#f0f0f0", textDark: "#222222", heading: "#404040", accent: "#6b7280", sectionTitleBg: "#f3f4f6", linkColor: "#6b7280", titleInfoBg: "#404040", titlePerfilBg: "#4a4a4a", titleSkillsBg: "#505050", titleEduBg: "#3a3a3a"
    },
    "creative-purple": {
      bodyBg: "#f5f3ff", pageBg: "#ffffff", sidebarBg: "#2d1b4e", sidebarCardBg: "#3d2569", sidebarBorder: "#4d2f84", textLight: "#ffffff", textDark: "#1a0a2e", heading: "#3d2569", accent: "#7c3aed", sectionTitleBg: "#ede9fe", linkColor: "#7c3aed", titleInfoBg: "#3d2569", titlePerfilBg: "#4d2f84", titleSkillsBg: "#3a2569", titleEduBg: "#2d1b4e"
    }
  };
  const colors = themeColors[value] || themeColors["classic-dark"];
  currentData.theme.preset = value;
  currentData.theme.colors = JSON.parse(JSON.stringify(colors));
  saveCvData(currentData);
  renderPreview(currentData);
  syncThemeControls(currentData.theme);
  showToast("Theme applied: " + value, "success");
}

function syncThemeControls(theme) {
  const c = theme.colors;
  document.querySelectorAll(".ef-color").forEach((el) => {
    const key = el.dataset.key;
    if (c[key]) {
      el.value = c[key];
      const text = el
        .closest(".color-input-group")
        ?.querySelector(".ef-color-text");
      if (text) text.value = c[key];
    }
  });
  const preset = document.getElementById("ef-theme-preset");
  if (preset) preset.value = theme.preset;
}

function addSkillCategory() {
  currentData.skills.categories.push({
    id: createId("skill"),
    category: "New Category",
    items: ["Skill"],
  });
  refreshContentTab();
}

function deleteSkillCategory(i) {
  currentData.skills.categories.splice(i, 1);
  refreshContentTab();
}

function moveSkillCategory(i, dir) {
  const items = currentData.skills.categories;
  const newIndex = i + dir;
  if (newIndex < 0 || newIndex >= items.length) return;
  [items[i], items[newIndex]] = [items[newIndex], items[i]];
  refreshContentTab();
}

function addEducationItem() {
  currentData.education.items.push({
    id: createId("edu"),
    title: "New Degree",
    school: "University",
    description: "Description",
  });
  refreshContentTab();
}

function deleteEducationItem(i) {
  currentData.education.items.splice(i, 1);
  refreshContentTab();
}

function moveEducationItem(i, dir) {
  const items = currentData.education.items;
  const newIndex = i + dir;
  if (newIndex < 0 || newIndex >= items.length) return;
  [items[i], items[newIndex]] = [items[newIndex], items[i]];
  refreshContentTab();
}

function addExperienceItem() {
  currentData.experience.items.push({
    id: createId("exp"),
    role: "New Role",
    company: "Company",
    location: "",
    period: "2026",
    bullets: ["Description"],
  });
  refreshContentTab();
}

function deleteExperienceItem(i) {
  currentData.experience.items.splice(i, 1);
  refreshContentTab();
}

function moveExperienceItem(i, dir) {
  const items = currentData.experience.items;
  const newIndex = i + dir;
  if (newIndex < 0 || newIndex >= items.length) return;
  [items[i], items[newIndex]] = [items[newIndex], items[i]];
  refreshContentTab();
}

function addProject() {
  currentData.projects.items.push({
    id: createId("proj"),
    title: "New Project",
    role: "Developer",
    year: "2026",
    bullets: ["Description"],
    liveDemo: "",
    sourceCode: "",
  });
  refreshContentTab();
}

function deleteProject(i) {
  currentData.projects.items.splice(i, 1);
  refreshContentTab();
}

function moveProject(i, dir) {
  const items = currentData.projects.items;
  const newIndex = i + dir;
  if (newIndex < 0 || newIndex >= items.length) return;
  [items[i], items[newIndex]] = [items[newIndex], items[i]];
  refreshContentTab();
}

function refreshContentTab() {
  saveCvData(currentData);
  renderPreview(currentData);
  const body = document.getElementById("editor-body");
  body.innerHTML = renderContentTab();
  attachEditorEvents();
}

function updateCharCount() {
  const textarea = document.getElementById("ef-profile-text");
  const counter = document.getElementById("profile-char-count");
  if (textarea && counter) counter.textContent = textarea.value.length;
}

function updateSkillCatCount(e) {
  const counter = e.target.parentElement.querySelector(".skill-cat-count");
  if (counter) counter.textContent = e.target.value.length;
}

function updateEduDescCount(e) {
  const counter = e.target.parentElement.querySelector(".edu-desc-count");
  if (counter) counter.textContent = e.target.value.length;
}
