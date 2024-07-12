const d = document;

export default function observeImages() {
    const $img = d.querySelectorAll("img[data-img-observer]");

    const cb = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible-promo", "swing-in-top-fwd");
               /*setTimeout(() => {
                    entry.target.classList.add("fade-out");
                }, 10000);*/
            }
        });
    };

    const observer = new IntersectionObserver(cb, { threshold: 0.2 });

    $img.forEach(el => observer.observe(el));
}
