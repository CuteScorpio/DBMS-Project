async function fetchOrders() {
    try {
        const response = await fetch("http://localhost:8000/orders/display");
        const orders = await response.json();

        const container = document.getElementById("orderContainer");
        let allTablesHTML = '';

        orders.forEach(order => {
            let tableHTML = `
         <div class="tablecontainer">
                <h3>Order ID: ${order._id}</h3>
                <h3>Customer: ${order.customerName}</h3>
                <table border="1">
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

            tableHTML += order.products.map(product => {
                const total = product.productQuantity * product.productId.price;
                grandTotal += total;

                return `
                    <tr>
                        <td>${product.productId.name}</td>
                        <td>${product.productQuantity}</td>
                        <td>$${product.productId.price.toFixed(2)}</td>
                        <td>$${total.toFixed(2)}</td>
                    </tr>
                `;
            }).join('');

            tableHTML += `
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3" style="text-align:right"><strong>Grand Total:</strong></td>
                            <td><strong>$${grandTotal.toFixed(2)}</strong></td>
                        </tr>
                    </tfoot>
                </table>
         </div>
                <br>
            `;

            allTablesHTML += tableHTML;
        });

        container.innerHTML = allTablesHTML;

    } catch (error) {
        console.error("Error fetching orders:", error);
        document.getElementById("orderContainer").innerHTML = "<p>Error loading orders.</p>";
    }
}


fetchOrders();




