import React, { useState, useEffect } from "react";
import { Target, Activity, ShieldCheck, Database } from "lucide-react";

export function SystemStatusBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Mock Gotham EST time
      const timeString = now.toLocaleTimeString("en-US", {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setTime(`GOTHAM CITY ${timeString} EST`);
    };
    updateTime();
    const int = setInterval(updateTime, 60000);
    return () => clearInterval(int);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none z-50 flex items-center justify-between px-8 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-white/50 tracking-widest font-bold">
            {time}
          </span>
          <span className="text-[8px] text-[#00ff41]/70 tracking-widest flex items-center gap-2">
            <Activity className="w-3 h-3" /> WEATHER: RAIN / FOG / VISIBILITY
            LOW
          </span>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="text-[10px] text-white/70 tracking-widest flex items-center gap-2">
            CLEARANCE: <span className="text-[#d4af37]">ARCHIVIST</span>{" "}
            <ShieldCheck className="w-3 h-3 text-[#d4af37]" />
          </span>
          <span className="text-[8px] text-white/40 tracking-widest">
            SECURE CONNECTION ESTABLISHED
          </span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none z-50 flex items-center justify-between px-8 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-[9px] text-white/40 tracking-widest">
            <Database className="w-3 h-3" />
            MEM: 84% ALLOCATED
          </div>
          <div className="flex items-center gap-2 text-[9px] text-[#00ff41]/50 tracking-widest">
            <Target className="w-3 h-3" />
            SYS: STABLE
          </div>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`w-1 h-3 ${Math.random() > 0.2 ? "bg-white/20" : "bg-white/5 animate-pulse"}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
