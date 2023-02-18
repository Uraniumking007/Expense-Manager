const inputExpense = document.getElementById('expense-amount');
const expenseName = document.getElementById('expense-name');
const listContainer = document.getElementById('expense-list');
const addBtn = document.getElementById('add');
const typeExpense = document.getElementById('inputGroupSelect03');
const expenseImg = document.getElementById('expense-img');
const totalExpense = document.getElementById('total-expense');
const customOption = document.getElementById('Custom');
let expense = inputExpense.value;
let expenses = JSON.parse(localStorage.getItem('expenditure')) || [];
let spent = 0;
let expenseID = 0;
let expensesLen = Number(expenses.length);
let category = typeExpense.value;

// Expense Id Calculator
if (expensesLen != 0) {
  expenseID = expenses[expensesLen - 1].id;
  expenseID++;
}

typeExpense.addEventListener('change', (e) => {
  console.log(typeExpense.value);
  if (typeExpense.value == 'Custom') {
    expenseName.classList.remove('hidden');
  } else {
    expenseName.classList.add('hidden');
  }
});

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
  console.log(category);

  if (typeExpense.value == 'Custom') {
    category = expenseName.value;
    console.log(category);
  }
  let expenditure = {
    id: expenseID,
    amount: Number(inputExpense.value),
    type: category,
  };
  expenses.push(expenditure);
  localStorage.setItem('expenditure', JSON.stringify(expenses));
};

//Adds Card on click
const addCard = () => {
  let ul = document.createElement('div');
  ul.className = 'p-2 m-1 w-full flex justify-between bg-grey-dark rounded-lg';
  ul.id = expenseID;
  let li = document.createElement('div');
  li.classList.add('text-white');
  li.id = expenseID;
  li.textContent = `Amount : ${expense} Category : ${category}`;
  ul.appendChild(li);
  let delBtn = document.createElement('img');
  delBtn.className = 'w-[20px] h-[20px] delete-btn';
  delBtn.src = '/trash.svg';
  delBtn.id = expenseID;
  let editBtn = document.createElement('img');
  editBtn.src = '/editIcon.svg';
  editBtn.className = 'w-[20px] h-[20px] edit-btn';
  editBtn.id = expense.id;
  editBtn.addEventListener('click', (e) => {
    // deleteBtn(e.target.id);
  });
  ul.appendChild(delBtn);
  const iconWrapper = document.createElement('div');
  iconWrapper.className = 'flex justify-between';
  ul.appendChild(iconWrapper);
  iconWrapper.appendChild(editBtn);
  iconWrapper.appendChild(delBtn);
  delBtn.addEventListener('click', (e) => {
    deleteBtn(e.target.id);
  });
  listContainer.insertBefore(ul, listContainer.firstChild);
  spent += expense;
  totalExpense.innerText = spent;
  if (spent != 0) {
    expenseImg.classList.add('hidden');
    expenseImg.classList.remove('flex');
  }
  if (totalExpense.classList.contains('hidden')) {
    totalExpense.classList.remove('hidden');
  }
};

// Adds cards on load
window.onload = () => {
  const expensesRev = [...expenses];
  expensesRev.reverse();
  expensesRev.forEach((expense) => {
    document.querySelector('expense-list');
    let ul = document.createElement('div');
    ul.className =
      'p-2 m-1 w-full flex justify-between bg-grey-dark rounded-lg';
    ul.id = expense.id;
    let li = document.createElement('div');
    li.classList.add('text-white');
    li.id = expense.id;
    li.textContent = `Amount : ${expense.amount} Category : ${expense.type}`;
    listContainer.appendChild(ul);
    ul.appendChild(li);
    let delBtn = document.createElement('img');
    delBtn.src = '/trash.svg';
    delBtn.className = 'w-[20px] h-[20px] delete-btn';
    delBtn.id = expense.id;
    delBtn.addEventListener('click', (e) => {
      deleteBtn(e.target.id);
    });
    let editBtn = document.createElement('img');
    editBtn.src = '/editIcon.svg';
    editBtn.className = 'w-[20px] h-[20px] edit-btn';
    editBtn.id = expense.id;
    editBtn.addEventListener('click', (e) => {
      deleteBtn(e.target.id);
    });
    ul.appendChild(delBtn);
    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'flex justify-between';
    ul.appendChild(iconWrapper);
    iconWrapper.appendChild(editBtn);
    iconWrapper.appendChild(delBtn);

    spent += expense.amount;
    totalExpense.innerText = spent;
  });
  if (spent != 0) {
    expenseImg.classList.add('hidden');
    expenseImg.classList.remove('flex');
  }
};
const deleteBtn = (value) => {
  document.getElementById(value).remove();
  spent -= expenses[value].amount;
  totalExpense.innerText = spent;
  if (expenses.length == 1) {
    localStorage.removeItem('expenditure');
  } else {
    expenses.splice(value, 1);
    localStorage.setItem('expenditure', JSON.stringify(expenses));
  }
  if (spent == 0) {
    expenseImg.classList.add('flex');
    expenseImg.classList.remove('hidden');
    // totalExpense.classList.remove('flex');
    totalExpense.classList.add('hidden');
  }
};
