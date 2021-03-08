export interface IArticle {
  status: string;
  totalResults: number;
  articles: IArticleDetails[];
}

export interface IArticleDetails {
  source: IArticleSourceInfo;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface IArticleSourceInfo {
  id: string;
  name: string;
}

export interface ILanguage {
  code: string;
  languageValue: string;
}
