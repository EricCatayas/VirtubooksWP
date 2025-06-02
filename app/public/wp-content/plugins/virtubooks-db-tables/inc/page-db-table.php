<?php

class Virtubooks_Page_DB_Table
{

  public function create_table()
  {
    global $wpdb;
    $table_name = $wpdb->prefix . 'virtubooks_pages';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
        id CHAR(36) NOT NULL,
        idx INT(11) NOT NULL,
        notebook_id CHAR(36) NOT NULL,
        is_numbered_page TINYINT(1) DEFAULT 0,
        page_number INT(11) NULL,
        background_image_url TEXT NULL,
        styles TEXT NULL,
        PRIMARY KEY  (id),
        KEY notebook_id (notebook_id),
        CONSTRAINT fk_notebook_id FOREIGN KEY (notebook_id) REFERENCES {$wpdb->prefix}virtubooks_notebooks(id) ON DELETE CASCADE
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
  }

  public function drop_table()
  {
    global $wpdb;
    $table_name = $wpdb->prefix . 'virtubooks_pages';

    // Delete the table if it exists
    $sql = "DROP TABLE IF EXISTS $table_name;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    $wpdb->query($sql);
  }
}
