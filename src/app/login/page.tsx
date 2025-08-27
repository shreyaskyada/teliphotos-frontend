"use client";

import { PhoneInput } from "@teliphotos/components";
import { Button, Input } from "@teliphotos/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { verifyOTP } from "./actions"; // Server function

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [otpText, setOtpText] = useState("");
  const router = useRouter();

  const onSendOTPClickHandler = async () => {
    try {
      const response = await fetch("http://localhost:5001/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });

      // console.log("sendOTPData", await );
      const responseData = await response.json();
      sessionStorage.setItem(
        "phoneCodeHash",
        responseData.data.phoneCodeHash.phoneCodeHash
      );
      setIsOtpMode(true);
    } catch (error) {
      console.error("Error sending OTP", error);
    }
  };

  const onVerifyOTPClickHandler = async () => {
    const phoneCodeHash = sessionStorage.getItem("phoneCodeHash");

    const result = await verifyOTP(phoneNumber, otpText, phoneCodeHash!);

    if (result.success) {
      // window.location.href = "/dashboard"; // Redirect on success
      router.push("/dashboard");
      // window.sessionStorage("")
    } else {
      console.error("OTP verification failed");
    }
  };

  return (
    <div className="max-w-md mx-auto flex flex-col gap-4 p-5">
      {isOtpMode ? (
        <div className="flex flex-col gap-5">
          <Input
            placeholder="Enter OTP"
            onChange={(event) => setOtpText(event.target.value)}
          />
          <Button onClick={onVerifyOTPClickHandler}>Verify OTP</Button>
        </div>
      ) : (
        <>
          <PhoneInput onChange={setPhoneNumber} />
          <Button onClick={onSendOTPClickHandler}>Send OTP</Button>
        </>
      )}
    </div>
  );
};

export default Login;
