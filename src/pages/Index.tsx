
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChefHat, Heart, Settings, User } from "lucide-react";
import Header from "@/components/Header";
import APIKeyStatus from "@/components/APIKeyStatus";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Personalized Nutrition at Your Fingertips
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Discover recipes tailored to your dietary needs and preferences
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link to="/preferences">Get Started</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <ChefHat className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-medium text-center mb-2">Smart Recipe Engine</h3>
            <p className="text-center text-muted-foreground">
              Our AI-powered system creates recipes that perfectly match your dietary needs and preferences.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Heart className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-medium text-center mb-2">Personalized Nutrition</h3>
            <p className="text-center text-muted-foreground">
              Address specific dietary preferences and nutritional deficiencies with targeted recipes.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Settings className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-medium text-center mb-2">Customizable Experience</h3>
            <p className="text-center text-muted-foreground">
              Fine-tune your preferences and create a completely personalized cooking journey.
            </p>
          </div>
        </div>
        
        <div className="max-w-md mx-auto mb-12">
          <APIKeyStatus />
        </div>
        
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Get Started in 3 Simple Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Set Preferences</h3>
              <p className="text-muted-foreground">Tell us about your dietary needs and preferences</p>
            </div>
            
            <div>
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Get Recipes</h3>
              <p className="text-muted-foreground">Receive personalized recipe recommendations</p>
            </div>
            
            <div>
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Cook & Enjoy</h3>
              <p className="text-muted-foreground">Follow easy instructions and enjoy nutritious meals</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
