"use client";

import { useState } from "react";
import LocationInput from "@/components/LocationInput";
import JourneyResults from "@/components/JourneyResults";
import { StopPoint, Journey } from "@/types/tfl";

export default function Home() {
  const [from, setFrom] = useState<StopPoint | null>(null);
  const [to, setTo] = useState<StopPoint | null>(null);
  const [journeys, setJourneys] = useState<Journey[]>([]);

  const planJourney = async () => {
    if (!from || !to) return;

    const res = await fetch(`/api/journey?from=${from.id}&to=${to.id}`);
    const data = await res.json();
    setJourneys(data.journeys || []);
  };

  return (
    <main className="max-w-xl mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-6">Plan a Journey</h1>

      <LocationInput label="From" onSelect={setFrom} />
      <LocationInput label="To" onSelect={setTo} />

      <button
        onClick={planJourney}
        className="w-full mt-4 bg-blue-900 text-white p-3 text-lg"
      >
        Plan my journey
      </button>

      {journeys.length > 0 && <JourneyResults journeys={journeys} />}
    </main>
  );
}
