import React, { Fragment, useState, useEffect } from 'react'
import "./newProduct.css"
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, createProduct } from '../../actions/productAction'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'


const NewProduct = () => {
    return (
        <div>NewProduct</div>
    )
}

export default NewProduct