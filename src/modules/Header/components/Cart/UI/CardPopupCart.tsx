import style from "./CardPopupCart.module.scss";
import {
  ActionIcon,
  Box,
  Card,
  Group,
  Image,
  Text
} from "@mantine/core";
import Minus from "../../../../../assets/icons/Minus.svg?react";
import Plus from "../../../../../assets/icons/Plus.svg?react";
import type { Vegetables } from "../../../../../types.tsx";

type CardPopupCartProps = Vegetables & {
  decrease: (id: number) => void;
  increase: (id: number) => void;
};


function CardPopupCart({image, wieght, name, price, quantity, id, decrease, increase}: CardPopupCartProps) {
  return (
    <Card classNames={{root: style.cardRoot}}>
      <Group justify="space-between" >
        <Image
          src={image}
          h={60}
          w={60}
          alt=""
          classNames={{root: style.img}}
        />
        <Box className={style.Box}>
          <Group gap={12}>
            <Text classNames={{root: style.textName}}>{name}</Text>
            <Text classNames={{root: style.textWeight}}>{wieght}</Text>
          </Group>
          <Text classNames={{root: style.textPrice}}>$ {price}</Text>
        </Box>
        <Group justify="flex-end" gap={10} classNames={{root: style.groupActionIcon}}>
          <ActionIcon onClick={() => {decrease(id)}} classNames={{root: style.buttonCount}} variant="filled" color="#dee2e6">{<Minus />}</ActionIcon>
          <Text>{quantity}</Text>
          <ActionIcon onClick={() => {increase(id)}} classNames={{root: style.buttonCount}} variant="filled" color="#dee2e6">{<Plus />}</ActionIcon>
        </Group>
      </Group>
    </Card>
  )
}
export default CardPopupCart;