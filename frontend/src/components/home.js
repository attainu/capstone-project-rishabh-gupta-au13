import React,{ Fragment, useEffect } from "react"

import MetaData from './layout/MetaData'
import Product from './product/product'

import { useDispatch, useSelector } from 'react-redux'
import {getProducts} from '../actions/productActions'
import { useAlert } from "react-alert"

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const {products, error,productsCount} = useSelector(state=>state.products)
        
    useEffect(() => {
        if (error) {
            return alert.error(error)
        }

        dispatch(getProducts());

    },[dispatch,alert,error])

    return (
        <Fragment>
            <MetaData title={'Buy Products Online'} />
            
            <h1 id="products_heading">Latest Products</h1>

            <section id="products" className="container mt-5">
                <div className="row">
                    {products && products.map(product => (
                        <Product key={product._id} product={product} />
                        
                    ))}
                       
                    </div>
            </section>
        </Fragment>
    )
}


export default Home;