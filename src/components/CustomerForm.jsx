import { useActionState, useContext } from 'react';
import { createPortal } from 'react-dom';
import Submit from './Submit';
import { AppContext } from './store/app-context';

export default function CustomerForm({cartValue, ref}) {
    const {cartItems} = useContext(AppContext);

    async function formSubmitHandler(prevData, formData) {
        const name = formData.get('name');
        const email = formData.get('email');
        const street = formData.get('street');
        const postalCode = formData.get('postal-code');
        const city = formData.get('city');

        let errors =[];
        if(name === '') {
            errors.push('Enter a valid name');
        }
        if(email === '') {
            errors.push('Enter a valid email');
        }
        if(street === '') {
            errors.push('Enter a valid street');
        }
        if(postalCode === '') {
            errors.push('Enter a valid postalCode');
        }
        if(city === '') {
            errors.push('Enter a valid city');
        }

        if(errors.length > 0) {
            return {errors, data: {
                name,
                email,
                street,
                postalCode,
                city
            }}
        }

        let dataPackage = {
            items: cartItems, 
            customer: {
                name, 
                email, 
                street, 
                'postal-code': postalCode, 
                city
            }
        };

        await postData(dataPackage);

        return {errors: null};
    }

    async function postData(data) {
        let cleanData = compileData(data)
        console.log(JSON.stringify(cleanData));
        // console.log('[{"items":[{"id":"m1","name":"Mac & Cheese","price":"8.99","description":"Creamy cheddar cheese mixed with perfectly cooked macaroni, topped with crispy breadcrumbs. A classic comfort food.","image":"images/mac-and-cheese.jpg","quantity":1},{"id":"m2","name":"Margherita Pizza","price":"12.99","description":"A classic pizza with fresh mozzarella, tomatoes, and basil on a thin and crispy crust.","image":"images/margherita-pizza.jpg","quantity":1}],"customer":{"name":"Abdul Salphan","email":"abdulsalphan@gmail.com","street":"457/1, PILAIYAR KOIL STREET","postal-code":"603003","city":"Chengalpattu"},"id":"793.0587786106436"},{"items":[{"id":"m1","name":"Mac & Cheese","price":"8.99","description":"Creamy cheddar cheese mixed with perfectly cooked macaroni, topped with crispy breadcrumbs. A classic comfort food.","image":"images/mac-and-cheese.jpg","quantity":1}],"customer":{"name":"Abdul Salphan","email":"abdulsalphan@gmail.com","street":"457/1, PILAIYAR KOIL STREET","postal-code":"603003","city":"Chengalpattu"},"id":"940.4809135886399"}]')
        try {
            const response = await fetch('http://localhost:3000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cleanData)
            });
        } catch (error) {
            console.log(error);
        }
    }

    function compileData(rawData) {
        let filteredData = rawData.items.filter(item => item.quantity > 0);
        return {
            order: {
                items: filteredData, 
                customer: rawData.customer,
            }
        }
    }

    const [formState, formAction] = useActionState(formSubmitHandler, {errors: null});

    return createPortal(
        <dialog className="modal" ref={ref}>
            <form action={formAction}>
                <h2>Checkout</h2>
                <p>Total Amount: ${cartValue}</p>
                <p className="control">
                    <label htmlFor="name">Full Name</label>
                    <input id="name" type="text" name="name" defaultValue={formState.name?.value}  />
                </p>
                <p className="control">
                    <label htmlFor="email">E-Mail Address</label>
                    <input id="email" type="text" name="email" defaultValue={formState.email?.value}  />
                </p>
                <p className="control">
                    <label htmlFor="street">Street</label>
                    <input id="street" type="text" name="street" defaultValue={formState.street?.value}  />
                </p>
                <div className="control-row">
                    <p className="control">
                        <label htmlFor="postal-code">Postal Code</label>
                        <input id="postal-code" type="text" name="postal-code" defaultValue={formState.postalCode?.value}  />
                    </p>
                    <p className="control">
                        <label htmlFor="city">City</label>
                        <input id="city" type="text" name="city" defaultValue={formState.city?.value}  />
                    </p>
                </div>
                {formState.errors &&
                <ul className="error">
                    {formState.errors.map(error => {
                        return <li key={error}>{error}</li>
                    })}
                </ul>
                }
                <p className="modal-actions">
                    <button className='text-button' type='button'>Close</button>
                    <Submit />
                </p>
            </form>
        </dialog>,
        document.getElementById('modal')
    )
};
