import { ARTICLES_API_URL } from "../utils/api";
import { Article } from "../../types/ArticlesTypes";

function toCamelCase(article: any): Article {
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

export async function getArticles(): Promise<Article[]> {
  try {
    const response = await fetch(ARTICLES_API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.hits.map(toCamelCase);
  } catch (error) {
    throw new Error(`Error fetching articles: ${error}`);
  }
}
