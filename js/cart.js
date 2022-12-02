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
// const buyBtn = document.querySelector(".btn-buy");
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


// █ █▄░█ █ ▀█▀ █ ▄▀█ █░░ █ ▀█ █▀▀ █▀█
// █ █░▀█ █ ░█░ █ █▀█ █▄▄ █ █▄ ██▄ █▀▄
// creamos la funcion para mostrar el menu y el carrito
const clickEvent = () => {
    cartBtn.addEventListener("click", toggleCart);
    barsBtn.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", closeOnOverlayClick);
  }

// ejecutamos la funcion clickEvent
clickEvent();