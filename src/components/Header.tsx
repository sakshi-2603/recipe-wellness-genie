
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bookmark, Settings, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = async (e) => {
    if (e) e.preventDefault();
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  
  const handleNavigation = (e, path) => {
    if (e) e.preventDefault();
    navigate(path);
  };
  
  return (
    <header className="container px-4 mx-auto py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">
        <Link to="/" onClick={(e) => handleNavigation(e, "/")} className="hover:opacity-80 transition-opacity">
          Healthy Recipes
        </Link>
      </h1>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Button variant="ghost" size="icon" onClick={(e) => handleNavigation(e, "/saved")}>
              <Bookmark className="h-5 w-5" />
              <span className="sr-only">Saved Recipes</span>
            </Button>
            
            <Button variant="ghost" size="icon" onClick={(e) => handleNavigation(e, "/settings")}>
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.user_metadata?.avatar_url || ""} alt={user.email || "User"} />
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="p-2 text-sm">
                  <p className="font-medium">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={(e) => handleNavigation(e, "/settings")} className="cursor-pointer">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => handleNavigation(e, "/saved")} className="cursor-pointer">
                  Saved Recipes
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-500">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Button onClick={(e) => handleNavigation(e, "/auth")} variant="default">
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
