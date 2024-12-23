"use client";

import { useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleBulkInsert = async () => {
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/bulk", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Bulk insert failed.");
      }
      setResult(data.message || "Success!");
    } catch (err: any) {
      setResult(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Settings Page</h1>
      <button onClick={handleBulkInsert} className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? "Running..." : "Run Bulk Insert"}
      </button>

      {result && (
        <div className="mt-4 p-2 bg-gray-100 border border-gray-200 rounded">
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
