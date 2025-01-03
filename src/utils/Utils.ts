

// ====== Save To Local =========
export function saveToStorage<T>(key: string, value: T): T {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
}

// ====== Get From Local =========

export function getFromStorage<T>(key: string, defaultValue: T): T {
  const storageData = localStorage.getItem(key);
  if (storageData) {
    JSON.parse(storageData);
  } else {
    return defaultValue;
  }
}

// ============ Delete From Local ============
export function deleteFromStorage(key: string) {
  localStorage.removeItem(key);
}
