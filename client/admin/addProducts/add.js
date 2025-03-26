let addForm = document.getElementById("addProductForm");

addForm.addEventListener("submit", async (e) => {
  e.preventDefault();
   
  const formData = new FormData();
  formData.append("name", document.getElementById("productName").value);
  formData.append("price", document.getElementById("productPrice").value);
  formData.append("quantity", document.getElementById("productQuantity").value);
  formData.append("category", document.getElementById("productCategory").value);
  formData.append("description", document.getElementById("productDescription").value);
  formData.append("image", document.getElementById("productImage").files[0]);


try {
  const response = await fetch("http://localhost:8000/products/add", {
      method: "POST",
      body: formData, 
  });

  const result = await response.json();
  console.log("Response:", result);
  alert(result.message);
} catch (error) {
  console.error("Error:", error);
  alert("Product added succesfully");
}
});


    