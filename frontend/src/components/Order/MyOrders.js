import React, { useEffect, Fragment } from 'react'
import { DataGrid } from "@material-ui/data-grid"
import "./myOrders.css"
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, myOrders } from '../../actions/orderAction'
import Loader from '../layout/Loader/Loader'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Typography } from '@material-ui/core'
import MetaData from '../layout/MetaData'
import LaunchIcon from "@material-ui/icons/Launch"

const MyOrders = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user)
    const columns = [];
    const rows = [];
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(myOrders())
        }
    })
    return <Fragment>
        <MetaData title={`${user.name}-Orders`} />
        {loading ? (
            <Loader />
        ) : (
            <div className="myOrdersPage">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className='myOrdersTable'
                    autoHeight />
                <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
            </div>
        )}
    </Fragment>
}

export default MyOrders