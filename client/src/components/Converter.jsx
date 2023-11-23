import React, { useState, useEffect } from "react";
import backgroundImage from "../assets/background.avif";

const Converter = () => {
  const mainStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    color: "white",
    padding: "50px",
  };

  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("Currency 1");
  const [toCurrency, setToCurrency] = useState("Currency 2");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [duration, setDuration] = useState("Select Duration");

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const handleConvert = () => {
    const converted = (parseFloat(amount) * 1.2).toFixed(2);
    setConvertedAmount(converted);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  return (
    <main style={mainStyle}>
      <div className="container mt-5">
        <div className="card p-4 shadow-sm">
          <h2 className="text-center mb-4">Currency Converter</h2>
          <div className="d-flex align-items-center gap-3">
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Exchange Amount"
              className="form-control"
            />
            <select
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
              className="form-select"
            >
              <option value="Currency 1">Currency 1</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
            <select
              value={toCurrency}
              onChange={handleToCurrencyChange}
              className="form-select"
            >
              <option value="currency 2">Currency 2</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <div className="mt-4">
            <select
              value={duration}
              onChange={handleDurationChange}
              className="form-select"
            >
              <option value="Select Duration">Select Duration</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
            <button onClick={handleConvert} className="btn btn-primary mt-4">
              Convert
            </button>
          </div>

          {convertedAmount && (
            <div className="mt-8">
              <p className="text-center">Converted Amount:</p>
              <input
                type="text"
                value={convertedAmount}
                readOnly
                className="form-control"
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
export default Converter;
