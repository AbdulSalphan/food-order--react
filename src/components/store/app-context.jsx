import { createContext, useEffect, useState } from "react"

export const AppContext = createContext({
    cartItems: [],
    shelfItems: {},
    updateCount: () => {},
    addToCartHandler: () => {}
})

export default function AppContextProvider({children}) {
    const [shelfItems, setShelfItems] = useState(null);
	const [cartItems, setCartItems] = useState();

  	useEffect(() => {
		async function getData() {
			const response = await fetch('http://localhost:3000/meals')
			const resData = await response.json();
			setShelfItems(resData);	
			initiateCartItems(resData);
		}
      	getData();
        console.log(shelfItems);
  	}, [])

    function initiateCartItems(cartData) {
		for (let data in cartData) {
			cartData[data].quantity = 0;
		}
		setCartItems(cartData);
	}

	function addToCartHandler(foodItem) {
		setCartItems(prevState => 
			prevState.map(item =>
				item.id === foodItem.id
				? { ...item, quantity: item.quantity + 1 }
				: item
			)
		)
	}

	function updateCount(action, foodItem) {
		if(action === 'decrement') {
			setCartItems(prevState => 
			prevState.map(item =>
				item.id === foodItem.id
				? { ...item, quantity: item.quantity - 1 }
				: item
			)
		)
		} else if(action === 'increment') {
			setCartItems(prevState => 
			prevState.map(item =>
				item.id === foodItem.id
				? { ...item, quantity: item.quantity + 1 }
				: item
			)
		)
		}
	}

    const contextValue = {
        cartItems,
        shelfItems,
        updateCount,
        addToCartHandler
    }

    return (
        <AppContext value={contextValue}>{children}</AppContext>
    )
};
