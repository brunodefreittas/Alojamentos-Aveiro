<?php
/**
 * Meta Boxes para Alojamento: Galeria de Fotos e Dados do Alojamento
 *
 * @package AveiroAlojamentos
 */

if (!defined('ABSPATH')) {
    exit;
}

function aveiro_add_alojamento_metaboxes() {
    // 1. Galeria de Fotos do Alojamento
    add_meta_box(
        'aveiro_alojamento_gallery',
        __('📸 Galeria de Fotos do Alojamento (Adicionar / Gerir Fotos)', 'aveiro-alojamentos'),
        'aveiro_render_alojamento_gallery_metabox',
        'alojamento',
        'normal',
        'high'
    );

    // 2. Detalhes e Configurações de Reserva
    add_meta_box(
        'aveiro_alojamento_details',
        __('📍 Detalhes do Alojamento, Morada e Booking.com', 'aveiro-alojamentos'),
        'aveiro_render_alojamento_details_metabox',
        'alojamento',
        'normal',
        'default'
    );
}
add_action('add_meta_boxes', 'aveiro_add_alojamento_metaboxes');

/**
 * Render da Galeria de Fotos
 */
function aveiro_render_alojamento_gallery_metabox($post) {
    wp_nonce_field('aveiro_alojamento_meta_save', 'aveiro_alojamento_meta_nonce');
    $gallery_ids = get_post_meta($post->ID, '_alojamento_gallery_ids', true);
    $ids_array = !empty($gallery_ids) ? array_filter(explode(',', $gallery_ids)) : array();
    ?>
    <div id="aveiro-gallery-metabox-wrapper">
        <p class="description" style="margin-bottom: 12px; font-size: 13px;">
            <?php _e('Adicione quantas fotos desejar à galeria deste alojamento. Pode carregar novas fotos do seu computador ou escolher fotos já existentes na Biblioteca de Mídia.', 'aveiro-alojamentos'); ?>
        </p>

        <div id="aveiro-gallery-container" style="display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 16px;">
            <?php
            if (!empty($ids_array)) {
                foreach ($ids_array as $img_id) {
                    $thumb_url = wp_get_attachment_image_url($img_id, 'thumbnail');
                    if ($thumb_url) {
                        ?>
                        <div class="aveiro-gallery-item" data-id="<?php echo esc_attr($img_id); ?>" style="position: relative; width: 110px; height: 110px; border: 2px solid #ddd; border-radius: 8px; overflow: hidden; background: #000;">
                            <img src="<?php echo esc_url($thumb_url); ?>" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
                            <button type="button" class="aveiro-remove-gallery-item" title="<?php esc_attr_e('Remover foto', 'aveiro-alojamentos'); ?>" style="position: absolute; top: 4px; right: 4px; background: rgba(220,53,69,0.9); color: #fff; border: none; border-radius: 50%; width: 22px; height: 22px; cursor: pointer; font-weight: bold; line-height: 1; display: flex; align-items: center; justify-content: center;">&times;</button>
                        </div>
                        <?php
                    }
                }
            }
            ?>
        </div>

        <input type="hidden" name="alojamento_gallery_ids" id="alojamento_gallery_ids" value="<?php echo esc_attr($gallery_ids); ?>" />

        <div style="display: flex; gap: 10px; align-items: center;">
            <button type="button" class="button button-primary button-large" id="aveiro-add-gallery-btn">
                <span class="dashicons dashicons-format-gallery" style="vertical-align: middle; margin-right: 4px;"></span>
                <?php _e('+ Adicionar Fotos à Galeria', 'aveiro-alojamentos'); ?>
            </button>
            <button type="button" class="button" id="aveiro-clear-gallery-btn" style="<?php echo empty($ids_array) ? 'display:none;' : ''; ?>">
                <?php _e('Limpar Todas as Fotos', 'aveiro-alojamentos'); ?>
            </button>
            <span id="aveiro-gallery-count" style="color: #666; font-size: 12px; margin-left: 8px;">
                <?php printf(__('%d foto(s) na galeria', 'aveiro-alojamentos'), count($ids_array)); ?>
            </span>
        </div>
    </div>

    <script>
    jQuery(document).ready(function($) {
        var file_frame;
        var $input = $('#alojamento_gallery_ids');
        var $container = $('#aveiro-gallery-container');
        var $count = $('#aveiro-gallery-count');
        var $clearBtn = $('#aveiro-clear-gallery-btn');

        function updateIds() {
            var ids = [];
            $container.find('.aveiro-gallery-item').each(function() {
                ids.push($(this).data('id'));
            });
            $input.val(ids.join(','));
            $count.text(ids.length + ' <?php _e('foto(s) na galeria', 'aveiro-alojamentos'); ?>');
            if (ids.length > 0) {
                $clearBtn.show();
            } else {
                $clearBtn.hide();
            }
        }

        $('#aveiro-add-gallery-btn').on('click', function(e) {
            e.preventDefault();

            if (file_frame) {
                file_frame.open();
                return;
            }

            file_frame = wp.media({
                title: '<?php _e('Escolha ou envie fotos para a galeria do alojamento', 'aveiro-alojamentos'); ?>',
                button: { text: '<?php _e('Inserir Fotos Selecionadas', 'aveiro-alojamentos'); ?>' },
                multiple: true
            });

            file_frame.on('select', function() {
                var attachments = file_frame.state().get('selection').toJSON();
                attachments.forEach(function(attachment) {
                    var thumb = attachment.sizes && attachment.sizes.thumbnail ? attachment.sizes.thumbnail.url : attachment.url;
                    // Check if already added
                    if ($container.find('[data-id="' + attachment.id + '"]').length === 0) {
                        var html = '<div class="aveiro-gallery-item" data-id="' + attachment.id + '" style="position: relative; width: 110px; height: 110px; border: 2px solid #ddd; border-radius: 8px; overflow: hidden; background: #000;">' +
                            '<img src="' + thumb + '" style="width: 100%; height: 100%; object-fit: cover; display: block;" />' +
                            '<button type="button" class="aveiro-remove-gallery-item" title="Remover foto" style="position: absolute; top: 4px; right: 4px; background: rgba(220,53,69,0.9); color: #fff; border: none; border-radius: 50%; width: 22px; height: 22px; cursor: pointer; font-weight: bold; line-height: 1; display: flex; align-items: center; justify-content: center;">&times;</button>' +
                            '</div>';
                        $container.append(html);
                    }
                });
                updateIds();
            });

            file_frame.open();
        });

        $container.on('click', '.aveiro-remove-gallery-item', function(e) {
            e.preventDefault();
            $(this).closest('.aveiro-gallery-item').fadeOut(200, function() {
                $(this).remove();
                updateIds();
            });
        });

        $clearBtn.on('click', function(e) {
            e.preventDefault();
            if (confirm('<?php _e('Tem certeza que deseja remover todas as fotos da galeria?', 'aveiro-alojamentos'); ?>')) {
                $container.empty();
                updateIds();
            }
        });
    });
    </script>
    <?php
}

