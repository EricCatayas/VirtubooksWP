import AuthService from "../services/authService.js";

class ImageUploads {
  constructor() {
    this.init();
  }

  init() {
    const API_URL = process.env.API_BASE_URL;

    const authService = new AuthService();
    const token = authService.getToken();

    // Fetch and display user images
    async function loadUserImages() {
      const grid = document.getElementById("userImagesGrid");

      if (!grid) {
        return;
      }

      grid.innerHTML =
        '<div style="grid-column:1/-1;text-align:center;">Loading...</div>';
      try {
        const res = await fetch(`${API_URL}/image-uploads`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch images");
        const images = await res.json();
        if (!images.length) {
          grid.innerHTML =
            '<div style="grid-column:1/-1;text-align:center;color:#888;">No images uploaded yet.</div>';
          return;
        }
        grid.innerHTML = images
          .map(
            (img) => `
        <div class="image-upload-item">
          <a href="${img.imageURL}" target="_blank">
            <img src="${img.imageURL}" alt="Uploaded image"/>
            <div class="image-upload-date">${new Date(
              img.createdAt
            ).toLocaleString()}</div>
          </a>
          <button class="btn btn-small btn-outline-danger borderless mt-2" data-image-id="${
            img.id
          }">Delete</button>
        </div>
      `
          )
          .join("");

        grid.querySelectorAll("button[data-image-id]").forEach((btn) => {
          btn.addEventListener("click", function () {
            const imageId = this.getAttribute("data-image-id");
            deleteImage(imageId);
          });
        });
      } catch (err) {
        grid.innerHTML =
          '<div style="grid-column:1/-1;text-align:center;color:#c00;">Failed to load images.</div>';
        console.error(err);
      }
    }

    // Initial load
    loadUserImages();

    // Image Upload handler
    const imageUploadForm = document.getElementById("imageUploadForm");

    if (imageUploadForm) {
      imageUploadForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const formData = new FormData();
        const fileInput = document.getElementById("imageFile");
        if (fileInput.files.length === 0) {
          alert("Please select an image file.");
          return;
        }
        formData.append("file", fileInput.files[0]); // field name must be "file"

        await uploadImage(formData);
      });
    }

    async function uploadImage(formData) {
      try {
        const res = await fetch(`${API_URL}/image-uploads`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            // Do NOT set Content-Type header for FormData; browser will set it with boundary
          },
          body: formData,
        });
        if (res.ok) {
          const data = await res.json();
          alert("Image uploaded successfully");
          loadUserImages(); // Refresh grid
        } else {
          const errData = await res.json();
          alert(
            "Failed to upload image: " + (errData.message || "Unknown error")
          );
        }
      } catch (err) {
        alert("Failed to upload image.");
        console.error(err);
      }
    }

    // Delete image handler
    async function deleteImage(imageId) {
      if (!confirm("Are you sure you want to delete this image?")) return;
      try {
        const res = await fetch(`${API_URL}/image-uploads/${imageId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          alert("Image deleted successfully.");
          loadUserImages(); // Refresh grid
        } else {
          const errData = await res.json();
          alert(
            "Failed to delete image: " + (errData.message || "Unknown error")
          );
        }
      } catch (err) {
        alert("Failed to delete image.");
        console.error(err);
      }
    }
  }
}

export default ImageUploads;
