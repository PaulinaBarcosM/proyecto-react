import { useEffect, useState } from "react";

export const useProducts = (endpoint = "products") => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProductsData(data.products))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return { productsData, loading };
};
