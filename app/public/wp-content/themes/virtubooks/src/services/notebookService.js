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
    try {
      const res = await fetch(`${this.API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to fetch notebook");
      }
      return res.json();
    } catch (error) {
      if (error.message === "Token expired") {
        alert("Your session has expired. Please log in again.");
        window.location.href = "/login";
      }
      console.error("Error fetching notebook:", error);
      throw new Error(error.message || "Failed to fetch notebook");
    }
  }

  async fetchNotebookBySlug(slug) {
    try {
      const res = await fetch(`${this.API_URL}/slug/${slug}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to fetch notebook by slug");
      }
      return res.json();
    } catch (error) {
      if (error.message === "Token expired") {
        alert("Your session has expired. Please log in again.");
        window.location.href = "/login";
      }
      console.error("Error fetching notebook by slug:", error);
      throw new Error(error.message || "Failed to fetch notebook by slug");
    }
  }

  async fetchPublicNotebooks() {
    try {
      const res = await fetch(`${this.API_URL}/`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to fetch public notebooks");
      }
      return res.json();
    } catch (error) {
      console.error("Error fetching public notebooks:", error.message);
      throw new Error(error.message || "Failed to fetch public notebooks");
    }
  }

  async fetchUserNotebooks(userId) {
    try {
      const res = await fetch(`${this.API_URL}/user/${userId}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to fetch user notebooks");
      }
      return res.json();
    } catch (error) {
      if (error.message === "Token expired") {
        alert("Your session has expired. Please log in again.");
        window.location.href = "/login";
      }
      throw new Error(error.message || "Failed to fetch user notebooks");
    }
  }

  async fetchFilteredNotebooks(filters) {
    const { userId, title, description, tags, author, s_updatedAt, limit } =
      filters;
    const params = {};
    if (userId) params.userId = userId;
    if (title) params.title = title;
    if (description) params.description = description;
    if (author) params.author = author;
    if (tags) params.tags = tags;
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
    try {
      const res = await fetch(`${this.API_URL}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(notebook),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create notebook");
      }
      return res.json();
    } catch (error) {
      if (error.message === "Token expired") {
        alert("Your session has expired. Please log in again.");
        window.location.href = "/login";
      }
      throw new Error(error.message || "Failed to create notebook");
    }
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
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to update notebook");
      }
      const updatedNotebook = res.json();
      const updatedPages = await this.updatePages(notebook.id, notebook.pages);
      updatedNotebook.pages = updatedPages;
      return updatedNotebook;
    } catch (error) {
      if (error.message === "Token expired") {
        window.location.href = "/login";
      }
      console.error("Error updating notebook:", error);
      throw new Error(error.message || "Failed to update notebook");
    }
  }

  async updatePages(notebookId, pages) {
    // ensure pages has even number of pages
    if (!Array.isArray(pages) || pages.length % 2 !== 0) {
      throw new Error("Pages must have an even number of pages");
    }

    try {
      const res = await fetch(`${this.API_URL}/${notebookId}/pages`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({ pages }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to update pages");
      }
      const updatedNotebook = res.json();
      return updatedNotebook.pages;
    } catch (error) {
      if (error.message === "Token expired") {
        alert("Your session has expired. Please log in again.");
        window.location.href = "/login";
      }
      console.error("Error updating pages:", error);
      throw new Error(error.message || "Failed to update pages");
    }
  }

  async deleteNotebook(id) {
    try {
      const res = await fetch(`${this.API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${this.token}` },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete notebook");
      }
    } catch (error) {
      if (error.message === "Token expired") {
        alert("Your session has expired. Please log in again.");
        window.location.href = "/login";
      }
      console.error("Error deleting notebook:", error);
      throw new Error(error.message || "Failed to delete notebook");
    }
  }

  async updatePage(notebookId, pageId, page) {
    try {
      const res = await fetch(`${this.API_URL}/${notebookId}/pages/${pageId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(page),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to update page");
      }
      return res.json();
    } catch (error) {
      if (error.message === "Token expired") {
        alert("Your session has expired. Please log in again.");
        window.location.href = "/login";
      }
      console.error("Error updating page:", error);
      throw new Error(error.message || "Failed to update page");
    }
  }
}

export default NotebookService;
