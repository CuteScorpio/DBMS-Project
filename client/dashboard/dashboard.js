

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  // If there's no token, redirect to the login/signup page
  if (!token) {
    alert("Unauthorized! Please login first.");
    window.location.href = "../signup-login/signup-login.html";
    return;
  }

  try {
    // Validate the token with the server
    const response = await fetch("http://localhost:8000/user/verify", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      alert("Session expired! Please login again.");
      localStorage.removeItem("token"); // Clear the token from localStorage
      window.location.href = "../signup-login/signup-login.html"; // Redirect to login
      return;
    }
    const result = await response.json();

    const userProfile = await fetch(
      `http://localhost:8000/user/profile/${result.user.userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const userData = await userProfile.json();
    console.log(userData);

    // Token is valid, proceed with displaying user inf
    const userName = document.getElementById("userName");
    userName.textContent = userData.firstName + " " + userData.lastName;

    const sidebar = document.querySelector(".sidebar");
    const sidebarToggleIcon = document.querySelector(".fa-solid");

    sidebarToggleIcon.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });

    sidebar.addEventListener("mouseleave", () => {
      sidebar.classList.remove("active");
    });

    document.addEventListener("click", async (event) => {
      if (event.target.classList.contains("add_to_cart")) {
        const productId = event.target.id;

        await addToCart(productId);
      }
    });
  } catch (error) {
    console.error("Error verifying user:", error);
    alert("Server error! Please try again later.");
    window.location.href = "../signup-login/signup-login.html";
    return;
  }
});

async function fetchProducts() {
  try {
    const response = await fetch("http://localhost:8000/products/display");
    const products = await response.json();
    const productContainer = document.getElementById("productContainer");
    products.forEach((product) => {
      const productBox = document.createElement("div");
      productBox.className = "product-box";
      productBox.id = "${product.name}";
      productBox.innerHTML = `
                <img src="${product.imgURL}" alt="${product.name}" id="product-image"> 
                <h2>${product.name}</h2>
                <p class="description">${product.description}</p>
                <p class="price">Price: $${product.price}</p>
                <button id="${product.name}" class="add_to_cart">Add to Cart</button>
            `;
      productContainer.appendChild(productBox);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

fetchProducts();

async function addToCart(productId) {
  try {
    const response = await fetch(
      `http://localhost:8000/products/find/${productId}`
    );
    const product = await response.json();

    const sidebar = document.querySelector(".sidebar");
    const sidebarContent = sidebar.querySelector(".sidebar-content");
    const cartCount = document.querySelector(".cart-count");

    // Check if the product already exists in the cart
    let existingItem = document.getElementById(`cart-item-${productId}`);

    if (existingItem) {
      let quantityElement = existingItem.querySelector(".quantity-value");
      quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
    } else {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("sidebar-item");
      itemDiv.id = `cart-item-${productId}`;

      itemDiv.innerHTML = `
                <img src="${product.imgURL}" alt="${product.name}">
                <div class="sidebar-item-details">
                    <p>${product.name}</p>
                </div>
                <div class="sidebar-item-quantity">
                    <p class="sidebar-item-quantity">Qty.</p>
                    <button class="quantity-decrease" data-id="${productId}">-</button>
                    <span class="quantity-value"> 1 </span>
                    <button class="quantity-increase" data-id="${productId}">+</button>
                </div>
            `;

      sidebarContent.appendChild(itemDiv);
    }

    // Update cart count
    cartCount.textContent = parseInt(cartCount.textContent || "0") + 1;
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
}

// Event Listener for Quantity Change
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("quantity-increase")) {
    let productId = event.target.getAttribute("data-id");
    let quantityElement = document.querySelector(
      `#cart-item-${productId} .quantity-value`
    );
    quantityElement.textContent = parseInt(quantityElement.textContent) + 1;

    // Update cart count
    const cartCount = document.querySelector(".cart-count");
    cartCount.textContent = parseInt(cartCount.textContent) + 1;
  }

  if (event.target.classList.contains("quantity-decrease")) {
    let productId = event.target.getAttribute("data-id");
    let quantityElement = document.querySelector(
      `#cart-item-${productId} .quantity-value`
    );

    
      const newQuantity = parseInt(quantityElement.textContent) - 1;

      if (newQuantity <= 0) {
        // Remove the item from the cart if the quantity is less than or equal to 0
        let cartItem = document.getElementById(`cart-item-${productId}`);
        cartItem.remove();  // This will remove the cart item div
    } else {
        quantityElement.textContent = newQuantity;
    }



      // Update cart count
        const cartCount = document.querySelector(".cart-count");
        cartCount.textContent = parseInt(cartCount.textContent) - 1;
    
  }
});

async function placeOrder() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You need to be logged in to place an order.");
    window.location.href = "../signup-login/signup-login.html";
    return;
  }

  const cartProducts = document.querySelectorAll(".sidebar-item");
  const userName = document.getElementById("userName").textContent;
  const products = [];

  cartProducts.forEach(product => {
    const productName = product.querySelector("p").textContent;
    const quantityElement = product.querySelector(".quantity-value");
    const productQuantity = parseInt(quantityElement.textContent);

    products.push({
      productName: productName,
      productQuantity: productQuantity
    });
  });

  if (products.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  try {
    const response = await fetch("http://localhost:8000/orders/place", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        
      },
      body: JSON.stringify({products , userName}), // Send correct data format
    });

    const result = await response.json();
    console.log(result);
    if (response.ok) {
      alert("Order placed successfully!");
     
      // Optionally, clear the cart from UI and localStorage
      document.querySelector(".sidebar-content").innerHTML = ""; // Clear sidebar cart items
      localStorage.removeItem("cart");  // Clear cart from localStorage
      document.querySelector(".cart-count").textContent = "0";

      // Redirect to order details page
      // window.location.href = `order-details.html?orderId=${result.order._id}`;
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error("Error placing the order:", error);

    alert("There was an error placing your order. Please try again.");
  }
}

const placeOrderButton = document.getElementById("place-order-btn");
placeOrderButton.addEventListener("click", placeOrder);


// const userProfile =await fetch(`http://localhost:8000/user/profile/${result.user.userId}`, {
//     method: "GET",
// });
// const userData = await userProfile.json();

// const userName = document.getElementById("userName");
// userName.textContent = `${userData.firstName} ${userData.lastName}`;

// const searchButton = document.getElementById("searchBarButton")

// searchButton.addEventListener('click', ()=>{

// const searchBar = document.getElementById('searchBar').value

// const response = await fetch('http://localhost:8000/products/display');
// const products = await response.json();
