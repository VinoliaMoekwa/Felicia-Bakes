const button = document.getElementById("trackBtn");
const result = document.getElementById("result");
const orderInput = document.getElementById("orderNumber");

button.addEventListener("click", async () => {
  const orderNumber = orderInput.value.trim();

  if (!orderNumber) {
    result.textContent = "Please enter an order number.";
    return;
  }

  result.textContent = "Checking order...";

  try {
    const response = await fetch(`https://felicia-bakes-backend.onrender.com/track/${orderNumber}`);

    if (!response.ok) {
      result.textContent = "Order not found";
      return;
    }

    const data = await response.json();

    result.innerHTML = `<strong>Status:</strong> ${data.status}`;
  } catch (error) {
    console.error("Tracking error:", error);
    result.textContent = "Error connecting to server.";
  }
});