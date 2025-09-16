import { useEffect, useImperativeHandle, useRef, useState, useContext } from 'react';
import { createPortal } from 'react-dom';
import CustomerForm from './CustomerForm';

import { AppContext } from './store/app-context';

export default function Cart({ref}) {
    const dialog = useRef();
    const customerFormDialog = useRef();
    const [cartValue, setCartValue] = useState();

    const {updateCount, cartItems} = useContext(AppContext);

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    })

    useEffect(() => {
        function cartValue() {
            let countValue = 0;
            for (let item in cartItems) {
                countValue += cartItems[item].price * cartItems[item].quantity;
            }
            setCartValue(countValue);
        }
        cartValue();
    }, [cartItems])

    function modalClose() {
        dialog.current.close();
    }

    function checkoutHandler() {
        customerFormDialog.current.showModal();
        dialog.current.close();
    }

    return createPortal (
        <dialog ref={dialog} className='modal cart'>
            <h2>Your Cart</h2>
            <ul>
                {cartItems && cartItems.map(cartItem => {
                    if(cartItem.quantity > 0) {
                        return (
                            <li className='cart-item' key={cartItem.id}>
                                <p>{cartItem.name} - {cartItem.quantity} x ${cartItem.price}</p>
                                <p className="cart-item-actions">
                                    <button onClick={() => updateCount('decrement', cartItem)}>-</button>
                                    <span>{cartItem.quantity}</span>
                                    <button onClick={() => updateCount('increment', cartItem)}>+</button>
                                </p>
                            </li>
                        )
                    }
                })}
            </ul>
            <p className="cart-total">${cartValue > 0 ? cartValue : '0.00'}</p>
            <p className="modal-actions">
                <button className="text-button" onClick={modalClose}>Close</button>
                {cartValue > 0 && <button className="button" onClick={checkoutHandler}>Go to Checkout</button>}
            </p>
            <CustomerForm cartValue={cartValue} ref={customerFormDialog} />
        </dialog>,
        document.getElementById('modal')
    )
};
