import AuthService from "../services/authService.js";

class CreateNotebook {
  constructor() {
    this.init();
  }

  init() {
    const createForm = document.getElementById("notebook-create-form");
    if (createForm) {
      const authService = new AuthService();
      if (!authService.isLoggedIn()) {
        alert("You must be logged in to create a notebook.");
        window.location.href = "/login"; // Redirect to login page
        return;
      }

      authService.getUser().then((user) => {
        if (user) {
          document.getElementById("author").value = user.username;
        }
      });

      createForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        // Check if user is logged in

        const API_URL = process.env.API_BASE_URL;

        const form = e.target;
        let numberOfPages = parseInt(form.numberOfPages.value) || 0;
        if (isNaN(numberOfPages) || numberOfPages < 0) {
          alert("Please enter a valid number of pages.");
          return;
        }

        if (numberOfPages % 2 !== 0) {
          numberOfPages += 1; // Ensure even number of pages
        }

        // including front-cover & back-cover
        const totalNumberOfPages = 4 + numberOfPages;

        const notebook = {
          title: form.title.value,
          description: form.description.value,
          visibility: form.visibility.value,
          aspectRatio: form.aspectRatio.value,
          numberOfPages: totalNumberOfPages,
          tags: form.tags.value,
        };

        const token = authService.getToken();

        try {
          const res = await fetch(`${API_URL}/notebooks`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(notebook),
          });
          if (res.ok) {
            alert("Notebook created!");
          } else {
            throw new Error("Failed to create notebook");
          }
          const newNotebook = await res.json();
          window.location.href = `/notebooks/${newNotebook.id}`;
        } catch (err) {
          alert("Failed to create notebook.");
          console.error(err);
        }
      });
    }
  }
}

export default CreateNotebook;
