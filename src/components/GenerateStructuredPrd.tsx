/**
 * GenerateStructuredPrd — Generates a structured Product Requirements Document from a validated product brief
 *
 * Features: Brief validation, PRD section generation, executive summary, functional requirements mapping, acceptance criteria definition
 *
 * Ticket: SCRUM-827 | Branch: proto/SCRUM-823
 */

import { useState } from 'react'

interface ProductBrief {
  id: string
  title: string
  description: string
  validated: boolean
  createdDate: string
}

interface PrdSection {
  id: string
  title: string
  content: string
  status: 'draft' | 'generated' | 'reviewed'
}

interface GeneratedPrd {
  briefId: string
  briefTitle: string
  sections: PrdSection[]
  generatedDate: string
  version: string
}

const MOCK_PRODUCT_BRIEFS: ProductBrief[] = [
  {
    id: 'brief-001',
    title: 'Mobile Banking App Redesign',
    description: 'Modernize mobile banking experience with improved UX and accessibility features',
    validated: true,
    createdDate: '2026-07-15',
  },
  {
    id: 'brief-002',
    title: 'AI-Powered Customer Support Chatbot',
    description: 'Implement intelligent chatbot to handle tier-1 customer support queries',
    validated: true,
    createdDate: '2026-07-20',
  },
  {
    id: 'brief-003',
    title: 'E-commerce Checkout Optimization',
    description: 'Streamline checkout process to reduce cart abandonment rates',
    validated: true,
    createdDate: '2026-08-01',
  },
  {
    id: 'brief-004',
    title: 'Real-time Inventory Management System',
    description: 'Build comprehensive inventory tracking with multi-location support',
    validated: true,
    createdDate: '2026-08-05',
  },
  {
    id: 'brief-005',
    title: 'Social Media Analytics Dashboard',
    description: 'Create unified dashboard for tracking engagement across social platforms',
    validated: true,
    createdDate: '2026-08-10',
  },
]

const MOCK_PRD_TEMPLATES: string[] = [
  'Executive Summary',
  'Product Vision & Goals',
  'User Personas & Target Audience',
  'Functional Requirements',
  'Non-Functional Requirements',
  'User Stories & Use Cases',
  'Technical Architecture',
  'Acceptance Criteria',
  'Timeline & Milestones',
  'Success Metrics',
]

export default function GenerateStructuredPrd() {
  const [selectedBrief, setSelectedBrief] = useState<ProductBrief | null>(null)
  const [generatedPrd, setGeneratedPrd] = useState<GeneratedPrd | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGeneratePrd = (brief: ProductBrief) => {
    setIsGenerating(true)
    setSelectedBrief(brief)

    // Simulate PRD generation
    setTimeout(() => {
      const sections: PrdSection[] = MOCK_PRD_TEMPLATES.map((title, index) => ({
        id: `section-${index + 1}`,
        title,
        content: generateSectionContent(title, brief),
        status: 'generated' as const,
      }))

      const prd: GeneratedPrd = {
        briefId: brief.id,
        briefTitle: brief.title,
        sections,
        generatedDate: new Date().toISOString().split('T')[0],
        version: '1.0',
      }

      setGeneratedPrd(prd)
      setIsGenerating(false)
    }, 1500)
  }

  const generateSectionContent = (sectionTitle: string, brief: ProductBrief): string => {
    const contentMap: Record<string, string> = {
      'Executive Summary': `This PRD outlines the requirements for ${brief.title}. ${brief.description}. The project aims to deliver a comprehensive solution that meets user needs and business objectives.`,
      'Product Vision & Goals': `Vision: Transform the user experience through ${brief.title}. Goals: Improve user satisfaction, increase efficiency, and drive business growth.`,
      'User Personas & Target Audience': 'Primary users include end customers, business administrators, and technical stakeholders. Each persona has unique needs and expectations.',
      'Functional Requirements': 'Core functionality includes user authentication, data processing, real-time updates, reporting capabilities, and integration with existing systems.',
      'Non-Functional Requirements': 'System must support 10,000+ concurrent users, maintain 99.9% uptime, ensure GDPR compliance, and provide sub-200ms response times.',
      'User Stories & Use Cases': 'As a user, I want to easily access features so that I can complete tasks efficiently. As an admin, I want comprehensive analytics to make data-driven decisions.',
      'Technical Architecture': 'Microservices architecture with React frontend, Node.js backend, PostgreSQL database, and AWS cloud infrastructure.',
      'Acceptance Criteria': 'All features must pass QA testing, meet performance benchmarks, receive stakeholder approval, and comply with security standards.',
      'Timeline & Milestones': 'Phase 1: Requirements (2 weeks), Phase 2: Design (3 weeks), Phase 3: Development (8 weeks), Phase 4: Testing (2 weeks), Phase 5: Launch (1 week).',
      'Success Metrics': 'User adoption rate >80%, task completion time reduced by 40%, customer satisfaction score >4.5/5, system uptime >99.9%.',
    }

    return contentMap[sectionTitle] || `Detailed ${sectionTitle} content for ${brief.title}.`
  }

  const handleReset = () => {
    setSelectedBrief(null)
    setGeneratedPrd(null)
    setIsGenerating(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-700'
      case 'generated':
        return 'bg-green-100 text-green-700'
      case 'reviewed':
        return 'bg-blue-100 text-blue-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Generate Structured PRD</h1>
          <p className="mt-2 text-gray-600">
            Transform validated product briefs into comprehensive Product Requirements Documents
          </p>
        </div>

        {!generatedPrd ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Select a Validated Product Brief
            </h2>
            <div className="space-y-4">
              {MOCK_PRODUCT_BRIEFS.map((brief) => (
                <div
                  key={brief.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{brief.title}</h3>
                        {brief.validated && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            Validated
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{brief.description}</p>
                      <p className="text-xs text-gray-500">Created: {brief.createdDate}</p>
                    </div>
                    <button
                      onClick={() => handleGeneratePrd(brief)}
                      disabled={isGenerating}
                      className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                    >
                      {isGenerating && selectedBrief?.id === brief.id ? 'Generating...' : 'Generate PRD'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* PRD Header */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{generatedPrd.briefTitle}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Version: {generatedPrd.version}</span>
                    <span>•</span>
                    <span>Generated: {generatedPrd.generatedDate}</span>
                    <span>•</span>
                    <span>Sections: {generatedPrd.sections.length}</span>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  Generate Another
                </button>
              </div>
            </div>

            {/* PRD Sections */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">PRD Sections</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {generatedPrd.sections.map((section, index) => (
                  <div key={section.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-semibold text-sm">
                          {index + 1}
                        </span>
                        <h4 className="text-lg font-semibold text-gray-900">{section.title}</h4>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(section.status)}`}>
                        {section.status}
                      </span>
                    </div>
                    <p className="ml-11 text-gray-700 leading-relaxed">{section.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <p>PRD successfully generated with {generatedPrd.sections.length} sections</p>
                  <p className="mt-1">Ready for review and refinement</p>
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium">
                    Export PDF
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                    Submit for Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
