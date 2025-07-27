"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Clock, MapPin, Camera, Upload, Calendar } from "lucide-react"

export function TechnicianDashboard() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const assignedProjects = [
    {
      id: "PRJ-005",
      title: "CRM System Development",
      client: "BusinessCorp",
      status: "in_progress",
      priority: "high",
      startDate: "2024-01-10",
      dueDate: "2024-03-15",
      progress: 65,
      location: "Client Office",
      supervisor: "Mike Johnson",
    },
    {
      id: "PRJ-006",
      title: "Website Maintenance",
      client: "TechStart",
      status: "scheduled",
      priority: "medium",
      startDate: "2024-01-20",
      dueDate: "2024-02-10",
      progress: 0,
      location: "Remote",
      supervisor: "Sarah Wilson",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Mobile-First Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">My Projects</h1>
            <p className="text-sm text-gray-600">John Doe - Technician</p>
          </div>
          <Button size="sm">
            <CheckCircle className="h-4 w-4 mr-2" />
            Check In
          </Button>
        </div>
      </div>

      {/* Quick Stats - Mobile Optimized */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">2</p>
                <p className="text-sm text-gray-600">Active Projects</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">8</p>
                <p className="text-sm text-gray-600">Hours Today</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="px-4">
        <Tabs defaultValue="projects" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-4">
            {assignedProjects.map((project) => (
              <Card key={project.id} className="w-full">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {/* Project Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{project.title}</h3>
                        <p className="text-gray-600 text-sm">{project.client}</p>
                      </div>
                      <Badge variant={project.status === "in_progress" ? "default" : "secondary"}>
                        {project.status.replace("_", " ")}
                      </Badge>
                    </div>

                    {/* Progress Bar */}
                    {project.status === "in_progress" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Project Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>Due: {project.dueDate}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{project.location}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      {project.status === "in_progress" ? (
                        <>
                          <Button size="sm" className="flex-1">
                            Update Progress
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" className="flex-1">
                          Start Project
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Daily Attendance</CardTitle>
                <CardDescription>Mark your attendance and working hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Check In Time</Label>
                    <Input type="time" defaultValue="09:00" />
                  </div>
                  <div className="space-y-2">
                    <Label>Check Out Time</Label>
                    <Input type="time" defaultValue="17:00" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="client">Client Site</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea placeholder="Any additional notes about your work today..." rows={3} />
                </div>

                <Button className="w-full">Submit Attendance</Button>
              </CardContent>
            </Card>

            {/* Recent Attendance */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { date: "2024-01-16", checkIn: "09:00", checkOut: "17:30", hours: "8.5", location: "Office" },
                    { date: "2024-01-15", checkIn: "08:45", checkOut: "17:15", hours: "8.5", location: "Client Site" },
                    { date: "2024-01-14", checkIn: "09:15", checkOut: "17:45", hours: "8.5", location: "Remote" },
                  ].map((record, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                    >
                      <div>
                        <p className="font-medium">{record.date}</p>
                        <p className="text-sm text-gray-600">{record.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{record.hours}h</p>
                        <p className="text-sm text-gray-600">
                          {record.checkIn} - {record.checkOut}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Submit Progress Report</CardTitle>
                <CardDescription>Update project progress and submit reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Project</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose project" />
                    </SelectTrigger>
                    <SelectContent>
                      {assignedProjects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Progress Percentage</Label>
                  <Input type="number" placeholder="0-100" min="0" max="100" />
                </div>

                <div className="space-y-2">
                  <Label>Work Completed</Label>
                  <Textarea placeholder="Describe what work was completed today..." rows={3} />
                </div>

                <div className="space-y-2">
                  <Label>Issues/Blockers</Label>
                  <Textarea placeholder="Any issues or blockers encountered..." rows={2} />
                </div>

                <div className="space-y-2">
                  <Label>Attach Photos/Files</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Tap to upload photos or files</p>
                  </div>
                </div>

                <Button className="w-full">Submit Report</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
