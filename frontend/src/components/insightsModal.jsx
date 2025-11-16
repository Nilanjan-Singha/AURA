import React, { useContext, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { X } from "lucide-react";
import { TrackerContext } from "../context/Context";
import { useTheme } from "../context/ThemeContext";

const COLORS = ["#4ade80", "#60a5fa", "#f87171", "#fbbf24", "#c084fc", "#f472b6"];

const InsightsModal = ({ onClose }) => {
  const { trackers } = useContext(TrackerContext);
  const { theme } = useTheme();

  const trackerNames = Object.keys(trackers);

  // ---------------- TOTAL COUNTS ----------------
  const cardData = useMemo(() => {
    return trackerNames.map((name) => ({
      name,
      count: trackers[name]?.length || 0,
    }));
  }, [trackers]);

  // ---------------- PIE CHART DATA ----------------
  const pieData = useMemo(() => {
    return cardData
      .filter((c) => c.count > 0)
      .map((c, i) => ({
        name: c.name,
        value: c.count,
        color: COLORS[i % COLORS.length],
      }));
  }, [cardData]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className="relative border border-gray-700 rounded-2xl w-full max-w-4xl p-6 shadow-2xl"
        style={{ background: theme.bg }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <X
          className="absolute top-4 right-4 h-6 w-6 cursor-pointer hover:text-red-500"
          onMouseDown={(e) => {
            e.stopPropagation();
            onClose();
          }}
        />

        <h2
          className="text-2xl font-semibold text-center mb-8"
          style={{ color: theme.text }}
        >
          Insights Overview
        </h2>

        {/* ---------------- CARD GRID ---------------- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {cardData.map((c, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-gray-700 shadow-md text-center"
              style={{ background: theme.card, color: theme.text }}
            >
              <h3 className="font-semibold capitalize">{c.name}</h3>
              <p className="text-2xl font-bold mt-2">{c.count}</p>
            </div>
          ))}
        </div>

        {/* ---------------- PIE CHART ---------------- */}
        <h3
          className="text-lg font-medium mb-3"
          style={{ color: theme.text }}
        >
          Overall Distribution
        </h3>

        {pieData.length === 0 ? (
          <p className="text-gray-400 text-sm text-center">
            No data available to visualize.
          </p>
        ) : (
          <div className="w-full" style={{ height: "320px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {pieData.map((e, i) => (
                    <Cell key={i} fill={e.color} />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #333",
                    color: theme.text,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightsModal;
