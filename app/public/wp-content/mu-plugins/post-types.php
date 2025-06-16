<?php
function app_post_types()
{
  // register "quote" post type
  register_post_type('quote', array(
    'public' => true,
    'rewrite' => array(
      'slug' => 'quotes'
    ),
    'map_meta_cap' => true,
    'show_in_rest' => true,
    'rest_base' => 'quotes',
    'supports' => array('title', 'editor'),
    'has_archive' => true,
    'labels' => array(
      'name' => 'Quotes',
      'add_new_item' => 'Add New Quote',
      'edit_item' => 'Edit Quote',
      'all_items' => 'All Quotes',
      'singular_name' => 'Quote'
    ),
    'menu_icon' => 'dashicons-format-quote',
  ));
}
add_action('init', 'app_post_types');
