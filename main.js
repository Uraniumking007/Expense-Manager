const inputExpense = document.getElementById('expense-amount');
const listContainer = document.getElementById('expense-list-group');
const addBtn = document.getElementById('add');
const typeExpense = document.getElementById('inputGroupSelect03');

let spent = 0;

addBtn.addEventListener('click', () => {
  let expense = Number(inputExpense.value);
  let li = document.createElement('li');
  li.classList.add('list-group-item');
  li.classList.add('rounded');
  li.classList.add('m-1');
  li.textContent = `Amount : ${expense} Type : ${typeExpense.value}`;
  listContainer.appendChild(li);
  spent += expense;
  document.getElementById('total-expense').innerText = spent;
});
