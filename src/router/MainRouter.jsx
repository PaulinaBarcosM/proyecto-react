import { HashRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  NotFound,
  /*Products,*/
  Category,
  Checkout,
  Payment,
  ItemDetail,
  ThankYou,
} from "../pages";
import { NavBar } from "../components";

export const MainRouter = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/*<Route path="/productos" element={<Products />} /> */}
        <Route path="/item/:id" element={<ItemDetail />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
