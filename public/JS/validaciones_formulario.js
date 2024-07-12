export default function contactFormValidations() {
    const d = document;

    const $form = d.querySelector(".formualario");
    const $inputs = d.querySelectorAll(".formulario [required]");

    $inputs.forEach(input => {
        console.log(input)
        const $span = d.createElement("span");
        $span.id = `error-${input.name}`;
        $span.textContent = input.title;
        $span.classList.add("error", "none-span");
        input.insertAdjacentElement("afterend", $span);
    });

    d.addEventListener("keyup", e => {
        if (e.target.matches(".formulario [required]")) {
            let $input = e.target;
            let pattern = $input.pattern || $input.dataset.pattern;

            if (!new RegExp(pattern).test($input.value)) {
                $input.classList.add('invalid')
                $input.classList.remove('valid')

            } else {
                $input.classList.remove('invalid')
                $input.classList.toggle('valid')
            }
        }
    });
}