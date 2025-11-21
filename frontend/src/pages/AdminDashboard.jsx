import React, { useState } from "react";
import { getRegistry, getProcurement } from "../contracts";

export default function AdminDashboard() {
    const [sellerAddress, setSellerAddress] = useState("");
    const [brand, setBrand] = useState("");

    const [itemBrand, setItemBrand] = useState("");
    const [itemName, setItemName] = useState("");

    const verifySeller = async () => {
        try {
            const registry = await getRegistry();
            const tx = await registry.verifySeller(sellerAddress);
            await tx.wait();
            alert("Seller verified successfully!");
        } catch (err) {
            console.error(err);
            alert(err.reason || err.message);
        }
    };

    const verifyBrand = async () => {
        try {
            const registry = await getRegistry();
            const tx = await registry.verifyBrand(brand);
            await tx.wait();
            alert("Brand verified successfully!");
        } catch (err) {
            console.error(err);
            alert(err.reason || err.message);
        }
    };

    const approveItem = async () => {
        try {
            const procurement = await getProcurement();
            if (!itemBrand || !itemName) {
                alert("Please fill brand and name");
                return;
            }
            const tx = await procurement.approveItem(itemBrand, itemName);
            await tx.wait();
            alert("Item added to catalog!");
        } catch (err) {
            console.error(err);
            alert(err.reason || err.message);
        }
    };

    const [escrowAddr, setEscrowAddr] = useState("");

    const setEscrowInProcurement = async () => {
        try {
            const procurement = await getProcurement();
            const tx = await procurement.setEscrow(escrowAddr);
            await tx.wait();
            alert("Escrow address set successfully!");
        } catch (err) {
            console.error(err);
            alert(err.reason || err.message);
        }
    };

    return (
        <div className="px-10 py-10 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-gray-800 mb-10">
                Admin Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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
                        className="w-full 
                        bg-white/60 backdrop-blur-xl border border-gray-300 
                        text-gray-800 py-3 rounded-xl 
                        hover:bg-white transition"
                    >
                        Verify Seller
                    </button>
                </div>


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
                        className="w-full 
                        bg-white/60 backdrop-blur-xl border border-gray-300 
                        text-gray-800 py-3 rounded-xl 
                        hover:bg-white transition"
                    >
                        Verify Brand
                    </button>
                </div>


                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h3 className="text-xl font-bold mb-3">Add Catalog Item</h3>

                    <input
                        className="border p-3 w-full rounded mb-4"
                        placeholder="Item Brand (must be verified)"
                        value={itemBrand}
                        onChange={(e) => setItemBrand(e.target.value)}
                    />

                    <input
                        className="border p-3 w-full rounded mb-4"
                        placeholder="Item Name"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />

                    <button
                        onClick={approveItem}
                        className="w-full 
                        bg-white/60 backdrop-blur-xl border border-gray-300 
                        text-gray-800 py-3 rounded-xl 
                        hover:bg-white transition"
                    >
                        Add Item
                    </button>
                </div>
            </div>


            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition mt-10">
                <h3 className="text-xl font-bold mb-3">Set Escrow Contract</h3>

                <input
                    className="border p-3 w-full rounded mb-4"
                    placeholder="Escrow Contract Address"
                    value={escrowAddr}
                    onChange={(e) => setEscrowAddr(e.target.value)}
                />

                <button
                    onClick={setEscrowInProcurement}
                    className="w-full 
                    bg-white/60 backdrop-blur-xl border border-gray-300 
                    text-gray-800 py-3 rounded-xl 
                    hover:bg-white transition"
                >
                    Set Escrow
                </button>
            </div>
        </div>
    );
}
