
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mb-2">Page not found</p>
        <p className="text-muted-foreground mb-6">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button 
            variant="default"
            onClick={() => navigate("/")}
            className="w-full sm:w-auto"
          >
            Go to Homepage
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
