<?php
/**
 * Page Template
 *
 * @package AveiroAlojamentos
 */

get_header(); ?>

<main class="site-main" style="padding: 120px 0 80px;">
    <div class="container" style="max-width: 900px;">
        <?php while (have_posts()): the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?> style="background: #131620; border: 1px solid #222938; border-radius: 20px; padding: 40px;">
                <h1 style="font-size: 36px; color: #fbf8f3; margin-bottom: 24px;"><?php the_title(); ?></h1>
                <div style="color: #c4beb3; line-height: 1.8; font-size: 16px;">
                    <?php the_content(); ?>
                </div>
            </article>
        <?php endwhile; ?>
    </div>
</main>

<?php get_footer(); ?>
