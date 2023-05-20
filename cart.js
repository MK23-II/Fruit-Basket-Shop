let label = document.getElementById('label');
let container = document.getElementById('container');

let shoppingCart = JSON.parse(localStorage.getItem("data")) || [];


let calculate = () => {

    let cartIcon = document.getElementById('cartAmount');
    cartIcon.innerHTML = shoppingCart.map((x) => x.item).reduce((x, y) => x+y, 0);
}

calculate();

let generateCartItems = () => {

    if (shoppingCart.length !== 0) {
        return (container.innerHTML = shoppingCart.map((x) => {
            let {id, item} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            let {img, name, price} = search;
            return `
            
            <div class="cart-item">
                <img src=${img} alt="" width="100" />
                <div class="details">

                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${name}</p>
                            <p class="cart-item-price">P ${price}</p>
                        </h4>
                        <span onclick="removeItem(${id})">
                            <img id="remove-button" class="remove-button" src="icons/x-button.png" height="30" width="30">
                        </span>
                        
                    </div> 
                    
                    <div class="buttons">
                        <span onclick="decrement(${id})">
                            <img class="minus-icon" src="icons/minus.png" alt="minus" width="25">
                        </span>
                        <div id=${id} class="quantity">${item}</div>
                        <span onclick="increment(${id})">
                            <img class="plus-icon" src="icons/plus.png" alt="plus" width="25">
                        </span>
                    </div>

                    <h3>P ${item * search.price} </h3>
                </div>
            </div>
            `;
        }).join(""));
    }
    else {

        container.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is empty</h2>
        <a href="index.html">
            <button class="HomeBtn">Back to Home</button>      
        </a>
        `;
    }
};

generateCartItems();

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
    }
    //otherwise increase amount of same item
    else {
        search.item += 1;
    }

    generateCartItems();
    updateItems(addedItem.id);
    //alert(shopItemsData.name + " added to cart");
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
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(shoppingCart));
    //alert(shoppingCart["name"] + " removed from cart");
    
};

let updateItems = (id) => {
    
    let search = shoppingCart.find((x) => x.id === id);
    console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculate();
    totalAmount();
};

let removeItem = (id) => {
    let selectedItem = id;
    console.log(selectedItem.id);
    shoppingCart = shoppingCart.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    totalAmount();
    calculate();
    localStorage.setItem("data", JSON.stringify(shoppingCart));
    alert("Item removed from cart");
};

let clearCart = () => {
    shoppingCart = []
    generateCartItems();
    calculate();
    localStorage.setItem("data", JSON.stringify(shoppingCart));
}

let totalAmount = () => {

    if (shoppingCart.length !== 0) {
        let amount = shoppingCart.map((x) => {
            let {item, id} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x, y) => x+y, 0);
        //console.log(amount);
        label.innerHTML = `
        <h2>Total Amount: ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="clear-all">Clear All</button>
        `;
    }
    else {
        return
    }
    
};

totalAmount();