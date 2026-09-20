<?php
/**
 * Custom Post Type: Alojamento
 *
 * @package AveiroAlojamentos
 */

if (!defined('ABSPATH')) {
    exit;
}

function aveiro_register_cpt_alojamento() {
    $labels = array(
        'name'                  => _x('Alojamentos', 'Post type general name', 'aveiro-alojamentos'),
        'singular_name'         => _x('Alojamento', 'Post type singular name', 'aveiro-alojamentos'),
        'menu_name'             => _x('Alojamentos', 'Admin Menu text', 'aveiro-alojamentos'),
        'name_admin_bar'        => _x('Alojamento', 'Add New on Toolbar', 'aveiro-alojamentos'),
        'add_new'               => __('Adicionar Novo', 'aveiro-alojamentos'),
        'add_new_item'          => __('Adicionar Novo Alojamento', 'aveiro-alojamentos'),
        'new_item'              => __('Novo Alojamento', 'aveiro-alojamentos'),
        'edit_item'             => __('Editar Alojamento', 'aveiro-alojamentos'),
        'view_item'             => __('Ver Alojamento', 'aveiro-alojamentos'),
        'all_items'             => __('Todos os Alojamentos', 'aveiro-alojamentos'),
        'search_items'          => __('Pesquisar Alojamentos', 'aveiro-alojamentos'),
        'parent_item_colon'     => __('Alojamentos ascendentes:', 'aveiro-alojamentos'),
        'not_found'             => __('Nenhum alojamento encontrado.', 'aveiro-alojamentos'),
        'not_found_in_trash'    => __('Nenhum alojamento encontrado no lixo.', 'aveiro-alojamentos'),
        'featured_image'        => _x('Foto Principal de Capa', 'Overrides the “Featured Image” phrase', 'aveiro-alojamentos'),
        'set_featured_image'    => _x('Definir foto de capa', 'Overrides the “Set featured image” phrase', 'aveiro-alojamentos'),
        'remove_featured_image' => _x('Remover foto de capa', 'Overrides the “Remove featured image” phrase', 'aveiro-alojamentos'),
        'use_featured_image'    => _x('Usar como foto de capa', 'Overrides the “Use as featured image” phrase', 'aveiro-alojamentos'),
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array('slug' => 'alojamento', 'with_front' => false),
        'capability_type'    => 'post',
        'has_archive'        => 'alojamentos',
        'hierarchical'       => false,
        'menu_position'      => 5,
        'menu_icon'          => 'dashicons-building',
        'supports'           => array('title', 'editor', 'thumbnail', 'excerpt'),
        'show_in_rest'       => true,
    );

    register_post_type('alojamento', $args);
}
add_action('init', 'aveiro_register_cpt_alojamento');

// Custom columns in WP-Admin list
function aveiro_alojamento_columns($columns) {
    $new_columns = array();
    $new_columns['cb'] = $columns['cb'];
    $new_columns['thumbnail'] = __('Foto', 'aveiro-alojamentos');
    $new_columns['title'] = $columns['title'];
    $new_columns['address'] = __('Morada', 'aveiro-alojamentos');
    $new_columns['booking_score'] = __('Nota Booking', 'aveiro-alojamentos');
    $new_columns['gallery_count'] = __('Fotos na Galeria', 'aveiro-alojamentos');
    $new_columns['date'] = $columns['date'];
    return $new_columns;
}
add_filter('manage_alojamento_posts_columns', 'aveiro_alojamento_columns');

function aveiro_alojamento_custom_column($column, $post_id) {
    switch ($column) {
        case 'thumbnail':
            if (has_post_thumbnail($post_id)) {
                echo get_the_post_thumbnail($post_id, array(60, 45), array('style' => 'border-radius: 6px; object-fit: cover;'));
            } else {
                echo '<span style="color:#999;">Sem foto</span>';
            }
            break;
        case 'address':
            $address = get_post_meta($post_id, '_alojamento_address', true);
            echo esc_html($address ?: '—');
            break;
        case 'booking_score':
            $score = get_post_meta($post_id, '_alojamento_booking_score', true);
            if ($score) {
                echo '<strong style="color: #003580; background: #eef3fc; padding: 2px 8px; border-radius: 4px;">' . esc_html($score) . '</strong>';
            } else {
                echo '—';
            }
            break;
        case 'gallery_count':
            $gallery_ids = get_post_meta($post_id, '_alojamento_gallery_ids', true);
            $count = !empty($gallery_ids) ? count(array_filter(explode(',', $gallery_ids))) : 0;
            echo '<span class="badge" style="background:#2271b1; color:#fff; border-radius:10px; padding:2px 8px; font-size:11px;">' . intval($count) . ' fotos</span>';
            break;
    }
}
add_action('manage_alojamento_posts_custom_column', 'aveiro_alojamento_custom_column', 10, 2);
