import { useEffect, useState } from "react";

export const useProducts = (endpoint = "products") => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/${endpoint}`)
      .then((res) => res.json())
      .then((data) => {
        setProductsData(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [endpoint]);

  return { productsData, loading };
};
