import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            {/* NAVBAR */}
            <nav className="flex justify-between items-center px-10 py-6 bg-white shadow">
                <h1 className="text-3xl font-bold text-blue-700">GovProcure</h1>
                <div className="flex gap-6 text-lg">
                    <Link to="/admin" className="hover:text-blue-600">Admin</Link>
                    <Link to="/seller" className="hover:text-blue-600">Seller</Link>
                    <Link to="/buyer" className="hover:text-blue-600">Buyer</Link>
                </div>
            </nav>

            {/* HERO SECTION */}
            <div className="flex flex-col items-center justify-center mt-20 px-6">
                <h2 className="text-5xl font-extrabold text-gray-900 text-center leading-tight">
                    Transparent Government Procurement
                    <br />
                    <span className="text-blue-600">Powered by Ethereum Blockchain</span>
                </h2>

                <p className="mt-6 text-gray-600 text-lg max-w-2xl text-center">
                    A secure procurement system enabling verified sellers, verified brands,
                    and transparent material purchases for government projects using smart contracts.
                </p>

                {/* ACTION BUTTONS */}
                <div className="mt-10 flex flex-wrap gap-6 justify-center">
                    <Link
                        to="/admin"
                        className="px-8 py-4 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition text-lg"
                    >
                        Admin Dashboard
                    </Link>

                    <Link
                        to="/seller"
                        className="px-8 py-4 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition text-lg"
                    >
                        Seller Portal
                    </Link>

                    <Link
                        to="/buyer"
                        className="px-8 py-4 bg-yellow-500 text-white rounded-xl shadow hover:bg-yellow-600 transition text-lg"
                    >
                        Buyer Portal
                    </Link>
                </div>
            </div>

            {/* FEATURES SECTION */}
            <div className="mt-24 px-10 pb-20">
                <h3 className="text-3xl font-bold text-center text-gray-800 mb-10">
                    Key Features
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
                        <h4 className="text-xl font-semibold mb-3">Verified Sellers</h4>
                        <p className="text-gray-600">
                            Only trusted and government-authorized sellers can upload items.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
                        <h4 className="text-xl font-semibold mb-3">Blockchain Transparency</h4>
                        <p className="text-gray-600">
                            All transactions are recorded on the Ethereum blockchain.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
                        <h4 className="text-xl font-semibold mb-3">Secure Escrow Payments</h4>
                        <p className="text-gray-600">
                            Funds are securely held in escrow until delivery is confirmed.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
