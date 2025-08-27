import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

interface DecodedToken {
  exp: number;
}

const publicRoutes = ["/", "/login"];

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  // Allow access to public routes without authentication
  if (publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Redirect if both tokens are missing (user is not authenticated)
  if (!accessToken && !refreshToken) {
    console.info("❌ No tokens found. Redirecting to login.");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  let isAccessTokenValid = false;

  // Check if the access token is expired
  if (accessToken) {
    try {
      const decoded: DecodedToken = jwtDecode(accessToken);
      isAccessTokenValid = decoded.exp * 1000 > Date.now();
    } catch (error) {
      console.error("❌ Invalid access token:", error);
    }
  }

  if (isAccessTokenValid) {
    return NextResponse.next(); // ✅ Proceed if access token is valid
  }

  // 🔄 If access token is expired, try refreshing it
  if (!refreshToken) {
    console.info("❌ No refresh token, redirecting to login.");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    console.info("🔄 Access token expired. Attempting to refresh...");

    const refreshResponse = await fetch("http://localhost:5001/refresh-token", {
      method: "POST",
      credentials: "include", // Send refresh token via cookies
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!refreshResponse.ok) {
      console.error(
        "❌ Refresh token invalid or expired. Redirecting to login."
      );
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const { accessToken: newAccessToken } = await refreshResponse.json();

    if (!newAccessToken) {
      console.error("❌ No new access token received. Redirecting to login.");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Set the new access token in cookies
    const response = NextResponse.next();
    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/", // Ensure it's available for all routes
    });

    console.info("✅ Token refreshed successfully. Allowing access.");
    return response;
  } catch (error) {
    console.error("❌ Error during token refresh:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Apply middleware to protected routes
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"],
  // matcher: ["/dashboard"],
};
