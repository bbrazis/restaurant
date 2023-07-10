import { menuArray } from "/data.js"

const orderList = document.getElementById('order')
const orderDialogBox = document.getElementById('order-dialog')
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

checkoutBtn.addEventListener('click', (e) => {
    e.preventDefault()

    const checkoutName = document.getElementById('checkout_name').value
    const successBox = document.getElementById('success-box')

    successBox.innerHTML = `<p>Thanks, ${checkoutName}! Your order is on its way!</p>`
    successBox.classList.toggle('display-block')
    
    orderArr = []
    toggleCart()
    checkoutModal.close()

    // clear inputs after "submit"
    let inputs = document.getElementsByClassName('input')

    for (let i = 0; i < inputs.length; i++){
        inputs[i].value = ''
    }
    checkoutBtn.disabled = true
})

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

    if (document.getElementById('checkout-form').checkValidity()){
        checkoutBtn.disabled = !isValid
    }
    
})

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

renderMenu()