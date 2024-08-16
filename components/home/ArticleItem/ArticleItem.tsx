import { Pressable, Text, StyleSheet } from "react-native";

interface ArticleItemProps {
    article: {
        title?: string;
        story_title?: string;
        url?: string;
        story_url?: string;
        author: string;
        created_at: string;
    }
}

export function ArticleItem({ article }: ArticleItemProps) {
  return (
    <Pressable style={styles.container}>
      <Text style={styles.title}>{article.title || article.story_title}</Text>
      <Text style={styles.subtitle}>{`${article.author} - ${article.created_at}`}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 24,
    paddingHorizontal: 16,
    flexDirection: 'column',
    gap: 8,
  },
  title: {
    fontSize: 16,
  },
  subtitle: {
    color: '#666',
  },
});
