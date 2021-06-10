import React,{ Fragment, useEffect } from "react"

import MetaData from './layout/MetaData'

import { useDispatch, useSelector } from 'react-redux'
import {getProducts} from '../actions/productActions'


const Home = () => {
    const dispatch = useDispatch();
        
    useEffect(() => {
        dispatch(getProducts());     
    },[dispatch])

    return (
        <Fragment>
            <MetaData title={'Buy Products Online'} />
            
            <h1 id="products_heading">Latest Products</h1>

            <section id="products" className="container mt-5">
                        <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
                        <div className="card p-3 rounded">
                            <img className="card-img-top mx-auto"
                            src="https://images-na.ssl-images-amazon.com/images/I/61ylPEnk-dL._SL1500_.jpg " alt="HP Pavillion laptop" />
                        </div>
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">
                                {/* eslint-disable-next-line */}
                                <a href="#">HP Pavilion Gaming 10th Gen Intel Core i5 Processor 16.1" (40.9 cms) FHD Gaming Laptop (8GB/1TB HDD + 256GB SSD/Windows 10/MS Office/NVIDIA GTX 1650 4GB/Shadow Black), 16-a0022TX</a>
                            </h5>
                            <div className="ratings mt-auto">
                                <div className="rating-outer">
                                    <div className="rating-inner"></div>
                                </div>
                                <span id="no_of_reviews">(5 Reviews)</span>
                            </div>
                            <p className="card-text">$45.67</p>
                            {/* eslint-disable-next-line */}
                            <a href="#" id="view_btn" className="btn btn-block">View Details</a>
                        </div>
                            </div>
                        </div>
            </section>
        </Fragment>
    )
}


export default Home;