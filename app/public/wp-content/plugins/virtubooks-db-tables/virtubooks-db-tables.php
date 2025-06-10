<?php
/*
  Plugin Name: Notebook Database
  Description: A plugin for managing notebook entries in a custom database table.
  Version: 1.0
*/
require_once plugin_dir_path(__FILE__) . 'inc/notebook-db-table.php';
require_once plugin_dir_path(__FILE__) . 'inc/page-db-table.php';
require_once plugin_dir_path(__FILE__) . 'inc/content-block-db-table.php';

class Virtubooks_Table_Plugin
{
  private $notebook_table;
  private $page_table;
  private $content_block_table;

  function __construct()
  {
    $this->notebook_table = new Virtubooks_Notebook_DB_Table();
    $this->page_table = new Virtubooks_Page_DB_Table();
    $this->content_block_table = new Virtubooks_ContentBlock_DB_Table();

    register_activation_hook(__FILE__, [$this, 'activate']);
    register_deactivation_hook(__FILE__, [$this, 'deactivate']); // todo: deletes data
  }

  function activate()
  {
    $this->create_tables();
    $this->insert_sample_data();
  }

  function deactivate()
  {
    $this->drop_tables();
  }

  function create_tables()
  {
    $this->notebook_table->create_table();
    $this->page_table->create_table();
    $this->content_block_table->create_table();
  }

  function drop_tables()
  {
    $this->content_block_table->drop_table();
    $this->page_table->drop_table();
    $this->notebook_table->drop_table();
  }

  function insert_sample_data()
  {
    global $wpdb;

    $notebook_id = wp_generate_uuid4();
    $page_1_id = wp_generate_uuid4();
    $page_2_id = wp_generate_uuid4();
    $page_3_id = wp_generate_uuid4();
    $page_4_id = wp_generate_uuid4();
    $page_5_id = wp_generate_uuid4();
    $page_6_id = wp_generate_uuid4();

    // Insert sample data into the notebooks table
    $wpdb->insert(
      $wpdb->prefix . 'virtubooks_notebooks',
      [
        'id' => $notebook_id,
        'user_id' => get_current_user_id(),
        'title' => 'Sample Notebook',
        'description' => 'This is a sample notebook.',
        'visibility' => 'private',
        'author' => 'Sample Author',
        'aspect_ratio' => '6:9',
        'styles' => json_encode(['background_color' => '#ffffff']),
      ]
    );

    // Insert sample data into the pages table
    $wpdb->insert(
      $wpdb->prefix . 'virtubooks_pages',
      [
        'id' => $page_1_id,
        'idx' => 0,
        'notebook_id' => $notebook_id,
        'is_numbered_page' => 0,
        'page_number' => 0,
        'background_image_url' => '',
        'styles' => null,
      ]
    );
    $wpdb->insert(
      $wpdb->prefix . 'virtubooks_pages',
      [
        'id' => $page_2_id,
        'idx' => 1,
        'notebook_id' => $notebook_id,
        'is_numbered_page' => 0,
        'page_number' => 0,
        'background_image_url' => '',
        'styles' => null,
      ]
    );
    $wpdb->insert(
      $wpdb->prefix . 'virtubooks_pages',
      [
        'id' => $page_3_id,
        'idx' => 2,
        'notebook_id' => $notebook_id,
        'is_numbered_page' => 1,
        'page_number' => 1,
        'background_image_url' => '',
        'styles' => null,
      ]
    );
    $wpdb->insert(
      $wpdb->prefix . 'virtubooks_pages',
      [
        'id' => $page_4_id,
        'idx' => 3,
        'notebook_id' => $notebook_id,
        'is_numbered_page' => 1,
        'page_number' => 2,
        'background_image_url' => '',
        'styles' => null,
      ]
    );
    $wpdb->insert(
      $wpdb->prefix . 'virtubooks_pages',
      [
        'id' => $page_5_id,
        'idx' => 4,
        'notebook_id' => $notebook_id,
        'is_numbered_page' => 0,
        'page_number' => 0,
        'background_image_url' => '',
        'styles' => null,
      ]
    );
    $wpdb->insert(
      $wpdb->prefix . 'virtubooks_pages',
      [
        'id' => $page_6_id,
        'idx' => 5,
        'notebook_id' => $notebook_id,
        'is_numbered_page' => 0,
        'page_number' => 0,
        'background_image_url' => '',
        'styles' => null,
      ]
    );


    // Insert sample data into the content blocks table
    $wpdb->insert(
      $wpdb->prefix . 'virtubooks_contentblocks',
      [
        'id' => wp_generate_uuid4(),
        'page_id' => $page_1_id,
        'value' => '<p>This is a sample content block.</p>',
        'type' => 'paragraph',
        'styles' => json_encode(['font_size' => '16px']),
      ]
    );
  }
}

$virtubooks_table_plugin = new Virtubooks_Table_Plugin();
