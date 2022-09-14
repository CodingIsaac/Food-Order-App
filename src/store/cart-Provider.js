import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if(action.type === "ADD_CART_ITEM") {
        const updatedItems = state.items.concat(action.item);
        const updatedAMount = state.totalAmount + action.item.price * action.item.amount;
        return {
            items: updatedItems,
            totalAmount: updatedAMount
        }


    }

    return defaultCartState
};

const CartProvider = (props) => {
 const [cartCurrentState, dispatchAction] =  useReducer(cartReducer, defaultCartState);
  const addItemToCartHandler = (item) => {
    dispatchAction({type: 'ADD_CART_ITEM', item:item})
  };

  const removeItemFromCartHandler = (id) => {
    dispatchAction({type: "REMOVE_CART_ITEM", id:id})
  };

  const cartContext = {
    items: cartCurrentState.items,
    totalAmount: cartCurrentState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
