// Content.jsx
import React, { useState, useEffect, useContext } from "react";
import Card from "./Card";
import AddModal from "./addModal";
import { TrackerContext } from "../context/Context";
import {
  Search,
  Plus,
  SortAsc,
  SquareCheck,
  Clock,
  List,
  ListStart,
} from "lucide-react";

const Content = ({ type }) => {
const { trackers, addItem, updateItemStatus, toggleFavourite } = useContext(TrackerContext);
  const [filtered, setFiltered] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 20;

  // 🔹 Open/Close Modal
  const handleAddClick = () => setIsAddModalOpen(true);
  const handleClose = () => setIsAddModalOpen(false);

  // 🔹 Add new item
  const handleAddItem = (item) => {
    addItem(type, item);
    setIsAddModalOpen(false);
  };

  // 🔹 Filtering, sorting, searching
  useEffect(() => {
    let list = Array.isArray(trackers[type]) ? [...trackers[type]] : [];

    if (statusFilter !== "All")
      list = list.filter((i) => i.status === statusFilter);

    if (searchQuery)
      list = list.filter((i) =>
        (i.title || "").toLowerCase().includes(searchQuery.toLowerCase())
      );

    list.sort((a, b) =>
      sortOrder === "asc"
        ? (a.title || "").localeCompare(b.title || "")
        : (b.title || "").localeCompare(a.title || "")
    );

    setFiltered(list);
    setCurrentPage(1);
  }, [trackers, type, statusFilter, searchQuery, sortOrder]);

  // 🔹 Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const indexOfLast = currentPage * itemsPerPage;
  const currentItems = filtered.slice(indexOfLast - itemsPerPage, indexOfLast);

  const paginate = (p) =>
    setCurrentPage((prev) => Math.min(Math.max(p, 1), totalPages));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const badgeClass = (name) =>
    `flex gap-2 px-3 py-1 rounded-full text-sm cursor-pointer items-center transition-colors ${
      statusFilter === name
        ? "bg-white text-black"
        : "text-white hover:bg-gray-200 hover:text-black"
    }`;

  return (
    <div className="w-auto h-auto px-4">
      {/* Header */}
      <div className="nav flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl  font-semibold mb-0 sm:mb-4">Your {type} list</h2>
        <div className="actions flex gap-2 items-center">
          <SortAsc
            className="h-5 w-5 cursor-pointer hover:text-blue-500"
            onClick={() =>
              setSortOrder((p) => (p === "asc" ? "desc" : "asc"))
            }
          />
          <Search className="h-5 w-5 cursor-pointer hover:text-blue-500" />
          <Plus
            className="h-5 w-5 cursor-pointer hover:text-green-500"
            onClick={handleAddClick}
          />
        </div>
      </div>

     {/* Status Filters */}
<div
  className="
    status-badges 
    flex gap-4 mb-6 
    overflow-x-auto 
    scrollbar-hide 
    sm:flex-wrap sm:justify-start
    text-lg sm:text-xl
  "
>
  <div className={badgeClass("All")} onClick={() => setStatusFilter("All")}>
    <List className="h-5 w-5" /> All
  </div>

  <div
    className={badgeClass("Watching")}
    onClick={() => setStatusFilter("Watching")}
  >
    <Clock className="h-5 w-5" />{" "}
    {type === "manga" || type === "books" ? "Reading" : "Watching"}
  </div>

  <div
    className={badgeClass("Upcoming")}
    onClick={() => setStatusFilter("Upcoming")}
  >
    <ListStart className="h-5 w-5" />{" "}
    {type === "manga" || type === "books" ? "To Read" : "Upcoming"}
  </div>

  <div
    className={badgeClass("Completed")}
    onClick={() => setStatusFilter("Completed")}
  >
    <SquareCheck className="h-5 w-5" /> Completed
  </div>
</div>


      {/* List */}
<div className="movies grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4">
  {currentItems.length === 0 ? (
    <p className="text-gray-400 mt-20 col-span-full text-center">
      No items found.
    </p>
  ) : (
    currentItems.map((item) => (
      <Card
        key={item.id}
        item={item}
        onSetStatus={(id, status) => updateItemStatus(type, id, status)}
        onToggleFavourite={(id) => toggleFavourite(type, id)}
      />
    ))
  )}

      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-3 py-1 rounded ${
                i + 1 === currentPage
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {isAddModalOpen && (
        <AddModal type={type} handleClose={handleClose} handleAddItem={handleAddItem} />
      )}
    </div>
  );
};

export default Content;
