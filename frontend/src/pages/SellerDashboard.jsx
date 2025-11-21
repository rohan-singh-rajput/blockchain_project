// SellerDashboard.jsx
import React, { useState } from "react";
import { getProcurement } from "../contracts";

export default function SellerDashboard() {
    const [itemId, setItemId] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");

    const submitItem = async () => {
        try {
            const procurement = await getProcurement();

            const itemIdNum = Number(itemId);
            const priceStr = price.trim();
            const quantityNum = Number(quantity);

            if (
                isNaN(itemIdNum) ||
                itemIdNum < 0 ||
                !priceStr ||
                isNaN(quantityNum) ||
                quantityNum <= 0
            ) {
                alert("Please enter valid item ID, price and quantity.");
                return;
            }

            const sellingPrice = BigInt(priceStr);

            const tx = await procurement.submitItem(
                itemIdNum,
                sellingPrice,
                quantityNum
            );
            await tx.wait();

            alert("Item listed for sale!");
        } catch (err) {
            console.error(err);
            alert(err.reason || err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-200 px-6 py-10 font-sans text-gray-900">
            <h1 className="text-4xl font-semibold mb-10 text-gray-900 text-center">
                Seller Dashboard
            </h1>

            <div className="max-w-lg mx-auto backdrop-blur-xl bg-white/30 border border-white/30 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
                <h3 className="text-2xl font-medium mb-6 text-gray-900 text-center">
                    List Verified Product for Sale
                </h3>

                <input
                    className="border border-white/30 bg-white/20 backdrop-blur-xl p-3 w-full rounded-xl mb-4 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                    placeholder="Catalog Item ID (approved by Admin)"
                    type="number"
                    value={itemId}
                    onChange={(e) => setItemId(e.target.value)}
                />

                <input
                    className="border border-white/30 bg-white/20 backdrop-blur-xl p-3 w-full rounded-xl mb-4 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                    placeholder="Price per unit (in Wei)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <input
                    className="border border-white/30 bg-white/20 backdrop-blur-xl p-3 w-full rounded-xl mb-4 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                    placeholder="Quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />

                <button
                    onClick={submitItem}
                    className="w-full py-3 rounded-2xl bg-gray-800 text-white font-medium hover:bg-gray-900 transition"
                >
                    List Item
                </button>
            </div>
        </div>
    );
}
