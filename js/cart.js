// █▀▀ ▄▀█ █▀█ ▀█▀
// █▄▄ █▀█ █▀▄ ░█░

// █▀▄ █▀█ █▀▄▀█   █▀▀ █░░ █▀▀ █▀▄▀█ █▀▀ █▄░█ ▀█▀ █▀
// █▄▀ █▄█ █░▀░█   ██▄ █▄▄ ██▄ █░▀░█ ██▄ █░▀█ ░█░ ▄█
// const products = document.querySelector(".products-container");
// const productsCart = document.querySelector(".cart-container");
// const total = document.querySelector(".total");
// const categories = document.querySelector(".categories");
// const categoriesList = document.querySelectorAll(".category");
// const btnLoad = document.querySelector(".btn-load");
const buyBtn = document.querySelector(".btn-buy");
const cartBtn = document.querySelector(".cart-label");
const barsBtn = document.querySelector(".menu-label");
const cartMenu = document.querySelector(".cart");
const barsMenu = document.querySelector(".navbar-list");
const overlay = document.querySelector(".overlay");
const successModal = document.querySelector(".add-modal");
const deleteBtn = document.querySelector(".btn-delete");
const cartBubble = document.querySelector(".cart-bubble");


// █▀▄▀█ █▀▀ █▄░█ █░█   █░░ █▀█ █▀▀ █ █▀▀
// █░▀░█ ██▄ █░▀█ █▄█   █▄▄ █▄█ █▄█ █ █▄▄

// creamos variable para obtener el producto del localstorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Función para guardar el carrito en el localStorage
const saveLocalStorage = (cartList) => {
  localStorage.setItem("cart", JSON.stringify(cartList));
};

// creamos funcion toggleMenu y toggleCart para mostrar y ocultar los menus
const toggleMenu = () => {
    barsMenu.classList.toggle("open-menu");
    if (cartMenu.classList.contains("open-cart")) {
      cartMenu.classList.remove("open-cart");
      return; // Si ya había algo abierto, no se togglea el overlay, por eso el return
    }
    overlay.classList.toggle("show-overlay");
  };
  
const toggleCart = () => {
    cartMenu.classList.toggle("open-cart");
    if (barsMenu.classList.contains("open-menu")) {
        barsMenu.classList.remove("open-menu");
        return; // Si ya había algo abierto, no se togglea el overlay, por eso el return
    }
    overlay.classList.toggle("show-overlay");
};

// creamos la funcion para cerrar el menu y el carrito al hacer click en el overlay
const closeOnOverlayClick = () => {
    barsMenu.classList.remove("open-menu");
    cartMenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
};


// █▀▀ ▄▀█ █▀█ ▀█▀   █░░ █▀█ █▀▀ █ █▀▀
// █▄▄ █▀█ █▀▄ ░█░   █▄▄ █▄█ █▄█ █ █▄▄

// funcion para renderizar un producto en el carrito
const renderCartProduct = (cartProduct) => {
  const { id, name, bid, img, quantity } = cartProduct;
  return `    
  <div class="cart-item">
    <img src=${img} alt="Nft del carrito" />
    <div class="item-info">
      <h3 class="item-title">${name}</h3>
      <p class="item-bid">Current bid</p>
      <span class="item-price">${bid} ETH</span>
    </div>
    <div class="item-handler">
      <span class="quantity-handler down" data-id=${id}>-</span>
      <span class="item-quantity">${quantity}</span>
      <span class="quantity-handler up" data-id=${id}>+</span>
    </div>
  </div>`;
};

// si el carrito está vacio mostramos el mensaje de carrito vacio
// si hay productos en el carrito, lo renderiza
const renderCart = () => {
  if (cart.length === 0) {
    productsCart.innerHTML = `<p class="empty-msg">No hay productos en el carrito.</p>`;
  } else {
    productsCart.innerHTML = cart.map(renderCartProduct).join("");
  }
};

// si el carrito está vacio desactivar botones de comprar y eliminar
// si hay productos en el carrito activar botones de comprar y eliminar
const disableBtn = (btn) => {
  if (!cart.length) {
    btn.classList.add("disabled");
  } else {
    btn.classList.remove("disabled");
  }
};

//Función para obtener el precio total de compra
const getCartTotal = () =>
  cart.reduce((acc, cur) => acc + Number(cur.bid) * cur.quantity, 0);

//Función para renderizar el precio total de compra
//Usamos toFixed para que el precio total tenga solo 2 decimales.
const showTotal = () => {
  total.innerHTML = `${getCartTotal().toFixed(2)} eTH`;
};


