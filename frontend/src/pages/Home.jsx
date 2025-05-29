import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, APIUrl } from '../utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExpensesTable from './ExpensesTable';
import ExpenseTrackerForm from './ExpenseTrackerForm';

function Home() {

    const [loggedInUser, setLoggedInUser] = React.useState('');
    const [expenses, setExpenses] = React.useState([]);

    const handleSuccess = (msg) => toast.success(msg);

    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser') || 'Guest');
    }, [])

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
            const url = `${APIUrl}/expenses`
            const response = await fetch(url, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            if (response.status === 403) {
                navigate('/login');
                return;
            }
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
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data)
            });
            if (response.status === 403) {
                navigate('/login');
                return;
            }
            const result = await response.json();
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <div>
            <div className='user-section'>
                <h1>Welcome {loggedInUser}</h1>
                <button onClick={handeLogout}>Logout</button>
            </div>
            <ExpenseTrackerForm addExpenses={addExpenses} />
            <ExpensesTable expenses={expenses} />
            <ToastContainer />
        </div >
    )
}

export default Home
