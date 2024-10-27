async function handleFormSubmit(event) {
  event.preventDefault();

  const expenseData = {
    amount: event.target.amount.value,
    description: event.target.description.value,
    category: event.target.category.value,
  };

  //axios post api
  try {
    console.log("inside post api");
    const response = await axios.post(
      "http://localhost:3000/api/expense",
      expenseData
    );
    console.log(response);
  } catch (err) {
    console.log("Error:", err.message);
  }

  // reset form fields
  document.getElementById("amount").value = "";
  document.getElementById("description").value = "";
  document.getElementById("category").value = "Select Category";

  // reload the page
  window.location.reload();
}

// get api
window.addEventListener("DOMContentLoaded", async () => {
  try {
    console.log("inside get api");
    const response = await axios.get("http://localhost:3000/api/expenses");
    for (let i = 0; i < response.data.length; i++) {
      displayDataOnScreen(response.data[i]);
    }
  } catch (error) {
    console.log("Error:", error.message);
  }
});

function displayDataOnScreen(expenseData) {
  const itemsContainer = document.querySelector(".items");

  // Create a new item div
  const itemDiv = document.createElement("div");
  itemDiv.classList.add("item");

  // Create span for description
  const descriptionSpan = document.createElement("span");
  descriptionSpan.classList.add("item-description");
  descriptionSpan.textContent = expenseData.description;
  itemDiv.appendChild(descriptionSpan);

  // Create span for category
  const categorySpan = document.createElement("span");
  categorySpan.classList.add("item-category");
  categorySpan.textContent = expenseData.category;
  itemDiv.appendChild(categorySpan);

  // Create span for amount
  const amountSpan = document.createElement("span");
  amountSpan.classList.add("item-amount");
  amountSpan.textContent = `₹${parseFloat(expenseData.amount).toFixed(2)}`;
  itemDiv.appendChild(amountSpan);

  // Create and append Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  itemDiv.appendChild(deleteBtn);

  // Create and append Edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  itemDiv.appendChild(editBtn);

  // Append the itemDiv to the items container
  itemsContainer.appendChild(itemDiv);

  deleteBtn.addEventListener("click", (event) => {
    handleDelete(event, itemsContainer, expenseData);
  });

  editBtn.addEventListener("click", (event) => {
    document.getElementById("amount").value = expenseData.amount;
    document.getElementById("description").value = expenseData.description;
    document.getElementById("category").value = expenseData.category;

    // Show the modal
    const modal = document.querySelector(".modal");
    modal.style.display = "block";

    // Handle the edit submission
    const submitBtn = document.querySelector("form button");
    submitBtn.innerText = "Update";

    submitBtn.onclick = (event) => {
      event.preventDefault();
      expenseData.amount = document.getElementById("amount").value;
      expenseData.description = document.getElementById("description").value;
      expenseData.category = document.getElementById("category").value;

      handleEdit(expenseData);
      submitBtn.innerText = "Add Expense";
      document.getElementById("amount").value = "";
      document.getElementById("description").value = "";
      document.getElementById("category").value = "";

      modal.style.display = "none";
      window.location.reload();
    };
  
  });
}


async function handleDelete(event, unorderList, expenseData) {
  unorderList.removeChild(event.target.parentElement);
  deleteData(expenseData);
}

// update api
async function handleEdit(expenseData) {
  console.log("inside edit api");
  try {
    const response = await axios.patch(
      `http://localhost:3000/api/expense/${expenseData.id}`,
      {
        amount: expenseData.amount,
        description: expenseData.description,
        category: expenseData.category,
      }
    );
    console.log(response);
  } catch (error) {
    console.log("Error: ", error.message);
  }
}

// delete api
async function deleteData(expenseData) {
  console.log("inside delete api");
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/expense/${expenseData.id}`
    );
    console.log(response);
  } catch (error) {
    console.log("Error:", error.message);
  }
}

// open modal
document.addEventListener("DOMContentLoaded", modal);
// function to operate modal
function modal() {
  var modal = document.querySelector(".modal");
  var btn = document.querySelector(".openModal");
  var span = document.querySelector(".close");
  btn.onclick = function () {
    // reset form fields
    const submitBtn = document.querySelector("form button");
    submitBtn.innerText = "Add Expense";

    document.getElementById("amount").value = "";
    document.getElementById("description").value = "";
    document.getElementById("category").value = "Select Category";
    modal.style.display = "block";
  };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
