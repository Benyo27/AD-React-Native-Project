import { FlatList, RefreshControl } from "react-native";
import ArticleItem from "../../components/ArticleItem";
import { useArticlesViewModel } from "./useArticlesViewModel";

export function ArticlesScreen() {
  const { articles, onRefresh, deleteArticle, saveArticle } =
    useArticlesViewModel();

  return (
    <FlatList
      data={articles}
      style={{ backgroundColor: "white" }}
      renderItem={({ item }) => (
        <ArticleItem
          article={item}
          onDelete={() => deleteArticle(item)}
          onSave={() => saveArticle(item)}
        />
      )}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={onRefresh} />
      }
    />
  );
}
