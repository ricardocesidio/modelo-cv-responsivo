let eventController = null;

function initApp() {
  const saved = loadCvData();
  currentData = saved || JSON.parse(JSON.stringify(DEFAULT_CV_DATA));

  initToolbar();
  openTab("edit");
  renderPreview(currentData);
  initEditor();
  initClickToEdit();
  updateFooterYear();

  if (!saved) {
    saveCvData(currentData);
  }
}

function initToolbar() {
  document.getElementById("btn-save")?.addEventListener("click", () => {
    collectAndSave();
    showToast("CV saved", "success");
  });
  document.getElementById("btn-reset")?.addEventListener("click", () => {
    if (confirm("Reset to default CV? All your changes will be lost.")) {
      currentData = resetCvData();
      renderPreview(currentData);
      renderEditor(document.getElementById("editor-panel"));
      setupTabNavigation();
      showToast("Reset to default", "success");
    }
  });
  document.getElementById("btn-export")?.addEventListener("click", () => {
    collectAndSave();
    exportCvJson(currentData);
  });
  document.getElementById("btn-import")?.addEventListener("click", async () => {
    try {
      const data = await importCvJson();
      if (data) {
        currentData = data;
        saveCvData(currentData);
        renderPreview(currentData);
        renderEditor(document.getElementById("editor-panel"));
        setupTabNavigation();
      }
    } catch (e) {
      console.error("Import failed:", e);
    }
  });
  document.getElementById("btn-print")?.addEventListener("click", () => {
    window.print();
  });
  document.getElementById("btn-edit")?.addEventListener("click", () => openTab("edit"));
  document.getElementById("btn-preview")?.addEventListener("click", () => openTab("preview"));
}

function bindEvents() {
  if (eventController) {
    eventController.abort();
  }
  eventController = new AbortController();
  const signal = eventController.signal;

  document.addEventListener("click", handleDocumentClick, { signal });
}

function handleDocumentClick(e) {
  const tab = e.target.closest(".editor-tab");
  if (tab) {
    document.querySelectorAll(".editor-tab").forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    const body = document.getElementById("editor-body");
    if (tab.dataset.tab === "content") {
      body.innerHTML = renderContentTab();
    } else {
      body.innerHTML = renderCustomizeTab();
    }
    attachEditorEvents();
    return;
  }

  const sectionTitle = e.target.closest(".editor-section-title");
  if (sectionTitle) {
    const body = sectionTitle.nextElementSibling;
    if (body && body.classList.contains("editor-section-body")) {
      body.style.display = body.style.display === "none" ? "block" : "none";
      sectionTitle.classList.toggle("collapsed");
    }
    return;
  }

  const clickEdit = e.target.closest("[data-edit]");
  if (clickEdit) {
    const link = e.target.closest("a");
    if (link) return;
    const section = clickEdit.dataset.edit;
    if (section === "image") {
      const uploadBtn = document.querySelector("#ef-img-upload-custom");
      if (uploadBtn) uploadBtn.click();
      return;
    }
    openTab("edit");
    switchToEditorSection(section);
  }
}

function openTab(tab) {
  const editPanel = document.getElementById("editor-panel");
  const previewPanel = document.getElementById("cv-preview");
  const tabs = document.querySelectorAll(".view-tab");

  tabs.forEach((t) => t.classList.remove("active"));
  const activeTab =
    tab === "edit"
      ? document.getElementById("btn-edit")
      : document.getElementById("btn-preview");
  if (activeTab) activeTab.classList.add("active");

  if (tab === "edit") {
    editPanel.style.display = "block";
    previewPanel.style.flex = "1";
  } else {
    editPanel.style.display = "none";
    previewPanel.style.flex = "1";
  }
}

function switchToEditorSection(section) {
  const editorBody = document.getElementById("editor-body");
  if (!editorBody) return;

  const contentTab = document.querySelector(".editor-tab[data-tab='content']");
  if (contentTab && !contentTab.classList.contains("active")) {
    contentTab.click();
  }

  const sectionMap = {
    personal: "personal",
    profile: "profile",
    skills: "skills-editor",
    education: "education-editor",
    experience: "experience-editor",
    projects: "projects-editor",
  };

  const targetId = sectionMap[section] || section;
  const title = editorBody.querySelector(
    `.editor-section-title[data-section="${targetId}"]`
  );
  if (title) {
    const body = title.nextElementSibling;
    if (body && body.classList.contains("editor-section-body")) {
      body.style.display = "block";
      title.classList.remove("collapsed");
    }
    title.scrollIntoView({ behavior: "smooth", block: "start" });
    title.style.transition = "background 0.3s";
    title.style.background = "#e8f0fe";
    setTimeout(() => {
      title.style.background = "";
    }, 1500);
    const firstInput = title.nextElementSibling?.querySelector("input, textarea");
    if (firstInput) setTimeout(() => firstInput.focus(), 400);
  }
}

function resetAndReload() {
  resetCvData();
  location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
  bindEvents();
  initApp();
});
