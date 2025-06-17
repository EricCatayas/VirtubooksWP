<?php
get_header();
?>

<div class="container py-5 my-5">
  <div class="row justify-content-center">
    <div class="col-md-8">
      <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
          <article>
            <h1><?php the_title(); ?></h1>
            <div class="meta-date mb-3"><?php echo get_the_date(); ?></div>
            <?php if (has_post_thumbnail()) : ?>
              <figure>
                <?php the_post_thumbnail('large', ['class' => 'img-fluid mb-4']); ?>
              </figure>
            <?php endif; ?>
            <div class="post-content">
              <?php the_content(); ?>
            </div>
          </article>
      <?php endwhile;
      endif; ?>
    </div>
  </div>
</div>

<?php
get_footer();
?>