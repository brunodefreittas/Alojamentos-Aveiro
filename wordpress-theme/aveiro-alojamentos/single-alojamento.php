<?php
/**
 * Template de Detalhes do Alojamento (Single Alojamento)
 *
 * @package AveiroAlojamentos
 */

get_header();

while (have_posts()): the_post();
    $post_id        = get_the_ID();
    $slug           = get_post_field('post_name', $post_id);
    $tagline        = get_post_meta($post_id, '_alojamento_tagline', true);
    $address        = get_post_meta($post_id, '_alojamento_address', true);
    $postal_code    = get_post_meta($post_id, '_alojamento_postal_code', true);
    $booking_url    = get_post_meta($post_id, '_alojamento_booking_url', true);
    $booking_score  = get_post_meta($post_id, '_alojamento_booking_score', true);
    $booking_revs   = get_post_meta($post_id, '_alojamento_booking_reviews', true);
    $capacity       = get_post_meta($post_id, '_alojamento_capacity', true);
    $bed_type       = get_post_meta($post_id, '_alojamento_bed_type', true);
    $bathroom_type  = get_post_meta($post_id, '_alojamento_bathroom_type', true);
    $price_from     = get_post_meta($post_id, '_alojamento_price_from', true);
    $highlights     = get_post_meta($post_id, '_alojamento_highlights', true);
    $amenities      = get_post_meta($post_id, '_alojamento_amenities', true) ?: array();

    $photos         = aveiro_get_alojamento_photos($post_id);

    // Depoimentos aprovados deste alojamento
    $reviews = get_posts(array(
        'post_type'      => 'depoimento',
        'posts_per_page' => 4,
        'post_status'    => 'publish',
        'meta_key'       => '_review_apartment_id',
        'meta_value'     => $slug,
    ));
    ?>

    <main class="site-main" style="padding-top: 110px; padding-bottom: 80px;">
        <div class="container">

            <!-- Breadcrumbs / Voltar -->
            <div style="margin-bottom: 24px;">
                <a href="<?php echo esc_url(home_url('/#alojamentos')); ?>" style="color: #c5a880; font-size: 13px; display: inline-flex; align-items: center; gap: 6px;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
                    <span>Voltar a todos os alojamentos</span>
                </a>
            </div>

            <!-- Título & Metadados do Topo -->
            <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 20px; margin-bottom: 32px;">
                <div>
                    <h1 style="font-size: clamp(32px, 4vw, 48px); color: #fbf8f3; margin-bottom: 8px;"><?php the_title(); ?></h1>
                    <p style="color: #9b9588; font-size: 14px; display: flex; align-items: center; gap: 6px;">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c5a880" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                        <span><?php echo esc_html($address ?: 'Aveiro, Portugal'); ?> <?php echo esc_html($postal_code ? " • $postal_code" : ''); ?></span>
                    </p>
                </div>

                <div style="display: flex; align-items: center; gap: 16px;">
                    <?php if ($booking_score): ?>
                        <div style="background: #131620; border: 1px solid #2e374d; border-radius: 12px; padding: 10px 18px; display: flex; align-items: center; gap: 12px;">
                            <div style="background: #003580; color: #fff; font-weight: bold; font-size: 18px; padding: 4px 10px; border-radius: 6px;">
                                <?php echo esc_html($booking_score); ?>
                            </div>
                            <div>
                                <div style="font-size: 12px; font-weight: 600; color: #fbf8f3;">Excelente no Booking</div>
                                <div style="font-size: 11px; color: #9b9588;"><?php echo esc_html($booking_revs ?: 'Avaliações verificadas'); ?></div>
                            </div>
                        </div>
                    <?php endif; ?>

                    <?php if ($booking_url): ?>
                        <a href="<?php echo esc_url($booking_url); ?>" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding: 12px 24px;">
                            <span>Reservar no Booking</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
                        </a>
                    <?php endif; ?>
                </div>
            </div>

            <!-- GALERIA DINÂMICA DE FOTOS -->
            <div style="margin-bottom: 48px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <h3 style="font-size: 20px; color: #fbf8f3;">
                        Galeria de Fotos (<?php echo count($photos); ?> fotos)
                    </h3>
                    <span style="font-size: 12px; color: #c5a880;">Clique em qualquer foto para ampliar em ecrã inteiro</span>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px;">
                    <?php foreach ($photos as $index => $photo): ?>
                        <a href="<?php echo esc_url($photo['url']); ?>" class="gallery-photo-trigger" data-full="<?php echo esc_url($photo['url']); ?>" data-title="<?php echo esc_attr($photo['alt']); ?>" style="position: relative; aspect-ratio: 4/3; border-radius: 12px; overflow: hidden; border: 1px solid #222938; background: #000; display: block;">
                            <img src="<?php echo esc_url($photo['url']); ?>" alt="<?php echo esc_attr($photo['alt']); ?>" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                        </a>
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- Grade de Conteúdo: Detalhes + Sidebar -->
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 48px; align-items: flex-start;">
                <!-- Coluna Principal -->
                <div>
                    <!-- Descrição -->
                    <div style="background: #131620; border: 1px solid #222938; border-radius: 20px; padding: 32px; margin-bottom: 32px;">
                        <h3 style="font-size: 22px; color: #fbf8f3; margin-bottom: 16px;">Sobre o Alojamento</h3>
                        <div style="color: #c4beb3; font-size: 15px; line-height: 1.8;">
                            <?php the_content(); ?>
                        </div>
                    </div>

                    <!-- Destaques -->
                    <?php if ($highlights):
                        $hl_items = array_filter(explode("\n", str_replace("\r", "", $highlights)));
                        ?>
                        <div style="background: #131620; border: 1px solid #222938; border-radius: 20px; padding: 32px; margin-bottom: 32px;">
                            <h3 style="font-size: 22px; color: #fbf8f3; margin-bottom: 20px;">Destaques Principais</h3>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                                <?php foreach ($hl_items as $item): ?>
                                    <div style="display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: #fbf8f3;">
                                        <span style="color: #c5a880; font-weight: bold;">✦</span>
                                        <span><?php echo esc_html(trim($item)); ?></span>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    <?php endif; ?>

                    <!-- Comodidades -->
                    <div style="background: #131620; border: 1px solid #222938; border-radius: 20px; padding: 32px; margin-bottom: 32px;">
                        <h3 style="font-size: 22px; color: #fbf8f3; margin-bottom: 20px;">Comodidades e Equipamentos</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px;">
                            <div style="display: flex; align-items: center; gap: 10px; font-size: 13px; color: #c4beb3;">
                                <span style="color: #c5a880;">✓</span> Wi-Fi de alta velocidade gratuito
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px; font-size: 13px; color: #c4beb3;">
                                <span style="color: #c5a880;">✓</span> Ar Condicionado independente
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px; font-size: 13px; color: #c4beb3;">
                                <span style="color: #c5a880;">✓</span> Cozinha / Kitchenette completa
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px; font-size: 13px; color: #c4beb3;">
                                <span style="color: #c5a880;">✓</span> Máquina de Café e Chaleira
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px; font-size: 13px; color: #c4beb3;">
                                <span style="color: #c5a880;">✓</span> Smart TV de ecrã plano
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px; font-size: 13px; color: #c4beb3;">
                                <span style="color: #c5a880;">✓</span> Secador de cabelo e produtos de higiene
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px; font-size: 13px; color: #c4beb3;">
                                <span style="color: #c5a880;">✓</span> Roupa de cama e toalhas de banho
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px; font-size: 13px; color: #c4beb3;">
                                <span style="color: #c5a880;">✓</span> Ferro e tábua de engomar
                            </div>
                        </div>
                    </div>

                    <!-- Avaliações dos Hóspedes deste Alojamento -->
                    <div style="background: #131620; border: 1px solid #222938; border-radius: 20px; padding: 32px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                            <h3 style="font-size: 22px; color: #fbf8f3;">Avaliações de Hóspedes</h3>
                            <button type="button" class="btn-outline open-review-btn" data-apartment="<?php echo esc_attr($slug); ?>" style="padding: 6px 14px; font-size: 12px;">
                                + Avaliar este Alojamento
                            </button>
                        </div>

                        <?php if (!empty($reviews)): ?>
                            <div style="display: flex; flex-direction: column; gap: 16px;">
                                <?php foreach ($reviews as $rev):
                                    $rating = intval(get_post_meta($rev->ID, '_review_rating', true)) ?: 5;
                                    $origin = get_post_meta($rev->ID, '_review_origin', true);
                                    $stay   = get_post_meta($rev->ID, '_review_stay_date', true);
                                    ?>
                                    <div style="border-bottom: 1px solid #222938; padding-bottom: 16px;">
                                        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                                            <div>
                                                <strong style="color: #fbf8f3; font-size: 14px;"><?php echo esc_html($rev->post_title); ?></strong>
                                                <?php if ($origin): ?>
                                                    <span style="color: #9b9588; font-size: 12px;">(<?php echo esc_html($origin); ?>)</span>
                                                <?php endif; ?>
                                            </div>
                                            <span style="color: #f59e0b; font-size: 13px;"><?php echo str_repeat('★', $rating); ?></span>
                                        </div>
                                        <p style="color: #c4beb3; font-size: 13px; font-style: italic; line-height: 1.6;">
                                            "<?php echo esc_html(wp_strip_all_tags($rev->post_content)); ?>"
                                        </p>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        <?php else: ?>
                            <p style="color: #9b9588; font-size: 14px;">Ainda não há avaliações cadastradas para este espaço. Seja o primeiro a partilhar!</p>
                        <?php endif; ?>
                    </div>
                </div>

                <!-- Sidebar de Reserva -->
                <div style="position: sticky; top: 110px;">
                    <div style="background: #131620; border: 1px solid rgba(197, 168, 128, 0.3); border-radius: 20px; padding: 28px; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
                        <div style="margin-bottom: 20px; border-bottom: 1px solid #222938; padding-bottom: 16px;">
                            <span style="font-size: 12px; color: #9b9588; text-transform: uppercase;">Preço Estimado</span>
                            <div style="display: flex; align-items: baseline; gap: 8px; margin-top: 4px;">
                                <span style="font-size: 32px; color: #c5a880; font-family: var(--font-serif); font-weight: 600;"><?php echo esc_html($price_from ?: '65€'); ?></span>
                                <span style="color: #9b9588; font-size: 14px;">/ noite</span>
                            </div>
                        </div>

                        <!-- Resumo de Comodidades -->
                        <div style="display: flex; flex-direction: column; gap: 12px; font-size: 13px; color: #c4beb3; margin-bottom: 28px;">
                            <div style="display: flex; justify-content: space-between;">
                                <span style="color: #9b9588;">Capacidade:</span>
                                <strong><?php echo esc_html($capacity ?: 'Até 2 hóspedes'); ?></strong>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span style="color: #9b9588;">Tipologia:</span>
                                <strong><?php echo esc_html($bed_type ?: '1 Cama de Casal'); ?></strong>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span style="color: #9b9588;">Casa de banho:</span>
                                <strong><?php echo esc_html($bathroom_type ?: 'Privativa'); ?></strong>
                            </div>
                        </div>

                        <?php if ($booking_url): ?>
                            <a href="<?php echo esc_url($booking_url); ?>" target="_blank" rel="noopener noreferrer" class="btn-primary" style="width: 100%; justify-content: center; padding: 14px; margin-bottom: 12px;">
                                <span>Verificar Datas no Booking</span>
                            </a>
                        <?php endif; ?>

                        <a href="https://wa.me/351912345678?text=Ol%C3%A1!%20Gostaria%20de%20consultar%20disponibilidade%20para%20o%20<?php echo urlencode(get_the_title()); ?>." target="_blank" rel="noopener noreferrer" class="btn-outline" style="width: 100%; justify-content: center; padding: 12px; font-size: 13px;">
                            <span>Falar no WhatsApp</span>
                        </a>

                        <p style="font-size: 11px; color: #646970; text-align: center; margin-top: 16px;">
                            Garantia de melhor tarifa e confirmação imediata.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    </main>

<?php endwhile;

get_footer();
