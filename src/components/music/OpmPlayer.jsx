import { useState } from 'react'
import { FaSpotify } from 'react-icons/fa'
import { FaPlay } from 'react-icons/fa6'

const playlistUrl = 'https://open.spotify.com/playlist/3mssqdrkVBB3GMLlt2A3HA'
const embedUrl = 'https://open.spotify.com/embed/playlist/3mssqdrkVBB3GMLlt2A3HA?utm_source=generator&theme=0'

const OpmPlayer = () => {
  const [playerLoaded, setPlayerLoaded] = useState(false)

  return (
    <aside className="hero-playlist" aria-label="John Lloyd's Spotify playlist">
      <header className="playlist-heading">
        <div>
          <h2>Daily Rotation</h2>
          <p>Filipino OPM favorites</p>
        </div>
        <a className="playlist-open" href={playlistUrl} target="_blank" rel="noopener noreferrer" aria-label="Open playlist in Spotify">
          <FaSpotify aria-hidden="true" />
        </a>
      </header>
      {playerLoaded ? (
        <iframe
          title="Daily Rotation Spotify playlist"
          src={embedUrl}
          width="100%"
          height="352"
          allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <div className="playlist-preview">
          <span className="playlist-art" aria-hidden="true"><FaSpotify /></span>
          <div className="playlist-preview-copy">
            <strong>Daily Rotation</strong>
            <span>OPM for the coding session</span>
          </div>
          <div className="playlist-equalizer" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <button className="playlist-load-button" type="button" onClick={() => setPlayerLoaded(true)}>
            <FaPlay aria-hidden="true" /> Load Spotify player
          </button>
        </div>
      )}
      <a className="playlist-direct-link" href={playlistUrl} target="_blank" rel="noopener noreferrer">
        <FaSpotify aria-hidden="true" /> Listen on Spotify
      </a>
    </aside>
  )
}

export default OpmPlayer
