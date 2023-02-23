import {
  customOption,
  inputExpense,
  expenseName,
  expenseImg,
  listContainer,
  addBtn,
  typeExpense,
  totalExpense,
} from './var';
let expense = 0;
let expenses = JSON.parse(localStorage.getItem('expenditure')) || [];
let spent = 0;
let expenseID = 0;
let expensesLen = Number(expenses.length);
let category = 0;

// Expense Id Calculator
if (expensesLen != 0) {
  expenseID = expenses[expensesLen - 1].id;
  expenseID++;
}

typeExpense.addEventListener('change', (e) => {
  category = typeExpense.value;
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
  if (
    inputExpense.value != 0 &&
    inputExpense.value !== null &&
    inputExpense.value !== ''
  ) {
    if (typeExpense.value === 'Custom') {
      if (expenseName.value !== null && expenseName.value !== '') {
        addingExpense();
      } else {
        alert('Enter Custom Expense Name');
      }
    } else if (typeExpense.value != 0) {
      addingExpense();
    } else {
      alert('Select a category');
    }
  } else {
    alert('Enter Some Value');
  }
});

const addingExpense = () => {
  addExpenditure();
  console.log(typeExpense.value);
  // addCard();
  updateExpenseList();
  inputExpense.value = '';
  typeExpense.value = 0;
  expenseName.classList.add('hidden');
  expenseName.classList.remove('flex');
  expenseName.value = '';
  expenseID++;
  expense = 0;
  spent = 0;
};

//Adds data into database
const addExpenditure = () => {
  // let category = typeExpense.value;
  console.log(category);

  expenses = JSON.parse(localStorage.getItem('expenditure')) || [];

  if (typeExpense.value == 'Custom') {
    category = expenseName.value;
    console.log(category);
  }
  let expenditure = {
    id: expenseID,
    amount: Number(inputExpense.value),
    typeCategory: typeExpense.value,
    type: category,
  };
  expenses.push(expenditure);
  localStorage.setItem('expenditure', JSON.stringify(expenses));
};

//index and id changer

const indexer = () => {
  expenses.forEach((expense) => {
    expense.id = expenses.indexOf(expense);
    expenseID = expense.id;
  });
  localStorage.setItem('expenditure', JSON.stringify(expenses));
};

// Update List DOM element

const updateExpenseList = () => {
  indexer();
  const expensesRev = [...expenses];
  listContainer.innerHTML = '';
  expensesRev.reverse();
  expensesRev.forEach((expense) => {
    document.querySelector('expense-list');
    let ul = document.createElement('div');
    ul.className = `p-2 m-1 w-[50%] flex justify-between bg-grey-dark rounded-lg ${expense.id} `;
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
      editExpense(e.target.id);
      delBtn.classList.add('hidden');
      editBtn.classList.add('hidden');
    });
    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'flex justify-between';
    ul.appendChild(iconWrapper);
    iconWrapper.appendChild(editBtn);
    iconWrapper.appendChild(delBtn);
  });
  expenseCalc();
  if (spent != 0) {
    expenseImg.classList.add('hidden');
    expenseImg.classList.remove('flex');
  }
  spent = 0;
};

// Expense Calc
const expenseCalc = () => {
  spent = 0;
  expenses = JSON.parse(localStorage.getItem('expenditure')) || [];
  expenses.forEach((expense) => {
    if (totalExpense.classList.contains('hidden')) {
      totalExpense.classList.remove('hidden');
    }
    spent += expense.amount;
    totalExpense.innerText = spent;
  });
};

// Adds cards on load
window.onload = updateExpenseList();

// Delete Function
const deleteBtn = (value) => {
  indexer();
  expenses = JSON.parse(localStorage.getItem('expenditure')) || [];
  document.getElementById(value).remove();
  expenses.splice(value, 1);
  localStorage.setItem('expenditure', JSON.stringify(expenses));
  indexer();
  expenseCalc();
  updateExpenseList();
  expenseCalc();
  if (spent == 0) {
    expenseImg.classList.add('flex');
    expenseImg.classList.remove('hidden');
    totalExpense.classList.add('hidden');
  }
};

// Edit Function
const editExpense = (objId) => {
  indexer();
  expenses = JSON.parse(localStorage.getItem('expenditure')) || [];
  console.log(expenses, expenses[objId]);
  const list = document.getElementById(objId);
  const amountEditor = document.createElement('input');
  amountEditor.classList.add('text-white');
  list.appendChild(amountEditor);
  const typeEditor = document.createElement('input');
  typeEditor.classList.add('text-white');
  amountEditor.value = expenses[objId].amount;
  typeEditor.value = expenses[objId].type;
  list.appendChild(typeEditor);
  const saveBtn = document.createElement('button');
  saveBtn.className = 'text-white hover:bg-grey hover:text-black rounded p-1';
  saveBtn.innerText = 'Save';
  saveBtn.id = objId;
  saveBtn.classList.add('saveBtn');
  saveBtn.addEventListener('click', (e) => {
    let editedExpense = {
      id: Number(e.target.id),
      amount: Number(amountEditor.value),
      typeCategory: typeExpense.value,
      type: typeEditor.value,
    };
    expenses[e.target.id] = editedExpense;
    console.log(editedExpense);
    expenses[e.target.id] = editedExpense;
    localStorage.setItem('expenditure', JSON.stringify(expenses));
    amountEditor.remove();
    typeEditor.remove();
    saveBtn.remove();
    updateExpenseList();
    expenseCalc();
    console.log(JSON.stringify(reloadElement.innerHTML));
  });
  list.appendChild(saveBtn);
};
