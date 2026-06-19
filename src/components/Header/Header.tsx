import style from "./header.module.scss";
import Cart from "../../assets/icons/Cart.svg?react";
import {Button} from "@mantine/core";

function Header() {
  return (
    <header className={style.container}>
      <div className={style.containerTitle}>
        <h1 className={style.title}>Vegetable</h1>
        <div className={style.titleSHOP}>SHOP</div>
      </div>
      <Button classNames={{root: style.ButtonRoot}} rightSection={<Cart />} variant="filled" color="#54b46a">
        Cart
      </Button>
    </header>
  )}
export default Header;