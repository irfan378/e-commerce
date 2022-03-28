import React, { Fragment } from 'react'
import "./Product.css"
import { useSelector, useDispatch } from 'react-redux'
import Loader from "../layout/Loader/Loader";
import ProductCard from '../Home/ProductCard';
const Products = () => {
    return <Fragment>
        {loading ? <Loader></Loader> : <Fragment></Fragment>}
    </Fragment>
}

export default Products