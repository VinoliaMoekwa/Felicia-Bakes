const btn = document.getElementById("updateBtn");
const result = document.getElementById("result");

btn.addEventListener("click", async () => {
  const orderNumber = document.getElementById("orderNumber").value.trim();
  const status = document.getElementById("status").value;

  if (!orderNumber) {
    result.textContent = "Enter an order number.";
    return;
  }

  result.textContent = "Updating...";

  try {
    const res = await fetch(
      `https://felicia-bakes-backend.onrender.com/orders/${orderNumber}/status`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      result.textContent = data.message || "Failed.";
      return;
    }

    result.textContent = `Updated: ${data.order.orderNumber} → ${data.order.status}`;
  } catch (err) {
    console.error(err);
    result.textContent = "Error connecting to server.";
  }
});