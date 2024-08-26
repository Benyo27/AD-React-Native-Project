import { ARTICLES_API_URL } from "../utils/api";
import formatApiArticleProps from "../utils/formatApiArticleProps";

export async function getArticles() {
  try {
    const response = await fetch(ARTICLES_API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.hits.map(formatApiArticleProps);
  } catch (error) {
    throw new Error(`Error fetching articles: ${error}`);
  }
}
