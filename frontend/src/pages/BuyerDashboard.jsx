import React, { useState } from "react";
import { getEscrow } from "../contracts";

export default function BuyerDashboard() {
    const [itemId, setItemId] = useState("");
    const [price, setPrice] = useState("");
    const [orderId, setOrderId] = useState("");

    const createOrder = async () => {
        try {
            const escrow = await getEscrow();
            await escrow.createOrder(itemId, { value: Number(price) });
            alert("Order created and payment locked in escrow!");
        } catch (err) {
            alert(err.message);
        }
    };

    const confirmDelivery = async () => {
        try {
            const escrow = await getEscrow();
            await escrow.confirmDelivery(orderId);
            alert("Delivery confirmed. Payment released to seller!");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="px-10 py-10 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-yellow-600 mb-10">
                Buyer Dashboard
            </h1>

            {/* CREATE ORDER */}
            <div className="bg-white p-8 rounded-xl shadow w-full max-w-lg mx-auto hover:shadow-lg transition mb-10">

                <h3 className="text-2xl font-bold mb-6">Create Order</h3>

                <input
                    className="border p-3 w-full rounded mb-4"
                    placeholder="Item ID"
                    value={itemId}
                    onChange={(e) => setItemId(e.target.value)}
                />

                <input
                    className="border p-3 w-full rounded mb-4"
                    placeholder="Price (Wei)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <button
                    onClick={createOrder}
                    className="w-full bg-yellow-500 text-white py-3 rounded-xl hover:bg-yellow-600 transition"
                >
                    Create Order & Pay
                </button>
            </div>

            {/* CONFIRM DELIVERY */}
            <div className="bg-white p-8 rounded-xl shadow w-full max-w-lg mx-auto hover:shadow-lg transition">

                <h3 className="text-2xl font-bold mb-6">Confirm Delivery</h3>

                <input
                    className="border p-3 w-full rounded mb-4"
                    placeholder="Order ID"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                />

                <button
                    onClick={confirmDelivery}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
                >
                    Confirm Delivery
                </button>
            </div>
        </div>
    );
}
