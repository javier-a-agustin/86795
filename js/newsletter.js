const newsletterForm = document.querySelector("#newsletter");

newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    newsletterForm.reset();
    document.querySelector("#newsletter-msg").textContent = "¡Gracias por suscribirte!";
});
