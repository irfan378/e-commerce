import React, { Fragment, useEffect, useRef } from 'react'
import CheckoutSteps from './CheckoutSteps'
import { useSelector, useDispatch } from 'react-redux'
import MetaData from '../layout/MetaData'
import { Typography } from '@material-ui/core'
import { useAlert } from 'react-alert'
import { CardNumberElement, CartCveElement, CardExpiryElement, useStripe } from "@stripe/react-stripe-js"
import axios from 'axios'
import "./payment.css"
import CreditCardIcon from "@material-ui/icons/CreditCard"
import EventIcon from "@material-ui/icons/Event"
import VpnKey from '@material-ui/icons/VpnKey'
const Payment = () => {
    const submitHandler = () => { }
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
    const payBtn = useRef(null)
    return <Fragment>
        <MetaData title="Payment" />
        <CheckoutSteps activeStep={2} />\
        <div className="paymentContainer">
            <form onSubmit={(e) => submitHandler(e)} className="paymentForm">
                <Typography>Card Info</Typography>
                <div>
                    <CreditCardIcon />
                    <CardNumberElement className='paymentInput' />
                </div>
                <div>
                    <EventIcon />
                    <CardNumberElement className='paymentInput' />
                </div>
                <div>
                    <VpnKey />
                    <CardNumberElement className='paymentInput' />
                </div>
                <input type="submit" value={`Pay - ${orderInfo && orderInfo.totalPrice}`} ref={payBtn} className='paymentInfoBtn' />
            </form>
        </div>
    </Fragment>
}

export default Payment