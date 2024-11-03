function filterProducts(category, event) {
    // Hide all products
    var products = document.querySelectorAll('.grid-item');
    products.forEach(function(product) {
        product.classList.add('hidden');
    });

    // Show selected category products
    var selectedProducts = document.querySelectorAll('.' + category);
    selectedProducts.forEach(function(product) {
        product.classList.remove('hidden');
    });

    // Highlight the selected button
    var buttons = document.querySelectorAll('.sidebar ul li button');
    buttons.forEach(function(button) {
        button.classList.remove('active');
    });

    // Add active class to the clicked button
    event.currentTarget.classList.add('active');
    }
    // Get all dropdown contents
    function toggleDropdown(dropdownId) {
    var dropdown = document.getElementById(dropdownId);
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "block";
    }
}
