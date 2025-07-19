let cart = JSON.parse(localStorage.getItem("cart")) || {};

function createCartItemBlock(productId, quantity) {
  const itemBlock = document.createElement("div");
  itemBlock.className = "item-row d-flex align-items-center p-3 mb-3";

  console.log(quantity.quantity);
  itemBlock.innerHTML = `
    <div class="item-image-container me-3">
    <img src="" alt="${shopItems[productId].name || 'Product Name'}" class="item-thumb" />
    </div>
    <div class="item-details flex-grow-1">
        <p class="item-name">${shopItems[productId].name || 'Product Name'}</p>
        <p class="item-quantity">X${quantity} items</p>
    </div>
    <div class="item-price">₱${(shopItems[productId].price * quantity).toLocaleString()}</div>
  `;

  return itemBlock;
}

function updateCartUI() {
    console.log("hi")
    const container = document.getElementById("cart-items");
    container.innerHTML = ""; // Clear existing items
    
    let total_cost = 0.0;

    if (Object.keys(cart).length === 0) {
        container.innerHTML = `<div class="text-center text-muted">Your cart is empty.</div>`;
        return;
    }else{
        for (const [productId, quantity] of Object.entries(cart)) {
            console.log(productId, quantity);
            const itemElement = createCartItemBlock(productId, quantity);
            container.appendChild(itemElement);
            total_cost += shopItems[productId].price * quantity
        }
    }

    const subtotal_container = document.getElementById("cart-subtotal");
    subtotal_container.innerText = "₱" + total_cost.toFixed(2).toLocaleString()
    const vat_container = document.getElementById("cart-vat");
    vat_container.innerText = "₱" + (total_cost * 0.012).toFixed(2).toLocaleString()
    const total_container = document.getElementById("cart-total");
    total_container.innerText = "₱" + ((total_cost * 0.012) + total_cost).toFixed(2).toLocaleString()
}


updateCartUI()