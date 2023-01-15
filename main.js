const inputExpense = document.getElementById('expense-amount');
const listContainer = document.getElementById('expense-list-group');
const addBtn = document.getElementById('add');
const typeExpense = document.getElementById('inputGroupSelect03');

let spent = 0;

let expenses = JSON.parse(localStorage.getItem('expenditure')) || [];

addBtn.addEventListener('click', () => {
  addExpenditure();
  addCard();
  inputExpense.value = '';
  typeExpense.value = 0;
});
const addExpenditure = () => {
  let expenditure = {
    amount: Number(inputExpense.value),
    type: typeExpense.value,
  };
  expenses.push(expenditure);
  localStorage.setItem('expenditure', JSON.stringify(expenses));
};
function addCard() {
  let expense = Number(inputExpense.value);
  let li = document.createElement('li');
  li.classList.add('list-group-item');
  li.classList.add('rounded');
  li.classList.add('m-1');
  li.textContent = `Amount : ${expense} Type : ${typeExpense.value}`;
  listContainer.appendChild(li);
  spent += expense;
  document.getElementById('total-expense').innerText = spent;
}

window.onload = () => {
  expenses.forEach((expense) => {
    let li = document.createElement('li');
    li.classList.add('list-group-item');
    li.classList.add('rounded');
    li.classList.add('m-1');
    li.textContent = `Amount : ${expense.amount} Type : ${expense.type}`;
    listContainer.appendChild(li);
    spent += expense.amount;
    document.getElementById('total-expense').innerText = spent;
  });
};
