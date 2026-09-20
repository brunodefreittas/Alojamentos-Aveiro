<?php
/**
 * Custom Post Type: Depoimento (Avaliações dos Hóspedes)
 *
 * @package AveiroAlojamentos
 */

if (!defined('ABSPATH')) {
    exit;
}

function aveiro_register_cpt_depoimento() {
    $labels = array(
        'name'                  => _x('Depoimentos', 'Post type general name', 'aveiro-alojamentos'),
        'singular_name'         => _x('Depoimento', 'Post type singular name', 'aveiro-alojamentos'),
        'menu_name'             => _x('Depoimentos', 'Admin Menu text', 'aveiro-alojamentos'),
        'name_admin_bar'        => _x('Depoimento', 'Add New on Toolbar', 'aveiro-alojamentos'),
        'add_new'               => __('Adicionar Manualmente', 'aveiro-alojamentos'),
        'add_new_item'          => __('Adicionar Novo Depoimento', 'aveiro-alojamentos'),
        'new_item'              => __('Novo Depoimento', 'aveiro-alojamentos'),
        'edit_item'             => __('Editar Depoimento', 'aveiro-alojamentos'),
        'view_item'             => __('Ver Depoimento', 'aveiro-alojamentos'),
        'all_items'             => __('Todos os Depoimentos', 'aveiro-alojamentos'),
        'search_items'          => __('Pesquisar Depoimentos', 'aveiro-alojamentos'),
        'not_found'             => __('Nenhum depoimento encontrado.', 'aveiro-alojamentos'),
        'not_found_in_trash'    => __('Nenhum depoimento no lixo.', 'aveiro-alojamentos'),
    );

    $args = array(
        'labels'             => $labels,
        'public'             => false, // Não precisa de página pública isolada, é exibido nos templates
        'publicly_queryable' => false,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'capability_type'    => 'post',
        'has_archive'        => false,
        'hierarchical'       => false,
        'menu_position'      => 6,
        'menu_icon'          => 'dashicons-testimonial',
        'supports'           => array('title', 'editor'), // title = Nome do Hóspede, editor = Depoimento
        'show_in_rest'       => true,
    );

    register_post_type('depoimento', $args);
}
add_action('init', 'aveiro_register_cpt_depoimento');

// Meta boxes para Depoimento
function aveiro_add_depoimento_metaboxes() {
    add_meta_box(
        'aveiro_depoimento_details',
        __('⭐ Detalhes da Avaliação do Hóspede', 'aveiro-alojamentos'),
        'aveiro_render_depoimento_metabox',
        'depoimento',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'aveiro_add_depoimento_metaboxes');

function aveiro_render_depoimento_metabox($post) {
    wp_nonce_field('aveiro_depoimento_save', 'aveiro_depoimento_nonce');

    $rating        = get_post_meta($post->ID, '_review_rating', true) ?: 5;
    $origin        = get_post_meta($post->ID, '_review_origin', true);
    $apartment_id  = get_post_meta($post->ID, '_review_apartment_id', true);
    $stay_date     = get_post_meta($post->ID, '_review_stay_date', true);
    $status        = $post->post_status;

    // Buscar lista de alojamentos
    $alojamentos = get_posts(array(
        'post_type'      => 'alojamento',
        'posts_per_page' => -1,
        'post_status'    => 'any',
    ));
    ?>
    <table class="form-table">
        <tr>
            <th><label><?php _e('Status da Moderação', 'aveiro-alojamentos'); ?></label></th>
            <td>
                <?php if ($status === 'publish'): ?>
                    <span style="background: #008a00; color: #fff; padding: 4px 10px; border-radius: 4px; font-weight: bold; font-size: 13px;">✓ Aprovado e Publicado no Site</span>
                <?php elseif ($status === 'pending'): ?>
                    <span style="background: #dba617; color: #fff; padding: 4px 10px; border-radius: 4px; font-weight: bold; font-size: 13px;">⏳ Pendente de Aprovação</span>
                <?php else: ?>
                    <span style="background: #d63638; color: #fff; padding: 4px 10px; border-radius: 4px; font-weight: bold; font-size: 13px;">✕ Reprovado / Rascunho</span>
                <?php endif; ?>
                <p class="description"><?php _e('Altere para "Publicado" para exibir este depoimento no site.', 'aveiro-alojamentos'); ?></p>
            </td>
        </tr>
        <tr>
            <th><label for="review_rating"><?php _e('Classificação (Estrelas)', 'aveiro-alojamentos'); ?></label></th>
            <td>
                <select name="review_rating" id="review_rating">
                    <option value="5" <?php selected($rating, 5); ?>>★★★★★ (5 Estrelas - Excelente)</option>
                    <option value="4" <?php selected($rating, 4); ?>>★★★★☆ (4 Estrelas - Muito Bom)</option>
                    <option value="3" <?php selected($rating, 3); ?>>★★★☆☆ (3 Estrelas - Bom)</option>
                    <option value="2" <?php selected($rating, 2); ?>>★★☆☆☆ (2 Estrelas - Razoável)</option>
                    <option value="1" <?php selected($rating, 1); ?>>★☆☆☆☆ (1 Estrela - Fraco)</option>
                </select>
            </td>
        </tr>
        <tr>
            <th><label for="review_origin"><?php _e('Origem do Hóspede (Cidade / País)', 'aveiro-alojamentos'); ?></label></th>
            <td>
                <input type="text" name="review_origin" id="review_origin" value="<?php echo esc_attr($origin); ?>" class="regular-text" placeholder="Ex: Porto, Portugal ou Madrid, Espanha" />
            </td>
        </tr>
        <tr>
            <th><label for="review_apartment_id"><?php _e('Alojamento Avaliado', 'aveiro-alojamentos'); ?></label></th>
            <td>
                <select name="review_apartment_id" id="review_apartment_id">
                    <option value="geral" <?php selected($apartment_id, 'geral'); ?>><?php _e('Todos / Experiência Geral Aveiro', 'aveiro-alojamentos'); ?></option>
                    <?php foreach ($alojamentos as $aloj): ?>
                        <option value="<?php echo esc_attr($aloj->post_name); ?>" <?php selected($apartment_id, $aloj->post_name); ?>>
                            <?php echo esc_html($aloj->post_title); ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </td>
        </tr>
        <tr>
            <th><label for="review_stay_date"><?php _e('Data da Estadia', 'aveiro-alojamentos'); ?></label></th>
            <td>
                <input type="text" name="review_stay_date" id="review_stay_date" value="<?php echo esc_attr($stay_date); ?>" class="regular-text" placeholder="Ex: Setembro 2026" />
            </td>
        </tr>
    </table>
    <?php
}

function aveiro_save_depoimento_metabox($post_id) {
    if (!isset($_POST['aveiro_depoimento_nonce']) || !wp_verify_nonce($_POST['aveiro_depoimento_nonce'], 'aveiro_depoimento_save')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    if (isset($_POST['review_rating'])) {
        update_post_meta($post_id, '_review_rating', intval($_POST['review_rating']));
    }
    if (isset($_POST['review_origin'])) {
        update_post_meta($post_id, '_review_origin', sanitize_text_field($_POST['review_origin']));
    }
    if (isset($_POST['review_apartment_id'])) {
        update_post_meta($post_id, '_review_apartment_id', sanitize_text_field($_POST['review_apartment_id']));
    }
    if (isset($_POST['review_stay_date'])) {
        update_post_meta($post_id, '_review_stay_date', sanitize_text_field($_POST['review_stay_date']));
    }
}
add_action('save_post_depoimento', 'aveiro_save_depoimento_metabox');
