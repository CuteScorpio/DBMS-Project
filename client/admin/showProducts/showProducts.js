document.addEventListener("DOMContentLoaded", fetchProducts);



async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:8000/products/display');
        const products = await response.json();
        const productContainer = document.getElementById('productContainer');
        products.forEach(product => {
            const productBox = document.createElement('div');
            productBox.className = 'product-box';
            productBox.id = "${product.name}";
            productBox.innerHTML = `
                <img src="${product.imgURL}" alt="${product.name}" id="product-image"> 
                <h2>${product.name}</h2>
                <p class="quantity">Quantity :${product.quantity}</p>
                <p class="price">Price: $${product.price}</p>
                <button id="${product.name}"class="delete_button">Delete Product</button>
            `;
            productContainer.appendChild(productBox);
        });
        
    document.querySelectorAll('.delete_button').forEach(button => {
        button.addEventListener('click', async (event) => {
        const productId = event.target.id;
           await deleteProduct(productId);
        });
    });



    } catch (error) {
        console.error('Error fetching products:', error);



    }
}



async function deleteProduct(productId) {
    try {
        const response = await fetch(`http://localhost:8000/products/delete/${productId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            const productElement = document.getElementById(productName);
            if (productElement) {
                productElement.remove();
            }

            console.log('Product deleted successfully');
           await fetchProducts();
        } else {
            console.error('Failed to delete product');
        }
    } catch (error) {
        console.error('Error deleting product:', error);
    }
}










