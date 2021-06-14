import React,{ Fragment, useEffect } from "react"

import MetaData from './layout/MetaData'
import Product from './product/product'
import Loader from "./layout/loader"
import { useDispatch, useSelector } from 'react-redux'
import {getProducts} from '../actions/productActions'
import { useAlert } from "react-alert"

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const {products, error,productsCount,loading} = useSelector(state=>state.products)
        
    useEffect(() => {
        if (error) {
            return alert.error(error)
        }

        dispatch(getProducts());

    },[dispatch,alert,error])

    return (
        <>
          {loading ? (
            <Loader/>
          ) : (
            <>
              <MetaData title={"Buy Best Products Online"} />
              <h1 id="products">Latest Products</h1>
              <section id="products" className="container mt-5">
                <div className="row">
                  {products &&
                    products.map((product) => (
                      <Product key={product._id} product={product} />
                    ))}
                </div>
              </section>
            </>
          )}
        </>
      );
    };
    
    export default Home;
    