async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:8000/orders/display');
        const products = await response.json();
        const productContainer = document.getElementById('productContainer');
        products.forEach(product => {
            const productBox = document.createElement('div');
            productBox.className = 'product-box';
            productBox.id = '${product.name}';
            productBox.innerHTML = `
                <img src="${product.imgURL}" alt="${product.name}" id="product-image"> 
                <h2>${product.name}</h2>
                <p class="description">${product.description}</p>
                <p class="price">Price: $${product.price}</p>
                <button id="${product.name}_button"class="add_to_cart">Add to Cart</button>
            `;
            productContainer.appendChild(productBox);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}



fetchProducts();






