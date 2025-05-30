export type Notebook = {
  id: string;
  userId: string;
  title: string;
  description?: string;
  visibillity?: "public" | "private";
  author?: string;
  aspectRatio?: "6:9" | "13:20" | "3:5" | "7:9" | "1:1";
  createdAt: string;
  updatedAt: string;
  styles?: { [key: string]: string | number };
  pages: Page[];
};

export interface Page {
  id: string;
  type: "cover" | "sheet";
  header?: any;
  footer?: any;
  isNumberedPage?: boolean;
  pageNumber?: number; // 1-based index
  backgroundImageURL?: string;
  styles?: { [key: string]: string | number };
  contents: ContentBlock[];
}

export interface ContentBlock {
  value: string;
  type: "title" | "paragraph" | "image" | "list";
  styles?: { [key: string]: string | number }; // e.g. { text-align: "center" }
}
