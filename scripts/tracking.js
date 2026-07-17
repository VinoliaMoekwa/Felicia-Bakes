const button = document.getElementById("trackBtn");
const result = document.getElementById("result");
const orderInput = document.getElementById("orderNumber");
const orderJourney = document.getElementById("orderJourney");
const currentStatus = document.getElementById("currentStatus");
const timelineSteps = [...document.querySelectorAll(".timeline-step")];

const statusDetails = {
  "Quote Requested": {
    icon: "📝",
    description: "We have received your quote request and will be in touch soon.",
    message: "Thank you for choosing Felicia Bakes."
  },
  "Deposit Paid": {
    icon: "💳",
    description: "Your deposit has been received and your booking is secured.",
    message: "We are preparing the details for your special order."
  },
  "Design Confirmed": {
    icon: "✏️",
    description: "Your cake design has been confirmed and scheduled.",
    message: "The sweet details are all coming together."
  },
  Baking: {
    icon: "🎂",
    description: "Your cake layers are in the oven and rising to perfection.",
    message: "We are preparing something beautiful for your special day."
  },
  Decorating: {
    icon: "🧁",
    description: "Your cake is being decorated with the finishing touches.",
    message: "Almost ready for its big reveal."
  },
  "Ready for Collection": {
    icon: "🎁",
    description: "Your order is complete and ready for collection.",
    message: "Please contact us if you need to confirm collection details."
  },
  Collected: {
    icon: "🛍️",
    description: "Your order has been collected. We hope it made your celebration extra special.",
    message: "Thank you for supporting Felicia Bakes."
  }
};

function renderOrderProgress(status) {
  const legacyStatusMap = {
    "Awaiting Payment": "Quote Requested",
    "In Progress": "Baking"
  };
  const journeyStatus = legacyStatusMap[status] || status;
  const activeIndex = timelineSteps.findIndex((step) => step.dataset.status === journeyStatus);
  const details = statusDetails[journeyStatus];

  if (activeIndex === -1 || !details) {
    orderJourney.hidden = true;
    currentStatus.hidden = true;
    return;
  }

  timelineSteps.forEach((step, index) => {
    step.classList.toggle("completed", index < activeIndex);
    step.classList.toggle("active", index === activeIndex);
  });

  document.getElementById("statusIcon").textContent = details.icon;
  document.getElementById("statusTitle").textContent = journeyStatus;
  document.getElementById("statusDescription").textContent = details.description;
  document.getElementById("statusMessage").textContent = details.message;
  orderJourney.hidden = false;
  currentStatus.hidden = false;
}

button.addEventListener("click", async () => {
  const orderNumber = orderInput.value.trim();

  if (!orderNumber) {
    result.textContent = "Please enter an order number.";
    orderJourney.hidden = true;
    currentStatus.hidden = true;
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
      orderJourney.hidden = true;
      currentStatus.hidden = true;
      return;
    }

    const data = await response.json();

    // Choose a badge colour that reflects the order stage.
    let statusClass = "status-progress";

    if (data.status === "Quote Requested") {
      statusClass = "status-awaiting";
    }

    if (["Ready for Collection", "Collected"].includes(data.status)) {
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
    renderOrderProgress(data.status);
  } catch (error) {
    console.error(error);
    result.textContent = "Error connecting to server.";
    orderJourney.hidden = true;
    currentStatus.hidden = true;
  }
});
