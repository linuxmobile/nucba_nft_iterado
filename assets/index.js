// Contenedor de productos
const products = document.querySelector(".products-container");
// Contenedor de productos del carrito
const productsCart = document.querySelector(".cart-container");
//El total en precio del carrito
const total = document.querySelector(".total");
// El contenedor de las categorías
const categories = document.querySelector(".categories");
// Un htmlCollection de botones de todas las categorías (mostrar el dataset)
const categoriesList = document.querySelectorAll(".category");
// Botón de ver más
const btnLoad = document.querySelector(".btn-load");
// Botón de comprar
const buyBtn = document.querySelector(".btn-buy");
// Botón para abrir y cerrar carrito
const cartBtn = document.querySelector(".cart-label");
// Botón para abrir y cerrar menú
const barsBtn = document.querySelector(".menu-label");
// Carrito
const cartMenu = document.querySelector(".cart");
//  Menú (Hamburguesa)
const barsMenu = document.querySelector(".navbar-list");
//  Overlay para tirar facha abajo del menú hamburguesa y el cart.
const overlay = document.querySelector(".overlay");
//  Modal de agregado al carrito.
const successModal = document.querySelector(".add-modal");
//  Modal de agregado al carrito.
const deleteBtn = document.querySelector(".btn-delete");

// Seteamos el carrito , vacío o lo que este en el localStorage según corresponda, igual que en los proyectos anteriores
let cart = JSON.parse(localStorage.getItem("cart")) || [];

//Función para guardar el carrito en el localStorage
const saveLocalStorage = (cartList) => {
  localStorage.setItem("cart", JSON.stringify(cartList));
};

/*---------------------------------------------------------------------- */
/*---------------------- Lógica de productos---------------------------- */
/*---------------------------------------------------------------------- */

// Función individual de renderizado de productos
// Recibe un objeto de producto y devuelve un string con el html del producto.
const renderProduct = (product) => {
  const { id, name, bid, user, userImg, cardImg } = product;
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
};

// Función de renderizado de los productos divididdos para usar con el botón ver más.
// Recibe un index, que en caso de que no lo reciba será 0.
// Si el index es 0, renderiza los primeros 6 productos y cuando vayamos cambiando el index renderizará los que siguen hasta que no queden arrays de productos dentro del array de productos divididos.
const renderDividedProducts = (index = 0) => {
  products.innerHTML += productsController.dividedProducts[index]
    .map(renderProduct)
    .join("");
};

// Función de renderizado de los productos del carrito cuando se aplican filtros.
// Recibe un string con el nombre de la categoría.
// Filtra el array de products ENTERO sin dividir por categoría y renderiza los productos que coincidan con la categoría.
const renderFilteredProducts = (category) => {
  const productsList = productsData.filter(
    (product) => product.category === category
  );
  products.innerHTML = productsList.map(renderProduct).join("");
};

// Función para agregar productos al carrito
// Recibe un index (en caso de no pasarlo será 0) y una categoría (en caso de no pasarla será undefined).
// Si no hay categoría, renderiza los productos del array dividido en arrays que corresponda (según si es la primera renderización o si estamos apretando en ver más).
// Si hay categoría, renderiza los productos del array de productos filtrados por categoría.
const renderProducts = (index = 0, category = undefined) => {
  if (!category) {
    renderDividedProducts(index);
    return;
  }
  renderFilteredProducts(category);
};

/*------------------------------------------------------------------------------*/
/*-------------------------------Lógica de filtros------------------------------*/
/*------------------------------------------------------------------------------*/

// Función para cambiar el estado del botón ver más.
// Recibe una categoría.
// Si no hay categoría, se quita la clase "hidden", quedando visible el botón. Esto sucede cuando la categoría que se este pasando sea undefined.
// Si hay categoría, se agrega la clase "hidden", quedando oculto el botón. Esto sucede cuando la categoría que se este pasando sea distinta de undefined.
const changeShowMoreBtnState = (category) => {
  if (!category) {
    btnLoad.classList.remove("hidden");
    return;
  }
  btnLoad.classList.add("hidden");
};

