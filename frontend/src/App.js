import { useEffect,useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header'
import Footer from './components/layout/footer'
import Home from './components/home'
import ProductsDetails from './components/product/productDetails'


import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/confirmorder';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';



import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails';


import Login from './components/user/Login'
import Register from './components/user/register';
import Profile from './components/user/profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPasswordd';

// Dashboard imports
import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductsList';
import NewProduct from './components/admin/NewProduct';
import OrdersList from './components/admin/OrderList';
import ProcessOrder from './components/admin/ProcessOrder';

import ProtectedRoute from './components/route/ProtectedRoute';
import { loadUser } from './actions/userActions'
import store from './store'

import axios from "axios"
// Payment
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"


function App() {

  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser())

    async function getStripApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');
      console.log(data.stripeApiKey)

      setStripeApiKey(data.stripeApiKey)
    }

    getStripApiKey();

  }, [])
  
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Route path="/" component={Home} exact />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/product/:id" component={ProductsDetails} exact />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/cart" component={Cart} exact />
          <Route path="/password/forgot" component={ForgotPassword} exact/>
          <ProtectedRoute path="/me" component={Profile} exact />
          <ProtectedRoute path="/me/update" component={UpdateProfile} exact/>
          <ProtectedRoute path="/password/update" component={UpdatePassword} exact/>
          <ProtectedRoute path="/dashboard" isAdmin={true} component={Dashboard} exact/>
          <ProtectedRoute path="/admin/products" isAdmin={true} component={ProductsList} exact/>
          <ProtectedRoute path="/admin/product" isAdmin={true} component={NewProduct} exact/>
          <ProtectedRoute path="/shipping"  component={Shipping} />
          <ProtectedRoute path="/order/confirm"  component={ConfirmOrder} />
          <ProtectedRoute path="/success"  component={OrderSuccess} />
          {stripeApiKey &&
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/payment" component={Payment} />
            </Elements>
          }
          <ProtectedRoute path="/orders/me"  component={ListOrders} />
          <ProtectedRoute path="/order/:id/" component={OrderDetails} />
          <ProtectedRoute path="/admin/orders" isAdmin={true} component={OrdersList} exact/>
          <ProtectedRoute path="/admin/order/:id" isAdmin={true} component={ProcessOrder} exact/>


        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
