import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ProductList from './Pages/ProductList';
import AddProduct from './Pages/AddProduct';
import { Container } from 'react-bootstrap';

class App extends React.Component {


  render() {
    return (
      <BrowserRouter>
        <Container fluid className='App'>
          <Route exact path="/">
            <ProductList />
          </Route>
          <Route exact path="/add-product">
            <AddProduct />
          </Route>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
