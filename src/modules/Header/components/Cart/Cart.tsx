import {
  Button,
  Popover,
  Divider, Group, Text,
} from "@mantine/core";
import style from "./Cart.module.scss";
import CartIcon from "../../../../assets/icons/Cart.svg?react";
import CardPopupCart from "./UI/CardPopupCart.tsx";
import {useContext} from "react";
import {VegetableContext} from "../../../../contexts/VegetableContext.tsx";

function Cart() {

  const context = useContext(VegetableContext);
  if (!context) return null;
  const vegetablesData = context.dataCardCart
  const setVegetablesData = context.setDataCardCart

  function decrease(id: number) {
    setVegetablesData((prev) => {
      return prev.map((vegetable) => {
        if (vegetable.id === id) {
          return {...vegetable, quantity: Math.max(1,  vegetable.quantity - 1)};
        }
        return vegetable;
      });
    });
  }

  function increase(id: number) {
    setVegetablesData((prev) => {
      return prev.map((vegetable) => {
        if(vegetable.id === id){
          return {...vegetable, quantity: vegetable.quantity + 1};
        }
        return vegetable
      });
    });
  }


  return (
    <Popover offset={20} shadow={'0 2px 8px 0 rgba(33, 37, 41, 0.08), 0 1px 2px 0 rgba(33, 37, 41, 0.1)'}>
      <Popover.Target >
        <Button classNames={{root: style.ButtonRoot}} rightSection={<CartIcon />} variant="filled" color="#54b46a">
          Cart
        </Button>
      </Popover.Target>
      <Popover.Dropdown style={{ padding: "20px", borderRadius: "16px" }} >
        {vegetablesData.map((vegetable, index) => (
          <div key={vegetable.id}>
            <CardPopupCart id={vegetable.id}
                           name={vegetable.name}
                           wieght={vegetable.wieght}
                           price={vegetable.price}
                           image={vegetable.image}
                           quantity={vegetable.quantity}
                           increase={increase}
                           decrease={decrease}
            />
            {(index != vegetablesData.length - 1) ? <Divider classNames={{root: style.dividerCard}} /> : null}
          </div>
        ))}
        <Divider classNames={{root: style.divider}} />
        <Group justify='space-between'>
          <Text classNames={{root: style.textTotal}}>Total</Text>
          <Text classNames={{root: style.textTotal}}>
            $ {vegetablesData.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)}
          </Text>
        </Group>
      </Popover.Dropdown>
    </Popover>
  )
}
export default  Cart;