<?php
get_header();
?>

<style>
  .notebook-form-container {
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .notebook-create-form {
    min-width: 320px;
    max-width: 400px;
    width: 100%;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
    padding: 32px 24px;
    margin-top: 2.5rem;
    margin-bottom: 2.5rem;
  }
</style>

<div class="notebook-form-container">
  <form id="notebookCreateForm" class="notebook-create-form" method="post" action="">
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
      <label for="visibility" class="form-label" style="font-size:0.95em;">Visibility</label>
      <select id="visibility" name="visibility" class="form-select form-select-sm" style="font-size:0.95em;" required>
        <option value="">Select visibility</option>
        <option value="public">Public</option>
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
    <div class="d-grid">
      <button type="submit" class="btn btn-primary btn-sm">Create Notebook</button>
    </div>
  </form>
</div>

<script type="module">
  document.getElementById('notebookCreateForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const API_URL = appData.api_url;

    const numberOfPages = parseInt(document.getElementById('numberOfPages').value) ?? 0;

    const totalNumberOfPages = 4 + (numberOfPages * 2)

    const notebook = {
      title: this.title.value,
      description: this.description.value,
      author: this.author.value,
      visibillity: this.visibility.value,
      aspectRatio: this.aspectRatio.value,
      numberOfPages: totalNumberOfPages,
    };

    const token = localStorage.getItem('token') || '';

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
        alert('Notebook created!');
      } else {
        alert("Failed to create notebook");
      }
      const newNotebook = await res.json();
      window.location.href = `/notebooks/${newNotebook.id}`;
    } catch (err) {
      alert('Failed to create notebook.');
      console.error(err);
    }
  });
</script>

<?php
get_footer();
?>