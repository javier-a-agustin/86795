
function formatPrice(price) {
    return "$" + price.toLocaleString("es-AR");
}

function createCardHTML(product) {
    return `
        <article class="product-card">
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

// renderCatalog(products);
