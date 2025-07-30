"use client";

import { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

export function SalesDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Ambil data dari API saat komponen pertama kali dimuat
  useEffect(() => {
    async function fetchProjects() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Token tidak ditemukan. Silakan login.");
          return;
        }

        const res = await fetch("/api/sales", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || "Gagal mengambil data");
        }

        const data = await res.json();
        setProjects(data.projects);
      } catch (error: any) {
        console.error("Error fetching projects:", error);
        alert(`Gagal memuat data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  async function handleDummySubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const customerName = formData.get("customer_name") as string;
    const contactPerson = formData.get("contact_person") as string;
    const projectTitle = formData.get("project_title") as string;
    const projectDescription = formData.get("project_description") as string;
    const startDate = formData.get("project_start_date") as string;
    const endDate = formData.get("project_end_date") as string;
    const budgetStr = formData.get("budget") as string;
    const priority = formData.get("priority") as string;

    if (
      !customerName ||
      !contactPerson ||
      !projectTitle ||
      !projectDescription ||
      !startDate ||
      !endDate ||
      !budgetStr ||
      !priority
    ) {
      toast({
        title: "Field kosong",
        description: "Semua field wajib diisi.",
        variant: "destructive",
      });
      return;
    }

    const budget = parseFloat(budgetStr);
    if (isNaN(budget)) {
      toast({
        title: "Budget tidak valid",
        description: "Budget harus berupa angka.",
        variant: "destructive",
      });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Belum login",
        description: "Silakan login terlebih dahulu.",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await fetch("/api/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          customerName,
          contactPerson,
          projectTitle,
          projectDescription,
          startDate,
          endDate,
          budget,
          priority,
        }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        toast({
          title: "Gagal menyimpan",
          description: message || "Terjadi kesalahan saat menyimpan data.",
          variant: "destructive",
        });
        return;
      }

      const result = await res.json();

      // Tampilkan toast sukses
      toast({
        title: "Berhasil!",
        description: "Project lead berhasil disimpan dan dikirim ke admin.",
        variant: "default",
      });

      // Reset form dan tutup modal
      setShowForm(false);

      // Opsional: refresh daftar proyek (jika Anda sudah implementasi fetch)
      // refreshProjects();
    } catch (error: any) {
      console.error("Terjadi kesalahan:", error);
      toast({
        title: "Error",
        description: "Gagal menyimpan data. Cek koneksi atau coba lagi.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Sales Dashboard</h2>
          <p className="text-gray-600">Manage project leads and submissions</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Project Lead
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Draft Projects
                </p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <div className="h-6 w-6 bg-yellow-500 rounded" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Submitted</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="h-6 w-6 bg-blue-500 rounded" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">$180K</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="h-6 w-6 bg-green-500 rounded" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Conversion Rate
                </p>
                <p className="text-2xl font-bold text-gray-900">68%</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <div className="h-6 w-6 bg-purple-500 rounded" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
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
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
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

      {/* Projects Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">Memuat data...</div>
        ) : (
          <>
            {/* Mobile Card View */}
            <div className="block lg:hidden">
              {projects.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  Tidak ada project ditemukan
                </div>
              ) : (
                projects.map((project) => (
                  <div
                    key={project.id}
                    className="border-b border-gray-200 p-4"
                  >
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
                          <div className="flex flex-col space-y-1">
                            <Badge
                              className={
                                project.status === "Draft"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : project.status === "submitted"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                              }
                            >
                              {project.status}
                            </Badge>
                            <Badge
                              variant={
                                project.priority === "high"
                                  ? "destructive"
                                  : project.priority === "medium"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {project.priority}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-medium text-gray-600">
                              Value:
                            </span>
                            <p className="text-gray-900">
                              {project.estimatedValue}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">
                              Created:
                            </span>
                            <p className="text-gray-900">{project.createdAt}</p>
                          </div>
                        </div>

                        <div className="flex space-x-2 pt-2">
                          {project.status === "draft" ? (
                            <Button size="sm" className="flex-1">
                              Submit
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 bg-transparent"
                            >
                              View
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
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
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projects.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        Tidak ada data
                      </td>
                    </tr>
                  ) : (
                    projects.map((project) => (
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
                          <Badge
                            className={
                              project.status === "Draft"
                                ? "bg-yellow-100 text-yellow-800"
                                : project.status === "submitted"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {project.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            variant={
                              project.priority === "high"
                                ? "destructive"
                                : project.priority === "medium"
                                ? "default"
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
                          {project.createdAt}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </Button>
                            {project.status === "draft" ? (
                              <Button size="sm" className="ml-2">
                                Submit
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                className="ml-2 bg-transparent"
                              >
                                View
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* New Project Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleDummySubmit}>
              <CardHeader>
                <CardTitle>New Project Lead</CardTitle>
                <CardDescription>
                  Enter basic project information to create a new lead
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client">Client Name</Label>
                    <Input
                      id="client"
                      name="customer_name"
                      placeholder="Enter client name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact Person</Label>
                    <Input
                      id="contact"
                      name="contact_person"
                      placeholder="Contact person"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    name="project_title"
                    placeholder="Enter project title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    name="project_description"
                    placeholder="Brief description of the project"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Estimated Budget</Label>
                    <Input id="budget" name="budget" placeholder="$0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select name="priority">
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start_date">Start Date</Label>
                    <Input
                      type="date"
                      id="start_date"
                      name="project_start_date"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end_date">End Date</Label>
                    <Input type="date" id="end_date" name="project_end_date" />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Submit to Admin</Button>
                </div>
              </CardContent>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
