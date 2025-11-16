import React, { useContext, useState, useEffect } from "react";
import { TrackerContext } from "../context/Context";
import { utilitySchemas } from "../data/utilitySchema";
import { Plus, Trash2, Save } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useTracker } from "../context/Context";

const UtilityTable = ({ type }) => {
  const { trackers, selectedGenres } = useContext(TrackerContext);
  const schema = utilitySchemas[type] || [];
  const [rows, setRows] = useState([]);
  const {theme} = useTheme();
  const {addItem} = useTracker()

  const filteredRows =
  selectedGenres.length === 0
    ? rows
    : rows.filter((row) =>
        row.genres?.some((g) => selectedGenres.includes(g))
      );

  useEffect(() => {
    setRows(trackers[type] || []);
      console.log("Utility raw:", trackers[type]);
  }, [trackers, type]);

  const handleAddRow = () => {
    const newRow = Object.fromEntries(schema.map((f) => [f.key, ""]));
    setRows((prev) => [...prev, newRow]);
  };

  const handleChange = (rowIdx, key, value) => {
    const updated = [...rows];
    updated[rowIdx][key] = value;
    setRows(updated);
  };

  const handleDeleteRow = (index) => {
    // ⚠ FIX: Delete from raw rows, not filtered rows
    const actualIndex = rows.indexOf(filteredRows[index]);
    setRows((prev) => prev.filter((_, i) => i !== actualIndex));
  };


  const handleSave = () => {
  rows.forEach(row => addItem(type, row));
};

  const renderInput = (field, value, onChange) => {
    switch (field.type) {
      case "select":
        return (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="">Select...</option>
            {field.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      case "number":
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
          />
        );
      case "date":
        return (
          <input
            type="date"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
            style={{ color: theme.text }}
          />
        );
      case "password":
        return (
          <input
            type="password"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
          />
        );
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
          />
        );
    }
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="flex justify-between items-center mb-4" style={{ color: theme.text }}>
        <h2 className="text-xl font-semibold capitalize">{type} Tracker</h2>
        <div className="flex gap-2">
          <button
            onClick={handleAddRow}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={16} /> Add Row
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Save size={16} /> Save
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden" style={{ color: theme.text }}>
          <thead className="">
            <tr>
              {schema.map((field) => (
                <th key={field.key} className="px-4 py-2 text-left">
                  {field.label}
                </th>
              ))}
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.length === 0 ? (
              <tr>
                <td
                  colSpan={schema.length + 1}
                  className="text-center  py-6"
                  style={{ color: theme.text }}
                >
                  No entries yet.
                </td>
              </tr>
            ) : (
              filteredRows.map((row, i) => (
                <tr key={i} className="border-t border-gray-200">
                  {schema.map((field) => (
                    <td key={field.key} className="px-3 py-2">
                      {renderInput(field, row[field.key] || "", (val) =>
                        handleChange(i, field.key, val)
                      )}
                    </td>
                  ))}
                  <td className="px-3 py-2 text-center">
                    <button
                      onClick={() => handleDeleteRow(i)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UtilityTable;
