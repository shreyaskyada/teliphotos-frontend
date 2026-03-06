import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

interface DecodedToken {
  exp: number;
}

const publicRoutes = [
  "/",
  "/login",
  "/about",
  "/features",
  "/how-it-works",
  "/faq",
  "/terms",
  "/privacy",
  "/contact"
];
const publicPrefixes = ["/blog"];
const publicFilePatterns = /\.(js|css|png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|txt|xml)$/i;
// ⏱ Define a threshold in seconds (e.g., 2 minutes = 120 seconds)
const REFRESH_THRESHOLD = 120;

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("telephotos_access_token")?.value;
  const refreshToken = req.cookies.get("telephotos_refresh_token")?.value;
  const isLoginPage = req.nextUrl.pathname === "/login";

  // If user is on /login and has a valid token, redirect to /dashboard
  if (isLoginPage && accessToken) {
    try {
      const decoded: DecodedToken = jwtDecode(accessToken);
      const expiryTime = decoded.exp * 1000;
      const timeLeft = expiryTime - Date.now();

      if (timeLeft > REFRESH_THRESHOLD * 1000) {
        // Token is still valid — redirect to dashboard
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    } catch {
      // Invalid token, let them stay on login
    }
  }

  // If user is on /login and has no valid access token but has a refresh token, try refreshing
  if (isLoginPage && !accessToken && refreshToken) {
    try {
      const refreshResponse = await fetch(
        "http://localhost:5001/refresh-access-token",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (refreshResponse.ok) {
        const responseData = await refreshResponse.json();
        const newAccessToken = responseData.data.accessToken;

        if (newAccessToken) {
          const response = NextResponse.redirect(new URL("/dashboard", req.url));
          response.cookies.set("telephotos_access_token", newAccessToken, {
            sameSite: "lax",
            path: "/",
          });
          return response;
        }
      }
    } catch {
      // Refresh failed, let them stay on login
    }
  }

  // Allow static/public files (sw.js, images, fonts, etc.) without auth
  if (publicFilePatterns.test(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Allow access to public routes without authentication
  if (
    publicRoutes.includes(req.nextUrl.pathname) ||
    publicPrefixes.some((prefix) => req.nextUrl.pathname.startsWith(prefix))
  ) {
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

          response.cookies.set("telephotos_access_token", newAccessToken, {
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

// Apply middleware to all routes except static assets, public files, and API routes
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon.png|logo.png|sw.js|hero|robots.txt|sitemap.xml).*)"],
};
