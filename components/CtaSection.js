export default function CtaSection({ game }) {
  const hasAndroid = !!game.androidUrl;
  const hasIos = !!game.iosUrl;

  if (!hasAndroid && !hasIos) return null;

  return (
    <div className="download-section">
      <div className="download-section-header">
        <h3>Download The App</h3>
        <div className="download-section-bar" />
      </div>
      <div className={`download-buttons ${hasAndroid && hasIos ? 'two-cols' : 'one-col'}`}>
        {hasAndroid && (
          <a
            href={game.androidUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="download-btn download-btn-google"
            aria-label={`Download ${game.title} from Google Play`}
          >
            <div className="download-btn-icon">
              <svg viewBox="0 0 48 48" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="gp-a" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#00c3ff" />
                    <stop offset="1" stopColor="#1a73e8" />
                  </linearGradient>
                  <linearGradient id="gp-b" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#ffd400" />
                    <stop offset="1" stopColor="#ff8e00" />
                  </linearGradient>
                  <linearGradient id="gp-c" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#ff3a44" />
                    <stop offset="1" stopColor="#c31162" />
                  </linearGradient>
                  <linearGradient id="gp-d" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#00a971" />
                    <stop offset="1" stopColor="#00f076" />
                  </linearGradient>
                </defs>
                <path d="M8 6.2v35.6c0 .9.5 1.7 1.3 2.1l20-19.9-20-19.9c-.8.4-1.3 1.2-1.3 2.1z" fill="url(#gp-a)" />
                <path d="M36.6 17.3l-5.6-3.2-5.7 5.6 5.7 5.7 5.6-3.2c1.6-.9 1.6-3 0-3.9z" fill="url(#gp-b)" />
                <path d="M9.3 43.9c.6.3 1.4.2 2-.1l20-11.4-4.3-4.3z" fill="url(#gp-c)" />
                <path d="M9.3 4.1l17.7 17.7 4.3-4.3-20-11.4c-.6-.3-1.4-.4-2 0z" fill="url(#gp-d)" />
              </svg>
            </div>
            <div className="download-btn-text">
              <div className="download-btn-title">Google Play</div>
              <div className="download-btn-subtitle">Download from Google Play</div>
            </div>
          </a>
        )}
        {hasIos && (
          <a
            href={game.iosUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="download-btn download-btn-apple"
            aria-label={`Download ${game.title} from App Store`}
          >
            <div className="download-btn-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" xmlns="http://www.w3.org/2000/svg" fill="#111">
                <path d="M17.05 12.536c-.017-3.127 2.553-4.635 2.67-4.707-1.456-2.127-3.723-2.418-4.525-2.451-1.926-.195-3.762 1.135-4.74 1.135-.978 0-2.484-1.108-4.083-1.077-2.1.031-4.039 1.222-5.121 3.103-2.186 3.79-.559 9.392 1.57 12.469 1.041 1.507 2.28 3.196 3.897 3.137 1.569-.062 2.164-1.016 4.059-1.016 1.895 0 2.427 1.016 4.083.979 1.686-.029 2.755-1.533 3.782-3.053 1.194-1.75 1.684-3.447 1.708-3.535-.038-.017-3.274-1.257-3.3-4.984zM13.83 3.388C14.679 2.352 15.255.918 15.098-.5c-1.217.049-2.69.814-3.569 1.846-.787.915-1.478 2.373-1.293 3.765 1.359.104 2.741-.691 3.594-1.723z" />
              </svg>
            </div>
            <div className="download-btn-text">
              <div className="download-btn-title">iOS</div>
              <div className="download-btn-subtitle">Download from App Store</div>
            </div>
          </a>
        )}
      </div>
    </div>
  );
}
