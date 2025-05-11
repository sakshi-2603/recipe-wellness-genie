
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { getRandomRecipes } from "@/data/recipes";
import { Recipe } from "@/types/recipe";
import { motion } from "framer-motion";
import RecipeCard from "@/components/recipe/RecipeCard";

const Index = () => {
  const [featuredRecipes] = useState<Recipe[]>(getRandomRecipes(3));

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/20 to-accent/30 py-16 md:py-24">
        <div className="container px-4 mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Healthy Recipes <span className="text-primary">Tailored For You</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-foreground/80"
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
              <Link to="/preferences">Get Started</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-card/50 backdrop-blur border-primary/10 shadow-sm">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Share Your Preferences</h3>
              <p className="text-muted-foreground">
                Tell us about your dietary preferences, allergies, and nutritional needs.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-primary/10 shadow-sm">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Personalized Recipes</h3>
              <p className="text-muted-foreground">
                We'll generate healthy recipes that match your unique requirements.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-primary/10 shadow-sm">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
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

      {/* Featured Recipes Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Healthy Recipes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/preferences">Find Your Perfect Recipe</Link>
            </Button>
          </div>
        </div>
      </section>

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
