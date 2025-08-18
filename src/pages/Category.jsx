import React from "react";
import { useParams } from "react-router";
import { useProductsByCategory } from "../hooks";
import { ItemListContainer, Loader } from "../components";

export const Category = () => {
  const { id } = useParams();
  const { productsData, loading } = useItemsByCategory(id);

  return loading ? <Loader /> : <ItemListContainer products={productsData} />;
};
