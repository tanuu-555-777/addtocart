//cart pop up and close
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart")
const cartClose = document.querySelector("#cart-close")
cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

// adding items
const addCartButtons = document.querySelectorAll(".add-cart");
addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        const plantBox = event.target.closest(".plant-box");
        addToCart(plantBox);
    });
});

const cartContent = document.querySelector(".cart-content");
const addToCart = plantBox => {
    const plantImgSrc = plantBox.querySelector("img").src;
    const plantTitle = plantBox.querySelector(".plant-title").textContent;
    const plantPrice = plantBox.querySelector(".price").textContent;

    //for not appearing same item twice . it will show message.
    const cartItems = cartContent.querySelectorAll(".cart-product-title");
    for (let item of cartItems){
        if(item.textContent === plantTitle){
            alert("this item is already in the cart.");
            return;
        }
    }

    //in cart it will show the plant name, price
    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
    <img src="${plantImgSrc}" class="cart-img">
    <div class="cart-detail">
        <h2 class="cart-product-title">${plantTitle}</h2>
        <span class="cart-price">${plantPrice}</span>
        <div class="cart-quantity">
            <button id="minus">-</button>
            <span class="number-item">1</span>
            <button id="plus">+</button>
        </div>
    </div>
    <i class="ri-delete-bin-3-fill cart-remove"></i>
    `;

    cartContent.appendChild(cartBox);

    //cart delete button
    cartBox.querySelector(".cart-remove").addEventListener("click", () =>{
        cartBox.remove();
        
        updateCartCount(-1);
        updateTotalPrice();
    });

    // inscrease and decrease items (plus and minus)
    cartBox.querySelector(".cart-quantity").addEventListener("click", event =>{
        const numberElement = cartBox.querySelector(".number-item");
        const decrementButton = cartBox.querySelector("#minus");
        let quantity = numberElement.textContent;

        if(event.target.id === "minus" && quantity > 1){
            quantity--;
            if(quantity === 1){
                decrementButton.style.color = "#999";
            }
        }else if (event.target.id === "plus"){
            quantity++;
            decrementButton.style.color = "#333";
        }

        numberElement.textContent = quantity;
        updateTotalPrice();
    });

    updateCartCount(1);
    updateTotalPrice();
};

//total price
const updateTotalPrice = () =>{
    const totalPriceElement = document.querySelector(".total-price");
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    let total = 0;

    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cart-price");
        const quantityElement = cartBox.querySelector(".number-item");
        const price = priceElement.textContent.replace("₹", "");
        const quantity = quantityElement.textContent;
        total += price * quantity;
    });
    totalPriceElement.textContent = `₹${total}`;
};

//item count on icon
let cartItemCount = 0;
const updateCartCount = change => {
    const cartItemCountBadge = document.querySelector(".cart-item");
    cartItemCount += change;
    if(cartItemCount > 0){
        cartItemCountBadge.style.visibility = "visible";
        cartItemCountBadge.textContent = cartItemCount;
    } else {
        cartItemCountBadge.style.visibility = "hidden";
        cartItemCountBadge.textContent = "";
    }
};

//for buying
const buyNowButton = document.querySelector(".btn-buy");
buyNowButton.addEventListener("click", () =>{
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    if (cartBoxes.length === 0){
        alert("Your cart is empty. Please add plants to your charm collection before buying.");
        return;
    }

    cartBoxes.forEach(cartBox => cartBox.remove());

    cartItemCount = 0;
    updateCartCount(0);

    updateTotalPrice();

    alert("Thank you for purchase! Your magic Plant!");
});