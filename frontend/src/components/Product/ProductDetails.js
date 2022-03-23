import React, { Fragment, useEffect } from 'react'
import Carousal from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch, Provider } from 'react-redux';
import { getProductDetails } from '../../actions/productAction';
import { useParams } from "react-router-dom"
import ReactStars from "react-rating-stars-component"


const ProductDetails = () => {
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state.productDetails);
    const params = useParams();
    useEffect(() => {
        dispatch(getProductDetails, params.id)
    }, [dispatch, params.id]);
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true
    }

    return (
        <Fragment>
            <div className="ProductDetails">
                <div>
                    <Carousal>
                        {product.images && product.images.map((item, i) => (
                            <img className='CarouselImage' key={item.url} src={item.url} alt={`${i} Slide`} />
                        ))}
                    </Carousal>
                </div>
                <div className="detailsBlock-1">
                    <h2>{product.name}</h2>
                    <p>Product # {product._id}</p>
                </div>
                <div className="detailsBlock-2">
                    <ReactStars {...options}></ReactStars>
                    <span>({product.noOfReviews}Reviews)</span>
                </div>
                <div className="detailsBlock-3">
                    <h1>{`$${product.price}`}</h1>
                    <div className="detailsBlock-3-1">
                        <div className="detailsBlock-3-1-1">
                            <button>-</button>
                            <input value="1" type="number" />
                            <button>+</button>
                        </div>{""}
                        <button>Add to Cart</button>
                    </div>
                    <p>
                        Status:{""}
                        <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                            {product.Stock < 1 ? "Out of Stock" : "In Stock"}
                        </b>
                    </p>
                </div>
                <div className="detailsBlock-4">
                    Description: <p>{product.description}</p>
                </div>
            </div>
        </Fragment>);
}

export default ProductDetails   