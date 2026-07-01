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
                <li class="cart-item">
                    <span class="cart-item-name">${product.name}</span>
                    <span class="cart-item-price">${formatPrice(product.price)}</span>
                    <button class="cart-remove" data-id="${id}" type="button" aria-label="Quitar de favoritos">&minus;</button>
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
    const button = event.target.closest(".cart-remove");
    if (!button) return;
    toggleFavorite(Number(button.dataset.id));
});

updateFavoritesBadge();
