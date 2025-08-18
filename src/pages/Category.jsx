import React from "react";
import { useParams } from "react-router-dom";
import { useProductsByCategory } from "../hooks";
import { ItemListContainer, Loader } from "../components";

export const Category = () => {
  const { id } = useParams();
  const { productsData, loading } = useProductsByCategory(id);

  return loading ? <Loader /> : <ItemListContainer products={productsData} />;
};
