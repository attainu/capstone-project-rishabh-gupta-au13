import { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header'
import Footer from './components/layout/footer'
import Home from './components/home'
import ProductsDetails from './components/product/productDetails'
import Cart from './components/cart/Cart';
import Login from './components/user/Login'
import Register from './components/user/register';
import Profile from './components/user/profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPasswordd';

import ProtectedRoute from './components/route/ProtectedRoute';
import { loadUser } from './actions/userActions'
import store from './store'

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
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
          <Route path="/password/forgot" component={ForgotPassword} exact/>
          <ProtectedRoute path="/me" component={Profile} exact />
          <ProtectedRoute path="/me/update" component={UpdateProfile} exact/>
          <ProtectedRoute path="/password/update" component={UpdatePassword} exact/>
          <Route path="/cart" component={Cart} exact />

          


        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
