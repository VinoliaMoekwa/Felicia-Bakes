const sendWhatsappBtn = document.getElementById("sendWhatsapp");
if (sendWhatsappBtn) {
  let orderInfo = JSON.parse(localStorage.getItem("orderInfo") || "{}");
  
  // Update display elements (make sure these IDs match those in contact.html)
  document.getElementById("full-name").textContent = orderInfo.name || "Not provided";
  document.getElementById("email").textContent = orderInfo.email || "Not provided";
  document.getElementById("orderDetails").textContent = orderInfo.order || "No order found";

  sendWhatsappBtn.addEventListener("click", function () {
    let phoneNumber = "0678405150";
    let message = `Hello, my name is ${orderInfo.name}.\n\nEmail: ${orderInfo.email}\n\nOrder Details:\n${orderInfo.order}`;
    window.location.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  });
}
