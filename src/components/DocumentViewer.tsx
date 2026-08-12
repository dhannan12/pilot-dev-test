/**
 * DocumentViewer — Component for viewing and rendering PDF and Word documents
 *
 * Features: document preview, zoom controls, page navigation, file type detection, download option
 *
 * Ticket: SCRUM-669 | Branch: proto/SCRUM-658
 */

import React, { useState } from 'react'

interface Document {
  id: string
  name: string
  type: 'pdf' | 'docx' | 'doc'
  size: string
  uploadDate: string
  pages: number
  thumbnailUrl: string
  previewContent: string
}

const MOCK_DOCUMENTS: Document[] = [
  {
    id: 'doc-1',
    name: 'Employment_Contract_2024.pdf',
    type: 'pdf',
    size: '2.4 MB',
    uploadDate: '2024-01-15',
    pages: 12,
    thumbnailUrl: 'https://via.placeholder.com/150x200/4A90E2/FFFFFF?text=PDF',
    previewContent: 'EMPLOYMENT AGREEMENT\n\nThis Employment Agreement ("Agreement") is entered into as of January 1, 2024, between TechCorp Inc. ("Company") and John Doe ("Employee").\n\n1. POSITION AND DUTIES\nThe Employee shall serve as Senior Software Engineer and shall perform such duties as assigned by the Company.\n\n2. COMPENSATION\nThe Employee shall receive an annual salary of $120,000, payable in accordance with the Company\'s standard payroll practices.\n\n3. BENEFITS\nThe Employee shall be entitled to participate in all employee benefit plans maintained by the Company.'
  },
  {
    id: 'doc-2',
    name: 'Lease_Agreement_MainStreet.docx',
    type: 'docx',
    size: '1.8 MB',
    uploadDate: '2024-02-20',
    pages: 8,
    thumbnailUrl: 'https://via.placeholder.com/150x200/2ECC71/FFFFFF?text=DOCX',
    previewContent: 'COMMERCIAL LEASE AGREEMENT\n\nLease Date: February 1, 2024\nLandlord: Property Holdings LLC\nTenant: Downtown Retail Store\n\nPREMISES: 123 Main Street, Suite 100, City, State 12345\n\nTERM: Five (5) years commencing March 1, 2024\n\nRENT: $5,000 per month, due on the first day of each month\n\nSECURITY DEPOSIT: $10,000\n\nUSE: The premises shall be used for retail operations only.'
  },
  {
    id: 'doc-3',
    name: 'Merger_Agreement_Final.pdf',
    type: 'pdf',
    size: '5.2 MB',
    uploadDate: '2024-03-10',
    pages: 45,
    thumbnailUrl: 'https://via.placeholder.com/150x200/E74C3C/FFFFFF?text=PDF',
    previewContent: 'AGREEMENT AND PLAN OF MERGER\n\nThis Agreement and Plan of Merger ("Agreement") is made as of March 1, 2024, by and between Acquirer Corp., a Delaware corporation ("Acquirer"), and Target Inc., a Delaware corporation ("Target").\n\nRECITALS\n\nWHEREAS, the Boards of Directors of Acquirer and Target have approved the merger of Target with and into Acquirer;\n\nWHEREAS, the merger is intended to qualify as a tax-free reorganization under Section 368(a) of the Internal Revenue Code;\n\nNOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, the parties agree as follows:\n\n1. THE MERGER\n1.1 Upon the terms and subject to the conditions set forth in this Agreement, at the Effective Time, Target shall be merged with and into Acquirer.'
  },
  {
    id: 'doc-4',
    name: 'NDA_Template.doc',
    type: 'doc',
    size: '856 KB',
    uploadDate: '2024-03-25',
    pages: 6,
    thumbnailUrl: 'https://via.placeholder.com/150x200/9B59B6/FFFFFF?text=DOC',
    previewContent: 'NON-DISCLOSURE AGREEMENT\n\nThis Non-Disclosure Agreement ("Agreement") is entered into as of __________, 2024 ("Effective Date") by and between:\n\nDisclosing Party: ___________________________\nReceiving Party: ___________________________\n\n1. DEFINITION OF CONFIDENTIAL INFORMATION\n"Confidential Information" means all information disclosed by either party to the other party, whether orally or in writing, that is designated as confidential or that reasonably should be understood to be confidential.\n\n2. OBLIGATIONS OF RECEIVING PARTY\nThe Receiving Party shall:\n(a) Hold and maintain the Confidential Information in strict confidence;\n(b) Not disclose the Confidential Information to third parties without prior written consent;\n(c) Use the Confidential Information solely for the purpose of evaluating a potential business relationship.'
  },
  {
    id: 'doc-5',
    name: 'Software_License_Agreement.pdf',
    type: 'pdf',
    size: '1.3 MB',
    uploadDate: '2024-04-05',
    pages: 15,
    thumbnailUrl: 'https://via.placeholder.com/150x200/F39C12/FFFFFF?text=PDF',
    previewContent: 'SOFTWARE LICENSE AGREEMENT\n\nThis Software License Agreement ("Agreement") is entered into as of April 1, 2024, between SoftwareCo LLC ("Licensor") and Enterprise Client Inc. ("Licensee").\n\n1. GRANT OF LICENSE\nLicensor hereby grants to Licensee a non-exclusive, non-transferable license to use the Software (as defined below) in accordance with the terms of this Agreement.\n\n2. SOFTWARE\n"Software" means the SoftwareCo Enterprise Suite version 5.0, including all updates and documentation provided by Licensor.\n\n3. LICENSE FEE\nLicensee shall pay Licensor an annual license fee of $50,000, payable in advance on each anniversary of the Effective Date.\n\n4. RESTRICTIONS\nLicensee shall not:\n(a) Modify, adapt, or create derivative works of the Software;\n(b) Reverse engineer, decompile, or disassemble the Software;\n(c) Sublicense, rent, lease, or lend the Software to third parties.'
  }
]

