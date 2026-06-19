import style from "./catalog.module.scss";
import CardProduct from "./components/CardProduct/CardProduct.tsx";
import {useEffect, useState} from "react";
import ky from "ky";

type Vegetables = {
  id: number;
  name: string;
  wieght: string;
  price: number;
  image: string;
};

function Catalog() {

  const skeleton = [];  // заглушка
  for (let i = 0; i < 8; i++) {
    skeleton.push(
      {
        id: i,
        name: '',
        wieght: '',
        price: 0,
        image: '',
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
          return(
            {...product, name, wieght}
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

    return (
      <div className={style.container}>
        <h1 className={style.title}>Catalog</h1>
        <div className={style.containerCard}>
          {vegetables.map((vegetable: Vegetables) => (
            <div key={vegetable.id}>
              <CardProduct loading={loading} name={vegetable.name} price={vegetable.price} image={vegetable.image} wieght={vegetable.wieght} count={1} />
            </div>
          ))}
        </div>
      </div>
    )

}

export default Catalog;