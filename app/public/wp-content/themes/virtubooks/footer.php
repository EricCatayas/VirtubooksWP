<footer id="footer">
	<div class="container">
		<div class="row">

			<div class="col-md-6">

				<div class="footer-item">
					<div class="company-brand">
						<div class="main-logo mb-2">
							<a href="<?php echo site_url(); ?>">
								<h1>Virtubooks</h1>
							</a>
						</div>
						<p>
							Virtubooks is a modern web application designed to make digital note-taking and writing more engaging and interactive. Whether you’re a student, writer, or creative professional, Virtubooks provides a virtual notebook experience that brings your ideas to life.
						</p>
					</div>
				</div>

			</div>

			<div class="col-md-2">

				<div class="footer-menu">
					<h5>Discover</h5>
					<ul class="menu-list">
						<li class="menu-item">
							<a href="/">Home</a>
						</li>
						<li class="menu-item">
							<a href="<?php echo esc_url(site_url('/notebooks/slug/about-us')); ?>">About</a>
						</li>
						<li class="menu-item">
							<a href="<?php echo esc_url(site_url('/blog')); ?>">Blog</a>
						</li>
						<?php if (is_front_page()) { ?>
							<li class="menu-item">
								<a href="#featured-books">Featured</a>
							</li>
							<li class="menu-item">
								<a href="#popular-books">Popular</a>
							</li>
						<?php } ?>
					</ul>
				</div>

			</div>
			<div class="col-md-2">

				<div class="footer-menu">
					<h5>My account</h5>
					<ul class="menu-list">
						<?php if (is_user_logged_in()) { ?>
							<li class="menu-item">
								<a href="<?php echo esc_url(site_url('/profile')); ?>">Profile</a>
							</li>
							<li class="menu-item">
								<a href="<?php echo esc_url(site_url('/notebooks/user/' . get_current_user_id())); ?>">My Notebooks</a>
							</li>
							<li class="menu-item">
								<a href="<?php echo esc_url(site_url('/notebooks/create')); ?>">Create Notebook</a>
							</li>
							<li class="menu-item">
								<a href="<?php echo wp_logout_url('/login'); ?>">Log Out</a>
							</li>

						<?php } else { ?>
							<li class="menu-item">
								<a href="<?php echo wp_login_url(); ?>">Sign In</a>
							</li>
							<li class="menu-item">
								<a href="<?php echo wp_registration_url(); ?>">Sign Up</a>
							</li>
						<?php } ?>

					</ul>
				</div>

			</div>
			<div class="col-md-2">

				<div class="footer-menu">
					<h5>Help</h5>
					<ul class="menu-list">
						<li class="menu-item">
							<a href="#">Help center</a>
						</li>
						<li class="menu-item">
							<a href="#">Report a problem</a>
						</li>
						<li class="menu-item">
							<a href="#">Contact us</a>
						</li>
					</ul>
				</div>

			</div>

		</div>
		<!-- / row -->

	</div>
</footer>

<div id="footer-bottom">
	<div class="container">
		<div class="row">
			<div class="col-md-12">

				<div class="copyright">
					<div class="row">

						<div class="col-md-6">
							<p>© 2022 All rights reserved. Free HTML Template by <a
									href="https://www.templatesjungle.com/" target="_blank">TemplatesJungle</a></p>
						</div>
					</div>

				</div>
			</div>

		</div>
	</div>
</div>
</div>

<?php wp_footer(); ?>

</body>

</html>