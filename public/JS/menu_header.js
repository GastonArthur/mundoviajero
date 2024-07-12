export default function submenuHeader(ctaSubmenu, submenu) {

    document.addEventListener('click', e => {
        if (e.target.matches(ctaSubmenu)) {
            e.preventDefault()
            document.querySelector(submenu).classList.toggle('view-submenu');
        } else {
            document.querySelector(submenu).classList.remove('view-submenu');
        }

    })
}

export function scrollHeader() {

    const $header = document.querySelector('header');
    const $subMenu = document.querySelector('.sub-menu');

    window.addEventListener('scroll', e => {
        if (window.scrollY > 0) {
            $header.classList.add('scroll-header');
        } else {
            $header.classList.remove('scroll-header');

        }
    })

}


export function menuMobile(ctaMenuMobile, menuMobile, menuLink) {
    document.addEventListener('click', e => {
        if (e.target.matches(`${ctaMenuMobile}`) || e.target.matches(`${ctaMenuMobile} *`)) {
            document.querySelector(menuMobile).classList.toggle('menu-active');
            document.querySelector(ctaMenuMobile).classList.toggle('is-active');
            // document.body.classList.toggle('no-scroll');
        }

        if (e.target.matches(menuLink)) {
            document.querySelector(menuMobile).classList.remove('menu-active');
            document.querySelector(ctaMenuMobile).classList.remove('is-active');
            // document.body.classList.remove('no-scroll');

        }
    })
}

export function scrollButton() {

    const $scrollBtn = document.querySelector('.scroll-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            $scrollBtn.classList.add('visible');
        } else {
            $scrollBtn.classList.remove('visible');
        }
    });

    document.addEventListener('click', e => {
        if (e.target.closest('.scroll-top')) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
}


  