import { useEffect, useState } from "react";
import axios from "axios";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err))
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading };
};
