// /api/getOffers.js
module.exports = async function (context, req) {
  const offers = [
    { bank: "HDFC", card: "Millennia Credit Card", reward: "5% cashback on Amazon & Flipkart" },
    { bank: "ICICI", card: "Coral Credit Card", reward: "2x reward points on dining & groceries" },
    { bank: "SBI", card: "SimplyCLICK", reward: "10x rewards on online shopping" },
  ];

  context.res = {
    status: 200,
    headers: { "Content-Type": "application/json" },
    body: offers
  };
};
