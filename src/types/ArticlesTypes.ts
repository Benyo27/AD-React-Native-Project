export interface Article {
  title?: string;
  story_title?: string;
  url?: string;
  story_url?: string;
  author: string;
  created_at: string;
  story_id: number;
}

export interface ArticleItemProps {
  article: Article;
  onDelete: (id: number) => void;
}
