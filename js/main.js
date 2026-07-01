const HEART_SVG = `<svg viewBox="0 0 122.88 107.41"><path d="M60.83,17.19C68.84,8.84,74.45,1.62,86.79,0.21c23.17-2.66,44.48,21.06,32.78,44.41c-3.33,6.65-10.11,14.56-17.61,22.32c-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.56C29.16,76.9,0.95,55.93,0.02,29.95C-0.63,11.75,13.73,0.09,30.25,0.3C45.01,0.5,51.22,7.84,60.83,17.19L60.83,17.19L60.83,17.19z"/></svg>`;

function createCardHTML(product) {
    return `
        <article class="product-card" data-id="${product.id}">
            <button class="fav-btn ${isFavorite(product.id) ? "is-favorite" : ""}" data-id="${product.id}" type="button" aria-label="Favorito">${HEART_SVG}</button>
            <h2>${product.name}</h2>
            <img src="${product.img}" alt="${product.alt}" />
            <div class="card-content">
                <p class="category">${product.category}</p>
                <p class="price">${formatPrice(product.price)}</p>
                <div class="card-actions">
                    <button class="btn-secondary">Agregar al carrito</button>
                </div>
                <a href="product-detail.html?id=${product.id}" class="btn-detail">Ver detalles</a>
            </div>
        </article>
    `;
}

function renderCatalog(list) {
    const catalog = document.querySelector("#catalog");
    catalog.innerHTML = list.map(createCardHTML).join("");
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

    if (button.classList.contains("btn-secondary")) {
        addToCart(product.id);
        showMessage(`Agregaste "${product.name}" al carrito`);
    } else if (button.classList.contains("fav-btn")) {
        toggleFavorite(product.id);
    }
}

const catalog = document.querySelector("#catalog");
catalog.addEventListener("click", handleCatalogClick);

loadProducts().then(renderCatalog).catch((error) => console.table(error));
