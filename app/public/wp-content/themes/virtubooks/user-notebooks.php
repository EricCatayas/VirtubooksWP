<?php
get_header();
?>
<section id="all-books" class="bookshelf pb-5 mb-5">

  <div class="section-header align-center">
    <div class="title">
      <span>Grab your opportunity</span>
    </div>
    <h2 class="section-title" id="user-notebook-title">{username}'s Notebooks</h2>
  </div>

  <div id="user-notebooks"></div>
</section>
<script>
  document.addEventListener('DOMContentLoaded', async function() {
    // Extract user ID from URL: /notebooks/user/:id
    const match = window.location.pathname.match(/\/notebooks\/user\/(\d+)/);
    if (!match) return;
    const userId = match[1];

    try {
      const response = await fetch(`/wp-json/virtubooks/v1/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Remove Origin header if not needed, or set it to your API base URL if required
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user by ID");
      }

      const data = await response.json();

      if (data.user && data.user.username) {
        const user = localStorage.getItem('user');
        if (user) {
          const userData = JSON.parse(user);
          if (userData.id == userId) {
            document.getElementById('user-notebook-title').textContent = `My Notebooks`;
          } else {
            document.getElementById('user-notebook-title').textContent = `${data.user.username}'s Notebooks`;
          }
        } else {
          // If no user is logged in, just show the username
          document.getElementById('user-notebook-title').textContent = `${data.user.username}'s Notebooks`;
        }
      }
    } catch (error) {
      console.error(error);
    }
  });
</script>
<?php
get_footer();
?>