function renderDetail() {
    const container = document.querySelector("#product-detail");
    const id = Number(new URLSearchParams(window.location.search).get("id"));
    const product = findProductById(id);

    if (!product) {
        container.innerHTML = `<p class="not-found">Producto no encontrado.</p>`;
        document.querySelector(".care-section").remove();
        return;
    }

    document.title = `${product.name} — PlantyPulse`;

    container.innerHTML = `
        <img src="${product.img}" alt="${product.alt}" width="600" height="400" />
        <article>
            <p class="category">${product.category}</p>
            <h2>${product.name}</h2>
            <p class="price">${formatPrice(product.price)}</p>
            <ul class="specs">
                <li><strong>Dificultad:</strong> ${product.specs.difficulty}</li>
                <li><strong>Ubicación:</strong> ${product.specs.location}</li>
                <li><strong>Riego:</strong> ${product.specs.watering}</li>
                <li><strong>Luz:</strong> ${product.specs.light}</li>
            </ul>
            <p>${product.description}</p>
            <div class="card-actions">
                <button class="btn-primary">Comprar</button>
                <button class="btn-secondary" data-id="${product.id}">Agregar al carrito</button>
            </div>
        </article>
    `;
}

document.querySelector("#product-detail").addEventListener("click", (event) => {
    const button = event.target.closest(".btn-secondary");
    if (!button) return;
    addToCart(Number(button.dataset.id));
});

renderDetail();
