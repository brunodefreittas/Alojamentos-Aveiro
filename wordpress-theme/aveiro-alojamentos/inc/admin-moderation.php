<?php
/**
 * Painel de Moderação de Depoimentos (Aprovar, Reprovar e Publicar)
 *
 * @package AveiroAlojamentos
 */

if (!defined('ABSPATH')) {
    exit;
}

// 1. Adicionar Submenu com Contador de Pendentes
function aveiro_register_moderation_admin_menu() {
    $pending_count = wp_count_posts('depoimento')->pending;
    $menu_title = __('Moderar Depoimentos', 'aveiro-alojamentos');

    if ($pending_count > 0) {
        $menu_title .= sprintf(
            ' <span class="update-plugins count-%d" style="background:#dba617; color:#fff; border-radius:10px; padding:1px 7px; font-weight:bold; font-size:10px;"><span class="plugin-count">%d</span></span>',
            $pending_count,
            $pending_count
        );
    }

    add_submenu_page(
        'edit.php?post_type=depoimento',
        __('Moderar e Aprovar Depoimentos', 'aveiro-alojamentos'),
        $menu_title,
        'moderate_comments',
        'moderar-depoimentos',
        'aveiro_render_moderation_page'
    );
}
add_action('admin_menu', 'aveiro_register_moderation_admin_menu');

// 2. Processar Ações de Aprovação / Reprovação
function aveiro_handle_moderation_actions() {
    if (!isset($_GET['page']) || $_GET['page'] !== 'moderar-depoimentos') {
        return;
    }

    if (!isset($_GET['action']) || !isset($_GET['post_id'])) {
        return;
    }

    $post_id = intval($_GET['post_id']);
    $action  = sanitize_text_field($_GET['action']);

    if (!check_admin_referer('aveiro_moderate_' . $post_id)) {
        wp_die(__('Acesso inválido ou sessão expirada.', 'aveiro-alojamentos'));
    }

    if (!current_user_can('edit_post', $post_id)) {
        wp_die(__('Você não tem permissão para moderar este depoimento.', 'aveiro-alojamentos'));
    }

    if ($action === 'approve') {
        wp_update_post(array(
            'ID'          => $post_id,
            'post_status' => 'publish',
        ));
        add_settings_error('aveiro_moderation', 'approved', __('Depoimento aprovado e publicado com sucesso no site!', 'aveiro-alojamentos'), 'success');
    } elseif ($action === 'reject') {
        wp_update_post(array(
            'ID'          => $post_id,
            'post_status' => 'draft',
        ));
        add_settings_error('aveiro_moderation', 'rejected', __('Depoimento reprovado (salvo como rascunho, oculto do site).', 'aveiro-alojamentos'), 'warning');
    } elseif ($action === 'trash') {
        wp_trash_post($post_id);
        add_settings_error('aveiro_moderation', 'trashed', __('Depoimento movido para o lixo.', 'aveiro-alojamentos'), 'error');
    }
}
add_action('admin_init', 'aveiro_handle_moderation_actions');

