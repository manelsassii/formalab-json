let products = [
    { id: 1, name: "7lib", price: 1350, idCategory: 2 },
    { id: 2, name: "5obz", price: 230, idCategory: 1 },
    { id: 3, name: "Oh!", price: 1300, idCategory: 2 },
]

let allProducts = products

let categories = [
    { id: 0, name: "Kollchay" },
    { id: 1, name: "ma2koulet" },
    { id: 2, name: "mchroubet" }
]

let cart = []

let ulProductsList = document.getElementById("products-list")
let divCategoriesList = document.getElementById("categories-list")
let spanCartNumber = document.getElementById("cart-number")
let tbodyProductsInCart = document.getElementById("products-in-cart")
let tfootProductsTotalPrice = document.getElementById("products-total-price")
let h3EmptyCartMessage = document.getElementById("empty-cart-message")
let tableCartTabel = document.getElementById("cart-table")

const clearCart = () => {
    localStorage.removeItem("cart-number")
    localStorage.removeItem("cart")
    initCart()
    displayProductsInCart()
}

const filterByCategory = (id) => {
    id == 0 ? products = allProducts : products = allProducts.filter(p => p.idCategory == id)
    displayProducts()
}

const addToCart = (idProduct) => {

    spanCartNumber.textContent++
    localStorage.setItem("cart-number", spanCartNumber.textContent)

    let addedProduct = { id: idProduct, qte: 1 }

    let index = cart.findIndex(productInCart => productInCart.id == idProduct)
    index == -1 ? cart.push(addedProduct) : cart[index].qte++

    localStorage.setItem("cart", JSON.stringify(cart))
    displayProductsInCart()
}

const initCart = () => {
    // jebet cart-number mel local storage
    let cartNumber = localStorage.getItem("cart-number")

    if (cartNumber) {
        spanCartNumber.textContent = cartNumber
        cart = JSON.parse(localStorage.getItem("cart"))
    }
    else {
        spanCartNumber.textContent = 0
        cart = []
    }
}

const displayProducts = () => {
    ulProductsList.innerHTML = ""
    for (let i = 0; i < products.length; i++) {
        ulProductsList.innerHTML +=
            `<li>
                ${products[i].name} - 
                ${products[i].price} - 
                <button onclick="addToCart(${products[i].id})">buy</button>
            </li>`
    }
}

const displayCategories = () => {
    divCategoriesList.innerHTML = ""
    for (let i = 0; i < categories.length; i++) {
        divCategoriesList.innerHTML +=
            `<button onclick="filterByCategory(${categories[i].id})">${categories[i].name}</button>`
    }
}

const removeFromCart = (index) => {
    // update cart number displayed in span
    spanCartNumber.textContent -= cart[index].qte
    // remove product from cart
    cart.splice(index, 1)
    // update local storage with new cart
    localStorage.setItem("cart", JSON.stringify(cart))
    // display products in cart from the new cart
    displayProductsInCart()
}

const addition = (index) => {
    spanCartNumber.textContent ++
    localStorage.setItem("cart-number", spanCartNumber.textContent)
    
    cart[index].qte ++
    localStorage.setItem("cart", JSON.stringify(cart))
    displayProductsInCart()
}

const soustraction = (index) => {
    if (cart[index].qte > 1) {
        spanCartNumber.textContent --
        localStorage.setItem("cart-number", spanCartNumber.textContent)
        
        cart[index].qte --
        localStorage.setItem("cart", JSON.stringify(cart))
        displayProductsInCart()
    }
}

const displayProductsInCart = () => {

    let productsInStorage = localStorage.getItem("cart")
    let displayedProducts = []
    let totalProductsPrice = 0;

    // if there is a cart in local storage AND it's length > 0
    // we should parse it to json to have the length
    if (productsInStorage && JSON.parse(productsInStorage).length > 0) {
        
        // hide the message
        h3EmptyCartMessage.classList.add("hide")
        // display the array
        tableCartTabel.classList.remove("hide")

        // parse ( convert ) the string cart to array
        let productsInCart = JSON.parse(productsInStorage)

        // create new objects to display it in HTML
        for (let i = 0; i < productsInCart.length; i++) {

            for (let j = 0; j < allProducts.length; j++) {

                if (productsInCart[i].id == allProducts[j].id) {

                    let displayedProduct = {
                        name: allProducts[j].name,
                        price: allProducts[j].price,
                        qte: productsInCart[i].qte,
                        total: productsInCart[i].qte * allProducts[j].price
                    }

                    totalProductsPrice += displayedProduct.total
                    displayedProducts.push(displayedProduct)
                }

            }

        }

        // create new Row ( tr ) for each product 
        tbodyProductsInCart.innerHTML = ""
        for (let i = 0; i < displayedProducts.length; i++) {
            tbodyProductsInCart.innerHTML +=
                `<tr>
                <td><button onclick="removeFromCart(${i})">X</button></td>
                <td>${displayedProducts[i].name}</td>
                <td>${displayedProducts[i].price} DT</td>
                <td><button onclick="soustraction(${i})">-</button></td>
                <td>${displayedProducts[i].qte}</td>
                <td><button onclick="addition(${i})">+</button></td>
                <td>${displayedProducts[i].total} DT</td>
            </tr>`
        }

        // create the footer of HTML table to display the total sum 
        tfootProductsTotalPrice.innerHTML =
            `<tr>
            <td colspan="6">TOTAL</td>
            <td>${totalProductsPrice} DT</td>
        </tr>`
    }
    else {
        // if the localstoarge is empty or the array is empty
        // display empty cart message
        tableCartTabel.classList.add("hide")
        // hide the table
        h3EmptyCartMessage.classList.remove("hide")
    }
}

const init = () => {
    initCart()

    // display products
    displayProducts()

    // display categories
    displayCategories()

    // display products in cart
    displayProductsInCart()
}

init()