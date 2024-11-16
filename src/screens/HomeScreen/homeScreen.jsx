import { useEffect, useState } from "react";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const resp = await fetch("https://fakestoreapi.com/products", {
      headers: {
        Authorazation: `Bearer ${localStorage.getItem("fake_token")}`,
      },
    });
    const jsonResp = await resp.json();
    setProducts(jsonResp);
  };

  return (
    <div>
      <h1>Home Screen</h1>
      <ul>
        {products?.map((el) => (
          <li key={el?.id} style={{ padding: 16 }}>
            {el?.id} - {el?.title} - <b>{el?.price}</b>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeScreen;
