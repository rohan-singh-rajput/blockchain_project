// BuyerDashboard.jsx
import React, { useState, useEffect } from "react";
import { getEscrow, getApprovedItems } from "../contracts";

export default function BuyerDashboard() {
    const [itemId, setItemId] = useState("");
    const [seller, setSeller] = useState("");
    const [unitPrice, setUnitPrice] = useState("");
    const [quantityToBuy, setQuantityToBuy] = useState("1");
    const [orderId, setOrderId] = useState("");

    const [approvedItems, setApprovedItems] = useState([]);

    const loadItems = async () => {
        try {
            const items = await getApprovedItems();
            setApprovedItems(items);
        } catch (err) {
            console.error(err);
            alert("Error loading items: " + (err.reason || err.message));
        }
    };

    useEffect(() => {
        loadItems();
    }, []);

    const createOrder = async () => {
        try {
            const escrow = await getEscrow();

            const itemIdNum = Number(itemId);
            const qtyNum = Number(quantityToBuy);

            if (!seller || isNaN(itemIdNum) || isNaN(qtyNum) || qtyNum <= 0) {
                alert("Please select item, seller and a valid quantity.");
                return;
            }

            // unitPrice is a string of wei; ethers v6 likes bigint
            const pricePerUnit = BigInt(unitPrice);
            const totalValue = pricePerUnit * BigInt(qtyNum);

            const tx = await escrow.createOrder(
                itemIdNum,
                seller,
                qtyNum,
                { value: totalValue }
            );
            await tx.wait();

            alert("Order created. Funds locked in escrow.");
        } catch (err) {
            console.error(err);
            alert(err.reason || err.message);
        }
    };

    const confirmDelivery = async () => {
        try {
            const escrow = await getEscrow();
            const orderIdNum = Number(orderId);
            const tx = await escrow.confirmDelivery(orderIdNum);
            await tx.wait();
            alert("Delivery confirmed. Payment released!");
        } catch (err) {
            console.error(err);
            alert(err.reason || err.message);
        }
    };

    return (
        <div className="px-10 py-10 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-yellow-600 mb-10">
                Buyer Dashboard
            </h1>

            {/* ---------- LISTED ITEMS ---------- */}
            <div className="bg-white p-8 rounded-xl shadow mb-10">
                <h3 className="text-3xl font-bold mb-6">Products Listed by Sellers</h3>

                {approvedItems.length === 0 ? (
                    <p>No products listed yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {approvedItems.map((item) => (
                            <div
                                key={item.id}
                                className="border p-5 rounded-xl shadow hover:shadow-lg transition bg-gray-50"
                            >
                                <h4 className="text-xl font-semibold">
                                    {item.name}
                                </h4>
                                <p className="text-gray-600">
                                    Brand: {item.brand}
                                </p>
                                <p className="text-gray-600">
                                    Catalog Item ID: {item.itemId}
                                </p>
                                <p className="text-gray-600">
                                    Seller: {item.seller}
                                </p>
                                <p className="text-gray-600">
                                    Price per unit: {item.price} Wei
                                </p>
                                <p className="text-gray-600">
                                    Seller quantity: {item.sellerQuantity}
                                </p>

                                <button
                                    className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
                                    onClick={() => {
                                        setItemId(item.itemId);
                                        setSeller(item.seller);
                                        setUnitPrice(item.price);
                                        setQuantityToBuy("1");
                                    }}
                                >
                                    Buy from this seller
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
                    placeholder="Catalog Item ID"
                    value={itemId}
                    onChange={(e) => setItemId(e.target.value)}
                />

                <input
                    className="border p-3 w-full rounded mb-4"
                    placeholder="Seller Address"
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                />

                <input
                    className="border p-3 w-full rounded mb-4"
                    placeholder="Quantity"
                    type="number"
                    value={quantityToBuy}
                    onChange={(e) => setQuantityToBuy(e.target.value)}
                />

                <input
                    className="border p-3 w-full rounded mb-4"
                    placeholder="Unit Price (Wei)"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(e.target.value)}
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
