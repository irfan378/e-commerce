import React, { Fragment, useEffect } from 'react'
import Carousal from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails } from '../../actions/productAction';
import { useParams } from "react-router-dom"


const ProductDetails = () => {
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state.productDetails);
    const params = useParams();
    useEffect(() => {
        dispatch(getProductDetails, params.id)
    }, [dispatch, params.id]);

    return (
        <Fragment>
            <div className="ProductDetails">
                <div>
                    <Carousal>
                        {product.images && product.images.map((item, i) => (
                            <img className='CarousalImage' key={item.url} src={item.url} alt={`${i} Slide`} />
                        ))};

                    </Carousal>
                </div>
            </div>
        </Fragment>);
}

export default ProductDetails   