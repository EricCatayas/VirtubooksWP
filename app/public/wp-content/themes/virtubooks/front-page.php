<?php
get_header();
?>
<section id="billboard"></section>


<section id="client-holder" data-aos="fade-up">
	<div class="container">
		<div class="row">
			<div class="inner-content">
				<div class="logo-wrap">
					<div class="grid">
						<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/images/client-image1.png" alt="client"></a>
						<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/images/client-image2.png" alt="client"></a>
						<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/images/client-image3.png" alt="client"></a>
						<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/images/client-image4.png" alt="client"></a>
						<a href="#"><img src="<?php echo get_template_directory_uri(); ?>/images/client-image5.png" alt="client"></a>
					</div>
				</div><!--image-holder-->
			</div>
		</div>
	</div>
</section>

<section id="featured-books" class="py-5 my-5" data-aos="fade-up"></section>

<section id="popular-books" class="bookshelf py-5 my-5"></section>

<section id="quotation" class="align-center pb-5 mb-5">
	<div class="inner-content">
		<h2 class="section-title divider">Quote for Readers</h2>
		<?php
		$quotes = new WP_Query(array(
			'post_type' => 'quote',
			'posts_per_page' => 1,
			'orderby' => 'rand'
		));
		if ($quotes->have_posts()) {
			$quotes->the_post();
		?>
			<blockquote data-aos="fade-up">
				<q><?php echo wp_strip_all_tags(get_the_content()); ?></q>
				<div class="author-name"><?php the_field('author'); ?></div>
			</blockquote>
		<?php
			wp_reset_postdata();
		}
		?>
	</div>
</section>

<section id="subscribe">
	<div class="container">
		<div class="row justify-content-center">

			<div class="col-md-8">
				<div class="row">

					<div class="col-md-6">

						<div class="title-element">
							<h2 class="section-title divider">Subscribe to our newsletter</h2>
						</div>

					</div>
					<div class="col-md-6">

						<div class="subscribe-content" data-aos="fade-up">
							<p>Sed eu feugiat amet, libero ipsum enim pharetra hac dolor sit amet, consectetur. Elit
								adipiscing enim pharetra hac.</p>
							<form id="form">
								<input type="text" name="email" placeholder="Enter your email addresss here">
								<button class="btn-subscribe">
									<span>send</span>
									<i class="icon icon-send"></i>
								</button>
							</form>
						</div>

					</div>

				</div>
			</div>

		</div>
	</div>
</section>

<section id="latest-blog" class="py-5 my-5">
	<div class="container">
		<div class="row">
			<div class="col-md-12">

				<div class="section-header align-center">
					<div class="title">
						<span>Read our articles</span>
					</div>
					<h2 class="section-title">Latest Articles</h2>
				</div>

				<div class="row">

					<?php
					$args = array(
						'posts_per_page' => 3
					);
					$query = new WP_Query($args);

					if ($query->have_posts()) :
						while ($query->have_posts()) : $query->the_post(); ?>
							<div class="col-md-4">
								<article class="column" data-aos="fade-up">
									<figure>
										<a href="<?php echo get_permalink(); ?>" class="image-hvr-effect">
											<img src="<?php echo get_the_post_thumbnail_url(get_the_ID(), 'full'); ?>" alt="post" class="post-image">
										</a>
									</figure>

									<div class="post-item">
										<div class="meta-date"><?php echo get_the_date(); ?></div>
										<h3><a href="<?php echo get_permalink(); ?>"><?php the_title(); ?></a></h3>
										<div class="links-element">
											<div class="categories">inspiration</div>
										</div>
									</div>
								</article>
							</div>
					<?php endwhile;
						wp_reset_postdata();
					else :
						echo '<p>No posts found.</p>';
					endif;
					?>

				</div>

				<div class="row">

					<div class="btn-wrap align-center">
						<a href="/blog" class="btn btn-outline-accent btn-accent-arrow" tabindex="0">Read All Articles<i
								class="icon icon-ns-arrow-right"></i></a>
					</div>
				</div>

			</div>
		</div>
	</div>
</section>

<section id="download-app" class="leaf-pattern-overlay">
	<div class="corner-pattern-overlay"></div>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<div class="row">

					<div class="col-md-5">
						<figure>
							<img src="<?php echo get_template_directory_uri(); ?>/images/device.png" alt="phone" class="single-image">
						</figure>
					</div>

					<div class="col-md-7">
						<div class="app-info">
							<h2 class="section-title divider">Download our app now !</h2>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis sed ptibus
								liberolectus nonet psryroin. Amet sed lorem posuere sit iaculis amet, ac urna.
								Adipiscing fames semper erat ac in suspendisse iaculis.</p>
							<div class="google-app">
								<img src="<?php echo get_template_directory_uri(); ?>/images/google-play.jpg" alt="google play">
								<img src="<?php echo get_template_directory_uri(); ?>/images/app-store.jpg" alt="app store">
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</section>

<?php
get_footer();
?>