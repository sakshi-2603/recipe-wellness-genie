
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

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
    id: "video123", // This would be a real YouTube video ID
    title: `How to Make ${query}`,
    thumbnail: "/placeholder.svg"
  };
};

interface YouTubeTutorialProps {
  searchQuery: string;
}

const YouTubeTutorial: React.FC<YouTubeTutorialProps> = ({ searchQuery }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [video, setVideo] = useState<YouTubeVideo | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  // In a real app, this would embed an actual YouTube video
  // For now, we'll simulate the embed with a placeholder
  return (
    <div className="aspect-video w-full bg-muted relative rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center bg-black/5">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-primary/90 mx-auto flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">
            <div className="w-0 h-0 border-t-8 border-b-8 border-t-transparent border-b-transparent border-l-[16px] border-l-white ml-1"></div>
          </div>
          <p className="mt-4 text-foreground font-medium">{video.title}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Video tutorial simulation - In a real app, a YouTube video would play here
          </p>
        </div>
      </div>
    </div>
  );
};

export default YouTubeTutorial;
