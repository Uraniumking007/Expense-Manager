# Expense Manager

This is a simple web-based expense manager application that allows you to add, edit, and delete your expenses. The data is stored persistently on the client-side using the browser's local storage.

## Features

- Add an expense with a title and amount.
- Edit an existing expense's title and amount.
- Delete an existing expense.
- View all expenses in a List format.

## Usage

To use the expense manager application, visit [expensemanager.bhaveshp.dev](https://expensemanager.bhaveshp.dev/). 

### Adding an Expense

To add a new expense, click on the "Add Expense" button on the top right corner of the screen. Fill out the expense details in the form that appears and click on the "Save" button. The new expense will be added to the list of expenses.

### Editing an Expense

To edit an existing expense, click on the "Edit" button next to the expense you want to edit. Edit the expense details in the form that appears and click on the "Save" button. The expense details will be updated.

### Deleting an Expense

To delete an existing expense, click on the "Delete" button next to the expense you want to delete. The expense will be removed from the list of expenses.

## Technologies Used

- HTML
- CSS
- JavaScript
- TailwindCSS

## Limitations

Since the data is stored on the client-side using local storage, the application has some limitations:

- The data is only accessible from the same browser and device where it was stored.
- The data may be lost if the browser's local storage is cleared.
- The data may be limited by the amount of storage available in the browser's local storage.
