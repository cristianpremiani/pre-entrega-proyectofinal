const listaCarrito = document.getElementById("lista-carrito");
const botonVaciarCarrito = document.getElementById("vaciar-carrito");
const botonComprarCarrito = document.createElement("button");


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const generarCarrito = () => {
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<li>El carrito está vacío.</li>";
        botonComprarCarrito.style.display = "none"; 
        return;
    }

    botonComprarCarrito.style.display = "block"; 

    carrito.forEach((producto, index) => {
        const item = document.createElement("li");
        item.innerHTML = `
            ${producto.nombre} - $${producto.precio} x ${producto.cantidad} = $${producto.precio * producto.cantidad}
            <button class="eliminar" data-index="${index}">Eliminar</button>
        `;
        listaCarrito.appendChild(item);
    });

    const total = carrito.reduce((acum, producto) => acum + producto.precio * producto.cantidad, 0);
    const totalItem = document.createElement("li");
    totalItem.innerHTML = `<strong>Total: $${total}</strong>`;
    listaCarrito.appendChild(totalItem);
};

const vaciarCarrito = () => {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    generarCarrito();
};

const eliminarProducto = (index) => {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    generarCarrito();
};

const comprarCarrito = () => {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de comprar.");
        return;
    }

    alert(`¡Gracias por tu compra! El total es $${carrito.reduce((acum, producto) => acum + producto.precio * producto.cantidad, 0)}.`);
    vaciarCarrito();
};

botonVaciarCarrito.addEventListener("click", vaciarCarrito);

listaCarrito.addEventListener("click", (e) => {
    if (e.target.classList.contains("eliminar")) {
        const index = e.target.dataset.index;
        eliminarProducto(index);
    }
});

botonComprarCarrito.id = "comprar-carrito";
botonComprarCarrito.textContent = "Comprar Todo";
botonComprarCarrito.style.display = "none"; 
botonComprarCarrito.addEventListener("click", comprarCarrito);

document.getElementById("carrito").appendChild(botonComprarCarrito);

generarCarrito();