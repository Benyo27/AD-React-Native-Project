import AsyncStorage from "@react-native-async-storage/async-storage";

export default new (class AsyncStorageController {
  async setItem(key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      throw new Error(`Error setting item: ${error}`);
    }
  }

  async getItem(key: string) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      throw new Error(`Error getting item: ${error}`);
    }
  }

  async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      throw new Error(`Error removing item: ${error}`);
    }
  }

  async clear() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      throw new Error(`Error clearing storage: ${error}`);
    }
  }
})();
