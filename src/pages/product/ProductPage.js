import React, { useContext } from "react";
import { useLocation } from 'react-router';
import { Link } from "react-router-dom";
import { BookContext } from "../../App";
import { Layout, Button, Card, List, Row, Col } from 'antd';
import "./product-styles.css";


const ProductPage = (props) => {
  const location = useLocation();
  const item = location.state.item;

  const context = useContext(BookContext);

  const totalCartCount = context.state.cart.reduce(
    (total, book) => (total = total + book.count),
    0
  );
  const book = item.id
  return (
    <div>

      <Col span={16} offset={4} >
        <List>
          <Card className="detailCard" >
            <Link to="/cart" style={{ color: "black", fontWeight: "bolder" }}>
              Cart({totalCartCount})
            </Link>
            <Row>
              <Col span={12}>
                <img className="card-img" src={item.image} />
              </Col >
              <Col span={12}>
                <h2> {item.title} </h2>
                <h3> {item.description} </h3>
                <Row>

                  <Button className="button" onClick={() => context.addToCart(book)}
                  >
                    Add to Cart
                  </Button>

                </Row>
              </Col>
            </Row>
          </Card>
        </List>
      </Col >

    </div >
  )
}

export default ProductPage;