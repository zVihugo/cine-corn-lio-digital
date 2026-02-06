import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrailerModalProps {
  trailerUrl: string;
  movieTitle: string;
  onClose: () => void;
}

const TrailerModal = ({ trailerUrl, movieTitle, onClose }: TrailerModalProps) => {
  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/
    );
    return match ? match[1] : null;
  };

  const videoId = getYouTubeId(trailerUrl);

  if (!videoId) {
    // If not a YouTube URL, open in new tab
    window.open(trailerUrl, "_blank");
    onClose();
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-5xl mx-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-primary"
        >
          <X className="w-8 h-8" />
        </Button>
        
        <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={`Trailer - ${movieTitle}`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        
        <p className="text-center text-white/70 mt-4 text-sm">
          {movieTitle}
        </p>
      </div>
    </div>
  );
};

export default TrailerModal;
