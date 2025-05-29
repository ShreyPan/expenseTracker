import React from 'react'

function ExpensesTable({ expenses }) {
    console.log('ExpensesTable expenses:', expenses);
    return (
        <div className='expense-list'>
            {
                expenses?.map((expense, index) => (
                    <div key={index} className='expense-item'>
                        <button className='delete-button'>Delete</button>
                        <div className='expense-description'>{expense.text}</div>
                        <div className='expense-amount'
                            style={{
                                color: expense.amount > 0 ? '#27ae60' : 'e74c3c',
                                fontWeight: 'bold'
                            }}>
                            {expense.amount}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ExpensesTable
