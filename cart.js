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
        addToCart(product);
    }
});


// products add to cart 

function addToCart(product) {
    const exist = cart.find(item => item.id === product.id);
    if (exist) {
        exist.quantity++;
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
        container.innerHTML = "<p>Your cart is empty</p>";
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

           <div  class="remove-btn" >
                 <button onclick="removeItem(${item.id})">Remove</button>
           </div>
            
     `;

        container.appendChild(div);
    });

}

//  remove the item
function removeItem(id){
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
}



renderCart();

