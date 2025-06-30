export const defaultCoverImageURL =
  "https://unlimitedworks.blob.core.windows.net/virtubooks-image-uploads/main-banner2.jpg"; // todo

export const newNotebook = {
  id: "new-notebook",
  title: "Getting Started",
  description: 'Click "New Notebook" to start writing your first notebook.',
  userId: "new-user",
  visibility: "public",
  author: "Virtubooks Team",
  aspectRatio: "7:9",
  pages: [
    {
      id: "front-cover",
      idx: 0,
      backgroundImageURL:
        "https://unlimitedworks.blob.core.windows.net/virtubooks-image-uploads/Getting%20Started.jpg",
      contents: [],
    },
    {
      id: "blank-page",
      idx: 1,
      contents: [
        {
          type: "paragraph",
          value: "This is a blank page. Start writing your thoughts here.",
          style: {
            fontSize: "16px",
            color: "#666",
            textAlign: "left",
          },
        },
      ],
    },
    {
      id: "blank-page-2",
      idx: 2,
      contents: [
        {
          type: "paragraph",
          value: "Feel free to add more pages as you write.",
          style: {
            fontSize: "16px",
            color: "#666",
            textAlign: "left",
          },
        },
      ],
    },
    {
      id: "back-cover",
      idx: 1,
      contents: [
        {
          type: "paragraph",
          value: "Thank you for choosing VirtuBooks. Happy writing!",
          style: {
            fontSize: "16px",
            color: "#666",
            textAlign: "center",
          },
        },
      ],
    },
  ],
};
