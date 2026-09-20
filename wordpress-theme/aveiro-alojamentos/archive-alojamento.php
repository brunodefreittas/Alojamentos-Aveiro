<?php
/**
 * Archive Alojamentos Template
 *
 * @package AveiroAlojamentos
 */

get_header(); ?>

<main class="site-main" style="padding: 120px 0 80px;">
    <div class="container">
        <div class="section-header">
            <h1 class="section-title">Todos os Alojamentos em Aveiro</h1>
            <p class="section-desc">Escolha o seu refúgio e desfrute da melhor estadia na cidade dos canais.</p>
        </div>

        <div class="apartments-grid">
            <?php if (have_posts()): ?>
                <?php while (have_posts()): the_post();
                    $post_id    = get_the_ID();
                    $tagline    = get_post_meta($post_id, '_alojamento_tagline', true);
                    $address    = get_post_meta($post_id, '_alojamento_address', true);
                    $score      = get_post_meta($post_id, '_alojamento_booking_score', true);
                    $price_from = get_post_meta($post_id, '_alojamento_price_from', true);
                    $photos     = aveiro_get_alojamento_photos($post_id);
                    $cover_url  = !empty($photos) ? $photos[0]['url'] : '';
                    ?>
                    <article class="apt-card">
                        <div class="apt-card-media">
                            <?php if ($cover_url): ?>
                                <img src="<?php echo esc_url($cover_url); ?>" alt="<?php the_title_attribute(); ?>">
                            <?php endif; ?>
                            <?php if ($score): ?>
                                <div class="apt-score-badge">
                                    <span style="color: #c5a880;">★</span>
                                    <strong><?php echo esc_html($score); ?></strong>
                                    <span style="color: #9b9588;">Booking</span>
                                </div>
                            <?php endif; ?>
                        </div>
                        <div class="apt-card-body">
                            <h3 class="apt-title"><?php the_title(); ?></h3>
                            <p class="apt-address"><?php echo esc_html($address ?: 'Aveiro'); ?></p>
                            <?php if ($tagline): ?>
                                <p style="font-size: 14px; color: #c4beb3; margin-bottom: 20px; font-style: italic;">
                                    "<?php echo esc_html($tagline); ?>"
                                </p>
                            <?php endif; ?>
                            <div class="apt-card-footer">
                                <div>
                                    <span style="font-size: 11px; color: #9b9588; display: block;">A partir de</span>
                                    <strong style="font-size: 20px; color: #c5a880;"><?php echo esc_html($price_from ?: '65€'); ?></strong>
                                </div>
                                <a href="<?php the_permalink(); ?>" class="btn-primary" style="padding: 8px 18px; font-size: 12px;">
                                    Ver Detalhes
                                </a>
                            </div>
                        </div>
                    </article>
                <?php endwhile; ?>
            <?php endif; ?>
        </div>
    </div>
</main>

<?php get_footer(); ?>
