import React, { useState } from "react";
import { getEscrow } from "../contracts";

export default function BuyerDashboard() {
    const [itemId, setItemId] = useState("");
    const [orderId, setOrderId] = useState("");
    const [price, setPrice] = useState("");

    const createOrder = async () => {
        try {
            const escrow = await getEscrow();
            await escrow.createOrder(itemId, { value: Number(price) });
            alert("Order created & paid into escrow!");
        } catch (err) {
            alert(err.message);
        }
    };

    const confirmDelivery = async () => {
        try {
            const escrow = await getEscrow();
            await escrow.confirmDelivery(orderId);
            alert("Delivery confirmed — payment released!");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Buyer Dashboard</h2>

            <h3>Create Order</h3>

            <input
                placeholder="Item ID"
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
            />

            <input
                placeholder="Item Price in Wei"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <button onClick={createOrder}>Create Order</button>

            <h3>Confirm Delivery</h3>

            <input
                placeholder="Order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
            />

            <button onClick={confirmDelivery}>Confirm Delivery</button>
        </div>
    );
}
