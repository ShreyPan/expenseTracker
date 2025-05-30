import React from 'react';

function ExpensesTable({ expenses, handleDeleteExpense }) {
    console.log('ExpensesTable expenses:', expenses);
    return (
        <div className='expense-list'>
            {
                expenses?.map((expense, index) => (
                    <div key={index} className='expense-item'>
                        <button className='delete-button'
                            onClick={() => handleDeleteExpense(expense._id)}>
                            Delete
                        </button>
                        <div className='expense-description'>{expense.text}</div>
                        <div
                            className={`expense-amount ${expense.amount > 0 ? 'income' : 'expense'}`}
                        >
                            {expense.amount}
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default ExpensesTable;
