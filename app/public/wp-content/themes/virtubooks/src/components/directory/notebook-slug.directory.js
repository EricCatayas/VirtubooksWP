import NotebookEditor from "../notebook-editor/notebook-editor.component";
import NotebookService from "../../services/notebookService";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function NotebookSlugDirectory() {
  const { slug } = useParams();
  const [notebook, setNotebook] = useState(null);

  const notebookService = new NotebookService();

  useEffect(async () => {
    // dispatch(resetNotebookState());
    try {
      const fetchedNotebook = await notebookService.fetchNotebookBySlug(slug);
      setNotebook(fetchedNotebook);
    } catch (error) {
      alert("Failed to load notebook: " + error.message);
    }
  }, [slug]);

  return (
    <>
      {notebook ? (
        <NotebookEditor notebook={notebook} />
      ) : (
        <div className="loading">Loading notebook...</div>
      )}
    </>
  );
}
