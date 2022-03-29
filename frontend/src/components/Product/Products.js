import React, { Fragment, useEffect } from 'react'
import "./Product.css"
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProducts } from "../../actions/productAction"
import Loader from "../layout/Loader/Loader";
import ProductCard from '../Home/ProductCard';
const Products = () => {
    const dispatch = useDispatch();
    const { products, loading, error, productsCount } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])

    return <Fragment>
        {loading ? <Loader></Loader> : <Fragment>
            <h2 className="productHeading">Products</h2>
            <div className="products">
                {products && products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </Fragment>}
    </Fragment>
}

export default Products