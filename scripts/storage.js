function saveCvData(data) {
  try {
    const payload = {
      version: DATA_VERSION,
      savedAt: new Date().toISOString(),
      data: data,
    };
    localStorage.setItem(getStorageKey("data"), JSON.stringify(payload));
    return true;
  } catch (e) {
    console.error("Failed to save CV data:", e);
    return false;
  }
}

function loadCvData() {
  try {
    const raw = localStorage.getItem(getStorageKey("data"));
    if (!raw) return null;
    const payload = JSON.parse(raw);
    if (payload && payload.data) {
      createBackupBeforeMigration(payload.data);
      const migrated = migrateCvData(payload);
      if (migrated) {
        saveCvData(migrated);
        return migrated;
      }
    }
    if (payload && payload.personal) {
      createBackupBeforeMigration(payload);
      const migrated = migrateCvData({ data: payload });
      if (migrated) {
        saveCvData(migrated);
        return migrated;
      }
    }
    return null;
  } catch (e) {
    console.error("Failed to load CV data:", e);
    return null;
  }
}

function hasSavedData() {
  return localStorage.getItem(getStorageKey("data")) !== null;
}

function resetCvData() {
  clearCvMakerStorage();
  return JSON.parse(JSON.stringify(DEFAULT_CV_DATA));
}

function clearCvMakerStorage() {
  const prefix = "cv-maker:";
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key && key.startsWith(prefix)) {
      localStorage.removeItem(key);
    }
  }
}

function getLastSaveTime() {
  try {
    const raw = localStorage.getItem(getStorageKey("data"));
    if (!raw) return null;
    const payload = JSON.parse(raw);
    return payload.savedAt
      ? new Date(payload.savedAt).toLocaleString()
      : null;
  } catch {
    return null;
  }
}
