<?php
get_header();
?>
<div class="notebook-form-container">
  <form id="login-form" class="notebook-create-form">
    <h2>Sign In</h2>
    <div class="mb-3">
      <label for="login-email" class="form-label">Email</label>
      <input type="email" class="form-control" id="login-email" required>
    </div>
    <div class="mb-3">
      <label for="login-password" class="form-label">Password</label>
      <input type="password" class="form-control" id="login-password" required>
    </div>
    <!-- <div class="form-check mb-2">
      <input type="checkbox" class="form-check-input" id="login-remember">
      <label class="form-check-label" for="login-remember">Remember Me</label>
    </div> -->
    <div class="d-flex justify-content-end mb-2">
      <button type="submit" class="btn btn-primary btn-small">Sign In</button>
    </div>
    <div class="d-flex justify-content-between">
      <a href="<?php echo wp_registration_url(); ?>" class="">Register</a>
      <a href="<?php echo wp_lostpassword_url(); ?>" class="">Forgot Password?</a>
    </div>
    <div id="login-error" class="text-danger mt-2" style="display:none;"></div>
  </form>
</div>
<?php
get_footer();
?>