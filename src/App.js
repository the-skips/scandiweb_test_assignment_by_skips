import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductList from './Pages/ProductList';
import AddProduct from './Pages/AddProduct';

class App extends React.Component {


  render() {
    return (
      <BrowserRouter>
        <Route exact path="/">
          <ProductList />
        </Route>
        <Route exact path="/add-product">
          <AddProduct />
        </Route>
      </BrowserRouter>
    );
  }
}

export default App;
