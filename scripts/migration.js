const DATA_VERSION = "1.0.0";

function getStorageKey(...parts) {
  return ["cv-maker", ...parts].join(":");
}

function createBackupBeforeMigration(savedData) {
  const key = getStorageKey("backup", Date.now().toString(36));
  try {
    const payload = {
      version: DATA_VERSION,
      backedUpAt: new Date().toISOString(),
      data: savedData,
    };
    localStorage.setItem(key, JSON.stringify(payload));
  } catch (e) {
    console.warn("Backup failed (storage may be full):", e);
  }
}

function mergeWithDefaults(defaultData, savedData) {
  const output = JSON.parse(JSON.stringify(defaultData));
  for (const key of Object.keys(savedData)) {
    if (savedData[key] === null || typeof savedData[key] !== "object") {
      output[key] = savedData[key];
      continue;
    }
    if (Array.isArray(savedData[key])) {
      output[key] = mergeArrayItemsWithDefaults(defaultData[key] || [], savedData[key]);
      continue;
    }
    if (output[key] && typeof output[key] === "object" && !Array.isArray(output[key])) {
      output[key] = { ...output[key], ...savedData[key] };
      for (const sub of Object.keys(savedData[key])) {
        if (
          output[key][sub] &&
          typeof output[key][sub] === "object" &&
          !Array.isArray(output[key][sub]) &&
          typeof savedData[key][sub] === "object" &&
          !Array.isArray(savedData[key][sub])
        ) {
          output[key][sub] = { ...output[key][sub], ...savedData[key][sub] };
        } else {
          output[key][sub] = savedData[key][sub];
        }
      }
    } else {
      output[key] = savedData[key];
    }
  }
  return output;
}

function mergeArrayItemsWithDefaults(defaultArray, savedArray) {
  if (!defaultArray || !defaultArray.length) return savedArray || [];
  if (!savedArray || !savedArray.length) return defaultArray;
  return savedArray.map((item) => {
    const template = defaultArray[0] || {};
    const merged = { ...template };
    for (const k of Object.keys(item)) {
      merged[k] = item[k];
    }
    return merged;
  });
}

function migrateCvData(savedPayload) {
  if (!savedPayload || typeof savedPayload !== "object") return null;
  const savedData = savedPayload.data || savedPayload;
  const savedVersion = savedPayload.version || "0.0.0";
  if (savedData && typeof savedData === "object" && savedData.personal) {
    return mergeWithDefaults(
      JSON.parse(JSON.stringify(DEFAULT_CV_DATA)),
      savedData
    );
  }
  return null;
}

function isSupportedVersion(version) {
  return version && typeof version === "string" && version.length > 0;
}