//Función para cambiar el estado visual de los botones de filtro de categorías.
// Recibe una categoría.
// Recorre el array de categories, y si el dataset.category del botón que se esta recorriendo es igual a la categoría que se esta pasando, le agrega la clase "active", si no, le quita la clase "active".
const changeBtnActiveState = (selectedCategory) => {
  const categories = [...categoriesList];
  categories.forEach((categoryBtn) => {
    if (categoryBtn.dataset.category !== selectedCategory) {
      categoryBtn.classList.remove("active");
      return;
    }
    categoryBtn.classList.add("active");
  });
};

// Función para cambiar todos los estados relacionados a los filtros.
// Recibe un evento del cual sacaremos el target.dataset.category y se lo pasaremos a las funciones creadas anteriormente.
const changeFilterState = (e) => {
  const selectedCategory = e.target.dataset.category;
  changeBtnActiveState(selectedCategory);
  changeShowMoreBtnState(selectedCategory);
};

//Función para aplicar el filtrar productos por categoría.
// Recibe un evento del cual sacaremos el target.dataset.category.
// Si lo apretado no contiene la clase category, no hace nada.
// Si lo apretado contiene la clase category, llama a la función changeFilterState y le pasa el evento.
// Si la categoría es undefined (porque se apreto en el botón que muestra todas las categorías), renderiza los productos del array dividido en arrays, mostrando los primeros 6 , ya que no le pasamos el index y por default es 0.
// En caso contrario (si hay categoría), vaciamos el innerHTML de nuestro products container y renderizamos los productos filtrados por categoría, devolviendo el nextProductsIndex del controller a 1.

const applyFilter = (e) => {
  if (!e.target.classList.contains("category")) return;
  changeFilterState(e);
  if (!e.target.dataset.category) {
    products.innerHTML = "";
    renderProducts();
  } else {
    renderProducts(0, e.target.dataset.category);
    productsController.nextProductsIndex = 1;
  }
};

//Función que indica si estamos en el último array del array de  productos divididos.
const isLastIndexOf = () =>
  productsController.nextProductsIndex === productsController.productsLimit;

//Función para mostrar más productos al apretar en el botón ver más.
// Renderiza, suma 1 a nextProductsIndex y si el valor de nextProductsIndex es igual al valor de productsLimit, esconde el botón ver más.
const showMoreProducts = () => {
  renderProducts(productsController.nextProductsIndex);
  productsController.nextProductsIndex++;
  if (isLastIndexOf()) {
    btnLoad.classList.add("hidden");
  }
};

/*-----------------------------------------------------*/
/*--------------------Menu interface-------------------*/
/*-----------------------------------------------------*/

// Logica para apertura de menu y carrito y overlay

// Togglea el menu y si el carrito esta abierto , lo cierra. Finalmente, muestra el overlay
const toggleMenu = () => {
  barsMenu.classList.toggle("open-menu");
  if (cartMenu.classList.contains("open-cart")) {
    cartMenu.classList.remove("open-cart");
    return; // Si ya había algo abierto, no se togglea el overlay, por eso el return
  }
  overlay.classList.toggle("show-overlay");
};

// Togglea el cart y si el menu esta abierto , lo cierra. Finalmente, muestra el overlay
const toggleCart = () => {
  cartMenu.classList.toggle("open-cart");
  if (barsMenu.classList.contains("open-menu")) {
    barsMenu.classList.remove("open-menu");
    return; // Si ya había algo abierto, no se togglea el overlay, por eso el return
  }
  overlay.classList.toggle("show-overlay");
};

// Al clickear un enlace del menú hamburguesa me lo cierra. Si lo que clickeemos dentro de el ul no contiene la clase "navbar-link" no pasa nada
const closeOnClick = (e) => {
  if (!e.target.classList.contains("navbar-link")) return;
  barsMenu.classList.remove("open-menu");
  overlay.classList.remove("show-overlay");
};

