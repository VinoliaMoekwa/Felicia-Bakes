let productType = "";
if (orderInfo.order?.cakeSelected) productType += "Cake ";
if (orderInfo.order?.cupcakeSelected) productType += "Cupcakes";

let orderDetails = `
  Product Type: ${productType || "Not provided"}<br>
  Flavour: ${orderInfo.order.flavour || "Not provided"}<br>
  Filling: ${orderInfo.order.filling || "Not provided"}<br>
  Size: ${orderInfo.order.cakeSize || "Not provided"}<br>
  Design: ${orderInfo.order.designType || "Not provided"}<br>
  Color Scheme: ${orderInfo.order.colorScheme || "Not provided"}<br>
  Message: ${orderInfo.order.message || "Not provided"}<br>
  Dietary: ${orderInfo.order.dietary || "Not provided"}<br>
  Occasion: ${orderInfo.order.occasion || "Not provided"}<br>
  Event Date: ${orderInfo.order.eventDate || "Not provided"}<br>
  Special Instructions: ${orderInfo.order.specialInstructions || "Not provided"}
`;

if (!orderInfo || !orderInfo.order) {
  alert("No order information found. Please fill in the order form first.");
  window.location.href = "order.html"; // Optional redirect
}
