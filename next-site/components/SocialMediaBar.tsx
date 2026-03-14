const INSTAGRAM_URL = "https://www.instagram.com/trabzonvaristedavisi/";

export function SocialMediaBar() {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="social-media-bar"
    >
      <span className="social-media-bar-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      </span>
      <div className="social-media-bar-text">
        <span className="social-media-bar-title">SOSYAL MEDYA</span>
        <span className="social-media-bar-desc">Bizi Instagram&apos;dan takip edin</span>
      </div>
      <span className="social-media-bar-arrow" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </span>
    </a>
  );
}
