import React from 'react'

export default function ExpenseSummary({propexpenses}) {

    const income=propexpenses
        .filter((e)=>e.amount >0)
        .reduce((acc,curr)=>acc+curr.amount,0)
    const expense=propexpenses
        .filter((e)=>e.amount <0)
        .reduce((acc,curr)=>acc+curr.amount,0)
    const balance=income+expense;
  
    return (

    <div> EXPENSE SUMMARY<br/>
        INCOME:{income}<br/>
        EXPENSES:{Math.abs(expense)}<br/>
        BALANCE:{balance}

    </div>
  )
}
