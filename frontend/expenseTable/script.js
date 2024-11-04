
const token = localStorage.getItem("token");
async function fetchExpenses() {
  try {
    const response = await axios.get("http://localhost:3000/expenses", {
      headers: {
        Authorization: `${token}`,
      },
    });
    const userResponse = await axios.get("http://localhost:3000/users", {
      headers: {
        Authorization: `${token}`,
      },
    });
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";

    response.data.forEach((expense) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${expense.date}</td>
        <td>${expense.description}</td>
        <td>${expense.category}</td>
        <td>${expense.amount || "-"}</td>

      `;
      tableBody.appendChild(row);
    });

    const { totalincome, totalexpense } = userResponse.data;
    const savings = totalincome - totalexpense;

    document.getElementById("total-income").innerText = `₹ ${totalincome.toFixed(2)}`;
    document.getElementById("total-expense").innerText = `₹ ${totalexpense.toFixed(2)}`;
    document.getElementById("savings").innerText = `₹ ${savings.toFixed(2)}`;
  } catch (error) {
    console.error("Error fetching expenses:", error);
  }
}

// Download table data as CSV
function downloadCSV() {
  const table = document.getElementById("expense-table");
  let csv = [];

  for (let row of table.rows) {
    let rowData = [];
    for (let cell of row.cells) {
      rowData.push(cell.innerText);
    }
    csv.push(rowData.join(","));
  }

  const csvFile = new Blob([csv.join("\n")], { type: "text/csv" });
  const downloadLink = document.createElement("a");
  downloadLink.download = "expenses.csv";
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

document.getElementById("download-btn").addEventListener("click", downloadCSV);

fetchExpenses();
