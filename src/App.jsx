import {AppContext} from "./components/store/app-context";
import AppContextProvider from "./components/store/app-context";

import Cards from "./components/Cards";
import Header from "./components/Header";
import { useContext } from "react";

function App() {	
	const {shelfItems} = useContext(AppContext);
	return (
		<AppContextProvider>
			<Header />		
			{shelfItems ? 
				<Cards /> : 
				<p className="center">Loading the shelves...</p>
			}
		</AppContextProvider>
	);
}

export default App;
