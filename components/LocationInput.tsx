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
    <div className="relative">
      <input
        value={value}
        onChange={handleChange}
        placeholder={label}
        className="w-full border p-3 text-lg"
      />

      {results.length > 0 && (
        <ul className="absolute bg-white border w-full z-10">
          {results.map((r) => (
            <li
              key={r.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
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
