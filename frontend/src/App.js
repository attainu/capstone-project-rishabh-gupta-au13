import { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header'
import Footer from './components/layout/footer'
import Home from './components/home'
import ProductsDetails from './components/product/productDetails'
import Login from './components/user/Login'
import Register from './components/user/register';
import Profile from './components/user/profile';

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
          <Route path="/product/:id" component={ProductsDetails} exact />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/me" component={Profile} exact/>


        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
