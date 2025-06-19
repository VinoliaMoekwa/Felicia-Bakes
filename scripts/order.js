document.addEventListener("DOMContentLoaded", function () {
    // --- PRICING DATA ---
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

    // --- ELEMENTS ---
    const cakeCheckbox = document.getElementById("cake-checkbox");
    const cupcakeCheckbox = document.getElementById("cupcake-checkbox");
    const cakeSize = document.getElementById("cake-size");
    const designType = document.getElementById("design-type");
    const cupcakeTopping = document.getElementById("cupcake-topping");
    const cupcakeQuantity = document.getElementById("cupcake-quantity");
    const totalPriceElement = document.getElementById("total-price");
    const orderForm = document.getElementById("order-form");

    // --- CALCULATOR LOGIC ---
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
        const quantity = parseInt(cupcakeQuantity.value) || 0;
        if (topping && quantity > 0 && cupcakePrices[topping]) {
            totalPrice += cupcakePrices[topping] * quantity;
        }
    }
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

    // --- CALCULATOR EVENT LISTENERS ---
    [cakeCheckbox, cupcakeCheckbox, cakeSize, designType, cupcakeTopping, cupcakeQuantity].forEach(element => {
        if (element) element.addEventListener("change", calculateTotal);
    });
    if (cupcakeQuantity) cupcakeQuantity.addEventListener("input", calculateTotal);

    // --- ORDER SUBMISSION LOGIC ---
    if (orderForm) {
        orderForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("full-name").value;
            const email = document.getElementById("email").value;
            const flavour = document.getElementById("flavour").value;
            const filling = document.getElementById("filling").value;
            const cakeSelected = cakeCheckbox.checked;
            const cupcakeSelected = cupcakeCheckbox.checked;
            const cakeSizeVal = cakeSize.value;
            const designTypeVal = designType.value;
            const cupcakeToppingVal = cupcakeTopping.value;
            const cupcakeQuantityVal = cupcakeQuantity.value;
            const colorScheme = document.getElementById("color-scheme").value;
            const message = document.getElementById("message").value;
            const dietary = document.getElementById("dietary").value;
            const occasion = document.getElementById("occasion").value;
            const eventDate = document.getElementById("event-date").value;
            

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
                
            };

            const orderInfo = { name, email, order };
            localStorage.setItem("orderInfo", JSON.stringify(orderInfo));
            window.location.href = "contact.html";
        });
    }

    // --- INITIAL CALCULATION ---
    calculateTotal();
});