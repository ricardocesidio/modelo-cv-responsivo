function renderPreview(data) {
  const container = document.getElementById("cv-preview");
  if (!container) return;

  if (!data || !data.personal || !data.theme) {
    container.innerHTML =
      '<div style="padding:40px;text-align:center;color:#666;"><p style="font-size:1.2em;margin-bottom:10px;">CV data error. Click <strong>Reset</strong> in the toolbar.</p><button onclick="resetAndReload()" style="padding:10px 24px;background:#1a1a2e;color:white;border:none;border-radius:6px;cursor:pointer;font-size:1em;">Reset to Default</button></div>';
    return;
  }

  try {
    const p = data.personal;
    const img = data.image;
    const profile = data.profile;
    const skills = data.skills;
    const education = data.education;
    const experience = data.experience;
    const projects = data.projects;

    const renderBullets = (bullets) =>
      bullets
        .map((b) => "\u2022 " + escapeHtml(b))
        .join("<br>");

    const phoneHref = p.phone
      ? sanitizeUrl("tel:" + p.phone.replace(/\s+/g, ""), "phone")
      : "";
    const emailHref = p.email
      ? sanitizeUrl("mailto:" + p.email.trim(), "email")
      : "";

    container.innerHTML =
      '<div class="cv-page" id="cv-page">' +
      '<div class="content-wrapper">' +
      '<aside class="sidebar">' +
      '<img src="' +
          escapeHtml(img.src) +
          '" alt="' +
          escapeHtml(img.alt) +
          '" class="img-' +
          img.shape +
          " img-" +
          img.size +
          '" data-edit="image">' +
      '<section class="info" data-edit="personal">' +
      "<p>INFO</p>" +
      '<div class="frases">' +
      "<p>" +
      escapeHtml(p.title) +
      " | " +
      escapeHtml(p.location) +
      "</p>" +
      "<p>" +
      (phoneHref
        ? '<a href="' + escapeHtml(phoneHref) + '">' + escapeHtml(p.phone) + "</a>"
        : escapeHtml(p.phone)) +
      "<br><br>" +
      (emailHref
        ? '<a href="' + escapeHtml(emailHref) + '">' + escapeHtml(p.email) + "</a>"
        : escapeHtml(p.email)) +
      "</p>" +
      (p.github
        ? '<p><a href="' +
          escapeHtml(sanitizeUrl(p.github)) +
          '" target="_blank">' +
          escapeHtml(cleanUrl(p.github)) +
          "</a></p>"
        : "") +
      (p.linkedin
        ? '<p><a href="' +
          escapeHtml(sanitizeUrl(p.linkedin)) +
          '" target="_blank">' +
          escapeHtml(cleanUrl(p.linkedin)) +
          "</a></p>"
        : "") +
      (p.portfolio
        ? '<p><a href="' +
          escapeHtml(sanitizeUrl(p.portfolio)) +
          '" target="_blank">' +
          escapeHtml(cleanUrl(p.portfolio)) +
          "</a></p>"
        : "") +
      "</div>" +
      "</section>" +
      (profile.visible
        ? '<section class="perfil" data-edit="profile">' +
          "<p>" +
          escapeHtml(profile.title) +
          "</p>" +
          '<div class="frases">' +
          "<p>" +
          escapeHtml(profile.text) +
          "</p>" +
          "</div>" +
          "</section>"
        : "") +
      (skills.visible && skills.categories.length
        ? '<section class="skills-section" data-edit="skills">' +
          "<p>" +
          escapeHtml(skills.title) +
          "</p>" +
          '<div class="frases">' +
          skills.categories
            .map(
              (cat) =>
                "<p><strong>" +
                escapeHtml(cat.category) +
                "</strong><br>" +
                escapeHtml(cat.items.join(", ")) +
                "</p>"
            )
            .join("") +
          "</div>" +
          "</section>"
        : "") +
      (education.visible && education.items.length
        ? '<section class="education-section" data-edit="education">' +
          "<p>" +
          escapeHtml(education.title) +
          "</p>" +
          '<div class="frases">' +
          education.items
            .map(
              (edu) =>
                "<p><strong>" +
                escapeHtml(edu.title) +
                "</strong><br>" +
                escapeHtml(edu.school) +
                "<br>" +
                escapeHtml(edu.description) +
                "</p>"
            )
            .join("") +
          "</div>" +
          "</section>"
        : "") +
      "</aside>" +
      '<section class="content-right">' +
      '<div class="name" data-edit="personal">' +
      "<h1>" +
      escapeHtml(p.fullName) +
      "</h1>" +
      "</div>" +
      (experience.visible && experience.items.length
        ? '<section class="expe" data-edit="experience">' +
          "<p>" +
          escapeHtml(experience.title) +
          "</p>" +
          "</section>" +
          experience.items
            .map(
              (exp) =>
                '<div class="frases1" data-edit="experience">' +
                "<h2>" +
                escapeHtml(exp.role) +
                "</h2>" +
                "<h3>" +
                escapeHtml(exp.company) +
                " | " +
                escapeHtml(exp.period) +
                "</h3>" +
                "<p>" +
                renderBullets(exp.bullets) +
                "</p>" +
                "</div>"
            )
            .join("")
        : "") +
      (projects.visible && projects.items.length
        ? '<section class="expe" data-edit="projects">' +
          "<p>" +
          escapeHtml(projects.title) +
          "</p>" +
          "</section>" +
          projects.items
            .map((proj) => {
              let linksHtml = "";
              if (proj.liveDemo) {
                linksHtml +=
                  '<a href="' +
                  escapeHtml(sanitizeUrl(proj.liveDemo)) +
                  '" target="_blank">Live Demo</a>';
              }
              if (proj.liveDemo && proj.sourceCode) {
                linksHtml += " | ";
              }
              if (proj.sourceCode) {
                linksHtml +=
                  '<a href="' +
                  escapeHtml(sanitizeUrl(proj.sourceCode)) +
                  '" target="_blank">Source Code</a>';
              }
              return (
                '<div class="frases1" data-edit="projects">' +
                "<h2>" +
                escapeHtml(proj.title) +
                "</h2>" +
                "<h3>" +
                escapeHtml(proj.role) +
                " | " +
                escapeHtml(proj.year) +
                "</h3>" +
                "<p>" +
                renderBullets(proj.bullets) +
                "</p>" +
                (linksHtml ? "<p>" + linksHtml + "</p>" : "") +
                "</div>"
              );
            })
            .join("")
        : "") +
      "</section>" +
      "</div>" +
      "</div>";

    applyTheme(data.theme);
    applyFontSize(data.theme.fonts.size);
  } catch (e) {
    console.error("CV render error:", e);
    container.innerHTML =
      '<div style="padding:40px;text-align:center;color:#666;"><p style="font-size:1.2em;margin-bottom:10px;">Something went wrong rendering the CV.</p><button onclick="resetAndReload()" style="padding:10px 24px;background:#1a1a2e;color:white;border:none;border-radius:6px;cursor:pointer;font-size:1em;">Reset to Default</button></div>';
  }
}

