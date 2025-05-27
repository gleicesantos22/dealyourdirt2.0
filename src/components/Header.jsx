"use client";

import React, { useState, useEffect } from "react";

export default function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [timeLeft, setTimeLeft] = useState(600); // Set 10 minutes (600 seconds)
  const [discreetPackaging, setDiscreetPackaging] = useState(false); // for the discreet packaging toggle

  const discreetAmount = 549.05; // Amount to be added if discreet packaging is on

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer); // Stop timer when countdown reaches 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // Update every second

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // Load cart from localStorage, normalize qty & price
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const normalized = parsed.map((item) => ({
          ...item,
          price: Number(item.price) || 0,
          qty: Number(item.qty) || 1,
        }));
        setCartItems(normalized);
      } catch {
        setCartItems([]);
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const incrementQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decrementQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
          : item
      )
    );
  };

  // Calculate total price and total quantity using qty
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.qty, 0);

  // Add discreet packaging if the toggle is on
  const finalAmount = discreetPackaging
    ? totalPrice + discreetAmount
    : totalPrice;

  // Calculate discount savings
  const savedAmount = discreetPackaging ? discreetAmount : 0;
  const discountedPrice = totalPrice + savedAmount;

  return (
    <>
      <header className="bg-black flex justify-between items-center px-6 h-32 md:h-32 shadow-lg relative z-50">
        <div className="flex items-center space-x-3">
          <img src="/logo.avif" alt="Logo" className="h-15 w-auto" />
        </div>
        <div className="flex items-center space-x-5">
          <div className="flex items-center gap-2.5">
            <img
              src="/usa_flag.png"
              alt="US Flag"
              className="w-5 h-5 md:w-6 md:h-6 rounded-full object-cover"
              loading="lazy"
            />
            <span className="text-white font-semibold text-sm md:text-base select-none">
              USD $
            </span>
          </div>

          <button
            aria-label="Search"
            className="text-white hover:text-pink-500 transition"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 md:h-7 w-6 md:w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1111.25 3a7.5 7.5 0 015.4 12.65z"
              />
            </svg>
          </button>

          <button
            aria-label="Cart"
            className="relative text-white hover:text-pink-500 transition"
            type="button"
            onClick={() => setCartOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 md:h-7 w-6 md:w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h18l-1.68 14.53a2 2 0 01-2 1.47H8.68a2 2 0 01-2-1.47L5 6H3"
              />
            </svg>

            {totalQuantity > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-600 rounded-full text-xs w-5 h-5 flex items-center justify-center font-semibold">
                {totalQuantity}
              </span>
            )}
          </button>
        </div>
      </header>

      {cartOpen && (
        <>
          <div onClick={() => setCartOpen(false)} className="" />

          <aside className="fixed top-0 right-0 h-full w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-white shadow-lg z-60 flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-2xl font-bold">Cart • </h2>
                <div className="flex items-center justify-center text-center h-7 w-7 p-2 rounded-full bg-black text-white font-bold">
                  {cartItems.length}
                </div>
              </div>

              <button
                aria-label="Close cart"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setCartOpen(false)}
              >
                ✕
              </button>
            </div>

            {cartItems.length > 0 && (
              <div className="bg-black text-white p-4 flex justify-between items-center">
                <span>Limited Stock | Cart Reserved For:</span>
                <span className="text-red-500 font-bold text-xl">
                  {formatTime(timeLeft)}
                </span>
              </div>
            )}

            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty.</p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 border-b pb-3"
                  >
                    <img
                      src={item.images?.[0] || "/placeholder.png"}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold">{item.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => decrementQty(item.id)}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="text-sm font-semibold">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => incrementQty(item.id)}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        Tk{" "}
                        {(item.price * item.qty).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                      <button
                        className="text-red-600 text-xs hover:underline"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Discreet Packaging Section */}
            {cartItems.length > 0 && (
              <div className="p-4 border-t flex flex-col justify-between items-center">
                <div className="flex items-center gap-6">
                  <img
                    src="/boxes.jpg"
                    alt="Discreet Packaging"
                    className="h-12 w-12"
                  />
                  <span className="font-semibold">Discreet Packaging</span>
                  <span className="text-sm text-gray-500">
                    Tk {discreetAmount}
                  </span>{" "}
                  <button
                    className={`p-2 rounded-full ${
                      discreetPackaging ? "bg-green-500" : "bg-gray-300"
                    }`}
                    onClick={() => setDiscreetPackaging(!discreetPackaging)}
                  >
                    {discreetPackaging ? "✔" : "✘"}
                  </button>
                </div>
                <div className="text-sm text-gray-500">If it's a secret...</div>
              </div>
            )}

            <div className="p-4 border-t">
              <button
                disabled={cartItems.length === 0}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-full font-semibold disabled:opacity-50 flex justify-between items-center px-6 shadow-lg transition duration-300 ease-in-out"
                onClick={() =>
                  alert("Checkout - integrate your payment gateway")
                }
              >
                <span className="text-center flex-grow">Checkout</span>
                <span className="ml-4">
                  Tk{" "}
                  {finalAmount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </button>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
