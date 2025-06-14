import AuthService from "./authService";

class NotebookService {
  API_URL = "";
  token = "";

  constructor() {
    this.API_URL = `${process.env.API_BASE_URL}/notebooks`;
    const authService = new AuthService();
    this.token = authService.getToken();
  }

  async fetchNotebook(id) {
    const res = await fetch(`${this.API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error("Notebook not found");
      }
      if (res.status === 403) {
        throw new Error("Access denied to this notebook");
      }
      throw new Error("Failed to fetch notebook");
    }
    return res.json();
  }

  async fetchPublicNotebooks() {
    const res = await fetch(`${this.API_URL}/`);
    if (!res.ok) throw new Error("Failed to fetch public notebooks");
    return res.json();
  }

  async fetchUserNotebooks(userId) {
    const res = await fetch(`${this.API_URL}/user/${userId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch user notebooks");
    return res.json();
  }

  async fetchFilteredNotebooks(filters) {
    const { userId, title, description, author, s_updatedAt, limit } = filters;
    const params = {};
    if (userId) params.userId = userId;
    if (title) params.title = title;
    if (description) params.description = description;
    if (author) params.author = author;
    if (s_updatedAt) params.s_updatedAt = s_updatedAt;
    if (limit) params.limit = limit;

    const queryParams = new URLSearchParams(params).toString();

    const res = await fetch(`${this.API_URL}/filter?${queryParams}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });

    if (!res.ok) throw new Error("Failed to fetch filtered notebooks");
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
    try {
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
    } catch (error) {
      console.error("Error updating notebook:", error);
      throw new Error("Failed to update notebook");
    }
  }

  async updatePages(notebookId, pages) {
    // ensure pages has even number of pages
    if (!Array.isArray(pages) || pages.length % 2 !== 0) {
      throw new Error("Pages must have an even number of pages");
    }

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
