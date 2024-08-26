import { getArticles } from "./ArticlesRemoteProvider";
import AsyncStorageController from "./ArticlesAsyncStorage";
import { Article } from "../../types/ArticlesTypes";

const ARTICLES_STORAGE_KEY = 'articles';
const DELETED_ARTICLES_STORAGE_KEY = 'deletedArticles';

const ArticlesRepository = {
  fetchArticlesFromApi: async () => {
    try {
      return await getArticles();
    } catch (error) {
      console.error(`Error fetching articles from API: ${error}`);
      return [];
    }
  },

  saveArticlesToStorage: async (articles: Article[]): Promise<void> => {
    try {
      await AsyncStorageController.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(articles));
    } catch (error) {
      console.error(`Error saving articles to storage: ${error}`);
    }
  },

  loadArticlesFromStorage: async () => {
    try {
      const storedArticles = await AsyncStorageController.getItem(ARTICLES_STORAGE_KEY);
      return storedArticles ? JSON.parse(storedArticles) : [];
    } catch (error) {
      console.error(`Error loading articles from storage: ${error}`);
      return [];
    }
  },

  loadDeletedArticlesFromStorage: async (): Promise<number[]> => {
    try {
      const deletedArticles = await AsyncStorageController.getItem(DELETED_ARTICLES_STORAGE_KEY);
      return deletedArticles ? JSON.parse(deletedArticles) : [];
    } catch (error) {
      console.error(`Error loading deleted articles from storage: ${error}`);
      return [];
    }
  },

  saveDeletedArticlesToStorage: async (deletedArticles: number[]): Promise<void> => {
    try {
      await AsyncStorageController.setItem(DELETED_ARTICLES_STORAGE_KEY, JSON.stringify(deletedArticles));
    } catch (error) {
      console.error(`Error saving deleted articles to storage: ${error}`);
    }
  },
};

export default ArticlesRepository;
