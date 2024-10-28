
// get api
window.addEventListener("DOMContentLoaded", async () => {
  try {
    console.log("inside get api");
    const token= localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/api/expenses", {
      headers: {
        Authorization: `${token}`,
    }});
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
    openModal(expenseData, "Update");
    itemsContainer.removeChild(event.target.parentElement);
  }
   
  );
}

// Function to open and set up the modal for "Add" or "Update"
function openModal(expenseData, mode) {
  const modal = document.querySelector(".modal");
  const submitBtn = document.querySelector(".addExpenseBtn");

  if (mode === "Update") {
    document.getElementById("amount").value = expenseData.amount;
    document.getElementById("description").value = expenseData.description;
    document.getElementById("category").value = expenseData.category;
    submitBtn.innerText = "Update";

    submitBtn.onclick = (event) => {
      event.preventDefault();
      expenseData.amount = document.getElementById("amount").value;
      expenseData.description = document.getElementById("description").value;
      expenseData.category = document.getElementById("category").value;

      handleEdit(expenseData);
      closeModal(expenseData);
      displayDataOnScreen(expenseData);
    };
  } else {
    submitBtn.onclick = handleAddExpense;
  }
  modal.style.display = "block";
}

// Function to close and reset the modal
function closeModal(expenseData) {
  const modal = document.querySelector(".modal");
  const submitBtn = document.querySelector(".addExpenseBtn");

  modal.style.display = "none";
  document.getElementById("amount").value = "";
  document.getElementById("description").value = "";
  document.getElementById("category").value = "";

  // Remove any existing event listeners on submitBtn
  submitBtn.onclick = null;
  submitBtn.innerText = "Add Expense";
}

// Close modal when clicking outside or on the close button
document.addEventListener("DOMContentLoaded", modal);
function modal() {
  const modal = document.querySelector(".modal");
  const btn = document.querySelector(".openModal");
  const span = document.querySelector(".close");

  btn.onclick = function () {
    // Open modal in Add mode
    openModal({}, "Add");
  };

  span.onclick = function () {
    closeModal();
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      closeModal();
    }
  };
}

// Function to handle adding a new expense
function handleAddExpense(event) {
  event.preventDefault();
  const expenseData = {
    amount: document.getElementById("amount").value,
    description: document.getElementById("description").value,
    category: document.getElementById("category").value,
  };

  handleSaveExpense(expenseData);
  displayDataOnScreen(expenseData);
  closeModal();
}

async function handleDelete(event, unorderList, expenseData) {
  unorderList.removeChild(event.target.parentElement);
  deleteData(expenseData);
}

 //axios post api
async function handleSaveExpense(expenseData) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:3000/api/expense",
      expenseData,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    console.log(response);
  } catch (err) {
    console.log("Error:", err.message);
  }

  // reload the page
  //window.location.reload();
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


