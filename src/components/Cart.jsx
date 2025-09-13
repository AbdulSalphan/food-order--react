import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Cart({cartContent, updateCount, ref}) {
    const dialog = useRef();
    const [cartValue, setCartValue] = useState();

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
            for (let item in cartContent) {
                countValue += cartContent[item].price * cartContent[item].quantity;
            }
            setCartValue(countValue);
        }
        cartValue();
    }, [cartContent])

    function modalClose() {
        dialog.current.close();
    }

    function checkoutHandler() {

    }

    return createPortal (
        <dialog ref={dialog} className='modal cart'>
            <h2>Your Cart</h2>
            <ul>
                {cartContent && cartContent.map(cartItem => {
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
        </dialog>,
        document.getElementById('modal')
    )
};
