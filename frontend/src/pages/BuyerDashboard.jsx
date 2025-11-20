import React, { useState, useEffect } from "react";
import { getEscrow, getApprovedItems } from "../contracts";

export default function BuyerDashboard() {
    const [itemId, setItemId] = useState("");
    const [price, setPrice] = useState("");
    const [orderId, setOrderId] = useState("");

    const [approvedItems, setApprovedItems] = useState([]);

    // Load approved blockchain items on page open
    const loadItems = async () => {
        try {
            const items = await getApprovedItems();
            setApprovedItems(items);
        } catch (err) {
            console.error(err);
            alert("Error loading items: " + err.message);
        }
    };

    useEffect(() => {
        loadItems();
    }, []);

    const createOrder = async () => {
        try {
            const escrow = await getEscrow();
            await escrow.createOrder(itemId, { value: Number(price) });
            alert("Order created. Funds locked in escrow.");
        } catch (err) {
            alert(err.message);
        }
    };

    const confirmDelivery = async () => {
        try {
            const escrow = await getEscrow();
            await escrow.confirmDelivery(orderId);
            alert("Delivery confirmed. Payment released!");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="px-10 py-10 bg-gray-100 min-h-screen">

            <h1 className="text-4xl font-bold text-yellow-600 mb-10">
                Buyer Dashboard
            </h1>

            {/* ---------- APPROVED ITEMS LIST ---------- */}
            <div className="bg-white p-8 rounded-xl shadow mb-10">
                <h3 className="text-3xl font-bold mb-6">Approved Items</h3>

                {approvedItems.length === 0 ? (
                    <p>No approved items available.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {approvedItems.map((item) => (
                            <div
                                key={item.id}
                                className="border p-5 rounded-xl shadow hover:shadow-lg transition bg-gray-50"
                            >
                                <h4 className="text-xl font-semibold">{item.name}</h4>
                                <p className="text-gray-600">Brand: {item.brand}</p>
                                <p className="text-gray-600">Price: {item.price} Wei</p>
                                <p className="text-gray-600 break-all">Seller: {item.seller}</p>

                                <button
                                    className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
                                    onClick={() => {
                                        setItemId(item.id);
                                        setPrice(item.price);
                                    }}
                                >
                                    Buy This Item
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ---------- CREATE ORDER ---------- */}
            <div className="bg-white p-8 rounded-xl shadow mb-10 w-full max-w-xl mx-auto">
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

            {/* ---------- CONFIRM DELIVERY ---------- */}
            <div className="bg-white p-8 rounded-xl shadow w-full max-w-xl mx-auto">
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
