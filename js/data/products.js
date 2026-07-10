let products = [];

const PRODUCTS_CACHE_KEY = "plantypulse_products_cache";
const CACHE_TIMEOUT = 60 * 60 * 1000;

async function loadProducts() {
    const cached = JSON.parse(localStorage.getItem(PRODUCTS_CACHE_KEY));
    if (cached && Date.now() - cached.savedAt < CACHE_TIMEOUT) {
        products = cached.data;
        return products;
    }

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE}/${encodeURIComponent(AIRTABLE_TABLE)}`;
    const res = await fetch(url, {
        headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
    });
    const data = await res.json();
    products = data.records.map((r) => ({
        id: r.fields.Id,
        name: r.fields.Name,
        category: r.fields.Category,
        price: r.fields.Price,
        img: r.fields.Image?.[0]?.url ?? r.fields.Image ?? "",
        alt: r.fields.Name,
        description: r.fields.Description ?? "",
        specs: {
            difficulty: r.fields.Difficulty ?? "",
            location: r.fields.Location ?? "",
            watering: r.fields.Watering ?? "",
            light: r.fields.Light ?? "",
        },
    }));

    localStorage.setItem(PRODUCTS_CACHE_KEY, JSON.stringify({ data: products, savedAt: Date.now() }));
    return products;
}

function findProductById(id) {
    return products.find((product) => product.id === id);
}

function formatPrice(price) {
    return "$" + price.toLocaleString("es-AR");
}
