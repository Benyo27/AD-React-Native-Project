import { useCallback, useEffect, useState } from "react";
import { Article } from "../../../types/ArticlesTypes";
import ArticlesRepository from "../../../data/articles/ArticlesRepository";

export const useDeletedArticlesViewModel = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  const setUpArticles = useCallback(async () => {
    try {
      const deletedArticles =
        await ArticlesRepository.loadDeletedArticlesFromStorage();
      setArticles(deletedArticles);
    } catch (error) {
      console.error(`Error setting up articles: ${error}`);
    }
  }, []);

  const undeleteArticle = async (article: Article) => {
    try {
      const deletedArticles =
        await ArticlesRepository.loadDeletedArticlesFromStorage();
      const updatedArticles = deletedArticles.filter(
        (filter: Article) => filter.storyId !== article.storyId,
      );
      await ArticlesRepository.saveDeletedArticlesToStorage(updatedArticles);
      setArticles(updatedArticles);
    } catch (error) {
      console.error(`Error undeleting article: ${error}`);
    }
  };

  useEffect(() => {
    ArticlesRepository.subscribeToDeletedArticles(setUpArticles);
    setUpArticles();
    return () => {
      ArticlesRepository.unsubscribeFromDeletedArticles(setUpArticles);
    };
  }, [setUpArticles]);

  return {
    articles,
    onRefresh: setUpArticles,
    undeleteArticle,
  };
};
