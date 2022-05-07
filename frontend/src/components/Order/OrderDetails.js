import React, { Fragment, useEffect } from 'react'
import "./orderDetails.css"
import { useSelector, useDispatch } from 'react-redux'
import MetaData from '../layout/MetaData'
import { Link, useParams } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { getOrderDetails, clearErrors } from '../../actions/orderAction'
import Loader from '../layout/Loader/Loader'
import { useAlert } from 'react-alert'

const OrderDetails = () => {
    const params = useParams();
    const { order, error, loading } = useSelector((state) => state.orderDetails)
    const dispatch = useDispatch();
    const alert = useAlert();

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        dispatch(getOrderDetails(params.id))
    }, [dispatch, alert, error, params.id])
    return <Fragment>
        {loading ? <Loader /> : (
            <Fragment>
                <MetaData title="Order Details" />
                <div className="orderDetailsPage">
                    <div className="orderDetailsContainer">
                        <Typography component="h1">
                            Order #{order && order._id}
                        </Typography>
                    </div>
                </div>
            </Fragment>
        )}
    </Fragment>
}

export default OrderDetails