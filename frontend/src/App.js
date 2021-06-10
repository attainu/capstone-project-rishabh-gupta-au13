import { BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/layout/Header'
import Footer from './components/layout/footer'
import Home from './components/home'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
            <Route path="/" component={Home} exact />
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
