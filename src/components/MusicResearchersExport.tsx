/**
 * MusicResearchersExport — Data export tool for music research analysis
 *
 * Features: track selection, export format options, metadata filtering, batch export, CSV/JSON download
 *
 * Ticket: SCRUM-1230 | Branch: proto/SCRUM-1223
 */

import React, { useState } from 'react'

interface MusicTrack {
  id: string
  title: string
  artist: string
  album: string
  genre: string
  year: number
  duration: string
  plays: number
  rating: number
}

const MOCK_TRACKS: MusicTrack[] = [
  {
    id: 'track-001',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    genre: 'Rock',
    year: 1975,
    duration: '5:55',
    plays: 1245789,
    rating: 4.9
  },
  {
    id: 'track-002',
    title: 'Imagine',
    artist: 'John Lennon',
    album: 'Imagine',
    genre: 'Rock',
    year: 1971,
    duration: '3:03',
    plays: 987654,
    rating: 4.8
  },
  {
    id: 'track-003',
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    album: 'Thriller',
    genre: 'Pop',
    year: 1982,
    duration: '4:54',
    plays: 2134567,
    rating: 4.9
  },
  {
    id: 'track-004',
    title: 'Hotel California',
    artist: 'Eagles',
    album: 'Hotel California',
    genre: 'Rock',
    year: 1976,
    duration: '6:30',
    plays: 1567890,
    rating: 4.7
  },
  {
    id: 'track-005',
    title: 'Smells Like Teen Spirit',
    artist: 'Nirvana',
    album: 'Nevermind',
    genre: 'Grunge',
    year: 1991,
    duration: '5:01',
    plays: 1876543,
    rating: 4.8
  },
  {
    id: 'track-006',
    title: 'Sweet Child O Mine',
    artist: 'Guns N Roses',
    album: 'Appetite for Destruction',
    genre: 'Rock',
    year: 1987,
    duration: '5:56',
    plays: 1456789,
    rating: 4.8
  },
  {
    id: 'track-007',
    title: 'Wonderwall',
    artist: 'Oasis',
    album: '(What\'s the Story) Morning Glory?',
    genre: 'Britpop',
    year: 1995,
    duration: '4:18',
    plays: 1234560,
    rating: 4.6
  }
]

type ExportFormat = 'csv' | 'json' | 'xlsx'

export default function MusicResearchersExport() {
  const [selectedTracks, setSelectedTracks] = useState<Set<string>>(new Set())
  const [exportFormat, setExportFormat] = useState<ExportFormat>('csv')
  const [genreFilter, setGenreFilter] = useState<string>('all')

  const genres = ['all', ...Array.from(new Set(MOCK_TRACKS.map(t => t.genre)))]

  const filteredTracks = genreFilter === 'all'
    ? MOCK_TRACKS
    : MOCK_TRACKS.filter(t => t.genre === genreFilter)

  const toggleTrack = (trackId: string) => {
    const newSelected = new Set(selectedTracks)
    if (newSelected.has(trackId)) {
      newSelected.delete(trackId)
    } else {
      newSelected.add(trackId)
    }
    setSelectedTracks(newSelected)
  }

  const toggleAll = () => {
    if (selectedTracks.size === filteredTracks.length) {
      setSelectedTracks(new Set())
    } else {
      setSelectedTracks(new Set(filteredTracks.map(t => t.id)))
    }
  }

  const handleExport = () => {
    const tracksToExport = filteredTracks.filter(t => selectedTracks.has(t.id))

    if (tracksToExport.length === 0) {
      alert('Please select at least one track to export')
      return
    }

    let content = ''
    let filename = ''
    let mimeType = ''

    if (exportFormat === 'csv') {
      const headers = ['ID', 'Title', 'Artist', 'Album', 'Genre', 'Year', 'Duration', 'Plays', 'Rating']
      const rows = tracksToExport.map(t => [
        t.id, t.title, t.artist, t.album, t.genre, t.year, t.duration, t.plays, t.rating
      ])
      content = [headers, ...rows].map(row => row.join(',')).join('\n')
      filename = `music_research_export_${Date.now()}.csv`
      mimeType = 'text/csv'
    } else if (exportFormat === 'json') {
      content = JSON.stringify(tracksToExport, null, 2)
      filename = `music_research_export_${Date.now()}.json`
      mimeType = 'application/json'
    } else if (exportFormat === 'xlsx') {
      // Simulated XLSX export (in real app would use a library)
      content = JSON.stringify(tracksToExport, null, 2)
      filename = `music_research_export_${Date.now()}.xlsx`
      mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }

    // Create download
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div data-testid="musicresearchersexport" className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Music Research Data Export</h1>
          <p className="text-gray-600">Select tracks and export data for analysis</p>
        </header>

        {/* Controls Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Genre Filter */}
            <div>
              <label htmlFor="genre-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Genre
              </label>
              <select
                id="genre-filter"
                data-testid="musicresearchersexport-genre"
                value={genreFilter}
                onChange={(e) => setGenreFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>
                    {genre === 'all' ? 'All Genres' : genre}
                  </option>
                ))}
              </select>
            </div>

            {/* Export Format */}
            <div>
              <label htmlFor="export-format" className="block text-sm font-medium text-gray-700 mb-2">
                Export Format
              </label>
              <select
                id="export-format"
                data-testid="musicresearchersexport-format"
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value as ExportFormat)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="csv">CSV</option>
                <option value="json">JSON</option>
                <option value="xlsx">XLSX</option>
              </select>
            </div>

            {/* Export Button */}
            <div className="flex items-end">
              <button
                data-testid="musicresearchersexport-submit"
                onClick={handleExport}
                className="w-full px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Export {selectedTracks.size} Track{selectedTracks.size !== 1 ? 's' : ''}
              </button>
            </div>
          </div>
        </div>

        {/* Track Selection */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Available Tracks ({filteredTracks.length})
            </h2>
            <button
              data-testid="musicresearchersexport-select-all"
              onClick={toggleAll}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              {selectedTracks.size === filteredTracks.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>

          <div data-testid="musicresearchersexport-list" className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Select
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Artist
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Album
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Genre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plays
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTracks.map((track) => (
                  <tr
                    key={track.id}
                    data-testid="musicresearchersexport-item"
                    className={`hover:bg-gray-50 transition-colors ${
                      selectedTracks.has(track.id) ? 'bg-blue-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        data-testid={`musicresearchersexport-checkbox-${track.id}`}
                        checked={selectedTracks.has(track.id)}
                        onChange={() => toggleTrack(track.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {track.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {track.artist}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {track.album}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                        {track.genre}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {track.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {track.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {track.plays.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      ⭐ {track.rating}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Section */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">{selectedTracks.size}</span> of{' '}
                <span className="font-semibold">{filteredTracks.length}</span> tracks selected
              </p>
            </div>
            <div className="text-sm text-gray-600">
              Export format: <span className="font-semibold uppercase">{exportFormat}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
