/**
 * DocumentUpload — Document upload and retrieval interface with API simulation
 *
 * Features: file upload area, document list with metadata, search/filter, download simulation, status indicators
 *
 * Ticket: SCRUM-665 | Branch: proto/SCRUM-658
 */

import React, { useState } from 'react'

interface Document {
  id: string
  name: string
  size: string
  type: string
  uploadedBy: string
  uploadedAt: string
  status: 'processing' | 'ready' | 'error'
  category: string
}

const MOCK_DOCUMENTS: Document[] = [
  {
    id: 'doc-001',
    name: 'contract_agreement_2024.pdf',
    size: '2.4 MB',
    type: 'application/pdf',
    uploadedBy: 'Sarah Johnson',
    uploadedAt: '2024-08-10 14:23',
    status: 'ready',
    category: 'Contracts',
  },
  {
    id: 'doc-002',
    name: 'compliance_report_q2.docx',
    size: '1.8 MB',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    uploadedBy: 'Michael Chen',
    uploadedAt: '2024-08-11 09:15',
    status: 'ready',
    category: 'Reports',
  },
  {
    id: 'doc-003',
    name: 'legal_memo_draft.pdf',
    size: '856 KB',
    type: 'application/pdf',
    uploadedBy: 'Emily Davis',
    uploadedAt: '2024-08-11 16:42',
    status: 'processing',
    category: 'Memos',
  },
  {
    id: 'doc-004',
    name: 'nda_template_v3.pdf',
    size: '342 KB',
    type: 'application/pdf',
    uploadedBy: 'David Martinez',
    uploadedAt: '2024-08-12 08:30',
    status: 'ready',
    category: 'Templates',
  },
  {
    id: 'doc-005',
    name: 'financial_statement.xlsx',
    size: '4.2 MB',
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    uploadedBy: 'Anna Williams',
    uploadedAt: '2024-08-12 11:05',
    status: 'error',
    category: 'Financial',
  },
  {
    id: 'doc-006',
    name: 'policy_guidelines.pdf',
    size: '1.2 MB',
    type: 'application/pdf',
    uploadedBy: 'Robert Brown',
    uploadedAt: '2024-08-12 13:20',
    status: 'ready',
    category: 'Policies',
  },
  {
    id: 'doc-007',
    name: 'audit_checklist.docx',
    size: '678 KB',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    uploadedBy: 'Jessica Lee',
    uploadedAt: '2024-08-12 14:55',
    status: 'ready',
    category: 'Audits',
  },
]

export default function DocumentUpload() {
  const [documents, setDocuments] = useState<Document[]>(MOCK_DOCUMENTS)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [dragActive, setDragActive] = useState(false)
  const [uploadQueue, setUploadQueue] = useState<string[]>([])

  const categories = ['all', ...Array.from(new Set(MOCK_DOCUMENTS.map(doc => doc.category)))]

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files)
    const newFileNames = fileArray.map(f => f.name)
    setUploadQueue(prev => [...prev, ...newFileNames])

    // Simulate upload completion after 2 seconds
    setTimeout(() => {
      const newDocs: Document[] = fileArray.map((file, idx) => ({
        id: `doc-${Date.now()}-${idx}`,
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type || 'application/octet-stream',
        uploadedBy: 'Current User',
        uploadedAt: new Date().toLocaleString('en-US', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit', 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        status: 'ready',
        category: 'Uploads',
      }))

      setDocuments(prev => [...newDocs, ...prev])
      setUploadQueue([])
    }, 2000)
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  const handleDownload = (doc: Document) => {
    // Simulated download - in real implementation would trigger API call
    alert(`Downloading: ${doc.name}`)
  }

  const handleDelete = (docId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId))
  }

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'ready':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'error':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄'
    if (type.includes('word') || type.includes('document')) return '📝'
    if (type.includes('sheet') || type.includes('excel')) return '📊'
    if (type.includes('image')) return '🖼️'
    return '📎'
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Management</h1>
          <p className="text-gray-600">Upload, manage, and retrieve your documents</p>
        </div>

        {/* Upload Area */}
        <div
          className={`mb-8 border-2 border-dashed rounded-lg p-8 transition-colors ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 bg-white hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <div className="text-5xl mb-4">📤</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Upload Documents
            </h3>
            <p className="text-gray-600 mb-4">
              Drag and drop files here, or click to browse
            </p>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              multiple
              onChange={handleFileInput}
            />
            <label
              htmlFor="file-upload"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
            >
              Choose Files
            </label>
            <p className="text-sm text-gray-500 mt-3">
              Supported formats: PDF, DOCX, XLSX, and more
            </p>
          </div>
        </div>

        {/* Upload Queue */}
        {uploadQueue.length > 0 && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Uploading...</h3>
            {uploadQueue.map((fileName, idx) => (
              <div key={idx} className="flex items-center gap-2 text-blue-700">
                <div className="animate-spin">⏳</div>
                <span className="text-sm">{fileName}</span>
              </div>
            ))}
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search documents by name or uploader..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Document Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-gray-900">{documents.length}</div>
            <div className="text-sm text-gray-600">Total Documents</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-green-600">
              {documents.filter(d => d.status === 'ready').length}
            </div>
            <div className="text-sm text-gray-600">Ready</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {documents.filter(d => d.status === 'processing').length}
            </div>
            <div className="text-sm text-gray-600">Processing</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-red-600">
              {documents.filter(d => d.status === 'error').length}
            </div>
            <div className="text-sm text-gray-600">Errors</div>
          </div>
        </div>

        {/* Documents List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Documents ({filteredDocuments.length})
            </h2>
          </div>
          
          {filteredDocuments.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <div className="text-4xl mb-2">📭</div>
              <p>No documents found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="text-3xl">{getFileIcon(doc.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {doc.name}
                          </h3>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                              doc.status
                            )}`}
                          >
                            {doc.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span>📦 {doc.size}</span>
                          <span>👤 {doc.uploadedBy}</span>
                          <span>📅 {doc.uploadedAt}</span>
                          <span className="px-2 py-0.5 bg-gray-100 rounded">
                            {doc.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleDownload(doc)}
                        disabled={doc.status !== 'ready'}
                        className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        Download
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="px-3 py-1.5 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* API Info Footer */}
        <div className="mt-8 bg-gray-100 rounded-lg p-4 text-sm text-gray-700">
          <h3 className="font-semibold mb-2">📡 API Endpoints Simulated:</h3>
          <ul className="space-y-1 list-disc list-inside">
            <li><code className="bg-white px-2 py-0.5 rounded">POST /api/documents/upload</code> - Upload new documents</li>
            <li><code className="bg-white px-2 py-0.5 rounded">GET /api/documents</code> - Retrieve document list</li>
            <li><code className="bg-white px-2 py-0.5 rounded">GET /api/documents/:id</code> - Download specific document</li>
            <li><code className="bg-white px-2 py-0.5 rounded">DELETE /api/documents/:id</code> - Delete document</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
