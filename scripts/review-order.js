// ======================================
// LOAD QUOTE REQUEST
// ======================================

const quoteRequest = JSON.parse(localStorage.getItem("quoteRequest"));

if (!quoteRequest) {

    alert("No quote request found. Please complete the request form first.");

    window.location.href = "request-quote.html";

}



// ======================================
// CUSTOMER DETAILS
// ======================================

document.getElementById("review-name").textContent =
    quoteRequest.customer.name || "Not provided";

document.getElementById("review-phone").textContent =
    quoteRequest.customer.phone || "Not provided";

document.getElementById("review-email").textContent =
    quoteRequest.customer.email || "Not provided";

document.getElementById("review-design").textContent =
    quoteRequest.design || "No design description provided.";



// ======================================
// ORDER SUMMARY
// ======================================

const orderSummary = document.getElementById("order-summary");

let summaryHTML = "";



// ---------- Cake ----------

if (quoteRequest.products.cake.selected) {

    summaryHTML += `
        <div class="summary-item">

            <h4>Cake</h4>

            <p><strong>Flavour:</strong> ${quoteRequest.products.cake.flavour}</p>
            <p><strong>Finish:</strong> ${quoteRequest.products.cake.finish}</p>
            <p><strong>Size:</strong> ${quoteRequest.products.cake.size}</p>

        </div>
    `;

}



// ---------- Cupcakes ----------

if (quoteRequest.products.cupcakes.selected) {

    summaryHTML += `
        <div class="summary-item">

            <h4>Cupcakes</h4>

            <p><strong>Style:</strong> ${quoteRequest.products.cupcakes.style}</p>
            <p><strong>Quantity:</strong> ${quoteRequest.products.cupcakes.quantity}</p>

        </div>
    `;

}



// ---------- Mini Cakes ----------

if (quoteRequest.products.miniCakes.selected) {

    summaryHTML += `
        <div class="summary-item">

            <h4>Mini Cakes</h4>

            <p><strong>Flavour:</strong> ${quoteRequest.products.miniCakes.flavour}</p>
            <p><strong>Quantity:</strong> ${quoteRequest.products.miniCakes.quantity}</p>

        </div>
    `;

}



// ---------- Cookies ----------

if (quoteRequest.products.cookies.selected) {

    summaryHTML += `
        <div class="summary-item">

            <h4>Gourmet Cookies</h4>

            <p><strong>Flavour:</strong> ${quoteRequest.products.cookies.flavour}</p>
            <p><strong>Quantity:</strong> ${quoteRequest.products.cookies.quantity}</p>

        </div>
    `;

}

orderSummary.innerHTML = summaryHTML;



// ======================================
// WHATSAPP
// ======================================

document.getElementById("sendWhatsapp").addEventListener("click", () => {

    let message = `Hello Felicia! I'd like to request a quote.%0A%0A`;

    message += `*Customer Details*%0A`;
    message += `Name: ${quoteRequest.customer.name}%0A`;
    message += `Phone: ${quoteRequest.customer.phone}%0A`;
    message += `Email: ${quoteRequest.customer.email}%0A%0A`;

    message += `*Products*%0A`;

    if (quoteRequest.products.cake.selected) {
        message += `🍰 Cake%0A`;
        message += `• Flavour: ${quoteRequest.products.cake.flavour}%0A`;
        message += `• Finish: ${quoteRequest.products.cake.finish}%0A`;
        message += `• Size: ${quoteRequest.products.cake.size}%0A%0A`;
    }

    if (quoteRequest.products.cupcakes.selected) {
        message += `🧁 Cupcakes%0A`;
        message += `• Style: ${quoteRequest.products.cupcakes.style}%0A`;
        message += `• Quantity: ${quoteRequest.products.cupcakes.quantity}%0A%0A`;
    }

    if (quoteRequest.products.miniCakes.selected) {
        message += `🎂 Mini Cakes%0A`;
        message += `• Flavour: ${quoteRequest.products.miniCakes.flavour}%0A`;
        message += `• Quantity: ${quoteRequest.products.miniCakes.quantity}%0A%0A`;
    }

    if (quoteRequest.products.cookies.selected) {
        message += `🍪 Gourmet Cookies%0A`;
        message += `• Flavour: ${quoteRequest.products.cookies.flavour}%0A`;
        message += `• Quantity: ${quoteRequest.products.cookies.quantity}%0A%0A`;
    }

    message += `*Design Request*%0A`;
    message += `${quoteRequest.design}`;

    const phoneNumber = "27813315267";

    window.open(
        `https://wa.me/${phoneNumber}?text=${message}`,
        "_blank"
    );

});