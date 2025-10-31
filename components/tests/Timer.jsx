"use client";
import { useEffect } from "react";
import { Clock } from "lucide-react";

export default function Timer({ timeLeft, onTimeout }) {
  useEffect(() => {
    if (timeLeft <= 0) onTimeout();
  }, [timeLeft, onTimeout]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`px-3 py-1 rounded-lg flex items-center gap-2 ${
        timeLeft < 300
          ? "bg-red-100 text-red-600"
          : "bg-primary/10 text-primary"
      }`}
    >
      <Clock className="w-4 h-4" />
      <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
    </div>
  );
}
