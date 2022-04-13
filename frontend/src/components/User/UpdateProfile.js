import React, { Fragment, useState, useEffect } from 'react'
import "./UpdateProfile.css"
import Loader from "../layout/Loader/Loader"
import { Link, useNavigate } from "react-router-dom"
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import FaceIcon from "@material-ui/icons/Face"
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, loadUser, updateProfile } from '../../actions/userAction'
import { useAlert } from "react-alert"
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant'

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user)
    const { error, isUpdated, loading } = useSelector((state) => state.profile)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/profile.jpg")
    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("avatar", avatar)
        dispatch(register(myForm))
    }

    const registerDataChange = (e) => {

        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState == 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);


    }
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url)
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert.success("Profile updated Sucessfully")
            dispatch(loadUser())
            navigate("/account")
            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }
    }, [dispatch, error, alert, isUpdated, user, navigate])
    return (
        <div>UpdateProfile</div>
    )
}

export default UpdateProfile