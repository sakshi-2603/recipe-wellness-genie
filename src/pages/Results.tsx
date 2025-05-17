
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RecipeCard from "@/components/recipe/RecipeCard";
import { Recipe, UserPreferences } from "@/types/recipe";
import { filterRecipes } from "@/data/recipes";
import { ArrowLeft, Loader2, RefreshCw, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [fallbackMode, setFallbackMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!location.state?.preferences) {
      // If no preferences are provided, redirect to preferences page
      navigate("/preferences");
      return;
    }

    setPreferences(location.state.preferences);
    
    // Simulate API call with loading state
    setIsLoading(true);
    setTimeout(() => {
      const filteredRecipes = filterRecipes(location.state.preferences);
      setRecipes(filteredRecipes);
      setIsLoading(false);
    }, 1500);
  }, [location.state, navigate]);

  const generateAIRecipes = async () => {
    if (!preferences) return;
    
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-recipes', {
        body: { preferences }
      });
      
      if (error) {
        console.error("Error generating recipes:", error);
        toast({
          title: "Generation Failed",
          description: "Failed to generate AI recipes. Please try again.",
          variant: "destructive"
        });
        return;
      }
      
      // Check if we're using fallback recipes
      if (data && data.fallback) {
        setFallbackMode(true);
        toast({
          title: "Using Fallback Recipes",
          description: "AI generation is currently unavailable. Using pre-defined recipes instead.",
        });
      }
      
      // Merge AI-generated recipes with existing ones
      if (data && data.recipes && Array.isArray(data.recipes)) {
        // Add a flag to indicate AI-generated recipes
        const aiRecipes = data.recipes.map(recipe => ({
          ...recipe,
          isAIGenerated: true
        }));
        
        setRecipes(prevRecipes => [...aiRecipes, ...prevRecipes]);
        
        if (!data.fallback) {
          toast({
            title: "Recipes Generated",
            description: `Successfully generated ${data.recipes.length} new recipes.`,
          });
        }
      }
    } catch (error) {
      console.error("Error in AI recipe generation:", error);
      toast({
        title: "Generation Failed",
        description: "Something went wrong. Please try again later.",
        variant: "destructive"
      });
      setFallbackMode(true);
    } finally {
      setIsGenerating(false);
    }
  };

  const getPreferenceSummary = () => {
    if (!preferences) return "";
    
    const summaries = [];
    
    if (preferences.dietary_preferences?.length) {
      summaries.push(
        preferences.dietary_preferences.length > 1
          ? `${preferences.dietary_preferences.length} dietary preferences`
          : preferences.dietary_preferences[0].replace(/-/g, ' ')
      );
    }
    
    if (preferences.allergies?.length) {
      summaries.push(
        `${preferences.allergies.length} ${preferences.allergies.length > 1 ? 'allergens' : 'allergen'} avoided`
      );
    }
    
    if (preferences.deficiencies?.length) {
      summaries.push(
        `focus on ${preferences.deficiencies.length} ${preferences.deficiencies.length > 1 ? 'nutrients' : 'nutrient'}`
      );
    }
    
    return summaries.join(", ");
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/preferences")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Preferences
        </Button>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Personalized Recipes</h1>
            {preferences && (
              <p className="text-muted-foreground">
                Based on: {getPreferenceSummary()}
              </p>
            )}
          </div>
          
          <Button 
            onClick={generateAIRecipes} 
            disabled={isGenerating || isLoading}
            className="ml-4"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate AI Recipes
              </>
            )}
          </Button>
        </div>

        {fallbackMode && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <AlertTriangle className="h-6 w-6 text-yellow-500 mr-3" />
              <p className="text-sm text-yellow-700">
                Our AI recipe generation is currently limited. Showing pre-defined recipes that match your preferences.
              </p>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg">Finding the perfect recipes for you...</p>
          </div>
        ) : recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-2">No Recipes Found</h2>
            <p className="text-muted-foreground mb-6">
              We couldn't find any recipes that match all your criteria. Try adjusting your preferences.
            </p>
            <Button onClick={() => navigate("/preferences")}>
              Adjust Preferences
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
