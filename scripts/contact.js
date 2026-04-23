const orderInfo = JSON.parse(localStorage.getItem("orderInfo") || "{}");

if (!orderInfo || !orderInfo.orderNumber) {
  alert("No order information found. Please fill in the order form first.");
  window.location.href = "order.html";
}

const orderDetails = `
  Product Type: ${
    orderInfo.cakeSelected && orderInfo.cupcakeSelected
      ? "Cake, Cupcakes"
      : orderInfo.cakeSelected
      ? "Cake"
      : orderInfo.cupcakeSelected
      ? "Cupcakes"
      : "Not provided"
  }<br>
  Flavour: ${orderInfo.flavour || "Not provided"}<br>
  Filling: ${orderInfo.filling || "Not provided"}<br>
  Size: ${orderInfo.cakeSize || "Not provided"}<br>
  Design: ${orderInfo.designType || "Not provided"}<br>
  Cupcake Topping: ${orderInfo.cupcakeTopping || "Not provided"}<br>
  Cupcake Quantity: ${orderInfo.cupcakeQuantity || "0"}<br>
  Color Scheme: ${orderInfo.colorScheme || "Not provided"}<br>
  Message: ${orderInfo.message || "Not provided"}<br>
  Dietary: ${orderInfo.dietary || "Not provided"}<br>
  Occasion: ${orderInfo.occasion || "Not provided"}<br>
  Event Date: ${orderInfo.eventDate || "Not provided"}<br>
  Event Time: ${orderInfo.eventTime || "Not provided"}<br>
  <strong>Status:</strong> ${orderInfo.status || "Awaiting Payment"}<br>
  <strong>Total Price:</strong> R${orderInfo.totalPrice || "0.00"}<br>
`;

const orderDetailsText =
  `Order Number: ${orderInfo.orderNumber || "Not provided"}\n` +
  `Product Type: ${
    orderInfo.cakeSelected && orderInfo.cupcakeSelected
      ? "Cake, Cupcakes"
      : orderInfo.cakeSelected
      ? "Cake"
      : orderInfo.cupcakeSelected
      ? "Cupcakes"
      : "Not provided"
  }\n` +
  `Flavour: ${orderInfo.flavour || "Not provided"}\n` +
  `Filling: ${orderInfo.filling || "Not provided"}\n` +
  `Size: ${orderInfo.cakeSize || "Not provided"}\n` +
  `Design: ${orderInfo.designType || "Not provided"}\n` +
  `Cupcake Topping: ${orderInfo.cupcakeTopping || "Not provided"}\n` +
  `Cupcake Quantity: ${orderInfo.cupcakeQuantity || "0"}\n` +
  `Color Scheme: ${orderInfo.colorScheme || "Not provided"}\n` +
  `Message: ${orderInfo.message || "Not provided"}\n` +
  `Dietary: ${orderInfo.dietary || "Not provided"}\n` +
  `Occasion: ${orderInfo.occasion || "Not provided"}\n` +
  `Event Date: ${orderInfo.eventDate || "Not provided"}\n` +
  `Event Time: ${orderInfo.eventTime || "Not provided"}\n` +
  `Status: ${orderInfo.status || "Awaiting Payment"}\n` +
  `Total Price: R${orderInfo.totalPrice || "0.00"}\n`;

document.getElementById("full-name").textContent = orderInfo.name || "Not provided";
document.getElementById("email").textContent = orderInfo.email || "Not provided";
document.getElementById("order-number").textContent = orderInfo.orderNumber || "Not provided";
document.getElementById("orderDetails").innerHTML = orderDetails;

document.getElementById("sendWhatsapp").addEventListener("click", function () {
  const phoneNumber = "27813315267";
  const message =
    `Hello, my name is ${orderInfo.name || "Not provided"}.\n` +
    `Email: ${orderInfo.email || "Not provided"}\n` +
    `Order Number: ${orderInfo.orderNumber || "Not provided"}\n\n` +
    `Order Details:\n${orderDetailsText}`;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank");
});