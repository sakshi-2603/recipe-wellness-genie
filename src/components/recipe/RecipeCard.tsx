
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, UtensilsCrossed } from "lucide-react";
import { Recipe } from "@/data/recipes";
import { Link } from "react-router-dom";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
      <div className="aspect-video w-full bg-muted/60 relative overflow-hidden">
        <img
          src={recipe.image || "/placeholder.svg"}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        {recipe.dietary_tags.slice(0, 1).map((tag) => (
          <Badge key={tag} className="absolute top-2 right-2 bg-primary">
            {tag.charAt(0).toUpperCase() + tag.slice(1)}
          </Badge>
        ))}
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle>{recipe.title}</CardTitle>
        <CardDescription className="line-clamp-2">{recipe.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-3 flex-grow">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{recipe.prep_time} + {recipe.cook_time}</span>
          </div>
          <div className="flex items-center gap-1">
            <UtensilsCrossed className="w-4 h-4" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {recipe.dietary_tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {recipe.dietary_tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{recipe.dietary_tags.length - 3} more
            </Badge>
          )}
        </div>

        <div className="text-xs flex gap-x-2 gap-y-1 flex-wrap">
          <span className="font-medium">Rich in:</span> 
          {recipe.rich_in.map((nutrient, i) => (
            <span key={nutrient}>
              {nutrient.replace(/([A-Z])/g, ' $1').toLowerCase()}
              {i < recipe.rich_in.length - 1 ? ',' : ''}
            </span>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button asChild className="w-full">
          <Link to={`/recipe/${recipe.id}`}>View Recipe</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
