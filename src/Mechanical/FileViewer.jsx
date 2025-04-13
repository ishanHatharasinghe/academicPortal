import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Download,
  ChevronLeft,
  Star,
  Share2,
  Printer,
  Bookmark
} from "lucide-react";

const API_KEY = "AIzaSyAQv21CGk1xmvrPjHxHlW8KGMit6VXwiA4";

const FileViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fileDetails, setFileDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFileDetails = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/drive/v3/files/${id}?key=${API_KEY}&fields=id,name,mimeType,modifiedTime,size,owners`
        );
        const data = await response.json();

        setFileDetails({
          name: data.name,
          type: data.mimeType.split(".").pop().toUpperCase(),
          size: data.size ? `${Math.round(data.size / 1024)} KB` : "N/A",
          modified: new Date(data.modifiedTime).toLocaleDateString(),
          owner: data.owners?.[0]?.displayName || "Unknown"
        });
      } catch (error) {
        console.error("Error fetching file details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFileDetails();
  }, [id]);

  const previewUrl = `https://drive.google.com/file/d/${id}/preview`;
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${id}`;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-indigo-400 hover:text-indigo-300"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
          {fileDetails && (
            <h2 className="text-xl font-semibold text-gray-200 ml-2">
              {fileDetails.name}
            </h2>
          )}
        </div>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-700 text-gray-300 hover:text-white">
            <Star className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-700 text-gray-300 hover:text-white">
            <Share2 className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-700 text-gray-300 hover:text-white">
            <Printer className="h-5 w-5" />
          </button>
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded flex items-center space-x-1 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </a>
        </div>
      </div>

      {fileDetails && (
        <div className="flex space-x-8 text-sm text-gray-400 mb-3">
          <div>Type: {fileDetails.type}</div>
          <div>Size: {fileDetails.size}</div>
          <div>Modified: {fileDetails.modified}</div>
          <div>Owner: {fileDetails.owner}</div>
        </div>
      )}

      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
        <iframe
          src={previewUrl}
          title="Google Drive File Viewer"
          width="100%"
          height="800px"
          className="block"
          allow="autoplay"
        />
      </div>
    </div>
  );
};

export default FileViewer;
