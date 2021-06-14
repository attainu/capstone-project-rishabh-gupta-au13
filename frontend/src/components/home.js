import React, { Fragment, useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import MetaData from "./layout/MetaData";
import Product from "./product/product";
import Loader from "./layout/Loader";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";



const Home = ({match}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const alert = useAlert();
  const dispatch = useDispatch();

  const { products, error, productCount, loading, resPerPage } = useSelector(
    (state) => state.products
  );
//   console.log(productCount)

const keyword=match.params.keyword

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts(keyword,currentPage));
  }, [dispatch, alert, error,keyword,currentPage]);

  function setCurrentPageNo(pageNumber) {
      console.log('hello')
      console.log(pageNumber)
    setCurrentPage(pageNumber);
  }

  return (
    <>
      {loading ? (
        <Loader />
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
          <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={currentPage}
            
            itemsCountPerPage={resPerPage}
            totalItemsCount={productCount}
            onChange={setCurrentPageNo}
            nextPageText={"Next"}
            prevPageText={"Prev"}
            firstPageText={"First"}
            lastPageText={"Last"}
            itemClass="page-item"
            linkClass="page-link"
          />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
