"use client";

import { useState } from "react";
import { StopPoint } from "@/types/tfl";

export default function LocationInput({
  label,
  onSelect,
}: {
  label: string;
  onSelect: (stop: StopPoint) => void;
}) {
  const [value, setValue] = useState("");
  const [results, setResults] = useState<StopPoint[]>([]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setValue(text);

    if (text.length < 4) return;

    const res = await fetch(`/api/search?q=${text}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div className="relative flex-1">
      <input
        value={value}
        onChange={handleChange}
        placeholder={label}
        className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {results.length > 0 && (
        <ul className="absolute mt-1 bg-white border rounded-lg w-full z-20 shadow">
          {results.map((r) => (
            <li
              key={r.id}
              className="px-4 py-2 text-sm hover:bg-slate-100 cursor-pointer"
              onClick={() => {
                onSelect(r);
                setValue(r.name);
                setResults([]);
              }}
            >
              {r.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
