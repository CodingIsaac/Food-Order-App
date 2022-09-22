import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
// import classes from './Cart.module.css'
// import { Button } from "bootstrap";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);

  const cartctx = useContext(CartContext);

  const totalAmount = `$${cartctx.totalAmount.toFixed(2)}`;
  

  const hasItems = cartctx.items.length > 0;

  const cartItemRemoveHandler = id => {
    cartctx.removeItem(id);
  };

  const cartItemAddHandler = item => {
    cartctx.addItem({...item, amount:1});
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  // const modalAction = (
  //   <div className={classes.actions}>
  //     <button className={classes['button--alt']} onClick={props.onClose}>
  //       Close Order
  //     </button>
  //     { hasItems && (
  //       <button className={classes.button} onClick={orderHandler}>
  //         Place Order
  //       </button>

  //     ) }

  //     </div>
  //   )

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
     {!isCheckout && <Checkout onCancel={props.onClose} />}
     {/* {!isCheckout && modalAction} */}
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Place Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
