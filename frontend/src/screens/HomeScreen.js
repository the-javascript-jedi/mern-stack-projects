import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
const HomeScreen = () => {
  //useDispatch() is a react hook used instead of higher order method like connect, mapStateToProps
  const dispatchHook = useDispatch();
  //useSelector hook is used for selecting the necessary state
  //productList state is specfied with the same name in the store within combineReducers
  const productList = useSelector((state) => state.productList);
  // 5- destructure data received from productList through redux
  const { loading, error, products } = productList;
  useEffect(() => {
    //1-we fire a dispatch to listProducts() Action
    dispatchHook(listProducts());
  }, [dispatchHook]);

  return (
    <>
      <h1>Latest Products</h1>
      {/* loading spinner */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => {
            return (
              <Col key={product._id} sm={12} md={6} lg={4}>
                <Product product={product} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};
export default HomeScreen;