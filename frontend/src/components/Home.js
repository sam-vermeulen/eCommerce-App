import React from 'react'

import MetaData from './layouts/MetaData'

const Home = () => {
    return (
        <>
            <MetaData title="Home" />
            <h1 id="products_heading">Products</h1>

            <section id="products" className="container mt-5">
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
                        <div className="card p-3 rounded">
                            <img
                            className="card-img-top mx-auto"
                            src="https://m.media-amazon.com/images/I/617NtexaW2L._AC_UY218_.jpg"
                            />
                            <div className="card-body d-flex flex-column">
                            <h5 className="card-title">
                                <a href="">128GB Solid Storage Memory card - SanDisk Ultra</a>
                            </h5>
                            <div className="mt-auto">
                                <p className="card-text">$45.67</p>
                            </div>
                            <a href="#" id="view_btn" className="btn btn-block">View Details</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home
