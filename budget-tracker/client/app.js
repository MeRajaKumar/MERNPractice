// frontend app logic
const API_URL = "http://localhost:5000/api/expenses";

document.getElementById("expenseForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const amount = document.getElementById("amount").value;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, amount })
  });

  const data = await res.json();
  console.log("Added:", data);
  loadExpenses();
});

async function loadExpenses() {
  const res = await fetch(API_URL);
  const expenses = await res.json();

  const list = document.getElementById("expenseList");
  list.innerHTML = "";
  expenses.forEach(exp => {
    const li = document.createElement("li");
    li.textContent = `${exp.title} - ₹${exp.amount}`;
    list.appendChild(li);
  });
}

// initial load
loadExpenses();
