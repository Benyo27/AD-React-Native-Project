import { FlatList, RefreshControl } from "react-native";
import { ArticleItem } from "../ArticleItem";
import { useEffect, useState } from "react";

export function ArticlesContainer() {
  const [articles, setArticles] = useState([]);

  const getArticles = async () => {
    try {
      const response = await fetch('https://hn.algolia.com/api/v1/search_by_date?query=mobile');
      const data = await response.json();
      setArticles(data.hits);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <FlatList
      data={articles}
      renderItem={({ item }) => <ArticleItem article={item} />}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={getArticles}
        />
      }
    />
  );
}