<?php
add_action('rest_api_init', function () {
  register_rest_route('virtubooks/v1', '/notebook/(?P<id>[a-zA-Z0-9\-]+)', [
    'methods'  => 'GET',
    'callback' => 'virtubooks_get_notebook_with_pages',
    'permission_callback' => '__return_true',
  ]);
});

function virtubooks_get_notebook_with_pages($request)
{
  global $wpdb;
  $notebook_id = sanitize_text_field($request['id']);

  // Get notebook
  $notebook = $wpdb->get_row(
    $wpdb->prepare(
      "SELECT * FROM {$wpdb->prefix}virtubooks_notebooks WHERE id = %s",
      $notebook_id
    ),
    ARRAY_A
  );
  if (!$notebook) {
    return new WP_Error('not_found', 'Notebook not found', ['status' => 404]);
  }

  // Decode styles if JSON
  if (!empty($notebook['styles'])) {
    $notebook['styles'] = json_decode($notebook['styles'], true);
  }

  // Get pages
  $pages = $wpdb->get_results(
    $wpdb->prepare(
      "SELECT * FROM {$wpdb->prefix}virtubooks_pages WHERE notebook_id = %s ORDER BY idx ASC",
      $notebook_id
    ),
    ARRAY_A
  );

  foreach ($pages as &$page) {
    // Decode styles if JSON
    if (!empty($page['styles'])) {
      $page['styles'] = json_decode($page['styles'], true);
    }

    // Get content blocks for this page
    $content_blocks = $wpdb->get_results(
      $wpdb->prepare(
        "SELECT value, type, styles FROM {$wpdb->prefix}virtubooks_contentblocks WHERE page_id = %s ORDER BY id ASC",
        $page['id']
      ),
      ARRAY_A
    );

    // Decode styles for each content block
    foreach ($content_blocks as &$block) {
      if (!empty($block['styles'])) {
        $block['styles'] = json_decode($block['styles'], true);
      }
    }
    $page['contents'] = $content_blocks;
  }

  // Build response matching Notebook.ts
  $response = [
    'id' => $notebook['id'],
    'userId' => $notebook['user_id'],
    'title' => $notebook['title'],
    'description' => $notebook['description'],
    'visibillity' => $notebook['visibillity'],
    'author' => $notebook['author'],
    'aspectRatio' => $notebook['aspect_ratio'],
    'createdAt' => $notebook['created_at'],
    'updatedAt' => $notebook['updated_at'],
    'styles' => $notebook['styles'],
    'pages' => $pages,
  ];

  return rest_ensure_response($response);
}
