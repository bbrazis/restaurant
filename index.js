import { menuArray } from "/data.js"

const orderList = document.getElementById('order')
const orderDialogBox = document.getElementById('order-dialog')
// const orderStatus = localStorage.getItem('current-order')
const orderBtn = document.getElementById('order-btn')
const checkoutModal = document.getElementById('checkout')
const checkoutBtn = document.getElementById('checkout-btn')
let orderArr = []
const totalPrice = []

// clearing order list from pre-existing html
orderList.innerHTML = ''

document.addEventListener('click', function(e){
    if(e.target.dataset.buyId){
        addToCart(e.target.dataset.buyId)
    }
    if(e.target.dataset.cartId){
        removeCartItem(e.target.dataset.cartId)
        renderCart()
        updateTotalPrice()
        toggleCart()
    }
})

orderBtn.addEventListener('click', function(){
    checkoutModal.showModal()
})

checkoutBtn.addEventListener('click', () => {
    // clearLocalCart()
    const checkoutName = document.getElementById('checkout_name').value

    document.getElementById('success-box').innerHTML = `<p>Thanks, ${checkoutName}! Your order is on its way!</p>`

    orderArr = []
    toggleCart()
    checkoutModal.close()
    document.getElementById('success-box').classList.toggle('display-block')
})

document.getElementById('checkout_name').addEventListener('change', checkName)
document.getElementById('checkout_card').addEventListener('change', checkCard)
document.getElementById('checkout_cvv').addEventListener('change', checkCvv)
document.getElementById('checkout-form').addEventListener('change', function(){
    let inputs = document.getElementsByClassName('input')
    let isValid = true
    for (let i = 0; i < inputs.length; i++){
        let changedInput = inputs[i]
        if (changedInput.value.trim() === '' || changedInput.value === null){
            isValid = false
            break
        }
    }
    checkoutBtn.disabled = !isValid
})

// later enchancement for when current orders are saved to local memory
// if( orderStatus ){
//     renderMenu()
//     orderArr.push(parseLocalCart())
//     renderCart()
//     updateTotalPrice()
//     toggleCart()
// } else {
//     orderDialogBox.classList.remove('dialog-open')
//     renderMenu()
// }

function toggleCart(){
    if (orderArr.length > 0) {
        orderDialogBox.classList.add('dialog-open')
    } else {
        orderDialogBox.classList.remove('dialog-open')
    }
}

function createMenu(){
    let menuList = ''
    menuArray.forEach(item => {
        let ingredientsList = ''
        if(item.ingredients.length > 0){
            item.ingredients.forEach(function(ingredient){
                ingredientsList += `
                    <li>${ingredient}</li>
                `
            })
        }
        menuList += `
        <div class="menu-item">
            <p class="menu-item_emoji">${item.emoji}</p>
            <div class="menu-item_details">
                <h2 class="menu-item_name">${item.name}</h2>
                <ul class="menu-item_ingredients">
                    ${ingredientsList}
                </ul>
                <p class="menu-item_price">$${item.price}</p>
            </div>
            <button class="menu-item_add-btn" data-buy-id="${item.id}">+</button>
        </div>
        `
    });
    return menuList
}

function renderMenu(){
    document.getElementById('menu').innerHTML = createMenu()
}

function addToCart(itemId) {
    // check to see if success message box is visiable and hide it
    const successBoxDisplay = document.getElementById('success-box').classList.contains('display-block')
    if (successBoxDisplay) {
        document.getElementById('success-box').classList.toggle('display-block')
    }

    // adding new item to order array
    orderArr.push(menuArray[itemId])
    totalPrice.push(menuArray[itemId].price)

    // setLocalCart(orderArr)
    renderCart()
    updateTotalPrice()
    toggleCart()
}

function renderCart(){
    let orderFeed = ``
    
    // iterating over order array to add the order items
    orderArr.forEach(function(item, index){
        orderFeed += `
            <li>
            <p class="order-item_name">${item.name}</p>
            <span data-cart-id="${index}">remove</span>
            <p class="order-item_price">$${item.price}</p>
            </li>
        `
    })
    
    orderList.innerHTML = orderFeed
}

function removeCartItem(num) {
    const index = Number(num)
    // removing specific item from the order array
    orderArr.splice(index, 1)
    // removing specific price from total price array
    totalPrice.splice(index, 1)
}

function updateTotalPrice() {
    // calculate total
    const total = totalPrice.reduce((a, b) => a + b, 0)
    // render out total to cart
    document.getElementById('order-total_price').innerHTML = `$${total}`
}

function checkName(){
    const checkoutName = document.getElementById('checkout_name')

    if (checkoutName.value.length > 0){
        checkoutName.classList.remove('is-invalid')
    } else {
        checkoutName.classList.add('is-invalid')
    }
}

function checkCard(){
    const checkoutCard = document.getElementById('checkout_card')

    if (checkoutCard.value.length === 16){
        checkoutCard.classList.remove('is-invalid')
    } else {
        checkoutCard.classList.add('is-invalid')
    }
}

function checkCvv(){
    const checkoutCvv = document.getElementById('checkout_cvv')

    if (checkoutCvv.value.length === 3){
        checkoutCvv.classList.remove('is-invalid')
    } else {
        checkoutCvv.classList.add('is-invalid')
    }
}

renderMenu()

// function parseLocalCart() {
//     return JSON.parse(orderStatus)
// }

// function setLocalCart(array) {
//     localStorage.setItem('current-order', JSON.stringify(array))
// }

// function clearLocalCart() {
//     localStorage.remove('current-order')
// }
// notes for Friday
// when adding to the ordering cart, get the current
// local copy of the cart and change it from a string
// into JSON and then replace it with the new cart items
// then set the new instance into local storage

// when removing an item from the cart, make sure to grab
// the current cart instance from local storage and update
// it before updating it in local storage

// after completing a transaction, clear the local storage
// version of the cart