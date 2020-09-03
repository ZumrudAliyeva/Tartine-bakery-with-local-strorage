'use script'
$(function () {

    // HOME //
    /*== Home blogs carousel (Journal) ==*/
    $('.blog-slider').owlCarousel({
        loop: true,
        autoplay: false,
        margin: 30,
        nav: true,
        dots: false,
        responsiveClass: true,
        responsive: {
            1200: {
                items: 3,
                stagePadding: 30,
            },
            768: {
                items: 2,
                stagePadding: 15,
            },
            375: {
                items: 1,
                stagePadding: 15,
            },
        }
    })

    $('.list-collection').owlCarousel({
        loop: false,
        autoplay: false,
        nav: false,
        dots: false,
        responsiveClass: true,
        responsive: {
            1200: {
                items: 5,
            },
            768: {
                items: 5,
            },
            375: {
                items: 3,
            },
        }
    })

    $('.reason-list').owlCarousel({
        loop: true,
        autoplay: true,
        nav: false,
        dots: false,
        responsiveClass: true,
        responsive: {
            1200: {
                items: 3,
                loop: false,
                autoplay: false,
            },
            768: {
                items: 2,
                loop: true,
                autoplay: true,
            },
            375: {
                items: 1,
                loop: true,
                autoplay: true,
            },
        }
    })

    /*== About us Instagram carousel ==*/
    $('.instagram-galery').owlCarousel({
        loop:true,
        autoplay:false,
        nav: false,
        dots: false,
        responsiveClass:true,
        responsive:{
            1200:{
                items: 4,
                stagePadding: 0,
            },
            768:{
                items: 4,
                stagePadding: 0,
            },
            375:{
                items: 2,
                stagePadding: 0,
            },
        }
    })


})