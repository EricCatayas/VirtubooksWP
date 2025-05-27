export type Notebook = Page[]; // A notebook must contain an even number of pages

export interface Page {
  id: string;
  type: "cover" | "sheet";
  side: "front" | "back";
  pageNumber?: number;
  header?: string;
  footer?: string;
  contents: ContentBlock[];
}

export interface ContentBlock {
  value: string;
  type: "title" | "paragraph" | "image" | "list";
}
