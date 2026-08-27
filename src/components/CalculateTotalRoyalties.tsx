/**
 * CalculateTotalRoyalties — Calculates and displays total royalties based on stream counts
 *
 * Features: Stream data visualization, per-track royalty calculation, total earnings summary, royalty rate display, mock music catalog
 *
 * Ticket: SCRUM-1227 | Branch: proto/SCRUM-1223
 */

import React, { useState } from 'react'

interface Track {
  id: string
  title: string
  artist: string
  streams: number
  royaltyRatePerStream: number
}

const MOCK_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Summer Vibes',
    artist: 'The Wavelength',
    streams: 1250000,
    royaltyRatePerStream: 0.004
  },
  {
    id: '2',
    title: 'Midnight Echo',
    artist: 'Luna Park',
    streams: 850000,
    royaltyRatePerStream: 0.0035
  },
  {
    id: '3',
    title: 'Digital Dreams',
    artist: 'Synthwave Collective',
    streams: 2100000,
    royaltyRatePerStream: 0.0045
  },
  {
    id: '4',
    title: 'Coffee Shop Blues',
    artist: 'The Acoustic Sessions',
    streams: 620000,
    royaltyRatePerStream: 0.003
  },
  {
    id: '5',
    title: 'Neon Nights',
    artist: 'Electric Avenue',
    streams: 3400000,
    royaltyRatePerStream: 0.005
  },
  {
    id: '6',
    title: 'Rainy Days',
    artist: 'Chill Lounge',
    streams: 980000,
    royaltyRatePerStream: 0.0038
  },
  {
    id: '7',
    title: 'Mountain Peak',
    artist: 'Nature Sounds',
    streams: 450000,
    royaltyRatePerStream: 0.0032
  }
]

export default function CalculateTotalRoyalties() {
  const [tracks] = useState<Track[]>(MOCK_TRACKS)
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null)

  const calculateRoyalty = (streams: number, rate: number): number => {
    return streams * rate
  }

  const totalRoyalties = tracks.reduce(
    (sum, track) => sum + calculateRoyalty(track.streams, track.royaltyRatePerStream),
    0
  )

  const totalStreams = tracks.reduce((sum, track) => sum + track.streams, 0)

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  return (
    <section data-testid="calculatetotalroyalties" className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Royalty Calculator</h1>
          <p className="text-gray-600 mb-6">Calculate total royalties based on streaming data</p>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6 shadow-md">
              <p className="text-green-100 text-sm font-medium mb-2">Total Royalties</p>
              <p className="text-3xl font-bold">{formatCurrency(totalRoyalties)}</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6 shadow-md">
              <p className="text-blue-100 text-sm font-medium mb-2">Total Streams</p>
              <p className="text-3xl font-bold">{formatNumber(totalStreams)}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6 shadow-md">
              <p className="text-purple-100 text-sm font-medium mb-2">Total Tracks</p>
              <p className="text-3xl font-bold">{tracks.length}</p>
            </div>
          </div>

          {/* Track List */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Track Breakdown</h2>
            <div data-testid="calculatetotalroyalties-list" className="space-y-4">
              {tracks.map((track) => {
                const royalty = calculateRoyalty(track.streams, track.royaltyRatePerStream)
                const isSelected = selectedTrackId === track.id

                return (
                  <div
                    key={track.id}
                    data-testid="calculatetotalroyalties-item"
                    className={`border rounded-lg p-6 transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-sm'
                    }`}
                    onClick={() => setSelectedTrackId(isSelected ? null : track.id)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800">{track.title}</h3>
                        <p className="text-gray-600">{track.artist}</p>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                        <div className="text-center">
                          <p className="text-sm text-gray-500 mb-1">Streams</p>
                          <p className="text-lg font-semibold text-gray-800">
                            {formatNumber(track.streams)}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500 mb-1">Rate/Stream</p>
                          <p className="text-lg font-semibold text-gray-800">
                            ${track.royaltyRatePerStream.toFixed(4)}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500 mb-1">Royalty Earned</p>
                          <p className="text-xl font-bold text-green-600">
                            {formatCurrency(royalty)}
                          </p>
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="mt-4 pt-4 border-t border-purple-200">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Calculation:</p>
                            <p className="font-mono text-gray-800">
                              {formatNumber(track.streams)} × ${track.royaltyRatePerStream.toFixed(4)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Percentage of Total:</p>
                            <p className="font-semibold text-purple-600">
                              {((royalty / totalRoyalties) * 100).toFixed(2)}%
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              data-testid="calculatetotalroyalties-refresh"
              className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-md hover:shadow-lg"
              onClick={() => setSelectedTrackId(null)}
            >
              Refresh View
            </button>
            <button
              data-testid="calculatetotalroyalties-export"
              className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-200 shadow-md hover:shadow-lg"
              onClick={() => {
                console.log('Exporting royalty report...', { tracks, totalRoyalties })
              }}
            >
              Export Report
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
