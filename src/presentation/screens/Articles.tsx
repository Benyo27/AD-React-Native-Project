import { FlatList, RefreshControl } from "react-native";
import { useEffect, useState } from "react";
import ArticleItem from "../components/ArticleItem";
import { getArticles } from "../../domain/entities/articles";
import AsyncStorageController from "../../domain/local/asyncStorage";

interface ArticleItemProps {
    story_id: number;
}

export default function Articles() {
  const [articles, setArticles] = useState([]);

  const ARTICLES_STORAGE_KEY = 'articles';
  const DELETED_ARTICLES_STORAGE_KEY = 'deletedArticles';

  const onRefresh = async () => {
    try {
      await updateStorageArticles();
      await setUpArticles();
    } catch (error) {
      console.error(`Error refreshing articles: ${error}`);
    }
  }

  const updateStorageArticles = async () => {
    try {
      const articles = await getArticles();
      await AsyncStorageController.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(articles));
    } catch (error) {
      throw new Error(`Error updating articles: ${error}`);
    }
  }

  const setUpArticles = async () => {
    try {
      const storedArticles = await loadArticlesFromStorage();
      const deletedArticles = await loadDeletedArticlesFromStorage();
      const filteredArticles = storedArticles.filter(
        (article: ArticleItemProps) => !deletedArticles.includes(article.story_id)
      )
      setArticles(filteredArticles);
    } catch (error) {
      throw new Error(`Error fetching articles: ${error}`);
    }
  }

  const loadArticlesFromStorage = async () => {
    try {
      const storedArticles = await AsyncStorageController.getItem(ARTICLES_STORAGE_KEY);
      return storedArticles ? JSON.parse(storedArticles) : [];

    } catch (error) {
      throw new Error(`Error loading articles from storage: ${error}`);
    }
  }

  const loadDeletedArticlesFromStorage = async () => {
    try {
      const deletedArticles = await AsyncStorageController.getItem(DELETED_ARTICLES_STORAGE_KEY);
      return deletedArticles ? JSON.parse(deletedArticles) : [];
    } catch (error) {
      throw new Error(`Error loading deleted articles from storage: ${error}`);
    }
  }

  const deleteArticle = async (story_id: number) => {
    try {
      const deletedArticles = await loadDeletedArticlesFromStorage();
      deletedArticles.push(story_id);
      await AsyncStorageController.setItem(DELETED_ARTICLES_STORAGE_KEY, JSON.stringify(deletedArticles));
      const updatedArticles = articles.filter((article: ArticleItemProps) => article.story_id !== story_id);
      setArticles(updatedArticles);
    } catch (error) {
      console.error(`Error deleting article: ${error}`);
    }
  }

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <FlatList
      data={articles}
      renderItem={({ item }) => <ArticleItem article={item} onDelete={deleteArticle} />}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={onRefresh}
        />
      }
    />
  );
}