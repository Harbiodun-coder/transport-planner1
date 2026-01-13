"use client";

import { Journey } from "@/types/tfl";
import {
  FaBus,
  FaTrain,
  FaWalking,
  FaSubway,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";

export default function JourneyResults({ journeys }: { journeys: Journey[] }) {
  const getIcon = (mode: string) => {
    switch (mode.toLowerCase()) {
      case "bus":
        return <FaBus />;
      case "tube":
        return <FaSubway />;
      case "national-rail":
      case "train":
        return <FaTrain />;
      case "walking":
        return <FaWalking />;
      default:
        return <FaArrowRight />;
    }
  };

  return (
    <div className="mt-8 space-y-6">
      {journeys.map((j, i) => (
        <div
          key={i}
          className="rounded-2xl border bg-white/70 backdrop-blur shadow-lg p-6 hover:shadow-xl transition"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Journey {i + 1}</h2>

            <div className="flex gap-2">
              <span className="flex items-center gap-2 text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                <FaClock />
                {j.duration} mins
              </span>

              {j.fare && (
                <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  £{(j.fare.totalCost / 100).toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Times */}
          <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 mb-4">
            <p>
              <span className="font-medium">Departure:</span>{" "}
              {new Date(j.startDateTime).toLocaleTimeString()}
            </p>
            <p>
              <span className="font-medium">Arrival:</span>{" "}
              {new Date(j.arrivalDateTime).toLocaleTimeString()}
            </p>
          </div>

          {/* Legs Timeline */}
          <div className="space-y-4">
            {j.legs.map((l, idx) => (
              <div key={idx} className="flex items-start gap-3">
                {/* Icon bubble */}
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  {getIcon(l.mode.name)}
                </div>

                <div className="flex-1">
                  <p className="font-medium">{l.instruction.summary}</p>
                  <p className="text-xs text-slate-500">
                    {l.duration} mins • {l.departurePoint.commonName} →{" "}
                    {l.arrivalPoint.commonName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
