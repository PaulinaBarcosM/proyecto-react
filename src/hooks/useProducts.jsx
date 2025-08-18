import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const useProducts = (collectionName) => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const itemCollection = collection(db, collectionName);
    getDocs(itemCollection)
      .then((snapshot) => {
        setProductsData(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [collectionName]);

  return { productsData, loading };
};
