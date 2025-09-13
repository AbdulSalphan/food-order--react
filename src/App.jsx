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

	// function addToCartHandler(foodItem) {
	// 	setCartItems(prevState => {
	// 		let newCart = [];
	// 		for (let item of prevState) {
	// 			let newItem = {...item};
	// 			if(item.id === foodItem.id) {
	// 				newItem.quantity += 1;
	// 			}
	// 			newCart.push(newItem);
	// 		}
	// 		return newCart;
	// 	})
	// }
	
	return (
		<>
			<Header itemList={cartItems} />		
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
