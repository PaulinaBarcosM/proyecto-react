import { IoCartOutline } from "react-icons/io5";

export const CartWidget = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "10px",
        marginLeft: "40vh",
        alignItems: "center",
        width: "40px",
        justifyContent: "space-between",
      }}
    >
      <IoCartOutline size={30} />
      10
    </div>
  );
};
