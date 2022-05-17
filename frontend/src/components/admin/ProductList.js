import React, { Fragment, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import "./productList.css"
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getAdminProducts } from '../../actions/productAction'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../layout/MetaData'
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import Sidebar from './Sidebar'
const ProductList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1
        },
        {
            field: "stock",
            headerName: "Stock",
            minWidth: 150,
            type: "number",
            flex: 0.3
        },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 270,
            flex: 0.5
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sorrtable: false,
            renderCell: (params) => {
                return (
                    <Fragment></Fragment>
                )
            }
        }
    ]
    return (
        <div>ProductList</div>
    )
}

export default ProductList