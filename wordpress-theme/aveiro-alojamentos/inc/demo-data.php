<?php
/**
 * Auto-Setup de Dados Iniciais dos Alojamentos e Depoimentos na Ativação do Tema
 *
 * @package AveiroAlojamentos
 */

if (!defined('ABSPATH')) {
    exit;
}

function aveiro_setup_demo_data_if_empty() {
    // Apenas executa se ainda não foi executado
    if (get_option('aveiro_theme_demo_data_initialized')) {
        return;
    }

    // Verificar se já existem alojamentos
    $existing = get_posts(array(
        'post_type'      => 'alojamento',
        'posts_per_page' => 1,
        'post_status'    => 'any',
    ));

    if (empty($existing)) {
        // 1. Criar Aveiro Sunset
        $sunset_id = wp_insert_post(array(
            'post_title'   => 'Aveiro Sunset',
            'post_name'    => 'aveiro-sunset',
            'post_content' => 'Um refúgio acolhedor com vista aberta sobre o canal de Aveiro. As janelas generosas deixam a cidade entrar, criando um ambiente luminoso e tranquilo que ganha um encanto especial ao pôr do sol. Localizado no pitoresco Bairro da Beira-Mar, fica a escassos metros de restaurantes típicos, passeios de moliceiro e das atrações mais emblemáticas.',
            'post_excerpt' => 'Um refúgio acolhedor com vista aberta sobre o canal de Aveiro. Ambiente luminoso e localização privilegiada no Bairro da Beira-Mar.',
            'post_status'  => 'publish',
            'post_type'    => 'alojamento',
        ));

        if ($sunset_id) {
            update_post_meta($sunset_id, '_alojamento_tagline', 'Vista sobre o canal, luz natural e a serenidade da ria');
            update_post_meta($sunset_id, '_alojamento_address', 'Rua de Abel Ribeiro, nº 49');
            update_post_meta($sunset_id, '_alojamento_postal_code', '3800-350');
            update_post_meta($sunset_id, '_alojamento_lat', '40.64333');
            update_post_meta($sunset_id, '_alojamento_lng', '-8.65644');
            update_post_meta($sunset_id, '_alojamento_booking_url', 'https://www.booking.com/hotel/pt/aveiro-sunset.pt-br.html');
            update_post_meta($sunset_id, '_alojamento_booking_score', '9.1');
            update_post_meta($sunset_id, '_alojamento_booking_reviews', '140');
            update_post_meta($sunset_id, '_alojamento_capacity', 'Até 2 hóspedes');
            update_post_meta($sunset_id, '_alojamento_bed_type', '1 Cama de Casal');
            update_post_meta($sunset_id, '_alojamento_bathroom_type', '1 Casa de banho privativa com duche');
            update_post_meta($sunset_id, '_alojamento_price_from', '65€');
            update_post_meta($sunset_id, '_alojamento_highlights', "Vista aberta para o canal da ria\nLocalização histórica no Bairro da Beira-Mar\nCozinha totalmente equipada para refeições ligeiras\nAmbiente acolhedor com luz natural");
            update_post_meta($sunset_id, '_alojamento_amenities', array('wifi', 'ac', 'kitchen', 'tv', 'view', 'hairdryer', 'coffee', 'central'));
        }

        // 2. Criar Aveiro White 105
        $white_id = wp_insert_post(array(
            'post_title'   => 'Aveiro White 105',
            'post_name'    => 'aveiro-white-105',
            'post_content' => 'Um apartamento moderno, confortável e com localização invejável na principal avenida da cidade. Perfeito para estadias a dois, viagens de lazer ou trabalho, combinando design contemporâneo com total tranquilidade.',
            'post_excerpt' => 'Apartamento moderno, acolhedor e situado na principal avenida da cidade de Aveiro, com nota de localização 9.9.',
            'post_status'  => 'publish',
            'post_type'    => 'alojamento',
        ));

        if ($white_id) {
            update_post_meta($white_id, '_alojamento_tagline', 'No coração da cidade, com todo o conforto e conveniência');
            update_post_meta($white_id, '_alojamento_address', 'Avenida Doutor Lourenço Peixinho, nº 50');
            update_post_meta($white_id, '_alojamento_postal_code', '3800-165');
            update_post_meta($white_id, '_alojamento_lat', '40.64241');
            update_post_meta($white_id, '_alojamento_lng', '-8.64932');
            update_post_meta($white_id, '_alojamento_booking_url', 'https://www.booking.com/hotel/pt/aveiro-white-105.pt-br.html');
            update_post_meta($white_id, '_alojamento_booking_score', '9.9');
            update_post_meta($white_id, '_alojamento_booking_reviews', '18');
            update_post_meta($white_id, '_alojamento_capacity', 'Até 2 hóspedes');
            update_post_meta($white_id, '_alojamento_bed_type', '1 Cama de Casal');
            update_post_meta($white_id, '_alojamento_bathroom_type', '1 Casa de banho privativa contemporânea');
            update_post_meta($white_id, '_alojamento_price_from', '75€');
            update_post_meta($white_id, '_alojamento_highlights', "Localização central imbatível (Nota 9.9 no Booking)\nA poucos passos da estação de comboios e do canal principal\nDecoração moderna, minimalista e relaxante\nIsolamento acústico de qualidade superior");
            update_post_meta($white_id, '_alojamento_amenities', array('wifi', 'ac', 'kitchen', 'tv', 'balcony', 'hairdryer', 'coffee', 'soundproof', 'central'));
        }

        // 3. Criar Depoimentos Aprovados Iniciais
        $reviews_data = array(
            array(
                'name'    => 'Beatriz Costa',
                'origin'  => 'Porto, Portugal',
                'apt'     => 'aveiro-sunset',
                'rating'  => 5,
                'date'    => 'Setembro 2026',
                'comment' => 'A vista para o canal ao fim da tarde é simplesmente mágica. O apartamento estava impecavelmente limpo, muito confortável e perto de tudo no Bairro da Beira-Mar. Recomendo vivamente!',
            ),
            array(
                'name'    => 'Marc & Sylvie',
                'origin'  => 'Lyon, França',
                'apt'     => 'aveiro-sunset',
                'rating'  => 5,
                'date'    => 'Agosto 2026',
                'comment' => 'Séjour inoubliable à Aveiro. L’appartement donne directement sur le canal, l’emplacement est idéal et le calme est parfait pour se reposer. Merci pour l’accueil chaleureux.',
            ),
            array(
                'name'    => 'Gonçalo Silva',
                'origin'  => 'Lisboa, Portugal',
                'apt'     => 'aveiro-white-105',
                'rating'  => 5,
                'date'    => 'Julho 2026',
                'comment' => 'Localização perfeita na avenida principal! Fizemos tudo a pé com grande facilidade. O apartamento é moderno, acolhedor e com uma cama fantástica. A nota 9.9 é mais do que merecida.',
            ),
            array(
                'name'    => 'Elena & David',
                'origin'  => 'Madrid, Espanha',
                'apt'     => 'aveiro-white-105',
                'rating'  => 5,
                'date'    => 'Junho 2026',
                'comment' => 'Apartamento precioso, moderno y súper céntrico. Cerca de cafeterías estupendas para probar los ovos moles y a pocos minutos de los moliceiros. Repetiremos seguro.',
            ),
        );

        foreach ($reviews_data as $rev) {
            $rev_id = wp_insert_post(array(
                'post_title'   => $rev['name'],
                'post_content' => $rev['comment'],
                'post_status'  => 'publish', // Publicados por padrão
                'post_type'    => 'depoimento',
            ));
            if ($rev_id) {
                update_post_meta($rev_id, '_review_origin', $rev['origin']);
                update_post_meta($rev_id, '_review_apartment_id', $rev['apt']);
                update_post_meta($rev_id, '_review_rating', $rev['rating']);
                update_post_meta($rev_id, '_review_stay_date', $rev['date']);
            }
        }
    }

    update_option('aveiro_theme_demo_data_initialized', true);
}
add_action('after_switch_theme', 'aveiro_setup_demo_data_if_empty');
add_action('admin_init', 'aveiro_setup_demo_data_if_empty');
