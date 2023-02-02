export class StorageUtil {
  /**
   * Saves user in session storage.
   * @param key set in session storage
   * @param value for session storage.
   */
  public static storageSave<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  /**
   * Reads from session storage
   * @param key read from session storage
   * @returns item stored with key
   */
  public static storageRead<T>(key: string): T | undefined {
    const storedValue = sessionStorage.getItem(key);
    try {
      if (storedValue) {
        return JSON.parse(storedValue) as T;
      }
      return undefined;
    } catch (e) {
      sessionStorage.removeItem(key);
      return undefined;
    }
  }
}
