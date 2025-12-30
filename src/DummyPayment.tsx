import React from "react";

export default function DummyPayment() {
  const params = new URLSearchParams(window.location.search);
  const flat = params.get("flat");
  const month = params.get("month");

  function pay() {
    alert("Payment Successful!");
    window.close();
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Payment Gateway</h2>
      <p>Flat: {flat}</p>
      <p>Month: {month}</p>

      <label>
        <input type="radio" name="pay" /> PhonePe
      </label><br />
      <label>
        <input type="radio" name="pay" /> Net Banking
      </label><br />
      <label>
        <input type="radio" name="pay" /> UPI
      </label><br /><br />

      <button onClick={pay}>Pay ₹1200</button>
    </div>
  );
}
