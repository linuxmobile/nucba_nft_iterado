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


// █▀▄▀█ █▀▀ █▄░█ █░█   █░░ █▀█ █▀▀ █ █▀▀
// █░▀░█ ██▄ █░▀█ █▄█   █▄▄ █▄█ █▄█ █ █▄▄

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
    return;
  }
  productsCart.innerHTML = cart.map(renderCartProduct).join("");
};






// █ █▄░█ █ ▀█▀ █ ▄▀█ █░░ █ ▀█ █▀▀ █▀█
// █ █░▀█ █ ░█░ █ █▀█ █▄▄ █ █▄ ██▄ █▀▄
// creamos la funcion encargada de inizializar todo
const initCart = () => {
    cartBtn.addEventListener("click", toggleCart);
    barsBtn.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", closeOnOverlayClick);
};

initCart();