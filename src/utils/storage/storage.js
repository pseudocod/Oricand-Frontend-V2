const storage = {
  set: (key, value, expirationInMinutes = null) => {
    const item = {
      value,
      timestamp: new Date().getTime(),
    };

    if (expirationInMinutes) {
      item.expiresAt = new Date().getTime() + (expirationInMinutes * 60 * 1000);
    }

    try {
      localStorage.setItem(key, JSON.stringify(item));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  },

  get: (key) => {
    try {
      const item = JSON.parse(localStorage.getItem(key));
      
      if (!item) return null;

      // Check if item has expired
      if (item.expiresAt && new Date().getTime() > item.expiresAt) {
        localStorage.removeItem(key);
        return null;
      }

      return item.value;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  clearExpired: () => {
    try {
      const now = new Date().getTime();
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const item = JSON.parse(localStorage.getItem(key));
        
        if (item && item.expiresAt && now > item.expiresAt) {
          localStorage.removeItem(key);
        }
      }
      
      return true;
    } catch (error) {
      console.error('Error clearing expired items:', error);
      return false;
    }
  },

  // Helper method to check storage availability
  isAvailable: () => {
    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }
};

export default storage; 