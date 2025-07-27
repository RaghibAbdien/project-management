import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, DollarSign } from "lucide-react"

interface Project {
  id: string
  title: string
  client: string
  status: string
  priority: string
  createdAt: string
  estimatedValue: string
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "submitted":
        return "bg-blue-100 text-blue-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{project.title}</h3>
              <p className="text-gray-600">{project.client}</p>
            </div>
            <div className="flex space-x-2">
              <Badge variant={getPriorityColor(project.priority)}>{project.priority}</Badge>
              <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
            </div>
          </div>

          {/* Details */}
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{project.createdAt}</span>
            </div>
            <div className="flex items-center space-x-1">
              <DollarSign className="h-4 w-4" />
              <span>{project.estimatedValue}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              Edit
            </Button>
            <Button size="sm" className="flex-1">
              {project.status === "draft" ? "Submit" : "View"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