// funcion para añadir un producto del fetchData al carrito
// al hacer click en el "btn-add" se añade el producto al carrito
const addProduct = (e) => {
  if (!e.target.classList.contains("btn-add")) return;
  const productToAdd = {
    id: e.target.dataset.id,
    name: e.target.dataset.name,
    bid: e.target.dataset.bid,
    img: e.target.dataset.img,
    quantity: 1,
  };
  const productInCart = cart.find((product) => product.id === productToAdd.id);
  if (productInCart) {
    productInCart.quantity++;
  } else {
    cart.push(productToAdd);
  }
  saveLocalStorage(cart);
  renderCart();
  showTotal();
  showSuccessModal("Producto añadido al carrito");
  disableBtn(buyBtn);
  disableBtn(deleteBtn);
  showCartBubble();
}

//Función para mostrar el modal de éxito.
const showSuccessModal = (msg) => {
  successModal.classList.add("active-modal");
  successModal.textContent = msg;
  setTimeout(() => {
    successModal.classList.remove("active-modal");
  }, 2500);
};

// funcion para clickear el boton + (classList "up") y - (classList "down") para aumentar o disminuir la cantidad de productos
// si la cantidad es 0 se elimina el producto del carrito
// si la cantidad es mayor a 0 se actualiza el carrito
const changeQuantity = (e) => {
  if (!e.target.classList.contains("quantity-handler")) return;
  const id = e.target.dataset.id;
  const productToChange = cart.find((product) => product.id === id);
  if (e.target.classList.contains("up")) {
    productToChange.quantity++;
  } else if (e.target.classList.contains("down")) {
    productToChange.quantity--;
  }
  if (productToChange.quantity === 0) {
    cart = cart.filter((product) => product.id !== id);
  }
  saveLocalStorage(cart);
  renderCart();
  showTotal();
  disableBtn(buyBtn);
  disableBtn(deleteBtn);
  showCartBubble();
};

// mostrar el total de productos en la burbuja del carrito de clase "cart-bubble"
// si el carrito está vacio, agregar "hidden" para que no se muestre la burbuja
// si el carrito tiene productos, eliminar "hidden" para que se muestre la burbuja
const showCartBubble = () => {
  const totalProducts = cart.reduce((acc, cur) => acc + cur.quantity, 0);
  cartBubble.textContent = totalProducts;
  if (totalProducts === 0) {
    cartBubble.classList.add("hidden");
  } else {
    cartBubble.classList.remove("hidden");
  }
};

// funcion para vaciar carrito al hacer click en el "btn-delete"
// escuchar el evento click en el boton de eliminar
const deleteCart = () => {
  if (!cart.length) return;
  cart = [];
  saveLocalStorage(cart);
  renderCart();
  showTotal();
  showSuccessModal("Carrito vaciado");
  disableBtn(buyBtn);
  disableBtn(deleteBtn);
  showCartBubble();
};

// funcion para comprar productos del carrito
// escuchar el evento click en el boton de comprar
// al hacer click en comprar lanzar una alerta con el precio total de compra
// una vez comprado, vaciar el carrito y resetear todo
const buyCart = () => {
  if (!cart.length) return;
  alert(`Has comprado ${getCartTotal()} ETH`);
  cart = [];
  saveLocalStorage(cart);
  renderCart();
  showTotal();
  showSuccessModal("Compra realizada");
  disableBtn(buyBtn);
  disableBtn(deleteBtn);
  showCartBubble();
};

// █ █▄░█ █ ▀█▀ █ ▄▀█ █░░ █ ▀█ █▀▀ █▀█
// █ █░▀█ █ ░█░ █ █▀█ █▄▄ █ █▄ ██▄ █▀▄
// creamos la funcion encargada de inizializar todo
const initCart = () => {
    cartBtn.addEventListener("click", toggleCart);
    barsBtn.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", closeOnOverlayClick);
    document.addEventListener("click", addProduct);
    document.addEventListener("click", renderCart);
    document.addEventListener("DOMContentLoaded", showTotal);
    deleteBtn.addEventListener("click", deleteCart);
    document.addEventListener("click", changeQuantity);
    document.addEventListener("DOMContentLoaded", renderCart);
    document.addEventListener("DOMContentLoaded", showCartBubble);
    buyBtn.addEventListener("click", buyCart);
    // mostrar botones desactivados
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
};

initCart();