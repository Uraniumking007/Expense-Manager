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
let expense = inputExpense.value;
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
  if (expense != 0 || null) {
    addExpenditure();
    addCard();
    inputExpense.value = '';
    typeExpense.value = 0;
    expenseName.classList.add('hidden');
    expenseName.classList.remove('flex');
    expenseName.value = null;
    expenseID++;
  } else {
    alert('Enter Some Value');
  }
});

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

//Adds Card on click
const addCard = () => {
  indexer();
  let ul = document.createElement('div');
  ul.className = `p-2 m-1 w-[50%] flex justify-between bg-grey-dark rounded-lg ${expense.id} `;
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
  delBtn.addEventListener('click', (e) => {
    deleteBtn(e.target.id);
  });
  // let editBtn = document.createElement('img');
  // editBtn.src = '/editIcon.svg';
  // editBtn.className = 'w-[20px] h-[20px] edit-btn';
  // editBtn.id = expense.id;
  // editBtn.addEventListener('click', (e) => {
  //   editExpense(e.target.id);
  // });
  ul.appendChild(delBtn);
  const iconWrapper = document.createElement('div');
  iconWrapper.className = 'flex justify-between';
  ul.appendChild(iconWrapper);
  // iconWrapper.appendChild(editBtn);
  iconWrapper.appendChild(delBtn);
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

//index and id changer

const indexer = () => {
  expenses.forEach((expense) => {
    expense.id = expenses.indexOf(expense);
  });
  localStorage.setItem('expenditure', JSON.stringify(expenses));
};

// Adds cards on load
window.onload = () => {
  indexer();
  const expensesRev = [...expenses];
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
    // let editBtn = document.createElement('img');
    // editBtn.src = '/editIcon.svg';
    // editBtn.className = 'w-[20px] h-[20px] edit-btn';
    // editBtn.id = expense.id;
    // editBtn.addEventListener('click', (e) => {
    //   editExpense(e.target.id);
    //   delBtn.classList.add('hidden');
    //   editBtn.classList.add('hidden');
    // });
    ul.appendChild(delBtn);
    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'flex justify-between';
    ul.appendChild(iconWrapper);
    // iconWrapper.appendChild(editBtn);
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
  expenses = JSON.parse(localStorage.getItem('expenditure')) || [];
  console.log(expenses);
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
// const editExpense = (objId) => {
//   expenses = JSON.parse(localStorage.getItem('expenditure')) || [];

//   const list = document.getElementById(objId);
//   const amountEditor = document.createElement('input');
//   amountEditor.value = expenses[objId].amount;
//   list.appendChild(amountEditor);
//   const typeEditor = document.createElement('input');
//   typeEditor.value = expenses[objId].type;
//   list.appendChild(typeEditor);
//   const saveBtn = document.createElement('button');
//   saveBtn.innerText = 'Save';
//   saveBtn.id = objId;
//   saveBtn.classList.add('saveBtn');
//   saveBtn.addEventListener('click', (e) => {
//     let editedExpense = {
//       id: e.target.id,
//       amount: Number(amountEditor.value),
//       typeCategory: typeExpense.value,
//       type: typeEditor.value,
//     };
//     console.log(editedExpense);
//     expenses[e.target.id] = editedExpense;
//     localStorage.setItem('expenditure', JSON.stringify(expenses));
//     amountEditor.remove();
//     typeEditor.remove();
//     saveBtn.remove();
//     const List = document.getElementsByClassName('text-white');
//     const reloadElement = document.getElementById(e.target.id);
//     reloadElement.innerHTML = `<div class=\"text-white\" id=\"1\">Amount : ${editedExpense.amount} Category : ${editedExpense.type}</div>
//     <div class=\"flex justify-between\">
//       <img src=\"/editIcon.svg\" class=\"w-[20px] h-[20px] edit-btn\" id=\"1\">
//       <img src=\"/trash.svg\" class=\"w-[20px] h-[20px] delete-btn\" id=\"1\">
//     </div>`;
//     console.log(JSON.stringify(reloadElement.innerHTML));
//   });
//   list.appendChild(saveBtn);
// };
