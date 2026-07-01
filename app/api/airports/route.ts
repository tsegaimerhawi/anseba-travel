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
  const q = req.nextUrl.searchParams.get("q");
  if (!q || q.length < 2) return NextResponse.json([]);

  if (!process.env.AMADEUS_CLIENT_ID) {
    return NextResponse.json([]);
  }

  try {
    const token = await getToken();
    const res = await fetch(
      `${AMADEUS_BASE}/v1/reference-data/locations?keyword=${encodeURIComponent(q)}&subType=CITY,AIRPORT&page[limit]=6`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = (await res.json()) as { data?: unknown[] };
    return NextResponse.json(data.data ?? []);
  } catch {
    return NextResponse.json([]);
  }
}
