import { getArticles } from "./ArticlesRemoteProvider";
import AsyncStorageController from "./ArticlesAsyncStorage";
import { Article } from "../../types/ArticlesTypes";

const ARTICLES_STORAGE_KEY = "articles";
const DELETED_ARTICLES_STORAGE_KEY = "deletedArticles";
const SAVED_ARTICLES_STORAGE_KEY = "savedArticles";

type StorageListener = () => void;

class ArticlesRepository {
  private static deletedArticlesListeners: StorageListener[] = [];
  static subscribeToDeletedArticles(listener: StorageListener) {
    this.deletedArticlesListeners.push(listener);
  }
  static unsubscribeFromDeletedArticles(listener: StorageListener) {
    this.deletedArticlesListeners = this.deletedArticlesListeners.filter(
      (l) => l !== listener,
    );
  }
  private static notifyDeletedArticlesListeners() {
    this.deletedArticlesListeners.forEach((listener) => listener());
  }

  private static savedArticlesListeners: StorageListener[] = [];
  static subscribeToSavedArticles(listener: StorageListener) {
    this.savedArticlesListeners.push(listener);
  }
  static unsubscribeFromSavedArticles(listener: StorageListener) {
    this.savedArticlesListeners = this.savedArticlesListeners.filter(
      (l) => l !== listener,
    );
  }
  private static notifySavedArticlesListeners() {
    this.savedArticlesListeners.forEach((listener) => listener());
  }

  static async fetchArticlesFromApi() {
    try {
      return await getArticles();
    } catch (error) {
      throw error;
    }
  }

  static async saveArticlesToStorage(articles: Article[]): Promise<void> {
    try {
      await AsyncStorageController.setItem(
        ARTICLES_STORAGE_KEY,
        JSON.stringify(articles),
      );
    } catch (error) {
      console.error(error);
    }
  }

  static async loadArticlesFromStorage() {
    try {
      const storedArticles =
        await AsyncStorageController.getItem(ARTICLES_STORAGE_KEY);
      return storedArticles ? JSON.parse(storedArticles) : [];
    } catch (error) {
      console.error(`Error loading articles from storage: ${error}`);
      return [];
    }
  }

  static async loadDeletedArticlesFromStorage() {
    try {
      const deletedArticles = await AsyncStorageController.getItem(
        DELETED_ARTICLES_STORAGE_KEY,
      );
      return deletedArticles ? JSON.parse(deletedArticles) : [];
    } catch (error) {
      console.error(`Error loading deleted articles from storage: ${error}`);
      return [];
    }
  }

  static async saveDeletedArticlesToStorage(
    deletedArticles: Article[],
  ): Promise<void> {
    try {
      await AsyncStorageController.setItem(
        DELETED_ARTICLES_STORAGE_KEY,
        JSON.stringify(deletedArticles),
      );
      this.notifyDeletedArticlesListeners();
    } catch (error) {
      console.error(`Error saving deleted articles to storage: ${error}`);
    }
  }

  static async loadSavedArticlesFromStorage() {
    try {
      const savedArticles = await AsyncStorageController.getItem(
        SAVED_ARTICLES_STORAGE_KEY,
      );
      return savedArticles ? JSON.parse(savedArticles) : [];
    } catch (error) {
      console.error(`Error loading saved articles from storage: ${error}`);
      return [];
    }
  }

  static async saveSavedArticlesToStorage(savedArticles: Article[]) {
    try {
      await AsyncStorageController.setItem(
        SAVED_ARTICLES_STORAGE_KEY,
        JSON.stringify(savedArticles),
      );
      this.notifySavedArticlesListeners();
    } catch (error) {
      console.error(`Error saving saved articles to storage: ${error}`);
    }
  }
}

export default ArticlesRepository;
