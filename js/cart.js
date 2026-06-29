let cart = [];

function addToCart(id) {
    const item = cart.find((entry) => entry.id === id);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ id, quantity: 1 });
    }
    updateCartBadge();
}

function removeFromCart(id) {
    const item = cart.find((entry) => entry.id === id);
    if (!item) return;
    item.quantity -= 1;
    if (item.quantity <= 0) {
        cart = cart.filter((entry) => entry.id !== id);
    }
    updateCartBadge();
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
