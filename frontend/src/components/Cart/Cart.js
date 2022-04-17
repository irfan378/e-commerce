import React, { Fragment } from 'react'
import "./Cart.css"
import CartItemCard from "./CartItemCard.js"
const Cart = () => {
    return <Fragment>
        <div className="cartPage">
            <div className="cartHeader">
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
            </div>
        </div>
    </Fragment>
}

export default Cart