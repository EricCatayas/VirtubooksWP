import NotebookGrid from "../notebook-grid/notebook-grid.component";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NotebookService from "../../services/notebookService";

export default function UserNotebooks() {
  const { id: userId } = useParams();
  const [notebooks, setNotebooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const notebookService = new NotebookService();
    const fetchNotebooks = async () => {
      const fetchedNotebooks = await notebookService.fetchUserNotebooks(userId);

      setNotebooks(fetchedNotebooks);
      setLoading(false);
    };

    fetchNotebooks();
  }, []);

  return (
    <>
      {loading && <div className="loading">Loading user notebooks...</div>}
      {!loading && notebooks.length > 0 && (
        <NotebookGrid notebooks={notebooks} />
      )}
    </>
  );
}
