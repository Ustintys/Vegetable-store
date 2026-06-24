import style from "./catalog.module.scss";
import CardProduct from "./components/CardProduct/CardProduct.tsx";
import {useEffect, useState, useContext} from "react";
import ky from "ky";
import type {Vegetables} from "../../types.tsx";
import {VegetableContext} from "../../contexts/VegetableContext.tsx";

function Catalog() {

  const context = useContext(VegetableContext);
  if (!context) return null;
  const setDataCardCart = context.setDataCardCart;
  const dataCardCart = context.dataCardCart;

  const skeleton = [];  // заглушка
  for (let i = 0; i < 8; i++) {
    skeleton.push(
      {
        id: i,
        name: '',
        wieght: '',
        price: 0,
        image: '',
        quantity: 0,
      }
    );
  }

  const [loading, setLoading] = useState(true);

  const [vegetables, setVegetables] = useState<Vegetables[]>(skeleton);

  useEffect(() => {
    async function getData() {
      try {
        const data = await ky
          .get('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json')
          .json<Vegetables[]>();

        const transformData = data.map((product) => {
          const [name, wieght] = product.name.split(' - ');
          const quantity = 1;
          return(
            {...product, name, wieght, quantity}
          )
        })

        setVegetables(transformData);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  },[]);


  function saveDataCard(id: number) {

    const vegetable = vegetables.find((v) => v.id === id);

    if (!vegetable) return;

    const existingItem = dataCardCart.find((item) => item.id === vegetable.id);

    if (existingItem) {
      setDataCardCart((prev) =>
        prev.map((item) => {
          if (item.id === vegetable.id) {
            return {...item, quantity: item.quantity + vegetable.quantity };
          }
          return item;
        })
      );
    } else {
      setDataCardCart((prev) => [...prev, {...vegetable, quantity: 1,},]);
    }
  }


  function decrease(id: number) {
    setVegetables((prev) => {
      return prev.map((vegetable) => {
        if (vegetable.id === id) {
          return {...vegetable, quantity: Math.max(1,  vegetable.quantity - 1)};
        }
        return vegetable;
      });
    });
  }

  function increase(id: number) {
    setVegetables((prev) => {
      return prev.map((vegetable) => {
        if(vegetable.id === id){
          return {...vegetable, quantity: vegetable.quantity + 1};
        }
        return vegetable
      });
    });
  }

    return (
      <div className={style.container}>
        <h1 className={style.title}>Catalog</h1>
        <div className={style.containerCard}>
          {vegetables.map((vegetable: Vegetables) => (
            <div key={vegetable.id}>
              <CardProduct increase={increase} quantity={vegetable.quantity} decrease={decrease} id={vegetable.id} saveDataCard={saveDataCard} loading={loading} name={vegetable.name} price={vegetable.price} image={vegetable.image} wieght={vegetable.wieght} />
            </div>
          ))}
        </div>
      </div>
    )

}

export default Catalog;