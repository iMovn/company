// app/api/menu/route.ts

import { fetchSettings } from "@services/setting.service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const menu = await fetchSettings();

    return NextResponse.json(menu, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=600", // cache 10 phút
      },
    });
  } catch (error) {
    console.error("API /menu error:", error);
    return NextResponse.json(
      { error: "Failed to fetch menu" },
      { status: 500 }
    );
  }
}
