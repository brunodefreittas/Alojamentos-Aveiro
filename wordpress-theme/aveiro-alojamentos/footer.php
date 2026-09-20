<?php
/**
 * Footer Template
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
?>

<footer id="contacto" style="background: #06070a; border-top: 1px solid #1a1f2c; padding: 80px 0 40px;">
    <div class="container">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 40px; margin-bottom: 60px;">
            <!-- Coluna 1: Marca -->
            <div>
                <h3 style="font-size: 22px; color: #fbf8f3; margin-bottom: 8px;">Aveiro Alojamentos</h3>
                <p style="color: #c5a880; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 16px;">Sunset & White 105</p>
                <p style="color: #9b9588; font-size: 14px; line-height: 1.6; max-width: 320px;">
                    <?php _e('Dois refúgios cuidadosamente decorados no coração de Aveiro. Vista para a ria ou localização central privilegiada, com o melhor do acolhimento português.', 'aveiro-alojamentos'); ?>
                </p>
            </div>

            <!-- Coluna 2: Alojamentos -->
            <div>
                <h4 style="font-size: 16px; color: #fbf8f3; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.1em;"><?php _e('Alojamentos', 'aveiro-alojamentos'); ?></h4>
                <div style="display: flex; flex-direction: column; gap: 14px; font-size: 14px;">
                    <div>
                        <strong style="color: #fbf8f3; display: block;">Aveiro Sunset</strong>
                        <span style="color: #9b9588; font-size: 12px;">Rua de Abel Ribeiro, nº 49, Beira-Mar</span>
                    </div>
                    <div>
                        <strong style="color: #fbf8f3; display: block;">Aveiro White 105</strong>
                        <span style="color: #9b9588; font-size: 12px;">Av. Dr. Lourenço Peixinho, nº 50, Centro</span>
                    </div>
                </div>
            </div>

            <!-- Coluna 3: Contactos & Reservas -->
            <div>
                <h4 style="font-size: 16px; color: #fbf8f3; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.1em;"><?php _e('Contacto Direto', 'aveiro-alojamentos'); ?></h4>
                <p style="color: #9b9588; font-size: 14px; line-height: 1.8;">
                    Email: <a href="mailto:reservas@thinkddg.com" style="color: #c5a880;">reservas@thinkddg.com</a><br>
                    WhatsApp: <a href="https://wa.me/351912345678" style="color: #c5a880;">+351 912 345 678</a><br>
                    Aveiro, Portugal
                </p>
                <div style="margin-top: 16px;">
                    <button type="button" class="btn-outline open-review-btn" style="padding: 8px 16px; font-size: 12px;">
                        ⭐ <?php _e('Deixar Avaliação de Hóspede', 'aveiro-alojamentos'); ?>
                    </button>
                </div>
            </div>
        </div>

        <div style="border-top: 1px solid #141822; padding-top: 30px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; font-size: 12px; color: #646970;">
            <p>© <?php echo date('Y'); ?> Aveiro Alojamentos. <?php _e('Todos os direitos reservados.', 'aveiro-alojamentos'); ?></p>
            <p><?php _e('Alojamento Local em Aveiro, Portugal.', 'aveiro-alojamentos'); ?></p>
        </div>
    </div>
</footer>

<!-- Modal: Enviar Depoimento / Avaliação do Hóspede -->
<div id="review-modal" class="modal-overlay" aria-hidden="true" role="dialog">
    <div class="modal-content">
        <button type="button" class="modal-close close-modal-btn">&times;</button>
        <h3 style="font-size: 24px; color: #fbf8f3; margin-bottom: 8px;"><?php _e('Deixar Avaliação da Estadia', 'aveiro-alojamentos'); ?></h3>
        <p style="font-size: 14px; color: #9b9588; margin-bottom: 24px;">
            <?php _e('A sua opinião é muito valiosa para nós e para futuros viajantes. O seu depoimento será avaliado e publicado pelo anfitrião.', 'aveiro-alojamentos'); ?>
        </p>

        <form id="aveiro-review-form">
            <div class="form-group">
                <label class="form-label"><?php _e('Qual alojamento esteve hospedado?', 'aveiro-alojamentos'); ?></label>
                <select name="apartment_id" id="review_apartment_id" class="form-control">
                    <option value="aveiro-sunset">Aveiro Sunset (Rua de Abel Ribeiro)</option>
                    <option value="aveiro-white-105">Aveiro White 105 (Av. Dr. Lourenço Peixinho)</option>
                    <option value="geral"><?php _e('Experiência Geral em Aveiro', 'aveiro-alojamentos'); ?></option>
                </select>
            </div>

            <div class="form-group">
                <label class="form-label"><?php _e('A sua classificação:', 'aveiro-alojamentos'); ?></label>
                <input type="hidden" name="rating" id="form_rating" value="5">
                <div style="display: flex; gap: 8px; font-size: 26px; cursor: pointer;">
                    <span class="star-btn" data-value="1" style="color: #f59e0b;">★</span>
                    <span class="star-btn" data-value="2" style="color: #f59e0b;">★</span>
                    <span class="star-btn" data-value="3" style="color: #f59e0b;">★</span>
                    <span class="star-btn" data-value="4" style="color: #f59e0b;">★</span>
                    <span class="star-btn" data-value="5" style="color: #f59e0b;">★</span>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <div class="form-group">
                    <label class="form-label"><?php _e('O seu nome', 'aveiro-alojamentos'); ?> *</label>
                    <input type="text" id="form_name" class="form-control" required placeholder="Ex: Maria Santos">
                </div>
                <div class="form-group">
                    <label class="form-label"><?php _e('Cidade / País de Origem', 'aveiro-alojamentos'); ?></label>
                    <input type="text" id="form_origin" class="form-control" placeholder="Ex: Porto, Portugal">
                </div>
            </div>

            <div class="form-group">
                <label class="form-label"><?php _e('Mês e Ano da Estadia', 'aveiro-alojamentos'); ?></label>
                <input type="text" id="form_stay_date" class="form-control" placeholder="Ex: Setembro 2026">
            </div>

            <div class="form-group">
                <label class="form-label"><?php _e('O seu comentário / experiência', 'aveiro-alojamentos'); ?> *</label>
                <textarea id="form_comment" rows="4" class="form-control" required placeholder="<?php esc_attr_e('Conte-nos como foi a sua estadia, o que mais gostou e conselhos para outros viajantes...', 'aveiro-alojamentos'); ?>"></textarea>
            </div>

            <button type="submit" class="btn-primary" style="width: 100%; justify-content: center;">
                <?php _e('Submeter Avaliação para Aprovação', 'aveiro-alojamentos'); ?>
            </button>
        </form>

        <div id="review-form-feedback"></div>
    </div>
</div>

<!-- Modal: Lightbox de Fotos -->
<div id="lightbox-modal" class="lightbox-overlay" aria-hidden="true">
    <button type="button" class="lightbox-nav lightbox-prev" onclick="prevLightbox()">&#10094;</button>
    <img id="lightbox-img" class="lightbox-img" src="" alt="Foto Alojamento">
    <button type="button" class="lightbox-nav lightbox-next" onclick="nextLightbox()">&#10095;</button>
    <div id="lightbox-counter" style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.6); color: #fff; padding: 4px 12px; border-radius: 20px; font-size: 13px;"></div>
</div>

<?php wp_footer(); ?>
</body>
</html>
