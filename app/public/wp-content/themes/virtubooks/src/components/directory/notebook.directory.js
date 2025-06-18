import NotebookEditor from "../notebook-editor/notebook-editor.component";
import NotebookService from "../../services/notebookService";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function NotebookDirectory() {
  const { id: notebookId } = useParams();
  const [notebook, setNotebook] = useState(null);

  const notebookService = new NotebookService();

  useEffect(async () => {
    // dispatch(resetNotebookState());
    try {
      const fetchedNotebook = await notebookService.fetchNotebook(notebookId);
      setNotebook(fetchedNotebook);
    } catch (error) {
      alert("Failed to load notebook: " + error.message);
    }
  }, [notebookId]);

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
