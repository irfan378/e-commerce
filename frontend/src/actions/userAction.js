import { LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS, CLEAR_ERRORS } from "../constants/userConstant";
import axios from "axios"

export const login = (email, password) => async (dispatch) => {
    try {

    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message })
    }
}