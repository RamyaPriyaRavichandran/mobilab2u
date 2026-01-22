declare global {
  interface Window {
    Swiper: any
    AOS?: {
      init: (options?: any) => void
    }
    Splitting: any
  }
}

export async function loadScript(src: string) {
  return new Promise<void>((resolve) => {
    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = () => resolve()
    document.head.appendChild(script)
  })
}

export async function loadCSS(href: string) {
  return new Promise<void>((resolve) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    link.onload = () => resolve()
    document.head.appendChild(link)
  })
}

export async function initSwiper() {
  if (typeof window === 'undefined') return

  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css')
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js')

  // Home lab carousel
  new window.Swiper('.home-lab-carouselsec', {
    slidesPerView: 3.2,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: '.home-lab-carouselsec .swiper-pagination',
      clickable: true,
      dynamicBullets: true,
      renderBullet: (index: number, className: string) => `<span class="${className} bg-red-600"></span>`,
    },
    breakpoints: {
      0: { slidesPerView: 1.7, spaceBetween: 10 },
      769: { slidesPerView: 2.5, spaceBetween: 20 },
      900: { slidesPerView: 2, spaceBetween: 20 },
      1025: { slidesPerView: 2.7, spaceBetween: 15 },
      1400: { slidesPerView: 3.2, spaceBetween: 20 },
      1600: { slidesPerView: 4.2, spaceBetween: 20 },
    },
  })

  // Do More carousel
  new window.Swiper('.domore-carousel', {
    slidesPerView: 1.3,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: '.domore-carousel .swiper-pagination',
      clickable: true,
      dynamicBullets: true,
      renderBullet: (index: number, className: string) => `<span class="${className} bg-red-600"></span>`,
    },
    breakpoints: {
      0: { slidesPerView: 1, spaceBetween: 10 },
      700: { slidesPerView: 1.6, spaceBetween: 15 },
      1024: { slidesPerView: 1, spaceBetween: 30 },
      1280: { slidesPerView: 1.2, spaceBetween: 30 },
      1480: { slidesPerView: 2.2, spaceBetween: 30 },
    },
  })
}

export function initAOS() {
  if (typeof window === 'undefined') return

  const script = document.createElement('script')
  script.src = 'https://unpkg.com/aos@2.3.1/dist/aos.js'
  script.onload = () => {
    if (window.AOS) {
      window.AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
      })
    }
  }
  document.head.appendChild(script)

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://unpkg.com/aos@2.3.1/dist/aos.css'
  document.head.appendChild(link)
}

export function initSplitting() {
  if (typeof window === 'undefined') return

  const script = document.createElement('script')
  script.src = 'https://unpkg.com/splitting/dist/splitting.min.js'
  script.onload = () => {
    window.Splitting()
  }
  document.head.appendChild(script)

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://unpkg.com/splitting/dist/splitting.css'
  document.head.appendChild(link)
}

export function initSmoothScroll() {
  if (typeof window === 'undefined') return

  // Smooth scroll is handled natively by CSS
  document.documentElement.style.scrollBehavior = 'smooth'
}
