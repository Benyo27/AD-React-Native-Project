import { Article } from "../../types/ArticlesTypes";

export default function toCamelCase(article: any): Article {
  return {
    title: article.title,
    storyTitle: article.story_title,
    url: article.url,
    storyUrl: article.story_url,
    author: article.author,
    createdAt: article.created_at,
    storyId: article.story_id,
  };
}