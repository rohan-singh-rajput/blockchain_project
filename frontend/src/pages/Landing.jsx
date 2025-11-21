import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Landing() {

    const [verifiedSellers] = useState([
        { name: "Alice Supplies", brand: "Alpha Corp", address: "0xA1B2...C3D4" },
        { name: "Bob Materials", brand: "Beta Inc", address: "0xB1C2...D3E4" },
        { name: "Charlie Traders", brand: "Gamma Ltd", address: "0xC1D2...E3F4" },
    ]);


    const [walletAddress, setWalletAddress] = useState(null);


    const checkWallet = async () => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            if (accounts.length > 0) {
                setWalletAddress(accounts[0]);
            }
        }
    };

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                setWalletAddress(accounts[0]);
            } catch (err) {
                console.error("User rejected connection");
            }
        } else {
            alert("Please install MetaMask!");
        }
    };

    useEffect(() => {
        checkWallet();

        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                setWalletAddress(accounts[0] || null);
            });
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-200 flex flex-col font-sans text-gray-900">
            <nav className="backdrop-blur-xl bg-white/40 border-b border-white/30 flex justify-between items-center px-10 py-6 shadow-sm">
                <h1 className="text-3xl font-semibold tracking-tight">GovProcure</h1>
                <div className="flex items-center gap-6 text-lg">
                    <Link
                        to="/admin"
                        className="px-6 py-2 bg-white/20 backdrop-blur-xl text-gray-900 rounded-2xl hover:bg-white/40 hover:text-gray-800 transition font-medium"
                    >
                        Admin
                    </Link>
                    <Link
                        to="/seller"
                        className="px-6 py-2 bg-white/20 backdrop-blur-xl text-gray-900 rounded-2xl hover:bg-white/40 hover:text-gray-800 transition font-medium"
                    >
                        Seller
                    </Link>
                    <Link
                        to="/buyer"
                        className="px-6 py-2 bg-white/20 backdrop-blur-xl text-gray-900 rounded-2xl hover:bg-white/40 hover:text-gray-800 transition font-medium"
                    >
                        Buyer
                    </Link>


                    {walletAddress ? (
                        <div className="ml-4 flex items-center gap-2">
                            <span className="text-gray-800 text-sm font-medium truncate max-w-xs">
                                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                            </span>
                            <button
                                onClick={() => setWalletAddress(null)}
                                className="px-3 py-1 bg-gray-200/50 text-gray-800 rounded-lg hover:bg-gray-300 transition text-sm"
                            >
                                Disconnect
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={connectWallet}
                            className="px-4 py-2 bg-teal-500/70 text-white rounded-2xl hover:bg-teal-600 transition text-sm"
                        >
                            Connect Wallet
                        </button>
                    )}
                </div>
            </nav>

            <div className="flex flex-col items-center justify-center mt-28 px-6 text-center">
                <h2 className="text-5xl font-light leading-tight tracking-tight">
                    Transparent Procurement
                    <br />
                    <span className="text-gray-700">Powered by Ethereum Blockchain</span>
                </h2>

                <p className="mt-6 text-gray-700 text-lg max-w-xl">
                    A minimal, secure and transparent procurement experience with verified sellers & immutable blockchain logs.
                </p>
            </div>

            <div className="mt-28 px-10 pb-20">
                <h3 className="text-3xl font-light text-center mb-12 tracking-tight">
                    Verified Sellers
                </h3>

                {verifiedSellers.length === 0 ? (
                    <p className="text-center text-gray-500">No verified sellers yet.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {verifiedSellers.map((seller, idx) => (
                            <div
                                key={idx}
                                className="backdrop-blur-xl bg-white/40 border border-white/30 p-6 rounded-2xl shadow-sm hover:bg-white/60 transition"
                            >
                                <h4 className="text-lg font-medium mb-2">
                                    {seller.name || seller.address.slice(0, 6) + '...' + seller.address.slice(-4)}
                                </h4>
                                {seller.brand && (
                                    <p className="text-gray-700 text-sm">{seller.brand}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>



            <div className="mt-28 px-10 pb-20">
                <h3 className="text-3xl font-light text-center mb-12 tracking-tight">
                    Key Features
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        { title: "Verified Sellers", desc: "Only government-verified sellers can upload items." },
                        { title: "Blockchain Transparency", desc: "Every transaction is logged on a transparent blockchain ledger." },
                        { title: "Secure Escrow Payments", desc: "Payments stay in escrow until delivery is verified." }
                    ].map((feature, idx) => (
                        <div
                            key={idx}
                            className="backdrop-blur-xl bg-white/40 border border-white/30 p-8 rounded-2xl shadow-sm hover:bg-white/60 transition"
                        >
                            <h4 className="text-xl font-medium mb-3">{feature.title}</h4>
                            <p className="text-gray-700">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
