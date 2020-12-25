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


// Parallax

// Home page > Title in sections
const $homeSectionImages = $('[data-home-section-parallax]')
if ($homeSectionImages.length !== 0) {
    $(window).on('scroll load', function (e) {
        $homeSectionImages.each(function (_, $element) {
            const downLine = window.pageYOffset + window.innerHeight - 250      // Screen bottom - 250px
            const topEl = $element.getBoundingClientRect().top + window.pageYOffset  // Global offset

            // If the parallax element is on the screen or above the screen
            if (topEl <= downLine) {
                const step = (downLine - topEl) * 0.1
                $($element).css('transform', `translateY(-${step}px)`)
            } else {
                $($element).css('transform', 'translateY(0)')
            }
        })
    })
}

// Services page > Page image
const $servicesPageImage = $('[data-services-parallax]')
if ($servicesPageImage.length !== 0) {
    $(window).on('scroll load', function (e) {
        const $el = $($servicesPageImage)[0]
        const step = window.pageYOffset * 0.12

        $($el).css('transform', `translateY(${step}px)`)
    })
}


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


// Service collection sliders
const collectionModals = $('.collection__modal')

function collectionModalsCheckAlign() {
    const $collectionModalShow = $('.collection__modal.show')
    const $wrapper = $collectionModalShow.find('.collection-modal__wrapper')
    const $inner = $collectionModalShow.find('.collection-modal__inner')

    if ($wrapper.height() < $inner.height()) {
        $($wrapper).addClass('collection-modal__wrapper_disable-align')
    } else {
        $($wrapper).removeClass('collection-modal__wrapper_disable-align')
    }
}

collectionModals.on('shown.bs.modal', function () {

    collectionModalsCheckAlign()
    window.addEventListener('resize', collectionModalsCheckAlign, false)

    if ( !$(this).hasClass('collection-modal_init') ) {
        const $slider = $(this).find('.collection-modal__slider').get(0)

        new Swiper($slider, {
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

        $(this).addClass('collection-modal_init')
    }
})

collectionModals.on('hide.bs.modal', function () {
    window.removeEventListener('resize', collectionModalsCheckAlign, false)
})



// Forms


$('form input, form textarea').on('focus', function () {
    $(this).removeClass('is-error')
})

function activateError(el, name) {
    $(`${el} [name="${name}"]`).addClass('is-error')
}

function checkInputRequired(el, name) {
    return $(`${el} [name="${name}"]`).attr('data-required')
}

function checkFormData(el, data) {
    let error = false
    for (let { name, value } of data) {
        if (value === '') {
            if (checkInputRequired(el, name) !== undefined) {
                error = true
                activateError(el, name)
            }
        }
    }

    return error
}

function normalizeFormData(data) {
    let obj = {}
    for (let { name, value } of data) {
        obj[name] = value
    }

    return obj
}


const $contactPageForm = $('#contacts-page-form')
if ($contactPageForm.length !== 0) {
    $contactPageForm.submit(function (e) {
        e.preventDefault()
        const data = $(this).serializeArray()

        if (!checkFormData('#contacts-page-form', data)) {
            const normData = normalizeFormData(data)

            $.ajax({
                url: 'callback.php',
                method: 'POST',
                dataType: 'JSON',
                data: {
                    site: normData.name,
                    email: normData.email,
                    message: normData.message,
                }
            })
              .done(function () {
                  console.log('Success Send')
              })
              .fail(function () {
                  const $errorText = $contactPageForm.find('.form-error-text')
                  $errorText.html('Has Error')
                  $errorText.addClass('is-active')

                  setTimeout(function () {
                      $errorText.removeClass('is-active')
                  }, 3000)
              })
        }
    })
}

