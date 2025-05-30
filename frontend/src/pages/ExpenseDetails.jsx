import React from 'react'

function ExpenseDetails({ incomeAmt, expenseAmt }) {
    return (
        <div>
            <div className="balance-info">
                <span className='balance-label'>Your Balance is </span>
                <span className="balance-amount">₹{incomeAmt - expenseAmt}</span>
            </div>


            <div className='amount-container'>
                <span className="amount-label">Income:</span>
                <span className="income-amount">₹{incomeAmt}</span>

                <span className="amount-label">Expense:</span>
                <span className="expense-amount">₹{expenseAmt}</span>
            </div>
        </div>
    )
}

export default ExpenseDetails
