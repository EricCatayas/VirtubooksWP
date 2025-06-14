<?php
?>
<div id="logout">
  <div>Signing out...</div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    fetch('/wp-json/virtubooks/v1/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': '<?php echo wp_create_nonce('wp_rest'); ?>'
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          document.getElementById('logout').innerHTML = `<div>${data.message}</div>`;
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
        } else {
          document.getElementById('logout').innerHTML = '<div>Error logging out. Please try again.</div>';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('logout').innerHTML = '<div>Error logging out. Please try again.</div>';
      });
  });
</script>