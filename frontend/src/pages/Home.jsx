import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, APIUrl } from '../utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExpensesTable from './ExpensesTable';
import ExpenseTrackerForm from './ExpenseTrackerForm';
import ExpenseDetails from './ExpenseDetails';
import DarkModeToggle from '../components/DarkModeToggle';

function Home() {

    const [loggedInUser, setLoggedInUser] = React.useState('');
    const [expenses, setExpenses] = React.useState([]);
    const [expenseAmt, setExpenseAmount] = React.useState(0);
    const [incomeAmt, setIncomeAmount] = React.useState(0);

    const handleSuccess = (msg) => toast.success(msg);

    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser') || 'Guest');
    }, [])

    useEffect(() => {
        const amounts = expenses.map((item) => item.amount);
        console.log('Amounts:', amounts);

        const income = amounts.filter(item => item > 0)
            .reduce((acc, item) => (acc += item), 0);
        console.log('Income:', income);

        const exp = amounts.filter(item => item < 0)
            .reduce((acc, item) => (acc += item), 0) * -1; // Convert to positive for display
        console.log('Expenses:', exp);

        setIncomeAmount(income);
        setExpenseAmount(exp);
    }, [expenses])

    const handeLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('Logged out successfully');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    }

    const fetchExpenses = async () => {
        try {
            const url = `${APIUrl}/expenses`;
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const result = await response.json();
            console.log('Fetched Expenses:', result.data);
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }

    const addExpenses = async (data) => {
        try {
            const url = `${APIUrl}/expenses`
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(data)
            });
            if (response.status === 403) {
                navigate('/login');
                return;
            }
            const result = await response.json();
            console.log('Added Expense:', result);
            handleSuccess('Expense added successfully');
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleDeleteExpense = async (expenseId) => {
        try {
            const url = `${APIUrl}/expenses/${expenseId}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
            });
            if (response.status === 403) {
                navigate('/login');
                return;
            }
            const result = await response.json();
            console.log(result.data);
            handleSuccess(result.message);
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }
    console.log('Home expenses state:', expenses);
    return (
        <>
            <DarkModeToggle />
            <div>
                <div className='user-section'>
                    <h1>Welcome {loggedInUser}</h1>
                    <button onClick={handeLogout}>Logout</button>
                </div>
                <ExpenseDetails
                    incomeAmt={incomeAmt}
                    expenseAmt={expenseAmt} />

                <ExpenseTrackerForm
                    addExpenses={addExpenses} />

                <ExpensesTable
                    expenses={expenses}
                    handleDeleteExpense={handleDeleteExpense} />

                <ToastContainer />
            </div >
        </>
    )
}

export default Home
