import NotebookGrid from "../notebook-grid/notebook-grid.component";
import React, { useState, useEffect } from "react";
import NotebookService from "../../services/notebookService";

export default function AllNotebooks() {
  const [notebooks, setNotebooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const notebookService = new NotebookService();
    const fetchNotebooks = async () => {
      const fetchedNotebooks = await notebookService.fetchPublicNotebooks();

      setNotebooks(fetchedNotebooks);
      setLoading(false);
    };

    fetchNotebooks();
  }, []);

  return (
    <>
      {loading && <div className="loading">Loading all notebooks...</div>}
      {!loading && notebooks.length > 0 && (
        <NotebookGrid notebooks={notebooks} />
      )}
    </>
  );
}
