import React, { Fragment, useEffect } from 'react'
import { CgMouse } from 'react-icons/cg'
import "./Home.css"
import Product from "./Product.js"
import MetaData from '../layout/MetaData'
import { getProducts } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../layout/Loader/Loader'

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const { loading, error, products, productsCount } = useSelector(
        (state) => state.products
    )
    return (
        <Fragment>
            {loading ? (<Loader></Loader>) : (
                <Fragment>
                    <MetaData title="e-commerce" />
                    <div className="banner">
                        <p>Welcome to Ecommerce</p>
                        <h1>You can find products below</h1>

                        <a href="#container">
                            <button>
                                Scroll <CgMouse />
                            </button>
                        </a>
                    </div>
                    <h2 className="homeHeading">Featured Products</h2>
                    <div className="container" id="container">

                        {products && products.map(product => (
                            <Product product={product} />
                        ))}
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Home