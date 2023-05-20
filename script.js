let shop = document.getElementById('shop');

let shoppingCart = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x) => {
        let {id, name, price, description, img} = x;
        let search = shoppingCart.find((x) => x.id === id) || [];
        return `
        <div id=product-id-${id} class="item">
            <img src="${img}" alt="image" width="222">
            <div class="details">
                <h2>${name}</h2>
                <p>${description}</p>
                <div class="price-quantity">
                    <h2>P${price}</h2>
                    <div class="buttons">
                        <span onclick="decrement(${id})">
                            <img class="minus-icon" src="icons/minus.png" alt="minus" width="25">
                        </span>
                        <div id=${id} class="quantity">
                            ${search.item === undefined? 0 : search.item}
                        </div>
                        <span onclick="increment(${id})">
                            <img class="plus-icon" src="icons/plus.png" alt="plus" width="25">
                        </span>
                    </div>
                </div>
            </div>
        </div>

    `
    }).join(""));
};

generateShop();

let increment = (id) => {

    let addedItem = id;

    //search same item on the cart
    let search = shoppingCart.find((x) => x.id === addedItem.id);

    //if item doesn't exist in cart, then push to cart 
    if (search === undefined) {
        shoppingCart.push({
            id: addedItem.id,
            item: 1,
        });
        alert("Item added to cart");
    }
    //otherwise increase amount of same item
    else {
        search.item += 1;

    }

    //console.log(shoppingCart);
    updateItems(addedItem.id);
    //alert(shoppingCart.find((x) => x.name == addedItem.name) + " added to cart");
    localStorage.setItem("data", JSON.stringify(shoppingCart));

};

let decrement = (id) => {

    let removedItem = id;

    //search same item on the cart
    let search = shoppingCart.find((x) => x.id === removedItem.id);

    if (search === undefined){
        return
    }
    //if item is not in cart, then stop search 
    else if (search.item === 0) {
        return 
        
    }
    //otherwise remove same item from cart 
    else {
        search.item -= 1;
        
    }

    updateItems(removedItem.id);
    shoppingCart = shoppingCart.filter((x) => x.item !== 0);
    //console.log(shoppingCart);
    //alert(shoppingCart.find((x) => x.name == removedItem.name) + " removed from cart");

    localStorage.setItem("data", JSON.stringify(shoppingCart));

};

let updateItems = (id) => {
    
    let search = shoppingCart.find((x) => x.id === id);
    console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculate();
};

let calculate = () => {

    let cartIcon = document.getElementById('cartAmount');
    cartIcon.innerHTML = shoppingCart.map((x) => x.item).reduce((x, y) => x+y, 0);
}

calculate();