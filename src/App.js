import { Fragment, useState } from 'react';
import './App.css';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';

function App() {
  const [cartIsDisplayed, setDisplayedCart] = useState(false);

  const showCartHandler = () => {
    setDisplayedCart(true);
  }

  const hideCartHandler = () => {
    setDisplayedCart(false);
  }
  return (
    <Fragment>
     {cartIsDisplayed && <Cart  onClose={hideCartHandler}/>}

    
    <Header onShowCart={showCartHandler} />
    <main>
      <Meals />

    </main>
    

    </Fragment>
  );
}

export default App;
