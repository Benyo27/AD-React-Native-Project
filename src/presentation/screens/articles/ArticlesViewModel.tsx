import { useState, useEffect } from "react";
import ArticlesRepository from "../../../data/articles/ArticlesRepository";
import { Article } from "../../../types/ArticlesTypes";

const useArticlesViewModel = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  const onRefresh = async () => {
    await updateStorageArticles();
    await setUpArticles();
  };

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
      const filteredArticles = storedArticles.filter(
        (article: Article) => !deletedArticles.includes(article.storyId),
      );
      setArticles(filteredArticles);
    } catch (error) {
      console.error(`Error setting up articles: ${error}`);
    }
  };

  const deleteArticle = async (storyId: number) => {
    try {
      const deletedArticles =
        await ArticlesRepository.loadDeletedArticlesFromStorage();
      deletedArticles.push(storyId);
      await ArticlesRepository.saveDeletedArticlesToStorage(deletedArticles);
      const updatedArticles = articles.filter(
        (article: Article) => article.storyId !== storyId,
      );
      setArticles(updatedArticles);
    } catch (error) {
      console.error(`Error deleting article: ${error}`);
    }
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return {
    articles,
    onRefresh,
    deleteArticle,
  };
};

export default useArticlesViewModel;
