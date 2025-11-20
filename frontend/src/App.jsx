import React, { useState } from "react";
import AdminDashboard from "./components/AdminDashboard";
import SellerDashboard from "./components/SellerDashboard";
import BuyerDashboard from "./components/BuyerDashboard";

export default function App() {
  const [page, setPage] = useState("admin");

  return (
    <div>
      <h1>Government Procurement Portal</h1>

      <button onClick={() => setPage("admin")}>Admin</button>
      <button onClick={() => setPage("seller")}>Seller</button>
      <button onClick={() => setPage("buyer")}>Buyer</button>

      <hr />

      {page === "admin" && <AdminDashboard />}
      {page === "seller" && <SellerDashboard />}
      {page === "buyer" && <BuyerDashboard />}
    </div>
  );
}