// Al scrollear, si no está abierto ni el menú ni el carrito no pasa nada, pero si alguno lo esta, se remueven las clases necesarias para cerrarlos.
const closeOnScroll = () => {
  if (
    !barsMenu.classList.contains("open-menu") &&
    !cartMenu.classList.contains("open-cart")
  )
    return;

  barsMenu.classList.remove("open-menu");
  cartMenu.classList.remove("open-cart");
  overlay.classList.remove("show-overlay");
};

const closeOnOverlayClick = () => {
  barsMenu.classList.remove("open-menu");
  cartMenu.classList.remove("open-cart");
  overlay.classList.remove("show-overlay");
};

/*---------------------------------------------------------------------- */
/*---------------------- Lógica del carrito (CLASE 2)----------------------------- */
/*---------------------------------------------------------------------- */

// Renderizado de un producto del carrito.
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

//Función para renderizar el carrito
// Recibe un array con objetos y lo renderiza en el carrito.
// Si no hay productos en el carrito , mostrará un párrafo que dice que no hay productos en el carrito.
// Si hay, los renderiza.

const renderCart = () => {
  if (!cart.length) {
    productsCart.innerHTML = `<p class="empty-msg">No hay productos en el carrito.</p>`;
    return;
  }
  productsCart.innerHTML = cart.map(renderCartProduct).join("");
};

//Función para obtener el precio total de compra
const getCartTotal = () =>
  cart.reduce((acc, cur) => acc + Number(cur.bid) * cur.quantity, 0);

//Función para renderizar el precio total de compra
//Usamos toFixed para que el precio total tenga solo 2 decimales.
const showTotal = () => {
  total.innerHTML = `${getCartTotal().toFixed(2)} eTH`;
};

// document.addEventListener("DOMContentLoaded", showTotal);

//Si no hay nada el carrito, deshabilita el botón de compra, sino lo habilita.
const disableBtn = (btn) => {
  if (!cart.length) {
    btn.classList.add("disabled");
  } else {
    btn.classList.remove("disabled");
  }
};

//Función para añadir un producto al carrito
// Recibe un evento del cual sacaremos el target.dataset.id,name,bid e img.
// Guardamos en una constante el producto sobre el cual vamos a hacer el chequeo y manipular.
// Si el producto existe en el carrito, le agrega una unidad.
// Si no existe, lo crea.
// Guardamos el carrito nuevo en el localStorage.
// Renderiza el carrito.
// Mostramos el total del carrito.
// Habilitamos el boton de compra si corresponde.

const addProduct = (e) => {
  if (!e.target.classList.contains("btn-add")) return;
  const { id, name, bid, img } = e.target.dataset;

  const product = productData(id, name, bid, img);
  console.log(product);
  if (isExistingCartProduct(product)) {
    addUnitToProduct(product);
    showSuccessModal("Se agregó una unidad del producto al carrito");
  } else {
    createCartProduct(product);
    showSuccessModal("El producto se ha agregado al carrito");
  }

  checkCartState();
};

//Función para añadir una unidad de producto a un producto existente en el carrito.
const addUnitToProduct = (product) => {
  cart = cart.map((cartProduct) =>
    cartProduct.id === product.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct
  );
};

//Función para crear un producto en el carrito.
const createCartProduct = (product) => {
  cart = [...cart, { ...product, quantity: 1 }];
};

//Función para constatar si existe un producto en el carrito.
const isExistingCartProduct = (product) => {
  return cart.find((item) => item.id === product.id);
};

//Función que crea un objeto que será la data del producto que se va a añadir o agregar una unidad en el carrito.
const productData = (id, name, bid, img) => {
  return { id, name, bid, img };
};

//Función para mostrar el modal de éxito.
const showSuccessModal = (msg) => {
  successModal.classList.add("active-modal");
  successModal.textContent = msg;
  setTimeout(() => {
    successModal.classList.remove("active-modal");
  }, 1500);
};

// Función para chequear el estado del carrito una vez realizada alguna manipulación del mismo (añadir producto, quitar producto, comprar o vaciar carrito).
const checkCartState = () => {
  saveLocalStorage(cart);
  renderCart(cart);
  showTotal(cart);
  disableBtn(buyBtn);
  disableBtn(deleteBtn);
};

