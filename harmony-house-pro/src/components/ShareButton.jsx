import { Share2 } from 'lucide-react'; // Icon library

export default function ShareButton() {
  const handleShare = async () => {
    const shareData = {
      title: 'Harmony House',
      text: 'I just reorganized the kitchen! Can you beat my zen?',
      url: window.location.href
    };

    if (navigator.share) {
      // Use the native mobile share sheet
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      // Fallback for Desktop (Copy to clipboard)
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <button onClick={handleShare} className="icon-btn">
      <Share2 size={24} />
    </button>
  );
}