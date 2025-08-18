import { useEffect, useState } from "react";

export const useProductsByCategory = (categoryId) => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;

    setLoading(true);
    fetch(`https://fakestoreapi.com/products/category/${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProductsData(data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [categoryId]);

  return { productsData, loading };
};