// 3. Render da Página de Moderação
function aveiro_render_moderation_page() {
    $current_tab = isset($_GET['tab']) ? sanitize_text_field($_GET['tab']) : 'pending';

    $counts = wp_count_posts('depoimento');
    $pending_count = intval($counts->pending);
    $publish_count = intval($counts->publish);
    $draft_count   = intval($counts->draft);
    $trash_count   = intval($counts->trash);

    // Consulta de acordo com a aba
    $args = array(
        'post_type'      => 'depoimento',
        'posts_per_page' => 50,
        'post_status'    => ($current_tab === 'published') ? 'publish' : (($current_tab === 'rejected') ? array('draft', 'trash') : 'pending'),
    );
    $query = new WP_Query($args);
    ?>
    <div class="wrap">
        <h1 style="display:flex; align-items:center; gap: 8px; margin-bottom: 20px;">
            <span class="dashicons dashicons-testimonial" style="font-size: 32px; width: 32px; height: 32px;"></span>
            <?php _e('Painel de Moderação de Depoimentos dos Hóspedes', 'aveiro-alojamentos'); ?>
        </h1>

        <?php settings_errors('aveiro_moderation'); ?>

        <!-- Cards Informativos -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px;">
            <div style="background: #fff; padding: 16px; border-radius: 8px; border-left: 5px solid #dba617; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <div style="color: #666; font-size: 13px;"><?php _e('Pendentes de Aprovação', 'aveiro-alojamentos'); ?></div>
                <div style="font-size: 28px; font-weight: bold; color: #dba617; margin-top: 4px;"><?php echo $pending_count; ?></div>
                <div style="font-size: 11px; color: #999;"><?php _e('Enviados por visitantes pelo site', 'aveiro-alojamentos'); ?></div>
            </div>

            <div style="background: #fff; padding: 16px; border-radius: 8px; border-left: 5px solid #008a00; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <div style="color: #666; font-size: 13px;"><?php _e('Publicados no Site', 'aveiro-alojamentos'); ?></div>
                <div style="font-size: 28px; font-weight: bold; color: #008a00; margin-top: 4px;"><?php echo $publish_count; ?></div>
                <div style="font-size: 11px; color: #999;"><?php _e('Visíveis para todos os visitantes', 'aveiro-alojamentos'); ?></div>
            </div>

            <div style="background: #fff; padding: 16px; border-radius: 8px; border-left: 5px solid #d63638; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <div style="color: #666; font-size: 13px;"><?php _e('Reprovados / Ocultos', 'aveiro-alojamentos'); ?></div>
                <div style="font-size: 28px; font-weight: bold; color: #d63638; margin-top: 4px;"><?php echo $draft_count + $trash_count; ?></div>
                <div style="font-size: 11px; color: #999;"><?php _e('Rascunhos ou no lixo', 'aveiro-alojamentos'); ?></div>
            </div>
        </div>

        <!-- Abas -->
        <nav class="nav-tab-wrapper wp-clearfix" style="margin-bottom: 20px;">
            <a href="?post_type=depoimento&page=moderar-depoimentos&tab=pending" class="nav-tab <?php echo ($current_tab === 'pending') ? 'nav-tab-active' : ''; ?>">
                <?php printf(__('Pendentes de Avaliação (%d)', 'aveiro-alojamentos'), $pending_count); ?>
            </a>
            <a href="?post_type=depoimento&page=moderar-depoimentos&tab=published" class="nav-tab <?php echo ($current_tab === 'published') ? 'nav-tab-active' : ''; ?>">
                <?php printf(__('Aprovados e Publicados (%d)', 'aveiro-alojamentos'), $publish_count); ?>
            </a>
            <a href="?post_type=depoimento&page=moderar-depoimentos&tab=rejected" class="nav-tab <?php echo ($current_tab === 'rejected') ? 'nav-tab-active' : ''; ?>">
                <?php printf(__('Reprovados / Ocultos (%d)', 'aveiro-alojamentos'), $draft_count + $trash_count); ?>
            </a>
        </nav>

        <!-- Lista de Depoimentos -->
        <?php if ($query->have_posts()): ?>
            <div style="display: flex; flex-direction: column; gap: 16px;">
                <?php while ($query->have_posts()): $query->the_post();
                    $post_id      = get_the_ID();
                    $rating       = intval(get_post_meta($post_id, '_review_rating', true)) ?: 5;
                    $origin       = get_post_meta($post_id, '_review_origin', true);
                    $apartment_id = get_post_meta($post_id, '_review_apartment_id', true);
                    $stay_date    = get_post_meta($post_id, '_review_stay_date', true);
                    $author_name  = get_the_title();
                    $content      = get_the_content();

                    $approve_url = wp_nonce_url(admin_url('edit.php?post_type=depoimento&page=moderar-depoimentos&tab=' . $current_tab . '&action=approve&post_id=' . $post_id), 'aveiro_moderate_' . $post_id);
                    $reject_url  = wp_nonce_url(admin_url('edit.php?post_type=depoimento&page=moderar-depoimentos&tab=' . $current_tab . '&action=reject&post_id=' . $post_id), 'aveiro_moderate_' . $post_id);
                    $trash_url   = wp_nonce_url(admin_url('edit.php?post_type=depoimento&page=moderar-depoimentos&tab=' . $current_tab . '&action=trash&post_id=' . $post_id), 'aveiro_moderate_' . $post_id);
                    ?>
                    <div style="background: #fff; border: 1px solid #ccd0d4; border-radius: 8px; padding: 20px; box-shadow: 0 1px 4px rgba(0,0,0,0.03);">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 12px; border-bottom: 1px solid #f0f0f1; padding-bottom: 12px;">
                            <div>
                                <h3 style="margin: 0 0 4px; font-size: 16px; color: #1d2327;">
                                    <?php echo esc_html($author_name); ?>
                                    <?php if ($origin): ?>
                                        <span style="font-size: 13px; font-weight: normal; color: #646970;">(<?php echo esc_html($origin); ?>)</span>
                                    <?php endif; ?>
                                </h3>
                                <div style="display: flex; align-items: center; gap: 10px; font-size: 12px; color: #646970;">
                                    <!-- Estrelas -->
                                    <span style="color: #f59e0b; font-size: 15px; letter-spacing: 2px;">
                                        <?php echo str_repeat('★', $rating) . str_repeat('☆', 5 - $rating); ?>
                                    </span>
                                    <span>•</span>
                                    <!-- Alojamento -->
                                    <span style="background: #eef3fc; color: #1d4ed8; padding: 2px 8px; border-radius: 4px; font-weight: 500;">
                                        <?php
                                        if ($apartment_id === 'aveiro-sunset') {
                                            echo 'Aveiro Sunset';
                                        } elseif ($apartment_id === 'aveiro-white-105') {
                                            echo 'Aveiro White 105';
                                        } else {
                                            echo 'Geral';
                                        }
                                        ?>
                                    </span>
                                    <?php if ($stay_date): ?>
                                        <span>•</span>
                                        <span><?php echo esc_html($stay_date); ?></span>
                                    <?php endif; ?>
                                    <span>•</span>
                                    <span><?php echo get_the_date('d/m/Y \à\s H:i'); ?></span>
                                </div>
                            </div>

                            <!-- Botões de Ação de Moderação -->
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <?php if ($current_tab === 'pending' || $current_tab === 'rejected'): ?>
                                    <a href="<?php echo esc_url($approve_url); ?>" class="button button-primary" style="background: #008a00; border-color: #007000; color: #fff; font-weight: 600;">
                                        <span class="dashicons dashicons-yes" style="vertical-align: middle;"></span>
                                        <?php _e('Aprovar e Publicar', 'aveiro-alojamentos'); ?>
                                    </a>
                                <?php endif; ?>

                                <?php if ($current_tab === 'pending' || $current_tab === 'published'): ?>
                                    <a href="<?php echo esc_url($reject_url); ?>" class="button" style="color: #d63638; border-color: #d63638;">
                                        <span class="dashicons dashicons-no" style="vertical-align: middle;"></span>
                                        <?php _e('Reprovar / Despublicar', 'aveiro-alojamentos'); ?>
                                    </a>
                                <?php endif; ?>

                                <a href="<?php echo esc_url($trash_url); ?>" class="button" onclick="return confirm('<?php _e('Tem certeza que deseja enviar para o lixo?', 'aveiro-alojamentos'); ?>');" style="color: #999;">
                                    <span class="dashicons dashicons-trash" style="vertical-align: middle;"></span>
                                </a>

                                <a href="<?php echo get_edit_post_link($post_id); ?>" class="button" title="<?php _e('Editar texto', 'aveiro-alojamentos'); ?>">
                                    <span class="dashicons dashicons-edit" style="vertical-align: middle;"></span>
                                </a>
                            </div>
                        </div>

                        <!-- Texto do Depoimento -->
                        <div style="font-size: 14px; line-height: 1.6; color: #2c3338; font-style: italic; background: #fafafa; padding: 12px 16px; border-radius: 6px; border-left: 3px solid #c5a880;">
                            "<?php echo nl2br(esc_html($content)); ?>"
                        </div>
                    </div>
                <?php endwhile; wp_reset_postdata(); ?>
            </div>
        <?php else: ?>
            <div style="background: #fff; padding: 32px; border-radius: 8px; text-align: center; border: 1px dashed #ccd0d4;">
                <p style="font-size: 16px; color: #646970; margin-bottom: 8px;">
                    <?php
                    if ($current_tab === 'pending') {
                        _e('Nenhum depoimento aguardando aprovação no momento.', 'aveiro-alojamentos');
                    } elseif ($current_tab === 'published') {
                        _e('Nenhum depoimento publicado ainda.', 'aveiro-alojamentos');
                    } else {
                        _e('Nenhum depoimento reprovado.', 'aveiro-alojamentos');
                    }
                    ?>
                </p>
                <p style="font-size: 13px; color: #999;">
                    <?php _e('Quando os hóspedes enviarem avaliações pelo formulário do site, elas aparecerão aqui na aba "Pendentes" para aprovação prévia.', 'aveiro-alojamentos'); ?>
                </p>
            </div>
        <?php endif; ?>
    </div>
    <?php
}

