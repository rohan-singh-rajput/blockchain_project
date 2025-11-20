import React, { useState } from "react";
import { getRegistry, getProcurement } from "../contracts";

export default function AdminDashboard() {
    const [sellerAddress, setSellerAddress] = useState("");
    const [brand, setBrand] = useState("");
    const [itemId, setItemId] = useState("");

    const verifySeller = async () => {
        try {
            const registry = await getRegistry();
            await registry.verifySeller(sellerAddress);
            alert("Seller verified!");
        } catch (err) {
            alert(err.message);
        }
    };

    const verifyBrand = async () => {
        try {
            const registry = await getRegistry();
            await registry.verifyBrand(brand);
            alert("Brand verified!");
        } catch (err) {
            alert(err.message);
        }
    };

    const approveItem = async () => {
        try {
            const procurement = await getProcurement();
            await procurement.approveItem(itemId);
            alert("Item approved!");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Admin Dashboard</h2>

            <h3>Verify Seller</h3>
            <input
                placeholder="Seller address"
                value={sellerAddress}
                onChange={(e) => setSellerAddress(e.target.value)}
            />
            <button onClick={verifySeller}>Verify Seller</button>

            <h3>Verify Brand</h3>
            <input
                placeholder="Brand name"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
            />
            <button onClick={verifyBrand}>Verify Brand</button>

            <h3>Approve Item</h3>
            <input
                placeholder="Item ID"
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
            />
            <button onClick={approveItem}>Approve Item</button>
        </div>
    );
}
