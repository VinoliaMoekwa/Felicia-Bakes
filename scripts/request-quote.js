document.addEventListener("DOMContentLoaded", function () {
  const cakePrices = {
    small: { fondant: 450, buttercream: 350, icing: 350 },
    medium: { fondant: 900, buttercream: 850, icing: 850 },
    large: { fondant: 1200, buttercream: 950, icing: 950 }
  };

  const cupcakePrices = {
    simpleSwirl: 25,
    bespoke: 30,
    ediblePrint: 35,
    acrylicTopper: 40,
    fondant: 35
  };

  const cakeCheckbox = document.getElementById("cake-checkbox");
  const cupcakeCheckbox = document.getElementById("cupcake-checkbox");
  const cakeSize = document.getElementById("cake-size");
  const designType = document.getElementById("design-type");
  const cupcakeTopping = document.getElementById("cupcake-topping");
  const cupcakeQuantity = document.getElementById("cupcake-quantity");
  const totalPriceElement = document.getElementById("total-price");
  const orderForm = document.getElementById("order-form");

  function calculateTotal() {
    let totalPrice = 0;

    if (cakeCheckbox.checked) {
      const size = cakeSize.value;
      const design = designType.value;

      if (
        size !== "selectoption" &&
        design !== "selectoption" &&
        cakePrices[size] &&
        cakePrices[size][design]
      ) {
        totalPrice += cakePrices[size][design];
      }
    }

    if (cupcakeCheckbox.checked) {
      const topping = cupcakeTopping.value;
      const quantity = parseInt(cupcakeQuantity.value, 10) || 0;

      if (topping && quantity > 0 && cupcakePrices[topping]) {
        totalPrice += cupcakePrices[topping] * quantity;
      }
    }

    totalPriceElement.textContent = totalPrice.toFixed(2);
  }

  [
    cakeCheckbox,
    cupcakeCheckbox,
    cakeSize,
    designType,
    cupcakeTopping,
    cupcakeQuantity
  ].forEach((element) => {
    if (element) {
      element.addEventListener("change", calculateTotal);
    }
  });

  if (cupcakeQuantity) {
    cupcakeQuantity.addEventListener("input", calculateTotal);
  }

  if (orderForm) {
    orderForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const name = document.getElementById("full-name").value.trim();
      const email = document.getElementById("email").value.trim();
      const flavour = document.getElementById("flavour").value;
      const filling = document.getElementById("filling").value;
      const cakeSelected = cakeCheckbox.checked;
      const cupcakeSelected = cupcakeCheckbox.checked;
      const cakeSizeVal = cakeSize.value;
      const designTypeVal = designType.value;
      const cupcakeToppingVal = cupcakeTopping.value;
      const cupcakeQuantityVal = cupcakeQuantity.value;
      const colorScheme = document.getElementById("color-scheme").value.trim();
      const message = document.getElementById("message").value.trim();
      const dietary = document.getElementById("dietary").value.trim();
      const occasion = document.getElementById("occasion").value;
      const eventDate = document.getElementById("event-date").value;
      const eventTime = document.getElementById("event-time").value;
      const totalPrice = totalPriceElement.textContent;

      if (
        !name ||
        !email ||
        (!cakeSelected && !cupcakeSelected) ||
        !flavour ||
        !filling ||
        !occasion ||
        !eventDate ||
        !eventTime
      ) {
        alert("Please fill in all the required fields.");
        return;
      }

      const orderPayload = {
        name,
        email,
        cakeSelected,
        cupcakeSelected,
        flavour,
        filling,
        cakeSize: cakeSelected ? cakeSizeVal : "N/A",
        designType: cakeSelected ? designTypeVal : "N/A",
        cupcakeTopping: cupcakeSelected ? cupcakeToppingVal : "N/A",
        cupcakeQuantity: cupcakeSelected ? cupcakeQuantityVal : "0",
        colorScheme,
        message,
        dietary,
        occasion,
        eventDate,
        eventTime,
        totalPrice
      };

      try {
        const response = await fetch("https://felicia-bakes-backend.onrender.com/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(orderPayload)
        });

        if (!response.ok) {
          alert("Failed to create order.");
          return;
        }

        const data = await response.json();

        localStorage.setItem("orderInfo", JSON.stringify(data));
        window.location.href = "contact.html";
      } catch (error) {
        console.error("Order submission error:", error);
        alert("Error submitting order.");
      }
    });
  }

  calculateTotal();
});