// 4. Custom Columns na Listagem Padrão de Depoimentos
function aveiro_depoimento_columns($columns) {
    $new_columns = array();
    $new_columns['cb'] = $columns['cb'];
    $new_columns['title'] = __('Hóspede (Nome)', 'aveiro-alojamentos');
    $new_columns['status_badge'] = __('Status Moderação', 'aveiro-alojamentos');
    $new_columns['rating'] = __('Classificação', 'aveiro-alojamentos');
    $new_columns['apartment'] = __('Alojamento', 'aveiro-alojamentos');
    $new_columns['content_preview'] = __('Depoimento', 'aveiro-alojamentos');
    $new_columns['quick_actions'] = __('Ações Rápidas', 'aveiro-alojamentos');
    $new_columns['date'] = $columns['date'];
    return $new_columns;
}
add_filter('manage_depoimento_posts_columns', 'aveiro_depoimento_columns');

function aveiro_depoimento_custom_column($column, $post_id) {
    switch ($column) {
        case 'status_badge':
            $status = get_post_status($post_id);
            if ($status === 'publish') {
                echo '<span style="background: #008a00; color: #fff; padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: bold;">✓ Publicado</span>';
            } elseif ($status === 'pending') {
                echo '<span style="background: #dba617; color: #fff; padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: bold;">⏳ Pendente</span>';
            } else {
                echo '<span style="background: #d63638; color: #fff; padding: 3px 8px; border-radius: 12px; font-size: 11px; font-weight: bold;">✕ Oculto</span>';
            }
            break;
        case 'rating':
            $rating = intval(get_post_meta($post_id, '_review_rating', true)) ?: 5;
            echo '<span style="color: #f59e0b; font-size: 14px;">' . str_repeat('★', $rating) . str_repeat('☆', 5 - $rating) . '</span>';
            break;
        case 'apartment':
            $apt = get_post_meta($post_id, '_review_apartment_id', true);
            if ($apt === 'aveiro-sunset') {
                echo '<strong>Aveiro Sunset</strong>';
            } elseif ($apt === 'aveiro-white-105') {
                echo '<strong>Aveiro White 105</strong>';
            } else {
                echo 'Geral';
            }
            break;
        case 'content_preview':
            $content = get_post_field('post_content', $post_id);
            echo esc_html(wp_trim_words($content, 12, '...'));
            break;
        case 'quick_actions':
            $status = get_post_status($post_id);
            if ($status === 'pending' || $status === 'draft') {
                $approve_url = wp_nonce_url(admin_url('edit.php?post_type=depoimento&page=moderar-depoimentos&action=approve&post_id=' . $post_id), 'aveiro_moderate_' . $post_id);
                echo '<a href="' . esc_url($approve_url) . '" class="button button-small button-primary" style="background:#008a00; border-color:#007000;">Aprovar</a> ';
            }
            if ($status === 'publish') {
                $reject_url = wp_nonce_url(admin_url('edit.php?post_type=depoimento&page=moderar-depoimentos&action=reject&post_id=' . $post_id), 'aveiro_moderate_' . $post_id);
                echo '<a href="' . esc_url($reject_url) . '" class="button button-small" style="color:#d63638;">Reprovar</a>';
            }
            break;
    }
}
add_action('manage_depoimento_posts_custom_column', 'aveiro_depoimento_custom_column', 10, 2);
