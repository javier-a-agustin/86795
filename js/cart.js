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

function removeItem(id) {
    cart = cart.filter((entry) => entry.id !== id);
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
                        <img class="cart-item-img" src="${product.img}" alt="${product.alt}" />
                        <div class="cart-item-info">
                            <span class="cart-item-name">${product.name}</span>
                            <span class="cart-item-price">${formatPrice(product.price * entry.quantity)}</span>
                            <div class="cart-item-actions">
                                <div class="qty">
                                    <button class="cart-dec" data-id="${entry.id}" type="button" aria-label="Quitar uno">−</button>
                                    <span>${entry.quantity}</span>
                                    <button class="cart-inc" data-id="${entry.id}" type="button" aria-label="Agregar uno">+</button>
                                </div>
                                <button class="cart-delete" data-id="${entry.id}" type="button" aria-label="Eliminar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg></button>
                            </div>
                        </div>
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
    const button = event.target.closest("button");
    if (!button) return;
    const id = Number(button.dataset.id);
    if (button.classList.contains("cart-inc")) addToCart(id);
    else if (button.classList.contains("cart-dec")) removeFromCart(id);
    else if (button.classList.contains("cart-delete")) removeItem(id);
});

updateCartBadge();
