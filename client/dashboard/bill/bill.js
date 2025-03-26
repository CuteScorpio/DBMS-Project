document.addEventListener("DOMContentLoaded", function () {
    let productTable = document.getElementById("productTable");
    let grandTotal = 0;
    data.forEach(product => {
        let total = product.price * product.quantity;
        grandTotal += total;
        let row = `<tr>
            <td><img src="${product.image}" alt="${product.name}" width="50"></td>
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>$${product.price}</td>
            <td>$${total}</td>
        </tr>`;
        productTable.innerHTML += row;
    });
    document.getElementById("grandTotal").innerText = Grand Total: ${grandTotal};
    let extraCharges = 5;
    document.getElementById("totalAmount").innerText = Total Amount: ${grandTotal + extraCharges};
             });