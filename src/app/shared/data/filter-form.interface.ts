export interface IForm {
  qInTitle: string;
  pageSize: number;
  page: number;
  q?: string;
  source?: string;
  from?: string;
  to?: string;
  sortBy?: SortBy;
  language?: string;
}

export enum SortBy {
  popularity,
  relevancy,
  publishedAt,
}
