import { getArticles } from "./ArticlesRemoteProvider";
import AsyncStorageController from "./ArticlesAsyncStorage";
import { Article } from "../../types/ArticlesTypes";

const ARTICLES_STORAGE_KEY = "articles";
const DELETED_ARTICLES_STORAGE_KEY = "deletedArticles";

type StorageListener = () => void;

class ArticlesRepository {
  private static deletedArticlesListeners: StorageListener[] = [];

  static subscribe(listener: StorageListener) {
    this.deletedArticlesListeners.push(listener);
  }

  static unsubscribe(listener: StorageListener) {
    this.deletedArticlesListeners = this.deletedArticlesListeners.filter(
      (l) => l !== listener,
    );
  }

  private static notifyDeletedArticlesListeners() {
    this.deletedArticlesListeners.forEach((listener) => listener());
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
}

export default ArticlesRepository;
