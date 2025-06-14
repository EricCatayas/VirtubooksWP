<?php
get_header();
$visibilityInfo = "Public visibility means anyone can view this notebook. Private visibility means only you can view this notebook.";

?>

<div class="notebook-form-container">
  <form id="notebook-create-form" class="notebook-create-form" method="post" action="">
    <div class="mb-3">
      <label for="title" class="form-label" style="font-size:0.95em;">Title</label>
      <input type="text" id="title" name="title" class="form-control form-control-sm" style="font-size:0.95em;" required>
    </div>
    <div class="mb-3">
      <label for="description" class="form-label" style="font-size:0.95em;">Description</label>
      <textarea id="description" name="description" class="form-control form-control-sm" rows="2" style="font-size:0.95em;"></textarea>
    </div>
    <div class="mb-3">
      <label for="author" class="form-label" style="font-size:0.95em;">Author</label>
      <input type="text" id="author" name="author" class="form-control form-control-sm" style="font-size:0.95em;">
    </div>
    <div class="mb-3">
      <div class="d-flex align-items-center justify-content-between">
        <label for="visibility" class="form-label" style="font-size:0.95em;">Visibility</label>
        <span class="text-accent" title="<?php echo $visibilityInfo ?>"><i class="fa-solid fa-info"></i> </span>
      </div>
      <select id="visibility" name="visibility" class="form-select form-select-sm" style="font-size:0.95em;" required>
        <option value="">Select visibility</option>
        <option value=" public">Public</option>
        <option value="private">Private</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="aspectRatio" class="form-label" style="font-size:0.95em;">Aspect Ratio</label>
      <select id="aspectRatio" name="aspectRatio" class="form-select form-select-sm" style="font-size:0.95em;" required>
        <option value="">Select aspect ratio</option>
        <option value="6:9">6:9</option>
        <option value="13:20">13:20</option>
        <option value="3:5">3:5</option>
        <option value="7:9">7:9</option>
        <option value="1:1">1:1</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="numberOfPages" class="form-label" style="font-size:0.95em;">Number of Pages</label>
      <input type="number" id="numberOfPages" name="numberOfPages" class="form-control form-control-sm" style="font-size:0.95em;" min="1" required>
    </div>
    <div class="mb-3">
      <label for="tags" class="form-label" style="font-size:0.95em;">Tags</label>
      <input type="text" id="tags" name="tags" class="form-control form-control-sm" style="font-size:0.95em;" placeholder="e.g., science, technology, art">
    </div>
    <div class="d-grid">
      <button type="submit" class="btn btn-primary btn-sm">Create Notebook</button>
    </div>
  </form>
</div>

<?php
get_footer();
?>