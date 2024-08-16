import { Pressable, Text, StyleSheet } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigators/navigationTypes";

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

export default function ArticleItem({ article }: ArticleItemProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePress = () => {
    const url = article.url || article.story_url;
    if (url) {
      navigation.navigate('WebView', { url });
    }
  }
  return (
    <Pressable style={styles.container} onPress={handlePress}>
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
