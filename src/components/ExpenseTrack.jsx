import React, {useEffect, useState} from 'react'
import ExpenceForm from './ExpenceForm'
import { v4 as uid } from "uuid"
import ExpenseList from './ExpenseList';
import ExpenseSummary from './ExpenseSummary';
import axios from 'axios';
const EXPENSES = [
  { _id: uid(), title: "Expense 1", amount: 100 },
  { _id: uid(), title: "Expense 2", amount: 200 },
];
export default function ExpenseTrack() {
  const [expenses, setExpenses] = useState(EXPENSES); 
  const [itemToEdit, setItemToEdit] = useState(null); 

  useEffect(()=>{
    axios.get("http://localhost:3001/api/")
    .then((res)=>setExpenses(res.data))
  },[]
)
// Starts with a default expense list (EXPENSES) containing sample data.
// Uses React’s useState to maintain the expense list.
// Defines a function addExpense which:
// Creates a new expense with a unique ID (using uuid library).
// Updates the state by adding it to the existing list.
// Renders the ExpenseForm and passes addExpense as a prop.
// Maps over the expenses array to display each item (title - amount).

/*
  const addExpense = (title, amount,_id) => {
   
    if (_id) {
      // Edit existing
      const updated = expenses.map((exp) =>
        exp._id === _id ? { ...exp, title, amount: Number(amount) } : exp
      );
      setExpenses(updated);
      setItemToEdit(null); // Reset edit mode
    } else {
      // Add new
    setExpenses([
      ...expenses,
      {
        _id: uid(),
        title,
        amount: Number(amount),
      },
    ]);
  }
  };
  */


 const addExpense = async (title, amount, id) => {
  try{
  if (id) {
    // Edit existing
    const updated = expenses.map((exp) =>
      exp._id === id ? { ...exp, title, amount: Number(amount) } : exp
    );
    setExpenses(updated);
    setItemToEdit(null);

    await axios.put(`http://localhost:3001/api/${id}`, { title, amount });
  } else {
    // Add new
    const res = await axios.post("http://localhost:3001/api/", {
      title,
      amount: Number(amount),
    });
    setExpenses([...expenses, res.data]); // use the saved doc from DB
  }
}catch(err){
  console.log("Error adding/updating expense:", err);
}
};
/*
    const deleteExpenses = (_id) => {
    const updatedExpences= expenses.filter((expense) => expense._id !== _id);
    setExpenses(updatedExpences)
  };
  */
 const deleteExpenses = async (id) => {
  try {
    await axios.delete(`http://localhost:3001/api/${id}`);
    const updatedExpenses = expenses.filter((expense) => expense._id !== id);
    setExpenses(updatedExpenses);
  } catch (err) {
    console.error("Error deleting expense:", err);
  }
};
const editExpences = (item) => {
  setItemToEdit(item); // this will fill the form with the item details
};

const updateExpense = (updatedExpense) => {
  setExpenses((prev) =>
    prev.map((expense) =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    )
  );
};

  // const editExpences=(id)=>{
  //   const editedExpences=
  // }
  return (
    <div className="tracker-container">
      <h2 className="tracker-title">Expense Tracker</h2>
      <ExpenceForm addExpense={addExpense} updateExpense={updateExpense} itemToEdit={itemToEdit}
      setItemToEdit={setItemToEdit} />
  <ExpenseList propexpenses={expenses} deleteExpences={deleteExpenses} editExpences={editExpences}  />
      <ExpenseSummary propexpenses={expenses}/>
      
    </div>
  );
}
 