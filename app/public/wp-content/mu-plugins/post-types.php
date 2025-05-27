<?php

function app_post_types()
{
  register_post_type('notebook', array(
    'public' => true,
    'rewrite' => array(
      'slug' => 'notebooks'
    ),
    //'capability_type' => 'notebook',
    // 'map_meta_cap' => true,
    'show_in_rest' => true,
    'rest_base' => 'notebooks',
    'supports' => array('title', 'editor', 'excerpt'),
    'has_archive' => true,
    'labels' => array(
      'name' => 'Notebooks',
      'add_new_item' => 'Add New Notebook',
      'edit_item' => 'Edit Notebook',
      'all_items' => 'All Notebooks',
      'singular_name' => 'Notebook'
    ),
    'menu_icon' => 'dashicons-book-alt',
  ));
}

add_action('init', 'app_post_types');
