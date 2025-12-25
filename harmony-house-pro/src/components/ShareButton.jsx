import React, { useState } from 'react';

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'Harmony House',
      text: 'Restore order in the house.',
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.log('Share canceled');
    }
  };

  return (
    <button 
      onClick={handleShare} 
      style={styles.btn}
      title="Share Harmony"
    >
      {copied ? "✓ Copied" : "Share 🔗"}
    </button>
  );
}

const styles = {
  btn: {
    background: '#fdf6e3', // Cream paper color
    color: '#d48c96',       // Rose accent
    border: '1px solid #d48c96',
    padding: '8px 16px',
    borderRadius: '4px',    // Slight rounding, like a ticket
    fontFamily: 'Quicksand, sans-serif',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    cursor: 'pointer',
    boxShadow: '2px 2px 0px rgba(212, 140, 150, 0.4)', // Hard shadow for paper effect
    transition: 'transform 0.1s',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  }
};