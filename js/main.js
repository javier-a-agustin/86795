function formatPrice(price) {
    return "$" + price.toLocaleString("es-AR");
}

function createCardHTML(product) {
    return `
        <article class="product-card" data-id="${product.id}">
            <h2>${product.name}</h2>
            <img src="${product.img}" alt="${product.alt}" />
            <div class="card-content">
                <p class="category">${product.category}</p>
                <p class="price">${formatPrice(product.price)}</p>
                <div class="card-actions">
                    <button class="btn-primary">Comprar</button>
                    <button class="btn-secondary">Agregar al carrito</button>
                </div>
                <a href="product-detail.html" class="btn-detail">Ver detalles</a>
            </div>
        </article>
    `;
}

function renderCatalog(list) {
    const catalog = document.querySelector("#catalog");
    catalog.innerHTML = list.map(createCardHTML).join("");
}

function findProductById(id) {
    return products.find((product) => product.id === id);
}

function showMessage(text) {
    const message = document.querySelector("#message");
    message.textContent = text;
    message.classList.add("is-visible");
    setTimeout(() => message.classList.remove("is-visible"), 2500);
}

function handleCatalogClick(event) {
    const button = event.target.closest("button");
    if (!button) return;

    const card = event.target.closest(".product-card");
    const product = findProductById(Number(card.dataset.id));

    if (button.classList.contains("btn-primary")) {
        showMessage(`Comprando "${product.name}"...`);
    } else if (button.classList.contains("btn-secondary")) {
        addToCart(product.id);
        showMessage(`Agregaste "${product.name}" al carrito`);
    }
}

const catalog = document.querySelector("#catalog");
catalog.addEventListener("click", handleCatalogClick);

renderCatalog(products);
