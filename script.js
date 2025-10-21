const API_URL = "/api/getOffersSupabase";
const container = document.getElementById("cardContainer");
const sortSelect = document.getElementById("sortSelect");

async function fetchCards() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    if (!Array.isArray(data)) {
      container.innerHTML = `<p>Error: API did not return a list</p>`;
      console.error("Invalid data format", data);
      return;
    }

    window.cardData = data;
    renderCards(data);
  } catch (err) {
    container.innerHTML = `<p>Failed to load data</p>`;
    console.error(err);
  }
}

function renderCards(cards) {
  container.innerHTML = cards
    .map(
      (card) => `
      <div class="card">
        <h2>${card.card_name || "Unknown Card"}</h2>
        <p><b>Bank:</b> ${card.bank_name}</p>
        <p><b>Type:</b> ${card.card_type}</p>
        <p><b>Joining Fee:</b> ₹${card.joining_fee}</p>
        <p><b>Annual Fee:</b> ₹${card.annual_fee}</p>
        <p><b>Cashback:</b> ${card.cashback_percent}%</p>
        <p><b>Rewards:</b> ${card.reward_points}</p>
        <p><b>Welcome Offer:</b> ${card.welcome_offer}</p>
      </div>
    `
    )
    .join("");
}

sortSelect.addEventListener("change", (e) => {
  const field = e.target.value;
  const sorted = [...window.cardData].sort((a, b) => a[field] - b[field]);
  renderCards(sorted);
});

fetchCards();
