<?php
/**
 * Aveiro Alojamentos Theme Functions and Definitions
 *
 * @package AveiroAlojamentos
 */

if (!defined('ABSPATH')) {
    exit;
}

define('AVEIRO_THEME_VERSION', '1.0.0');
define('AVEIRO_THEME_DIR', get_template_directory());
define('AVEIRO_THEME_URI', get_template_directory_uri());

// 1. Configurações Básicas do Tema
function aveiro_theme_setup() {
    // Suporte a título dinâmico
    add_theme_support('title-tag');

    // Suporte a miniaturas / imagens destacadas
    add_theme_support('post-thumbnails');
    set_post_thumbnail_size(1200, 800, true);

    // Suporte a HTML5 semântico
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script'
    ));

    // Suporte a Logo Customizada
    add_theme_support('custom-logo', array(
        'height'      => 80,
        'width'       => 260,
        'flex-height' => true,
        'flex-width'  => true,
    ));

    // Suporte a embeds responsivos
    add_theme_support('responsive-embeds');

    // Menus
    register_nav_menus(array(
        'primary' => __('Menu Principal Superior', 'aveiro-alojamentos'),
        'footer'  => __('Menu Rodapé', 'aveiro-alojamentos'),
    ));
}
add_action('after_setup_theme', 'aveiro_theme_setup');

// 2. Enfileirar Estilos e Scripts
function aveiro_enqueue_assets() {
    // Google Fonts: Playfair Display & Plus Jakarta Sans
    wp_enqueue_style(
        'aveiro-fonts',
        'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap',
        array(),
        null
    );

    // Folha de Estilos Principal do Tema
    wp_enqueue_style(
        'aveiro-theme-style',
        AVEIRO_THEME_URI . '/assets/css/theme.css',
        array('aveiro-fonts'),
        AVEIRO_THEME_VERSION
    );

    // Script Principal do Tema
    wp_enqueue_script(
        'aveiro-theme-script',
        AVEIRO_THEME_URI . '/assets/js/theme.js',
        array('jquery'),
        AVEIRO_THEME_VERSION,
        true
    );

    // Passar variáveis e nonce para o JavaScript
    wp_localize_script('aveiro-theme-script', 'aveiroSettings', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce'    => wp_create_nonce('aveiro_frontend_nonce'),
        'theme_url'=> AVEIRO_THEME_URI,
    ));
}
add_action('wp_enqueue_scripts', 'aveiro_enqueue_assets');

// 3. Enfileirar Scripts no Painel Admin (para a Galeria de Fotos com wp.media)
function aveiro_admin_enqueue_scripts($hook) {
    global $post;
    if ($hook === 'post.php' || $hook === 'post-new.php') {
        if (isset($post) && $post->post_type === 'alojamento') {
            wp_enqueue_media();
        }
    }
}
add_action('admin_enqueue_scripts', 'aveiro_admin_enqueue_scripts');

// 4. Carregar Módulos do Tema
require_once AVEIRO_THEME_DIR . '/inc/cpt-alojamento.php';
require_once AVEIRO_THEME_DIR . '/inc/metabox-alojamento.php';
require_once AVEIRO_THEME_DIR . '/inc/cpt-depoimento.php';
require_once AVEIRO_THEME_DIR . '/inc/admin-moderation.php';
require_once AVEIRO_THEME_DIR . '/inc/ajax-reviews.php';
require_once AVEIRO_THEME_DIR . '/inc/demo-data.php';

// 5. Helper para obter fotos de um alojamento
function aveiro_get_alojamento_photos($post_id) {
    $photos = array();

    // 1. Verificar fotos adicionadas na galeria pelo WP Admin
    $gallery_ids = get_post_meta($post_id, '_alojamento_gallery_ids', true);
    if (!empty($gallery_ids)) {
        $ids = array_filter(explode(',', $gallery_ids));
        foreach ($ids as $id) {
            $url = wp_get_attachment_image_url($id, 'full');
            if ($url) {
                $photos[] = array(
                    'url' => $url,
                    'alt' => get_post_meta($id, '_wp_attachment_image_alt', true) ?: get_the_title($post_id),
                );
            }
        }
    }

    // 2. Se a galeria estiver vazia, usar imagem destacada ou imagens bundled padrão
    if (empty($photos)) {
        if (has_post_thumbnail($post_id)) {
            $photos[] = array(
                'url' => get_the_post_thumbnail_url($post_id, 'full'),
                'alt' => get_the_title($post_id),
            );
        }

        $slug = get_post_field('post_name', $post_id);
        if ($slug === 'aveiro-sunset') {
            for ($i = 1; $i <= 8; $i++) {
                $num = str_pad($i, 2, '0', STR_PAD_LEFT);
                $photos[] = array(
                    'url' => AVEIRO_THEME_URI . '/assets/images/aveiro-sunset/aveiro-sunset-' . $num . '.jpg',
                    'alt' => 'Aveiro Sunset - Foto ' . $i,
                );
            }
        } elseif ($slug === 'aveiro-white-105') {
            for ($i = 1; $i <= 6; $i++) {
                $num = str_pad($i, 2, '0', STR_PAD_LEFT);
                $photos[] = array(
                    'url' => AVEIRO_THEME_URI . '/assets/images/aveiro-white/aveiro-white-105-' . $num . '.jpg',
                    'alt' => 'Aveiro White 105 - Foto ' . $i,
                );
            }
        }
    }

    return $photos;
}
