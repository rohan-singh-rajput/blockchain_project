import React, { useState, useEffect } from "react";
import { getProcurement, getCatalogItems } from "../contracts";

export default function SellerDashboard() {
    const [itemId, setItemId] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");

    const [catalogItems, setCatalogItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const loadCatalog = async () => {
        try {
            const items = await getCatalogItems();
            setCatalogItems(items);
        } catch (err) {
            console.error(err);
            alert("Error loading catalog: " + (err.reason || err.message));
        }
    };

    useEffect(() => {
        loadCatalog();
    }, []);

    const submitItem = async () => {
        try {
            const procurement = await getProcurement();

            const itemIdNum = Number(itemId);
            const priceStr = price.trim();
            const quantityNum = Number(quantity);

            if (!selectedItem) {
                alert("Please select a catalog item first.");
                return;
            }

            if (
                isNaN(itemIdNum) ||
                itemIdNum < 0 ||
                !priceStr ||
                isNaN(quantityNum) ||
                quantityNum <= 0
            ) {
                alert("Please enter valid price and quantity.");
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
            setPrice("");
            setQuantity("");
            loadCatalog();
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

            <div className="max-w-5xl mx-auto mb-10">
                <h2 className="text-2xl font-medium mb-4 text-gray-900">
                    Approved Catalog Items
                </h2>

                {catalogItems.length === 0 ? (
                    <p className="text-gray-600">No catalog items available yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {catalogItems.map((item) => (
                            <div
                                key={item.itemId}
                                className={`border border-white/40 bg-white/40 backdrop-blur-xl rounded-2xl p-4 shadow-sm hover:shadow-md transition cursor-pointer ${
                                    selectedItem &&
                                    selectedItem.itemId === item.itemId
                                        ? "ring-2 ring-gray-800"
                                        : ""
                                }`}
                            >
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {item.name}
                                </h3>
                                <p className="text-gray-700">
                                    Brand: {item.brand}
                                </p>
                                <p className="text-gray-700">
                                    Catalog Item ID: {item.itemId}
                                </p>
                                <p className="text-gray-700">
                                    Total Quantity (all sellers):{" "}
                                    {item.totalQuantity}
                                </p>

                                <button
                                    className="mt-3 w-full py-2 rounded-xl bg-gray-800 text-white text-sm font-medium hover:bg-gray-900 transition"
                                    onClick={() => {
                                        setSelectedItem(item);
                                        setItemId(item.itemId.toString());
                                    }}
                                >
                                    Select for Listing
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="max-w-lg mx-auto backdrop-blur-xl bg-white/30 border border-white/30 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
                <h3 className="text-2xl font-medium mb-4 text-gray-900 text-center">
                    List Selected Product for Sale
                </h3>

                {selectedItem ? (
                    <div className="mb-4 text-sm text-gray-800 bg-white/40 rounded-xl p-3">
                        <p>
                            <span className="font-semibold">Item:</span>{" "}
                            {selectedItem.name} ({selectedItem.brand})
                        </p>
                        <p>
                            <span className="font-semibold">Catalog ID:</span>{" "}
                            {selectedItem.itemId}
                        </p>
                    </div>
                ) : (
                    <p className="mb-4 text-sm text-gray-600">
                        Select a catalog item above to list it for sale.
                    </p>
                )}

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
                    disabled={!selectedItem}
                >
                    List Item
                </button>
            </div>
        </div>
    );
}
