import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const AMADEUS_BASE =
  process.env.AMADEUS_ENV === "production"
    ? "https://api.amadeus.com"
    : "https://test.api.amadeus.com";

async function getToken(): Promise<string> {
  const res = await fetch(`${AMADEUS_BASE}/v1/security/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.AMADEUS_CLIENT_ID ?? "",
      client_secret: process.env.AMADEUS_CLIENT_SECRET ?? "",
    }),
  });
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const date = searchParams.get("date");
  const adults = searchParams.get("adults") ?? "1";

  if (!origin || !destination || !date) {
    return NextResponse.json(
      { error: "Missing required parameters: origin, destination, date" },
      { status: 400 }
    );
  }

  if (!process.env.AMADEUS_CLIENT_ID) {
    return NextResponse.json(
      {
        error:
          "API keys not configured yet. Add AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET to your environment variables.",
      },
      { status: 503 }
    );
  }

  try {
    const token = await getToken();

    const params = new URLSearchParams({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: date,
      adults,
      currencyCode: "USD",
      max: "10",
    });

    const res = await fetch(
      `${AMADEUS_BASE}/v2/shopping/flight-offers?${params}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = await res.json();

    if (!res.ok) {
      const errData = data as { errors?: Array<{ detail: string }> };
      return NextResponse.json(
        {
          error:
            errData.errors?.[0]?.detail ??
            "No flights found for this route and date.",
        },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
