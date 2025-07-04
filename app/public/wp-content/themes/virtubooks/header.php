<!DOCTYPE html>
<html lang="en">

<head>
  <title>Virtubooks</title>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="format-detection" content="telephone=no">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <?php wp_head(); ?>
</head>

<body data-bs-spy="scroll" data-bs-target="#header" tabindex="0">

  <div id="header-wrap">
    <header id="header">
      <div class="container-fluid">
        <div class="row">

          <div class="col-md-2">
            <div class="main-logo">
              <a href="<?php echo site_url(); ?>">
                <h1>Virtubooks</h1>
              </a>
            </div>
          </div>

          <div class="col-md-10">

            <nav id="navbar">
              <div class="main-menu stellarnav">
                <ul class="menu-list">
                  <li class="menu-item active">
                    <div id="search-bar" class="action-menu">
                      <div class="search-bar">
                        <a href="#" class="search-button search-toggle" data-selector="#header-wrap">
                          <i class="icon icon-search"></i>
                        </a>
                        <form role="search" method="get" class="search-box">
                          <input id="search-field" class="search-field text search-input" placeholder="Search"
                            type="search">
                        </form>
                      </div>
                    </div>
                  </li>
                  <li class="menu-item"><a href="<?php echo esc_url(site_url('/notebooks/create')); ?>" class="nav-link">New Notebook</a></li>
                  <li class="menu-item"><a href="<?php echo esc_url(site_url('/notebooks')); ?>" class="nav-link">Notebooks</a></li>
                  <li class="menu-item"><a href="<?php echo esc_url(site_url('/notebooks/slug/about-us')); ?>" class="nav-link">About</a></li>
                  <li class="menu-item"><a href="<?php echo get_permalink(get_option('page_for_posts')); ?>" class="nav-link">Blog</a></li>
                  <li class="menu-item has-sub">
                    <a href="#pages" class="nav-link">Account</a>
                    <ul>
                      <?php if (is_user_logged_in()) { ?>
                        <li><a href="<?php echo esc_url(site_url('/profile')); ?>"><i class="fa-solid fa-user"></i> Profile</a></li>
                        <?php if (current_user_can('administrator')) { ?>
                          <li><a href="<?php echo esc_url(site_url('/wp-admin')); ?>"><i class="fa-solid fa-cog"></i> Admin Dashboard</a></li>
                        <?php } ?>
                        <li><a href="<?php echo esc_url(site_url('/notebooks/user/' . get_current_user_id())); ?>"><i class="fa-solid fa-book"></i> My Notebooks</a></li>
                        <li><a href="<?php echo esc_url(site_url('/image-uploads')); ?>"><i class="fa-solid fa-images"></i> My Images</a></li>
                        <li><a id="logout-button" href="<?php echo wp_logout_url('/login'); ?>">Log Out</a></li>
                      <?php } else { ?>
                        <li><a href="<?php echo wp_login_url(); ?>">Sign In</a></li>
                        <li><a href="<?php echo wp_registration_url(); ?>">Sign Up</a></li>
                      <?php } ?>
                    </ul>
                  </li>
                </ul>

                <div class="hamburger">
                  <span class="bar"></span>
                  <span class="bar"></span>
                  <span class="bar"></span>
                </div>

              </div>
            </nav>

          </div>

        </div>
      </div>
    </header>

  </div>