/**
 * Render dos Detalhes do Alojamento
 */
function aveiro_render_alojamento_details_metabox($post) {
    $address        = get_post_meta($post->ID, '_alojamento_address', true);
    $postal_code    = get_post_meta($post->ID, '_alojamento_postal_code', true);
    $lat            = get_post_meta($post->ID, '_alojamento_lat', true);
    $lng            = get_post_meta($post->ID, '_alojamento_lng', true);
    $booking_url    = get_post_meta($post->ID, '_alojamento_booking_url', true);
    $booking_score  = get_post_meta($post->ID, '_alojamento_booking_score', true);
    $booking_reviews= get_post_meta($post->ID, '_alojamento_booking_reviews', true);
    $capacity       = get_post_meta($post->ID, '_alojamento_capacity', true);
    $bed_type       = get_post_meta($post->ID, '_alojamento_bed_type', true);
    $bathroom_type  = get_post_meta($post->ID, '_alojamento_bathroom_type', true);
    $price_from     = get_post_meta($post->ID, '_alojamento_price_from', true);
    $tagline        = get_post_meta($post->ID, '_alojamento_tagline', true);
    $highlights     = get_post_meta($post->ID, '_alojamento_highlights', true);
    $amenities      = get_post_meta($post->ID, '_alojamento_amenities', true);
    if (!is_array($amenities)) {
        $amenities = array();
    }

    $all_amenities = array(
        'wifi'         => __('Wi-Fi de Alta Velocidade Gratuito', 'aveiro-alojamentos'),
        'ac'           => __('Ar Condicionado Climatizado', 'aveiro-alojamentos'),
        'kitchen'      => __('Kitchenette Totalmente Equipada', 'aveiro-alojamentos'),
        'tv'           => __('Smart TV com Canais por Cabo', 'aveiro-alojamentos'),
        'balcony'      => __('Varanda / Marquise Panorâmica', 'aveiro-alojamentos'),
        'view'         => __('Vista Direta para o Canal da Ria', 'aveiro-alojamentos'),
        'hairdryer'    => __('Secador de Cabelo e Amenities', 'aveiro-alojamentos'),
        'coffee'       => __('Máquina de Café e Chaleira', 'aveiro-alojamentos'),
        'dishwasher'   => __('Máquina de Lavar Louça', 'aveiro-alojamentos'),
        'soundproof'   => __('Isolamento Acústico Reforçado', 'aveiro-alojamentos'),
        'cot'          => __('Berço para Bebé Disponível', 'aveiro-alojamentos'),
        'central'      => __('Localização Central / Pedonal', 'aveiro-alojamentos'),
    );
    ?>
    <table class="form-table" style="max-width: 100%;">
        <tr>
            <th scope="row"><label for="alojamento_tagline"><?php _e('Subtítulo / Frase de Destaque', 'aveiro-alojamentos'); ?></label></th>
            <td>
                <input type="text" name="alojamento_tagline" id="alojamento_tagline" value="<?php echo esc_attr($tagline); ?>" class="large-text" placeholder="Ex: Vista sobre o canal, luz natural e a serenidade da ria" />
            </td>
        </tr>
        <tr>
            <th scope="row"><label for="alojamento_address"><?php _e('Morada Completa', 'aveiro-alojamentos'); ?></label></th>
            <td>
                <input type="text" name="alojamento_address" id="alojamento_address" value="<?php echo esc_attr($address); ?>" class="regular-text" placeholder="Ex: Rua de Abel Ribeiro, nº 49" />
                <input type="text" name="alojamento_postal_code" id="alojamento_postal_code" value="<?php echo esc_attr($postal_code); ?>" style="width: 120px;" placeholder="3800-350" />
                <p class="description"><?php _e('Morada e Código Postal de Aveiro para cálculo do mapa.', 'aveiro-alojamentos'); ?></p>
            </td>
        </tr>
        <tr>
            <th scope="row"><label><?php _e('Coordenadas GPS (Mapa)', 'aveiro-alojamentos'); ?></label></th>
            <td>
                <label>Lat: <input type="text" name="alojamento_lat" value="<?php echo esc_attr($lat); ?>" style="width: 130px;" placeholder="40.64333" /></label>
                &nbsp;&nbsp;
                <label>Lng: <input type="text" name="alojamento_lng" value="<?php echo esc_attr($lng); ?>" style="width: 130px;" placeholder="-8.65644" /></label>
                <p class="description"><?php _e('Latitude e Longitude para posicionar o pin exato no Google Maps interativo.', 'aveiro-alojamentos'); ?></p>
            </td>
        </tr>
        <tr>
            <th scope="row"><label for="alojamento_booking_url"><?php _e('Link Oficial no Booking.com', 'aveiro-alojamentos'); ?></label></th>
            <td>
                <input type="url" name="alojamento_booking_url" id="alojamento_booking_url" value="<?php echo esc_url($booking_url); ?>" class="large-text" placeholder="https://www.booking.com/hotel/pt/aveiro-sunset.pt-br.html" />
                <p class="description"><?php _e('Link direto onde os hóspedes concluem a reserva com segurança.', 'aveiro-alojamentos'); ?></p>
            </td>
        </tr>
        <tr>
            <th scope="row"><label><?php _e('Avaliação Booking.com', 'aveiro-alojamentos'); ?></label></th>
            <td>
                <label>Nota: <input type="text" name="alojamento_booking_score" value="<?php echo esc_attr($booking_score); ?>" style="width: 80px;" placeholder="9.1" /></label>
                &nbsp;&nbsp;
                <label>Nº de Avaliações: <input type="text" name="alojamento_booking_reviews" value="<?php echo esc_attr($booking_reviews); ?>" style="width: 80px;" placeholder="140" /></label>
            </td>
        </tr>
        <tr>
            <th scope="row"><label><?php _e('Capacidade & Tipologia', 'aveiro-alojamentos'); ?></label></th>
            <td>
                <label>Hóspedes: <input type="text" name="alojamento_capacity" value="<?php echo esc_attr($capacity); ?>" style="width: 120px;" placeholder="Até 2 pessoas" /></label>
                &nbsp;&nbsp;
                <label>Cama: <input type="text" name="alojamento_bed_type" value="<?php echo esc_attr($bed_type); ?>" style="width: 160px;" placeholder="1 Cama de Casal" /></label>
                &nbsp;&nbsp;
                <label>Banho: <input type="text" name="alojamento_bathroom_type" value="<?php echo esc_attr($bathroom_type); ?>" style="width: 180px;" placeholder="1 Casa de banho privativa" /></label>
                &nbsp;&nbsp;
                <label>Preço desde: <input type="text" name="alojamento_price_from" value="<?php echo esc_attr($price_from); ?>" style="width: 100px;" placeholder="65€" /></label>
            </td>
        </tr>
        <tr>
            <th scope="row"><label for="alojamento_highlights"><?php _e('Destaques (1 por linha)', 'aveiro-alojamentos'); ?></label></th>
            <td>
                <textarea name="alojamento_highlights" id="alojamento_highlights" rows="4" class="large-text" placeholder="Vista panorâmica para o canal&#10;Localização privilegiada na Beira-Mar&#10;Kitchenette moderna totalmente equipada"><?php echo esc_textarea($highlights); ?></textarea>
            </td>
        </tr>
        <tr>
            <th scope="row"><label><?php _e('Comodidades Disponíveis', 'aveiro-alojamentos'); ?></label></th>
            <td>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 8px;">
                    <?php foreach ($all_amenities as $key => $label): ?>
                        <label>
                            <input type="checkbox" name="alojamento_amenities[]" value="<?php echo esc_attr($key); ?>" <?php checked(in_array($key, $amenities)); ?> />
                            <?php echo esc_html($label); ?>
                        </label>
                    <?php endforeach; ?>
                </div>
            </td>
        </tr>
    </table>
    <?php
}

