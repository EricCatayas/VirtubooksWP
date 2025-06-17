<?php
get_header();
?>

<div class="container my-5">
  <div class="row">
    <div class="col-md-12">
      <div class="section-header align-center">
        <div class="title">
          <span>Grab your opportunity</span>
        </div>
        <h2 class="section-title" id="user-notebook-title">Our Articles</h2>
      </div>

      <?php if (have_posts()) :
        while (have_posts()) : the_post(); ?>
          <div class="row align-items-center mb-4">
            <div class="col-md-4">
              <figure class="mb-0">
                <a href="<?php echo get_permalink(); ?>" class="image-hvr-effect d-block">
                  <?php if (has_post_thumbnail()) : ?>
                    <img src="<?php echo get_the_post_thumbnail_url(get_the_ID(), 'full'); ?>" alt="<?php the_title_attribute(); ?>" class="post-image img-fluid">
                  <?php else : ?>
                    <img src="<?php echo get_template_directory_uri(); ?>/images/default-thumbnail.jpg" alt="No image" class="post-image img-fluid">
                  <?php endif; ?>
                </a>
              </figure>
            </div>
            <div class="col-md-8">
              <div class="post-item">
                <div class="meta-date mb-2"><?php echo get_the_date(); ?></div>
                <h2><a href="<?php echo get_permalink(); ?>"><?php the_title(); ?></a></h2>
                <div class="post-content">
                  <?php the_excerpt(); ?>
                </div>
              </div>
            </div>
          </div>
      <?php endwhile;
      else :
        echo '<p>No posts found.</p>';
      endif; ?>
    </div>
  </div>
</div>

<?php
get_footer();
?>