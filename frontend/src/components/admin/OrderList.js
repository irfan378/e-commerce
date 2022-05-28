import React, { Fragment, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import "./productList.css"
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../layout/MetaData'
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import Sidebar from './Sidebar'
import { deleteOrders, getAllOrders, clearErrors } from '../../actions/orderAction'
import { DELETE_ORDER_RESET } from '../../constants/orderConstant'
const OrderList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const { error, orders } = useSelector((state) => state.allOrders);
    const { error: deleteError, isDeleted } = useSelector((state) => state.order);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrders(id));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            alert.success("Order Deleted Successfully");
            navigate("/admin/dashboard");
            dispatch({ type: DELETE_ORDER_RESET });
        }
        dispatch(getAllOrders())
    }, [dispatch, alert, error, deleteError, isDeleted, navigate])

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor";
            }
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            minWidth: 150,
            flex: 0.3
        },
        {
            field: "amount",
            headerName: "Amount",
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
                    <Fragment>
                        <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>
                        <Button onClick={() => deleteOrderHandler(params.getValue(params.id, "id"))}>
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                )
            }
        }
    ]
    const rows = [];
    orders && orders.forEach((item) => {
        rows.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            amount: item.totalPrice,
            status: item.orderStatus
        })
    })
    return <Fragment>
        <MetaData title={'ALL Orders - Admin'} />
        <div className="dashboard">
            <Sidebar />
            <div className="productListContainer">
                <h1 id='productListHeading'>All Products</h1>
                <DataGrid rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className='productListTable'
                    autoHeight
                />
            </div>
        </div>
    </Fragment>
}



export default OrderList