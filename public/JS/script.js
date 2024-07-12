import submenuHeader, { menuMobile, scrollButton, scrollHeader } from "./menu_header.js"
import observeImages from "./orservador.js";
import slider from "./slider.js";
import contactFormValidations from "./validaciones_formulario.js";

document.addEventListener('DOMContentLoaded', e => {
    submenuHeader('.cta-submenu', '.sub-menu');
    scrollHeader();
    menuMobile('.cta-menu-mobile', '.navbar-mobile', '.navbar-mobile .menu a');
    scrollButton();
    slider();
    observeImages();
    contactFormValidations()
}
)