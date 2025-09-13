export default function Cards({addToCart, shelfItems}) {
    return (
        <ul id="meals">
            {shelfItems.map(shelfItem => {
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
                                <button className='button' onClick={() => addToCart(shelfItem)}>Add to Cart</button>
                            </p>
                        </article>
                    </li>
                )
            })}
        </ul>
    )
};
