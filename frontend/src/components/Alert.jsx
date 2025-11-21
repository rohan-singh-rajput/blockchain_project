import React from "react";

export default function Alert({ type = "success", message }) {
    if (!message) return null;

    return (
        <div
            className={`
        transition-all duration-500 mb-4 px-4 py-3 rounded-2xl 
        backdrop-blur-xl border shadow-xl
        ${type === "error"
                    ? "bg-red-400/20 border-red-300 text-red-700"
                    : "bg-green-400/20 border-green-300 text-green-700"
                }
      `}
            style={{
                animation: "slideDown 0.4s ease-out",
            }}
        >
            {message}
        </div>
    );
}
