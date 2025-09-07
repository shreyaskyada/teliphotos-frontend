import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

interface DecodedToken {
  exp: number;
}

const publicRoutes = ["/", "/login"];
// ⏱ Define a threshold in seconds (e.g., 2 minutes = 120 seconds)
const REFRESH_THRESHOLD = 120;

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  // Allow access to public routes without authentication
  if (publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Redirect if both tokens are missing
  if (!accessToken && !refreshToken) {
    console.info("❌ No tokens found. Redirecting to login.");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  let shouldRefresh = false;

  if (accessToken) {
    try {
      const decoded: DecodedToken = jwtDecode(accessToken);
      const expiryTime = decoded.exp * 1000; // convert to ms
      const timeLeft = expiryTime - Date.now();

      // token is still valid
      if (timeLeft <= REFRESH_THRESHOLD * 1000) {
        console.info("⚠️ Token is about to expire. Refreshing...");
        shouldRefresh = true;
      } else {
        return NextResponse.next(); // ✅ Token is fine, proceed
      }
    } catch (error) {
      console.error("❌ Invalid access token:", error);
      shouldRefresh = true; // force refresh
    }
  }

  if (!refreshToken) {
    console.info("❌ No refresh token, redirecting to login.");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🔄 Try refreshing if needed
  if (shouldRefresh || !accessToken) {
    try {
      console.info("🔄 Attempting to refresh access token...");

      // Replace with your API endpoint
      const refreshResponse = await fetch(
        "http://localhost:5001/refresh-access-token",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refreshToken: refreshToken,
          }),
        }
      );

      if (!refreshResponse.ok) {
        console.error("❌ Refresh token invalid or expired.");
        return NextResponse.redirect(new URL("/login", req.url));
      }

      const responseData = await refreshResponse.json();
      const newAccessToken = responseData.data.accessToken;

      if (!newAccessToken) {
        console.error("❌ No new access token received.");
        return NextResponse.redirect(new URL("/login", req.url));
      }

      // Save the new token in cookies
      const response = NextResponse.next();

      response.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      console.info("✅ Token refreshed successfully.");
      return response;
    } catch (error) {
      console.error("❌ Error during token refresh:", error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware to protected routes
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"],
};
