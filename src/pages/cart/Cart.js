import React from "react";
import "./styles.css";
import "./cart.css";
import { Link } from "react-router-dom";
import { BookContext } from "../../App";
import { useContext } from "react";

const Cart = () => {
  const context = useContext(BookContext);

  const totalCartAmount = context.state.cart
    .reduce((total, book) => (total = total + book.price * book.count), 0)
    .toFixed(2);

  const totalCartCount = context.state.cart.reduce(
    (total, book) => (total = total + book.count),
    0
  );

  return (
    <div>
      <h2>
        <Link
          to="/collections"
          style={{ color: "black", fontWeight: "bolder", marginRight: "200px" }}
        >
          Collections
        </Link>{" "}
        <span style={{ color: "black", fontWeight: "bolder" }}>
          Cart({totalCartCount})
        </span>
      </h2>

      <h3 style={{ color: "black" }}>
        Toplam Sepet Tutarı: &#8378;{totalCartAmount}
      </h3>
      <div className="row">
        {this.context.state.cart.map((book) => (
          <div className="card-container" style={{ width: "600px" }}>
            <div className="book" key={book.id}>
              <img src={book.image} alt={book.name} />
              <div>
                <h4 style={{ color: "white" }}>{book.name}</h4>
                <p style={{ color: "white" }}>Price: &#8378;{book.price}</p>
                <p style={{ color: "white" }}>
                  Total: &#8378;{(book.price * book.count).toFixed(2)}
                </p>
                <p style={{ color: "white" }}>
                  There is a total {book.count} of this material in your cart.
                </p>
                <button
                  type="button"
                  class="btn btn-outline-light"
                  onClick={() => context.removeFromCart(book.id)}
                >
                  Sepetten çıkar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
