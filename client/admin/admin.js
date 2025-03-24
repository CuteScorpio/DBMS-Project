async function fetchProducts() {
    const response = await fetch("http://localhost:8000/order/display");
    const databases = await response.json();
    const container = document.getElementById("productContainer");

    let allTablesHTML = '';

    databases.forEach((db, index) => {
        let tableHTML = `
            <h3>Customer ID: ${db._id}</h3>
            <h3>Customer: ${db.customerName}</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
        `;

        let grandTotal = 0;

        tableHTML += db.orders.map(order => {
            const total = order.productQuantity * order.prouctPrice;
            grandTotal += total;
            return `
                <tr>
                    <td>${order.productsName}</td>
                    <td>${order.productQuantity}</td>
                    <td>$${order.prouctPrice}</td>
                    <td>$${total}</td>
                </tr>
            `;
        }).join('');

        tableHTML += `
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3" style="text-align:right"><strong>Grand Total:</strong></td>
                        <td><strong>$${grandTotal}</strong></td>
                    </tr>
                </tfoot>
            </table>
            <br>
        `;

        allTablesHTML += tableHTML;
    });

    container.innerHTML = allTablesHTML;
}

fetchProducts();