/**
 * Salvar Metadados do Alojamento
 */
function aveiro_save_alojamento_metaboxes($post_id) {
    if (!isset($_POST['aveiro_alojamento_meta_nonce']) || !wp_verify_nonce($_POST['aveiro_alojamento_meta_nonce'], 'aveiro_alojamento_meta_save')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    // Salvar IDs da Galeria de Fotos
    if (isset($_POST['alojamento_gallery_ids'])) {
        update_post_meta($post_id, '_alojamento_gallery_ids', sanitize_text_field($_POST['alojamento_gallery_ids']));
    }

    // Salvar campos simples
    $simple_fields = array(
        'alojamento_tagline'        => '_alojamento_tagline',
        'alojamento_address'        => '_alojamento_address',
        'alojamento_postal_code'    => '_alojamento_postal_code',
        'alojamento_lat'            => '_alojamento_lat',
        'alojamento_lng'            => '_alojamento_lng',
        'alojamento_booking_url'    => '_alojamento_booking_url',
        'alojamento_booking_score'  => '_alojamento_booking_score',
        'alojamento_booking_reviews'=> '_alojamento_booking_reviews',
        'alojamento_capacity'       => '_alojamento_capacity',
        'alojamento_bed_type'       => '_alojamento_bed_type',
        'alojamento_bathroom_type'  => '_alojamento_bathroom_type',
        'alojamento_price_from'     => '_alojamento_price_from',
        'alojamento_highlights'     => '_alojamento_highlights',
    );

    foreach ($simple_fields as $post_key => $meta_key) {
        if (isset($_POST[$post_key])) {
            if ($post_key === 'alojamento_booking_url') {
                update_post_meta($post_id, $meta_key, esc_url_raw($_POST[$post_key]));
            } elseif ($post_key === 'alojamento_highlights') {
                update_post_meta($post_id, $meta_key, sanitize_textarea_field($_POST[$post_key]));
            } else {
                update_post_meta($post_id, $meta_key, sanitize_text_field($_POST[$post_key]));
            }
        }
    }

    // Salvar comodidades
    if (isset($_POST['alojamento_amenities']) && is_array($_POST['alojamento_amenities'])) {
        $amenities = array_map('sanitize_text_field', $_POST['alojamento_amenities']);
        update_post_meta($post_id, '_alojamento_amenities', $amenities);
    } else {
        update_post_meta($post_id, '_alojamento_amenities', array());
    }
}
add_action('save_post_alojamento', 'aveiro_save_alojamento_metaboxes');
