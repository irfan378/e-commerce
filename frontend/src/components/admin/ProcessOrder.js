import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import { Link, useNavigate, useParams } from "react-router-dom"
import { Typography } from '@material-ui/core'
import AttachMoneyIcon from "@material-ui/icons/AttachMoney"
import Sidebar from "./Sidebar"
import { clearErrors, getOrderDetails } from '../../actions/orderAction'
import { useAlert } from 'react-alert'

const ProcessOrder = () => {
    const { order,error,loading } = useSelector((state) => state.orderDetails)
   
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const params=useParams();
    const alert=useAlert();
   
    const proceedToPayment = () => {
    }
    useEffect(()=>{
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getOrderDetails(params.id))
    },[dispatch,alert,error,params.id])
    return <Fragment>
        <MetaData title="Create Product" />
        <div className="dashboard">
            <Sidebar />
            <div className="newProductContainer">
            <div className="confirmOrderPage">
            <div>
                <div className="confirmShippingArea">
                    <Typography>Shipping Info</Typography>
                    <div className="orderDetailsContainerBox">
                            <div>
                                <p>Name: </p>
                                <span>{order.user && order.user.name}</span>
                            </div>
                            <div>
                                <p>Phone: </p>
                                <span>{order.shippingInfo && order.shippingInfo.PhoneNo}</span>
                            </div>
                            <div>
                                <p>Address: </p>
                                <span>{order.shippingInfo && `${order.shippingInfo.address},${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.pinCode},${order.shippingInfo.country}`}</span>
                            </div>
                        </div>
                </div>
                <Typography>Payment</Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p className={order.paymentInfo && order.paymentInfo.status === "succeeded" ? "greenColor" : "redColor"}>
                                    {order.paymentInfo && order.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"}
                                </p>
                            </div>
                            <div>
                                <p>Amount:</p>
                                <span>{order.totalPrice && order.totalPrice}</span>
                            </div>
                        </div>
                        <Typography>Order Status</Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p className={order.orderStatus && order.orderStatus === "Delivered" ? "greenColor" : "redColor"}>
                                    {order.orderStatus && order.orderStatus}
                                </p>
                            </div>
                        </div>
                <div className="confirmCartItems">
                    <Typography>Your Cart Items:</Typography>
                    <div className="confirmCartItemsContainer">
                        {order.orderItems &&order.orderItems.map((item) => (
                            <div key={item.product}>
                                <img src={item.image} alt="Product" />
                                <Link to={`/product/${item.product}`}>
                                    {item.name}
                                </Link>{""}
                                <span>
                                    {item.quantity} X {item.price}={""}
                                    <b>${item.price * item.quantity}</b>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* */}
            <div>
                <div className="orderSummary">
                    <Typography>Order Summary</Typography>
                    <div>
                        <div>
                            <p>Subtotal:</p>
                            <span>$34343</span>
                        </div>
                        <div>
                            <p>Shipping Charges:</p>
                            <span>$3545445</span>
                        </div>
                        <div>
                            <p>GST:</p>
                            <span>$5454545</span>
                        </div>
                    </div>
                    <div className="orderSummaryTotal">
                        <p>
                            <b>Total:</b>
                        </p>
                        <span>$2222</span>
                    </div>
                    <button onClick={proceedToPayment}>Proceed To Payment</button>
                </div>
            </div>
        </div>
            </div>
        </div>
    </Fragment>
     

       
 
}


export default ProcessOrder