let current_viewing_productId = "";

document.querySelectorAll('.product-slot').forEach(div => {
  const id = div.dataset.productId;
  const product = shopItems[id];
  if (!product) return;

  div.className = "col-md-4 d-flex";
  div.innerHTML = `
  <button class="product-button card-button border-0 bg-white rounded-4 shadow-sm w-100 p-0 hover-rise d-flex flex-column h-100" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    <!-- Image/Header -->
    <div class="position-relative w-100 bg-primary rounded-top-4" style="height: 200px;">
      <img src="${product.image}" class="w-100 h-100 object-fit-cover" alt="Item image" />
      <div class="position-absolute top-0 start-0 w-100 h-100 gradient-overlay rounded-top-4"></div>
    </div>
    
    <!-- Content Area -->
    <div class="text-start p-4 bg-light rounded-bottom-4 flex-grow-1 d-flex flex-column justify-content-between">
      <div>
        <h5 class="mb-1 fw-semibold">${product.name}</h5>
        <p class="mb-2 text-muted small">${product.description}</p>
      </div>
      <div class="btn btn-dark rounded-pill px-4 py-1 fw-bold mt-auto">₱${product.price.toFixed(2).toLocaleString()}</div>
    </div>

  </button>
  `;

  const button = div.querySelector('.product-button');
  button.addEventListener('click', () => {
    set_product_page(id);
    current_viewing_productId = id
  });
});

function set_product_page(productId) {
    console.log(productId)
  const product = shopItems[productId];
  if (!product) {
    console.error("Product not found:", productId);
    return;
  }

  // Change text content
  const nameEl = document.getElementById("product-name");
  const descEl = document.getElementById("product-description");
  const priceEl = document.getElementById("product-price");
  const imgEl = document.getElementById("product-image");

  if (nameEl) nameEl.textContent = product.name;
  if (descEl) descEl.textContent = product.description;
  if (priceEl) priceEl.textContent = "₱" + product.price.toFixed(2).toLocaleString()
  if (imgEl) imgEl.src = product.image;
}

function showAddToCartToast() {
  const toastEl = document.getElementById('cartToast');
  const toast = new bootstrap.Toast(toastEl, { delay: 4000 }); // disappears after 2 seconds
  toast.show();

  updateCart("add", current_viewing_productId)
}