const cards = [
  {
    name: "TravelPlus Platinum",
    rewards: "3x on travel, 2x on dining",
    fee: "$95",
    type: "travel"
  },
  {
    name: "ShopSmart Cashback",
    rewards: "5% on groceries, 1% on others",
    fee: "$0",
    type: "cashback"
  },
  {
    name: "Elite Rewards Gold",
    rewards: "2x on all purchases",
    fee: "$75",
    type: "general"
  }
];

function renderTable(filter = "all") {
  const tbody = document.querySelector("#cardTable tbody");
  tbody.innerHTML = "";

  const filtered = filter === "all" ? cards : cards.filter(c => c.type === filter);

  filtered.forEach(card => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${card.name}</td>
      <td>${card.rewards}</td>
      <td>${card.fee}</td>
      <td>${card.type.charAt(0).toUpperCase() + card.type.slice(1)}</td>
    `;
    tbody.appendChild(row);
  });
}

function sortTable(colIndex) {
  const tbody = document.querySelector("#cardTable tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));
  const sorted = rows.sort((a, b) => {
    const aText = a.children[colIndex].textContent;
    const bText = b.children[colIndex].textContent;
    return aText.localeCompare(bText);
  });
  tbody.innerHTML = "";
  sorted.forEach(row => tbody.appendChild(row));
}

document.getElementById("filter").addEventListener("change", e => {
  renderTable(e.target.value);
});

renderTable();