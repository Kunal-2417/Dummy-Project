import React, { useState, useEffect } from 'react';
import './Cart.css'; // Import the CSS file
import { useAuth } from "../../context/AuthContext";
import Header from '../../component/Navbar/Header';

const Cart = () => {
    const [auth, setAuth] = useAuth();
    console.log(auth);
    const user = typeof auth.user === 'string' ? JSON.parse(auth.user) : auth.user;
    console.log(user);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchCartItems(); // Fetch cart items when the component mounts
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/cart/${user._id}`); // Adjust the URL as needed
            if (!response.ok) {
                throw new Error('Error fetching cart items');
            }
            const data = await response.json();
            setCartItems(data.items);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const handleRemoveFromCart = (item) => {
        const userId = user._id; // Replace with the actual user ID
        const itemId = item._id; 
        fetch(`http://localhost:3000/api/cart/${userId}/${itemId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error removing item from cart');
                }
                fetchCartItems(); // Refresh the cart items after removal
            })
            .catch(error => {
                console.error('Error removing item from cart:', error);
            });
    };

    return (
        <>
        <Header/>
        <div className="cart-container">
            <h1>Shopping Cart</h1>
            {cartItems.length > 0 ? (
                cartItems.map((item) => (
                    <div key={item._id} className="cart-item">
                        <h3>{item.name}</h3>
                        <img src={item.img} alt={item.name} />
                        <p>Price: {item.price}</p>
                        <p>Link: <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a></p>

                        <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
                    </div>
                ))
            ) : (
                <p>No items in cart</p>
            )}
        </div>
        </>
    );
};

export default Cart;
