import { FlatList, RefreshControl, Text, View, StyleSheet } from "react-native";
import ArticleItem from "../../components/ArticleItem";
import { useSavedArticlesViewModel } from "./useSavedArticlesViewModel";

export function SavedArticlesScreen() {
  const { articles, onRefresh, unsaveArticle } = useSavedArticlesViewModel();

  return (
    <FlatList
      style={{ backgroundColor: "white" }}
      contentContainerStyle={{ flex: 1 }}
      data={articles}
      renderItem={({ item }) => (
        <ArticleItem
          article={item}
          onSave={() => unsaveArticle(item)}
          saveText="Unsave"
        />
      )}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={onRefresh} />
      }
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No saved articles</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
  },
});
