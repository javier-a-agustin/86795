const CART_KEY = "plantypulse_cart";

let cart = loadCart();

function loadCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(id) {
    const item = cart.find((entry) => entry.id === id);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ id, quantity: 1 });
    }
    saveCart();
    updateCart();
}

function removeFromCart(id) {
    const item = cart.find((entry) => entry.id === id);
    if (!item) return;
    item.quantity -= 1;
    if (item.quantity <= 0) {
        cart = cart.filter((entry) => entry.id !== id);
    }
    saveCart();
    updateCart();
}

function getTotalItems() {
    return cart.reduce((total, entry) => total + entry.quantity, 0);
}

function getTotalPrice() {
    return cart.reduce((total, entry) => {
        const product = findProductById(entry.id);
        return total + product.price * entry.quantity;
    }, 0);
}

function updateCartBadge() {
    const badge = document.querySelector("#cart-count");
    badge.textContent = getTotalItems();
}

function renderCart() {
    const list = document.querySelector("#cart-items");
    const total = document.querySelector("#cart-total");

    if (cart.length === 0) {
        list.innerHTML = `<li class="cart-empty">Tu carrito está vacío</li>`;
    } else {
        list.innerHTML = cart
            .map((entry) => {
                const product = findProductById(entry.id);
                return `
                    <li class="cart-item">
                        <span class="cart-item-name">${product.name} x${entry.quantity}</span>
                        <span class="cart-item-price">${formatPrice(product.price * entry.quantity)}</span>
                        <button class="cart-remove" data-id="${entry.id}" type="button" aria-label="Quitar uno">&minus;</button>
                    </li>
                `;
            })
            .join("");
    }

    total.textContent = formatPrice(getTotalPrice());
}

function updateCart() {
    updateCartBadge();
    renderCart();
}

function openCart() {
    renderCart();
    document.querySelector("#cart-drawer").classList.add("is-open");
    document.querySelector("#cart-overlay").classList.add("is-open");
}

function closeCart() {
    document.querySelector("#cart-drawer").classList.remove("is-open");
    document.querySelector("#cart-overlay").classList.remove("is-open");
}

document.querySelector("#cart-toggle").addEventListener("click", openCart);
document.querySelector("#cart-close").addEventListener("click", closeCart);
document.querySelector("#cart-overlay").addEventListener("click", closeCart);
document.querySelector("#cart-items").addEventListener("click", (event) => {
    const button = event.target.closest(".cart-remove");
    if (!button) return;
    removeFromCart(Number(button.dataset.id));
});

updateCartBadge();
