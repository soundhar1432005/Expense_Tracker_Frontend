import React from 'react'
function ExpenseList({propexpenses,deleteExpences,editExpences}) {


  return (
    <>
      <h2>Expense List</h2>
      <div className="expense-list">
        { propexpenses.map((item) => (
            <div key={item._id} className="expense-item">
              <span className="expense-title">{item.title}</span> 
              <span className="expense-amount">₹{item.amount}</span> 
              
              <button onClick={()=>deleteExpences(item._id)}>Delete</button>
              
              <button onClick={()=>editExpences(item)}>Edit</button>
              
            </div>
          ))
        }
        
       
      </div>
    </>
  )
}
export default ExpenseList
