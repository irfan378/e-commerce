import React, { Fragment, useState, useEffect } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import Person from "@material-ui/icons/Person";
import MailOutline from "@material-ui/icons/MailOutline";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_USER_RESET } from "../../constants/userConstant";
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";


const UpdateUser = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const params = useParams();

  const { loading, error, user } = useSelector((state) => state.userDetails);
  const { error: updateError, loading: updateLoading, isUpdated } = useSelector(
    (state) => state.profile
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const userId = params.id;
  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("User Created Sucessfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, navigate, updateError, isUpdated]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(myForm, userId));
  };

  return (
    <Fragment>
      <MetaData title="Update User" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
         {loading?<Loader/>: <form
            className="createProductForm"
            onSubmit={updateUserSubmitHandler}
          >
            <h1>Update User</h1>
            <div>
              <Person />
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <MailOutline />
              <input
                type="email"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <VerifiedUserIcon />
            <select value={role} onChange={(e)=>setRole(e.target.value)}>
                <option value="">Choose Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
            </select>
            </div>

            <Button
              disabled={
                updateLoading ? true : false || role === "" ? true : false
              }
              id="createProductBtn"
              type="submit"
            >
              Update
            </Button>
          </form>}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
