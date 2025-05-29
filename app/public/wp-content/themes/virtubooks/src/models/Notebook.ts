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
  side: "front" | "back";
  pageNumber?: number;
  header?: string;
  footer?: string;
  backgroundImageURL?: string;
  contents: ContentBlock[];
}

export interface ContentBlock {
  value: string;
  type: "title" | "paragraph" | "image" | "list";
  styles?: { [key: string]: string | number }; // e.g. { text-align: "center" }
}
