import React, { Fragment, useState, useEffect } from 'react'
import "./ResetPassword.css"
import Loader from "../layout/Loader/Loader"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, updatePassword } from '../../actions/userAction'
import { useAlert } from "react-alert"
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstant'
import MetaData from '../layout/MetaData'
import LockOpen from '@material-ui/icons/LockOpen'
import LockIcon from '@material-ui/icons/Lock'


const ResetPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { error, isUpdated, loading } = useSelector((state) => state.profile)
    const [Password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();


        myForm.set("newPassword", Password)
        myForm.set("confirmPassword", confirmPassword)
        dispatch(updatePassword(myForm))
    }


    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert.success("Profile updated Sucessfully")

            navigate("/account")
            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }
    }, [dispatch, error, alert, isUpdated, navigate])
    return (
        <Fragment>
            {loading ? <Loader /> : (<Fragment>
                <MetaData title="Change Password" />
                <div className="updatePasswordContainer">
                    <div className="updatePasswordBox">
                        <h2 className='updatePasswordHeading'>Change Password</h2>
                        <form className='updatePasswordForm' onSubmit={updatePasswordSubmit}>
                            <div className="signUpPassword">

                                <LockOpen />
                                <input type="password" placeholder='New Password' required name='password' value={Password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="signUpPassword">
                                <LockIcon />
                                <input type="password" placeholder='Confirm Password' required name='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <input type="submit" value="Change" className="updatePasswordBtn" />
                        </form>

                    </div>
                </div>
            </Fragment>)}
        </Fragment>
    )
}

export default ResetPassword