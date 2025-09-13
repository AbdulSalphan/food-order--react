import { useEffect, useRef, useState } from 'react';
import logo from '../assets/logo.jpg';
import Cart from './Cart';

export default function Header({itemList, updateCount}) {
    const [cartCount, setCartCount] = useState();

    const dialog = useRef();
    
    useEffect(() => {
        function itemCount() {
            let countValue = 0;
            for (let item in itemList) {
                countValue += itemList[item].quantity;
            }
            setCartCount(countValue);
        }
        itemCount();
    }, [itemList])

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
            <Cart updateCount={updateCount} ref={dialog} cartContent={itemList} />
        </header>
    )
};
