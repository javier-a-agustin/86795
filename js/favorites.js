const HEART_SVG = `<svg viewBox="0 0 122.88 107.41"><path d="M60.83,17.19C68.84,8.84,74.45,1.62,86.79,0.21c23.17-2.66,44.48,21.06,32.78,44.41c-3.33,6.65-10.11,14.56-17.61,22.32c-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.56C29.16,76.9,0.95,55.93,0.02,29.95C-0.63,11.75,13.73,0.09,30.25,0.3C45.01,0.5,51.22,7.84,60.83,17.19L60.83,17.19L60.83,17.19z"/></svg>`;

const FAVORITES_KEY = "plantypulse_favorites";

let favorites = loadFavorites();

function loadFavorites() {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

function saveFavorites() {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function isFavorite(id) {
    return favorites.includes(id);
}

function toggleFavorite(id) {
    if (isFavorite(id)) {
        favorites = favorites.filter((favId) => favId !== id);
    } else {
        favorites.push(id);
    }
    saveFavorites();
    updateFavorites();
}

function getFavoritesCount() {
    return favorites.length;
}

function updateFavoritesBadge() {
    document.querySelector("#favorites-count").textContent = getFavoritesCount();
}

function syncHeartButtons() {
    document.querySelectorAll(".fav-btn").forEach((btn) => {
        btn.classList.toggle("is-favorite", isFavorite(Number(btn.dataset.id)));
    });
}

function renderFavorites() {
    const list = document.querySelector("#favorites-items");

    if (favorites.length === 0) {
        list.innerHTML = `<li class="cart-empty">No tenés favoritos</li>`;
        return;
    }

    list.innerHTML = favorites
        .map((id) => {
            const product = findProductById(id);
            return `
                <li class="cart-item" data-id="${id}">
                    <img class="cart-item-img" src="${product.img}" alt="${product.alt}" />
                    <div class="cart-item-info">
                        <span class="cart-item-name">${product.name}</span>
                        <span class="cart-item-price">${formatPrice(product.price)}</span>
                    </div>
                    <button class="cart-delete" data-id="${id}" type="button" aria-label="Quitar de favoritos"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg></button>
                </li>
            `;
        })
        .join("");
}

function updateFavorites() {
    updateFavoritesBadge();
    renderFavorites();
    syncHeartButtons();
}

function openFavorites() {
    renderFavorites();
    document.querySelector("#favorites-drawer").classList.add("is-open");
    document.querySelector("#favorites-overlay").classList.add("is-open");
}

function closeFavorites() {
    document.querySelector("#favorites-drawer").classList.remove("is-open");
    document.querySelector("#favorites-overlay").classList.remove("is-open");
}

document.querySelector("#favorites-toggle").addEventListener("click", openFavorites);
document.querySelector("#favorites-close").addEventListener("click", closeFavorites);
document.querySelector("#favorites-overlay").addEventListener("click", closeFavorites);
document.querySelector("#favorites-items").addEventListener("click", (event) => {
    const deleteButton = event.target.closest(".cart-delete");
    if (deleteButton) {
        toggleFavorite(Number(deleteButton.dataset.id));
        return;
    }

    const item = event.target.closest(".cart-item");
    if (!item) return;
    window.location.href = `product-detail.html?id=${item.dataset.id}`;
});

updateFavoritesBadge();
