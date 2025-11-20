import React, { useState } from "react";
import { getProcurement } from "../contracts";

export default function SellerDashboard() {
    const [brand, setBrand] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const submitItem = async () => {
        try {
            const procurement = await getProcurement();
            await procurement.submitItem(brand, name, Number(price));
            alert("Item submitted!");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Seller Dashboard</h2>

            <h3>Submit Item</h3>

            <input
                placeholder="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
            />
            <input
                placeholder="Item name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                placeholder="Price (wei)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <button onClick={submitItem}>Submit Item</button>
        </div>
    );
}