export default function DocumentViewer() {
  const [selectedDoc, setSelectedDoc] = useState<Document>(MOCK_DOCUMENTS[0])
  const [currentPage, setCurrentPage] = useState(1)
  const [zoomLevel, setZoomLevel] = useState(100)

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200))
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50))
  }

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, selectedDoc.pages))
  }

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'bg-red-100 text-red-700'
      case 'docx':
        return 'bg-blue-100 text-blue-700'
      case 'doc':
        return 'bg-purple-100 text-purple-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
            <h1 className="text-3xl font-bold mb-2">Document Viewer</h1>
            <p className="text-blue-100">View and manage your PDF and Word documents</p>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Sidebar - Document List */}
            <div className="lg:w-1/3 border-r border-gray-200 bg-gray-50 p-4 max-h-[800px] overflow-y-auto">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Documents</h2>
              <div className="space-y-3">
                {MOCK_DOCUMENTS.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => {
                      setSelectedDoc(doc)
                      setCurrentPage(1)
                    }}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedDoc.id === doc.id
                        ? 'bg-blue-50 border-2 border-blue-500 shadow-md'
                        : 'bg-white border border-gray-200 hover:border-blue-300 hover:shadow'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <img
                        src={doc.thumbnailUrl}
                        alt={doc.name}
                        className="w-16 h-20 object-cover rounded border border-gray-300"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 text-sm truncate mb-1">
                          {doc.name}
                        </h3>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getFileTypeColor(doc.type)}`}>
                            {doc.type.toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-500">{doc.size}</span>
                        </div>
                        <p className="text-xs text-gray-500">
                          {doc.pages} page{doc.pages > 1 ? 's' : ''} • {doc.uploadDate}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Viewer Area */}
            <div className="lg:w-2/3 flex flex-col">
              {/* Toolbar */}
              <div className="bg-gray-100 border-b border-gray-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm px-3 py-1 rounded-full font-medium ${getFileTypeColor(selectedDoc.type)}`}>
                      {selectedDoc.type.toUpperCase()}
                    </span>
                    <h3 className="font-semibold text-gray-800 truncate max-w-xs">
                      {selectedDoc.name}
                    </h3>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {/* Zoom Controls */}
                    <div className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200">
                      <button
                        onClick={handleZoomOut}
                        disabled={zoomLevel <= 50}
                        className="px-2 py-1 text-gray-700 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                      >
                        −
                      </button>
                      <span className="text-sm font-medium text-gray-700 min-w-[60px] text-center">
                        {zoomLevel}%
                      </span>
                      <button
                        onClick={handleZoomIn}
                        disabled={zoomLevel >= 200}
                        className="px-2 py-1 text-gray-700 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                      >
                        +
                      </button>
                    </div>

                    {/* Download Button */}
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm font-medium">
                      Download
                    </button>
                  </div>
                </div>

                {/* Page Navigation */}
                <div className="flex items-center justify-center space-x-4 mt-4">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm text-sm font-medium"
                  >
                    Previous
                  </button>
                  <span className="text-sm font-medium text-gray-700 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                    Page {currentPage} of {selectedDoc.pages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === selectedDoc.pages}
                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm text-sm font-medium"
                  >
                    Next
                  </button>
                </div>
              </div>

              {/* Document Preview */}
              <div className="flex-1 overflow-y-auto bg-gray-200 p-8">
                <div
                  className="bg-white shadow-2xl mx-auto p-8 rounded-lg"
                  style={{
                    width: `${zoomLevel}%`,
                    minHeight: '600px',
                    maxWidth: '900px',
                    transition: 'width 0.2s ease-in-out'
                  }}
                >
                  {/* Document Header */}
                  <div className="border-b-2 border-gray-300 pb-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">
                          {selectedDoc.name.replace(/\.(pdf|docx|doc)$/, '')}
                        </h2>
                        <p className="text-sm text-gray-500">
                          Page {currentPage} • Uploaded {selectedDoc.uploadDate}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`inline-block text-xs px-3 py-1 rounded-full font-semibold ${getFileTypeColor(selectedDoc.type)}`}>
                          {selectedDoc.type.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Document Content */}
                  <div className="prose prose-sm max-w-none">
                    <div className="text-gray-800 leading-relaxed whitespace-pre-wrap font-serif">
                      {selectedDoc.previewContent}
                    </div>
                  </div>

                  {/* Page Footer */}
                  <div className="mt-12 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">
                      Page {currentPage} of {selectedDoc.pages} • {selectedDoc.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Document Info Footer */}
              <div className="bg-gray-50 border-t border-gray-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <span>📄 {selectedDoc.pages} pages</span>
                    <span>💾 {selectedDoc.size}</span>
                    <span>📅 {selectedDoc.uploadDate}</span>
                  </div>
                  <div className="text-gray-500">
                    Viewing at {zoomLevel}% zoom
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
