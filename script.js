document.addEventListener("DOMContentLoaded", () => {
    const apiUrl =
      "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889";
  
    const cartItemsContainer = document.getElementById("cart-items");
    const cartSubtotal = document.getElementById("cart-subtotal");
    const cartTotal = document.getElementById("cart-total");
  
    let cartData = [];
  
    // Fetch Cart Data
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        cartData = data.items;
  
        // Render Cart Items
        renderCartItems(cartData);
  
        // Set Initial Totals
        updateTotals(cartData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  
    // Render Cart Items
    function renderCartItems(items) {
        cartItemsContainer.innerHTML = items
          .map((item) => {
            return `
              <tr>
                <td>
                  <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: cover;">
                  <p>${item.title}</p>
                </td>
                <td>₹${(item.price / 100).toFixed(2)}</td> <!-- No change here -->
                <td>
                  <input 
                    type="number" 
                    value="${item.quantity}" 
                    min="1" 
                    class="quantity-input" 
                    data-id="${item.id}">
                </td>
                <td>₹<span class="line-price" data-id="${item.id}">${(item.line_price / 100).toFixed(2)}</span></td> <!-- No change here -->
                <td>
                  <button class="remove-btn" data-id="${item.id}">Remove</button>
                </td>
              </tr>`;
          })
          .join("");
  
      // Attach Event Listeners for Quantity Inputs
      document.querySelectorAll(".quantity-input").forEach((input) => {
        input.addEventListener("input", (e) => {
          const itemId = parseInt(e.target.dataset.id);
          const newQuantity = parseInt(e.target.value);
          updateItemQuantity(itemId, newQuantity);
        });
      });
  
      // Attach Event Listeners for Remove Buttons
      document.querySelectorAll(".remove-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
          const itemId = parseInt(e.target.dataset.id);
          removeItem(itemId);
        });
      });
    }
  
    // Update Item Quantity
    function updateItemQuantity(itemId, newQuantity) {
      const item = cartData.find((item) => item.id === itemId);
      if (item) {
        item.quantity = newQuantity;
        item.line_price = item.price * newQuantity;
      }
  
      renderCartItems(cartData);
      updateTotals(cartData);
    }
  
    // Remove Item
    function removeItem(itemId) {
      cartData = cartData.filter((item) => item.id !== itemId);
  
      renderCartItems(cartData);
      updateTotals(cartData);
    }
  
    // Update Totals
    function updateTotals(items) {
        const subtotal = items.reduce((sum, item) => sum + item.line_price, 0);
        const total = subtotal; // Assuming no additional taxes or discounts
      
        // Update totals, remove the division by 100 since values are already in rupees
        cartSubtotal.textContent = `₹${(subtotal / 100).toFixed(2)}`;
        cartTotal.textContent = `₹${(total / 100).toFixed(2)}`;
      }

  });

  //Toggle the menu on mobile
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}

  