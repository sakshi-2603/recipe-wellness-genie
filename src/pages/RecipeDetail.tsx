
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Recipe } from "@/types/recipe";
import { getRecipeById } from "@/data/recipes";
import { ArrowLeft, Clock, Download, Printer, Share2, UtensilsCrossed } from "lucide-react";
import YouTubeTutorial from "@/components/recipe/YouTubeTutorial";
import ShoppingList from "@/components/recipe/ShoppingList";
import NotFound from "./NotFound";

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"recipe" | "shopping">("recipe");

  useEffect(() => {
    // Fetch recipe based on ID
    if (id) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const foundRecipe = getRecipeById(id);
        setRecipe(foundRecipe || null);
        setLoading(false);
      }, 500);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <h2 className="text-2xl font-semibold">Loading recipe...</h2>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return <NotFound />;
  }

  const handlePrint = () => {
    window.print();
  };

  const handleShareRecipe = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: `Check out this healthy recipe: ${recipe.title}`,
        url: window.location.href,
      }).catch((err) => {
        console.error("Error sharing:", err);
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard");
    }
  };

  // Default image if none provided
  const recipeImage = recipe.image && recipe.image !== "/placeholder.svg" 
    ? recipe.image 
    : "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80";

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <Button
          variant="ghost"
          className="mb-6 print:hidden"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recipe Main Content - 2/3 width on larger screens */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-3">{recipe.title}</h1>
              <p className="text-muted-foreground mb-4">{recipe.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {recipe.dietary_tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag.replace(/-/g, ' ')}
                  </Badge>
                ))}
              </div>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Prep: {recipe.prep_time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Cook: {recipe.cook_time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>{recipe.servings} servings</span>
                </div>
              </div>
            </div>
            
            {/* Tabs for Recipe/Shopping List */}
            <div className="flex border-b mb-6 print:hidden">
              <button
                onClick={() => setActiveTab("recipe")}
                className={`pb-2 px-4 font-medium ${
                  activeTab === "recipe"
                    ? "border-b-2 border-primary text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                Recipe
              </button>
              <button
                onClick={() => setActiveTab("shopping")}
                className={`pb-2 px-4 font-medium ${
                  activeTab === "shopping"
                    ? "border-b-2 border-primary text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                Shopping List
              </button>
            </div>

            {activeTab === "recipe" ? (
              <>
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
                  <Card>
                    <CardContent className="pt-6">
                      <ul className="space-y-2">
                        {recipe.ingredients.map((ingredient, index) => (
                          <li key={index} className="flex items-baseline gap-2">
                            <span className="inline-block w-5 h-5 rounded-full border flex-shrink-0 mt-0.5" />
                            <span>
                              <strong>{ingredient.quantity} {ingredient.unit}</strong> {ingredient.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Instructions</h2>
                  <Card>
                    <CardContent className="pt-6">
                      <ol className="space-y-4">
                        {recipe.instructions.map((instruction, index) => (
                          <li key={index} className="flex items-baseline gap-3">
                            <span className="bg-primary/10 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                              {index + 1}
                            </span>
                            <span>{instruction}</span>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Video Tutorial</h2>
                  {recipe.youtube_query ? (
                    <YouTubeTutorial searchQuery={recipe.youtube_query} />
                  ) : (
                    <YouTubeTutorial searchQuery={`${recipe.title} recipe`} />
                  )}
                </div>
              </>
            ) : (
              <ShoppingList recipe={recipe} />
            )}
          </div>

          {/* Sidebar - 1/3 width on larger screens */}
          <div className="lg:col-span-1 print:hidden">
            <div className="sticky top-8">
              {/* Recipe image */}
              <Card className="overflow-hidden mb-6">
                <div className="aspect-video w-full bg-muted relative">
                  <img
                    src={recipeImage}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Card>
              
              {/* Nutritional Info */}
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Nutritional Information</h3>
                  <Separator className="my-2" />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Calories:</span>
                      <span className="font-medium">{recipe.nutritional_info.calories} kcal</span>
                    </div>
                    
                    {recipe.nutritional_info.protein && (
                      <div className="flex justify-between">
                        <span>Protein:</span>
                        <span className="font-medium">{recipe.nutritional_info.protein}</span>
                      </div>
                    )}
                    
                    {recipe.nutritional_info.carbs && (
                      <div className="flex justify-between">
                        <span>Carbs:</span>
                        <span className="font-medium">{recipe.nutritional_info.carbs}</span>
                      </div>
                    )}
                    
                    {recipe.nutritional_info.fat && (
                      <div className="flex justify-between">
                        <span>Fat:</span>
                        <span className="font-medium">{recipe.nutritional_info.fat}</span>
                      </div>
                    )}
                    
                    {recipe.nutritional_info.fiber && (
                      <div className="flex justify-between">
                        <span>Fiber:</span>
                        <span className="font-medium">{recipe.nutritional_info.fiber}</span>
                      </div>
                    )}
                    
                    {Object.entries(recipe.nutritional_info)
                      .filter(([key]) => !["calories", "protein", "carbs", "fat", "fiber"].includes(key))
                      .map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span>{key.replace(/([A-Z])/g, ' $1').toLowerCase()}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))
                    }
                  </div>
                </CardContent>
              </Card>
              
              {/* Rich in nutrients */}
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Rich In</h3>
                  <Separator className="my-2" />
                  <div className="flex flex-wrap gap-2">
                    {recipe.rich_in.map((nutrient) => (
                      <Badge key={nutrient} variant="secondary" className="capitalize">
                        {nutrient.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Action buttons */}
              <div className="flex flex-col gap-3">
                <Button onClick={handlePrint} variant="outline" className="w-full">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Recipe
                </Button>
                <Button onClick={() => setActiveTab("shopping")} variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Shopping List
                </Button>
                <Button onClick={handleShareRecipe} variant="outline" className="w-full">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Recipe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
