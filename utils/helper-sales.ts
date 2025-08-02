function getStatusColor(status: string) {
  switch (status) {
    case "Draft":
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    case "In Progress":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100"
    case "Completed":
      return "bg-green-100 text-green-800 hover:bg-green-100"
    case "On Hold":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
}

function getPriorityColor(priority: string) {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-800 hover:bg-red-100"
    case "Medium":
      return "bg-orange-100 text-orange-800 hover:bg-orange-100"
    case "Low":
      return "bg-green-100 text-green-800 hover:bg-green-100"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export { getPriorityColor, getStatusColor, formatDate }