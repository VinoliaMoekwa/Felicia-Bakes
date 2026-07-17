document.addEventListener("DOMContentLoaded", () => {

    // ============================
    // FORM
    // ============================

    const quoteForm = document.getElementById("quote-form");

    // ============================
    // PRODUCTS
    // ============================

    const cakeCheckbox = document.getElementById("cake-checkbox");
    const cupcakeCheckbox = document.getElementById("cupcake-checkbox");
    const miniCakeCheckbox = document.getElementById("mini-cake-checkbox");
    const cookieCheckbox = document.getElementById("cookie-checkbox");

    // ============================
    // CAKE
    // ============================

    const flavour = document.getElementById("flavour");
    const cakeSize = document.getElementById("cake-size");
    const designType = document.getElementById("design-type");

    // ============================
    // CUPCAKES
    // ============================

    const cupcakeTopping = document.getElementById("cupcake-topping");
    const cupcakeQuantity = document.getElementById("cupcake-quantity");

    // ============================
    // MINI CAKES
    // ============================

    const miniCakeFlavour = document.getElementById("mini-cake-flavour");
    const miniCakeQuantity = document.getElementById("mini-cake-quantity");

    // ============================
    // COOKIES
    // ============================

    const cookieFlavour = document.getElementById("cookie-flavour");
    const cookieQuantity = document.getElementById("cookie-quantity");

    // ============================
    // CUSTOMER
    // ============================

    const fullName = document.getElementById("full-name");
    const contactNumber = document.getElementById("contact-number");
    const email = document.getElementById("email");

    // ============================
    // PERSONALISATION
    // ============================

    const colorScheme = document.getElementById("color-scheme");
    const message = document.getElementById("message");
    const dietary = document.getElementById("dietary");
    const design = document.getElementById("design");

    // ============================
    // EVENT
    // ============================

    const occasion = document.getElementById("occasion");
    const eventDate = document.getElementById("event-date");
    const eventTime = document.getElementById("event-time");

    // ============================
// PRODUCT GROUPS
// ============================

const cakeOptions = document.getElementById("cake-options");
const cupcakeOptions = document.getElementById("cupcake-options");
const miniCakeOptions = document.getElementById("mini-cake-options");
const cookieOptions = document.getElementById("cookie-options");

// Hide everything on page load
cakeOptions.style.display = "none";
cupcakeOptions.style.display = "none";
miniCakeOptions.style.display = "none";
cookieOptions.style.display = "none";

// Toggle each section independently
cakeCheckbox.addEventListener("change", () => {
    cakeOptions.style.display = cakeCheckbox.checked ? "block" : "none";
});

cupcakeCheckbox.addEventListener("change", () => {
    cupcakeOptions.style.display = cupcakeCheckbox.checked ? "block" : "none";
});

miniCakeCheckbox.addEventListener("change", () => {
    miniCakeOptions.style.display = miniCakeCheckbox.checked ? "block" : "none";
});

cookieCheckbox.addEventListener("change", () => {
    cookieOptions.style.display = cookieCheckbox.checked ? "block" : "none";
});

// ============================
// REVIEW ORDER
// ============================

const reviewButton = document.getElementById("review-order-btn");

reviewButton.addEventListener("click", () => {

    if (!fullName.value.trim() || !contactNumber.value.trim() || !email.value.trim() || !design.value.trim()) {
        alert("Please complete your name, contact number, email address, and design request before reviewing your order.");
        return;
    }

    const quoteRequest = {

        customer: {
            name: fullName.value,
            phone: contactNumber.value,
            email: email.value
        },

        products: {

            cake: {
                selected: cakeCheckbox.checked,
                flavour: flavour.value,
                finish: designType.value,
                size: cakeSize.value
            },

            cupcakes: {
                selected: cupcakeCheckbox.checked,
                style: cupcakeTopping.value,
                quantity: cupcakeQuantity.value
            },

            miniCakes: {
                selected: miniCakeCheckbox.checked,
                flavour: miniCakeFlavour.value,
                quantity: miniCakeQuantity.value
            },

            cookies: {
                selected: cookieCheckbox.checked,
                flavour: cookieFlavour.value,
                quantity: cookieQuantity.value
            }

        },

        design: design.value

    };

    localStorage.setItem(
        "quoteRequest",
        JSON.stringify(quoteRequest)
    );
    localStorage.removeItem("quoteOrderNumber");

    window.location.href = "review-order.html";

});
});
