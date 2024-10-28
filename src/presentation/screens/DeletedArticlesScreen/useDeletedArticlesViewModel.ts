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

  useEffect(() => {
    ArticlesRepository.subscribe(setUpArticles);
    setUpArticles();
    return () => {
      ArticlesRepository.unsubscribe(setUpArticles);
    };
  }, [setUpArticles]);

  return {
    articles,
    onRefresh: setUpArticles,
  };
};
