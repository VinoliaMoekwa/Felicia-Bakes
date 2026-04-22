const orderInfo = JSON.parse(localStorage.getItem("orderInfo") || "{}");

if (!orderInfo || !orderInfo.order) {
  alert("No order information found. Please fill in the order form first.");
  window.location.href = "order.html";
}

let productType = "";
if (orderInfo.order?.cakeSelected) productType += "Cake ";
if (orderInfo.order?.cupcakeSelected) productType += "Cupcakes";

const eventDate = orderInfo.order?.eventDate || "Not provided";
const eventTime = orderInfo.order?.eventTime || "Not provided";

const orderDetails = `
  Product Type: ${productType.trim() || "Not provided"}<br>
  Flavour: ${orderInfo.order?.flavour || "Not provided"}<br>
  Filling: ${orderInfo.order?.filling || "Not provided"}<br>
  Size: ${orderInfo.order?.cakeSize || "Not provided"}<br>
  Design: ${orderInfo.order?.designType || "Not provided"}<br>
  Color Scheme: ${orderInfo.order?.colorScheme || "Not provided"}<br>
  Message: ${orderInfo.order?.message || "Not provided"}<br>
  Dietary: ${orderInfo.order?.dietary || "Not provided"}<br>
  Occasion: ${orderInfo.order?.occasion || "Not provided"}<br>
  Event Date: ${eventDate}<br>
  Event Time: ${eventTime}<br>
  <strong>Total Price: R${orderInfo.order?.totalPrice || "0.00"}</strong><br>
`;

// For WhatsApp (plain text)
const orderDetailsText =
  `Product Type: ${productType.trim() || "Not provided"}\n` +
  `Flavour: ${orderInfo.order?.flavour || "Not provided"}\n` +
  `Filling: ${orderInfo.order?.filling || "Not provided"}\n` +
  `Size: ${orderInfo.order?.cakeSize || "Not provided"}\n` +
  `Design: ${orderInfo.order?.designType || "Not provided"}\n` +
  `Color Scheme: ${orderInfo.order?.colorScheme || "Not provided"}\n` +
  `Message: ${orderInfo.order?.message || "Not provided"}\n` +
  `Dietary: ${orderInfo.order?.dietary || "Not provided"}\n` +
  `Occasion: ${orderInfo.order?.occasion || "Not provided"}\n` +
  `Event Date: ${eventDate}\n` +
  `Event Time: ${eventTime}\n` +
  `Total Price: R${orderInfo.order?.totalPrice || "0.00"}\n`;

document.getElementById("full-name").textContent = orderInfo.name || "Not provided";
document.getElementById("email").textContent = orderInfo.email || "Not provided";
document.getElementById("orderDetails").innerHTML = orderDetails;

document.getElementById("sendWhatsapp").addEventListener("click", function () {
  const phoneNumber = "27813315267";
  const message =
    `Hello, my name is ${orderInfo.name || "Not provided"}.\n` +
    `Email: ${orderInfo.email || "Not provided"}\n\n` +
    `Order Details:\n${orderDetailsText}`;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank");
});