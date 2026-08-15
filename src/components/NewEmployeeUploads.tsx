/**
 * NewEmployeeUploads — New employee document upload with confirmation status
 *
 * Features: file upload, status tracking, document list, upload history, confirmation display
 *
 * Ticket: SCRUM-886 | Branch: proto/SCRUM-879
 */

import { useState } from 'react'

interface UploadedDocument {
  id: string
  fileName: string
  fileSize: string
  uploadDate: string
  status: 'pending' | 'confirmed' | 'rejected'
  documentType: string
}

const mockUploadedDocuments: UploadedDocument[] = [
  {
    id: '1',
    fileName: 'ID_Card_Front.pdf',
    fileSize: '2.3 MB',
    uploadDate: '2026-08-14 10:30 AM',
    status: 'confirmed',
    documentType: 'Identification'
  },
  {
    id: '2',
    fileName: 'Tax_Form_W4.pdf',
    fileSize: '1.8 MB',
    uploadDate: '2026-08-14 11:15 AM',
    status: 'confirmed',
    documentType: 'Tax Documents'
  },
  {
    id: '3',
    fileName: 'Bank_Details.pdf',
    fileSize: '956 KB',
    uploadDate: '2026-08-14 02:45 PM',
    status: 'pending',
    documentType: 'Banking Information'
  },
  {
    id: '4',
    fileName: 'Educational_Certificate.pdf',
    fileSize: '3.1 MB',
    uploadDate: '2026-08-15 09:20 AM',
    status: 'pending',
    documentType: 'Education'
  },
  {
    id: '5',
    fileName: 'Previous_Employment_Letter.pdf',
    fileSize: '1.2 MB',
    uploadDate: '2026-08-15 10:00 AM',
    status: 'rejected',
    documentType: 'Employment History'
  }
]

const documentTypes = [
  'Identification',
  'Tax Documents',
  'Banking Information',
  'Education',
  'Employment History',
  'Other'
]

export default function NewEmployeeUploads() {
  const [documents, setDocuments] = useState<UploadedDocument[]>(mockUploadedDocuments)
  const [selectedType, setSelectedType] = useState<string>(documentTypes[0])
  const [selectedFile, setSelectedFile] = useState<string>('')

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0].name)
    }
  }

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file to upload')
      return
    }

    const newDocument: UploadedDocument = {
      id: String(documents.length + 1),
      fileName: selectedFile,
      fileSize: `${(Math.random() * 3 + 0.5).toFixed(1)} MB`,
      uploadDate: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      status: 'pending',
      documentType: selectedType
    }

    setDocuments([newDocument, ...documents])
    setSelectedFile('')
    // Reset file input
    const fileInput = document.querySelector('[data-testid="newemployeeuploads-file"]') as HTMLInputElement
    if (fileInput) fileInput.value = ''
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '✓'
      case 'pending':
        return '⏱'
      case 'rejected':
        return '✗'
      default:
        return '?'
    }
  }

  const pendingCount = documents.filter(doc => doc.status === 'pending').length
  const confirmedCount = documents.filter(doc => doc.status === 'confirmed').length

  return (
    <div data-testid="newemployeeuploads" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Document Upload Portal</h1>
          <p className="text-gray-600">Upload your onboarding documents and track confirmation status</p>
          
          {/* Status Summary */}
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg border border-green-200">
              <span className="text-green-600 font-semibold">{confirmedCount}</span>
              <span className="text-gray-600 text-sm">Confirmed</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-lg border border-yellow-200">
              <span className="text-yellow-600 font-semibold">{pendingCount}</span>
              <span className="text-gray-600 text-sm">Awaiting Confirmation</span>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload New Document</h2>
          
          <div className="space-y-4">
            {/* Document Type Selector */}
            <div>
              <label htmlFor="document-type" className="block text-sm font-medium text-gray-700 mb-2">
                Document Type
              </label>
              <select
                id="document-type"
                data-testid="newemployeeuploads-type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {documentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* File Input */}
            <div>
              <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
                Select File
              </label>
              <input
                id="file-upload"
                type="file"
                data-testid="newemployeeuploads-file"
                onChange={handleFileSelect}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {selectedFile && (
                <p className="mt-2 text-sm text-gray-600">Selected: {selectedFile}</p>
              )}
            </div>

            {/* Upload Button */}
            <button
              data-testid="newemployeeuploads-upload"
              onClick={handleUpload}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Upload Document
            </button>
          </div>
        </div>

        {/* Documents List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Uploaded Documents</h2>
          
          {documents.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No documents uploaded yet</p>
              <p className="text-sm mt-2">Upload your first document above</p>
            </div>
          ) : (
            <div data-testid="newemployeeuploads-list" className="space-y-3">
              {documents.map(doc => (
                <div
                  key={doc.id}
                  data-testid="newemployeeuploads-item"
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-800">{doc.fileName}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(doc.status)}`}>
                          <span className="mr-1">{getStatusIcon(doc.status)}</span>
                          {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Type:</span> {doc.documentType}
                        </div>
                        <div>
                          <span className="font-medium">Size:</span> {doc.fileSize}
                        </div>
                        <div>
                          <span className="font-medium">Uploaded:</span> {doc.uploadDate}
                        </div>
                      </div>
                      
                      {doc.status === 'pending' && (
                        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            <span className="font-semibold">⏱ Awaiting Confirmation</span>
                            <br />
                            Your document is being reviewed by HR. You will receive an email once it's confirmed.
                          </p>
                        </div>
                      )}
                      
                      {doc.status === 'confirmed' && (
                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-sm text-green-800">
                            <span className="font-semibold">✓ Confirmed</span>
                            <br />
                            This document has been verified and approved by HR.
                          </p>
                        </div>
                      )}
                      
                      {doc.status === 'rejected' && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-sm text-red-800">
                            <span className="font-semibold">✗ Rejected</span>
                            <br />
                            This document was rejected. Please upload a corrected version or contact HR for details.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
