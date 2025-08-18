import { useEffect, useState } from "react";

export const useProductsById = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  return { product, loading };
};
