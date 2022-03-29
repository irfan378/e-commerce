import React, { Fragment, useState } from 'react'
import "./Search.css"
import { Navigate, useNavigate } from 'react-router-dom';
const Search = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        }
        else {
            navigate("/products");
        }

    }
    return (
        <Fragment>
            <form onSubmit={searchSubmitHandler} className="searchBox">
                <input type="text" placeholder='Search a product ...' onChange={(e) => setKeyword(e.target.value)} />
                <input type="submit" value="search" />
            </form>
        </Fragment>
    )
}

export default Search