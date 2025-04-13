import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Folder,
  FileText,
  Grid,
  List,
  Search,
  Filter,
  SortAsc,
  MoreVertical,
  ChevronRight,
  Home
} from "lucide-react";

const API_KEY = "AIzaSyAQv21CGk1xmvrPjHxHlW8KGMit6VXwiA4";
const ROOT_FOLDER_ID = "1j9SykHFH43tK8kXu88xLbS5b4Js2_5aT";

const FolderView = ({ folderId }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const activeFolderId = id || folderId || ROOT_FOLDER_ID;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [folderPath, setFolderPath] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get("search");
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchFolderContents = async () => {
      setLoading(true);
      try {
        let url;
        if (searchTerm.trim()) {
          url = `https://www.googleapis.com/drive/v3/files?q=name contains '${searchTerm}' and '${activeFolderId}' in parents&key=${API_KEY}&fields=files(id,name,mimeType,modifiedTime,size,parents)`;
        } else {
          url = `https://www.googleapis.com/drive/v3/files?q='${activeFolderId}' in parents&key=${API_KEY}&fields=files(id,name,mimeType,modifiedTime,size,parents)`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setItems(data.files || []);

        // Build breadcrumb path
        const buildPath = async (currentId, path = []) => {
          if (currentId === ROOT_FOLDER_ID) {
            return [{ id: ROOT_FOLDER_ID, name: "My Documents" }, ...path];
          }

          const metaRes = await fetch(
            `https://www.googleapis.com/drive/v3/files/${currentId}?key=${API_KEY}&fields=id,name,parents`
          );
          const meta = await metaRes.json();
          const currentFolder = { id: meta.id, name: meta.name };
          const parentId = meta.parents?.[0] || ROOT_FOLDER_ID;

          return await buildPath(parentId, [currentFolder, ...path]);
        };

        const path = await buildPath(activeFolderId);
        setFolderPath(path);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFolderContents();
  }, [activeFolderId, searchTerm]);

  const getFileIcon = (mimeType) => {
    if (mimeType === "application/vnd.google-apps.folder") {
      return <Folder className="h-6 w-6 text-yellow-400" />;
    } else if (mimeType.includes("pdf")) {
      return <FileText className="h-6 w-6 text-red-400" />;
    } else if (mimeType.includes("document")) {
      return <FileText className="h-6 w-6 text-blue-400" />;
    } else if (mimeType.includes("spreadsheet")) {
      return <FileText className="h-6 w-6 text-green-400" />;
    } else if (mimeType.includes("presentation")) {
      return <FileText className="h-6 w-6 text-orange-400" />;
    } else if (mimeType.includes("image")) {
      return <FileText className="h-6 w-6 text-purple-400" />;
    } else {
      return <FileText className="h-6 w-6 text-gray-400" />;
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      navigate(`?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4 text-gray-100">
      <div className="space-y-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-100">Document Viewer</h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded ${
                viewMode === "grid" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              <Grid className="h-5 w-5 text-gray-300" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded ${
                viewMode === "list" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              <List className="h-5 w-5 text-gray-300" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 bg-gray-800 p-3 rounded-lg shadow-sm">
          <div className="flex items-center bg-gray-700 rounded-lg p-2 w-full sm:w-80">
            <Search className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search documents..."
              className="bg-transparent outline-none flex-1 text-sm text-gray-100 placeholder-gray-400"
              value={searchTerm}
              onChange={handleSearch}
              onKeyDown={handleSearchSubmit}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <Folder className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-200">
              {searchTerm ? "No search results found" : "This folder is empty"}
            </h3>
            <p className="text-sm text-gray-400">
              {searchTerm
                ? "Try a different search term"
                : "Upload files to get started"}
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <Link
                key={item.id}
                to={
                  item.mimeType === "application/vnd.google-apps.folder"
                    ? `/folder/${item.id}${
                        searchTerm
                          ? `?search=${encodeURIComponent(searchTerm)}`
                          : ""
                      }`
                    : `/file/${item.id}`
                }
                className="bg-gray-800 rounded-lg shadow-sm hover:shadow-lg transition p-4 flex flex-col items-center border border-gray-700 hover:border-gray-600"
              >
                <div className="mb-3 flex items-center justify-center h-16 w-16">
                  {getFileIcon(item.mimeType)}
                </div>
                <div className="text-center">
                  <div className="font-medium text-gray-100 break-words line-clamp-2">
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {item.modifiedTime
                      ? new Date(item.modifiedTime).toLocaleDateString()
                      : ""}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Modified
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-700 cursor-pointer"
                    onClick={() =>
                      navigate(
                        item.mimeType === "application/vnd.google-apps.folder"
                          ? `/folder/${item.id}${
                              searchTerm
                                ? `?search=${encodeURIComponent(searchTerm)}`
                                : ""
                            }`
                          : `/file/${item.id}`
                      )
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                      <div className="h-10 w-10 flex items-center justify-center">
                        {getFileIcon(item.mimeType)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-100">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-400">
                          {item.mimeType.split(".").pop()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {item.modifiedTime
                        ? new Date(item.modifiedTime).toLocaleDateString()
                        : ""}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {item.size ? `${Math.round(item.size / 1024)} KB` : ""}
                    </td>
                    <td className="px-6 py-4 text-right text-sm">
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-400 hover:text-gray-200"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FolderView;
