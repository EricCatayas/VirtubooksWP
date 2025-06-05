export class NotebookService {
  API_URL = "";

  constructor() {
    this.API_URL = `${process.env.API_BASE_URL}/notebooks`;
  }

  async getNotebook(id, token) {
    const res = await fetch(`${this.API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch notebook");
    return res.json();
  }

  async getPublicNotebooks() {
    const res = await fetch(`${this.API_URL}/`);
    if (!res.ok) throw new Error("Failed to fetch public notebooks");
    return res.json();
  }

  async getUserNotebooks(token) {
    const res = await fetch(`${this.API_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch user notebooks");
    return res.json();
  }

  async createNotebook(notebook, token) {
    const res = await fetch(`${this.API_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(notebook),
    });
    if (!res.ok) throw new Error("Failed to create notebook");
    return res.json();
  }

  async updateNotebook(notebook, token) {
    const res = await fetch(`${this.API_URL}/${notebook.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(notebook),
    });
    if (!res.ok) throw new Error("Failed to update notebook");
    const updatedNotebook = res.json();
    const updatedPages = await this.updatePages(
      notebook.id,
      notebook.pages,
      token
    );
    updatedNotebook.pages = updatedPages;
    return updatedNotebook;
  }

  async updatePages(notebookId, pages, token) {
    const res = await fetch(`${this.API_URL}/${notebookId}/pages`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ pages }),
    });
    if (!res.ok) throw new Error("Failed to update pages");
    return res.json();
  }

  async deleteNotebook(id, token) {
    const res = await fetch(`${this.API_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to delete notebook");
  }

  async updatePage(notebookId, pageId, page, token) {
    const res = await fetch(`${this.API_URL}/${notebookId}/pages/${pageId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(page),
    });
    if (!res.ok) throw new Error("Failed to update page");
    return res.json();
  }
}

export default NotebookService;
