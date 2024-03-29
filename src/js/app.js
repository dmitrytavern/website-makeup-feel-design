import '../sass/app.sass'

$(document).ready(function () {
    document.body.classList.add('is-loaded')
    $('.menu').addClass('is-loaded')
})

//  Header

const $header           = $('header')
const $headerMenuBtn    = $('.header-menu-btn')
const $menu             = $('.menu')

const $btnChatContainer = $('#chat-container')
const $btnChat          = $('#chat')
const $anchor           = $('.footer__contact')
const $anchorMobile     = $('.footer__info-copyright')

function scrollPage() {
    if (window.pageYOffset > 0) {
        $header.addClass('is-scroll')
    } else {
        $header.removeClass('is-scroll')
    }


    // Chat

    if ($anchor.length !== 0) {
        if (window.innerWidth >= 768) {
            const footerTop = $anchor.offset().top
            const btnChatHeight = $btnChat.height()

            $anchor.css('padding-right', $btnChat.outerWidth() + 60)

            if (footerTop <= window.pageYOffset + window.innerHeight - (btnChatHeight / 2) - 18) {
                const number = footerTop + btnChatHeight

                $btnChatContainer.css({top: number + 'px'})
                $btnChatContainer.addClass('is-absolute')
                $btnChat.addClass('is-fixed')
            } else {
                $btnChatContainer.css({top: 'unset'})
                $btnChatContainer.removeClass('is-absolute')
                $btnChat.removeClass('is-fixed')
            }
        } else {
            const anchorMobileTop = $anchorMobile.offset().top
            const anchorMobileHeight = $anchorMobile.outerHeight() // 36px
            const btnChatHeight = $btnChat.outerHeight() // 50px

            $anchor.css('padding-right', 0)

            if (anchorMobileTop <= window.pageYOffset + window.innerHeight - btnChatHeight + ((btnChatHeight - anchorMobileHeight) / 2)) {
                const number = anchorMobileTop + btnChatHeight - ((btnChatHeight - anchorMobileHeight) / 2)

                $btnChatContainer.css({top: number + 'px'})
                $btnChatContainer.addClass('is-absolute')
                $btnChat.addClass('is-fixed')
            } else {
                $btnChatContainer.css({top: 'unset'})
                $btnChatContainer.removeClass('is-absolute')
                $btnChat.removeClass('is-fixed')
            }
        }
    }
}


function toggleHeaderMenu() {
    $headerMenuBtn.toggleClass('is-active')
    $header.toggleClass('is-menu-open')
    $menu.toggleClass('is-open')
    document.body.classList.toggle('menu-opened')
}

function closeHeaderMenu() {
    $headerMenuBtn.removeClass('is-active')
    $header.removeClass('is-menu-open')
    $menu.removeClass('is-open')
    document.body.classList.remove('menu-opened')
}

$(window).on('click', function (e) {
    const $target = e.target
    const click = $('.menu')[0].contains($target)
    const containsClass = $target.classList.contains('header-menu-btn')
    let containsSpan = false
    if ($target.offsetParent && $target.offsetParent.classList) {
        containsSpan = $target.offsetParent.classList.contains('header-menu-btn')
    }

    if (!(click || containsClass || containsSpan)) {
        closeHeaderMenu()
    }
})

$($headerMenuBtn).on('click', toggleHeaderMenu)
$(window).on('resize scroll load', scrollPage)



// Modals

$('.modal').on('show.bs.modal', function () {
    document.body.classList.add('modal-open-main')
    $('.modal-custom-backdrop').addClass('is-open')
})

$('.modal').on('hide.bs.modal', function () {
    document.body.classList.remove('modal-open-main')
    $('.modal-custom-backdrop').removeClass('is-open')
})

$('.modal-custom-backdrop').on('click', function () {
    $('.modal').modal('hide')
})



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
const $homeCaseSlider = $('.home-cases__slider.swiper-container')

if ($homeCaseSlider.length !== 0) {
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
        const $homeCaseDescriptionBlock = $('#home-cases-slide-description')

        if ($homeCaseDescriptionBlock.length !== 0) {
            const $nameBlock = $homeCaseDescriptionBlock.find('[data-name]')
            const $descBlock = $homeCaseDescriptionBlock.find('[data-description]')
            const $linkBlock = $homeCaseDescriptionBlock.find('[data-link]')

            const slides = slider.slides
            const $current = slides[slider.activeIndex]

            const $dataName = $($current).attr('data-name')
            const $dataDesc = $($current).attr('data-description')
            const $dataLink = $($current).attr('data-link')

            $nameBlock.html($dataName)
            $descBlock.html($dataDesc)
            $linkBlock.attr('href', $dataLink)
        }
    })

    sliderHomeCases.init()
}

// Case inner slider
const $caseSlider = $('.swiper-container.case-detail-slider__slider')
if ($caseSlider.length !== 0) {
    new Swiper('.case-detail-slider__slider.swiper-container', {
        loop: false,
        slidesPerView: 1.3,
        spaceBetween: 20,
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
        breakpoints: {
            1023: {
                slidesPerView: 1,
                spaceBetween: 0,
            }
        }
    })
}


