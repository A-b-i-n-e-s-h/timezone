// retrieve cart data
let cart = JSON.parse(localStorage.getItem("cart")) || [];

//add to cart button clicking 


// const cartBtns = document.querySelectorAll(".add-to-cart");

// cartBtns.forEach(btn => {
//     btn.addEventListener("click", function (e) {
//         console.log("cart button clicked", e.target.dataset.id);
//     });
// });


document.addEventListener("click", function (e) {
    if (e.target.classList.contains("add-to-cart")) {
        const id = parseInt(e.target.dataset.id);
        const product = products.find(p => p.id === id);
        console.log(" cart button clicked ", e.target.dataset.id);
        if (!product) return;
        showPopup(product.name, product.id);
        addToCart(product);
    }
});


// products add to cart 

function addToCart(product) {
    const exist = cart.find(item => item.id === product.id);
    if (exist) {
        showPopup(product.name, product.id)
    }
    else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart();
}


// save cart function

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function clearCart() {
    cart = [];
    localStorage.removeItem("cart");
    renderCart();

}

// Render the cart 
function renderCart() {

    const container = document.querySelector(".cart-items");
    if (!container) return;

    if (cart.length === 0) {
        //let emptyCart = document.querySelector(".cart");
        container.innerHTML = "<p>Your cart is empty</p>";
        subtotal();
        return;
    }

    container.innerHTML = "";

    cart.forEach(item => {
        const div = document.createElement("div");
        //div.className = 'cart-items';
        div.classList.add("cart-item");
        div.innerHTML = `
    
            <div class="product-info">
                <img src="${item.img}">
                <span>${item.name}</span>
            </div>

            <div class="price">
                <span>$${item.price}</span>
            </div>

            <div class="quantity">

                <button onclick="decrease(${item.id})">&minus;</button>
                <span>${item.quantity}</span>
                <button onclick="increase(${item.id})">&plus;</button>

            </div>
            <div class="total">
                <span>$${item.quantity * item.price}</span>
            </div>

           <div  class="remove-btn" onclick="removeItem(${item.id})">
                 <button >Remove</button>
           </div>
            
     `;

        container.appendChild(div);
    });
    subtotal();

}

//  remove the item
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
}

//quantity increase

function increase(id) {
    const item = cart.find(p => p.id === id);
    item.quantity++;
    saveCart();
    renderCart();
}

//quantity decrease
function decrease(id) {

    const item = cart.find(p => p.id === id);
    if (item.quantity > 1) {
        item.quantity--;
    }
    else {
        removeItem(id);
    }
    saveCart();
    renderCart();
}

function showPopup(productName, id) {
    const popup = document.createElement("div");
    popup.className = "popup-status";
    if (cart.find(p => p.id === id)) {
        popup.innerHTML = `${productName} already added`;
        console.log("already added");
    } else {
        popup.innerHTML = `${productName} added to Cart Successfully`;
        console.log("Added successfully");
    }
    document.body.appendChild(popup);
    setTimeout(() => {
        popup.remove();
    }, 2000);

}

// total function
function subtotal(){
    let total = 0;
    cart.forEach(item => {
        total = total+(item.price * item.quantity);
    });
    let totalElement = document.getElementById("overall-total");
    totalElement.innerHTML=`$${total}`;
}




renderCart();

