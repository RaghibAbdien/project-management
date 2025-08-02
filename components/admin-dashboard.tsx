"use client";

import { useState, useEffect } from "react";
import {
  getStatusColor,
  getPriorityColor,
  formatDate,
} from "@/utils/helper-sales";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  FileText,
  Users,
  Clock,
  Search,
  Filter,
  User,
  Phone,
  DollarSign,
} from "lucide-react";

export function AdminDashboard() {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [pendingProjects, setPendingProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    async function fetchPendingProjects() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Token tidak ditemukan. Silakan login.");
          return;
        }

        const res = await fetch("/api/admin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(
            error.message || "Gagal mengambil data pending project"
          );
        }

        const data = await res.json();
        setPendingProjects(data.projects);
      } catch (error: any) {
        console.error("Error fetching pending projects:", error);
        alert(`Gagal memuat  ${error.message}`);
      } finally {
        setLoading(false);
      }
    }

    fetchPendingProjects();
  }, []);

  const handleViewDetail = (project: any) => {
    setSelectedProject(project);
    setShowDetail(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
          <p className="text-gray-600">
            Review and register project submissions
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Review
                </p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Registered Today
                </p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <FileText className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Projects
                </p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  This Month Value
                </p>
                <p className="text-2xl font-bold text-gray-900">$340K</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1 w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search projects..." className="pl-10" />
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <Select>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="registered">Registered</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="w-full sm:w-auto bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="pending">Pending Projects</TabsTrigger>
          <TabsTrigger value="registered">Registered Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Pending Projects
              </h3>
            </div>

            {loading ? (
              <div className="p-8 text-center text-gray-500">
                Memuat data...
              </div>
            ) : pendingProjects.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Tidak ada proyek pending.
              </div>
            ) : (
              <>
                {/* Mobile Card View */}
                <div className="block sm:hidden">
                  {pendingProjects.map((project) => (
                    <div
                      key={project.id}
                      className="border-b border-gray-200 p-4"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {project.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {project.client}
                            </p>
                            <p className="text-xs text-gray-500">
                              {project.id}
                            </p>
                          </div>
                          <Badge
                            variant={
                              project.priority === "high"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {project.priority}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-medium text-gray-600">
                              Sales:
                            </span>
                            <p className="text-gray-900">
                              {project.salesPerson}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">
                              Value:
                            </span>
                            <p className="text-gray-900">
                              {project.estimatedValue}
                            </p>
                          </div>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium text-gray-600">
                            Submitted:
                          </span>
                          <span className="text-gray-900 ml-1">
                            {project.submittedAt}
                          </span>
                        </div>
                        <div className="flex space-x-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-transparent"
                          >
                            Review
                          </Button>
                          <Button size="sm" className="flex-1">
                            Register
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Project
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Client
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sales Person
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Priority
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Value
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Submitted
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pendingProjects.map((project) => (
                        <tr key={project.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {project.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                {project.id}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {project.client}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {project.salesPerson}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge
                              variant={
                                project.priority === "high"
                                  ? "destructive"
                                  : "secondary"
                              }
                            >
                              {project.priority}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {project.estimatedValue}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {project.submittedAt}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                              <Button
                                onClick={() => handleViewDetail(project)}
                                variant="outline"
                                size="sm"
                              >
                                Review
                              </Button>
                              <Button size="sm">Register</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </TabsContent>

        {/* Tab Registered Projects */}
        <TabsContent value="registered" className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Registered Projects
              </h3>
            </div>
            <div className="p-8 text-center text-gray-500">
              Daftar proyek yang telah diregistrasi akan muncul di sini.
            </div>
          </div>
        </TabsContent>
      </Tabs>
      {/* Modal Detail */}
      {showDetail && (
        <Dialog open={showDetail} onOpenChange={setShowDetail}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <DialogTitle className="text-xl font-semibold mb-2">
                    {selectedProject.title}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground">
                    ID: {selectedProject.id}
                  </DialogDescription>
                </div>
                <div className="flex gap-2">
                  <Badge className={getPriorityColor(selectedProject.priority)}>
                    {selectedProject.priority}
                  </Badge>
                  <Badge className={getStatusColor(selectedProject.status)}>
                    {selectedProject.status}
                  </Badge>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="font-medium mb-2">Deskripsi</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              <Separator />

              {/* Client Information */}
              <div className="grid gap-4">
                <h3 className="font-medium">Informasi Klien</h3>
                <div className="grid gap-3">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">
                        {selectedProject.client}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Nama Klien
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">
                        {selectedProject.contact}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Kontak Person
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Financial Information */}
              <div className="grid gap-4">
                <h3 className="font-medium">Informasi Keuangan</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">
                        {selectedProject.estimatedValue}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Estimasi Nilai
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">
                        ${selectedProject.budget}
                      </p>
                      <p className="text-xs text-muted-foreground">Budget</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Timeline Information */}
              <div className="grid gap-4">
                <h3 className="font-medium">Timeline Proyek</h3>
                <div className="grid gap-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">
                        {formatDate(selectedProject.startDate)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Tanggal Mulai
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">
                        {formatDate(selectedProject.endDate)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Tanggal Selesai
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">
                        {formatDate(selectedProject.submittedAt)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Tanggal Dibuat
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
