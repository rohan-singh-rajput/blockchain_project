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
            alert("Item submitted for approval!");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="px-10 py-10 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-green-700 mb-10">Seller Dashboard</h1>

            <div className="bg-white p-8 rounded-xl shadow w-full max-w-lg mx-auto hover:shadow-lg transition">

                <h3 className="text-2xl font-bold mb-6">Submit Item for Approval</h3>

                <input
                    className="border p-3 w-full rounded mb-4"
                    placeholder="Brand Name"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                />

                <input
                    className="border p-3 w-full rounded mb-4"
                    placeholder="Item Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className="border p-3 w-full rounded mb-4"
                    placeholder="Price (in Wei)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <button
                    onClick={submitItem}
                    className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
                >
                    Submit Item
                </button>

            </div>
        </div>
    );
}
