// █▀▄ █▀█ █▀▄▀█   █▀▀ █░░ █▀▀ █▀▄▀█ █▀▀ █▄░█ ▀█▀ █▀
// █▄▀ █▄█ █░▀░█   ██▄ █▄▄ ██▄ █░▀░█ ██▄ █░▀█ ░█░ ▄█
const products = document.querySelector(".products-container");
const productsCart = document.querySelector(".cart-container");
const total = document.querySelector(".total");
const categories = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category");
const btnLoad = document.querySelector(".btn-load");
const buyBtn = document.querySelector(".btn-buy");
// const cartBubble = document.querySelector(".cart-bubble");
// const cartBtn = document.querySelector(".cart-label");
// const barsBtn = document.querySelector(".menu-label");
// const cartMenu = document.querySelector(".cart");
// const barsMenu = document.querySelector(".navbar-list");
// const overlay = document.querySelector(".overlay");
// const successModal = document.querySelector(".add-modal");
// const deleteBtn = document.querySelector(".btn-delete");


// █▀█ █▀▀ █▄░█ █▀▄ █▀▀ █▀█   █▀█ █▀█ █▀█ █▀▄ █░█ █▀▀ ▀█▀ █▀
// █▀▄ ██▄ █░▀█ █▄▀ ██▄ █▀▄   █▀▀ █▀▄ █▄█ █▄▀ █▄█ █▄▄ ░█░ ▄█

// utilizamos fetch para traer los datos del data.json
const getData = async () => {
    const response = await fetch("./js/data.json");
    const data = await response.json();
    return data;
}

// creamos una función para mostrar los productos en el dom
const renderProduct = (product) => {
    const {id, name, bid, user, userImg, cardImg} = product;
    return `
    <div class="product">
        <img src=${cardImg} alt=${name} />
        <div class="product-info">
            <!-- top -->
            <div class="product-top">
                <h3>${name}</h3>
                <p>Current Bid</p>
            </div>
            <!-- mid -->
            <div class="product-mid">
                <div class="product-user">
                    <img src=${userImg} alt="user" />
                    <p>@${user}</p>
                </div>
                <span>${bid} eTH</span>
            </div>
            <!-- bot -->
            <div class="product-bot">
                <div class="product-offer">
                    <div class="offer-time">
                        <img src="./assets/img/fire.png" alt="" />
                        <p>05:12:07</p>
                    </div>
                    <button class="btn-add"
                    data-id='${id}'
                    data-name='${name}'
                    data-bid='${bid}'
                    data-img='${cardImg}'>Add</button>
                </div>
            </div>
        </div>
    </div>`;
}

// para la paginacion del ver mas
// tomamos el array de productos del data.json y lo dividimos usando "size"
// en este caso 6 elementos del data.json
const splitProducts = (products, size) => {
    const dividedProducts = [];
    for (let i = 0; i < products.length; i += size) {
        dividedProducts.push(products.slice(i, i + size));
    }
    return dividedProducts;
}

// funcion para dividir los productos del data.json de 6 en 6 y manejar la paginacion
const productsController = async () => {
    const data = await getData();
    const dividedProducts = splitProducts(data, 6);
    let currentPage = 0;
    const showProducts = () => {
        const productsToShow = dividedProducts[currentPage];
        productsToShow.forEach(product => {
            products.innerHTML += renderProduct(product);
        });
    }
    showProducts();
    btnLoad.addEventListener("click", () => {
        currentPage++;
        if (currentPage < dividedProducts.length) {
            showProducts();
        } else {
            btnLoad.style.display = "none";
        }
    });
    console.log (dividedProducts);
}

// █▀▀ █ █░░ ▀█▀ █▀▀ █▀█   █░░ █▀█ █▀▀ █ █▀▀
// █▀░ █ █▄▄ ░█░ ██▄ █▀▄   █▄▄ █▄█ █▄█ █ █▄▄

// si clickeamos una categoria ocultamos el boton ver mas
// con la classlist "hidden"
const filterProducts = async (category) => {
    const data = await getData();
    const filteredProducts = data.filter(product => product.category === category);
    products.innerHTML = "";
    filteredProducts.forEach(product => {
        products.innerHTML += renderProduct(product);
    });
    btnLoad.classList.add("hidden");
}

// al clickear una categoria cambiamos el estado a "active"
// y filtramos los productos por categoria usando la funcion "filterProducts"
const filterController = async () => {
    categoriesList.forEach(category => {
        category.addEventListener("click", () => {
            categoriesList.forEach(category => category.classList.remove("active"));
            category.classList.add("active");
            filterProducts(category.dataset.category);
        });
    });
}
filterController();




// █ █▄░█ █ ▀█▀ █ ▄▀█ █░░ █ ▀█ █▀▀ █▀█
// █ █░▀█ █ ░█░ █ █▀█ █▄▄ █ █▄ ██▄ █▀▄
// creamos la funcion init para mostrar los productos en el dom
const init = () => {
    productsController();
}

// llamamos al init
init();