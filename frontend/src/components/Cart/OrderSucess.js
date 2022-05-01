import React from 'react'
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import "./orderSucess.css"
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const OrderSucess = () => {
    return (
        <div className="orderSucess">
            <CheckCircleIcon />
            <Typography>Your Order has been Placed Sucessfully</Typography>
            <Link to="/order/me">View Orders</Link>
        </div>
    )
}

export default OrderSucess