<?php

class Virtubooks_ContentBlock_DB_Table
{
  public function create_table()
  {
    global $wpdb;
    $table_name = $wpdb->prefix . 'virtubooks_contentblocks';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
          id CHAR(36) NOT NULL,
          page_id CHAR(36) NOT NULL,
          value TEXT NOT NULL,
          type VARCHAR(50) NOT NULL,
          styles TEXT NULL,
          PRIMARY KEY  (id),
          KEY page_id (page_id),
          CONSTRAINT fk_page_id FOREIGN KEY (page_id) REFERENCES {$wpdb->prefix}virtubooks_pages(id) ON DELETE CASCADE
      ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
  }

  public function drop_table()
  {
    global $wpdb;
    $table_name = $wpdb->prefix . 'virtubooks_contentblocks';

    // Delete the table if it exists
    $sql = "DROP TABLE IF EXISTS $table_name;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    $wpdb->query($sql);
  }
}
