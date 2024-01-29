function reload() {
  fetch(new Request("http://localhost:8080/api/crud/getAll"), {
    method: "POST",
  }).then((res) => res.json())
    .then(fillItemsTable);
}

reload();

function fillItemsTable(items) {
  const tableBody =
    document.getElementById("itemsTable").getElementsByTagName("tbody")[0];
  tableBody.innerHTML = ""; // Clear existing content

  items.forEach((item) => {
    let row = tableBody.insertRow();
    let idCell = row.insertCell(0);
    let nameCell = row.insertCell(1);
    let priceCell = row.insertCell(2);
    let actionCell = row.insertCell(3);

    idCell.textContent = item.id;
    nameCell.textContent = item.name;
    priceCell.textContent = `$${item.price.toFixed(2)}`;

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteItem(item.id, actionCell, deleteButton);
    actionCell.removeChild;
    actionCell.appendChild(deleteButton);
  });
}

// Function to show update form with item details
function showUpdateForm(itemId, itemName, itemPrice) {
  document.getElementById("updateItemId").value = itemId;
  document.getElementById("updateItemName").value = itemName;
  document.getElementById("updateItemPrice").value = itemPrice;
  document.getElementById("addItemForm").style.display = "none";
}

// Function to handle item deletion
// a hard reload, not as fast as it should but it does the job
function deleteItem(itemId) {
  if (confirm("Are you sure you want to delete this item?")) {
    fetch(
      new Request(`http://localhost:8080/api/crud/delete/${itemId}`, {
        method: "POST",
      }),
    )
      .then(() => reload());
  }
}