// Función para manipular el evento de apretar en el menos.
// Recibe el id.
// Guardamos en una constante el producto que queremos manipular.
// Si el producto tiene una unidad, disparamos un confirm. En caso de que el usuario confirme, removemos el producto del carrito. Sino retorna sin hacer nada.
// Si el producto tiene más de una unidad, le restamos una unidad con la función substractProductUnit.
const handleMinusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);

  // Si se toco en un item con uno solo de cantidad
  if (existingCartProduct.quantity === 1) {
    if (window.confirm("¿Desea Eliminar el producto del carrito?")) {
      removeProductFromCart(existingCartProduct);
    }

    return;
  }
  substractProductUnit(existingCartProduct);
};

//Función para restarle una unidad a un producto del carrito.
// Hacemos un map que recorre el carrito y si el id del producto coincide con el id del producto que queremos restarle una unidad, le restamos una unidad.
const substractProductUnit = (existingProduct) => {
  cart = cart.map((product) => {
    return product.id === existingProduct.id
      ? { ...product, quantity: Number(product.quantity) - 1 }
      : product;
  });
};

//Función para remover un producto del carrito.
// Hacemos un filter que recorre el carrito y si el id del producto coincide con el id del producto que queremos remover, lo remueve.
// Actualizamos el local, renderizamos el nuevo cart , mostramos el total y manipulamos el boton de compra.
const removeProductFromCart = (existingProduct) => {
  cart = cart.filter((product) => product.id !== existingProduct.id);
  checkCartState();
};

//Función para manipular el evento de apretar en el más.
// Recibe el id.
// Guardamos en una constante el producto que queremos manipular.
// Le agregamos una unidad con la función addUnitToProduct.
const handlePlusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);
  addUnitToProduct(existingCartProduct);
};

//Función para manipular los eventos de los botones de más y menos.
// Recibe el evento.
// Si el target es el botón de menos, disparamos la función handleMinusBtnEvent con el id del producto.
// Si el target es el botón de más, disparamos la función handlePlusBtnEvent con el id del producto.
// Para todos los casos, guardamos el carrito en el localStorage, renderizamos el carrito, mostramos el total y manipulamos el boton de compra.
const handleQuantity = (e) => {
  if (e.target.classList.contains("down")) {
    handleMinusBtnEvent(e.target.dataset.id);
  } else if (e.target.classList.contains("up")) {
    handlePlusBtnEvent(e.target.dataset.id);
  }
  //Para todos los casos
  checkCartState();
};

// Función para resetear los items del carrito
const resetCartItems = () => {
  cart = [];
  checkCartState();
};

//Función para realizar una de las acciones que nos permite el carrito, ya sea borrar o comprar.
const completeCartAction = (confirmMsg, successMsg) => {
  if (!cart.length) return;
  if (window.confirm(confirmMsg)) {
    resetCartItems();
    alert(successMsg);
  }
};

//Función para completar compra.
const completeBuy = () => {
  completeCartAction("¿Desea completar su compra?", "¡Gracias por su compra!");
};

//Función para borrar carrito.
const deleteCart = () => {
  completeCartAction(
    "¿Desea completar su compra?",
    "No hay productos en el carrito"
  );
};

//Función inicializadora
const init = () => {
  renderProducts(); // Lo ponemos así ya que tiene que usarse con () debido a los parámetros, incluso aunque sean valor por default
  categories.addEventListener("click", applyFilter);
  btnLoad.addEventListener("click", showMoreProducts);
  cartBtn.addEventListener("click", toggleCart);
  barsBtn.addEventListener("click", toggleMenu);
  window.addEventListener("scroll", closeOnScroll);
  barsMenu.addEventListener("click", closeOnClick);
  overlay.addEventListener("click", closeOnOverlayClick);
  document.addEventListener("DOMContentLoaded", renderCart);
  document.addEventListener("DOMContentLoaded", showTotal);
  products.addEventListener("click", addProduct);
  productsCart.addEventListener("click", handleQuantity);
  buyBtn.addEventListener("click", completeBuy);
  deleteBtn.addEventListener("click", deleteCart);
  disableBtn(buyBtn);
  disableBtn(deleteBtn);
};

init();