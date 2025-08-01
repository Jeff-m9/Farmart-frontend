import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useCart } from "./CartContext";
import { BASE_URL } from "../utils";
import { Phone } from "lucide-react";

function PaymentPage() {
  const { total } = useCart();
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
        clearInterval(intervalId.current);

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
   let formattedPhone = phone
if (phone.startsWith("0")){
  formattedPhone = `254${phone.slice(1)}`
  
}
else if (phone.startsWith("+254")) {
  formattedPhone = phone.slice(1);
} else if (phone.startsWith("254")) {
  formattedPhone = phone
}  else {
  toast("Please enter a valid phone number (starting with 07, 254, or +254).");
  return;
}

console.log("Formatted Phone:", formattedPhone);
    // retrieving access token from local storage
   
    const accessToken = localStorage.getItem("token");
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
        body: JSON.stringify({ phone:formattedPhone, amount: total }),
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
    <div className="min-h-screen bg-[#f1f8e9] font-sans flex flex-col">
      <div
        style={{
          maxWidth: 400,
          margin: "50px auto",
          padding: 20,
          border: "1px solid #ccc",
          background: "white",
          borderRadius: 8,
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#65bb46", marginBottom: 10 }}>Payment</h1>
        <p className="font-bold text-[#65bb46] mb-4">
          Total Amount: Ksh {total.toLocaleString()}
        </p>
        <p style={{ color: "#555", marginBottom: 20 }}>
          Enter your phone number to pay via M-PESA.
        </p>

        <input
          type="text"
          placeholder="0712345678"
          value={phone}
          onChange={(e)=> setPhone(e.target.value)}
          className="w-full p-2 mb-5 border border-gray-300 rounded"
        />
        <button
          onClick={() => handleInitiatePayment()}
          style={{
            backgroundColor: "#65bb46",
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
    </div>
  );
}

export default PaymentPage;
