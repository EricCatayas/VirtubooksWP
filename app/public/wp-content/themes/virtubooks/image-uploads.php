<?php
get_header();
?>

<div class="container" style="padding-top: 2.5rem; padding-bottom: 2.5rem;">
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h1 class="mb-0">My Image Uploads</h1>
    <a href="<?php echo home_url('/'); ?>" class="btn btn-small btn-outline-accent borderless">Back to Dashboard</a>
  </div>
  <p class="text-muted mb-4">Here you can upload and manage your images. Uploaded images will be displayed below.</p>
  <div class="row flex-md-row">
    <div class="col-12 col-md-9 order-2 order-md-1">
      <div id="userImagesGrid" class="image-upload-grid image-uploads-container"></div>
    </div>
    <div class="col-12 col-md-3 order-1 order-md-2">
      <div class="image-upload-form-container image-uploads-container">
        <form id="imageUploadForm" class="image-upload-form" enctype="multipart/form-data">
          <div class="mb-3">
            <label for="imageFile" class="form-label" style="font-size:0.95em;">Select Image</label>
            <input type="file" id="imageFile" name="imageFile" class="form-control form-control-sm" style="font-size:0.95em;" accept="image/*" required>
          </div>
          <div class="d-grid">
            <button type="submit" class="btn btn-primary btn-small">Upload Image</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>


<script type="module">
  const API_URL = appData.api_url;
  const token = localStorage.getItem('token') || '';

  // Fetch and display user images
  async function loadUserImages() {
    const grid = document.getElementById('userImagesGrid');
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;">Loading...</div>';
    try {
      const res = await fetch(`${API_URL}/image-uploads`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Failed to fetch images');
      const images = await res.json();
      if (!images.length) {
        grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:#888;">No images uploaded yet.</div>';
        return;
      }
      grid.innerHTML = images.map(img => `
        <div class="image-upload-item">
          <a href="${img.imageURL}" target="_blank">
            <img src="${img.imageURL}" alt="Uploaded image"/>
            <div class="image-upload-date">${new Date(img.createdAt).toLocaleString()}</div>
          </a>
          <button class="btn btn-small btn-outline-danger borderless mt-2" data-image-id="${img.id}">Delete</button>
        </div>
      `).join('');

      grid.querySelectorAll('button[data-image-id]').forEach(btn => {
        btn.addEventListener('click', function() {
          const imageId = this.getAttribute('data-image-id');
          deleteImage(imageId);
        });
      });
    } catch (err) {
      grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:#c00;">Failed to load images.</div>';
      console.error(err);
    }
  }

  // Initial load
  loadUserImages();

  // Image Upload handler
  document.getElementById('imageUploadForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData();
    const fileInput = document.getElementById('imageFile');
    if (fileInput.files.length === 0) {
      alert('Please select an image file.');
      return;
    }
    formData.append('file', fileInput.files[0]); // field name must be "file"

    await uploadImage(formData);
  });

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
        alert('Image uploaded successfully');
        loadUserImages(); // Refresh grid
      } else {
        const errData = await res.json();
        alert("Failed to upload image: " + (errData.message || 'Unknown error'));
      }
    } catch (err) {
      alert('Failed to upload image.');
      console.error(err);
    }
  }

  // Delete image handler
  async function deleteImage(imageId) {
    if (!confirm('Are you sure you want to delete this image?')) return;
    try {
      const res = await fetch(`${API_URL}/image-uploads/${imageId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        alert('Image deleted successfully.');
        loadUserImages(); // Refresh grid
      } else {
        const errData = await res.json();
        alert("Failed to delete image: " + (errData.message || 'Unknown error'));
      }
    } catch (err) {
      alert('Failed to delete image.');
      console.error(err);
    }
  }
</script>

<?php
get_footer();
?>