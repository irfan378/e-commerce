import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import { Link,  useParams } from "react-router-dom"
import { Typography } from '@material-ui/core'
import AccountTreeIcon from "@material-ui/icons/AccountTree"
import Sidebar from "./Sidebar"
import { clearErrors, getOrderDetails, updateOrders } from '../../actions/orderAction'
import { useAlert } from 'react-alert'
import Loader from '../layout/Loader/Loader'
import {Button} from "@material-ui/core"
import { UPDATE_ORDER_RESET } from '../../constants/orderConstant'
const ProcessOrder = () => {
    const { order,error,loading } = useSelector((state) => state.orderDetails)
    const {error:updateError,isUpdated}=useSelector((state)=>state.order)
   

    const dispatch=useDispatch();
    const params=useParams();
    const alert=useAlert();
    const[status,setStatus]=useState("");
   
    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("status", status);
       
        dispatch(updateOrders(params.id, myForm))
    }
    useEffect(()=>{
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Process Updated Sucessfully");
            dispatch({type:UPDATE_ORDER_RESET})
        }
        dispatch(getOrderDetails(params.id))
    },[dispatch,alert,error,params.id,isUpdated,updateError])
    return <Fragment>
        <MetaData title="Process Order" />
        <div className="dashboard">
            <Sidebar />
            <div className="newProductContainer">
{loading?<Loader/>:
                
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
                <form className="createProductForm" encType="multipart/form-data" onSubmit={updateOrderSubmitHandler}>
                    <h1>Process Order</h1>
                    <div>
                        <AccountTreeIcon />
                        <select onChange={(e) => setStatus(e.target.value)}>
                            <option value="">Choose Category</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                          
                           
                        </select>
                    </div>
                    <Button disabled={loading?true:false||status===""?true:false} id='createProductBtn' type='submit'>Create</Button>

                </form>
                </div>
            </div>}
            </div>
        </div>
    </Fragment>
     

       
 
}


export default ProcessOrder