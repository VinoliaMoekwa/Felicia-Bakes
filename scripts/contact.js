const sendWhatsappBtn = document.getElementById("sendWhatsapp");
if (sendWhatsappBtn) {
  let orderInfo = JSON.parse(localStorage.getItem("orderInfo") || "{}");
  
  // Update display elements (make sure these IDs match those in contact.html)
  document.getElementById("full-name").textContent = orderInfo.name || "Not provided";
  document.getElementById("email").textContent = orderInfo.email || "Not provided";

  // Format order details into a readable format
  let orderDetails = `
    Product Type: ${orderInfo.order.productType || "Not provided"}<br>
    Flavour: ${orderInfo.order.flavour || "Not provided"}<br>
    Filling: ${orderInfo.order.filling || "Not provided"}<br>
    Size: ${orderInfo.order.size || "Not provided"}<br>
    Design: ${orderInfo.order.design || "Not provided"}<br>
    Color Scheme: ${orderInfo.order.colorScheme || "Not provided"}<br>
    Message: ${orderInfo.order.message || "Not provided"}<br>
    Dietary: ${orderInfo.order.dietary || "Not provided"}<br>
    Occasion: ${orderInfo.order.occasion || "Not provided"}<br>
    Event Date: ${orderInfo.order.eventDate || "Not provided"}<br>
    Special Instructions: ${orderInfo.order.specialInstructions || "Not provided"}
  `;
  document.getElementById("orderDetails").innerHTML = orderDetails;

  sendWhatsappBtn.addEventListener("click", function () {
    let phoneNumber = "27813315267";
    let message = `Hello, my name is ${orderInfo.name}.\n\nEmail: ${orderInfo.email}\n\nOrder Details:\n${orderDetails.replace(/<br>/g, '\n')}`;
    let encodedMessage = encodeURIComponent(message);
    window.location.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  });
}