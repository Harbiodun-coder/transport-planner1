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
  const [favourites, setFavourites] = useState<StopPoint[]>([]);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) router.push("/auth/login");

    const stored = localStorage.getItem("favouriteStops");
    if (stored) setFavourites(JSON.parse(stored));
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

  const addFavourite = () => {
    if (!from) return;
    const updated = [...favourites, from].filter(
      (v, i, a) => a.findIndex((t) => t.id === v.id) === i,
    );
    setFavourites(updated);
    localStorage.setItem("favouriteStops", JSON.stringify(updated));
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <header className="flex items-center justify-between px-10 py-6 text-sm text-slate-600">
        <span className="font-semibold text-slate-900">SwiftRoute</span>

        <div className="flex gap-6">
          <span className="cursor-pointer hover:text-slate-900">Map</span>
          <span className="cursor-pointer hover:text-slate-900">History</span>
          <span className="cursor-pointer hover:text-slate-900">
            Favourites
          </span>
          <button
            onClick={() => {
              localStorage.removeItem("currentUser");
              router.push("/");
            }}
            className="text-red-500 font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center text-center mt-10 px-4">
        <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
          Real-time tracking available
        </span>

        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          Welcome to SwiftRoute
        </h1>

        <p className="text-slate-600 max-w-xl">
          Your bus, right on time. Track buses in real-time, plan your journey,
          and never miss your ride with SwiftRoute.
        </p>

        {/* Search Bar */}
        <div className="mt-10 w-full max-w-4xl bg-white border rounded-xl shadow-sm p-3 flex flex-col md:flex-row gap-3">
          <LocationInput
            label="From: Enter location or stop"
            onSelect={setFrom}
          />
          <LocationInput label="To: Enter destination" onSelect={setTo} />

          <div className="flex gap-2">
            <button
              onClick={planJourney}
              disabled={!from || !to || loading}
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              {loading ? "Searching..." : "Search"}
            </button>

            {from && (
              <button
                onClick={addFavourite}
                title="Add to favourites"
                className="border rounded-lg px-4 text-lg hover:bg-slate-100"
              >
                ⭐
              </button>
            )}
          </div>
        </div>

        {/* Favourite Places */}
        {favourites.length > 0 && (
          <div className="mt-6 max-w-4xl w-full">
            <h3 className="text-sm font-medium text-slate-600 mb-3">
              Favourite places
            </h3>

            <div className="flex flex-wrap gap-3 justify-center">
              {favourites.map((place) => (
                <button
                  key={place.id}
                  onClick={() => setFrom(place)}
                  className="px-4 py-2 bg-white border rounded-full text-sm hover:bg-blue-50 hover:border-blue-400 transition"
                >
                  {place.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Results */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        {journeys.length > 0 && <JourneyResults journeys={journeys} />}

        {!loading && journeys.length === 0 && (
          <p className="text-center mt-10 text-slate-500">
            Enter your locations to view journey options
          </p>
        )}
      </section>
    </main>
  );
}
