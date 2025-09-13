import { useState, useEffect } from "react";

import Cards from "./components/Cards";
import Header from "./components/Header";

function App() {
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
	
	return (
		<>
			<Header updateCount={updateCount} itemList={cartItems} />		
			{shelfItems ? 
				<Cards 
					shelfItems={shelfItems}
					addToCart={addToCartHandler} 
				/> : 
				<p className="center">Loading the shelves...</p>
			}
		</>
	);
}

export default App;
