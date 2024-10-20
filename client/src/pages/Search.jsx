import React, { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("fileName"); // Default search by fileName
  const [searchResults, setSearchResults] = useState([]);
  const [searchStatus, setSearchStatus] = useState("");

  const user = useSelector((state) => state.user.userData);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.get("http://localhost:6969/notes/search", {
        params: {
          query: searchQuery,
          type: searchType, // Send the selected search type (fileName, subject, or tags)
        },
      });

      if (result.data.data.length > 0) {
        setSearchResults(result.data.data);
        setSearchStatus("Found");
      } else {
        setSearchResults([]);
        setSearchStatus("Not-Found");
      }
    } catch (error) {
      console.log("Error Fetching Notes: ", error);
    }
  };

  const showPDF = async (file) => {
    window.open(`http://localhost:6969/files/${file}`, "_blank", "noreferrer");
  };

  return (
    <div
      className="h-heightWithoutNavbar flex flex-col items-center justify-start p-4"
      style={{
        backgroundImage: `url('/img/bg2.png')`, // Add background image
        backgroundSize: 'cover', // Cover the entire background
        backgroundPosition: 'center', // Center the image
      }}
    >
      {/* Center the search bar */}
      <div className="flex w-full items-center justify-center mt-24"> {/* Adjust mt-24 to move the bar vertically */}
        <form className="w-full max-w-[700px] rounded-xl border border-black bg-[#374151] p-4" onSubmit={handleSearch}>
          <div className="flex items-center justify-between">
            {/* Search icon */}
            <FaSearch className="text-2xl text-white" />
            {/* Input for search query */}
            <input
              type="search"
              placeholder="Search by file name, subject, or tags"
              className="ml-3 w-full bg-[#374151] text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* Dropdown to select search type */}
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="ml-3 rounded-md border border-gray-300 bg-white p-2 text-sm"
            >
              <option value="fileName">File Name</option>
              <option value="subject">Subject</option>
              <option value="tags">Tags</option>
            </select>
            {/* Search button */}
            <button
              type="submit"
              className="ml-4 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Search results */}
      <div className="mt-5 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {searchStatus === "Found" &&
          searchResults.length > 0 &&
          searchResults.map((note) => (
            <div
              key={note._id}
              className="flex w-full max-w-[300px] flex-wrap-reverse items-center justify-between rounded-xl bg-[#374151] px-3 py-2 text-white shadow-lg"
            >
              <p className="mt-2 text-sm">
                <span className="font-bold">File name: </span>
                <span>{note.fileName}</span>
              </p>
              <p className="mt-2 text-sm">
                <span className="font-bold">Subject: </span>
                <span>{note.subject}</span>
              </p>
              <p className="mt-2 text-sm">
                <span className="font-bold">Tags: </span>
                <span>{note.tags.join(", ")}</span>
              </p>

              <button
                className="mt-4 rounded-xl bg-blue-500 px-4 py-1 font-bold hover:bg-blue-600"
                onClick={() => showPDF(note.file)}
              >
                Show PDF
              </button>
            </div>
          ))}

        {searchStatus === "Not-Found" && (
          <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
            No Notes Found
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
