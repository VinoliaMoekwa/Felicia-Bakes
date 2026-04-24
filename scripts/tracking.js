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
    const response = await fetch(
      `https://felicia-bakes-backend.onrender.com/track/${orderNumber}`
    );

    if (!response.ok) {
      const message = await response.text();
      result.textContent = message || "Order not found";
      return;
    }

    const data = await response.json();

    // 🎨 Choose color class based on status
    let statusClass = "status-awaiting";

    if (data.status === "In Progress") {
      statusClass = "status-progress";
    }

    if (data.status === "Ready for Collection") {
      statusClass = "status-ready";
    }

    // ✨ Pretty result with animation
    result.innerHTML = `
      <div class="track-result">
        <p><strong>Order Number:</strong> ${data.orderNumber}</p>
        <span class="status-badge ${statusClass}">
          ${data.status}
        </span>
      </div>
    `;
  } catch (error) {
    console.error(error);
    result.textContent = "Error connecting to server.";
  }
});