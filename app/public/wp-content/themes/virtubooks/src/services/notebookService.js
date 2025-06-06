import AuthService from "./authService";

class NotebookService {
  API_URL = "";
  token = "";

  constructor() {
    this.API_URL = `${process.env.API_BASE_URL}/notebooks`;
    const authService = new AuthService();
    this.token = authService.getToken();
  }

  async getNotebook(id) {
    const res = await fetch(`${this.API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch notebook");
    return res.json();
  }

  async getPublicNotebooks() {
    const res = await fetch(`${this.API_URL}/`);
    if (!res.ok) throw new Error("Failed to fetch public notebooks");
    return res.json();
  }

  async getUserNotebooks() {
    const res = await fetch(`${this.API_URL}/user`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch user notebooks");
    return res.json();
  }

  async createNotebook(notebook) {
    const res = await fetch(`${this.API_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(notebook),
    });
    if (!res.ok) throw new Error("Failed to create notebook");
    return res.json();
  }

  async updateNotebook(notebook) {
    const res = await fetch(`${this.API_URL}/${notebook.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(notebook),
    });
    if (!res.ok) throw new Error("Failed to update notebook");
    const updatedNotebook = res.json();
    const updatedPages = await this.updatePages(notebook.id, notebook.pages);
    updatedNotebook.pages = updatedPages;
    return updatedNotebook;
  }

  async updatePages(notebookId, pages) {
    const res = await fetch(`${this.API_URL}/${notebookId}/pages`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({ pages }),
    });
    if (!res.ok) throw new Error("Failed to update pages");
    const updatedNotebook = res.json();
    return updatedNotebook.pages;
  }

  async deleteNotebook(id) {
    const res = await fetch(`${this.API_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${this.token}` },
    });
    if (!res.ok) throw new Error("Failed to delete notebook");
  }

  async updatePage(notebookId, pageId, page) {
    const res = await fetch(`${this.API_URL}/${notebookId}/pages/${pageId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(page),
    });
    if (!res.ok) throw new Error("Failed to update page");
    return res.json();
  }
}

export default NotebookService;
