import { ItemListContainer } from "../components";

export const Home = () => {
  const productsData = [
    {
      id: 1,
      name: "Cartera fulana",
      description: "color marron",
      price: 200,
      stock: 3,
    },
    {
      id: 2,
      name: "Cartera fulana",
      description: "color marron",
      price: 200,
      stock: 3,
    },
    {
      id: 3,
      name: "Cartera fulana",
      description: "color marron",
      price: 200,
      stock: 3,
    },
    {
      id: 4,
      name: "Cartera fulana",
      description: "color marron",
      price: 200,
      stock: 3,
    },
  ];

  return <ItemListContainer products={productsData} />;
};
