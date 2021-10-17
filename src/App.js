import React, { createContext, useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/hero/HomePage";
import "antd/dist/antd.css";
import ShopPage from "./pages/shop/ShopPage";
import { data } from "./data";

import { Layout, Menu } from 'antd';
import { Typography } from 'antd';
import MyHeader from './components/MyHeader';
import ProductPage from "./pages/product/ProductPage";
import About from "./pages/about/About";
import MyFooter from "./components/footer/myfooter";
import Cart from "./pages/cart/Cart";
import Login from "./pages/login/login";

const { Title } = Typography;
const { SubMenu } = Menu;


export const BookContext = createContext();


function App() {



  const [state, setState] = useState({
    bookList: data,
    cart: [],
  });

  const addToCart = (book) =>
    setState({
      ...state,
      cart: state.cart.find((cartItem) => cartItem.id === book.id)
        ? state.cart.map((cartItem) =>
          cartItem.id === book.id
            ? { ...cartItem, count: cartItem.count }
            : cartItem
        )
        : [...state.cart, { ...book, count: 1 }],
    });

  const removeFromCart = (id) =>
    setState({
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== id),
    });


  return (
    <BookContext.Provider value={{ state: state, addToCart, removeFromCart }}>
      <Router>
        <div>
          <Layout>
            <MyHeader style={{ position: 'fixed', bottom: 0, width: '100%' }} />
            <Switch>
              <Route path="/about" component={About} />
              <Route path="/shop" component={ShopPage} />
              <Route path="/homepage" component={HomePage} />
              <Route path="/cart" component={Cart} />
              <Route path="/" component={Login} />
              <Route path="/product" component={ProductPage} />
            </Switch>
            <MyFooter />
          </Layout>
        </div>
      </Router>
    </BookContext.Provider>
  );
}

export default App;
