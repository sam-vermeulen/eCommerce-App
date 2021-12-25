import React, { useEffect } from 'react'
import { Carousel, CarouselItem } from 'react-bootstrap';

import Loader from '../layouts/Loader';
import MetaData from '../layouts/MetaData';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById , clearErrors } from '../../actions/productActions';
import { useParams } from 'react-router-dom';

const ProductDetails = (path) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();

    const { loading, error, product } = useSelector(state => state.productDetails);

    useEffect(() => {
        dispatch(getProductById(params.id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error, params.id]);

    return (
        <>
            <MetaData title={product.name} />
            {loading ? <Loader /> : (
                <>
                    <div className="row f-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                            <Carousel fade='true' pause='hover'>
                                { product.images && product.images.map(image => (
                                        <CarouselItem key={image.public_id}>
                                            <img className="d-block w-100" src={image.url} alt={product.title} />
                                        </CarouselItem>
                                ))}
                            </Carousel>
                        </div>
            
                        <div className="col-12 col-lg-5 mt-5">
                            <h3>{product.name}</h3>
                            <p id="product_id">Product # {product._id}</p>
            
                            <hr />
            
                            <p id="product_price">${product.price}</p>
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus">-</span>
            
                                <input type="number" className="form-control count d-inline" value="1" readOnly />
            
                                <span className="btn btn-primary plus">+</span>
                            </div>
                            
                            <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4">Add to Cart</button>
            
                            <hr />
            
                            <p>Status: <span id="stock_status" className={product.stock > 0 ? "greenColor" : "redColor"}>{product.stock > 0 ? "In Stock" : "Out of Stock"}</span></p>
            
                            <hr />
            
                            <h4 className="mt-2">Description:</h4>
                            <p>{product.description}</p>
                            
                            <hr />
                            
                            <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ProductDetails
