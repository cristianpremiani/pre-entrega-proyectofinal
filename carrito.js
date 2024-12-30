const botonesComprar = document.querySelectorAll("button[type='submit']");

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.find(item => item.nombre === producto.nombre);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 }); 
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`Producto "${producto.nombre}" agregado al carrito.`);
};

botonesComprar.forEach((boton) => {
    boton.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        const producto = obtenerProducto(parseInt(index)); 
        agregarAlCarrito(producto);
    });
});

const obtenerProducto = (index) => {
    const productos = [

        { 
            nombre: "Whiskey Bushmills 10 años",
            precio: 150000 
        },
        { 
            nombre: "Whiskey Teeling Plantation",
            precio: 120000 
        },
        { 
            nombre: "Whiskey Glendalough Double Barrel ",
            precio: 125000 
        },
        { 
            nombre: "Whiskey Tullamore Dew ",
            precio: 36000 
        },
        { 
            nombre: "Whisky Glenfiddich 15 años", 
            precio: 200000 
        },
        { 
            nombre: "Whisky Lagavulin 16 años",
            precio: 354000 
        },
        { 
            nombre: "Whisky Talisker 10 años", 
            precio: 150000 
        },
        { 
            nombre: "Whisky Glenlivet Founder Reserve", 
            precio: 60000 
        },
        { 
            nombre: "Bourbon Jack Daniels Woodford", 
            precio: 135000 
        },
        { 
            nombre: "Bourbon Bib Tucker", 
            precio: 800000 
        },
        { 
            nombre: "Michters American Whiskey", 
            precio: 260000 
        },
        { 
            nombre: "Bourbon Redemption", 
            precio: 500000 },
    ];

    return productos[index];
};

console.log("Contenido del carrito:", carrito);

const botonVerCarrito = document.getElementById("ver-carrito");
const carritoSection = document.getElementById("carrito");
const listaCarrito = document.getElementById("lista-carrito");

botonVerCarrito.addEventListener("click", () => {
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<li>El carrito está vacío.</li>";
    } else {
        carrito.forEach(producto => {
            const item = document.createElement("li");
            item.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad}`;
            listaCarrito.appendChild(item);
        });
    }

    carritoSection.style.display = carritoSection.style.display === "none" ? "block" : "none";
});

