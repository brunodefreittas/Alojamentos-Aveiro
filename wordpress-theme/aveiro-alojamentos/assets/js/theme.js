/**
 * Aveiro Alojamentos - Theme Scripts
 */

(function($) {
  'use strict';

  $(document).ready(function() {
    // 1. Header scroll state
    $(window).on('scroll', function() {
      if ($(window).scrollTop() > 40) {
        $('.site-header').addClass('scrolled');
      } else {
        $('.site-header').removeClass('scrolled');
      }
    });

    // 2. Dropdown behavior
    var dropdownTimer;
    $('.dropdown-wrapper').on('mouseenter', function() {
      clearTimeout(dropdownTimer);
      $(this).addClass('active');
    }).on('mouseleave', function() {
      var $this = $(this);
      dropdownTimer = setTimeout(function() {
        $this.removeClass('active');
      }, 250);
    });

    $('.dropdown-trigger').on('click', function(e) {
      e.preventDefault();
      $(this).closest('.dropdown-wrapper').toggleClass('active');
    });

    // Close dropdown when clicking outside
    $(document).on('click', function(e) {
      if (!$(e.target).closest('.dropdown-wrapper').length) {
        $('.dropdown-wrapper').removeClass('active');
      }
    });

    // 3. Modal de Submissão de Depoimentos
    window.openReviewModal = function(aptSlug) {
      $('#review-modal').addClass('active');
      $('body').css('overflow', 'hidden');
      if (aptSlug) {
        $('#review_apartment_id').val(aptSlug);
      }
    };

    window.closeReviewModal = function() {
      $('#review-modal').removeClass('active');
      $('body').css('overflow', '');
    };

    $('.open-review-btn').on('click', function(e) {
      e.preventDefault();
      var apt = $(this).data('apartment') || 'geral';
      window.openReviewModal(apt);
    });

    $('.close-modal-btn, #review-modal').on('click', function(e) {
      if (e.target === this || $(this).hasClass('close-modal-btn')) {
        window.closeReviewModal();
      }
    });

    // Star rating selector in form
    $('.star-btn').on('click', function(e) {
      e.preventDefault();
      var rating = parseInt($(this).data('value'));
      $('#form_rating').val(rating);
      $('.star-btn').each(function(idx) {
        if (idx < rating) {
          $(this).text('★').css('color', '#f59e0b');
        } else {
          $(this).text('☆').css('color', '#666');
        }
      });
    });

    // Envio do formulário via AJAX
    $('#aveiro-review-form').on('submit', function(e) {
      e.preventDefault();
      var $form = $(this);
      var $submitBtn = $form.find('button[type="submit"]');
      var $feedback = $('#review-form-feedback');

      $submitBtn.prop('disabled', true).text('A enviar...');
      $feedback.empty();

      var formData = {
        action: 'aveiro_submit_review',
        nonce: aveiroSettings.nonce,
        author_name: $('#form_name').val(),
        origin: $('#form_origin').val(),
        rating: $('#form_rating').val(),
        apartment_id: $('#review_apartment_id').val(),
        stay_date: $('#form_stay_date').val(),
        comment: $('#form_comment').val()
      };

      $.post(aveiroSettings.ajax_url, formData, function(response) {
        $submitBtn.prop('disabled', false).text('Submeter Avaliação');
        if (response.success) {
          $form.slideUp(200);
          $feedback.html(
            '<div style="background: rgba(0, 138, 0, 0.15); border: 1px solid #008a00; color: #a3e635; padding: 16px; border-radius: 12px; margin-top: 16px; text-align: center;">' +
            '<p style="font-weight: 600; font-size: 16px; margin-bottom: 6px;">✓ ' + response.data.message + '</p>' +
            '<button type="button" class="btn-outline" style="margin-top: 12px; font-size: 12px; padding: 6px 16px;" onclick="closeReviewModal()">Fechar</button>' +
            '</div>'
          );
        } else {
          $feedback.html(
            '<div style="background: rgba(220, 53, 69, 0.15); border: 1px solid #dc3545; color: #f87171; padding: 12px; border-radius: 10px; margin-top: 12px;">' +
            (response.data.message || 'Ocorreu um erro ao submeter o depoimento.') +
            '</div>'
          );
        }
      }).fail(function() {
        $submitBtn.prop('disabled', false).text('Submeter Avaliação');
        $feedback.html(
          '<div style="background: rgba(220, 53, 69, 0.15); border: 1px solid #dc3545; color: #f87171; padding: 12px; border-radius: 10px; margin-top: 12px;">' +
          'Erro de conexão com o servidor. Por favor, tente novamente.' +
          '</div>'
        );
      });
    });

    // 4. Lightbox de Fotos da Galeria
    var lightboxImages = [];
    var currentLightboxIndex = 0;

    window.openLightbox = function(index) {
      if (!lightboxImages.length) return;
      currentLightboxIndex = index;
      $('#lightbox-img').attr('src', lightboxImages[currentLightboxIndex].url);
      $('#lightbox-counter').text((currentLightboxIndex + 1) + ' / ' + lightboxImages.length);
      $('#lightbox-modal').addClass('active');
      $('body').css('overflow', 'hidden');
    };

    window.closeLightbox = function() {
      $('#lightbox-modal').removeClass('active');
      $('body').css('overflow', '');
    };

    window.nextLightbox = function() {
      if (currentLightboxIndex < lightboxImages.length - 1) {
        currentLightboxIndex++;
      } else {
        currentLightboxIndex = 0;
      }
      openLightbox(currentLightboxIndex);
    };

    window.prevLightbox = function() {
      if (currentLightboxIndex > 0) {
        currentLightboxIndex--;
      } else {
        currentLightboxIndex = lightboxImages.length - 1;
      }
      openLightbox(currentLightboxIndex);
    };

    // Coletar fotos para o lightbox
    $('.gallery-photo-trigger').each(function(idx) {
      lightboxImages.push({
        url: $(this).data('full'),
        title: $(this).data('title')
      });
      $(this).on('click', function(e) {
        e.preventDefault();
        openLightbox(idx);
      });
    });

    $('#lightbox-modal').on('click', function(e) {
      if (e.target === this) {
        closeLightbox();
      }
    });

    $(document).on('keydown', function(e) {
      if ($('#lightbox-modal').hasClass('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextLightbox();
        if (e.key === 'ArrowLeft') prevLightbox();
      }
      if ($('#review-modal').hasClass('active')) {
        if (e.key === 'Escape') closeReviewModal();
      }
    });

    // 5. Smooth scroll para âncoras
    $('a[href^="#"]').on('click', function(e) {
      var target = $(this.getAttribute('href'));
      if (target.length) {
        e.preventDefault();
        $('html, body').stop().animate({
          scrollTop: target.offset().top - 90
        }, 600);
      }
    });
  });
})(jQuery);
