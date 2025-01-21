// "use client";

// import axios from "axios";
// import { useEffect } from "react";

// interface TelegramAuthData {
//   id: string;
//   first_name: string;
//   last_name?: string;
//   username?: string;
//   photo_url?: string;
//   auth_date: string;
//   hash: string;
// }

// export default function Home() {
//   const handleLogin = async (authData: TelegramAuthData) => {
//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/auth/telegram`,
//         authData
//       );
//       if (response.status === 200) {
//         // Save token in localStorage or cookies
//         localStorage.setItem("authToken", response.data.token);
//         alert("Login successful!");
//       } else {
//         alert("Login failed.");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//     }
//   };

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const script = document.createElement("script");
//       script.src = "https://telegram.org/js/telegram-widget.js?22";
//       script.setAttribute("data-telegram-login", "t_photos_bot");
//       script.setAttribute("data-size", "large");
//       script.setAttribute("data-auth-url", "/api/verify-user");
//       script.setAttribute("data-request-access", "write");
//       script.onload = () => {
//         (window as any).TelegramLoginWidgetCallback = handleLogin;
//       };
//       document.getElementById("telegram-login")?.appendChild(script);
//     }
//   }, []);

//   return <div id="telegram-login"></div>;
// }

import TelegramLogin from "@tphotos/components/TelegramLogin";

const page = () => {
  return (
    <>
      Helloo 12
      <TelegramLogin />
    </>
  );
};

export default page;
