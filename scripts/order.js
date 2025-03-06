// For order submission code:
const submitOrderBtn = document.getElementById("submitOrder");
if (submitOrderBtn) {
  submitOrderBtn.addEventListener("click", function (event) {
    event.preventDefault();
    // Retrieve values and save to localStorage
    let name = document.getElementById("full-name").value;
    let email = document.getElementById("email").value;
    let productType = document.getElementById("product-type").value;
    let flavour = document.getElementById("flavour").value;
    let filling = document.getElementById("filling").value;
    let size = document.getElementById("size").value;
    let design = document.getElementById("design").value;
    let colorScheme = document.getElementById("color-scheme").value;
    let message = document.getElementById("message").value;
    let dietary = document.getElementById("dietary").value;
    let occasion = document.getElementById("occasion").value;
    let eventDate = document.getElementById("event-date").value;
    let specialInstructions = document.getElementById("special-instructions").value;

    if (!name || !email || !productType || !flavour || !filling || !size || !design || !occasion || !eventDate) {
      alert("Please fill in all the required fields.");
      return;
    }

    let order = {
      productType,
      flavour,
      filling,
      size,
      design,
      colorScheme,
      message,
      dietary,
      occasion,
      eventDate,
      specialInstructions
    };

    let orderInfo = { name, email, order };
    localStorage.setItem("orderInfo", JSON.stringify(orderInfo));

    // Redirect to contact page
    window.location.href = "contact.html";
  });
}