import { useEffect, useRef, useState, useContext } from 'react';
import { AppContext } from './store/app-context';

import logo from '../assets/logo.jpg';
import Cart from './Cart';

export default function Header() {
    const [cartCount, setCartCount] = useState();

    const dialog = useRef();

    const {cartItems} = useContext(AppContext);
    
    useEffect(() => {
        function itemCount() {
            let countValue = 0;
            for (let item in cartItems) {
                countValue += cartItems[item].quantity;
            }
            setCartCount(countValue);
        }
        itemCount();
    }, [cartItems])

    function openCart() {
        dialog.current.open();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt="logo" />
                <h1>Reactfood</h1>
            </div>
            <button className='text-button' onClick={openCart}>Cart ({cartCount})</button>
            <Cart ref={dialog} />
        </header>
    )
};
