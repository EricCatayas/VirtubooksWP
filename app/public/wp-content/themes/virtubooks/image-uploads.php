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

<?php
get_footer();
?>