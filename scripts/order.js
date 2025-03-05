// For order submission code:
const submitOrderBtn = document.getElementById("submitOrder");
if (submitOrderBtn) {
  submitOrderBtn.addEventListener("click", function (event) {
    event.preventDefault();
    // Retrieve values and save to localStorage
    let name = document.getElementById("full-name").value;
    let email = document.getElementById("email").value;
    let order = document.getElementById("orderDetails").value; 

    if (!name || !email || !order) {
      alert("Please fill in all the fields.");
      return;
    }

    let orderInfo = { name, email, order };
    localStorage.setItem("orderInfo", JSON.stringify(orderInfo));

    // Redirect to contact page
    window.location.href = "contact.html";
  });
}
