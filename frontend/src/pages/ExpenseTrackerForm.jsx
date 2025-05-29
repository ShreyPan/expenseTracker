import React from 'react'
import { handleError } from '../utils';
import { useNavigate } from 'react-router-dom';

function ExpenseTrackerForm({ addExpenses }) {

    const [expenseInfo, setExpenseInfo] = React.useState({
        text: '',
        amount: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyExpenseInfo = { ...expenseInfo };
        copyExpenseInfo[name] = value;
        setExpenseInfo(copyExpenseInfo);
    };

    const handleExpense = (e) => {
        e.preventDefault();
        console.log('Expense Info:', expenseInfo);
        const { text, amount } = expenseInfo;
        if (!text || !amount) {
            handleError('All fields are required');
            return;
        }
        addExpenses(expenseInfo)
        setTimeout(() => {
            setExpenseInfo({
                text: '',
                amount: ''
            })
        }, 1000)
    }

    return (
        <div className='container'>
            <h1>Expense Tracker</h1>
            <form onSubmit={handleExpense}>
                <div>
                    <label htmlFor="text">Expense Description</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="text"
                        placeholder='Enter Expense Description...'
                        value={expenseInfo.text} />
                </div>
                <div>
                    <label htmlFor="amount">Amount</label>
                    <input
                        onChange={handleChange}
                        type="number"
                        name="amount"
                        placeholder='Enter Amount, Expense(-ve)/Income(+ve)'
                        value={expenseInfo.amount} />
                </div>
                <button type='submit'>Add Expense</button>
            </form>
        </div>
    )
}

export default ExpenseTrackerForm
