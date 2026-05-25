function exportCvJson(data) {
  const payload = {
    version: DATA_VERSION,
    exportedAt: new Date().toISOString(),
    data: data,
  };
  const json = JSON.stringify(payload, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "cv-backup.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast("CV exported as JSON", "success");
}

function importCvJson() {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          const dataToValidate = parsed.data || parsed;
          if (validateImportedData(dataToValidate)) {
            const sanitized = sanitizeImportedData(dataToValidate);
            showToast("CV imported successfully", "success");
            resolve(sanitized);
          } else {
            showToast("Invalid CV data format", "error");
            reject(new Error("Invalid CV data format"));
          }
        } catch (err) {
          showToast("Failed to parse JSON file", "error");
          reject(err);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  });
}
