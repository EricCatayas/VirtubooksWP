<?php
if (file_exists(__DIR__ . '/.env')) {
  require_once __DIR__ . '/vendor/autoload.php';
  $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
  $dotenv->load();
}

require get_theme_file_path('/inc/auth-api.php');

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
    'nonce' => wp_create_nonce('wp_rest'),
    'api_url' => getenv('API_BASE_URL') ?: ($_ENV['API_BASE_URL'] ?? ''),
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

function virtubooks_register_custom_rewrite_rules()
{
  // Add the 'create' rule first so it takes precedence
  add_rewrite_rule(
    '^notebooks/create/?$',
    'index.php?pagename=create-notebook',
    'top'
  );
  add_rewrite_rule(
    '^notebooks/user/([^/]+)/?$',
    'index.php?pagename=user-notebooks&user_id=$matches[1]',
    'top'
  );
  add_rewrite_rule(
    '^notebooks/([^/]+)/?$',
    'index.php?pagename=single-notebook&notebook_id=$matches[1]',
    'top'
  );
  add_rewrite_rule(
    '^image-uploads/?$',
    'index.php?pagename=image-uploads',
    'top'
  );
  add_rewrite_rule(
    'login/?$',
    'index.php?pagename=login',
    'top'
  );
  add_rewrite_rule(
    'logout/?$',
    'index.php?pagename=logout',
    'top'
  );
}

function virtubooks_add_notebook_id_query_var($vars)
{
  $vars[] = 'notebook_id';
  return $vars;
}

function virtubooks_add_user_id_query_var($vars)
{
  $vars[] = 'user_id';
  return $vars;
}

function virtubooks_template_redirect()
{
  if (get_query_var('pagename') === 'create-notebook') {
    include get_template_directory() . '/create-notebook.php';
    exit;
  }
  // When you visit /notebooks/:id, WordPress will load single-notebook.php.
  // You can get the notebook ID with get_query_var('notebook_id').
  if (get_query_var('notebook_id') && get_query_var('pagename') === 'single-notebook') {
    include get_template_directory() . '/single-notebook.php';
    exit;
  }

  if (get_query_var('user_id') && get_query_var('pagename') === 'user-notebooks') {
    include get_template_directory() . '/user-notebooks.php';
    exit;
  }

  if (get_query_var('pagename') === 'image-uploads') {
    include get_template_directory() . '/image-uploads.php';
    exit;
  }
  if (get_query_var('pagename') === 'login') {
    include get_template_directory() . '/login.php';
    exit;
  }
  if (get_query_var('pagename') === 'logout') {
    include get_template_directory() . '/logout.php';
    exit;
  }
}
// Redirect subscriber accounts our of admin area
function redirect_subscriber_to_home()
{
  if (is_user_logged_in() && current_user_can('subscriber') && !current_user_can('edit_posts')) {
    wp_redirect(home_url());
    exit;
  }
}

function subscriber_hide_admin_bar()
{
  if (!is_user_logged_in()) {
    show_admin_bar(false);
    return;
  }

  $current_user = wp_get_current_user();
  if (count($current_user->roles) == 1 && $current_user->roles[0] == 'subscriber') {
    show_admin_bar(false);
  }
}

function custom_login_url($login_url, $redirect, $force_reauth)
{
  // Always return your custom login page URL
  $url = home_url('/login/');
  if (!empty($redirect)) {
    $url = add_query_arg('redirect_to', urlencode($redirect), $url);
  }
  return $url;
}

add_action('wp_enqueue_scripts', 'app_files');

add_action('after_setup_theme', 'app_features');

add_action('admin_init', 'redirect_subscriber_to_home');

add_action('wp_loaded', 'subscriber_hide_admin_bar');

add_action('init', 'virtubooks_register_custom_rewrite_rules');

add_filter('query_vars', 'virtubooks_add_notebook_id_query_var');

add_filter('query_vars', 'virtubooks_add_user_id_query_var');

add_action('template_redirect', 'virtubooks_template_redirect');

add_filter('login_url', 'custom_login_url', 10, 3);
