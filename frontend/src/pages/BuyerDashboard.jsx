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

            if (!seller || isNaN(itemIdNum) || isNaN(qtyNum) || qtyNum <= 0) return;

            const pricePerUnit = BigInt(unitPrice);
            const totalValue = pricePerUnit * BigInt(qtyNum);

            const tx = await escrow.createOrder(itemIdNum, seller, qtyNum, { value: totalValue });
            await tx.wait();

            alert("Order created. Funds locked in escrow.");
        } catch (err) {
            console.error(err);
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
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-200 px-6 py-10 font-sans text-gray-900">
            <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
                Buyer Dashboard
            </h1>


            <div className="mb-12">
                <h3 className="text-3xl font-medium mb-6 text-center">Products Listed by Sellers</h3>
                {approvedItems.length === 0 ? (
                    <p className="text-center text-gray-500">No products listed yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {approvedItems.map((item) => (
                            <div
                                key={item.id}
                                className="backdrop-blur-xl bg-white/40 border border-white/30 p-6 rounded-2xl shadow-sm hover:bg-white/50 transition"
                            >
                                <h4 className="text-xl font-semibold mb-2">{item.name}</h4>
                                <p className="text-gray-700 text-sm">Brand: {item.brand}</p>
                                <p className="text-gray-700 text-sm">Catalog Item ID: {item.itemId}</p>
                                <p className="text-gray-700 text-sm">Seller: {item.seller}</p>
                                <p className="text-gray-700 text-sm">Price per unit: {item.price} Wei</p>
                                <p className="text-gray-700 text-sm">Seller quantity: {item.sellerQuantity}</p>

                                <button
                                    className="mt-4 w-full px-4 py-2 rounded-2xl bg-gray-800 text-white hover:bg-gray-900 transition"
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


            <div className="backdrop-blur-xl bg-white/40 border border-white/30 p-8 rounded-2xl shadow-sm max-w-xl mx-auto mb-12">
                <h3 className="text-2xl font-medium mb-6 text-center">Create Order</h3>

                <input
                    className="border border-gray-300 p-3 w-full rounded-xl mb-4"
                    placeholder="Catalog Item ID"
                    value={itemId}
                    onChange={(e) => setItemId(e.target.value)}
                />

                <input
                    className="border border-gray-300 p-3 w-full rounded-xl mb-4"
                    placeholder="Seller Address"
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                />

                <input
                    className="border border-gray-300 p-3 w-full rounded-xl mb-4"
                    placeholder="Quantity"
                    type="number"
                    value={quantityToBuy}
                    onChange={(e) => setQuantityToBuy(e.target.value)}
                />

                <input
                    className="border border-gray-300 p-3 w-full rounded-xl mb-4"
                    placeholder="Unit Price (Wei)"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(e.target.value)}
                />

                <button
                    onClick={createOrder}
                    className="w-full px-4 py-3 rounded-2xl bg-gray-800 text-white hover:bg-gray-900 transition"
                >
                    Create Order & Pay
                </button>
            </div>


            <div className="backdrop-blur-xl bg-white/40 border border-white/30 p-8 rounded-2xl shadow-sm max-w-xl mx-auto">
                <h3 className="text-2xl font-medium mb-6 text-center">Confirm Delivery</h3>

                <input
                    className="border border-gray-300 p-3 w-full rounded-xl mb-4"
                    placeholder="Order ID"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                />

                <button
                    onClick={confirmDelivery}
                    className="w-full px-4 py-3 rounded-2xl bg-gray-800 text-white hover:bg-gray-900 transition"
                >
                    Confirm Delivery
                </button>
            </div>
        </div>
    );
}
