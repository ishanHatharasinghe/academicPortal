// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import FolderView from "./Electrical/FolderView";
import FileViewer from "./Electrical/FileViewer";
import FolderViewme from "./Mechanical/FolderView";
import FileViewerme from "./Mechanical/FileViewer";
import Dashboard from "./Dashboard";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Electrical from "./Electrical";
import Mechanical from "./Mechanical";
import Welcome from "./Welcome";
import Login from "./Login";
import Signup from "./Signup";
import AuthWrapper from "./components/AuthWrapper";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [user, setUser] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleCollapse = () => setSidebarCollapsed(!sidebarCollapsed);

  // Listen for auth state changes
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="*"
          element={
            user ? (
              <div className="flex h-screen bg-gray-50">
                <Sidebar
                  isOpen={sidebarOpen}
                  toggleSidebar={toggleSidebar}
                  isCollapsed={sidebarCollapsed}
                  toggleCollapse={toggleCollapse}
                  user={user}
                />
                <div
                  className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
                    sidebarCollapsed ? "md:ml-20" : "md:ml-64"
                  }`}
                >
                  <Navbar toggleSidebar={toggleSidebar} user={user} />
                  <main className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 ">
                    <div className="max-w-full mx-auto">
                      <AuthWrapper>
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/electrical" element={<Electrical />} />
                          <Route path="/mechanical" element={<Mechanical />} />
                          <Route
                            path="/eedrive"
                            element={
                              <FolderView folderId="1jHAshLE4_a9_GLybe3z6mEdUBtq_WB2f" />
                            }
                          />
                          <Route
                            path="/eedrive1"
                            element={
                              <FolderView folderId="1OLyamOlsRwbXw_StS9DB1-_cDPUjb9CN" />
                            }
                          />
                          <Route
                            path="/eedrive2"
                            element={
                              <FolderView folderId="1nOX08RsVdTitniBl_v54wqF6Cy18jKqF" />
                            }
                          />
                          <Route
                            path="/eedrive3"
                            element={
                              <FolderView folderId="11cqC4ZoDVGG7UsGIA1yvbvRaUckXcgA5Q" />
                            }
                          />
                          <Route
                            path="/eedrive4"
                            element={
                              <FolderView folderId="1ElwJdCy5amKL6aehIoXmy9X-FprnSSy6" />
                            }
                          />

                          <Route
                            path="/medrive"
                            element={
                              <FolderViewme folderId="1j9SykHFH43tK8kXu88xLbS5b4Js2_5aT" />
                            }
                          />
                          <Route
                            path="/medrive1"
                            element={
                              <FolderViewme folderId="1p9WzWOJVMGwtCleBJPH-73bsS8b-aB1Y" />
                            }
                          />
                          <Route
                            path="/medrive2"
                            element={
                              <FolderViewme folderId="1iPTtnTv1UgA4Hwv63KDpgvxuXeD8MOz8" />
                            }
                          />

                          <Route path="/folder/:id" element={<FolderView />} />
                          <Route path="/file/:id" element={<FileViewer />} />
                          <Route
                            path="/folder/:id"
                            element={<FolderViewme />}
                          />
                          <Route path="/file/:id" element={<FileViewerme />} />
                        </Routes>
                      </AuthWrapper>
                    </div>
                  </main>
                </div>
              </div>
            ) : (
              <Welcome />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
