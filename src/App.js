import {  useState } from 'react';
import './App.css';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/cart-Provider';

function App() {
  const [cartIsDisplayed, setDisplayedCart] = useState(false);

  const showCartHandler = () => {
    setDisplayedCart(true);
  }

  const hideCartHandler = () => {
    setDisplayedCart(false);
  }
  return (
    <CartProvider>
    
     {cartIsDisplayed && <Cart  onClose={hideCartHandler}/>}

    
    <Header onShowCart={showCartHandler} />
    <main>
      <Meals />

    </main>

    </CartProvider>
    

    
  );
}

export default App;
