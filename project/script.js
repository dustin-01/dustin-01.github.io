let cart = JSON.parse(localStorage.getItem("cart")) || {};

function createCartItemBlock(productId, quantity) {
  const itemBlock = document.createElement("div");
  itemBlock.className = "d-flex gap-3 align-items-center mb-4";

  console.log(quantity.quantity);
  itemBlock.innerHTML = `
            <!-- Image -->
            <div class="cart-image">
              <img
                src="${shopItems[productId].image || 'https://placehold.co/400'}"
                alt="${shopItems[productId].name || 'Product Name'}"
                class="img-fluid rounded"
                style="object-fit: cover; width: 100%; height: 100%"
              />
            </div>

            <!-- Text -->
            <div class="flex-grow-1">
              <div class="fw-semibold">${shopItems[productId].name || 'Product Name'}</div>
              <div class="text-muted small">Qty: ${quantity}</div>
              <div class="fw-bold mt-1">₱${(shopItems[productId].price).toLocaleString()} (₱${(shopItems[productId].price * quantity).toLocaleString()})</div>
            </div>

            <div class="">
              <div style="width: 110px">
                <div class="input-group">
                  <button
                    class="btn btn-outline-secondary btn-sm remove-qty"
                    type="button"
                    data-product-id="${productId}"
                  >
                    ${quantity === 1 ? "x" : "-"}
                  </button>
                  <input
                    type="text"
                    class="form-control form-control-sm text-center"
                    value="${quantity}"
                    readonly
                  />
                  <button
                    class="btn btn-outline-secondary btn-sm add-qty"
                    type="button"
                    data-product-id="${productId}"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
  `;

//   itemBlock.innerHTML = `
//     <div style="width: 80px; aspect-ratio: 1; flex-shrink: 0;">
//       <img
//         src="${product.image || 'https://placehold.co/400'}"
//         alt="${product.name || 'Product Name'}"
//         class="img-fluid rounded"
//         style="object-fit: cover; width: 100%; height: 100%;"
//       />
//     </div>

//     <div class="flex-grow-1">
//       <div class="fw-semibold">${product.name || 'Product Name Not Found'}</div>
//       <div class="text-muted small">Qty: ${product.quantity}</div>
//       <div class="fw-bold mt-1">₱${(product.price * product.quantity).toLocaleString()}</div>
//     </div>
//   `;

  return itemBlock;
}

function updateCartUI() {
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

    const summary_container = document.getElementById("cart-total");
    summary_container.innerText = "₱" + total_cost.toFixed(2).toLocaleString()
}

function onCartChange() {
  console.log("Cart changed:", cart);

  updateCartUI();
  // updateCartUI();
  // recalculateTotal();
}

function updateCart(action, productId) {
  switch (action) {
    case "add":
      if (cart[productId]) {
        cart[productId] += 1;
      } else {
        cart[productId] = 1;
      }
      break;

    case "remove":
      if (cart[productId]) {
        cart[productId] -= 1;
        if (cart[productId] <= 0) delete cart[productId];
      }
      break;

    case "delete":
      delete cart[productId];
      break;

    case "set":
      cart[productId] = { ...productDetails };
      break;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  onCartChange();
}

function viewCart() {
    console.table(cart);
}


window.addEventListener("load", () => 
    {
        cart = JSON.parse(localStorage.getItem("cart")) || {};
        console.log("hi");

        updateCartUI();
    }
);

document.getElementById("cart-items").addEventListener("click", function (e) {
     const productId = e.target.dataset.productId;

    if (!productId) return;

    if (e.target.classList.contains("add-qty")) {
        updateCart("add", productId);
    }

    if (e.target.classList.contains("remove-qty")) {
        updateCart("remove", productId);
    }

    updateCartUI();
});