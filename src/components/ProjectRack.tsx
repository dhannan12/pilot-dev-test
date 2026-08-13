/**
 * ProjectRack — Team assignment tracking with Project Manager-only milestone editing
 *
 * Features: team member assignments, milestone management, role-based permissions, assignment tracking, project overview
 *
 * Ticket: SCRUM-736 | Branch: proto/SCRUM-733
 */

import { useState } from 'react'

interface TeamMember {
  id: string
  name: string
  role: string
  avatarColor: string
}

interface Assignment {
  id: string
  projectId: string
  memberId: string
  taskName: string
  hoursAllocated: number
}

interface Milestone {
  id: string
  projectId: string
  title: string
  dueDate: string
  status: 'pending' | 'in-progress' | 'completed'
}

interface Project {
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
}

const MOCK_PROJECTS: Project[] = [
  { id: 'p1', name: 'Website Redesign', description: 'Complete overhaul of company website', startDate: '2026-07-01', endDate: '2026-09-30' },
  { id: 'p2', name: 'Mobile App Launch', description: 'Launch iOS and Android applications', startDate: '2026-08-01', endDate: '2026-12-15' },
  { id: 'p3', name: 'API Integration', description: 'Integrate third-party payment APIs', startDate: '2026-06-15', endDate: '2026-08-30' },
  { id: 'p4', name: 'Database Migration', description: 'Migrate from SQL to NoSQL database', startDate: '2026-09-01', endDate: '2026-11-30' },
  { id: 'p5', name: 'Security Audit', description: 'Complete security review and fixes', startDate: '2026-08-15', endDate: '2026-10-31' },
]

const MOCK_TEAM_MEMBERS: TeamMember[] = [
  { id: 't1', name: 'Alice Johnson', role: 'Senior Developer', avatarColor: 'bg-blue-500' },
  { id: 't2', name: 'Bob Smith', role: 'Designer', avatarColor: 'bg-green-500' },
  { id: 't3', name: 'Carol Williams', role: 'QA Engineer', avatarColor: 'bg-purple-500' },
  { id: 't4', name: 'David Brown', role: 'DevOps Engineer', avatarColor: 'bg-orange-500' },
  { id: 't5', name: 'Eva Martinez', role: 'Product Manager', avatarColor: 'bg-pink-500' },
  { id: 't6', name: 'Frank Chen', role: 'Backend Developer', avatarColor: 'bg-indigo-500' },
  { id: 't7', name: 'Grace Lee', role: 'Frontend Developer', avatarColor: 'bg-red-500' },
]

const MOCK_ASSIGNMENTS: Assignment[] = [
  { id: 'a1', projectId: 'p1', memberId: 't1', taskName: 'Frontend Development', hoursAllocated: 120 },
  { id: 'a2', projectId: 'p1', memberId: 't2', taskName: 'UI/UX Design', hoursAllocated: 80 },
  { id: 'a3', projectId: 'p2', memberId: 't6', taskName: 'API Development', hoursAllocated: 100 },
  { id: 'a4', projectId: 'p2', memberId: 't7', taskName: 'Mobile UI', hoursAllocated: 90 },
  { id: 'a5', projectId: 'p3', memberId: 't1', taskName: 'Payment Gateway', hoursAllocated: 60 },
  { id: 'a6', projectId: 'p3', memberId: 't4', taskName: 'Infrastructure Setup', hoursAllocated: 40 },
  { id: 'a7', projectId: 'p4', memberId: 't6', taskName: 'Data Migration', hoursAllocated: 150 },
  { id: 'a8', projectId: 'p5', memberId: 't3', taskName: 'Security Testing', hoursAllocated: 70 },
]

const MOCK_MILESTONES: Milestone[] = [
  { id: 'm1', projectId: 'p1', title: 'Design Completion', dueDate: '2026-07-30', status: 'completed' },
  { id: 'm2', projectId: 'p1', title: 'Frontend MVP', dueDate: '2026-08-30', status: 'in-progress' },
  { id: 'm3', projectId: 'p2', title: 'Alpha Release', dueDate: '2026-10-15', status: 'pending' },
  { id: 'm4', projectId: 'p3', title: 'Payment Testing', dueDate: '2026-08-15', status: 'in-progress' },
  { id: 'm5', projectId: 'p4', title: 'Migration Phase 1', dueDate: '2026-09-30', status: 'pending' },
  { id: 'm6', projectId: 'p5', title: 'Vulnerability Assessment', dueDate: '2026-09-15', status: 'pending' },
]

