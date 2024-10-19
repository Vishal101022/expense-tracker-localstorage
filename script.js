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
    const response = await axios.post();
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
    const response = await axios.get();
    for (let i = 0; i < response.data.length; i++) {
      displayDataOnScreen(response.data[i]);
    }
  } catch (error) {
    console.log("Error:", error.message);
  }
});

function displayDataOnScreen(expenseData) {
  const list = document.createElement("li");
  list.appendChild(
    document.createTextNode(
      `${expenseData.amount}    ${expenseData.description}    ${expenseData.category}`
    )
  );
  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  list.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  list.appendChild(editBtn);

  const expenseList = document.querySelector("ul");
  expenseList.appendChild(list);

  deleteBtn.addEventListener("click", (event) => {
    handleDelete(event, expenseList, expenseData);
  });

  editBtn.addEventListener("click", (event) => {
    document.getElementById("amount").value = expenseData.amount;
    document.getElementById("description").value = expenseData.description;
    document.getElementById("category").value = expenseData.category;
    expenseList.removeChild(event.target.parentElement);
    // Handle the edit submission
    const submitBtn = document.querySelector("form button");
    submitBtn.innerText = "Update";

    submitBtn.onclick = (event) => {
      event.preventDefault();
      expenseData.amount = document.getElementById("amount").value;
      expenseData.description = document.getElementById("description").value;
      expenseData.category = document.getElementById("category").value;

      handleEdit(expenseData);
      submitBtn.innerText = "Submit";
      document.getElementById("amount").value = "";
      document.getElementById("description").value = "";
      document.getElementById("category").value = "";

      displayDataOnScreen(expenseData);
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
    const response = await axios.patch(``, {
      amount: expenseData.amount,
      description: expenseData.description,
      category: expenseData.category,
    });
    console.log(response);
  } catch (error) {
    console.log("Error: ", error.message);
  }
}

// delete api
async function deleteData(expenseData) {
  console.log("inside delete api");
  try {
    const response = await axios.delete(``);
    console.log(response);
  } catch (error) {
    console.log("Error:", error.message);
  }
}
