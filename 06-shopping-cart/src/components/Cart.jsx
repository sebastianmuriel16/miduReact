import { ClearCartIcon, CartIcon } from "./Icons";
import { useId } from "react";
import { useCart } from "../Hooks/useCart";
import PropTypes from "prop-types";
import "./Cart.css";

function CartItem({ title, image, price, quantity, addToCart }) {
  return (
    <li>
      <img src={image} alt={title} />
      <div>
        <strong>{title}</strong> - ${price}
      </div>

      <footer>
        <small>Qty: {quantity}</small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  );
}

function Cart() {
  const cartCheckboxId = useId();
  const { cart, clearCart, addToCart } = useCart();

  return (
    <>
      <label className="cart-button" htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input type="checkbox" id={cartCheckboxId} hidden />

      <aside className="cart">
        <ul>
          {cart.map((product) => (
            <CartItem
              key={product.id}
              {...product}
              addToCart={() => addToCart(product)}
            />
          ))}
        </ul>

        <button onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  );
}

CartItem.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  addToCart: PropTypes.func,
};

export { Cart };
