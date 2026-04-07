'use client';

import { useState } from 'react';

export default function CtaSection({ game }) {
  const [showModal, setShowModal] = useState(false);
  const [showStoreLinks, setShowStoreLinks] = useState(false);

  const hasAndroid = !!game.androidUrl;
  const hasIos = !!game.iosUrl;

  if (!hasAndroid && !hasIos) return null;

  return (
    <>
      <div className="cta-section">
        <h3>Get {game.title}</h3>
        <div className="cta-icons">
          <div className="cta-icon-box games-icon">
            <span className="icon-letter">G</span>
            Games
          </div>
          <div className="cta-icon-box apps-icon">
            <span className="icon-letter">A</span>
            Apps
          </div>
        </div>
        <button className="cta-continue-btn" onClick={() => setShowModal(true)}>
          Continue
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => { setShowModal(false); setShowStoreLinks(false); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-inner">
              <button
                className="modal-close"
                onClick={() => { setShowModal(false); setShowStoreLinks(false); }}
                aria-label="Close"
              >
                ×
              </button>

              {!showStoreLinks ? (
                <>
                  <h3>{game.title}</h3>
                  <div className="cta-icons">
                    <div className="cta-icon-box games-icon">
                      <span className="icon-letter">G</span>
                      Games
                    </div>
                    <div className="cta-icon-box apps-icon">
                      <span className="icon-letter">A</span>
                      Apps
                    </div>
                  </div>
                  <button
                    className="cta-continue-btn"
                    onClick={() => setShowStoreLinks(true)}
                  >
                    Open Store Options
                  </button>
                </>
              ) : (
                <>
                  <h3>Choose Your Store</h3>
                  <p style={{ color: '#666', fontSize: '13px', marginBottom: '20px' }}>
                    Select where to download {game.title}
                  </p>
                  {hasAndroid && (
                    <a
                      href={game.androidUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="store-btn google-play"
                    >
                      <span className="store-icon">▶</span>
                      Open in Google Play
                    </a>
                  )}
                  {hasIos && (
                    <a
                      href={game.iosUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="store-btn app-store"
                    >
                      <span className="store-icon">A</span>
                      Open in App Store
                    </a>
                  )}
                  <button
                    style={{
                      marginTop: '12px',
                      fontSize: '13px',
                      color: '#999',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onClick={() => { setShowModal(false); setShowStoreLinks(false); }}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