export default function ProjectRack() {
  const [selectedProject, setSelectedProject] = useState<string>(MOCK_PROJECTS[0].id)
  const [isProjectManager, setIsProjectManager] = useState<boolean>(true)
  const [editingMilestone, setEditingMilestone] = useState<string | null>(null)
  const [milestones, setMilestones] = useState<Milestone[]>(MOCK_MILESTONES)
  const [newMilestoneTitle, setNewMilestoneTitle] = useState<string>('')
  const [newMilestoneDueDate, setNewMilestoneDueDate] = useState<string>('')
  const [showAddMilestone, setShowAddMilestone] = useState<boolean>(false)

  const project = MOCK_PROJECTS.find(p => p.id === selectedProject)
  const projectAssignments = MOCK_ASSIGNMENTS.filter(a => a.projectId === selectedProject)
  const projectMilestones = milestones.filter(m => m.projectId === selectedProject)

  const handleAddMilestone = () => {
    if (!isProjectManager || !newMilestoneTitle || !newMilestoneDueDate) return

    const newMilestone: Milestone = {
      id: `m${Date.now()}`,
      projectId: selectedProject,
      title: newMilestoneTitle,
      dueDate: newMilestoneDueDate,
      status: 'pending'
    }

    setMilestones([...milestones, newMilestone])
    setNewMilestoneTitle('')
    setNewMilestoneDueDate('')
    setShowAddMilestone(false)
  }

  const handleEditMilestone = (milestoneId: string, newTitle: string) => {
    if (!isProjectManager) return

    setMilestones(milestones.map(m => 
      m.id === milestoneId ? { ...m, title: newTitle } : m
    ))
    setEditingMilestone(null)
  }

  const handleDeleteMilestone = (milestoneId: string) => {
    if (!isProjectManager) return
    setMilestones(milestones.filter(m => m.id !== milestoneId))
  }

  const handleStatusChange = (milestoneId: string, newStatus: 'pending' | 'in-progress' | 'completed') => {
    if (!isProjectManager) return
    setMilestones(milestones.map(m => 
      m.id === milestoneId ? { ...m, status: newStatus } : m
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getMemberById = (id: string) => MOCK_TEAM_MEMBERS.find(m => m.id === id)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Project Rack</h1>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Role:</span>
              <button
                onClick={() => setIsProjectManager(!isProjectManager)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isProjectManager 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {isProjectManager ? 'Project Manager' : 'Team Member'}
              </button>
            </div>
          </div>

          {/* Project Selector */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {MOCK_PROJECTS.map((proj) => (
              <button
                key={proj.id}
                onClick={() => setSelectedProject(proj.id)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedProject === proj.id
                    ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-500'
                    : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
                }`}
              >
                {proj.name}
              </button>
            ))}
          </div>
        </div>

        {/* Project Details */}
        {project && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{project.name}</h2>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex gap-6 text-sm text-gray-500">
              <div>
                <span className="font-medium">Start:</span> {project.startDate}
              </div>
              <div>
                <span className="font-medium">End:</span> {project.endDate}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Team Assignments */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Team Assignments</h3>
            <div className="space-y-3">
              {projectAssignments.length > 0 ? (
                projectAssignments.map((assignment) => {
                  const member = getMemberById(assignment.memberId)
                  return member ? (
                    <div key={assignment.id} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-full ${member.avatarColor} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                          {member.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{member.name}</h4>
                          <p className="text-sm text-gray-500">{member.role}</p>
                          <div className="mt-2">
                            <p className="text-sm font-medium text-gray-700">{assignment.taskName}</p>
                            <p className="text-xs text-gray-500 mt-1">{assignment.hoursAllocated} hours allocated</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null
                })
              ) : (
                <p className="text-gray-500 text-center py-8">No team assignments yet</p>
              )}
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Project Milestones</h3>
              {isProjectManager && (
                <button
                  onClick={() => setShowAddMilestone(!showAddMilestone)}
                  className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  + Add
                </button>
              )}
            </div>

            {/* Add Milestone Form */}
            {showAddMilestone && isProjectManager && (
              <div className="mb-4 p-4 border border-indigo-200 rounded-lg bg-indigo-50">
                <input
                  type="text"
                  placeholder="Milestone title"
                  value={newMilestoneTitle}
                  onChange={(e) => setNewMilestoneTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="date"
                  value={newMilestoneDueDate}
                  onChange={(e) => setNewMilestoneDueDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleAddMilestone}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setShowAddMilestone(false)
                      setNewMilestoneTitle('')
                      setNewMilestoneDueDate('')
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Permission Notice */}
            {!isProjectManager && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  ⓘ Only Project Managers can create or edit milestones
                </p>
              </div>
            )}

            <div className="space-y-3">
              {projectMilestones.length > 0 ? (
                projectMilestones.map((milestone) => (
                  <div key={milestone.id} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
                    {editingMilestone === milestone.id && isProjectManager ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          defaultValue={milestone.title}
                          onBlur={(e) => handleEditMilestone(milestone.id, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleEditMilestone(milestone.id, e.currentTarget.value)
                            } else if (e.key === 'Escape') {
                              setEditingMilestone(null)
                            }
                          }}
                          autoFocus
                          className="w-full px-3 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
                          {isProjectManager && (
                            <div className="flex gap-1">
                              <button
                                onClick={() => setEditingMilestone(milestone.id)}
                                className="text-indigo-600 hover:text-indigo-800 text-sm px-2"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteMilestone(milestone.id)}
                                className="text-red-600 hover:text-red-800 text-sm px-2"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500">Due: {milestone.dueDate}</span>
                          {isProjectManager ? (
                            <select
                              value={milestone.status}
                              onChange={(e) => handleStatusChange(milestone.id, e.target.value as 'pending' | 'in-progress' | 'completed')}
                              className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(milestone.status)}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="in-progress">In Progress</option>
                              <option value="completed">Completed</option>
                            </select>
                          ) : (
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(milestone.status)}`}>
                              {milestone.status}
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No milestones yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
