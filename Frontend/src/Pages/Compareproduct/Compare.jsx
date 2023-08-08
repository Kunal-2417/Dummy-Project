import React, { useContext, useState, useEffect } from 'react';
import './compare.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import Header from '../../component/Navbar/Header';


const Compare = () => {
    const [auth, setAuth] = useAuth();
    console.log(auth);
    const user = typeof auth.user === 'string' ? JSON.parse(auth.user) : auth.user;
    console.log(user);
    const navigate = useNavigate();

    const [compareItems, setCompareItems] = useState([]);

    useEffect(() => {
        fetchCompareItems();
    }, []);

    const fetchCompareItems = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/compare/${user._id}`);
            if (!response.ok) {
                throw new Error('Error fetching compare items');
            }
            const data = await response.json();
            setCompareItems(data.items);
        } catch (error) {
            console.error('Error fetching compare items:', error);
        }
    };

    const handleAddToCart = (item) => {
        const newItem = {
            userId: user._id,
            name: item.name,
            price: item.price,
            link: item.link,
            img: item.img,
        };

        fetch('http://localhost:3000/api/cart', {
            method: 'POST',
            body: JSON.stringify(newItem),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error adding item to cart');
                }
                return response.json();
            })
            .then(data => {
                alert("Item added")
                console.log(data); // Optionally, handle the response data
            })
            .catch(error => {
                console.error('Error adding item to cart:', error);
            });
    };

    const handleGoToCart = () => {
        navigate('/Cart');
    };

    const handleRemoveFromCompare = (item) => {
        const userId = user._id; // Replace with the actual user ID
        const itemId = item._id; // ID of the item you want to remove from compare list

        fetch(`http://localhost:3000/api/compare/${userId}/${itemId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error removing item from compare list');
                }

                // Remove the item from the compareItems state
                setCompareItems(prevCompareItems =>
                    prevCompareItems.filter(compareItem => compareItem._id !== itemId)
                    );
                    alert("item removed");
            })
            .catch(error => {
                console.error('Error removing item from compare list:', error);
            });
    };


    return (
        <>
        <Header/>
        <div className="compare-container">
            <h1>Compare Page</h1>
            {compareItems.length > 0 ? (
                compareItems.map((item) => (
                    <div key={item._id} className="compare-item">
                        <h3>{item.name}</h3>
                        <img src={item.img} alt={item.name} />
                        <p>Price: {item.price}</p>
                        <p>Link: <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a></p>
                        <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                        <button onClick={() => handleRemoveFromCompare(item)}>Remove</button>
                    </div>
                ))
            ) : (
                <p>No items in the compare list</p>
            )}

            {compareItems.length > 0 && (
                <button className="go-to-cart-button" onClick={handleGoToCart}>
                    Go to Cart
                </button>
            )}
        </div>
        </>
    );
};

export default Compare;
