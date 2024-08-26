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
      console.error(`Error updating articles: ${error}`);
    }
  };

  const setUpArticles = async () => {
    try {
      const storedArticles = await ArticlesRepository.loadArticlesFromStorage();
      const deletedArticles =
        await ArticlesRepository.loadDeletedArticlesFromStorage();
      const filteredArticles = storedArticles.filter(
        (article: Article) => !deletedArticles.includes(article.story_id),
      );
      setArticles(filteredArticles);
    } catch (error) {
      console.error(`Error setting up articles: ${error}`);
    }
  };

  const deleteArticle = async (story_id: number) => {
    try {
      const deletedArticles =
        await ArticlesRepository.loadDeletedArticlesFromStorage();
      deletedArticles.push(story_id);
      await ArticlesRepository.saveDeletedArticlesToStorage(deletedArticles);
      const updatedArticles = articles.filter(
        (article: Article) => article.story_id !== story_id,
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
