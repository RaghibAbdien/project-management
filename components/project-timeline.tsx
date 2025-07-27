import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertCircle, XCircle } from "lucide-react"

export function ProjectTimeline() {
  const projects = [
    {
      id: "PRJ-001",
      title: "Website Redesign",
      client: "Tech Corp",
      status: "completed",
      phase: "Done",
      startDate: "2023-12-01",
      endDate: "2024-01-10",
      progress: 100,
    },
    {
      id: "PRJ-002",
      title: "Mobile App Development",
      client: "StartupXYZ",
      status: "in_progress",
      phase: "Development",
      startDate: "2024-01-05",
      endDate: "2024-03-15",
      progress: 65,
    },
    {
      id: "PRJ-003",
      title: "E-commerce Platform",
      client: "RetailCorp",
      status: "scheduled",
      phase: "Planning",
      startDate: "2024-01-22",
      endDate: "2024-04-30",
      progress: 0,
    },
    {
      id: "PRJ-004",
      title: "CRM Integration",
      client: "SalesCorp",
      status: "pending_approval",
      phase: "Approval",
      startDate: "TBD",
      endDate: "TBD",
      progress: 0,
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "in_progress":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "scheduled":
        return <AlertCircle className="h-5 w-5 text-orange-500" />
      case "pending_approval":
        return <XCircle className="h-5 w-5 text-gray-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "scheduled":
        return "bg-orange-100 text-orange-800"
      case "pending_approval":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={project.id} className="relative">
              {/* Timeline Line */}
              {index < projects.length - 1 && <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200" />}

              <div className="flex items-start space-x-4">
                {/* Status Icon */}
                <div className="flex-shrink-0 w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center">
                  {getStatusIcon(project.status)}
                </div>

                {/* Project Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-lg">{project.title}</h4>
                      <p className="text-gray-600">{project.client}</p>
                    </div>
                    <Badge className={getStatusColor(project.status)}>{project.phase}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-3">
                    <div>
                      <span className="font-medium">Start:</span> {project.startDate}
                    </div>
                    <div>
                      <span className="font-medium">End:</span> {project.endDate}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {project.progress > 0 && (
                    <div className="space-y-1">
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
