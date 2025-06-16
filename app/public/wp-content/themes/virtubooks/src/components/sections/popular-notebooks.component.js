import NotebookList from "../notebook-list/notebook-list.component";
import React, { useState, useEffect } from "react";
import NotebookService from "../../services/notebookService";

export default function PopularNotebooks() {
  const headerTitle = "Popular Notebooks";
  const headerSubtitle =
    "Explore our most popular notebooks from the Virtubooks community";
  const [notebooks, setNotebooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const notebookService = new NotebookService();
    const fetchNotebooks = async () => {
      const fetchedNotebooks = await notebookService.fetchFilteredNotebooks({
        tags: "popular",
        limit: 8,
      });

      setNotebooks(fetchedNotebooks);
      setLoading(false);
    };

    fetchNotebooks();
  }, []);

  return (
    <>
      {loading && <div className="loading">Loading popular notebooks...</div>}
      {!loading && notebooks.length > 0 && (
        <NotebookList
          notebooks={notebooks}
          headerTitle={headerTitle}
          headerSubtitle={headerSubtitle}
          viewAllLink="/notebooks"
        />
      )}
    </>
  );
}
