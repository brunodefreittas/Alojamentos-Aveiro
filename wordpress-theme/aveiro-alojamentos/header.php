<?php
/**
 * Header Template
 *
 * @package AveiroAlojamentos
 */

if (!defined('ABSPATH')) {
    exit;
}

$alojamentos = get_posts(array(
    'post_type'      => 'alojamento',
    'posts_per_page' => -1,
    'post_status'    => 'publish',
));
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header">
    <div class="container nav-inner">
        <!-- Marca / Logo -->
        <a href="<?php echo esc_url(home_url('/')); ?>" class="site-brand">
            <span class="brand-title">Aveiro Alojamentos</span>
            <span class="brand-subtitle">Sunset & White 105</span>
        </a>

        <!-- Menu Superior -->
        <nav class="nav-wrapper" aria-label="<?php esc_attr_e('Menu Principal', 'aveiro-alojamentos'); ?>">
            <ul class="nav-menu">
                <li><a href="<?php echo esc_url(home_url('/#inicio')); ?>"><?php _e('Início', 'aveiro-alojamentos'); ?></a></li>

                <!-- Dropdown Alojamentos -->
                <li class="dropdown-wrapper">
                    <button type="button" class="nav-btn dropdown-trigger">
                        <span><?php _e('Alojamentos', 'aveiro-alojamentos'); ?></span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    <div class="dropdown-panel">
                        <div class="dropdown-inner">
                            <?php if (!empty($alojamentos)): ?>
                                <?php foreach ($alojamentos as $aloj):
                                    $addr = get_post_meta($aloj->ID, '_alojamento_address', true);
                                    ?>
                                    <a href="<?php echo esc_url(get_permalink($aloj->ID)); ?>" class="dropdown-item">
                                        <span class="dropdown-item-title"><?php echo esc_html($aloj->post_title); ?></span>
                                        <span class="dropdown-item-desc"><?php echo esc_html($addr ?: 'Aveiro'); ?></span>
                                    </a>
                                <?php endforeach; ?>
                            <?php else: ?>
                                <a href="<?php echo esc_url(home_url('/#alojamentos')); ?>" class="dropdown-item">
                                    <span class="dropdown-item-title">Aveiro Sunset</span>
                                    <span class="dropdown-item-desc">Rua de Abel Ribeiro (Vista Canal)</span>
                                </a>
                                <a href="<?php echo esc_url(home_url('/#alojamentos')); ?>" class="dropdown-item">
                                    <span class="dropdown-item-title">Aveiro White 105</span>
                                    <span class="dropdown-item-desc">Av. Dr. Lourenço Peixinho (Central)</span>
                                </a>
                            <?php endif; ?>
                        </div>
                    </div>
                </li>

                <li><a href="<?php echo esc_url(home_url('/#cidade')); ?>"><?php _e('Descobrir Aveiro', 'aveiro-alojamentos'); ?></a></li>
                <li><a href="<?php echo esc_url(home_url('/#gastronomia')); ?>"><?php _e('Gastronomia', 'aveiro-alojamentos'); ?></a></li>
                <li><a href="<?php echo esc_url(home_url('/#depoimentos')); ?>"><?php _e('Depoimentos', 'aveiro-alojamentos'); ?></a></li>
                <li><a href="<?php echo esc_url(home_url('/#localizacao')); ?>"><?php _e('Localização', 'aveiro-alojamentos'); ?></a></li>
                <li><a href="<?php echo esc_url(home_url('/#contacto')); ?>"><?php _e('Contacto', 'aveiro-alojamentos'); ?></a></li>
            </ul>
        </nav>

        <!-- CTA Booking & WhatsApp -->
        <div style="display: flex; align-items: center; gap: 12px;">
            <a href="https://wa.me/351912345678?text=Ol%C3%A1!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20os%20alojamentos%20em%20Aveiro." target="_blank" rel="noopener noreferrer" class="btn-outline" style="padding: 8px 16px; font-size: 12px;">
                WhatsApp
            </a>
            <a href="<?php echo esc_url(home_url('/#alojamentos')); ?>" class="btn-primary" style="padding: 8px 18px; font-size: 13px;">
                <?php _e('Reservar', 'aveiro-alojamentos'); ?>
            </a>
        </div>
    </div>
</header>
