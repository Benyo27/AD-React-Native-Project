import { Article } from "../../types/ArticlesTypes";
import { formatDistanceToNow, parseISO } from "date-fns";

export default function formatApiArticleProps(article: any): Article {
  return {
    title: article.title,
    storyTitle: article.story_title,
    url: article.url,
    storyUrl: article.story_url,
    author: article.author,
    createdAt: formatDistanceToNow(parseISO(article.created_at), {
      addSuffix: false,
    }),
    storyId: article.story_id,
  };
}
