import { useState, useRef } from "react";
import { toast } from "react-toastify";

const BASE_URL = "http://127.0.0.1:5000";

function PaymentPage() {
  const [phone, setPhone] = useState("");
  const toastId = useRef(null);
  const intervalId = useRef(null);
  // Method to check Payment response
  const checkPayment = (checkoutRequestId) => {
    fetch(`${BASE_URL}/payments/check/${checkoutRequestId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        clearInterval(intervalId);

        if (data.data.ResultCode == "0") {
          toast.update(toastId.current, {
            render: "Payment successful",
            type: "success",
            isLoading: false,
            autoClose: 4000,
          });
        } else {
          toast.update(toastId.current, {
            render: "Payment not successful",
            type: "error",
            isLoading: false,
            autoClose: 4000,
          });
        }
      })
      .catch((err) => {
        clearInterval(intervalId.current);
        toast.update(toastId.current, {
          render: "Error checking payment",
          type: "error",
          isLoading: false,
          autoClose: 4000,
        });
      });
  };

  const handleInitiatePayment = async () => {
    // Checking if phone number is empty
    if (!phone) {
      toast("Kindly enter your phone number.");
      return;
    }
    // retrieving access token from local storage
    const accessToken = localStorage.getItem("session");
    // toast
    toastId.current = toast.loading("Initiating STK push...");
    // Post request to server
    try {
      const res = await fetch(`${BASE_URL}/payments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ phone }),
      });
      // converting response to json
      const data = await res.json();

      if (!res.ok) {
        toast.update(toastId.current, {
          render: data.message || "Payment initiation failed",
          type: "error",
          isLoading: false,
          autoClose: 4000,
        });
        return;
      }

      toast.update(toastId.current, {
        render: "Confirming payment...",
        type: "info",
        isLoading: true,
      });

      // Start polling every 10 seconds
      intervalId.current = setInterval(() => {
        checkPayment(data.data.CheckoutRequestID);
      }, 10_000);
      // stop polling
      setTimeout(() => clearInterval(intervalId.current), 100_000);
    } catch (err) {
      toast.update(toastId.current, {
        render: "Something went wrong. Try again.",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "50px auto",
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 8,
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "#2c7a7b", marginBottom: 10 }}>Payment</h1>
      <p style={{ color: "#555", marginBottom: 20 }}>
        Enter your phone number to pay via M-PESA.
      </p>
      <input
        type="text"
        placeholder="254712345678"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-2 mb-5 border border-gray-300 rounded"
      />
      <button
        onClick={() => handleInitiatePayment()}
        style={{
          backgroundColor: "#2c7a7b",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: 4,
          cursor: "pointer",
          fontSize: 16,
        }}
      >
        Pay Now
      </button>
    </div>
  );
}

export default PaymentPage;
