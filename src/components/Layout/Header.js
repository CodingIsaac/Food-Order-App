import { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton"

import Image from "../../assets/meals.jpg";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Aisha Meals</h1>
        <HeaderCartButton />
        
      </header>
      <div className={classes["main-image"]} >
        <img src={Image} alt="Table of Delicious Meals"/>
      </div>
    </Fragment>
  );
};

export default Header;
