import { FaSpotify } from 'react-icons/fa'
import { useTheme } from '../../context/ThemeContext'

const playlistUrl = 'https://open.spotify.com/playlist/3mssqdrkVBB3GMLlt2A3HA'
const playlistEmbedUrl = (isDark) => `https://open.spotify.com/embed/playlist/3mssqdrkVBB3GMLlt2A3HA?utm_source=generator&theme=${isDark ? '0' : '1'}`

const OpmPlayer = () => {
  const { isDark } = useTheme()

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
      <iframe
        title="Filipino OPM favorites playlist on Spotify"
        src={playlistEmbedUrl(isDark)}
        width="100%"
        height="420"
        allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="eager"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <a className="playlist-direct-link" href={playlistUrl} target="_blank" rel="noopener noreferrer">
        <FaSpotify aria-hidden="true" /> Open full playlist on Spotify
      </a>
    </aside>
  )
}

export default OpmPlayer
