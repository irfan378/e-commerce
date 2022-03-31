import React, { Fragment, useEffect, useState } from 'react'
import "./Product.css"
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProducts } from "../../actions/productAction"
import Loader from "../layout/Loader/Loader";
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination"
import Slider from "@material-ui/core/Slider"
import Typography from '@material-ui/core/Typography';
const Products = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);

    const keyword = params.keyword;
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    }
    useEffect(() => {
        dispatch(getProducts(keyword, currentPage, price));
    }, [dispatch, keyword, currentPage, price])
    let count = filteredProductsCount;
    return <Fragment>
        {loading ? <Loader></Loader> : <Fragment>
            <h2 className="productHeading">Products</h2>
            <div className="products">
                {products && products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
            <div className="filterBox">
                <Typography>Price</Typography>
                <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="on"
                    aria-labelledby='range-slider'
                    min={0}
                    max={25000}
                />
            </div>
            {resultPerPage < count && <div className="paginationBox">
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                />
            </div>}
        </Fragment>}
    </Fragment>
}

export default Products