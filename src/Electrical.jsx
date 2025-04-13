// Electrical.js
import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Bell,
  Award,
  FileText,
  Layers,
  Cpu,
  Battery,
  Zap,
  Atom,
  NotebookText,
  FileSearch,
  FileCheck
} from "lucide-react";

const Electrical = () => {
  return (
    <div className="bg-gray-900 min-h-screen p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Atom className="h-8 w-8 text-purple-400" />
          <h1 className="text-2xl font-bold text-gray-100">
            Electrical & Electronics Engineering
          </h1>
        </div>
      </div>

      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-xl shadow-lg p-6 border border-purple-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-purple-200">
              Welcome to EEE Portal
            </h2>
            <p className="mb-4 text-gray-300">
              Access your circuit designs, power system analyses, and
              electronics projects.
            </p>
            <div className="flex items-center space-x-3">
              <Link
                to="/eedrive"
                className="bg-purple-600 text-white px-5 py-2 rounded-md font-medium text-sm hover:bg-purple-700 transition flex items-center space-x-2"
              >
                <NotebookText className="h-4 w-4" />
                <span>Lecture Notes</span>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 rounded-full bg-purple-800 bg-opacity-50 flex items-center justify-center">
              <Atom className="h-12 w-12 text-purple-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Year Quick Access Cards */}
      <div>
        <h2 className="text-gray-200 text-lg font-medium mb-4 flex items-center">
          <Award className="mr-2 h-5 w-5 text-purple-400" />
          Academic Resources by Year
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1st Year Card */}
          <Link
            to="/eedrive1"
            className="bg-gray-800 rounded-lg shadow-md p-5 hover:bg-gray-750 transition group border-b-2 border-blue-500"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-blue-900 bg-opacity-50 rounded-lg">
                <FileText className="h-5 w-5 text-blue-400" />
              </div>
              <h3 className="font-medium text-gray-200 group-hover:text-blue-400 transition-colors">
                1st Year Resources
              </h3>
            </div>
            <p className="text-sm text-gray-400">
              Complete lecture notes, past exam papers (2018-2024), and detailed
              marking schemes for foundation courses
            </p>
          </Link>

          {/* 2nd Year Card */}
          <Link
            to="/eedrive2"
            className="bg-gray-800 rounded-lg shadow-md p-5 hover:bg-gray-750 transition group border-b-2 border-green-500"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-green-900 bg-opacity-50 rounded-lg">
                <Layers className="h-5 w-5 text-green-400" />
              </div>
              <h3 className="font-medium text-gray-200 group-hover:text-green-400 transition-colors">
                2nd Year Resources
              </h3>
            </div>
            <p className="text-sm text-gray-400">
              Core subject materials, annotated past papers, examiner's
              comments, and model answers
            </p>
          </Link>

          {/* 3rd Year Card */}
          <Link
            to="/eedrive3"
            className="bg-gray-800 rounded-lg shadow-md p-5 hover:bg-gray-750 transition group border-b-2 border-purple-500"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-purple-900 bg-opacity-50 rounded-lg">
                <Cpu className="h-5 w-5 text-purple-400" />
              </div>
              <h3 className="font-medium text-gray-200 group-hover:text-purple-400 transition-colors">
                3rd Year Resources
              </h3>
            </div>
            <p className="text-sm text-gray-400">
              Specialized course materials, solved question banks, and grading
              rubrics for all technical papers
            </p>
          </Link>

          {/* 4th Year Card */}
          <Link
            to="/eedrive4"
            className="bg-gray-800 rounded-lg shadow-md p-5 hover:bg-gray-750 transition group border-b-2 border-amber-500"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-amber-900 bg-opacity-50 rounded-lg">
                <Battery className="h-5 w-5 text-amber-400" />
              </div>
              <h3 className="font-medium text-gray-200 group-hover:text-amber-400 transition-colors">
                4th Year Resources
              </h3>
            </div>
            <p className="text-sm text-gray-400">
              Final year project templates, thesis guidelines, and comprehensive
              exam archives with solutions
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Electrical;
