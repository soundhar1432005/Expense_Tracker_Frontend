import React, { useEffect, useState } from "react";

function ExpenseForm({ addExpense ,itemToEdit, setItemToEdit}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  useEffect(() => {
    if (itemToEdit) {
      setTitle(itemToEdit.title);
      setAmount(itemToEdit.amount.toString());
    } else {
      setTitle("");
      setAmount("");
    }
  }, [itemToEdit]);


  const handleSubmit = (e) => {
  e.preventDefault();
  if (!title || !amount) return;

  if (itemToEdit) {
    // Editing → call addExpense with id
    addExpense(title, amount, itemToEdit._id);
    setItemToEdit(null);
  } else {
    // Adding → call addExpense without id
    addExpense(title, amount);
  }

  setTitle("");
  setAmount("");
};


  
//   It uses React’s useState hook to manage form data (title and amount).
// When the user submits the form (handleSubmit), it prevents the page from refreshing (e.preventDefault()).
// It validates the inputs (doesn’t allow empty values).
// If valid, it calls a function addExpense (received from parent) to send the new expense to the main tracker.
// After submission, it resets the input fields.


  return (
    <div className="form-container">
      <h3 className="form-title">Expense Details</h3>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label>Title: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
          />
        </div>

        <div className="form-group">
          <label>Amount: </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
          <button type="submit" className="btn">Add Expense</button>
             <br /><br />
                {/* Cancel button only when editing */}
        {itemToEdit && (
          <button
            type="button"
            onClick={() => {
              setItemToEdit(null); // reset edit mode
              setTitle('');
              setAmount('');
            }}
          >
            Cancel
          </button>
        )}
        </div>
      </form>
    </div>
  );
}
export default ExpenseForm;
