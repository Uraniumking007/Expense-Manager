const inputExpense = document.getElementById('expense-amount');
const listContainer = document.getElementById('expense-list');
const addBtn = document.getElementById('add');
const typeExpense = document.getElementById('inputGroupSelect03');
const expenseImg = document.getElementById('expense-img');
let expense = inputExpense.value;
var deleteDataBtn = document.querySelectorAll('.delete-btn');
let spent = 0;

let expenseID = 0;
let expenses = JSON.parse(localStorage.getItem('expenditure')) || [];
let expensesLen = Number(expenses.length);

// Expense Id Calculator
if (expensesLen != 0) {
  expenseID = expenses[expensesLen - 1].id;
  expenseID++;
}

// Input Listener
inputExpense.addEventListener('change', (e) => {
  expense = Number(inputExpense.value);
});

//adds card and calculates expense
addBtn.addEventListener('click', () => {
  if (expense != 0 || null) {
    addExpenditure();
    addCard();
    inputExpense.value = '';
    typeExpense.value = 0;
    expenseID++;
  } else {
    alert('Enter Some Value');
  }
});

//Adds data into database
const addExpenditure = () => {
  let expenditure = {
    id: expenseID,
    amount: Number(inputExpense.value),
    type: typeExpense.value,
  };
  expenses.push(expenditure);
  localStorage.setItem('expenditure', JSON.stringify(expenses));
};

//Adds Card on click
function addCard() {
  let ul = document.createElement('div');
  ul.className = 'p-2 m-1 w-full flex justify-between bg-grey rounded-lg';
  ul.id = expenseID;
  let li = document.createElement('div');
  li.classList.add('text-white');
  li.id = expenseID;
  li.textContent = `Amount : ${expense} Type : ${typeExpense.value}`;
  ul.appendChild(li);
  let delBtn = document.createElement('img');
  delBtn.className = 'w-[20px] h-[20px] delete-btn';
  delBtn.src = '/trash.svg';
  delBtn.id = expenseID;
  ul.appendChild(delBtn);
  delBtn.addEventListener('click', (e) => {
    deleteBtn(e.target.id);
  });
  // listContainer.appendChild(li);
  listContainer.insertBefore(ul, listContainer.firstChild);

  //del data refresh
  deleteDataBtn = document.querySelectorAll('.delete-btn');

  spent += expense;
  document.getElementById('total-expense').innerText = spent;
  if (spent != 0) {
    expenseImg.classList.add('hidden');
    expenseImg.classList.remove('flex');
  }
}

// Adds cards on load
window.onload = () => {
  const expensesRev = [...expenses];
  expensesRev.reverse();
  expensesRev.forEach((expense) => {
    document.querySelector('expense-list');
    let ul = document.createElement('div');
    ul.className = 'p-2 m-1 w-full flex justify-between bg-grey rounded-lg';
    ul.id = expense.id;
    let li = document.createElement('div');
    li.classList.add('text-white');
    li.id = expense.id;
    li.textContent = `Amount : ${expense.amount} Type : ${expense.type}`;
    listContainer.appendChild(ul);
    ul.appendChild(li);
    let delBtn = document.createElement('img');
    delBtn.src = '/trash.svg';
    delBtn.className = 'w-[20px] h-[20px] delete-btn';
    delBtn.id = expense.id;
    delBtn.addEventListener('click', (e) => {
      deleteBtn(e.target.id);
    });
    ul.appendChild(delBtn);

    spent += expense.amount;
    document.getElementById('total-expense').innerText = spent;
  });
  if (spent != 0) {
    expenseImg.classList.add('hidden');
    expenseImg.classList.remove('flex');
  }
};
function deleteBtn(value) {
  // console.log(expenses, value);
  document.getElementById(value).remove();
  spent -= expenses[value].amount;
  document.getElementById('total-expense').innerText = spent;
  if (expenses.length == 1) {
    localStorage.removeItem('expenditure');
  } else {
    expenses.splice(value, 1);
    localStorage.setItem('expenditure', JSON.stringify(expenses));
  }
}
