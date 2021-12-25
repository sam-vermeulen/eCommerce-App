import React, { useEffect, useState } from 'react'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'

import { useAlert } from 'react-alert'

import MetaData from './layouts/MetaData'
import Product from './product/Product'
import Loader from './layouts/Loader'
import { useParams } from 'react-router-dom'

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 1000]);
    const [tempPrice, setTempPrice] = useState([1, 1000]);
    const [category, setCategory] = useState('All');

    const categories = [
        'All', 'Electronics', 'Cameras', 'Laptops', 'Accessories', 'Headphones', 'Food', 'Books', 'Clothes/Shoes', 'Beauty/Health', 'Sports', 'Outdoors', 'Home'
    ]

    const alert = useAlert();
    const dispatch = useDispatch();
    const params = useParams();

    const { loading, products, productsCount, error, itemsPerPage, filteredProductsCount } = useSelector(state => state.products);

    const keyword = params.keyword;
    const page = params.page;

    useEffect(() => {

        if (error) {
            return alert.error(error);
        }

        dispatch(getProducts(keyword, currentPage, price, category));
        
    }, [dispatch, alert, error, currentPage, keyword, price, category]);

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title="Home" />
                    <h1 id="products_heading">Products</h1>
        
                    <section id="products" className="container mt-5">
                        <div className="row">
                            <>
                                <div className="col-6 col-md-3 mt-5 mb-5">
                                    <h4>Filters</h4>
                                    <hr />
                                    <h5 className='mb-5'>Price</h5> 
                                    <div className="px-5">
                                        <Range
                                            marks={{ 1 : `$1`, 1000: `$1000` }}
                                            min={1}
                                            max={1000}
                                            defaultValue={[1, 1000]}
                                            tipFormatter={value => (`$${value}`)}
                                            tipProps={{ placement: "top", visible: true }}
                                            value={tempPrice}
                                            onChange={setTempPrice}
                                            onAfterChange={setPrice}
                                            allowCross={false}
                                        ></Range>
                                    </div>
                                    <h5 className='mt-5'>Category</h5>

                                    <div className='form-check'>
                                        <ul className='px-5'>
                                            {categories.map(c => (
                                                <li style={{cursor: 'pointer', listStyleType: 'none'}} key={c} onClick={() => {setCategory(c); setCurrentPage(1)}}>
                                                    <input className='form-check-input' type='radio' name='flexRadioDefault' id={c} defaultChecked={c === category}/>                                                   
                                                    <label className='form-check-label' htmlFor={c}>{c}</label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div> 

                                <div className="col-6  col-md-9">
                                    <div className="row">
                                        {products && products.map(product => (
                                            <Product key={ product._id } product={ product } col={4}/>
                                        ))}
                                    </div>
                                </div>
                            </>
                        </div>
                    </section>

                    <div className="d-flex justify-content-center mt-5">
                        { (productsCount == null || itemsPerPage >= filteredProductsCount) ?
                            <></> : (<Pagination
                                activePage={currentPage}
                                itemsCountPerPage={itemsPerPage}
                                totalItemsCount={filteredProductsCount}
                                onChange={setCurrentPage}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="First"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                            />)}
                    </div>
                </>
            )}
        </>
    )
}

export default Home
