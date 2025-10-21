const API_URL = "/api/getOffersSupabase";
const container = document.getElementById("cardContainer");
const sortSelect = document.getElementById("sortSelect");
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");

let allCards = [];

async function fetchCards() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    allCards = Array.isArray(data) ? data : [];
    renderCards(allCards);
  } catch (err) {
    console.error("Error fetching data:", err);
    container.innerHTML = `<p style="text-align:center;">⚠️ Could not load offers</p>`;
  }
}

function renderCards(cards) {
  if (!cards.length) {
    container.innerHTML = `<p style="text-align:center;">No matching cards found</p>`;
    return;
  }

  container.innerHTML = cards
    .map(
      (card) => `
    <div class="card">
      <h2>${card.card_name}</h2>
      <div class="bank">${card.bank_name}</div>
      <div class="tags">
        <span class="tag">${card.card_type}</span>
        ${card.cashback_percent ? `<span class="tag">${card.cashback_percent}% Cashback</span>` : ""}
      </div>
      <p><b>Joining Fee:</b> ₹${card.joining_fee}</p>
      <p><b>Annual Fee:</b> ₹${card.annual_fee}</p>
      <p><b>Rewards:</b> ${card.reward_points}</p>
      <p><b>Welcome Offer:</b> ${card.welcome_offer}</p>
    </div>`
    )
    .join("");
}

// 🔍 Search, filter, and sort
function applyFilters() {
  const searchVal = searchInput.value.toLowerCase();
  const typeVal = typeFilter.value;
  const sortVal = sortSelect.value;

  let filtered = [...allCards];

  if (searchVal) {
    filtered = filtered.filter(
      (c) =>
        c.card_name?.toLowerCase().includes(searchVal) ||
        c.bank_name?.toLowerCase().includes(searchVal)
    );
  }

  if (typeVal) {
    filtered = filtered.filter((c) => c.card_type === typeVal);
  }

  if (sortVal) {
    filtered.sort((a, b) => (a[sortVal] || 0) - (b[sortVal] || 0));
  }

  renderCards(filtered);
}

// Event listeners
[searchInput, typeFilter, sortSelect].forEach((el) =>
  el.addEventListener("input", applyFilters)
);

fetchCards();
