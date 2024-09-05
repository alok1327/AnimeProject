// Simple example to handle "Add to Cart" button clicks
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.add-to-cart');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Item added to cart!');
        });
    });
});
