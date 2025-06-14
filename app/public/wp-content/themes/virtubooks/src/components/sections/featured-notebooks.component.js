import NotebookList from "../notebook-list/notebook-list.component";
import React, { useState, useEffect } from "react";
import NotebookService from "../../services/notebookService";

export default function FeaturedNotebooks() {
  const headerTitle = "Featured Notebooks";
  const headerSubtitle = "Explore our curated selection of notebooks";
  const [notebooks, setNotebooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    // Define an async function inside useEffect
    const notebookService = new NotebookService();
    const fetchNotebooks = async () => {
      // Simulate fetching featured notebooks from the API
      const publicNotebooks = await notebookService.fetchPublicNotebooks();

      const fetchedNotebooks = [
        {
          id: 1,
          title: "Simple way of piece life",
          author: "Armor Ramsey",
          aspectRatio: "6:9",
          pages: [
            {
              id: "1",
              // backgroundImageURL: "https://unlimitedworks.blob.core.windows.net/virtubooks-image-uploads/product-item1.jpg",
              contents: [
                {
                  type: "paragraph",
                  value:
                    "This is a sample content for the first page of the notebook.",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          title: "Great travel at desert",
          author: "Sanchit Howdy",
          aspectRatio: "7:9",
          pages: [
            {
              id: "2",
              backgroundImageURL:
                "https://unlimitedworks.blob.core.windows.net/virtubooks-image-uploads/product-item2.jpg",
              contents: [],
            },
          ],
        },
        {
          id: 3,
          title: "The lady beauty Scarlett",
          author: "Arthur Doyle",
          aspectRatio: "3:5",
          pages: [
            {
              id: "3",
              backgroundImageURL:
                "https://unlimitedworks.blob.core.windows.net/virtubooks-image-uploads/product-item3.jpg",
              contents: [],
            },
          ],
        },
        {
          id: 4,
          title: "Once upon a time",
          author: "Klien Marry",
          aspectRatio: "13:20",
          pages: [
            {
              id: "4",
              backgroundImageURL:
                "https://unlimitedworks.blob.core.windows.net/virtubooks-image-uploads/product-item4.jpg",
              contents: [],
            },
          ],
        },
      ];
      setNotebooks(fetchedNotebooks);
      setLoading(false);
    };

    fetchNotebooks();
  }, []);

  return (
    <>
      {loading && <div className="loading">Loading featured notebooks...</div>}
      {!loading && notebooks.length > 0 && (
        <NotebookList
          notebooks={notebooks}
          headerTitle={headerTitle}
          headerSubtitle={headerSubtitle}
        />
      )}
    </>
  );
}
