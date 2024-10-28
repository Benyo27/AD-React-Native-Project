import { useState, useEffect, useCallback } from "react";
import ArticlesRepository from "../../../data/articles/ArticlesRepository";
import { Article } from "../../../types/ArticlesTypes";

export const useArticlesViewModel = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  const onRefresh = useCallback(async () => {
    await updateStorageArticles();
    await setUpArticles();
  }, []);

  const updateStorageArticles = async () => {
    try {
      const articles = await ArticlesRepository.fetchArticlesFromApi();
      await ArticlesRepository.saveArticlesToStorage(articles);
    } catch (error) {
      console.error(error);
    }
  };

  const setUpArticles = async () => {
    try {
      const storedArticles = await ArticlesRepository.loadArticlesFromStorage();
      const deletedArticles =
        await ArticlesRepository.loadDeletedArticlesFromStorage();
      const deletedIds = deletedArticles.map(
        (article: Article) => article.storyId,
      );
      const filteredArticles = storedArticles.filter(
        (article: Article) => !deletedIds.includes(article.storyId),
      );
      setArticles(filteredArticles);
    } catch (error) {
      console.error(`Error setting up articles: ${error}`);
    }
  };

  const deleteArticle = async (article: Article) => {
    try {
      const deletedArticles =
        await ArticlesRepository.loadDeletedArticlesFromStorage();
      deletedArticles.push(article);
      await ArticlesRepository.saveDeletedArticlesToStorage(deletedArticles);
      const updatedArticles = articles.filter(
        (filter: Article) => filter.storyId !== article.storyId,
      );
      setArticles(updatedArticles);
    } catch (error) {
      console.error(`Error deleting article: ${error}`);
    }
  };

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  return {
    articles,
    onRefresh,
    deleteArticle,
  };
};
