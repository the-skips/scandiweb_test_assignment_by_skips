import './App.css';
import React from 'react';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import ProductList from './Pages/ProductList';

class App extends React.Component {


  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<ProductList/>}/>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
