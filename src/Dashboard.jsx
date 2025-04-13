import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Award,
  FileText,
  Layers,
  Cpu,
  Battery,
  Zap,
  Building,
  NotebookText,
  Ruler,
  Settings,
  Users,
  Clock,
  ChevronRight,
  PlusCircle,
  Bell,
  Search,
  Menu
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 min-h-screen">
      <div className="px-6 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-6 backdrop-blur-sm border border-blue-800/20 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Welcome back !
              </h1>
              <p className="text-gray-300">
                Your engineering resources dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Discipline Navigation Cards */}
        <div>
          <h2 className="text-gray-100 text-lg font-semibold mb-4 flex items-center">
            <BookOpen className="mr-2 h-5 w-5 text-blue-400" />
            Explore Departments
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <NavCard
              title="Electrical"
              to="/electrical"
              icon={<Zap className="h-6 w-6 text-yellow-300" />}
              gradientFrom="from-yellow-600/20"
              gradientTo="to-amber-700/20"
              borderColor="border-yellow-500/30"
              glowColor="yellow"
              description="Power systems, electronics, and control systems"
            />
            <NavCard
              title="Mechanical"
              to="/mechanical"
              icon={<Settings className="h-6 w-6 text-red-400" />}
              gradientFrom="from-red-600/20"
              gradientTo="to-rose-700/20"
              borderColor="border-red-500/30"
              glowColor="red"
              description="Thermodynamics, materials, and manufacturing"
            />
            <NavCard
              title="Civil"
              to="/civil"
              icon={<Building className="h-6 w-6 text-emerald-400" />}
              gradientFrom="from-emerald-600/20"
              gradientTo="to-green-700/20"
              borderColor="border-emerald-500/30"
              glowColor="emerald"
              description="Structures, geotechnical, and environmental"
            />
            <NavCard
              title="QS"
              to="/qs"
              icon={<Ruler className="h-6 w-6 text-violet-400" />}
              gradientFrom="from-violet-600/20"
              gradientTo="to-indigo-700/20"
              borderColor="border-violet-500/30"
              glowColor="violet"
              description="Quantity surveying and cost management"
            />
          </div>
        </div>

        {/* Recent Resources */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-gray-100 text-lg font-semibold flex items-center">
              <Clock className="mr-2 h-5 w-5 text-purple-400" />
              Recent Resources
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            <ResourceCard
              title="Engineering Standards"
              to="/standards"
              icon={<FileText className="h-6 w-6 text-blue-400" />}
              borderColor="border-blue-500/30"
              gradientFrom="from-blue-800/20"
              gradientTo="to-blue-900/10"
              text="Access latest engineering standards and specifications."
              updated="Updated 2 days ago"
            />
            <ResourceCard
              title="Material Database"
              to="/materials"
              icon={<Layers className="h-6 w-6 text-amber-400" />}
              borderColor="border-amber-500/30"
              gradientFrom="from-amber-800/20"
              gradientTo="to-amber-900/10"
              text="Comprehensive database of material properties and applications."
              updated="Updated 1 week ago"
            />
            <ResourceCard
              title="Technical Documentation"
              to="/documentation"
              icon={<NotebookText className="h-6 w-6 text-teal-400" />}
              borderColor="border-teal-500/30"
              gradientFrom="from-teal-800/20"
              gradientTo="to-teal-900/10"
              text="Access technical guides and documentation resources."
              updated="Updated today"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ResourceCard = ({
  title,
  to,
  icon,
  borderColor,
  gradientFrom,
  gradientTo,
  text,
  updated
}) => (
  <Link
    to={to}
    className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-xl shadow-lg p-5 hover:bg-opacity-80 transition group border border-t-0 border-l-0 border-r-0 ${borderColor} backdrop-blur-sm`}
  >
    <div className="flex items-center space-x-3 mb-3">
      <div className="p-3 bg-gray-800/70 rounded-lg">{icon}</div>
      <h3 className="font-medium text-gray-100 group-hover:text-white transition-colors">
        {title}
      </h3>
    </div>
    <p className="text-sm text-gray-300 mb-3">{text}</p>
    <div className="flex justify-between items-center">
      <span className="text-xs text-gray-400">{updated}</span>
      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
    </div>
  </Link>
);

const NavCard = ({
  title,
  to,
  icon,
  borderColor,
  gradientFrom,
  gradientTo,
  description,
  glowColor
}) => (
  <Link
    to={to}
    className={`relative bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-xl shadow-lg p-5 hover:shadow-xl transition group border ${borderColor} backdrop-blur-sm overflow-hidden`}
  >
    <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity">
      {React.cloneElement(icon, { className: "h-40 w-40" })}
    </div>
    <div className="flex items-center mb-3">
      <div className={`p-3 bg-gray-800/70 rounded-lg shadow-md`}>{icon}</div>
    </div>
    <h3 className="text-gray-100 font-semibold group-hover:text-white mb-1">
      {title}
    </h3>
    {description && <p className="text-sm text-gray-300">{description}</p>}
  </Link>
);

const QuickLink = ({ title, icon, to }) => (
  <Link
    to={to}
    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition-colors group"
  >
    <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
      {icon}
    </div>
    <span className="text-sm text-gray-300 group-hover:text-white">
      {title}
    </span>
  </Link>
);

export default Dashboard;
