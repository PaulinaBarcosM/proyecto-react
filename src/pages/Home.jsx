/*{
 
import { ItemListContainer, Loader } from "../components";
import { useProducts } from "../hooks/useProducts";

export const Home = () => {
  const { productsData, loading } = useProducts();

  return loading ? <Loader /> : <ItemListContainer products={productsData} />;
};

}
import React from "react";

export const Home = () => {
  return <div>Pagina principal</div>;
};*/

import { ItemListContainer, Loader } from "../components";
import { useProducts } from "../hooks";

export const Home = () => {
  const { productsData, loading } = useProducts("products");
  return loading ? <Loader /> : <ItemListContainer products={productsData} />;
};
