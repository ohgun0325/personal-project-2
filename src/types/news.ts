export type Region =
  | "all"
  | "africa"
  | "southeast-asia"
  | "central-asia"
  | "latin-america";

export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  content: string;
  source: string;
  date: string;
}

