'use strict'
$(function () {

    /**********************************************************************************************************************************/
    let total = 0;

    if (localStorage.getItem("cart") === null) {
        localStorage.setItem("cart", JSON.stringify([]));
    }
    UpdateCart();
    GetProducts();
    // IncreaseCount();

    /****************************** add product to local storage *********************************************/
    const addToCart = $('.add-to-card');

    [...addToCart].forEach(pd => {
        pd.onclick = function (e) {
            e.preventDefault();
            const pdId = $(this).parents('div.product-item').attr('data-id');
            const pdName = $(this).parents('div.product-img').next().find('.product-name').text();
            var pdPrice = parseFloat($(this).parents('.product-img').next().find('.product-price').text().replace('$', ''));
            const pdImg = $(this).parents('div.product-img').find('img').attr('src');
            var pdCount = 1;
            const cart = JSON.parse(localStorage.getItem("cart"));
            const cartElement = cart.find(el => {
                return el.id === pdId;
            })

            if (cartElement === undefined) {
                cart.push({
                    id: pdId,
                    image: pdImg,
                    name: pdName,
                    price: pdPrice,
                    count: pdCount
                })
                /***** add product to cart list ***** */
                let cartBox = `
                <li class="d-flex">
                <div class="cart-pd-img"><a href="#" title="" class=""><img alt="" src="${pdImg}"></a></div>
            <div class="cart-pd-detail">
             <h3 class="cart-pd-name"><a href="#">${pdName}</a></h3>
                <div class="cart-pd-info">
                <div class="cart-pd-quantity">QTY : ${pdCount}</div>
                <div class="cart-pd-price"><span class="cart-pd-sale">$ ${pdPrice}</span></div>
            </div>
        </div>
        <div class="cart-pd-remove">
            <a href="#" class="remove-product close"><i class="fas fa-times"></i></a></div>
                </li>`

                $('ul.minicart_item').append(cartBox);
            } else {
                $('ul.minicart_item').empty();
                cartElement.count++;
                localStorage.setItem("cart", JSON.stringify(cart));
                GetProducts();
            }
            total += pdPrice;

            localStorage.setItem("cart", JSON.stringify(cart));
            UpdateCart();
            $('span.total-price').text(`$ ${total}`);
            $('span.shopping-count').text(cart.length);
            $('.cart-counter').text(cart.length);
        }
    })

    /***** remove product from local storage (checkout) *****/
    $(document).on('click', 'a.removePd', function (e) {
        const cart = JSON.parse(localStorage.getItem("cart"))
        e.preventDefault();
        let currentTr = $(this).parents('tr');
        const pdId = $(this).parents('tr').attr('data-id');
        var pdPrice = parseFloat($(this).parents('tr').find('span.amount').text().replace('$', ''));
        console.log(pdPrice);
        const currentPd = cart.find(el => {
            return el.id === pdId;
        })
        /****************************************************************************************** */
        const currentIndex = cart.indexOf(currentPd);
        if (currentIndex > -1) {
            cart.splice(currentIndex, 1);
            currentTr.remove();
            localStorage.setItem("cart", JSON.stringify(cart));
            $('tbody.shop_table_body').empty();
            $('ul.minicart_item').empty();
            $('span.total-price').empty();
            $('span.order-summary__emphasis').empty();
            total = 0;
            $('span.total-price').text(`$ ${total}`);
            $('span.order-summary__emphasis').text(`$ ${total}`);
            GetProducts();
            UpdateCart();
            /************************************************************************************** */
            console.log($('.shop_table_body tr').length);
        } else {
            alert('id is undefined');
            return false;
        }
    })
    /***** remove product from local storage (cart box) *****/
    $(document).on('click', 'a.remove-product', function (e) {
        const cart = JSON.parse(localStorage.getItem("cart"))
        e.preventDefault();
        let currentLi = $(this).parents('li');
        const pdId = $(this).parents('li').attr('data-id');
        const currentPd = cart.find(el => {
            return el.id === pdId;
        })
        /****************************************************************************************** */
        const currentIndex = cart.indexOf(currentPd);
        if (currentIndex > -1) {
            cart.splice(currentIndex, 1);
            currentLi.remove();
            localStorage.setItem("cart", JSON.stringify(cart));
            $('ul.minicart_item').empty();
            total = 0;
            $('span.total-price').text(`$ ${total}`);
            GetProducts();
            UpdateCart();
            /************************************************************************************** */
        } else {
            alert('id is undefined');
            return false;
        }
    })



    /* ========================= local storage - add to cart ================================ */
    /*********** cart box ************/
    $(document).on('click', '.basket', function () {
        $('.minicart_box').addClass("active");
        $('.bg-minicart_box').addClass("active");
        $('.searchIcon, .cartIcon').hide();
    })
    $(document).on('click', '.close-mini-cart, .bg-minicart_box', function () {
        $('.minicart_box').removeClass("active");
        $('.bg-minicart_box').removeClass("active");
        $('.searchIcon, .cartIcon').show();
    })

    function UpdateCart() {
        const cart = JSON.parse(localStorage.getItem("cart"));

        $('span.shopping-count').text(cart.length);
        $('.cart-counter').text(cart.length);
    }
    /*********** Get all products ************/
    function GetProducts() {
        const cart = JSON.parse(localStorage.getItem("cart"));

        cart.forEach(product => {
            let cartBox = `
            <li class="d-flex" data-id="${product.id}">
                <div class="cart-pd-img"><a href="#" title="" class=""><img alt="" src="${product.image}"></a></div>
                    <div class="cart-pd-detail">
                        <h3 class="cart-pd-name"><a href="#">${product.name}</a></h3>
                        <div class="cart-pd-info">
                        <div class="cart-pd-quantity">QTY : ${product.count}</div>
                        <div class="cart-pd-price"><span class="cart-pd-sale">$ ${product.price * product.count}</span></div>
                    </div>
                </div>
                <div class="cart-pd-remove">
                    <a href="#" class="remove-product close"><i class="fas fa-times"></i></a></div>
            </li>`
            total = total + (product.price * product.count);
            $('ul.minicart_item').append(cartBox);
            $('span.total-price').text(`$ ${total}`);
            /*********** add products to cart page ************/

            let checkoutBox = `
            <tr class="cart_item" data-id="${product.id}">
            <td class="product-thumbnail">
                    <a href="#"><img src="${product.image}" alt="Coconut truffle" class="w-100"></a>
                    </td>
                    <td class="product-name-thumb" data-title="Product">
                    <a href="#">${product.name}</a>
                    </td>
                    <td class="product-price"><span class="amount">$ ${product.price}</span></td>
                    <td class="product-quantity">
                    <div class="pd-quantity-box">
                    <button type="button" class="btn-minus2 outline-none" disabled><i class="fas fa-caret-down"></i></button>
                    <input type="text" class="pd-quantity" value="${product.count}" min="1">
                    <button type="button" class="btn-plus2" disabled><i class="fas fa-caret-up"></i></button>
                    </div>
                    </td>
                    <td class="product-subtotal"><span class="amount">$ ${product.price * product.count}</span></td>
                    <td class="product-remove"><a class="removePd" href="#"><i class="fas fa-times"></i></a></td>
                    </tr>
                    `

            $('tbody.shop_table_body').append(checkoutBox);
            $('td.cart-amount span.amount').text(`$ ${total}`);

            /*********** add products to ckeckout page ************/
            let checkSideBar = `
    <tr class="check_item mb-4">
        <td class="product-thumbnail-check">
            <a href="#"><img src="${product.image}" alt=""></a>
            <span class="product-thumbnail__quantity">${product.count}</span>
        </td>
        <td class="product-name-thumb-check">
            <a href="#">${product.name}</a>
        </td>
        <td class="product-price-check text-right">
            <span class="amount ">${product.price * product.count}</span>
        </td>
    </tr>
    `
            $('tbody.product-table-check-tbody').append(checkSideBar);
            $('span.order-summary__emphasis').text(`$ ${total}`);
            $('span.payment-due__price').text(`$ ${total + 20.32}`);
        });
        if (cart.length == 0) {
            $('.shop_table').css("display", "none");
            $('div.cart-update').css("display", "none");
            $('.emt-message').css("display", "block");
            $('span.amount').text('$ 0');
        }

    };


    /*******************************************************************************************************/
    $('a[href="#"]').click(function (event) {
        event.preventDefault();
    });

    // ================ navigtion bar =========================================//
    $(window).scroll(function () {
        let scroll = $(window).scrollTop();
        if (scroll > 200) {
            $("header").addClass("scrolled");
            $("header").removeClass("static");
        } else {
            $("header").addClass("static");
            $("header").removeClass("scrolled");
        }
    })

    $(document).on('mouseenter', '.static-nav .nav-link', function () {
        $('.static-nav .sub_menu').hide();
        $(this).next().show();
    })
    $(document).on('mouseleave', '.static-nav', function () {
        $('.static-nav .sub_menu').hide();
    })
    // ========= responsive navbar ============================================//
    $(document).on('click', '.menuleft', function () {
        $(this).hide();
        $('.box_contentmenu_background').addClass("active");
        $('.box_contentmenu').addClass("active");
    })

    $(document).on('click', '.close-menu-mobile, .box_contentmenu_background', function () {
        $('.box_contentmenu_background').removeClass("active");
        $('.box_contentmenu').removeClass("active");
        $('.menuleft').show();
    })

    $(document).on('click', '.tab_navar_login', function () {
        $(this).addClass('active');
        $('.tab-content-login').show();
        $('.tab-content-menu').hide();
        $('.tab_navar_menu').removeClass("active");
    })

    $(document).on('click', '.tab_navar_menu', function () {
        $(this).addClass('active');
        $('.tab-content-login').hide();
        $('.tab-content-menu').show();
        $('.tab_navar_login').removeClass("active");
    })

    $(document).on('click', '.open-sub', function () {
        $('.close-sub').hide();
        $('.closed').show();
        $(this).hide();
        $(this).next().show();
        $('.mobile-sub-menu').hide();
        $(this).parent().next().slideToggle();
    })
    $('.open-sub').show();
    $(document).on('click', '.close-sub', function () {
        $(this).parent().next().slideToggle();
        $('.close-sub').hide();
        $('.open-sub').show();
    })
    // ==================== login register box ============================================= //
    $(document).on('click', '.userIcon', function () {
        $('.bg-login-register-menu, .login-register-menu, .login-menu').addClass('active');
    })
    $(document).on('click', '.bg-login-register-menu', function () {
        $('.bg-login-register-menu, .login-register-menu, .login-menu, .register-menu').removeClass('active');
    })
    $(document).on('click', '.create_account', function () {
        $('.login-menu').removeClass('active');
        $('.register-menu').addClass('active');
    })
    $(document).on('click', '.back-to-login', function () {
        $('.register-menu').removeClass('active');
        $('.login-menu').addClass('active');
    })
    // ==================== search box ============================================= //
    $(document).on('click', '.searchIcon', function () {
        $('.search-box').slideToggle();
        $('.search-input').css('width', '70%');
        $('.search-form button').css('display', 'block');
    })
    $(document).on('click', '.close-search', function () {
        $('.search-form button').css('display', 'none');
        $('.search-input').css('width', '100%');
        $('.search-box').slideToggle();
    })
    // ==================== home slider ============================================= //
    let sliderCount = 0;
    let timer;

    function setTimer() {
        if (sliderCount == ($(".main-slider li").length - 1)) {
            sliderCount = 0;
        } else {
            sliderCount++;
        }
        $(".main-slider li.active").removeClass("active");
        $(".main-slider li").eq(sliderCount).addClass("active");
    };
    timer = setInterval(setTimer, 6000);
    setTimer();

    // ==================== home slider with arrows ================================== //
    $(document).on("click", "button.right", function () {
        if (sliderCount == ($('li.slide').length - 1)) {
            sliderCount = 0;
        } else {
            sliderCount++;
        }
        $("li.slide.active").removeClass("active");
        $("li.slide").eq(sliderCount).addClass("active");
    });
    $(document).on("click", "button.left", function () {
        if (sliderCount == 0) {
            sliderCount = $('li.slide').length - 1;
        } else {
            sliderCount--;
        }
        $("li.slide.active").removeClass("active");
        $("li.slide").eq(sliderCount).addClass("active");
    });

    $(document).on('mouseover', '#banner-section', function () {
        $('.mainSlide-btns').css('opacity', '1');
    });

    $(document).on('mouseleave', '#banner-section', function () {
        $('.mainSlide-btns').css('opacity', '0');
    });

    /*======================= filter content ========================================== */
    $(document).on('click', '.filter-button', function () {
        $('.filter-menu').addClass('active');
    });

    $(document).on('click', '.filter-button-close', function () {
        $('.filter-menu').removeClass('active');
    });

    $(document).on('click', '.list-collection li a', function () {
        $('.list-collection li a').removeClass('active');
        $(this).addClass('active');
    });

    $(document).on('click', '.list_color li a', function () {
        $('.list_color li a').removeClass('active');
        $(this).addClass('active');
    });

    $(document).on('click', '.list-size li a', function () {
        $('.list-size li a').removeClass('active');
        $(this).addClass('active');
    });

    $(document).on('click', '.list-filter li a', function () {
        $('.list-filter li a').removeClass('active');
        $(this).addClass('active');
    });

    /* ==== BUTTON TO TOP =============================================================== */
    let ScrolledAmount = 500;
    $(window).on("scroll", function () {
        if ($(window).scrollTop() > ScrolledAmount) {
            $('.back-to-top').addClass('visible');
        } else {
            $('.back-to-top').removeClass('visible');
        }
    });
    $(document).on('click', '.back-to-top', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
        return false;
    });

    /* ========================= product page ================================================ */
    $(document).on('click', '.tab-prod-a', function () {
        $('.tab-prod-a').removeClass('active');
        $('.tab-pane-inner').removeClass('active');
        $(this).addClass('active');
        let index = $('.tab-prod-a.active').attr('data-index');
        let currentTab = $(`.tab-pane-inner[data-index="${index}"]`);
        currentTab.addClass('active');
    });

    $(document).on('click', '.product-slider li', function () {
        let src = $(this).children('img').attr('src');
        $('.gutter-img').attr('src', src);
    })

    /*======================== contact form ============================================== */
    $(document).on('click', 'input.shop-button', function () {
        let userName = $('#contactFormName').val();
        let userEmail = $('#contactFormEmail').val();
        let userSubject = $('#contactFormSubject').val();
        let userMessage = $('#contactFormMessage').val();

        if (userName == '' || userEmail == '' || userSubject == '' || userMessage == '') {
            $('.response-output-succes').hide();
            $('.response-output-error').show();
        } else {
            $('.response-output-error').hide();
            $('.response-output-succes').show();
        }

        $('#contactFormName').val('');
        $('#contactFormEmail').val('');
        $('#contactFormSubject').val('');
        $('#contactFormMessage').val('');
    });

    /*===================================== cart and checkout ============================= */

    $(document).on('click', 'li.breadcrumb__item', function () {
        $('li.breadcrumb__item').removeClass('current');
        $(this).addClass('current');
        let index = $('li.breadcrumb__item.current').attr('data-index');
        let currentTab = $(`div.mainSection[data-index="${index}"]`);
        $('div.mainSection').removeClass('active');
        currentTab.addClass('active');
    });


    $(document).on('click', 'button.continue-btn-to-shipping', function () {

        let shippingName = $('#shipping-name').val();
        let shippingLastname = $('#shipping-lastname').val();
        let shippingMail = $('#shipping-email').val();
        let shippingAddress = $('#shipping-address').val();
        let shippingApartment = $('#shipping-apartment').val();
        let postalCode = $('#shipping-postal-code').val();
        let shippingCity = $('#shipping-city').val();
        let shippingCountry = $('#shipping-country').val();

        if (shippingName == '' || shippingLastname == '' || shippingMail == '' || shippingAddress == '' ||
            shippingApartment == '' || postalCode == '' || shippingCity == '' || shippingCountry == '') {
            $('.response-output-error').show();
        } else {
            $('.response-output-error').hide();
            $('div.mainSection').removeClass('active');
            $('div.mainSection.shippin-sect').addClass('active');
            $('span.contEmail').text(shippingMail);
            $('span.contAddress').text(shippingAddress);

        }

        $(document).on('click', '.continue-btn-to-payment', function () {
            $('div.mainSection').removeClass('active');
            $('div.mainSection.payment-sect').addClass('active');
            $('span.order-address').text(shippingAddress);
        })
    });

    $(document).on('click', 'a.haveAccount', function () {
        $('.bg-login-register-menu, .login-register-menu, .login-menu').addClass('active');
    })

});