
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Play, Youtube } from "lucide-react";

// Mock YouTube search response
interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
}

// In a real app, this would come from an API call
const mockYouTubeSearch = async (query: string): Promise<YouTubeVideo | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simulate a successful API response
  // In a real app, you'd make an actual API call here
  return {
    id: "dA8DsUN6g_k", // Real YouTube video ID for cooking videos
    title: `How to Make ${query}`,
    thumbnail: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80"
  };
};

interface YouTubeTutorialProps {
  searchQuery: string;
}

const YouTubeTutorial: React.FC<YouTubeTutorialProps> = ({ searchQuery }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [video, setVideo] = useState<YouTubeVideo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await mockYouTubeSearch(searchQuery);
        setVideo(result);
      } catch (err) {
        setError("Failed to load video tutorial");
        console.error("YouTube search error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [searchQuery]);

  if (loading) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
          <p>Loading video tutorial...</p>
        </CardContent>
      </Card>
    );
  }

  if (error || !video) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <h3 className="text-lg font-medium mb-2">Video Tutorial Not Available</h3>
            <p className="text-muted-foreground">
              We couldn't find a video tutorial for this recipe. Try searching on YouTube for "{searchQuery}".
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // When play is clicked, show an embedded YouTube video
  if (playing) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-lg">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="aspect-video"
        ></iframe>
      </div>
    );
  }

  // Display video thumbnail with play button when not playing
  return (
    <div 
      className="aspect-video w-full bg-muted relative rounded-lg overflow-hidden cursor-pointer"
      onClick={() => setPlaying(true)}
    >
      <img 
        src={video.thumbnail} 
        alt={video.title} 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-primary/90 mx-auto flex items-center justify-center hover:bg-primary transition-colors">
            <Play className="h-8 w-8 text-white ml-1" />
          </div>
          <p className="mt-4 text-white font-medium text-lg">{video.title}</p>
          <div className="flex items-center justify-center mt-2">
            <Youtube className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-white text-sm">Click to play video</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubeTutorial;
