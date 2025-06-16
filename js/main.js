/* -------------------------------------------

Name: 		Ruizarch
Version:    1.0
Developer:	Nazar Miller (millerDigitalDesign)
Portfolio:  https://themeforest.net/user/millerdigitaldesign/portfolio?ref=MillerDigitalDesign

p.s. I am available for Freelance hire (UI design, web development). email: miller.themes@gmail.com

------------------------------------------- */

$(function () {

    "use strict";

    /***************************

    swup

    ***************************/
    const options = {
        containers: ['#swupMain', '#swupMenu'],
        animateHistoryBrowsing: true,
        linkSelector: 'a:not([data-no-swup])',
        animationSelector: '[class="jam-main-transition"]'
    };
    const swup = new Swup(options);

    /***************************

    register gsap plugins

    ***************************/
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    /***************************

    color variables

    ***************************/

    var accent = 'rgba(255, 152, 0, 1)';
    var dark = '#000';
    var light = '#fff';

    /***************************

    preloader
    
    ***************************/

    var timeline = gsap.timeline();

    timeline.to(".jam-preloader-animation", {
        opacity: 1,
    });

    timeline.fromTo(
        ".jam-animation-1 .jam-h3", {
        y: "30px",
        opacity: 0
    }, {
        y: "0px",
        opacity: 1,
        stagger: 0.4
    },
    );

    timeline.to(".jam-animation-1 .jam-h3", {
        opacity: 0,
        y: '-30',
    }, "+=.3");

    timeline.fromTo(".jam-reveal-box", 0.1, {
        opacity: 0,
    }, {
        opacity: 1,
        x: '-30',
    });

    timeline.to(".jam-reveal-box", 0.45, {
        width: "100%",
        x: 0,
    }, "+=.1");
    timeline.to(".jam-reveal-box", {
        right: "0"
    });
    timeline.to(".jam-reveal-box", 0.3, {
        width: "0%"
    });
    timeline.fromTo(".jam-animation-2 .jam-h3", {
        opacity: 0,
    }, {
        opacity: 1,
    }, "-=.5");
    timeline.to(".jam-animation-2 .jam-h3", 0.6, {
        opacity: 0,
        y: '-30'
    }, "+=.5");
    timeline.to(".jam-preloader", 0.8, {
        opacity: 0,
        ease: 'sine',
    }, "+=.2");
    timeline.fromTo(".jam-up", 0.8, {
        opacity: 0,
        y: 40,
        scale: .98,
        ease: 'sine',

    }, {
        y: 0,
        opacity: 1,
        scale: 1,
        onComplete: function () {
            $('.jam-preloader').addClass("jam-hidden");
        },
    }, "-=1");
    /***************************

    anchor scroll

    ***************************/
    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();

        var target = $($.attr(this, 'href'));
        var offset = 0;

        if ($(window).width() < 1200) {
            offset = 90;
        }

        $('html, body').animate({
            scrollTop: target.offset().top - offset
        }, 400);
    });
    /***************************

    append

    ***************************/
    $(document).ready(function () {
        $(".jam-arrow").clone().appendTo(".jam-arrow-place");
        $(".jam-dodecahedron").clone().appendTo(".jam-animation");
        $(".jam-lines").clone().appendTo(".jam-lines-place");
        $(".jam-main-menu ul li.jam-active > a").clone().appendTo(".jam-current-page");
    });
    /***************************

    accordion

    ***************************/

    let groups = gsap.utils.toArray(".jam-accordion-group");
    let menus = gsap.utils.toArray(".jam-accordion-menu");
    let menuToggles = groups.map(createAnimation);

    menus.forEach((menu) => {
        menu.addEventListener("click", () => toggleMenu(menu));
    });

    function toggleMenu(clickedMenu) {
        menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
    }

    function createAnimation(element) {
        let menu = element.querySelector(".jam-accordion-menu");
        let box = element.querySelector(".jam-accordion-content");
        let symbol = element.querySelector(".jam-symbol");
        let minusElement = element.querySelector(".jam-minus");
        let plusElement = element.querySelector(".jam-plus");

        gsap.set(box, {
            height: "auto",
        });

        let animation = gsap
            .timeline()
            .from(box, {
                height: 0,
                duration: 0.4,
                ease: "sine"
            })
            .from(minusElement, {
                duration: 0.4,
                autoAlpha: 0,
                ease: "none",
            }, 0)
            .to(plusElement, {
                duration: 0.4,
                autoAlpha: 0,
                ease: "none",
            }, 0)
            .to(symbol, {
                background: accent,
                ease: "none",
            }, 0)
            .reverse();

        return function (clickedMenu) {
            if (clickedMenu === menu) {
                animation.reversed(!animation.reversed());
            } else {
                animation.reverse();
            }
        };
    }
    /***************************

    back to top

    ***************************/
    const btt = document.querySelector(".jam-back-to-top .jam-link");

    gsap.set(btt, {
        x: -30,
        opacity: 0,
    });

    gsap.to(btt, {
        x: 0,
        opacity: 1,
        ease: 'sine',
        scrollTrigger: {
            trigger: "body",
            start: "top -40%",
            end: "top -40%",
            toggleActions: "play none reverse none"
        }
    });
    /***************************

    cursor

    ***************************/
    const cursor = document.querySelector('.jam-ball');

    gsap.set(cursor, {
        xPercent: -50,
        yPercent: -50,
    });

    document.addEventListener('pointermove', movecursor);

    function movecursor(e) {
        gsap.to(cursor, {
            duration: 0.6,
            ease: 'sine',
            x: e.clientX,
            y: e.clientY,
        });
    }

    $('.jam-drag, .jam-more, .jam-choose').mouseover(function () {
        gsap.to($(cursor), .2, {
            width: 90,
            height: 90,
            opacity: 1,
            ease: 'sine',
        });
    });

    $('.jam-drag, .jam-more, .jam-choose').mouseleave(function () {
        gsap.to($(cursor), .2, {
            width: 20,
            height: 20,
            opacity: .1,
            ease: 'sine',
        });
    });

    $('.jam-accent-cursor').mouseover(function () {
        gsap.to($(cursor), .2, {
            background: accent,
            ease: 'sine',
        });
        $(cursor).addClass('jam-accent');
    });

    $('.jam-accent-cursor').mouseleave(function () {
        gsap.to($(cursor), .2, {
            background: dark,
            ease: 'sine',
        });
        $(cursor).removeClass('jam-accent');
    });

    $('.jam-drag').mouseover(function () {
        gsap.to($('.jam-ball .jam-icon-1'), .2, {
            scale: '1',
            ease: 'sine',
        });
    });

    $('.jam-drag').mouseleave(function () {
        gsap.to($('.jam-ball .jam-icon-1'), .2, {
            scale: '0',
            ease: 'sine',
        });
    });

    $('.jam-more').mouseover(function () {
        gsap.to($('.jam-ball .jam-more-text'), .2, {
            scale: '1',
            ease: 'sine',
        });
    });

    $('.jam-more').mouseleave(function () {
        gsap.to($('.jam-ball .jam-more-text'), .2, {
            scale: '0',
            ease: 'sine',
        });
    });

    $('.jam-choose').mouseover(function () {
        gsap.to($('.jam-ball .jam-choose-text'), .2, {
            scale: '1',
            ease: 'sine',
        });
    });

    $('.jam-choose').mouseleave(function () {
        gsap.to($('.jam-ball .jam-choose-text'), .2, {
            scale: '0',
            ease: 'sine',
        });
    });

    $('a:not(".jam-choose , .jam-more , .jam-drag , .jam-accent-cursor"), input , textarea, .jam-accordion-menu').mouseover(function () {
        gsap.to($(cursor), .2, {
            scale: 0,
            ease: 'sine',
        });
        gsap.to($('.jam-ball svg'), .2, {
            scale: 0,
        });
    });

    $('a:not(".jam-choose , .jam-more , .jam-drag , .jam-accent-cursor"), input, textarea, .jam-accordion-menu').mouseleave(function () {
        gsap.to($(cursor), .2, {
            scale: 1,
            ease: 'sine',
        });

        gsap.to($('.jam-ball svg'), .2, {
            scale: 1,
        });
    });

    $('body').mousedown(function () {
        gsap.to($(cursor), .2, {
            scale: .1,
            ease: 'sine',
        });
    });
    $('body').mouseup(function () {
        gsap.to($(cursor), .2, {
            scale: 1,
            ease: 'sine',
        });
    });
    /***************************

     menu

    ***************************/
    $('.jam-menu-btn').on("click", function () {
        $('.jam-menu-btn').toggleClass('jam-active');
        $('.jam-menu').toggleClass('jam-active');
        $('.jam-menu-frame').toggleClass('jam-active');
    });
    /***************************

    main menu

    ***************************/
    $('.jam-has-children a').on('click', function () {
        $('.jam-has-children ul').removeClass('jam-active');
        $('.jam-has-children a').removeClass('jam-active');
        $(this).toggleClass('jam-active');
        $(this).next().toggleClass('jam-active');
    });
    /***************************

    progressbar

    ***************************/
    gsap.to('.jam-progress', {
        height: '100%',
        ease: 'sine',
        scrollTrigger: {
            scrub: 0.3
        }
    });
    /***************************

    scroll animations

    ***************************/

    const appearance = document.querySelectorAll(".jam-up");

    appearance.forEach((section) => {
        gsap.fromTo(section, {
            opacity: 0,
            y: 40,
            scale: .98,
            ease: 'sine',

        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: .4,
            scrollTrigger: {
                trigger: section,
                toggleActions: 'play none none reverse',
            }
        });
    });

    const scaleImage = document.querySelectorAll(".jam-scale");

    scaleImage.forEach((section) => {
        var value1 = $(section).data("value-1");
        var value2 = $(section).data("value-2");
        gsap.fromTo(section, {
            ease: 'sine',
            scale: value1,

        }, {
            scale: value2,
            scrollTrigger: {
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse',
            }
        });
    });

    const parallaxImage = document.querySelectorAll(".jam-parallax");


    if ($(window).width() > 960) {
        parallaxImage.forEach((section) => {
            var value1 = $(section).data("value-1");
            var value2 = $(section).data("value-2");
            gsap.fromTo(section, {
                ease: 'sine',
                y: value1,

            }, {
                y: value2,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });
    }

    const rotate = document.querySelectorAll(".jam-rotate");

    rotate.forEach((section) => {
        var value = $(section).data("value");
        gsap.fromTo(section, {
            ease: 'sine',
            rotate: 0,

        }, {
            rotate: value,
            scrollTrigger: {
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse',
            }
        });
    });
    /***************************

    fancybox

    ***************************/
    $('[data-fancybox="gallery"]').fancybox({
        buttons: [
            "slideShow",
            "zoom",
            "fullScreen",
            "close"
        ],
        loop: false,
        protect: true
    });
    $.fancybox.defaults.hash = false;
    /***************************

    reviews slider

    ***************************/

    var menu = ['<div class="jam-custom-dot jam-slide-1"></div>', '<div class="jam-custom-dot jam-slide-2"></div>', '<div class="jam-custom-dot jam-slide-3"></div>', '<div class="jam-custom-dot jam-slide-4"></div>', '<div class="jam-custom-dot jam-slide-5"></div>', '<div class="jam-custom-dot jam-slide-6"></div>', '<div class="jam-custom-dot jam-slide-7"></div>']
    var mySwiper = new Swiper('.jam-reviews-slider', {
        // If we need pagination
        pagination: {
            el: '.jam-revi-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (menu[index]) + '</span>';
            },
        },
        speed: 800,
        effect: 'fade',
        parallax: true,
        navigation: {
            nextEl: '.jam-revi-next',
            prevEl: '.jam-revi-prev',
        },
    })

    /***************************

    infinite slider

    ***************************/
    var swiper = new Swiper('.jam-infinite-show', {
        slidesPerView: 2,
        spaceBetween: 30,
        speed: 5000,
        autoplay: true,
        autoplay: {
            delay: 0,
        },
        loop: true,
        freeMode: true,
        breakpoints: {
            992: {
                slidesPerView: 4,
            },
        },
    });

    /***************************

    portfolio slider

    ***************************/
    var swiper = new Swiper('.jam-portfolio-slider', {
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 800,
        parallax: true,
        mousewheel: {
            enable: true
        },
        navigation: {
            nextEl: '.jam-portfolio-next',
            prevEl: '.jam-portfolio-prev',
        },
        pagination: {
            el: '.swiper-portfolio-pagination',
            type: 'fraction',
        },
    });
    /***************************

    1 item slider

    ***************************/
    var swiper = new Swiper('.jam-1-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 800,
        parallax: true,
        navigation: {
            nextEl: '.jam-portfolio-next',
            prevEl: '.jam-portfolio-prev',
        },
        pagination: {
            el: '.swiper-portfolio-pagination',
            type: 'fraction',
        },
    });
    /***************************

    2 item slider

    ***************************/
    var swiper = new Swiper('.jam-2-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 800,
        parallax: true,
        navigation: {
            nextEl: '.jam-portfolio-next',
            prevEl: '.jam-portfolio-prev',
        },
        pagination: {
            el: '.swiper-portfolio-pagination',
            type: 'fraction',
        },
        breakpoints: {
            992: {
                slidesPerView: 2,
            },
        },
    });

    /*----------------------------------------------------------
    ------------------------------------------------------------

    REINIT

    ------------------------------------------------------------
    ----------------------------------------------------------*/
    document.addEventListener("swup:contentReplaced", function () {

        $('html, body').animate({
            scrollTop: 0,
        }, 0);

        gsap.to('.jam-progress', {
            height: 0,
            ease: 'sine',
            onComplete: () => {
                ScrollTrigger.refresh()
            },
        });
        /***************************

         menu

        ***************************/
        $('.jam-menu-btn').removeClass('jam-active');
        $('.jam-menu').removeClass('jam-active');
        $('.jam-menu-frame').removeClass('jam-active');
        /***************************

        append

        ***************************/
        $(document).ready(function () {
            $(".jam-arrow-place .jam-arrow, .jam-animation .jam-dodecahedron, .jam-current-page a").remove();
            $(".jam-arrow").clone().appendTo(".jam-arrow-place");
            $(".jam-dodecahedron").clone().appendTo(".jam-animation");
            $(".jam-lines").clone().appendTo(".jam-lines-place");
            $(".jam-main-menu ul li.jam-active > a").clone().appendTo(".jam-current-page");
        });
        /***************************

        accordion

        ***************************/

        let groups = gsap.utils.toArray(".jam-accordion-group");
        let menus = gsap.utils.toArray(".jam-accordion-menu");
        let menuToggles = groups.map(createAnimation);

        menus.forEach((menu) => {
            menu.addEventListener("click", () => toggleMenu(menu));
        });

        function toggleMenu(clickedMenu) {
            menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
        }

        function createAnimation(element) {
            let menu = element.querySelector(".jam-accordion-menu");
            let box = element.querySelector(".jam-accordion-content");
            let symbol = element.querySelector(".jam-symbol");
            let minusElement = element.querySelector(".jam-minus");
            let plusElement = element.querySelector(".jam-plus");

            gsap.set(box, {
                height: "auto",
            });

            let animation = gsap
                .timeline()
                .from(box, {
                    height: 0,
                    duration: 0.4,
                    ease: "sine"
                })
                .from(minusElement, {
                    duration: 0.4,
                    autoAlpha: 0,
                    ease: "none",
                }, 0)
                .to(plusElement, {
                    duration: 0.4,
                    autoAlpha: 0,
                    ease: "none",
                }, 0)
                .to(symbol, {
                    background: accent,
                    ease: "none",
                }, 0)
                .reverse();

            return function (clickedMenu) {
                if (clickedMenu === menu) {
                    animation.reversed(!animation.reversed());
                } else {
                    animation.reverse();
                }
            };
        }

        /***************************

        cursor

        ***************************/

        $('.jam-drag, .jam-more, .jam-choose').mouseover(function () {
            gsap.to($(cursor), .2, {
                width: 90,
                height: 90,
                opacity: 1,
                ease: 'sine',
            });
        });

        $('.jam-drag, .jam-more, .jam-choose').mouseleave(function () {
            gsap.to($(cursor), .2, {
                width: 20,
                height: 20,
                opacity: .1,
                ease: 'sine',
            });
        });

        $('.jam-accent-cursor').mouseover(function () {
            gsap.to($(cursor), .2, {
                background: accent,
                ease: 'sine',
            });
            $(cursor).addClass('jam-accent');
        });

        $('.jam-accent-cursor').mouseleave(function () {
            gsap.to($(cursor), .2, {
                background: dark,
                ease: 'sine',
            });
            $(cursor).removeClass('jam-accent');
        });

        $('.jam-drag').mouseover(function () {
            gsap.to($('.jam-ball .jam-icon-1'), .2, {
                scale: '1',
                ease: 'sine',
            });
        });

        $('.jam-drag').mouseleave(function () {
            gsap.to($('.jam-ball .jam-icon-1'), .2, {
                scale: '0',
                ease: 'sine',
            });
        });

        $('.jam-more').mouseover(function () {
            gsap.to($('.jam-ball .jam-more-text'), .2, {
                scale: '1',
                ease: 'sine',
            });
        });

        $('.jam-more').mouseleave(function () {
            gsap.to($('.jam-ball .jam-more-text'), .2, {
                scale: '0',
                ease: 'sine',
            });
        });

        $('.jam-choose').mouseover(function () {
            gsap.to($('.jam-ball .jam-choose-text'), .2, {
                scale: '1',
                ease: 'sine',
            });
        });

        $('.jam-choose').mouseleave(function () {
            gsap.to($('.jam-ball .jam-choose-text'), .2, {
                scale: '0',
                ease: 'sine',
            });
        });

        $('a:not(".jam-choose , .jam-more , .jam-drag , .jam-accent-cursor"), input , textarea, .jam-accordion-menu').mouseover(function () {
            gsap.to($(cursor), .2, {
                scale: 0,
                ease: 'sine',
            });
            gsap.to($('.jam-ball svg'), .2, {
                scale: 0,
            });
        });

        $('a:not(".jam-choose , .jam-more , .jam-drag , .jam-accent-cursor"), input, textarea, .jam-accordion-menu').mouseleave(function () {
            gsap.to($(cursor), .2, {
                scale: 1,
                ease: 'sine',
            });

            gsap.to($('.jam-ball svg'), .2, {
                scale: 1,
            });
        });

        $('body').mousedown(function () {
            gsap.to($(cursor), .2, {
                scale: .1,
                ease: 'sine',
            });
        });
        $('body').mouseup(function () {
            gsap.to($(cursor), .2, {
                scale: 1,
                ease: 'sine',
            });
        });
        /***************************

        main menu

        ***************************/
        $('.jam-has-children a').on('click', function () {
            $('.jam-has-children ul').removeClass('jam-active');
            $('.jam-has-children a').removeClass('jam-active');
            $(this).toggleClass('jam-active');
            $(this).next().toggleClass('jam-active');
        });
        /***************************

        scroll animations

        ***************************/

        const appearance = document.querySelectorAll(".jam-up");

        appearance.forEach((section) => {
            gsap.fromTo(section, {
                opacity: 0,
                y: 40,
                scale: .98,
                ease: 'sine',

            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: .4,
                scrollTrigger: {
                    trigger: section,
                    toggleActions: 'play none none reverse',
                }
            });
        });

        const scaleImage = document.querySelectorAll(".jam-scale");

        scaleImage.forEach((section) => {
            var value1 = $(section).data("value-1");
            var value2 = $(section).data("value-2");
            gsap.fromTo(section, {
                ease: 'sine',
                scale: value1,

            }, {
                scale: value2,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });

        const parallaxImage = document.querySelectorAll(".jam-parallax");


        if ($(window).width() > 960) {
            parallaxImage.forEach((section) => {
                var value1 = $(section).data("value-1");
                var value2 = $(section).data("value-2");
                gsap.fromTo(section, {
                    ease: 'sine',
                    y: value1,

                }, {
                    y: value2,
                    scrollTrigger: {
                        trigger: section,
                        scrub: true,
                        toggleActions: 'play none none reverse',
                    }
                });
            });
        }

        const rotate = document.querySelectorAll(".jam-rotate");

        rotate.forEach((section) => {
            var value = $(section).data("value");
            gsap.fromTo(section, {
                ease: 'sine',
                rotate: 0,

            }, {
                rotate: value,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });
        /***************************

        fancybox

        ***************************/
        $('[data-fancybox="gallery"]').fancybox({
            buttons: [
                "slideShow",
                "zoom",
                "fullScreen",
                "close"
            ],
            loop: false,
            protect: true
        });
        $.fancybox.defaults.hash = false;
        /***************************

        reviews slider

        ***************************/

        var menu = ['<div class="jam-custom-dot jam-slide-1"></div>', '<div class="jam-custom-dot jam-slide-2"></div>', '<div class="jam-custom-dot jam-slide-3"></div>', '<div class="jam-custom-dot jam-slide-4"></div>', '<div class="jam-custom-dot jam-slide-5"></div>', '<div class="jam-custom-dot jam-slide-6"></div>', '<div class="jam-custom-dot jam-slide-7"></div>']
        var mySwiper = new Swiper('.jam-reviews-slider', {
            // If we need pagination
            pagination: {
                el: '.jam-revi-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + (menu[index]) + '</span>';
                },
            },
            speed: 800,
            effect: 'fade',
            parallax: true,
            navigation: {
                nextEl: '.jam-revi-next',
                prevEl: '.jam-revi-prev',
            },
        })

        /***************************

        infinite slider

        ***************************/
        var swiper = new Swiper('.jam-infinite-show', {
            slidesPerView: 2,
            spaceBetween: 30,
            speed: 5000,
            autoplay: true,
            autoplay: {
                delay: 0,
            },
            loop: true,
            freeMode: true,
            breakpoints: {
                992: {
                    slidesPerView: 4,
                },
            },
        });

        /***************************

        portfolio slider

        ***************************/
        var swiper = new Swiper('.jam-portfolio-slider', {
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 800,
            parallax: true,
            mousewheel: {
                enable: true
            },
            navigation: {
                nextEl: '.jam-portfolio-next',
                prevEl: '.jam-portfolio-prev',
            },
            pagination: {
                el: '.swiper-portfolio-pagination',
                type: 'fraction',
            },
        });
        /***************************

        1 item slider

        ***************************/
        var swiper = new Swiper('.jam-1-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 800,
            parallax: true,
            navigation: {
                nextEl: '.jam-portfolio-next',
                prevEl: '.jam-portfolio-prev',
            },
            pagination: {
                el: '.swiper-portfolio-pagination',
                type: 'fraction',
            },
        });
        /***************************

        2 item slider

        ***************************/
        var swiper = new Swiper('.jam-2-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 800,
            parallax: true,
            navigation: {
                nextEl: '.jam-portfolio-next',
                prevEl: '.jam-portfolio-prev',
            },
            pagination: {
                el: '.swiper-portfolio-pagination',
                type: 'fraction',
            },
            breakpoints: {
                992: {
                    slidesPerView: 2,
                },
            },
        });

    });

});
