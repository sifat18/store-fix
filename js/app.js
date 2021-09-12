// product loadfunction 
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
// calling loadfunction
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  // looping over the array
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    // correcting the image variable
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    // adding data to the div
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src='${image}'></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>

<p><span class='fw-3 fs-3'>${product.rating.rate}</span>${product.rating.rate < 2.5 ? `<i class="fas fa-star-half-alt gold"></i>` : `<i class="fas fa-star gold"></i>`} <span class="totalVoted "><i class="fas me-2 fa-user-check"></i>${product.rating.count}</span> </p>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="showDetails(${product.id})" id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;

// main cart function for updating
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  // to calculate total we need to call the update total function
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

// function for loading clicked product info
const showDetails = id => {
  console.log('inside showdetail');
  const productUrl = `https://fakestoreapi.com/products/${id}`;
  fetch(productUrl)
    .then(res => res.json())
    .then(data => displayModal(data))
}
// function for displaying data in a modal
const displayModal = data => {
  console.log('inside modal');
  const modalwrap = document.createElement('div');
  modalwrap.innerHTML = `<div class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">${data.title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p class="text-black">${data.description}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>`;
  document.body.append(modalwrap);
  let modal = new bootstrap.Modal(modalwrap.querySelector('.modal'));
  modal.show();

}
// getting id
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
