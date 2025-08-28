$(function () {

    "use strict";

    //===== Prealoder

    //===== Swiper
    var menu = ['2017/2023', '2023', '2024'];
    var mySwiper = new Swiper('.roadmap-main', {
        // Optional parameters
        loop: true,
        pagination: {
            el: '.swiper-custom-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (menu[index]) + '</span>';
            },
        },
        navigation: {
            nextEl: '.roadmap-main-next',
            prevEl: '.roadmap-main-prev',
        }
    });
    var mySwiper = new Swiper('.roadmap-sec', {
        // Optional parameters
        slidesPerView: 4,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        breakpoints: {
            992: {
                slidesPerView: 2
            }
        }
    });

        // Single Features Active
        $('.future-roadmap').on('mouseover', '.roadmap-sec-slide', function() {
            $('.roadmap-sec-slide.active').removeClass('active');
            $(this).addClass('active');
        });
});