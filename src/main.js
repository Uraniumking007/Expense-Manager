const inputExpense = document.getElementById('expense-amount');
let expense = Number(inputExpense.value);
const listContainer = document.getElementById('expense-list');
const addBtn = document.getElementById('add');
const typeExpense = document.getElementById('inputGroupSelect03');
const expenseImg = document.getElementById('expense-img');
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
  if (expense != 0 || null) {
    let li = document.createElement('div');
    li.classList.add('bg-grey');
    li.classList.add('text-white');
    li.classList.add('rounded-lg');
    li.classList.add('p-2');
    li.classList.add('w-full');
    li.classList.add('m-1');
    li.textContent = `Amount : ${expense} Type : ${typeExpense.value}`;
    listContainer.appendChild(li);
    spent += expense;
    document.getElementById('total-expense').innerText = spent;
    if (spent != 0) {
      expenseImg.classList.add('hidden');
      expenseImg.classList.remove('flex');
    }
  } else {
    alert('Enter Some Value');
  }
}

window.onload = () => {
  expenses.forEach((expense) => {
    document.querySelector('expense-list');
    let li = document.createElement('div');
    li.classList.add('bg-grey');
    li.classList.add('text-white');
    li.classList.add('rounded-lg');
    li.classList.add('p-2');
    li.classList.add('w-full');
    li.classList.add('m-1');
    li.textContent = `Amount : ${expense.amount} Type : ${expense.type}`;
    listContainer.appendChild(li);
    spent += expense.amount;
    document.getElementById('total-expense').innerText = spent;
  });
  console.log(listContainer.innerText);
  if (spent != 0) {
    expenseImg.classList.add('hidden');
    expenseImg.classList.remove('flex');
  }
};
