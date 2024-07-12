const d = document;

export default function slider() {
    const sliders = document.querySelectorAll('.slider');

    sliders.forEach(slider => {
        let isPaused = false;
        let intervalId;

        function slide() {
            const sliderWidth = slider.offsetWidth;
            const cards = slider.querySelectorAll('.card');
            let index = 0;

            intervalId = setInterval(() => {
                if (!isPaused) {
                    slider.scrollLeft += sliderWidth;
                    index++;
                    if (index >= cards.length) {
                        slider.scrollLeft = 0;
                        index = 0;
                    }
                }
            }, 3000); // Cambia el slide cada 3 segundos (3000 milisegundos)
        }

        slide();

        slider.addEventListener('mouseenter', () => {
            isPaused = true;
            clearInterval(intervalId);
        });

        slider.addEventListener('mouseleave', () => {
            isPaused = false;
            slide();
        });
    });




}