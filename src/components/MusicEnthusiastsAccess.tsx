/**
 * MusicEnthusiastsAccess — Personalized music recommendations for enthusiasts
 *
 * Features: user taste profile, recommended tracks, genre preferences, recently played, curated playlists
 *
 * Ticket: SCRUM-1225 | Branch: proto/SCRUM-1223
 */

import React, { useState } from 'react'

interface Track {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  genre: string
  coverUrl: string
}

interface Playlist {
  id: string
  name: string
  description: string
  trackCount: number
  coverUrl: string
}

interface UserProfile {
  name: string
  topGenres: string[]
  listeningHours: number
  favoriteArtists: string[]
}

const mockUserProfile: UserProfile = {
  name: 'Music Enthusiast',
  topGenres: ['Jazz', 'Electronic', 'Indie Rock', 'Classical'],
  listeningHours: 847,
  favoriteArtists: ['Miles Davis', 'Daft Punk', 'Radiohead', 'Ludovico Einaudi']
}

const mockRecommendedTracks: Track[] = [
  {
    id: '1',
    title: 'Blue in Green',
    artist: 'Miles Davis',
    album: 'Kind of Blue',
    duration: '5:37',
    genre: 'Jazz',
    coverUrl: 'https://via.placeholder.com/100/4A90E2/ffffff?text=Jazz'
  },
  {
    id: '2',
    title: 'One More Time',
    artist: 'Daft Punk',
    album: 'Discovery',
    duration: '5:20',
    genre: 'Electronic',
    coverUrl: 'https://via.placeholder.com/100/E94E77/ffffff?text=Electronic'
  },
  {
    id: '3',
    title: 'Karma Police',
    artist: 'Radiohead',
    album: 'OK Computer',
    duration: '4:21',
    genre: 'Indie Rock',
    coverUrl: 'https://via.placeholder.com/100/50C878/ffffff?text=Rock'
  },
  {
    id: '4',
    title: 'Nuvole Bianche',
    artist: 'Ludovico Einaudi',
    album: 'Una Mattina',
    duration: '5:57',
    genre: 'Classical',
    coverUrl: 'https://via.placeholder.com/100/9B59B6/ffffff?text=Classical'
  },
  {
    id: '5',
    title: 'Teardrop',
    artist: 'Massive Attack',
    album: 'Mezzanine',
    duration: '5:29',
    genre: 'Electronic',
    coverUrl: 'https://via.placeholder.com/100/E67E22/ffffff?text=Electronic'
  },
  {
    id: '6',
    title: 'So What',
    artist: 'Miles Davis',
    album: 'Kind of Blue',
    duration: '9:22',
    genre: 'Jazz',
    coverUrl: 'https://via.placeholder.com/100/3498DB/ffffff?text=Jazz'
  }
]

const mockRecommendedPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'Jazz Essentials',
    description: 'Timeless jazz classics for true enthusiasts',
    trackCount: 42,
    coverUrl: 'https://via.placeholder.com/150/2C3E50/ffffff?text=Jazz'
  },
  {
    id: '2',
    name: 'Electronic Voyage',
    description: 'Journey through electronic soundscapes',
    trackCount: 38,
    coverUrl: 'https://via.placeholder.com/150/1ABC9C/ffffff?text=Electronic'
  },
  {
    id: '3',
    name: 'Indie Discovery',
    description: 'Hidden gems from the indie rock scene',
    trackCount: 35,
    coverUrl: 'https://via.placeholder.com/150/E74C3C/ffffff?text=Indie'
  },
  {
    id: '4',
    name: 'Classical Focus',
    description: 'Piano and orchestral pieces for concentration',
    trackCount: 50,
    coverUrl: 'https://via.placeholder.com/150/8E44AD/ffffff?text=Classical'
  },
  {
    id: '5',
    name: 'Late Night Vibes',
    description: 'Smooth tracks for evening relaxation',
    trackCount: 28,
    coverUrl: 'https://via.placeholder.com/150/F39C12/ffffff?text=Night'
  }
]

