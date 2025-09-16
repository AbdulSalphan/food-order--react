import { useContext, useEffect, useState } from "react"
import { AppContext } from "./store/app-context"

export default function Cards() {
    const {shelfItems, addToCartHandler} = useContext(AppContext);
    const [shelfStatus, setShelfStatus] = useState(false);

    useEffect(() => {
        function updateShelf() {
            if(shelfItems != null) {
                setShelfStatus(true);
            }
        }
        updateShelf();
    }, [shelfItems])

    return (
        <ul id="meals">
            {shelfStatus && shelfItems.map(shelfItem => {
                return (
                    <li className='meal-item' key={shelfItem.id}>
                        <article>
                            <img src={`http://localhost:3000/${shelfItem.image}`} alt={shelfItem.name} />
                            <div>
                                <h3>{shelfItem.name}</h3>
                                <p className="meal-item-price">${shelfItem.price}</p>
                                <p className="meal-item-description">{shelfItem.description}</p>
                            </div>
                            <p className='meal-item-actions'>
                                <button className='button' onClick={() => addToCartHandler(shelfItem)}>Add to Cart</button>
                            </p>
                        </article>
                    </li>
                )
            })}
        </ul>
    )
};
