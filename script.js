const form = document.querySelector("form");
function handleFormSubmit(event) {
  event.preventDefault();

  const amount = event.target.amount.value;
  const description = event.target.description.value;
  const category = event.target.category.value;
  // reset form fields
  event.target.amount.value = "";
  event.target.description.value = "";
  event.target.category.value = "select category";

  const expenseTracker = {
    amount,
    description,
    category,
  };
  // taken description as key and expenseTracker as value in localStorage
  localStorage.setItem(description, JSON.stringify(expenseTracker));

  let list = document.createElement("li");
  list.textContent = `${amount} - ${description} - ${category}`;
  // create delete btn
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete Expense";
  deleteButton.classList.add("delete-btn");
  list.appendChild(deleteButton);
  deleteButton.addEventListener("click", handleDelete);
  // create edit btn
  const editButton = document.createElement("button");
  editButton.textContent = "Edit Expense";
  editButton.classList.add("edit-btn");
  list.appendChild(editButton);
  editButton.addEventListener("click", handleEdit);

  const unorderList = document.querySelector("ul");
  unorderList.appendChild(list);

  function handleDelete(e) {
    const li = e.target.parentElement;
    unorderList.removeChild(li);
    localStorage.removeItem(description);
  }

  function handleEdit(e) {
    const li = e.target.parentElement;
    const expenseTracker = JSON.parse(localStorage.getItem(description));
    document.querySelector("#amount").value = expenseTracker.amount;
    document.querySelector("#description").value = expenseTracker.description;
    document.querySelector("#category").value = expenseTracker.category;
    unorderList.removeChild(li);
    localStorage.removeItem(expenseTracker.description);
  }
}
