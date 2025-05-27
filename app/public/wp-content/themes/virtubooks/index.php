<?php
get_header();
if (have_posts()) {
  the_content();
}
?>
<p> Hello from index.php</p>

<?php
get_footer();
?>