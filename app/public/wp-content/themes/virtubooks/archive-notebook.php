<?php
get_header();
?>
<?php
while (have_posts()) {
  the_post();
}
?>
<p> Hello from archive-notebook.php</p>
<!-- TODO: Display all notebooks  -->

<?php
get_footer();
?>