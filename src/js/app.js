import '../sass/app.sass'


//  Header

const $header         = $('header')
const $headerMenuBtn  = $('#header-menu-btn')
const $menu           = $('.menu')


function scrollPage() {
    if (window.pageYOffset > 0) {
        $header.addClass('is-scroll')
    } else {
        $header.removeClass('is-scroll')
    }

    /*
    setTimeout(function () {
        if (window.innerWidth < 992) $menu.css('padding-top', $header.outerHeight(true))
    }, 300)
    */
}


function toggleHeaderMenu() {
    $headerMenuBtn.toggleClass('is-active')
    $header.toggleClass('is-menu-open')
    $menu.toggleClass('is-open')
    document.body.classList.toggle('menu-opened')
}

$($headerMenuBtn).on('click', toggleHeaderMenu)
$(window).on('resize scroll load', scrollPage)


// Sliders


// Home cases slider
const $homeCaseDescriptionBlock = $('#home-cases-slide-description')
if ($homeCaseDescriptionBlock.length !== 0) {
    const $homeCaseDescriptionName = $homeCaseDescriptionBlock.find('[data-name]')[0]
    const $homeCaseDescriptionDesc = $homeCaseDescriptionBlock.find('[data-description]')[0]
    const $homeCaseDescriptionLink = $homeCaseDescriptionBlock.find('[data-link]')[0]

    const sliderHomeCases = new Swiper('.home-cases__slider.swiper-container', {
        init: false,
        loop: false,
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
            el: '.slider__pagination',
            bulletClass: 'slider__bullet',
            bulletActiveClass: 'is-active',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            disabledClass: 'slider__arrow_disabled'
        },
    })

    sliderHomeCases.on('init slideChange', function (slider) {
        const slides = slider.slides
        const $current = slides[slider.activeIndex]

        const $dataName = $($current).attr('data-name')
        const $dataDesc = $($current).attr('data-description')
        const $dataLink = $($current).attr('data-link')

        $homeCaseDescriptionName.innerHTML = $dataName
        $homeCaseDescriptionDesc.innerHTML = $dataDesc
        $homeCaseDescriptionLink.href = $dataLink
    })

    sliderHomeCases.init()
}
