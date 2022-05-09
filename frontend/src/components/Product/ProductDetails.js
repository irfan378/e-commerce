import React, { Fragment, useEffect, useState } from 'react'
import { CarouselProvider } from 'pure-react-carousel';
import "./ProductDetails.css";
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProductDetails } from '../../actions/productAction';
import { useParams } from "react-router-dom"
import ReactStars from "react-rating-stars-component"
import ReviewCard from "./ReviewCard"
import Loader from "../layout/Loader/Loader"
import MetaData from "../layout/MetaData"
import { addItemsToCart } from "../../actions/cartAction"
import { useAlert } from "react-alert"

const ProductDetails = () => {
    const alert = useAlert()
    const params = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state.productDetails);
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(params.id))
    }, [dispatch, params.id]);
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true
    }
    const [quantity, setQuantity] = useState(1);
    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    }
    const decreaseQuantity = () => {
        if (1 >= quantity) return;
        const qty = quantity - 1;
        setQuantity(qty);
    }
    const addToCartHandler = () => {
        dispatch(addItemsToCart(params.id, quantity))
        alert.success("Item Added To Cart")
    }
    return (
        <Fragment>
            {loading ? (<Loader></Loader>) : <Fragment>
                <MetaData title={`${product.name} -- ECOMMERCE`} />
                <div className="ProductDetails">
                    <div>
                        <CarouselProvider naturalSlideWidth={100}
                            naturalSlideHeight={125}
                            totalSlides={5}>
                            {product.images && product.images.map((item, i) => (
                                <img className='CarouselImage' key={item.url} src={item.url} alt={`${i} Slide`} />

                            ))}
                        </CarouselProvider>
                    </div>
                    <div>
                        <div className="detailsBlock-1">
                            <h2> {product.name}</h2>
                            <p>Product # {product._id}</p>
                        </div>
                        <div className="detailsBlock-2">
                            <ReactStars {...options} />
                            <span>({product.noOfReviews}Reviews)</span>
                        </div>
                        <div className="detailsBlock-3">
                            <h1>{`$${product.price}`}</h1>
                            <div className="detailsBlock-3-1">
                                <div className="detailsBlock-3-1-1">
                                    <button onClick={decreaseQuantity}>-</button>
                                    <input readOnly type="number" value={quantity} />
                                    <button onClick={increaseQuantity}>+</button>
                                </div>{" "}
                                <button disabled={product.Stock < 1 ? true : false} onClick={addToCartHandler}>Add to cart</button>
                            </div>
                            <p>Status:{""}
                                <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                </b>
                            </p>
                        </div>
                        <div className="detailsBlock-4">
                            Description : <p>{product.description}</p>
                        </div>
                        <button className="submitReview">Submit Review</button>
                    </div>
                </div>
                <h3 className="reviewHeading">Reviews</h3>
                {product.reviews && product.reviews[0] ? (
                    <div className="reviews">
                        {product.reviews && product.reviews.map((review) => <ReviewCard review={review} />)}):
                    </div>
                ) : (<p className='noReviews'>No Reviews Yet</p>)}
            </Fragment>}
        </Fragment>
    )
}

export default ProductDetails 