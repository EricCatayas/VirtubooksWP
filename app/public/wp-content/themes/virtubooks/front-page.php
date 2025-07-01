<?php
get_header();
?>
<section id="billboard"></section>

<section id="featured-books" class="py-5 my-5" data-aos="fade-up"></section>

<section id="popular-books" class="bookshelf py-5 my-5"></section>

<section id="quotation" class="align-center pb-5 mb-5">
	<div class="inner-content">
		<h2 class="section-title divider">Quote for Readers</h2>
		<?php
		$quotes = new WP_Query(array(
			'post_type' => 'quote',
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
											<div class="categories"><?php echo get_post_meta(get_the_ID(), 'category', true); ?></div>
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

<?php
get_footer();
?>