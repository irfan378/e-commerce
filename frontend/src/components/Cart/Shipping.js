import { React, Fragment } from 'react'
import "./Shipping.css"
import { useSelector, useDispatch } from 'react-redux'
import MetaData from '../layout/MetaData'
import PinDropIcon from "@material-ui/icons/PinDrop"
import HomeIcon from "@material-ui/icons/Home"
import LocationCityIcon from "@material-ui/icons/LocationCity"
import PublicIcon from "@material-ui/icons/Public"
import PhoneIcon from "@material-ui/icons/Phone"
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation"
import { Country, State } from "country-state-city"
import { useAlert } from 'react-alert'
const Shipping = () => {
    const dispatch = useDispatch()
    const alert = useAlert();
    const { shippingInfo } = useSelector((state) => state.cart)

    return <Fragment></Fragment>
}

export default Shipping