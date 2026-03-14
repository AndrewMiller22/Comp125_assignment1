const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let currentMonth = 0; // January
let currentYear = 2026;

const orders = [
  { day: 2, month: 0, year: 2026, meal: "Burger Combo", price: 12.99, customer: "Andrew", type: "Take-away" },
  { day: 4, month: 0, year: 2026, meal: "Chicken Alfredo", price: 15.50, customer: "Sarah", type: "Eat-in" },
  { day: 7, month: 0, year: 2026, meal: "Caesar Salad", price: 9.25, customer: "Michael", type: "Take-away" },
  { day: 10, month: 0, year: 2026, meal: "Pepperoni Pizza", price: 18.00, customer: "Jessica", type: "Eat-in" },
  { day: 14, month: 0, year: 2026, meal: "Tacos", price: 11.75, customer: "David", type: "Take-away" },
  { day: 17, month: 0, year: 2026, meal: "Steak Dinner", price: 24.99, customer: "Emily", type: "Eat-in" },
  { day: 21, month: 0, year: 2026, meal: "Sushi Plate", price: 19.50, customer: "Ryan", type: "Take-away" },
  { day: 25, month: 0, year: 2026, meal: "Pasta Primavera", price: 14.20, customer: "Olivia", type: "Eat-in" },
  { day: 28, month: 0, year: 2026, meal: "Grilled Salmon", price: 22.00, customer: "Noah", type: "Take-away" }
];

function renderCalendar(month, year) {
  const calendarBody = document.getElementById("calendarBody");
  const monthYear = document.getElementById("monthYear");

  calendarBody.innerHTML = "";
  monthYear.textContent = `${monthNames[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let date = 1;

  for (let row = 0; row < 6; row++) {
    const tr = document.createElement("tr");

    for (let col = 0; col < 7; col++) {
      const td = document.createElement("td");

      if (row === 0 && col < firstDay) {
        td.classList.add("empty-day");
      } else if (date > daysInMonth) {
        td.classList.add("empty-day");
      } else {
        let dayContent = `<span class="day-number">${date}</span>`;

        const dayOrders = orders.filter(order =>
          order.day === date &&
          order.month === month &&
          order.year === year
        );

        dayOrders.forEach(order => {
          dayContent += `
            <div class="order-card">
              <strong>${order.type}</strong><br>
              (${order.customer})<br>
              ${order.meal}<br>
              $${order.price.toFixed(2)}
            </div>
          `;
        });

        td.innerHTML = dayContent;
        date++;
      }

      tr.appendChild(td);
    }

    calendarBody.appendChild(tr);

    if (date > daysInMonth) {
      break;
    }
  }
}

renderCalendar(currentMonth, currentYear);
