import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = "196cbe371f1c40f9ba3113741241402";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city") || "Tbilisi";

    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=yes&alerts=no`;

    const res = await axios.get(apiUrl);
    return NextResponse.json(res.data);
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 });
  }
}