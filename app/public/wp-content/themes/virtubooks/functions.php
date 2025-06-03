<?php
function app_files()
{
  // Enqueue Bootstrap CSS
  wp_enqueue_style('bootstrap-css', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css', array(), '5.3.1', 'all');

  // Enqueue Font Awesome CSS
  wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css', array(), '6.4.2', 'all');

  // Enqueue custom styles
  wp_enqueue_style('normalize-css', get_template_directory_uri() . '/css/normalize.css', array(), null, 'all');
  wp_enqueue_style('icomoon-css', get_template_directory_uri() . '/css/icomoon/icomoon.css', array(), null, 'all');
  wp_enqueue_style('vendor-css', get_template_directory_uri() . '/css/vendor.css', array(), null, 'all');
  wp_enqueue_style('main-styles', get_theme_file_uri('/build/style-index.css')); // from style.scss
  wp_enqueue_style('extra-styles', get_theme_file_uri('/build/index.css')); // any other styles imported

  // Enqueue Bootstrap JS
  wp_enqueue_script('bootstrap-js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js', array('jquery'), '5.3.1', true);

  // Enqueue scripts
  wp_enqueue_script('jquery-1-11-0', get_template_directory_uri() . '/js/jquery-1.11.0.min.js', array(), null, true);
  wp_enqueue_script('plugins-js', get_template_directory_uri() . '/js/plugins.js', array('jquery-1-11-0'), null, true);
  wp_enqueue_script('script-js', get_template_directory_uri() . '/js/script.js', array('jquery-1-11-0'), null, true);
  wp_enqueue_script('main-js', get_theme_file_uri('/build/index.js'), array('jquery', 'react', 'react-dom'), '1.0', true);

  wp_localize_script('main-js', 'appData', array(
    'root_url' => get_site_url(),
    'nonce' => wp_create_nonce('wp_rest')
  ));
}

function app_features()
{
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  // add_image_size('bookCover', 217, 317, true);
  // add_image_size('bookCover', 220, 320, true);
  // add_image_size('blogPost', 438, 328, true);
}

add_action('wp_enqueue_scripts', 'app_files');

add_action('after_setup_theme', 'app_features');


add_action('init', function () {
  add_rewrite_rule(
    '^notebooks/([^/]+)/?$',
    'index.php?pagename=notebooks&notebook_id=$matches[1]',
    'top'
  );
});

add_filter('query_vars', function ($vars) {
  $vars[] = 'notebook_id';
  return $vars;
});

// When you visit /notebooks/:id, WordPress will load single-notebook.php.
// You can get the notebook ID with get_query_var('notebook_id').
add_action('template_redirect', function () {
  if (get_query_var('notebook_id')) {
    include get_template_directory() . '/single-notebook.php';
    exit;
  }
});
