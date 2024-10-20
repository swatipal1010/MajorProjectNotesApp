import React, { useState } from "react";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [subject, setSubject] = useState("");  
  const [tags, setTags] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file || !fileName || !subject) {
      alert("Please upload a file, provide a file name, and specify the subject.");
      return;
    }
    // Handle file upload logic here (e.g., send data to backend)
    console.log({ file, fileName, subject, tags });
    alert("File uploaded successfully!");
  };

  return (
    <div
      className="h-heightWithoutNavbar flex items-center justify-center"
      style={{
        backgroundImage: "url('/img/bg2.png')", // Path to the background image
        backgroundSize: "cover",  // Ensures the image covers the entire page
        backgroundPosition: "center",  // Centers the image
        height: "100vh", // Full height of the viewport
      }}
    >
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Upload Your Note</h2>

        {/* File Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fileUpload">
            Upload File
          </label>
          <input
            id="fileUpload"
            type="file"
            accept=".pdf,.docx,.txt,.ppt,.pptx"  
            onChange={handleFileChange}
            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* File Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fileName">
            File Name
          </label>
          <input
            id="fileName"
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Enter the name of the file"
            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Subject Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
            Subject
          </label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter the subject of the file"
            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Tags Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
            Tags (optional)
          </label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Add tags separated by commas (e.g. Math, Algorithms)"
            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default Upload;
