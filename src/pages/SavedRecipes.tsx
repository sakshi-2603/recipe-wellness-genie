
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { LogOut, Settings, User } from "lucide-react";

const SavedRecipes = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const goToSettings = (e) => {
    e.preventDefault();
    navigate("/settings");
  };

  const goToHome = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      
      <main className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold">Profile</h1>
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            <Button 
              variant="outline" 
              onClick={goToSettings}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            
            <Button 
              variant="destructive" 
              onClick={handleSignOut}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
              ) : (
                <LogOut className="h-4 w-4" />
              )}
              Sign Out
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Your account details and saved recipes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">{user?.email}</p>
                <p className="text-sm text-muted-foreground">Account member since {new Date(user?.created_at || "").toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Saved Recipes</h3>
              <div className="bg-muted/50 rounded-md p-6 text-center">
                <p className="text-muted-foreground">You don't have any saved recipes yet.</p>
                <Button 
                  variant="link"
                  onClick={goToHome}
                  className="mt-2"
                >
                  Browse recipes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SavedRecipes;
