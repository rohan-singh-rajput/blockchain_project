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

            // ethers v6 likes bigint for uint256
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
        <div className="px-10 py-10 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-green-700 mb-10">
                Seller Dashboard
            </h1>

            <div className="bg-white p-8 rounded-xl shadow w-full max-w-lg mx-auto hover:shadow-lg transition">
                <h3 className="text-2xl font-bold mb-6">
                    List Verified Product for Sale
                </h3>

                <input
                    className="border p-3 w-full rounded mb-4"
                    placeholder="Catalog Item ID (approved by Admin)"
                    type="number"
                    value={itemId}
                    onChange={(e) => setItemId(e.target.value)}
                />

                <input
                    className="border p-3 w-full rounded mb-4"
                    placeholder="Price per unit (in Wei)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <input
                    className="border p-3 w-full rounded mb-4"
                    placeholder="Quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />

                <button
                    onClick={submitItem}
                    className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
                >
                    List Item
                </button>
            </div>
        </div>
    );
}
