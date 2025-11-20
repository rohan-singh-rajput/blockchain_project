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
            alert("Seller verified successfully!");
        } catch (err) {
            alert(err.message);
        }
    };

    const verifyBrand = async () => {
        try {
            const registry = await getRegistry();
            await registry.verifyBrand(brand);
            alert("Brand verified successfully!");
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
        <div className="px-10 py-10 bg-gray-100 min-h-screen">

            <h1 className="text-4xl font-bold text-blue-700 mb-10">
                Admin Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                {/* Verify Seller */}
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-bold mb-3">Verify Seller</h3>

                    <input
                        className="border p-3 w-full rounded mb-4"
                        placeholder="Seller Wallet Address"
                        value={sellerAddress}
                        onChange={(e) => setSellerAddress(e.target.value)}
                    />

                    <button
                        onClick={verifySeller}
                        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
                    >
                        Verify Seller
                    </button>
                </div>

                {/* Verify Brand */}
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-bold mb-3">Verify Brand</h3>

                    <input
                        className="border p-3 w-full rounded mb-4"
                        placeholder="Brand Name"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />

                    <button
                        onClick={verifyBrand}
                        className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
                    >
                        Verify Brand
                    </button>
                </div>

                {/* Approve Item */}
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-bold mb-3">Approve Item</h3>

                    <input
                        className="border p-3 w-full rounded mb-4"
                        placeholder="Item ID"
                        value={itemId}
                        onChange={(e) => setItemId(e.target.value)}
                    />

                    <button
                        onClick={approveItem}
                        className="w-full bg-yellow-500 text-white py-3 rounded-xl hover:bg-yellow-600 transition"
                    >
                        Approve Item
                    </button>
                </div>

            </div>
        </div>
    );
}
