async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:8000/products/display');
        const products = await response.json();
        const productContainer = document.getElementById('productContainer');
        products.forEach(product => {
            const productBox = document.createElement('div');
            productBox.className = 'product-box';
            productBox.id = '${product.name}';
            productBox.innerHTML = `
                <img src="../images/${product.name}.jpg" alt="${product.name}" id="product-image"> 
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
                <button>Add to Cart</button>
            `;
            productContainer.appendChild(productBox);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}



fetchProducts();






