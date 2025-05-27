<?php
get_header();
if (have_posts()) {
  // the_post();
  $content = get_post_field('post_content', get_the_ID());
  $pages = preg_split('/<!--nextpage-->/i', $content);

  foreach ($pages as $page_content) {
    echo '<div class="page-part">';
    echo apply_filters('the_content', $page_content);
    echo '</div>';
  }
?>
<?php
}
get_footer();
?>