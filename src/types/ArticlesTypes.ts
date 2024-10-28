export interface Article {
  title?: string;
  storyTitle?: string;
  url?: string;
  storyUrl?: string;
  author: string;
  createdAt: string;
  storyId: number;
}

export interface ArticleItemProps {
  article: Article;
  onDelete?: (id: number) => void;
}
