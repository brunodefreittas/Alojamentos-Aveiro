<?php
/**
 * Submissão Frontend de Avaliações / Depoimentos via AJAX
 *
 * @package AveiroAlojamentos
 */

if (!defined('ABSPATH')) {
    exit;
}

function aveiro_ajax_submit_review() {
    check_ajax_referer('aveiro_frontend_nonce', 'nonce');

    $author_name  = isset($_POST['author_name']) ? sanitize_text_field($_POST['author_name']) : '';
    $origin       = isset($_POST['origin']) ? sanitize_text_field($_POST['origin']) : '';
    $rating       = isset($_POST['rating']) ? intval($_POST['rating']) : 5;
    $apartment_id = isset($_POST['apartment_id']) ? sanitize_text_field($_POST['apartment_id']) : 'geral';
    $stay_date    = isset($_POST['stay_date']) ? sanitize_text_field($_POST['stay_date']) : '';
    $comment      = isset($_POST['comment']) ? sanitize_textarea_field($_POST['comment']) : '';

    if (empty($author_name) || empty($comment)) {
        wp_send_json_error(array(
            'message' => __('Por favor, preencha o seu nome e o seu depoimento.', 'aveiro-alojamentos')
        ));
    }

    if ($rating < 1 || $rating > 5) {
        $rating = 5;
    }

    // Criar o post como 'pending' (Pendente para moderação)
    $post_data = array(
        'post_title'   => $author_name,
        'post_content' => $comment,
        'post_status'  => 'pending', // Sempre pendente para aprovação do anfitrião!
        'post_type'    => 'depoimento',
    );

    $post_id = wp_insert_post($post_data);

    if (is_wp_error($post_id) || !$post_id) {
        wp_send_json_error(array(
            'message' => __('Ocorreu um erro ao salvar o seu depoimento. Por favor, tente novamente.', 'aveiro-alojamentos')
        ));
    }

    // Salvar os metadados
    update_post_meta($post_id, '_review_rating', $rating);
    update_post_meta($post_id, '_review_origin', $origin);
    update_post_meta($post_id, '_review_apartment_id', $apartment_id);
    update_post_meta($post_id, '_review_stay_date', $stay_date);

    wp_send_json_success(array(
        'message' => __('Muito obrigado pela sua partilha! O seu depoimento foi enviado com sucesso e será publicado após aprovação do anfitrião.', 'aveiro-alojamentos')
    ));
}
add_action('wp_ajax_nopriv_aveiro_submit_review', 'aveiro_ajax_submit_review');
add_action('wp_ajax_aveiro_submit_review', 'aveiro_ajax_submit_review');
