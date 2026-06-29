// Fuente de verdad de los productos de PlantyPulse.
// Claves en inglés; los valores de texto van en español (rioplatense).
const products = [
    {
        id: 1,
        name: "Junispero",
        category: "Árbol exterior",
        price: 12500,
        img: "img/bonsai-01.jpg",
        alt: "Bonsai Junispero en maceta tradicional",
        description: "El Junispero es uno de los bonsáis más populares para cultivar al aire libre. Su follaje perenne y su resistencia lo hacen ideal tanto para principiantes como para coleccionistas experimentados. Tolera bien el frío y el calor, y responde muy bien a la poda y al alambrado.",
        specs: {
            difficulty: "Principiante",
            location: "Exterior",
            watering: "Moderado",
            light: "Sol directo",
        },
    },
    {
        id: 2,
        name: "Acer Palmatum",
        category: "Árbol exterior",
        price: 18000,
        img: "img/bonsai-02.jpg",
        alt: "Bonsai Acer Palmatum con hojas en abanico",
        description: "El Acer Palmatum, o arce japonés, destaca por sus hojas en forma de abanico que cambian de color con las estaciones. Es una especie elegante y muy apreciada en el mundo del bonsái.",
        specs: {
            difficulty: "Intermedio",
            location: "Exterior",
            watering: "Frecuente",
            light: "Semisombra",
        },
    },
    {
        id: 3,
        name: "Olivo",
        category: "Árbol exterior",
        price: 15000,
        img: "img/bonsai-03.jpg",
        alt: "Bonsai Olivo en maceta chica",
        description: "El Olivo es un bonsái robusto y muy longevo, ideal para climas cálidos y secos. Su tronco rugoso y su follaje plateado le dan un carácter mediterráneo único.",
        specs: {
            difficulty: "Principiante",
            location: "Exterior",
            watering: "Bajo",
            light: "Sol directo",
        },
    },
    {
        id: 4,
        name: "Arce Palmatum 2 años",
        category: "Árbol exterior",
        price: 9500,
        img: "img/bonsai-04.jpg",
        alt: "Bonsai Arce Palmatum de 2 años en desarrollo",
        description: "Un ejemplar joven de arce palmatum en pleno desarrollo, perfecto para quienes quieran acompañar el crecimiento de su bonsái desde una etapa temprana.",
        specs: {
            difficulty: "Intermedio",
            location: "Exterior",
            watering: "Frecuente",
            light: "Semisombra",
        },
    },
    {
        id: 5,
        name: "Pino Negro Japonés",
        category: "Árbol exterior",
        price: 22000,
        img: "img/bonsai-05.webp",
        alt: "Bonsai Pino Negro Japonés con ramas horizontales",
        description: "El Pino Negro Japonés es un clásico del bonsái tradicional. Su corteza fisurada y sus ramas horizontales lo convierten en una pieza de gran valor estético.",
        specs: {
            difficulty: "Avanzado",
            location: "Exterior",
            watering: "Moderado",
            light: "Sol directo",
        },
    },
    {
        id: 6,
        name: "Ficus Retusa",
        category: "Árbol interior",
        price: 14000,
        img: "img/bonsai-06.jpg",
        alt: "Bonsai Ficus Retusa con raíces aéreas visibles",
        description: "El Ficus Retusa es el bonsái de interior por excelencia. Resistente y de fácil cuidado, desarrolla raíces aéreas que aportan un aspecto exótico y vigoroso.",
        specs: {
            difficulty: "Principiante",
            location: "Interior",
            watering: "Moderado",
            light: "Luz indirecta",
        },
    },
    {
        id: 7,
        name: "Pino Blanco",
        category: "Árbol exterior",
        price: 19500,
        img: "img/bonsai-07.jpg",
        alt: "Bonsai Pino Blanco con follaje nevado",
        description: "El Pino Blanco se distingue por su follaje suave y azulado. Es una especie noble, muy valorada por la delicadeza de sus acículas y su porte señorial.",
        specs: {
            difficulty: "Avanzado",
            location: "Exterior",
            watering: "Moderado",
            light: "Sol directo",
        },
    },
    {
        id: 8,
        name: "Bosque de pinos",
        category: "Composición",
        price: 35000,
        img: "img/bonsai-08.jpg",
        alt: "Composición de bonsai en estilo bosque de pinos",
        description: "Una composición en estilo bosque (yose-ue) que reúne varios pinos en una misma maceta, recreando un paisaje natural en miniatura. Una pieza imponente para coleccionistas.",
        specs: {
            difficulty: "Avanzado",
            location: "Exterior",
            watering: "Moderado",
            light: "Sol directo",
        },
    },
];

function findProductById(id) {
    return products.find((product) => product.id === id);
}

function formatPrice(price) {
    return "$" + price.toLocaleString("es-AR");
}
