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

const submitButton = document.getElementById("sendWhatsapp");
const orderConfirmation = document.getElementById("orderConfirmation");

function buildOrderPayload() {
    const selectedProducts = [];

    if (quoteRequest.products.miniCakes.selected) {
        selectedProducts.push(`Mini cakes: ${quoteRequest.products.miniCakes.flavour}, quantity ${quoteRequest.products.miniCakes.quantity}`);
    }

    if (quoteRequest.products.cookies.selected) {
        selectedProducts.push(`Gourmet cookies: ${quoteRequest.products.cookies.flavour}, quantity ${quoteRequest.products.cookies.quantity}`);
    }

    return {
        name: quoteRequest.customer.name,
        email: quoteRequest.customer.email,
        cakeSelected: quoteRequest.products.cake.selected,
        cupcakeSelected: quoteRequest.products.cupcakes.selected,
        flavour: quoteRequest.products.cake.selected ? quoteRequest.products.cake.flavour : null,
        filling: null,
        cakeSize: quoteRequest.products.cake.selected ? quoteRequest.products.cake.size : null,
        designType: quoteRequest.products.cake.selected ? quoteRequest.products.cake.finish : null,
        cupcakeTopping: quoteRequest.products.cupcakes.selected ? quoteRequest.products.cupcakes.style : null,
        cupcakeQuantity: quoteRequest.products.cupcakes.selected ? quoteRequest.products.cupcakes.quantity : 0,
        colorScheme: null,
        message: [quoteRequest.design, ...selectedProducts].filter(Boolean).join("\n"),
        dietary: null,
        occasion: null,
        eventDate: null,
        eventTime: null,
        totalPrice: 0
    };
}

function openWhatsApp(orderNumber) {

    let message = `Hello Felicia! I'd like to request a quote.\n\n`;
    message += `*Order Number:* ${orderNumber}\n\n`;

    message += `*Customer Details*\n`;
    message += `Name: ${quoteRequest.customer.name}\n`;
    message += `Phone: ${quoteRequest.customer.phone}\n`;
    message += `Email: ${quoteRequest.customer.email}\n\n`;

    message += `*Products*\n`;

    if (quoteRequest.products.cake.selected) {
        message += `🍰 Cake\n`;
        message += `• Flavour: ${quoteRequest.products.cake.flavour}\n`;
        message += `• Finish: ${quoteRequest.products.cake.finish}\n`;
        message += `• Size: ${quoteRequest.products.cake.size}\n\n`;
    }

    if (quoteRequest.products.cupcakes.selected) {
        message += `🧁 Cupcakes\n`;
        message += `• Style: ${quoteRequest.products.cupcakes.style}\n`;
        message += `• Quantity: ${quoteRequest.products.cupcakes.quantity}\n\n`;
    }

    if (quoteRequest.products.miniCakes.selected) {
        message += `🎂 Mini Cakes\n`;
        message += `• Flavour: ${quoteRequest.products.miniCakes.flavour}\n`;
        message += `• Quantity: ${quoteRequest.products.miniCakes.quantity}\n\n`;
    }

    if (quoteRequest.products.cookies.selected) {
        message += `🍪 Gourmet Cookies\n`;
        message += `• Flavour: ${quoteRequest.products.cookies.flavour}\n`;
        message += `• Quantity: ${quoteRequest.products.cookies.quantity}\n\n`;
    }

    message += `*Design Request*\n`;
    message += `${quoteRequest.design}`;

    const phoneNumber = "27813315267";

    window.open(
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
        "_blank"
    );
}

submitButton.addEventListener("click", async () => {
    const existingOrderNumber = localStorage.getItem("quoteOrderNumber");

    if (existingOrderNumber) {
        openWhatsApp(existingOrderNumber);
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Creating your order...";

    try {
        const response = await fetch("https://felicia-bakes-backend.onrender.com/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(buildOrderPayload())
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Could not create your order.");
        }

        localStorage.setItem("quoteOrderNumber", data.orderNumber);
        orderConfirmation.hidden = false;
        orderConfirmation.innerHTML = `<p><strong>Your tracking number is ${data.orderNumber}.</strong></p><p>Please save it to track your order.</p>`;
        submitButton.textContent = "Open WhatsApp with Order Number";
        submitButton.disabled = false;
        openWhatsApp(data.orderNumber);
    } catch (error) {
        console.error(error);
        orderConfirmation.hidden = false;
        orderConfirmation.textContent = "We could not create your order. Please try again.";
        submitButton.textContent = "Send Quote Request via WhatsApp";
        submitButton.disabled = false;
    }

});
