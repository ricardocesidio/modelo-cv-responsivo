const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const ALLOWED_URL_PROTOCOLS = {
  default: ["https:", "http:"],
  email: ["mailto:"],
  phone: ["tel:"],
};

function escapeHtml(value) {
  if (value == null) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function sanitizeUrl(value, fieldType) {
  if (!value || typeof value !== "string") return "";
  const trimmed = value.trim().toLowerCase();
  const protocols = fieldType === "email"
    ? ALLOWED_URL_PROTOCOLS.email
    : fieldType === "phone"
      ? ALLOWED_URL_PROTOCOLS.phone
      : ALLOWED_URL_PROTOCOLS.default;
  for (const p of protocols) {
    if (trimmed.startsWith(p)) return value.trim();
  }
  if (fieldType === "default" || !fieldType) {
    if (trimmed.startsWith("https://") || trimmed.startsWith("http://")) return value.trim();
  }
  return "";
}

function isValidCssColor(value) {
  if (!value || typeof value !== "string") return false;
  const s = value.trim().toLowerCase();
  if (/^#[0-9a-f]{3,8}$/.test(s)) return true;
  if (/^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/.test(s)) return true;
  if (/^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/.test(s)) return true;
  if (/^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/.test(s)) return true;
  const named = new Option().style;
  named.color = s;
  if (named.color) return true;
  return false;
}

function sanitizeThemeColors(colors, fallbackColors) {
  const sanitized = {};
  for (const key of Object.keys(fallbackColors)) {
    const val = colors[key];
    sanitized[key] = isValidCssColor(val) ? val.trim() : fallbackColors[key];
  }
  return sanitized;
}

function validateImageFile(file) {
  if (!file) throw new Error("No file provided.");
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Only JPG, PNG, and WebP images are allowed.");
  }
  const maxSize = 2 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error("Image must be smaller than 2MB.");
  }
  return true;
}

function validateImportedData(data) {
  if (!data || typeof data !== "object") return false;
  if (!data.personal || typeof data.personal !== "object") return false;
  if (!data.personal.fullName || typeof data.personal.fullName !== "string") return false;
  if (!data.theme || typeof data.theme !== "object") return false;
  if (!data.theme.colors || typeof data.theme.colors !== "object") return false;
  return true;
}

function sanitizeImportedData(data) {
  const sanitized = JSON.parse(JSON.stringify(data));
  if (sanitized.personal) {
    for (const key of Object.keys(sanitized.personal)) {
      if (typeof sanitized.personal[key] === "string") {
        sanitized.personal[key] = sanitized.personal[key]
          .replace(/[<>]/g, "")
          .trim();
      }
    }
  }
  return sanitized;
}

function createId(prefix) {
  const id = crypto.randomUUID
    ? crypto.randomUUID()
    : Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  return prefix ? `${prefix}-${id}` : id;
}
