;(function ($) {
  'use strict'

  $(document).ready(function () {
    const swiper = new Swiper('.mySwiper', {
      slidesPerView: 3.3,
      spaceBetween: 30,
      grabCursor: true,
      slidesPerGroup: 3,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return `<span class="${className} bg-red-600 w-10 h-2 rounded-xl"></span>`
        },
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 2.2,
          slidesPerGroup: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3.3,
          slidesPerGroup: 3,
          spaceBetween: 30,
        },
      },
    })
  })

  window.addEventListener('scroll', function () {
    const header = document.getElementById('main-header')
    const logo = document.getElementById('header-logo')

    const triggerHeight = window.innerHeight / 2

    if (window.scrollY > triggerHeight) {
      // Make header fixed
      header.classList.add('fixed', 'top-0', 'left-0', 'z-50', 'shadow-md', 'header-anim')

      // Shrink logo
      logo.classList.remove('w-[160px]', 'h-[80px]')
      logo.classList.add('w-[100px]', 'h-[60px]')
    } else {
      // Remove fixed state
      header.classList.remove('fixed', 'top-0', 'left-0', 'z-50', 'shadow-md', 'header-anim')

      // Reset logo
      logo.classList.remove('w-[100px]', 'h-[60px]')
      logo.classList.add('w-[160px]', 'h-[80px]')
    }
  })

  const swiper = new Swiper('.breadcrumbswiper', {
    slidesPerView: 5,
    spaceBetween: 0,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 4,
      renderBullet: function (index, className) {
        return `<span class="${className} bg-red-600"></span>`
      },
    },
    breakpoints: {
      0: {
        slidesPerView: 2.3,
        spaceBetween: 10,
      },
      769: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      850: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      1280: {
        slidesPerView: 5,
        spaceBetween: 50,
      },
    },
  })

  const homeSwiper = new Swiper('.home-lab-carouselsec', {
    slidesPerView: 3.2,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true, // only show 4 bullets at once
      renderBullet: function (index, className) {
        return `<span class="${className} bg-red-600"></span>`
      },
    },
    breakpoints: {
      0: {
        slidesPerView: 1.7,
        spaceBetween: 10,
      },
      769: {
        slidesPerView: 2.5,
        spaceBetween: 20,
      },
      900: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1025: {
        slidesPerView: 2.7,
        spaceBetween: 15,
      },
      1400: {
        slidesPerView: 3.2,
        spaceBetween: 20,
      },
      1600: {
        slidesPerView: 4.2,
        spaceBetween: 20,
      },
    },
  })

  const domoreSwiper = new Swiper('.domore-carousel', {
    slidesPerView: 1.3,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true, // only show 4 bullets at once
      renderBullet: function (index, className) {
        return `<span class="${className} bg-red-600"></span>`
      },
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      700: {
        slidesPerView: 1.6,
        spaceBetween: 15,
      },
      1024: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      1280: {
        slidesPerView: 1.2,
        spaceBetween: 30,
      },
      1480: {
        slidesPerView: 2.2,
        spaceBetween: 30,
      },
    },
  })

  window.addEventListener('scroll', function () {
    const floatingImage = document.getElementById('floatingImage')
    const section = document.querySelector('.intro-bg')
    const sectionTop = section.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    // Only animate when section is in viewport
    if (sectionTop < windowHeight && sectionTop > -section.offsetHeight) {
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / windowHeight))
      const movement = scrollProgress * 50 // Reduced movement for subtle effect

      floatingImage.style.transform = `translateY(${movement}px)`
    }
  })
})(jQuery)

AOS.init({
  duration: 1000, // Animation duration in milliseconds

  easing: 'ease-in-out', // Easing type
})

// Split text (ensure Splitting.js is loaded before this)
Splitting() // Splitting the text into words, characters, or lines

const tabButtons = document.querySelectorAll('.tab-btn')
const tabContents = document.querySelectorAll('.tab-content')

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Reset button styles
    tabButtons.forEach((b) => {
      b.classList.remove('bg-red-600', 'text-white')
      b.classList.add('text-black')
    })
    // Highlight active button
    btn.classList.add('bg-red-600', 'text-white')
    btn.classList.remove('text-black')

    const tab = btn.getAttribute('data-tab')
    // Show matching tab content
    tabContents.forEach((content) => {
      if (content.getAttribute('data-tab') === tab) {
        content.classList.remove('hidden')
      } else {
        content.classList.add('hidden')
      }
    })
  })
})
