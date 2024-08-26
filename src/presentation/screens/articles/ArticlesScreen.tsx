import { FlatList, RefreshControl } from "react-native";
import ArticleItem from "../../components/ArticleItem";
import useArticlesViewModel from "./ArticlesViewModel";

export default function Articles() {
  const { articles, onRefresh, deleteArticle } = useArticlesViewModel();

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
