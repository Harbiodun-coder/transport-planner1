import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!from || !to) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  const res = await fetch(
    `https://api.tfl.gov.uk/Journey/JourneyResults/${from}/to/${to}?app_key=${process.env.TFL_APP_KEY}`
  );

  const data = await res.json();
  return NextResponse.json(data);
}
