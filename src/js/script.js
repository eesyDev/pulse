$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: false,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/arrow-left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/arrow-right.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false,
                }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog_item__content').eq(i).toggleClass('catalog_item__content_active');
                $('.catalog_item__list').eq(i).toggleClass('catalog_item__list_active');
            })
        }); 
    };

    toggleSlide('.catalog_item__link');
    toggleSlide('.catalog_item__back');

    // ----  Modal

    // For open in promo
    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
    });

    // For close modal windows
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    // For open in tabs (2nd string) and change name item in modal (1st string)
    $('.button_tabs').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog_item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });

    // Validate form
    function validateForms(form){
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста, введите свое имя",
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                  required: "Пожалуйста, введите свой почтовый адрес",
                  email: "Ваш почтовый адрес должен быть в формате name@domain.com"
                }
            }
        });
    }

    validateForms('#consultation_form');
    validateForms('#consultation form');
    validateForms('#order form');

    // Mail address
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn();

            $('form').trigger('reset');
        });
        return false;
    });

    //Scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href=#promo]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
});