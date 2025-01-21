import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

// const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN as string; // Ensure this is set in your environment variables
const BOT_TOKEN = "6319885517:AAGOuSsYIdKUiKj88h507lQfhqLI9i-uhAk";
const SECRET_KEY = crypto.createHash("sha256").update(BOT_TOKEN).digest();

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

const verifyTelegramAuth = (data: TelegramUser): boolean => {
  const checkString = Object.keys(data)
    .filter((key) => key !== "hash")
    .sort()
    .map((key) => `${key}=${data[key as keyof TelegramUser]}`)
    .join("\n");

  const hash = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(checkString)
    .digest("hex");
  return hash === data.hash;
};

export async function POST(req: NextRequest) {
  try {
    const body: TelegramUser = await req.json();

    // Verify Telegram-provided data
    if (!verifyTelegramAuth(body)) {
      return NextResponse.json(
        { success: false, error: "Invalid authentication" },
        { status: 401 }
      );
    }

    // Placeholder for further actions (e.g., initializing a session or TDLib)
    console.log("Authenticated user:", body);

    return NextResponse.json({ success: true, user: body }, { status: 200 });
  } catch (error) {
    console.error("Error in /verify-user route:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
