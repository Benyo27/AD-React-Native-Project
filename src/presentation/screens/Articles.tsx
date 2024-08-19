import { FlatList, RefreshControl } from "react-native";
import { useEffect, useState } from "react";
import ArticleItem from "../components/ArticleItem";
import { getArticles } from "../../domain/entities/articles";

export default function Articles() {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const articles = await getArticles();
      setArticles(articles);
    } catch (error) {
      console.error(`Error fetching articles: ${error}`);
    }
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <FlatList
      data={articles}
      renderItem={({ item }) => <ArticleItem article={item} />}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={fetchArticles}
        />
      }
    />
  );
}