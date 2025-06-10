<?php

class Virtubooks_Notebook_DB_Table
{

  public function create_table()
  {
    global $wpdb;
    $table_name = $wpdb->prefix . 'virtubooks_notebooks';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
          id CHAR(36) NOT NULL,
          user_id BIGINT(20) UNSIGNED NOT NULL,
          title VARCHAR(255) NOT NULL,
          description TEXT NULL,
          visibility ENUM('public', 'private') DEFAULT 'private',
          author VARCHAR(255) NULL,
          aspect_ratio ENUM('6:9', '13:20', '3:5', '7:9', '1:1') DEFAULT '6:9',
          created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          styles TEXT NULL,
          PRIMARY KEY  (id),
          KEY user_id (user_id),
          CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES {$wpdb->users}(ID) ON DELETE CASCADE
      ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
  }

  public function drop_table()
  {
    global $wpdb;
    $table_name = $wpdb->prefix . 'virtubooks_notebooks';

    // Delete the table if it exists
    $sql = "DROP TABLE IF EXISTS $table_name;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    $wpdb->query($sql);
  }
}
