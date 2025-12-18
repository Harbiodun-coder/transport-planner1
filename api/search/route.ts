import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query || query.length < 4) {
    return NextResponse.json({ matches: [] });
  }

  const res = await fetch(
    `https://api.tfl.gov.uk/StopPoint/Search/${query}?app_key=${process.env.TFL_APP_KEY}`
  );

  const data = await res.json();

  // Filter wide locations (same logic as Blazor)
  const matches = data.matches?.filter((m: any) => m.id.length > 6);

  return NextResponse.json(matches);
}
