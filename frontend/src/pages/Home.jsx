import React, { use, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {

    const [loggedInUser, setLoggedInUser] = React.useState('');
    const [products, setProducts] = React.useState([]);

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

    const fetchProducts = async () => {
        try {
            const url = "http://localhost:8080/products";
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
            const response = await fetch(url, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            const result = await response.json();
            if (result.success) {
                setProducts(result.products);
                console.log(result.products);
            } else {
                console.error(result.message || 'Failed to fetch products');
            }
        } catch (err) {
            handleError(err);
            console.error('Error fetching products:', err);
        }
    }
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>{loggedInUser}</h1>
            <button onClick={handeLogout}>Logout</button>
            <h2>Welcome to the Home Page</h2>
            <div>
                {
                    products && products?.map((item, index) => (
                        <ul key={index}>
                            <span>{item.name}:{item.price}</span>
                        </ul>
                    ))
                }
            </div>
            <ToastContainer />
        </div>
    )
}

export default Home
