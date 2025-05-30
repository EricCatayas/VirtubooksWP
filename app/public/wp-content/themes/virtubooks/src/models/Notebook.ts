export type Notebook = {
  id: string;
  title: string;
  description?: string;
  author?: string;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  pages: Page[];
};

export interface Page {
  id: string;
  type: "cover" | "sheet";
  header?: string;
  footer?: string;
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
