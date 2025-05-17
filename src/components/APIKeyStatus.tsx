
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const APIKeyStatus = () => {
  const [status, setStatus] = useState<"checking" | "valid" | "invalid" | "unknown">("unknown");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const checkAPIKey = async () => {
    setIsLoading(true);
    setStatus("checking");
    try {
      // We'll send a minimal test request to the API
      const { data, error } = await supabase.functions.invoke('generate-recipes', {
        body: { 
          preferences: {
            dietary_preferences: ["vegetarian"],
            allergies: [],
            deficiencies: ["protein"],
            preferred_cuisines: ["italian"]
          },
          testMode: true // This flag tells the function it's just a test
        }
      });
      
      if (error) {
        console.error("Error checking API key:", error);
        setStatus("invalid");
        setMessage("Could not verify API key status: " + error.message);
        return;
      }
      
      if (data?.apiKeyStatus === "valid") {
        setStatus("valid");
        setMessage("OpenAI API key is valid and working");
      } else if (data?.fallback) {
        setStatus("invalid");
        setMessage("Using fallback recipes - API key may be missing or invalid");
      } else {
        setStatus("unknown");
        setMessage("Could not determine API key status");
      }
    } catch (error) {
      console.error("Error in API key verification:", error);
      setStatus("unknown");
      setMessage("Error checking API key status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-2">OpenAI API Key Status</h3>
      
      <div className="flex items-center mb-4">
        {status === "checking" || isLoading ? (
          <Loader2 className="h-5 w-5 text-blue-500 animate-spin mr-2" />
        ) : status === "valid" ? (
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
        ) : status === "invalid" ? (
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
        ) : (
          <AlertCircle className="h-5 w-5 text-gray-500 mr-2" />
        )}
        
        <span className={`
          ${status === "valid" ? "text-green-600" : ""}
          ${status === "invalid" ? "text-red-600" : ""}
          ${status === "unknown" ? "text-gray-600" : ""}
        `}>
          {status === "checking" 
            ? "Checking API key status..." 
            : status === "unknown" 
              ? "API key status unknown" 
              : message}
        </span>
      </div>

      <Button 
        onClick={checkAPIKey} 
        disabled={isLoading}
        variant="secondary"
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Checking...
          </>
        ) : (
          "Check API Key Status"
        )}
      </Button>
    </div>
  );
};

export default APIKeyStatus;
