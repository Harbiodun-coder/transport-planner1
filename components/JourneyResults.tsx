import { Journey } from "@/types/tfl";

export default function JourneyResults({ journeys }: { journeys: Journey[] }) {
  return (
    <div className="space-y-6 mt-6">
      {journeys.map((j, i) => (
        <div key={i} className="border p-4 bg-gray-50">
          <h2 className="text-xl font-bold">Journey {i + 1}</h2>

          <p>
            Departure: <b>{new Date(j.startDateTime).toLocaleTimeString()}</b>
          </p>
          <p>
            Arrival: <b>{new Date(j.arrivalDateTime).toLocaleTimeString()}</b>
          </p>
          <p>
            Duration: <b>{j.duration} mins</b>
          </p>

          <ol className="list-decimal ml-6 mt-3">
            {j.legs.map((l, idx) => (
              <li key={idx}>
                {l.instruction.summary} ({l.duration} mins)
              </li>
            ))}
          </ol>

          {j.fare && (
            <p className="mt-2 font-semibold">
              Cost: £{(j.fare.totalCost / 100).toFixed(2)}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
