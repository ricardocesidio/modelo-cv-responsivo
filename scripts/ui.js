let toastTimeout = null;

function showToast(message, type) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = `toast toast-${type || "info"}`;
  toast.textContent = message;
  toast.setAttribute("role", "alert");
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("toast-visible"));
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("toast-visible");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function debounce(callback, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, args), delay || 300);
  };
}

function updateFooterYear() {
  const el = document.querySelector("[data-current-year]");
  if (el) el.textContent = new Date().getFullYear();
}

function updateSaveStatus(msg) {
  const el = document.getElementById("save-status");
  if (el) el.textContent = msg;
}
