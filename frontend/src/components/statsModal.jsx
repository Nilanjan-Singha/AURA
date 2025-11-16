import React, { useContext, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer
} from "recharts";
import { X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { TrackerContext } from "../context/Context";

const STATUS_COLORS = ["#4ade80", "#60a5fa", "#f87171", "#fbbf24"]; 
// Completed, Watching, Dropped, Planning

const StatsModal = ({ type, setshowstatModal }) => {
  const { theme } = useTheme();
  const { trackers } = useContext(TrackerContext);

    const onClose = () =>{
    setshowstatModal(false);
    console.log("exit stat")
  }

  const data = trackers[type] || [];
  const isUtility = ["subscriptions", "finance", "contacts", "applications", "passwords"].includes(type)

  // ---------------- STATUS COUNTS ----------------
  const statusData = useMemo(() => {
    const counts = {
      Completed: 0,
      Watching: 0,
      Upcoming: 0
    };

    data.forEach((item) => {
      if (counts[item.status] !== undefined) counts[item.status] += 1;
    });

    return Object.entries(counts).map(([name, value], i) => ({
      name,
      value,
      color: STATUS_COLORS[i],
    }));
  }, [data]);

  // ---------------- GENRE / CATEGORY COUNTS ----------------
  const genreData = useMemo(() => {
    const map = {};

    data.forEach((item) => {
      let arr = [];

      if (Array.isArray(item.genres)) arr = item.genres;
      else if (item.category) arr = [item.category];

      arr.forEach((g) => {
        map[g] = (map[g] || 0) + 1;
      });
    });

    return Object.keys(map).map((g) => ({
      name: g,
      count: map[g],
    }));
  }, [data]);

  return (
    <div
      className="fixed inset-0 z-250 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        onMouseDown={onClose}    // CLOSE modal on background click

    >
      <div
        className="relative border border-gray-700 rounded-2xl w-full max-w-3xl p-6 shadow-2xl"
        style={{ background: theme.bg }}
            onMouseDown={(e) => e.stopPropagation()}   // BLOCKS click bubbling
      >
        <X
          className="absolute top-4 right-4 h-6 w-6 cursor-pointer hover:text-red-500"
          onMouseDown={(e) => { 
      e.stopPropagation();  
      onClose();
}}
        />

        <h2
          className="text-2xl font-semibold text-center mb-6"
          style={{ color: theme.text }}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)} Stats
        </h2>

{/* ---------------- STATUS PIE ---------------- */}
{/* ---------------- PIE CHART ---------------- */}
<div className="mb-8">
  <h3 className="text-lg font-medium mb-3" style={{ color: theme.text }}>
    {isUtility ? "Category Breakdown" : "Status Breakdown"}
  </h3>
</div>

{/* ---------- If Utility: Use GENRE DATA for PIE ---------- */}
{isUtility ? (
  genreData.length === 0 ? (
    <p className="text-gray-400 text-sm mb-6">No categories found.</p>
  ) : (
    <div className="w-full" style={{ height: "300px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={genreData}
            cx="50%"
            cy="50%"
            outerRadius={110}
            dataKey="count"
            label={({ name, count }) => `${name}: ${count}`}
          >
            {genreData.map((e, i) => (
              <Cell key={i} fill={STATUS_COLORS[i % STATUS_COLORS.length]} />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{ background: "#111", border: "1px solid #333" }}
            itemStyle={{ color: theme.text }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
) : (
  /* ---------- If Media: Use STATUS DATA for PIE ---------- */
  statusData.reduce((a, b) => a + b.value, 0) === 0 ? (
    <p className="text-gray-400 text-sm mb-6">No status data available.</p>
  ) : (
    <div className="w-full" style={{ height: "300px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={statusData}
            cx="50%"
            cy="50%"
            outerRadius={110}
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}`}
          >
            {statusData.map((e, i) => (
              <Cell key={i} fill={e.color} />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{ background: "#111", border: "1px solid #333" }}
            itemStyle={{ color: theme.text }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
)}


        {/* ---------------- GENRE / CATEGORY BAR ---------------- */}
        <div>
          <h3 className="text-lg font-medium mb-3" style={{ color: theme.text }}>
            {["subscriptions", "finance", "contacts", "applications", "passwords"].includes(type)
              ? "Category Breakdown"
              : "Genre Breakdown"}
          </h3>

          {genreData.length === 0 ? (
            <p className="text-gray-400 text-sm">No genre/category data available.</p>
          ) : (
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={genreData}>
                  <XAxis dataKey="name" tick={{ fill: theme.text }} />
                  <YAxis tick={{ fill: theme.text }} />
                  <Tooltip
                    contentStyle={{  border: "1px solid #333" }}
                    itemStyle={{ color: theme.text }}
                  />
                  <Bar dataKey="count" fill={theme.accent} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsModal;
