
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { getRandomRecipes } from "@/data/recipes";
import { Recipe } from "@/types/recipe";
import { motion } from "framer-motion";
import RecipeCard from "@/components/recipe/RecipeCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { Smartphone, LayoutDashboard, Bookmark, Settings, User } from "lucide-react";
import Header from "@/components/Header";
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const [featuredRecipes] = useState<Recipe[]>(getRandomRecipes(3));
  const isMobile = useIsMobile();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Profile, Saved Recipes, and Settings */}
      <Header />

      {/* Hero Section - Now with background image */}
      <section className="relative py-16 md:py-24 bg-cover bg-center" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80")',
        backgroundBlendMode: 'overlay',
      }}>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-accent/60"></div>
        <div className="container px-4 mx-auto text-center relative z-10">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Healthy Recipes <span className="text-white">Tailored For You</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover personalized recipes based on your dietary needs, 
            preferences, and nutritional goals.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link to={user ? "/preferences" : "/auth"}>
                {user ? "Get Started" : "Sign In to Get Started"}
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Mobile Dashboard Section - Appears only on mobile */}
      {isMobile && (
        <section className="py-6 px-4">
          <div className="flex justify-between items-center overflow-x-auto pb-4 gap-3">
            <Card className="w-32 flex-shrink-0 bg-primary/10">
              <CardContent className="p-3 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mb-2">
                  <Smartphone className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs font-medium">My Recipes</span>
              </CardContent>
            </Card>

            <Card className="w-32 flex-shrink-0 bg-secondary/10">
              <CardContent className="p-3 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mb-2">
                  <LayoutDashboard className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs font-medium">Weekly Plan</span>
              </CardContent>
            </Card>

            <Card className="w-32 flex-shrink-0 bg-accent/10">
              <CardContent className="p-3 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mb-2">
                  <Bookmark className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs font-medium">Favorites</span>
              </CardContent>
            </Card>

            <Card className="w-32 flex-shrink-0 bg-muted">
              <CardContent className="p-3 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-muted-foreground flex items-center justify-center mb-2">
                  <User className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs font-medium">Profile</span>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Features Section - Now with images */}
      <section className="py-16 container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-card/50 backdrop-blur border-primary/10 shadow-sm overflow-hidden">
            <div className="h-40 bg-cover bg-center" style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1591338579611-3225f8f64e35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")'
            }}></div>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 -mt-14 border-4 border-card">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Share Your Preferences</h3>
              <p className="text-muted-foreground">
                Tell us about your dietary preferences, allergies, and nutritional needs.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-primary/10 shadow-sm overflow-hidden">
            <div className="h-40 bg-cover bg-center" style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")'
            }}></div>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 -mt-14 border-4 border-card">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Personalized Recipes</h3>
              <p className="text-muted-foreground">
                We'll generate healthy recipes that match your unique requirements.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-primary/10 shadow-sm overflow-hidden">
            <div className="h-40 bg-cover bg-center" style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")'
            }}></div>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 -mt-14 border-4 border-card">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Cook & Enjoy</h3>
              <p className="text-muted-foreground">
                Follow step-by-step instructions, check video tutorials, and download shopping lists.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Recipes Section - Now with improved mobile layout */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Healthy Recipes</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to={user ? "/preferences" : "/auth"}>
                {user ? "Find Your Perfect Recipe" : "Sign In to Find Recipes"}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section - Only visible on larger screens */}
      {!isMobile && (
        <section className="py-16 container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Your Recipe Dashboard</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Track your favorite recipes, plan your meals, and manage your nutrition all in one place
          </p>
          
          <div className="relative mx-auto max-w-4xl">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-border">
              <img 
                src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
                alt="Dashboard Preview" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">Personalized Dashboard</h3>
                  <p className="mb-4">Access all your favorite recipes and meal plans on any device</p>
                  <Button asChild>
                    <Link to={user ? "/preferences" : "/auth"}>
                      {user ? "Start Now" : "Sign In to Start"}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer Section with Legal Disclaimer */}
      <footer className="bg-card py-10">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground mb-6">
            <h3 className="font-semibold mb-2">Legal Disclaimer</h3>
            <p>
              This application is not a substitute for professional medical advice. 
              Always verify ingredients for allergens and consult with healthcare 
              professionals regarding specific dietary requirements.
            </p>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 Healthy Recipe Generator | All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
