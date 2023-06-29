import { menuArray as menu} from "/data.js"



document.addEventListener('click', function(e){
    if(e.target.dataset.buyId){
        console.log(e.target.dataset.buyId)
    }
})







function createMenu(){
    let menuList = ''
    menu.forEach(item => {
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
                <p class="menu-item_price" data-price="${item.id}">$14</p>
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
renderMenu()