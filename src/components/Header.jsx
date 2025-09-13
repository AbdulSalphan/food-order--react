import { useEffect } from 'react';
import logo from '../assets/logo.jpg';

export default function Header({itemList}) {

    let countValue = 0;
    useEffect(() => {
        function itemCount() {
            let countValue = 0;
            for (let item in itemList) {
                countValue += itemList[item].quantity;
            }
            return countValue;
        }
        itemCount();
    }, [itemList])

    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt="logo" />
                <h1>Reactfood</h1>
            </div>
            <button className='text-button'>Cart ({countValue})</button>
        </header>
    )
};
