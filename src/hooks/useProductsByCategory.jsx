import { useEffect, useState } from "react";

export const useProductsByCategory = (categoryId) => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;

    setLoading(true);
    fetch(`https://dummyjson.com/products/category/${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        setProductsData(data.products);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [categoryId]);

  return { productsData, loading };
};
