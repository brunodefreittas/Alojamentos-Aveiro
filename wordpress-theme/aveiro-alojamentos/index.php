<?php
/**
 * Main Index Template
 *
 * @package AveiroAlojamentos
 */

get_header(); ?>

<main class="site-main" style="padding: 120px 0 80px;">
    <div class="container" style="max-width: 800px;">
        <?php if (have_posts()): ?>
            <?php while (have_posts()): the_post(); ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class(); ?> style="margin-bottom: 48px; background: #131620; border: 1px solid #222938; border-radius: 16px; padding: 32px;">
                    <h2 style="font-size: 28px; margin-bottom: 12px;"><a href="<?php the_permalink(); ?>" style="color: #fbf8f3;"><?php the_title(); ?></a></h2>
                    <div style="color: #9b9588; font-size: 13px; margin-bottom: 20px;"><?php echo get_the_date(); ?></div>
                    <div style="color: #c4beb3; line-height: 1.8;">
                        <?php the_excerpt(); ?>
                    </div>
                </article>
            <?php endwhile; ?>
            <?php the_posts_navigation(); ?>
        <?php else: ?>
            <p style="color: #9b9588;"><?php _e('Nenhum conteúdo encontrado.', 'aveiro-alojamentos'); ?></p>
        <?php endif; ?>
    </div>
</main>

<?php get_footer(); ?>
