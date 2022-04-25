import React, { Fragment } from 'react'
import "./Cart.css"
import CartItemCard from "./CartItemCard.js"
import { useDispatch, useSelector } from "react-redux"
import { removeItemsFromCart } from "../../actions/cartAction"
import { Link, useNavigate } from 'react-router-dom'
import { Typography } from "@material-ui/core"
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart"


const Cart = () => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart)
    const navigate = useNavigate();

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id))
    }
    const checkOutHandler = () => {
        navigate('/login?redirect=/shipping')
    }
    return <Fragment>
        {cartItems.length === 0 ? (<div className='emptyCart'>
            <RemoveShoppingCartIcon />
            <Typography>No product found in Your Cart</Typography>
            <Link to="/products">View Products</Link>
        </div>) : (<Fragment>
            <div className="cartPage">
                <div className="cartHeader">
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>Subtotal</p>
                </div >
                {cartItems && cartItems.map((item) => (
                    <div className="cartContainer" key={item.product}>
                        <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                        <div className="cartInput">

                            <input type="number" value={item.quantity} readOnly />

                        </div>
                        <p className='cartSubtotal'>{`$${item.price * item.quantity}`}</p>
                    </div>)
                )}

                <div className="cartGrossProfit">
                    <div></div>
                    <div className="cartGrossProfitBox">
                        <p>Gross Total</p>
                        <p>{`$${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}`}</p>
                    </div>
                    <div></div>
                    <div className="checkOutBtn">
                        <button onClick={checkOutHandler}>Check Out</button>
                    </div>
                </div>

            </div >
        </Fragment >)}
    </Fragment >
}

export default Cart