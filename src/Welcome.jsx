import { Link } from "react-router-dom";
import {
  BookOpen,
  Code,
  Cpu,
  Database,
  Server,
  LayoutDashboard
} from "lucide-react";

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col justify-center items-center p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full border border-gray-700">
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-600 p-3 rounded-full">
            <LayoutDashboard className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Engineering Portal
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Access all academic resources in one place
        </p>

        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-gray-700 p-3 rounded-lg flex flex-col items-center">
            <BookOpen className="h-6 w-6 text-indigo-400 mb-1" />
            <span className="text-xs text-gray-300">Materials</span>
          </div>
          <div className="bg-gray-700 p-3 rounded-lg flex flex-col items-center">
            <Code className="h-6 w-6 text-blue-400 mb-1" />
            <span className="text-xs text-gray-300">Code Labs</span>
          </div>
          <div className="bg-gray-700 p-3 rounded-lg flex flex-col items-center">
            <Cpu className="h-6 w-6 text-green-400 mb-1" />
            <span className="text-xs text-gray-300">Hardware</span>
          </div>
          <div className="bg-gray-700 p-3 rounded-lg flex flex-col items-center">
            <Database className="h-6 w-6 text-purple-400 mb-1" />
            <span className="text-xs text-gray-300">Databases</span>
          </div>
          <div className="bg-gray-700 p-3 rounded-lg flex flex-col items-center">
            <Server className="h-6 w-6 text-yellow-400 mb-1" />
            <span className="text-xs text-gray-300">Servers</span>
          </div>
          <div className="bg-gray-700 p-3 rounded-lg flex flex-col items-center">
            <div className="h-6 w-6 flex items-center justify-center text-pink-400 mb-1">
              +3
            </div>
            <span className="text-xs text-gray-300">More</span>
          </div>
        </div>

        <div className="space-y-4">
          <Link
            to="/login"
            className="block w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 px-4 rounded-lg text-center transition duration-200 shadow-lg"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="block w-full bg-gray-700 border border-gray-600 text-gray-200 hover:bg-gray-600 font-medium py-3 px-4 rounded-lg text-center transition duration-200"
          >
            Create Account
          </Link>
        </div>
      </div>

      <p className="text-gray-500 text-sm mt-8 text-center">
        For students of Higher National Diploma In Engineering
      </p>
    </div>
  );
};

export default Welcome;
