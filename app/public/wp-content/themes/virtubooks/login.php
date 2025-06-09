<?php
get_header();
?>
<div class="container mt-5">
  <h2>Sign In</h2>
  <form id="login-form">
    <div class="mb-3">
      <label for="login-email" class="form-label">Email</label>
      <input type="email" class="form-control" id="login-email" required>
    </div>
    <div class="mb-3">
      <label for="login-password" class="form-label">Password</label>
      <input type="password" class="form-control" id="login-password" required>
    </div>
    <div class="form-check mb-3">
      <input type="checkbox" class="form-check-input" id="login-remember">
      <label class="form-check-label" for="login-remember">Remember Me</label>
    </div>
    <button type="submit" class="btn btn-primary">Sign In</button>
    <div id="login-error" class="text-danger mt-2" style="display:none;"></div>
  </form>
</div>
<?php
get_footer();
?>