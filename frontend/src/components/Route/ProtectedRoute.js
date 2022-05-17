import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = () => {

    const { isAuthenticated, loading } = useSelector((state) => state.user)
    const location = useLocation()

    if (isAuthenticated === true && loading === false) {
        return <Outlet></Outlet>
    }
    return <Navigate to="/login" state={{ from: location }} />



}

export default ProtectedRoute