export class LocalStorage {
    getItem<T>(key: string): T {
      if (localStorage[key]) {
        return  JSON.parse(localStorage[key]) as T;
      }
      return null;
    }

    setItem(key: string, item: any) {
      localStorage[key] = JSON.stringify(item);
    }
    
    removeItem(key: string) {
      localStorage.removeItem(key);
    }
  }
