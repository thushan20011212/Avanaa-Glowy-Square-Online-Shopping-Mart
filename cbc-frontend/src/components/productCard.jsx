

export default function ProductCard(props) {
    console.log(props);

    return (
        <div className="product-card">
            <img className="productImage" src={props.image} />
            <h2>{props.name}</h2>
            <p>{props.description}</p>
            <span>price{props.price}</span>
            <button>Buy Now</button>
            <button>Add to Cart</button>
        </div>
    )
}