export default function MusicEnthusiastsAccess() {
  const [selectedGenre, setSelectedGenre] = useState<string>('all')
  const [activeTab, setActiveTab] = useState<'tracks' | 'playlists'>('tracks')

  const filteredTracks = selectedGenre === 'all'
    ? mockRecommendedTracks
    : mockRecommendedTracks.filter(track => track.genre.toLowerCase() === selectedGenre.toLowerCase())

  return (
    <div data-testid="musicenthusiastsaccess" className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-white">
          <h1 className="text-4xl font-bold mb-2">Your Personalized Music Hub</h1>
          <p className="text-purple-200">Discover music tailored to your taste</p>
        </header>

        {/* User Profile Summary */}
        <section data-testid="musicenthusiastsaccess-profile" className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 text-white">
          <h2 className="text-2xl font-semibold mb-4">Welcome back, {mockUserProfile.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-purple-200 text-sm mb-2">Top Genres</p>
              <div className="flex flex-wrap gap-2">
                {mockUserProfile.topGenres.map((genre, index) => (
                  <span
                    key={index}
                    data-testid="musicenthusiastsaccess-genre-tag"
                    className="px-3 py-1 bg-purple-500/30 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-purple-200 text-sm mb-2">Listening Hours</p>
              <p className="text-3xl font-bold">{mockUserProfile.listeningHours}</p>
            </div>
            <div>
              <p className="text-purple-200 text-sm mb-2">Favorite Artists</p>
              <p className="text-sm">{mockUserProfile.favoriteArtists.join(', ')}</p>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6">
          <button
            data-testid="musicenthusiastsaccess-tab-tracks"
            onClick={() => setActiveTab('tracks')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'tracks'
                ? 'bg-white text-purple-900'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Recommended Tracks
          </button>
          <button
            data-testid="musicenthusiastsaccess-tab-playlists"
            onClick={() => setActiveTab('playlists')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'playlists'
                ? 'bg-white text-purple-900'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Curated Playlists
          </button>
        </div>

        {/* Recommended Tracks View */}
        {activeTab === 'tracks' && (
          <div>
            {/* Genre Filter */}
            <div className="mb-6">
              <label htmlFor="genre-filter" className="text-white text-sm mb-2 block">
                Filter by Genre
              </label>
              <select
                id="genre-filter"
                data-testid="musicenthusiastsaccess-genre-filter"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-purple-400 focus:outline-none"
              >
                <option value="all" className="bg-purple-900">All Genres</option>
                <option value="jazz" className="bg-purple-900">Jazz</option>
                <option value="electronic" className="bg-purple-900">Electronic</option>
                <option value="indie rock" className="bg-purple-900">Indie Rock</option>
                <option value="classical" className="bg-purple-900">Classical</option>
              </select>
            </div>

            {/* Tracks List */}
            <div data-testid="musicenthusiastsaccess-tracks-list" className="space-y-4">
              {filteredTracks.map((track) => (
                <div
                  key={track.id}
                  data-testid="musicenthusiastsaccess-track-item"
                  className="bg-white/10 backdrop-blur-md rounded-lg p-4 flex items-center gap-4 hover:bg-white/20 transition-all"
                >
                  <img
                    src={track.coverUrl}
                    alt={`${track.album} cover`}
                    className="w-16 h-16 rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg">{track.title}</h3>
                    <p className="text-purple-200 text-sm">{track.artist} • {track.album}</p>
                    <p className="text-purple-300 text-xs mt-1">{track.genre}</p>
                  </div>
                  <div className="text-purple-200 text-sm">{track.duration}</div>
                  <button
                    data-testid="musicenthusiastsaccess-play-track"
                    className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                  >
                    Play
                  </button>
                  <button
                    data-testid="musicenthusiastsaccess-add-track"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Playlists View */}
        {activeTab === 'playlists' && (
          <div data-testid="musicenthusiastsaccess-playlists-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockRecommendedPlaylists.map((playlist) => (
              <div
                key={playlist.id}
                data-testid="musicenthusiastsaccess-playlist-item"
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition-all cursor-pointer"
              >
                <img
                  src={playlist.coverUrl}
                  alt={`${playlist.name} cover`}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-white font-bold text-xl mb-2">{playlist.name}</h3>
                <p className="text-purple-200 text-sm mb-4">{playlist.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-purple-300 text-sm">{playlist.trackCount} tracks</span>
                  <button
                    data-testid="musicenthusiastsaccess-play-playlist"
                    className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors text-sm"
                  >
                    Play
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Refresh Recommendations Button */}
        <div className="mt-8 text-center">
          <button
            data-testid="musicenthusiastsaccess-refresh"
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105"
          >
            Refresh Recommendations
          </button>
        </div>
      </div>
    </div>
  )
}
