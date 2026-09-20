<?php
/**
 * Template Name: Página Inicial (Front Page)
 *
 * @package AveiroAlojamentos
 */

get_header();

// Buscar Alojamentos Publicados
$alojamentos_query = new WP_Query(array(
    'post_type'      => 'alojamento',
    'posts_per_page' => -1,
    'post_status'    => 'publish',
    'orderby'        => 'date',
    'order'          => 'ASC',
));

// Buscar Depoimentos APROVADOS (post_status = publish)
$depoimentos_query = new WP_Query(array(
    'post_type'      => 'depoimento',
    'posts_per_page' => 6,
    'post_status'    => 'publish',
    'orderby'        => 'date',
    'order'          => 'DESC',
));
?>

<main id="primary" class="site-main">

    <!-- 1. Hero Section -->
    <section id="inicio" class="hero-section">
        <div class="container">
            <div class="hero-grid">
                <div>
                    <div class="badge-tag">
                        <span>✦ Alojamento Local em Aveiro</span>
                    </div>
                    <h1 class="hero-title">
                        Acolhimento com alma portuguesa no <em>coração de Aveiro</em>
                    </h1>
                    <p class="hero-subtitle">
                        Dois alojamentos únicos para viver Aveiro no seu melhor: a serenidade dos canais no <strong>Aveiro Sunset</strong> ou o pulsar vibrante da cidade no <strong>Aveiro White 105</strong>.
                    </p>
                    <div class="btn-group">
                        <a href="#alojamentos" class="btn-primary">
                            <span>Conhecer os Alojamentos</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
                        </a>
                        <a href="#cidade" class="btn-outline">
                            <span>Descobrir a Cidade</span>
                        </a>
                    </div>
                </div>

                <div style="position: relative;">
                    <div style="border-radius: 24px; overflow: hidden; border: 1px solid rgba(197,168,128,0.25); box-shadow: 0 30px 60px rgba(0,0,0,0.6);">
                        <img src="<?php echo esc_url(AVEIRO_THEME_URI . '/assets/images/aveiro-sunset/aveiro-sunset-01.jpg'); ?>" alt="Aveiro Sunset Interior" style="width: 100%; height: 420px; object-fit: cover;">
                    </div>
                    <!-- Badge Flutuante Booking -->
                    <div style="position: absolute; bottom: -20px; left: 24px; background: #131620; border: 1px solid #2e374d; border-radius: 14px; padding: 12px 20px; display: flex; align-items: center; gap: 14px; box-shadow: 0 20px 30px rgba(0,0,0,0.5);">
                        <div style="background: #003580; color: #fff; font-weight: bold; font-size: 16px; padding: 4px 10px; border-radius: 8px;">
                            9.9
                        </div>
                        <div>
                            <div style="font-size: 13px; font-weight: 600; color: #fbf8f3;">Excelente Localização</div>
                            <div style="font-size: 11px; color: #c5a880;">Classificação oficial Booking.com</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 2. Alojamentos Showcase -->
    <section id="alojamentos" class="section">
        <div class="container">
            <div class="section-header">
                <div class="badge-tag">Os Nossos Espaços</div>
                <h2 class="section-title">Escolha o seu refúgio em Aveiro</h2>
                <p class="section-desc">
                    Apartamentos acolhedores, equipados com todo o conforto moderno e localizações privilegiadas para desfrutar da cidade a pé.
                </p>
            </div>

            <div class="apartments-grid">
                <?php if ($alojamentos_query->have_posts()): ?>
                    <?php while ($alojamentos_query->have_posts()): $alojamentos_query->the_post();
                        $post_id       = get_the_ID();
                        $tagline       = get_post_meta($post_id, '_alojamento_tagline', true);
                        $address       = get_post_meta($post_id, '_alojamento_address', true);
                        $score         = get_post_meta($post_id, '_alojamento_booking_score', true);
                        $booking_url   = get_post_meta($post_id, '_alojamento_booking_url', true);
                        $price_from    = get_post_meta($post_id, '_alojamento_price_from', true);
                        $highlights    = get_post_meta($post_id, '_alojamento_highlights', true);
                        $photos        = aveiro_get_alojamento_photos($post_id);
                        $cover_url     = !empty($photos) ? $photos[0]['url'] : '';
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
                                <p class="apt-address">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c5a880" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                                    <span><?php echo esc_html($address ?: 'Aveiro'); ?></span>
                                </p>

                                <?php if ($tagline): ?>
                                    <p style="font-size: 14px; color: #c4beb3; margin-bottom: 20px; font-style: italic;">
                                        "<?php echo esc_html($tagline); ?>"
                                    </p>
                                <?php endif; ?>

                                <?php if ($highlights):
                                    $items = array_filter(explode("\n", str_replace("\r", "", $highlights)));
                                    ?>
                                    <ul class="apt-highlights">
                                        <?php foreach (array_slice($items, 0, 4) as $item): ?>
                                            <li><?php echo esc_html(trim($item)); ?></li>
                                        <?php endforeach; ?>
                                    </ul>
                                <?php endif; ?>

                                <div class="apt-card-footer">
                                    <div>
                                        <span style="font-size: 11px; color: #9b9588; display: block; text-transform: uppercase;">A partir de</span>
                                        <strong style="font-size: 20px; color: #c5a880; font-family: var(--font-serif);"><?php echo esc_html($price_from ?: '65€'); ?></strong>
                                        <span style="font-size: 12px; color: #9b9588;">/ noite</span>
                                    </div>

                                    <div style="display: flex; gap: 8px;">
                                        <a href="<?php the_permalink(); ?>" class="btn-outline" style="padding: 8px 16px; font-size: 12px;">
                                            Ver Fotos (<?php echo count($photos); ?>)
                                        </a>
                                        <?php if ($booking_url): ?>
                                            <a href="<?php echo esc_url($booking_url); ?>" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding: 8px 16px; font-size: 12px;">
                                                Booking
                                            </a>
                                        <?php endif; ?>
                                    </div>
                                </div>
                            </div>
                        </article>
                    <?php endwhile; wp_reset_postdata(); ?>
                <?php endif; ?>
            </div>
        </div>
    </section>

    <!-- 3. Descobrir Aveiro (Costa Nova, Canais, Salinas) -->
    <section id="cidade" class="section" style="background: #080a0e;">
        <div class="container">
            <div class="section-header">
                <div class="badge-tag">A Cidade dos Canais</div>
                <h2 class="section-title">Descubra o encanto autêntico de Aveiro</h2>
                <p class="section-desc">
                    Canais históricos, moliceiros coloridos, a brisa do Atlântico e as pitorescas casas às riscas da Costa Nova.
                </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
                <!-- Card 1: Canais & Moliceiros -->
                <div style="background: #131620; border: 1px solid #222938; border-radius: 16px; overflow: hidden;">
                    <img src="<?php echo esc_url(AVEIRO_THEME_URI . '/assets/images/fotos-aveiro/foto-menor-detalhe-aveiro-05.jpg'); ?>" alt="Canais de Aveiro e Moliceiro" style="width: 100%; height: 200px; object-fit: cover;">
                    <div style="padding: 24px;">
                        <h4 style="font-size: 18px; color: #fbf8f3; margin-bottom: 8px;">Canais e Moliceiros</h4>
                        <p style="font-size: 13px; color: #9b9588; line-height: 1.6;">
                            Navegue pelas águas calmas da ria a bordo de um barco tradicional moliceiro e aprecie as fachadas Arte Nova.
                        </p>
                    </div>
                </div>

                <!-- Card 2: Costa Nova e Praias (Foto Autêntica) -->
                <div style="background: #131620; border: 1px solid #222938; border-radius: 16px; overflow: hidden;">
                    <img src="<?php echo esc_url(AVEIRO_THEME_URI . '/assets/images/fotos-aveiro/foto-menor-detalhe-aveiro-04.jpg'); ?>" alt="Palheiros da Costa Nova" style="width: 100%; height: 200px; object-fit: cover;">
                    <div style="padding: 24px;">
                        <h4 style="font-size: 18px; color: #fbf8f3; margin-bottom: 8px;">Costa Nova e Praias</h4>
                        <p style="font-size: 13px; color: #9b9588; line-height: 1.6;">
                            Os emblemáticos palheiros às riscas coloridas, o aroma a maresia e as dunas preservadas a apenas 10 minutos do centro.
                        </p>
                    </div>
                </div>

                <!-- Card 3: Bairro da Beira-Mar -->
                <div style="background: #131620; border: 1px solid #222938; border-radius: 16px; overflow: hidden;">
                    <img src="<?php echo esc_url(AVEIRO_THEME_URI . '/assets/images/fotos-aveiro/foto-menor-detalhe-aveiro-07.jpg'); ?>" alt="Bairro da Beira-Mar" style="width: 100%; height: 200px; object-fit: cover;">
                    <div style="padding: 24px;">
                        <h4 style="font-size: 18px; color: #fbf8f3; margin-bottom: 8px;">Bairro da Beira-Mar</h4>
                        <p style="font-size: 13px; color: #9b9588; line-height: 1.6;">
                            Ruas estreitas de calçada, praças acolhedoras e a vizinhança mais típica onde está situado o Aveiro Sunset.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 4. Sabores de Aveiro / Gastronomia -->
    <section id="gastronomia" class="section">
        <div class="container">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;">
                <div style="position: relative;">
                    <div style="border-radius: 20px; overflow: hidden; border: 1px solid #2e374d;">
                        <img src="<?php echo esc_url(AVEIRO_THEME_URI . '/assets/images/fotos-aveiro/foto-menor-detalhe-aveiro-08.jpg'); ?>" alt="Ovos Moles de Aveiro" style="width: 100%; height: 440px; object-fit: cover;">
                    </div>
                </div>

                <div>
                    <div class="badge-tag">Tradição & Doçaria</div>
                    <h2 class="section-title">Sabores que contam histórias de água e sal</h2>
                    <p style="color: #c4beb3; margin-bottom: 20px; line-height: 1.7;">
                        Há lugares que conhecemos pelos olhos. Aveiro também se conhece pelos sabores. Os ovos moles de Aveiro, doce conventual com Indicação Geográfica Protegida, são a imagem de marca doce da cidade.
                    </p>
                    <p style="color: #9b9588; margin-bottom: 30px; font-size: 14px; line-height: 1.7;">
                        Mas a gastronomia da ria vai muito além dos doces: peixe fresco da costa, marisco, caldeiradas e a clássica flor de sal das salinas de Aveiro esperam por si nas tascas e restaurantes vizinhos aos nossos alojamentos.
                    </p>
                    <a href="#alojamentos" class="btn-outline">
                        <span>Ficar Perto de Tudo</span>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- 5. Depoimentos dos Hóspedes (Aprovados pelo Admin) -->
    <section id="depoimentos" class="section" style="background: #080a0e;">
        <div class="container">
            <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 24px; margin-bottom: 48px;">
                <div>
                    <div class="badge-tag">Experiências Reais</div>
                    <h2 class="section-title" style="margin-bottom: 8px;">O que dizem os nossos hóspedes</h2>
                    <p class="section-desc" style="text-align: left;">
                        Avaliações autênticas partilhadas por quem escolheu os nossos alojamentos em Aveiro.
                    </p>
                </div>

                <button type="button" class="btn-primary open-review-btn">
                    <span>⭐ Deixar uma Avaliação</span>
                </button>
            </div>

            <div class="testimonials-grid">
                <?php if ($depoimentos_query->have_posts()): ?>
                    <?php while ($depoimentos_query->have_posts()): $depoimentos_query->the_post();
                        $post_id      = get_the_ID();
                        $rating       = intval(get_post_meta($post_id, '_review_rating', true)) ?: 5;
                        $origin       = get_post_meta($post_id, '_review_origin', true);
                        $apartment_id = get_post_meta($post_id, '_review_apartment_id', true);
                        $author_name  = get_the_title();
                        $content      = get_the_content();
                        ?>
                        <div class="testimonial-card">
                            <div>
                                <div class="test-stars">
                                    <?php echo str_repeat('★', $rating) . str_repeat('☆', 5 - $rating); ?>
                                </div>
                                <p class="test-text">
                                    "<?php echo esc_html(wp_strip_all_tags($content)); ?>"
                                </p>
                            </div>

                            <div class="test-author">
                                <div>
                                    <div class="test-name"><?php echo esc_html($author_name); ?></div>
                                    <?php if ($origin): ?>
                                        <div class="test-origin"><?php echo esc_html($origin); ?></div>
                                    <?php endif; ?>
                                </div>

                                <div class="test-apt-badge">
                                    <?php
                                    if ($apartment_id === 'aveiro-sunset') {
                                        echo 'Aveiro Sunset';
                                    } elseif ($apartment_id === 'aveiro-white-105') {
                                        echo 'Aveiro White 105';
                                    } else {
                                        echo 'Aveiro';
                                    }
                                    ?>
                                </div>
                            </div>
                        </div>
                    <?php endwhile; wp_reset_postdata(); ?>
                <?php else: ?>
                    <p style="color: #9b9588;"><?php _e('Seja o primeiro a partilhar a sua estadia connosco!', 'aveiro-alojamentos'); ?></p>
                <?php endif; ?>
            </div>
        </div>
    </section>

    <!-- 6. Localização & Mapa com Moradas Exatas -->
    <section id="localizacao" class="section">
        <div class="container">
            <div class="section-header">
                <div class="badge-tag">Mapa & Direções</div>
                <h2 class="section-title">Localização Privilegiada</h2>
                <p class="section-desc">
                    Ambos os alojamentos situam-se na zona mais nobre e conveniente de Aveiro.
                </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 32px;">
                <!-- Card Aveiro Sunset -->
                <div style="background: #131620; border: 1px solid #222938; border-radius: 20px; overflow: hidden;">
                    <div style="padding: 24px; border-bottom: 1px solid #222938;">
                        <h3 style="font-size: 20px; color: #fbf8f3; margin-bottom: 4px;">Aveiro Sunset</h3>
                        <p style="color: #9b9588; font-size: 13px;">Rua de Abel Ribeiro, nº 49, Aveiro</p>
                    </div>
                    <div style="height: 280px; position: relative;">
                        <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            style="border: 0;"
                            src="https://maps.google.com/maps?q=Rua%20de%20Abel%20Ribeiro%2C%20n%C2%BA%2049%2C%20Aveiro%2C%20Portugal&t=&z=17&ie=UTF8&iwloc=&output=embed"
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>

                <!-- Card Aveiro White 105 -->
                <div style="background: #131620; border: 1px solid #222938; border-radius: 20px; overflow: hidden;">
                    <div style="padding: 24px; border-bottom: 1px solid #222938;">
                        <h3 style="font-size: 20px; color: #fbf8f3; margin-bottom: 4px;">Aveiro White 105</h3>
                        <p style="color: #9b9588; font-size: 13px;">Avenida Doutor Lourenço Peixinho, nº 50, Aveiro</p>
                    </div>
                    <div style="height: 280px; position: relative;">
                        <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            style="border: 0;"
                            src="https://maps.google.com/maps?q=Avenida%20Doutor%20Louren%C3%A7o%20Peixinho%2C%20n%C2%BA%2050%2C%20Aveiro%2C%20Portugal&t=&z=17&ie=UTF8&iwloc=&output=embed"
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    </section>

</main>

<?php get_footer(); ?>
