<?php

/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package ACF_Direct_Response
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <script defer src="https://pro.fontawesome.com/releases/v5.15.4/js/all.js"
        integrity="sha384-8nTbev/iV1sg3ESYOAkRPRDMDa5s0sknqroAe9z4DiM+WDr1i/VKi5xLWsn87Car" crossorigin="anonymous">
    </script>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <?php wp_body_open(); ?>
    <div id="page" class="site">
        <a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e('Skip to content', 'acf-dr'); ?></a>

        <header id="masthead" class="site-header">
            <div class="top-banner">
                <?php the_field('header_message_banner'); ?>
            </div>

            <div class="tap-to-call">
                <a href="tel:#1">
                    <i class="fad fa-phone"></i>
                    <p>Tap To Call And Book Your PT Appointment</p>
                </a>
            </div>

            <!-- <nav id="site-navigation" class="main-navigation">
                <button class="menu-toggle" aria-controls="primary-menu"
                    aria-expanded="false"><?php esc_html_e('Primary Menu', 'acf-dr'); ?></button>
                <?php
                wp_nav_menu(
                    array(
                        'theme_location' => 'menu-1',
                        'menu_id'        => 'primary-menu',
                    )
                );
                ?>
            </nav> -->
            <!-- #site-navigation -->
            <div class="site-branding">
                <?php if (get_field('logo')) : ?>
                <img src="<?php the_field('logo'); ?>" />
                <?php endif; ?>
            </div><!-- .site-branding -->
        </header><!-- #masthead -->