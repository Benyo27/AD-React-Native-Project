import React, { useRef } from "react";
import { Pressable, Text, StyleSheet, Animated, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Swipeable } from "react-native-gesture-handler";
import { RootStackParamList } from "../../navigators/navigationTypes";

interface ArticleItemProps {
    article: {
        title?: string;
        story_title?: string;
        url?: string;
        story_url?: string;
        author: string;
        created_at: string;
        story_id: number;
    }
    onDelete: (id: number) => void;
}

export default function ArticleItem({ article, onDelete }: ArticleItemProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const swipeableRef = useRef<Swipeable>(null);

  const handlePress = () => {
    const url = article.url || article.story_url;
    if (url) {
      navigation.navigate('WebView', { url });
    }
  };

  const handleDelete = () => {
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
    onDelete(article.story_id);
  };

  const renderRightActions = (
    _progress: any,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const translateX = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });

    return (
      <Pressable onPress={handleDelete}>
        <Animated.View style={[styles.deleteButton, { transform: [{ translateX }] }]}>
          <Text style={styles.deleteText}>Delete</Text>
        </Animated.View>
      </Pressable>
    );
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      containerStyle={styles.container}
    >
      <Pressable onPress={handlePress}>
        <Text style={styles.title}>{article.title || article.story_title}</Text>
        <Text style={styles.subtitle}>{`${article.author} - ${article.created_at}`}</Text>
      </Pressable>
    </Swipeable>
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
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
  },
  deleteText: {
    color: 'white',
    fontSize: 15,
  },
});
