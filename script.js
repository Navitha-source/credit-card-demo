const API_URL = "/api/getOffersSupabase";
const container = document.getElementById("cardContainer");
const sortSelect = document.getElementById("sortSelect");
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
const modal = document.getElementById("cardModal");
const modalDetails = document.getElementById("modalDetails");
const closeBtn = document.querySelector(".close");

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

function renderCards() {
  const container = document.getElementById("cards-container");
  container.innerHTML = "";

  cards.forEach((card, index) => {
    const div = document.createElement("div");
    div.className = "card";
    div.setAttribute("data-bank", card.bank_name);

    div.innerHTML = `
      <div class="bank-header">
        <img src="${card.logo_url || 'https://via.placeholder.com/60'}" alt="${card.bank_name}" class="bank-logo"/>
        <div>
          <h2 class="card-name">${card.card_name}</h2>
          <p class="bank">${card.bank_name}</p>
        </div>
      </div>

      <p><strong>Type:</strong> ${card.card_type || 'Credit Card'}</p>
      <p><strong>Annual Fee:</strong> ₹${card.annual_fee || '0'}</p>
      <p><strong>Rewards:</strong> ${card.rewards || '—'}</p>

      <button class="apply-btn" onclick="openModal(${index})">Apply Now</button>
    `;

    container.appendChild(div);
  });
}

function openModal(index) {
  const card = allCards[index];
  modalDetails.innerHTML = `
    <h2>${card.card_name}</h2>
    <h4>${card.bank_name}</h4>
    <p><b>Type:</b> ${card.card_type}</p>
    <p><b>Annual Fee:</b> ₹${card.annual_fee}</p>
    <p><b>Joining Fee:</b> ₹${card.joining_fee}</p>
    <p><b>Cashback:</b> ${card.cashback_percent || "N/A"}%</p>
    <p><b>Rewards:</b> ${card.reward_points}</p>
    <p><b>Welcome Offer:</b> ${card.welcome_offer}</p>
    <p><b>Benefits:</b> ${card.benefits || "Not available"}</p>
    <a href="${card.apply_link || '#'}" target="_blank">
      <button class="apply-btn">Apply Now</button>
    </a>
  `;
  modal.classList.remove("hidden");
}

// Close modal logic
closeBtn.onclick = () => modal.classList.add("hidden");
window.onclick = (e) => {
  if (e.target === modal) modal.classList.add("hidden");
};

// Filters
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

[searchInput, typeFilter, sortSelect].forEach((el) =>
  el.addEventListener("input", applyFilters)
);

fetchCards();

