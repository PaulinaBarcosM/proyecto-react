import React from "react";
import { ItemDetailContainer, Loader } from "../components";
import { useProductsById } from "../hooks";
import { useParams } from "react-router";

export const ItemDetail = () => {
  const { id } = useParams();
  const { product, loading } = useProductsById(id);

  return loading ? <Loader /> : <ItemDetailContainer item={product} />;
};
