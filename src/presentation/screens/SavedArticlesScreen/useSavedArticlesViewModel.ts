import { useCallback, useEffect, useState } from "react";
import { Article } from "../../../types/ArticlesTypes";
import ArticlesRepository from "../../../data/articles/ArticlesRepository";

export const useSavedArticlesViewModel = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  const setUpArticles = useCallback(async () => {
    try {
      const savedArticles =
        await ArticlesRepository.loadSavedArticlesFromStorage();
      const deletedArticles =
        await ArticlesRepository.loadDeletedArticlesFromStorage();
      const deletedIds = deletedArticles.map(
        (article: Article) => article.storyId,
      );
      const filteredArticles = savedArticles.filter(
        (article: Article) => !deletedIds.includes(article.storyId),
      );
      setArticles(filteredArticles);
    } catch (error) {
      console.error(`Error setting up articles: ${error}`);
    }
  }, []);

  const unsaveArticle = async (article: Article) => {
    try {
      const savedArticles =
        await ArticlesRepository.loadSavedArticlesFromStorage();
      const updatedArticles = savedArticles.filter(
        (filter: Article) => filter.storyId !== article.storyId,
      );
      await ArticlesRepository.saveSavedArticlesToStorage(updatedArticles);
      setArticles(updatedArticles);
    } catch (error) {
      console.error(`Error unsaving article: ${error}`);
    }
  };

  useEffect(() => {
    ArticlesRepository.subscribeToSavedArticles(setUpArticles);
    ArticlesRepository.subscribeToDeletedArticles(setUpArticles);
    setUpArticles();
    return () => {
      ArticlesRepository.unsubscribeFromSavedArticles(setUpArticles);
      ArticlesRepository.unsubscribeFromDeletedArticles(setUpArticles);
    };
  }, [setUpArticles]);

  return {
    articles,
    onRefresh: setUpArticles,
    unsaveArticle,
  };
};
