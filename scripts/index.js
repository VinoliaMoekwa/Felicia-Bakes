//Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggle-button');
  const navbarLinks = document.getElementById('navbar-links');

  toggleButton.addEventListener('click', () => {
      navbarLinks.classList.toggle('active');
  });
  document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-button');
    const navbarLinks = document.getElementById('navbar-links');
  
    toggleButton.addEventListener('click', () => {
        navbarLinks.classList.toggle('active');
    });
  
    // Check if elements exist before accessing them to avoid errors
    if (document.getElementById("submitOrder")) {
        document.getElementById("submitOrder").addEventListener("click", function (event) {
            event.preventDefault(); // Prevent form submission
  
            // Get values from input fields
            let name = document.getElementById("full-name").value;
            let email = document.getElementById("email").value;
            let order = document.getElementById("orderDetails").value;
  
            if (!name || !email || !order) {
                alert("Please fill in all the fields.");
                return;
            }
  
            // Save order details to localStorage
            let orderInfo = { name, email, order };
            localStorage.setItem("orderInfo", JSON.stringify(orderInfo));
  
            // Redirect to the contact page
            window.location.href = "contact.html"; // Ensure this file exists
        });
    }
  
    if (document.getElementById("sendWhatsapp")) {
        let orderInfo = JSON.parse(localStorage.getItem("orderInfo") || "{}");
  
        document.getElementById("full-name").textContent = orderInfo.name || "Not provided";
        document.getElementById("email").textContent = orderInfo.email || "Not provided";
        document.getElementById("orderDetails").textContent = orderInfo.order || "No order found";
  
        document.getElementById("sendWhatsapp").addEventListener("click", function () {
            let phoneNumber = "0678405150";
            let message = `Hello, my name is ${orderInfo.name}.\n\nEmail: ${orderInfo.email}\n\nOrder Details:\n${orderInfo.order}`;
            window.location.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        });
    }
  });
});

  