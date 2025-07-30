"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FolderOpen, LogOut } from "lucide-react";
import { SalesDashboard } from "@/components/sales-dashboard";
import { AdminDashboard } from "@/components/admin-dashboard";
import { ManagerDashboard } from "@/components/manager-dashboard";
import { SupervisorDashboard } from "@/components/supervisor-dashboard";
import { TechnicianDashboard } from "@/components/technician-dashboard";

type UserRole = "sales" | "admin" | "manager" | "supervisor" | "technician";

const roleConfig = {
  sales: {
    title: "Sales Dashboard",
    description: "Input and manage project leads",
    color: "bg-blue-500",
  },
  admin: {
    title: "Admin Dashboard",
    description: "Register and manage projects",
    color: "bg-purple-500",
  },
  manager: {
    title: "Manager Dashboard",
    description: "Review and approve projects",
    color: "bg-green-500",
  },
  supervisor: {
    title: "Supervisor Dashboard",
    description: "Schedule and monitor projects",
    color: "bg-orange-500",
  },
  technician: {
    title: "Technician Dashboard",
    description: "View assignments and submit updates",
    color: "bg-cyan-500",
  },
};

export default function Dashboard() {
  const [currentRole, setCurrentRole] = useState<UserRole>("sales");
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login"); // redirect kalau belum login
    } else {
      setChecking(false); // selesai pengecekan token
    }
  }, []);

  if (checking) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const renderDashboard = () => {
    switch (currentRole) {
      case "sales":
        return <SalesDashboard />;
      case "admin":
        return <AdminDashboard />;
      case "manager":
        return <ManagerDashboard />;
      case "supervisor":
        return <SupervisorDashboard />;
      case "technician":
        return <TechnicianDashboard />;
      default:
        return <SalesDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FolderOpen className="h-6 sm:h-8 w-6 sm:w-8 text-blue-600" />
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Project Management
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex bg-transparent"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="sm:hidden bg-transparent"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar - Role Selector */}
        <aside className="w-full lg:w-64 bg-white border-b lg:border-r lg:border-b-0 border-gray-200 lg:min-h-screen p-4 sm:p-6">
          <nav className="space-y-2">
            <div className="text-sm font-medium text-gray-500 mb-4">
              Switch Role
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
              {Object.entries(roleConfig).map(([role, config]) => (
                <button
                  key={role}
                  onClick={() => setCurrentRole(role as UserRole)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    currentRole === role
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full ${config.color}`} />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-sm lg:text-base truncate">
                      {config.title.replace(" Dashboard", "")}
                    </div>
                    <div className="text-xs text-gray-500 hidden lg:block">
                      {config.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6">{renderDashboard()}</main>
      </div>
    </div>
  );
}