// Case inner page
const $caseColorBoxes = $('.case-coloristics__color-box')
if ($caseColorBoxes.length !== 0) {
    $(window).on('resize load', function () {
        $caseColorBoxes.height(
          $caseColorBoxes.width() + 'px'
        )
    })
}



// Forms

const $contactsPageTextarea = $('textarea.input-block__input')
if ($contactsPageTextarea.length !== 0) {
    autosize($contactsPageTextarea)
}

$('form input, form textarea').on('focus', function () {
    $(this).removeClass('is-error')
})

function activateError(el, name) {
    $(`${el} [name="${name}"]`).addClass('is-error')
}

function checkInputRequired(el, name) {
    return $(`${el} [name="${name}"]`).attr('data-required')
}

function changeModalTab($el, tabName) {
    $el.find('.modal__tab').removeClass('is-active')
    $el.find(`.modal__tab[data-name="${tabName}"]`).addClass('is-active')
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


// Form in order modal
const $modalOrder = $('#modal-order')
const $modalOrderForm = $('#modal-order-form')

if ($modalOrderForm.length !== 0) {
    $modalOrderForm.submit(function (e) {
        e.preventDefault()
        const data = $(this).serializeArray()

        if (!checkFormData('#modal-order', data)) {
            const normData = normalizeFormData(data)

            // REMOVE IN PRODUCTION VERSION
            changeModalTab($modalOrder, 'success')
            // END REMOVE

            $.ajax({
                url: 'callback.php',
                method: 'POST',
                dataType: 'JSON',
                data: {
                    name: normData.name,
                    email: normData.email,
                    collection: normData.collection
                }
            })
              .done(function () {
                  changeModalTab($modalOrder, 'success')
              })
              .fail(function () {
                  const $errorText = $modalOrderForm.find('.form-error-text')
                  $errorText[0].innerHTML = 'Has Error'
                  $errorText.addClass('is-active')

                  setTimeout(function () {
                      $modalOrderForm.find('.form-error-text').removeClass('is-active')
                  }, 3000)
              })
        }
    })
}


// View collection
const $collectionBlock = $('.collections')
const $collectionList = $('.collections__list')

if ($collectionBlock.length !== 0) {
    // If need to load new image, run recalculate function
    const collectionInterface = Macy({
        container: '.collections__list',
        margin: 19,
        columns: 3,
        breakAt: {
            1025: {
                margin: 13,
                columns: 2
            }
        }
    })

    $(window).on("resize", function () {
        collectionInterface.recalculate(true, true)
    })
}


// Service collection
const $collectionModals = $('.collection__modal')
const $collectionModalOrder = $('#modal-order-collection')
const $collectionModalOrderForm = $('#modal-order-collection-form')

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

$collectionModals.on('shown.bs.modal', function () {
    document.body.classList.add('collection-modal-open')

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

$collectionModals.on('hide.bs.modal', function () {
    document.body.classList.remove('collection-modal-open')
    window.removeEventListener('resize', collectionModalsCheckAlign, false)
})

$collectionModalOrder.on('shown.bs.modal', function () {
    const $collectionModalShow = $('.collection__modal.show')
    const collectionSend = $collectionModalShow.attr('data-send')

    if (collectionSend === 'false') {
        // Set form tab in modal
        changeModalTab($collectionModalOrder, 'form')

        const $collectionFormInputs = $collectionModalOrder.find('input')
        const $collectionFormCollectionInput = $collectionModalOrder.find('input[name="collection"]')
        const collectionId = $collectionModalShow.attr('data-id-collection')

        $collectionFormInputs.val('')
        $collectionFormCollectionInput.val(collectionId)
    } else {
        // Set success tab in modal
        changeModalTab($collectionModalOrder, 'success')
    }
})

if ($collectionModalOrderForm.length !== 0) {
    $collectionModalOrderForm.submit(function (e) {
        e.preventDefault()
        const data = $(this).serializeArray()

        if (!checkFormData('#modal-order-collection', data)) {
            const normData = normalizeFormData(data)

            // REMOVE FROM PRODUCTION VERSION!

            const $collectionModalShow = $('.collection__modal.show')
            $collectionModalShow.attr('data-send', 'true')
            changeModalTab($collectionModalOrder, 'success')

            // END REMOVE

            $.ajax({
                url: 'callback.php',
                method: 'POST',
                dataType: 'JSON',
                data: {
                    name: normData.name,
                    email: normData.email,
                    collection: normData.collection
                }
            })
              .done(function () {
                  const $collectionModalShow = $('.collection__modal.show')
                  $collectionModalShow.attr('data-send', 'true')

                  changeModalTab($collectionModalOrder, 'success')
              })
              .fail(function () {
                  const $errorText = $collectionModalOrderForm.find('.form-error-text')
                  $errorText[0].innerHTML = 'Has Error'
                  $errorText.addClass('is-active')

                  setTimeout(function () {
                      $collectionModalOrderForm.find('.form-error-text').removeClass('is-active')
                  }, 3000)
              })
        }
    })
}