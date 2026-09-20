<?php
/**
 * 404 Not Found Template
 *
 * @package AveiroAlojamentos
 */

get_header(); ?>

<main class="site-main" style="padding: 160px 0 120px; text-align: center;">
    <div class="container" style="max-width: 600px;">
        <h1 style="font-size: 72px; color: #c5a880; font-family: var(--font-serif); margin-bottom: 16px;">404</h1>
        <h2 style="font-size: 28px; color: #fbf8f3; margin-bottom: 16px;">Página Não Encontrada</h2>
        <p style="color: #9b9588; margin-bottom: 32px;">A página que procura não existe ou foi movida.</p>
        <a href="<?php echo esc_url(home_url('/')); ?>" class="btn-primary">Voltar à Página Inicial</a>
    </div>
</main>

<?php get_footer(); ?>
