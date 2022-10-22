// 1. Билеты на событие
const orderArray = [
  {
    id: 1,
    event_id: "003",
    event_date: "2021-08-21 13:00:00",
    ticket_adult_price: 700,
    ticket_adult_quantity: 1,
    ticket_kid_price: 450,
    ticket_kid_quantity: 0,
    barcode: 11111111,
    user_id: 00451,
    equal_price: 700,
    created: "2021-01-11 13:22:09"
  },
  {
    id: 2,
    event_id: "006",
    event_date: "2021-07-29 18:00:00",
    ticket_adult_price: 1000,
    ticket_adult_quantity: 0,
    ticket_kid_price: 800,
    ticket_kid_quantity: 2,
    barcode: 22222222,
    user_id: 00364,
    equal_price: 1600,
    created: "2021-01-12 16:62:08"
  },
  {
    id: 3,
    event_id: "003",
    event_date: "2021-08-15 17:00:00",
    ticket_adult_price: 700,
    ticket_adult_quantity: 4,
    ticket_kid_price: 450,
    ticket_kid_quantity: 3,
    barcode: 33333333,
    user_id: 00015,
    equal_price: 4150,
    created: "2021-01-13 10:08:45"
  },
  {
    id: 4,
    event_id: "004",
    event_date: "2021-08-15 17:00:00",
    ticket_adult_price: 700,
    ticket_adult_quantity: 4,
    ticket_kid_price: 450,
    ticket_kid_quantity: 3,
    barcode: 33333333,
    user_id: 00015,
    equal_price: 4150,
    created: "2021-01-13 10:08:45"
  },
];

const benefitsList = [
  "003",
];

const groupsList = [
  "003",
  "006",
];

function generateBarCode() {
  return Math.floor(Math.random() * 10000000);
}

function createExtraTickets(order) {
  const extraTickets = [];
  let incId = 0;

  if (groupsList.includes(order.event_id)) {
    const groupTicket = {
      ...order,
      id: order.id + "." + ++incId,
      barcode: generateBarCode(),
    }
    extraTickets.push(groupTicket);
  }

  if (benefitsList.includes(order.event_id)) {
    const benefitTicket = {
      ...order,
      id: order.id + "." + ++incId,
      barcode: generateBarCode(),
    }
    extraTickets.push(benefitTicket);
  }

  return extraTickets;
}

function setRowsToTable(orderArray) {
  const tableOrderBody = document.querySelector(".table-order__body");

  orderArray.forEach(obj => {
    const extraTickets = createExtraTickets(obj);

    const tr = document.createElement("tr");
    tr.className = "table-order__row";
    tr.insertAdjacentHTML("beforeend", `
      <td class="table-order__col">${obj.id}</td>
      <td class="table-order__col">${obj.event_id}</td>
      <td class="table-order__col">${obj.event_date}</td>
      <td class="table-order__col">${obj.ticket_adult_price}</td>
      <td class="table-order__col">${obj.ticket_adult_quantity}</td>
      <td class="table-order__col">${obj.ticket_kid_price}</td>
      <td class="table-order__col">${obj.ticket_adult_quantity}</td>
      <td class="table-order__col">${obj.barcode}</td>
      <td class="table-order__col">${obj.user_id}</td>
      <td class="table-order__col">${obj.equal_price}</td>
      <td class="table-order__col">${obj.created}</td>
    `);

    tableOrderBody.insertAdjacentElement("beforeend", tr);

    if (extraTickets.length > 0) {
      extraTickets
        .reverse()
        .forEach(ticket => {
          const extraTr = document.createElement("tr");
          extraTr.className = "table-order__row";

          extraTr.insertAdjacentHTML("afterbegin", `
            <td class="table-order__col">${ticket.id}</td>
            <td class="table-order__col">${ticket.event_id}</td>
            <td class="table-order__col">${ticket.event_date}</td>
            <td class="table-order__col">${ticket.ticket_adult_price}</td>
            <td class="table-order__col">${ticket.ticket_adult_quantity}</td>
            <td class="table-order__col">${ticket.ticket_kid_price}</td>
            <td class="table-order__col">${ticket.ticket_adult_quantity}</td>
            <td class="table-order__col">${ticket.barcode}</td>
            <td class="table-order__col">${ticket.user_id}</td>
            <td class="table-order__col">${ticket.equal_price}</td>
            <td class="table-order__col">${ticket.created}</td>
          `)

          tr.insertAdjacentElement("afterend", extraTr);
        })
    }
  });

  const orderCounts = document.querySelector(".order__counts");

  orderCounts.textContent = tableOrderBody.childElementCount;
}

window.onload = () => {
  setRowsToTable(orderArray)
};