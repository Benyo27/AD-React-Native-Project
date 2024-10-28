import { FlatList, RefreshControl, Text, View, StyleSheet } from "react-native";
import ArticleItem from "../../components/ArticleItem";
import { useDeletedArticlesViewModel } from "./useDeletedArticlesViewModel";

export function DeletedArticlesScreen() {
  const { articles, onRefresh } = useDeletedArticlesViewModel();

  return (
    <FlatList
      style={{ backgroundColor: "white" }}
      contentContainerStyle={{ flex: 1 }}
      data={articles}
      renderItem={({ item }) => <ArticleItem article={item} />}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={onRefresh} />
      }
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No deleted articles</Text>
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
