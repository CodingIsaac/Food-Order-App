import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useContext, useState, Fragment } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
// import classes from './Cart.module.css'
// import { Button } from "bootstrap";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartctx = useContext(CartContext);

  const totalAmount = `$${cartctx.totalAmount.toFixed(2)}`;

  const hasItems = cartctx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartctx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartctx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch('https://foodapp-551f3-default-rtdb.firebaseio.com/order.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems: cartctx.items
        }),
      } );
      setIsSubmitting(false);
    setDidSubmit(true);
    cartctx.clearCart();
  }

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

  const modalAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Place Order
        </button>
      )}
    </div>
  );

  const cartModalContent =
  <Fragment>
     {cartItems}
  <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (

      <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />)}
      {!isCheckout && modalAction}
      </Fragment>

      const submittingModalContent = <p>Order sent Successfully</p>

      const didSubmitModalContent = (
        <Fragment>

          <p>Successful</p>
          <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>
              Close
            </button>
          </div>

        </Fragment>)

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && submittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
      
      
    </Modal>
  );
};

export default Cart;
