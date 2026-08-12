/**
 * LegalUpload — Centralized legal document upload and viewing platform
 *
 * Features: file upload interface, document list view, version tracking, document metadata display, team access management
 *
 * Ticket: SCRUM-659 | Branch: proto/SCRUM-658
 */

import { useState } from 'react'

interface LegalDocument {
  id: string
  name: string
  uploadedBy: string
  uploadDate: string
  version: string
  fileSize: string
  status: 'active' | 'archived'
  category: string
}

const MOCK_DOCUMENTS: LegalDocument[] = [
  {
    id: '1',
    name: 'Non-Disclosure Agreement.pdf',
    uploadedBy: 'Sarah Johnson',
    uploadDate: '2026-08-10',
    version: 'v2.1',
    fileSize: '245 KB',
    status: 'active',
    category: 'Contracts'
  },
  {
    id: '2',
    name: 'Employment Contract Template.pdf',
    uploadedBy: 'Michael Chen',
    uploadDate: '2026-08-09',
    version: 'v3.0',
    fileSize: '512 KB',
    status: 'active',
    category: 'HR Documents'
  },
  {
    id: '3',
    name: 'Privacy Policy 2026.pdf',
    uploadedBy: 'Emily Rodriguez',
    uploadDate: '2026-08-08',
    version: 'v1.5',
    fileSize: '189 KB',
    status: 'active',
    category: 'Compliance'
  },
  {
    id: '4',
    name: 'Service Level Agreement.pdf',
    uploadedBy: 'David Park',
    uploadDate: '2026-08-07',
    version: 'v2.3',
    fileSize: '378 KB',
    status: 'active',
    category: 'Contracts'
  },
  {
    id: '5',
    name: 'Intellectual Property Rights.pdf',
    uploadedBy: 'Sarah Johnson',
    uploadDate: '2026-08-05',
    version: 'v1.0',
    fileSize: '421 KB',
    status: 'archived',
    category: 'Legal'
  },
  {
    id: '6',
    name: 'Data Processing Agreement.pdf',
    uploadedBy: 'Michael Chen',
    uploadDate: '2026-08-03',
    version: 'v4.2',
    fileSize: '298 KB',
    status: 'active',
    category: 'Compliance'
  },
  {
    id: '7',
    name: 'Vendor Agreement Template.pdf',
    uploadedBy: 'Emily Rodriguez',
    uploadDate: '2026-08-01',
    version: 'v1.8',
    fileSize: '356 KB',
    status: 'active',
    category: 'Contracts'
  }
]

export default function LegalUpload() {
  const [documents, setDocuments] = useState<LegalDocument[]>(MOCK_DOCUMENTS)
  const [selectedFile, setSelectedFile] = useState<string>('')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file.name)
    }
  }

  const handleUpload = () => {
    if (selectedFile) {
      const newDoc: LegalDocument = {
        id: String(documents.length + 1),
        name: selectedFile,
        uploadedBy: 'Current User',
        uploadDate: new Date().toISOString().split('T')[0],
        version: 'v1.0',
        fileSize: '0 KB',
        status: 'active',
        category: 'Uncategorized'
      }
      setDocuments([newDoc, ...documents])
      setSelectedFile('')
    }
  }

  const categories = ['all', ...Array.from(new Set(MOCK_DOCUMENTS.map(doc => doc.category)))]

  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Legal Document Management</h1>
          <p className="text-gray-600">Upload and manage legal documents for team access</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload New Document</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block">
                <span className="sr-only">Choose file</span>
                <input
                  type="file"
                  onChange={handleFileSelect}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  accept=".pdf,.doc,.docx"
                />
              </label>
              {selectedFile && (
                <p className="mt-2 text-sm text-gray-600">Selected: {selectedFile}</p>
              )}
            </div>
            <button
              onClick={handleUpload}
              disabled={!selectedFile}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Upload
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Documents
              </label>
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or uploader..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="sm:w-64">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Category
              </label>
              <select
                id="category"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Documents List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Documents ({filteredDocuments.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Uploaded By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Version
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded flex items-center justify-center">
                          <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                        {doc.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {doc.uploadedBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.uploadDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {doc.version}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.fileSize}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        doc.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {doc.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No documents found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
