"use client"

import { useLanguage } from "@/lib/language-context"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProtectedPage } from "@/components/auth/protected-page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockCourses } from "@/lib/mock-data"

export default function StudentsPage() {
  const { t } = useLanguage()

  // Mock student data
  const mockStudents = [
    { id: "1", name: "Sokha Khun", email: "sokha@email.com", enrolledCourses: 3, progress: 85, status: "active" },
    { id: "2", name: "Chhoy Rith", email: "chhoy@email.com", enrolledCourses: 2, progress: 72, status: "active" },
    { id: "3", name: "Mey Dina", email: "dina@email.com", enrolledCourses: 3, progress: 68, status: "active" },
    { id: "4", name: "Visal Chan", email: "visal@email.com", enrolledCourses: 1, progress: 45, status: "inactive" },
  ]

  const totalStudents = mockCourses.reduce((sum, course) => sum + course.students, 0)
  const activeStudents = mockStudents.filter((s) => s.status === "active").length

  return (
    <ProtectedPage requiredRoles={["educator"]}>
      <DashboardLayout>
        <div className="space-y-6 p-4 sm:p-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t("nav.students")}</h1>
            <p className="text-gray-600 mt-2">Manage and monitor your students</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{totalStudents}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{activeStudents}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-sm text-gray-600">Average Progress</p>
                <p className="text-3xl font-bold text-teal-600 mt-2">
                  {Math.round(mockStudents.reduce((sum, s) => sum + s.progress, 0) / mockStudents.length)}%
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Students Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Email</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Courses</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Progress</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockStudents.map((student) => (
                      <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 font-medium text-gray-900">{student.name}</td>
                        <td className="py-3 px-4 text-gray-600">{student.email}</td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-blue-600">{student.enrolledCourses}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-600 to-teal-600 h-2 rounded-full"
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-600">{student.progress}%</span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                              student.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {student.status === "active" ? "Active" : "Inactive"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedPage>
  )
}
