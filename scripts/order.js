document.addEventListener("DOMContentLoaded", function () {
    // ...existing code...

    const orderForm = document.getElementById("order-form");
    if (orderForm) {
        orderForm.addEventListener("submit", function (event) {
            event.preventDefault();
            // ...move your order submission code here...
            const name = document.getElementById("full-name").value;
            const email = document.getElementById("email").value;
            const cakeCheckbox = document.getElementById("cake-checkbox");
            const cupcakeCheckbox = document.getElementById("cupcake-checkbox");
            const cakeSelected = cakeCheckbox.checked;
            const cupcakeSelected = cupcakeCheckbox.checked;
            const flavour = document.getElementById("flavour").value;
            const filling = document.getElementById("filling").value;
            const cakeSizeVal = document.getElementById("cake-size").value;
            const designTypeVal = document.getElementById("design-type").value;
            const cupcakeToppingVal = document.getElementById("cupcake-topping").value;
            const cupcakeQuantityVal = document.getElementById("cupcake-quantity").value;
            const colorScheme = document.getElementById("color-scheme").value;
            const message = document.getElementById("message").value;
            const dietary = document.getElementById("dietary").value;
            const occasion = document.getElementById("occasion").value;
            const eventDate = document.getElementById("event-date").value;
            const specialInstructions = document.getElementById("special-instructions").value;

            if (!name || !email || (!cakeSelected && !cupcakeSelected) || !flavour || !filling || !occasion || !eventDate) {
                alert("Please fill in all the required fields.");
                return;
            }

            const order = {
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
                specialInstructions
            };

            const orderInfo = { name, email, order };
            localStorage.setItem("orderInfo", JSON.stringify(orderInfo));

            window.location.href = "contact.html";
        });
    }
});