function applyTheme(theme) {
  const root = document.documentElement;
  const colors = theme.colors;
  const safe = sanitizeThemeColors(colors, DEFAULT_CV_DATA.theme.colors);
  root.style.setProperty("--color-body-bg", safe.bodyBg);
  root.style.setProperty("--color-page-bg", safe.pageBg);
  root.style.setProperty("--color-sidebar-bg", safe.sidebarBg);
  root.style.setProperty("--color-sidebar-card-bg", safe.sidebarCardBg);
  root.style.setProperty("--color-sidebar-border", safe.sidebarBorder);
  root.style.setProperty("--color-text-light", safe.textLight);
  root.style.setProperty("--color-text-dark", safe.textDark);
  root.style.setProperty("--color-heading", safe.heading);
  root.style.setProperty("--color-accent", safe.accent);
  root.style.setProperty("--color-section-title-bg", safe.sectionTitleBg);
  root.style.setProperty("--color-link", safe.linkColor || safe.accent);
  root.style.setProperty("--color-title-info-bg", safe.titleInfoBg || "#2c3e50");
  root.style.setProperty("--color-title-perfil-bg", safe.titlePerfilBg || "#34495e");
  root.style.setProperty("--color-title-skills-bg", safe.titleSkillsBg || "#2d3e3f");
  root.style.setProperty("--color-title-edu-bg", safe.titleEduBg || "#3a2e3e");
  root.style.setProperty("--font-body", theme.fonts.body);
  root.style.setProperty("--font-heading", theme.fonts.heading);
  root.style.setProperty("--font-name", theme.fonts.name);
}

function applyFontSize(size) {
  const multipliers = { compact: 0.85, small: 0.95, normal: 1, large: 1.1 };
  const mult = multipliers[size] || 1;
  document.documentElement.style.setProperty("--font-size-multiplier", mult);
}

function cleanUrl(url) {
  return (url || "")
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
}
