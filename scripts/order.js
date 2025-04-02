
document.addEventListener("DOMContentLoaded", function () {
  // Cake pricing based on size and design
  const cakePrices = {
      small: { fondant: 450, buttercream: 350, icing: 350 },
      medium: { fondant: 900, buttercream: 850, icing: 850 },
      large: { fondant: 1200, buttercream: 950, icing: 950 }
  };

  // Cupcake pricing based on topping type
  const cupcakePrices = {
      simpleSwirl: 25,
      bespoke: 30,
      ediblePrint: 35,
      acrylicTopper: 40,
      fondant: 35
  };

  // Get form elements
  const cakeCheckbox = document.getElementById("cake-checkbox");
  const cupcakeCheckbox = document.getElementById("cupcake-checkbox");
  const cakeSize = document.getElementById("cake-size");
  const designType = document.getElementById("design-type");
  const cupcakeTopping = document.getElementById("cupcake-topping");
  const cupcakeQuantity = document.getElementById("cupcake-quantity");
  const totalPriceElement = document.getElementById("total-price");

  const submitOrderBtn = document.getElementById("submitOrder");
  console.log("Button:", submitOrderBtn);

  function calculateTotal() {
      let totalPrice = 0;

      // If Cake is selected, add cake price
      if (cakeCheckbox.checked) {
          let size = cakeSize.value;
          let design = designType.value;
          if (size && design) {
              totalPrice += cakePrices[size][design] || 0;
          }
      }

      // If Cupcakes are selected, add cupcake price * quantity
      if (cupcakeCheckbox.checked) {
          let topping = cupcakeTopping.value;
          let quantity = parseInt(cupcakeQuantity.value) || 0; // Default to 0 if empty
          if (topping && quantity > 0) {
              totalPrice += (cupcakePrices[topping] || 0) * quantity;
          }
      }

      // Display the total price
      totalPriceElement.textContent = totalPrice.toFixed(2);
  }

  // Add event listeners to update price dynamically
  cakeCheckbox.addEventListener("change", calculateTotal);
  cupcakeCheckbox.addEventListener("change", calculateTotal);
  cakeSize.addEventListener("change", calculateTotal);
  designType.addEventListener("change", calculateTotal);
  cupcakeTopping.addEventListener("change", calculateTotal);
  cupcakeQuantity.addEventListener("input", calculateTotal);

  // Order Submission
  if (submitOrderBtn) {
      submitOrderBtn.addEventListener("click", function (event) {
          event.preventDefault();

          // Retrieve values and save to localStorage
          let name = document.getElementById("full-name").value;
          let email = document.getElementById("email").value;
          let cakeSelected = cakeCheckbox.checked;
          let cupcakeSelected = cupcakeCheckbox.checked;
          let flavour = document.getElementById("flavor").value;
          let filling = document.getElementById("filling").value;
          let cakeSize = document.getElementById("cake-size").value;
          let designType = document.getElementById("design-type").value;
          let cupcakeTopping = document.getElementById("cupcake-topping").value;
          let cupcakeQuantity = document.getElementById("cupcake-quantity").value;
          let colorScheme = document.getElementById("color-scheme").value;
          let message = document.getElementById("message").value;
          let dietary = document.getElementById("dietary").value;
          let occasion = document.getElementById("occasion").value;
          let eventDate = document.getElementById("event-date").value;
          let specialInstructions = document.getElementById("special-instructions").value;

          if (!name || !email || (!cakeSelected && !cupcakeSelected) || !flavour || !filling || !occasion || !eventDate) {
              alert("Please fill in all the required fields.");
              return;
          }

          let order = {
              cakeSelected,
              cupcakeSelected,
              flavour,
              filling,
              cakeSize: cakeSelected ? cakeSize : "N/A",
              designType: cakeSelected ? designType : "N/A",
              cupcakeTopping: cupcakeSelected ? cupcakeTopping : "N/A",
              cupcakeQuantity: cupcakeSelected ? cupcakeQuantity : "0",
              colorScheme,
              message,
              dietary,
              occasion,
              eventDate,
              specialInstructions
          };

          let orderInfo = { name, email, order };
          localStorage.setItem("orderInfo", JSON.stringify(orderInfo));

          // Redirect to contact page
          window.location.href = "contact.html";
      });
  }
});
