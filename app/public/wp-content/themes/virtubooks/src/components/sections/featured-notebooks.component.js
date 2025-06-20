import NotebookList from "../notebook-list/notebook-list.component";
import React, { useState, useEffect } from "react";
import NotebookService from "../../services/notebookService";

export default function FeaturedNotebooks() {
  const headerTitle = "Featured Notebooks";
  const headerSubtitle = "Explore our curated selection of notebooks";
  const [notebooks, setNotebooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const notebookService = new NotebookService();
    const fetchNotebooks = async () => {
      const fetchedNotebooks = await notebookService.fetchFilteredNotebooks({
        tags: "featured",
        limit: 4,
      });

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
