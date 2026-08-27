/**
 * UsersFilterMusic — Allows users to filter music tracks by genre
 *
 * Features: genre filtering, track listing, artist display, album info, interactive filter buttons
 *
 * Ticket: SCRUM-1229 | Branch: proto/SCRUM-1223
 */

import React, { useState } from 'react'

interface Track {
  id: number
  title: string
  artist: string
  album: string
  genre: string
  duration: string
}

const MOCK_TRACKS: Track[] = [
  { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', genre: 'Rock', duration: '5:55' },
  { id: 2, title: 'Billie Jean', artist: 'Michael Jackson', album: 'Thriller', genre: 'Pop', duration: '4:53' },
  { id: 3, title: 'Take Five', artist: 'Dave Brubeck', album: 'Time Out', genre: 'Jazz', duration: '5:24' },
  { id: 4, title: 'Lose Yourself', artist: 'Eminem', album: '8 Mile Soundtrack', genre: 'Hip Hop', duration: '5:26' },
  { id: 5, title: 'One More Time', artist: 'Daft Punk', album: 'Discovery', genre: 'Electronic', duration: '5:20' },
  { id: 6, title: 'Stairway to Heaven', artist: 'Led Zeppelin', album: 'Led Zeppelin IV', genre: 'Rock', duration: '8:02' },
  { id: 7, title: 'Shape of You', artist: 'Ed Sheeran', album: 'Divide', genre: 'Pop', duration: '3:53' },
  { id: 8, title: 'So What', artist: 'Miles Davis', album: 'Kind of Blue', genre: 'Jazz', duration: '9:22' },
  { id: 9, title: 'Juicy', artist: 'The Notorious B.I.G.', album: 'Ready to Die', genre: 'Hip Hop', duration: '5:02' },
  { id: 10, title: 'Strobe', artist: 'Deadmau5', album: 'For Lack of a Better Name', genre: 'Electronic', duration: '10:37' },
]

const GENRES = ['All', 'Rock', 'Pop', 'Jazz', 'Hip Hop', 'Electronic']

export default function UsersFilterMusic() {
  const [selectedGenre, setSelectedGenre] = useState<string>('All')

  const filteredTracks = selectedGenre === 'All' 
    ? MOCK_TRACKS 
    : MOCK_TRACKS.filter(track => track.genre === selectedGenre)

  return (
    <div data-testid="usersfiltermusic" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Music Library</h1>
        
        {/* Genre Filter Buttons */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Filter by Genre</h2>
          <div className="flex flex-wrap gap-2">
            {GENRES.map(genre => (
              <button
                key={genre}
                data-testid={`usersfiltermusic-${genre.toLowerCase().replace(' ', '-')}`}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedGenre === genre
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Track Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredTracks.length} {filteredTracks.length === 1 ? 'track' : 'tracks'}
          </p>
        </div>

        {/* Tracks List */}
        <div data-testid="usersfiltermusic-list" className="space-y-3">
          {filteredTracks.map(track => (
            <div
              key={track.id}
              data-testid="usersfiltermusic-item"
              className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{track.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{track.artist}</p>
                  <p className="text-xs text-gray-500 mt-1">{track.album}</p>
                  <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                    {track.genre}
                  </span>
                </div>
                <div className="text-sm text-gray-500 ml-4">
                  {track.duration}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTracks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No tracks found for this genre.</p>
          </div>
        )}
      </div>
    </div>
  )
}
