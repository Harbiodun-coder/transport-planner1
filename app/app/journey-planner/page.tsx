"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LocationInput from "@/components/LocationInput";
import JourneyResults from "@/components/JourneyResults";
import { StopPoint, Journey } from "@/types/tfl";

export default function JourneyPlannerPage() {
  const router = useRouter();

  const [from, setFrom] = useState<StopPoint | null>(null);
  const [to, setTo] = useState<StopPoint | null>(null);
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) router.push("/auth/login");
  }, []);

  const planJourney = async () => {
    if (!from || !to) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/journey?from=${from.id}&to=${to.id}`);
      const data = await res.json();
      setJourneys(data.journeys || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4">
      <div className="max-w-2xl mx-auto pt-14">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Journey Planner</h1>

          <button
            onClick={() => {
              localStorage.removeItem("currentUser");
              router.push("/");
            }}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg"
          >
            Logout
          </button>
        </div>

        <p className="text-slate-600 mb-6">
          Search TfL routes across London 🚇🚍🚆
        </p>

        <div className="bg-white p-6 rounded-2xl shadow-md border">
          <LocationInput label="From" onSelect={setFrom} />
          <LocationInput label="To" onSelect={setTo} />

          <button
            onClick={planJourney}
            disabled={!from || !to || loading}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 transition text-white p-3 text-lg font-semibold rounded-xl disabled:opacity-50"
          >
            {loading ? "Planning..." : "Plan my journey"}
          </button>
        </div>

        {journeys.length > 0 && <JourneyResults journeys={journeys} />}

        {!loading && journeys.length === 0 && (
          <p className="text-center mt-6 text-slate-500">
            Enter your locations to view journey options
          </p>
        )}
      </div>
    </main>
  );
}
