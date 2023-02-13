const inputExpense = document.getElementById('expense-amount');
let expense = Number(inputExpense.value);
const listContainer = document.getElementById('expense-list');
const addBtn = document.getElementById('add');
const typeExpense = document.getElementById('inputGroupSelect03');
const expenseImg = document.getElementById('expense-img');
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
  ul.classList.add('flex');
  ul.classList.add('justify-between');
  ul.classList.add('bg-grey');
  ul.classList.add('rounded-lg');
  ul.classList.add('p-2');
  ul.classList.add('w-full');
  ul.classList.add('m-1');
  let li = document.createElement('div');
  li.classList.add('text-white');
  li.id = expenseID;
  li.textContent = `Amount : ${expense} Type : ${typeExpense.value}`;

  ul.appendChild(li);
  let delBtn = document.createElement('img');
  delBtn.src = '/trash.svg';
  delBtn.classList.add('w-[20px]');
  delBtn.classList.add('h-[20px]');
  delBtn.classList.add('delete-btn');
  delBtn.id = expenseID;
  ul.appendChild(delBtn);

  // listContainer.appendChild(li);
  listContainer.insertBefore(ul, listContainer.firstChild);

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
    ul.classList.add('flex');
    ul.classList.add('justify-between');
    ul.classList.add('bg-grey');
    ul.classList.add('rounded-lg');
    ul.classList.add('p-2');
    ul.classList.add('w-full');
    ul.classList.add('m-1');
    let li = document.createElement('div');
    li.classList.add('text-white');
    li.id = expense.id;
    li.textContent = `Amount : ${expense.amount} Type : ${expense.type}`;
    listContainer.appendChild(ul);
    ul.appendChild(li);
    let delBtn = document.createElement('img');
    delBtn.src = '/trash.svg';
    delBtn.classList.add('w-[20px]');
    delBtn.classList.add('delete-btn');
    delBtn.classList.add('h-[20px]');
    delBtn.id = expense.id;
    ul.appendChild(delBtn);

    // listContainer.insertBefore(li, listContainer.firstChild);
    spent += expense.amount;
    document.getElementById('total-expense').innerText = spent;
  });
  console.log(expensesRev[expensesLen - 1]);
  // console.log(listContainer.innerText);
  if (spent != 0) {
    expenseImg.classList.add('hidden');
    expenseImg.classList.remove('flex');
  }
};
//Delete Data From Database

setTimeout(() => {
  let deleteDataBtn = document.querySelectorAll('.delete-btn');
  console.log(deleteDataBtn);
  deleteDataBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      console.log(e.target.id);
      deleteBtn(e.target.id);
    });
  });
}, 10);

function deleteBtn(value) {
  // let id = document.getElementById(value);
  expenses.splice(value, 1);
  console.log(expenses, value);
  localStorage.setItem('expenditure', JSON.stringify(expenses));
  if (expenses.length == 1) {
    localStorage.removeItem('expenditure');
  }
  // localStorage.setItem('expenditure', expenses);
}
