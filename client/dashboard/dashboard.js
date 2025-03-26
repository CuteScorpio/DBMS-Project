addEventListener('DOMContentLoaded',()=>{
    const sidebar = document.querySelector('.sidebar');
const sidebarToggleIcon = document.querySelector('.fa-solid');

sidebarToggleIcon.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

sidebar.addEventListener('mouseleave', () => {
    sidebar.classList.remove('active');
});

const items = [
    { img: '../.jpg', name: 'Item 1', quantity: 1 },
    { img: 'item2.jpg', name: 'Item 2', quantity: 1 },
    { img: 'item3.jpg', name: 'Item 3', quantity: 1},
];

const sidebarContent = sidebar.querySelector('.sidebar-content');
items.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('sidebar-item');
    itemDiv.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div class="sidebar-item-details">
            <p>${item.name}</p>
        </div>
        <div class="sidebar-item-quantity">Qty: ${item.quantity}</div>
    `;
    sidebarContent.appendChild(itemDiv);
});

})


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



// const searchButton = document.getElementById("searchBarButton")

// searchButton.addEventListener('click', ()=>{

    
// const searchBar = document.getElementById('searchBar').value

// const response = await fetch('http://localhost:8000/products/display');
// const products = await response.json();












