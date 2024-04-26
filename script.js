document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab-btn");

  function sendGetRequest(category) {
      const url = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";
      fetch(url)
          .then(response => response.json())
          .then(data => {
              const productObject = data.categories.find(item => item.category_name === category);
              displayProducts(productObject.category_products);
          })
          .catch(error => {
              console.error("Error fetching data:", error);
          });
  }

  function displayProducts(products) {
      const productListContainer = document.getElementById("productListContainer");
      productListContainer.innerHTML = ""; // Clear previous content

      products.forEach(product => {
          const {
              badge_text,
              image,
              title,
              vendor,
              price,
              compare_at_price
          } = product;

          const discount = Math.round(((compare_at_price - price) / compare_at_price) * 100);

          const productListEl = document.createElement("li");
          productListEl.classList.add("product-item-container");

          productListEl.innerHTML = `
              <div class="product-item-image" style="background-image: url(${image})">
                  <p class="badge ${badge_text ? "" : "d-none"}">${badge_text}</p>
              </div>
              <div class="product-item-details-card">
                  <div class="product-item-card">
                      <h1 class="product-item-title">${title}</h1>
                      <p class="product-item-vendor">${vendor}</p>
                  </div>
                  <div class="price-discount-card">
                      <div class="price-card">
                          <p class="price">Rs. ${price}.00</p>
                          <p class="compare-price">${compare_at_price}.00</p>
                      </div>
                      <p class="discount">${discount}% Off</p>
                  </div>
                  <button class="add-to-cart-button">Add to Cart</button>
              </div>
          `;
          
          productListContainer.appendChild(productListEl);
      });
  }

  tabs.forEach(tab => {
      tab.addEventListener("click", function () {
          const activeTab = document.querySelector(".tab.active-tab-btn");
          activeTab.classList.remove("active-tab-btn");
          this.classList.add("active-tab-btn");

          const category = this.getAttribute("data-tab");
          sendGetRequest(category);
      });
  });

  // Initially load products for the default active tab
  const defaultActiveTab = document.querySelector(".tab.active-tab-btn");
  const defaultCategory = defaultActiveTab.getAttribute("data-tab");
  sendGetRequest(defaultCategory);
});