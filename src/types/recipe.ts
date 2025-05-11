
export interface Ingredient {
  name: string;
  quantity: string;
  unit?: string;
}

export interface NutritionalInfo {
  calories: number;
  protein?: string;
  carbs?: string;
  fat?: string;
  fiber?: string;
  iron?: string;
  calcium?: string;
  vitaminD?: string;
  vitaminC?: string;
  vitaminA?: string;
}

export type DietaryPreference = 
  | "vegetarian"
  | "vegan"
  | "pescatarian"
  | "keto"
  | "paleo"
  | "gluten-free"
  | "dairy-free"
  | "low-carb"
  | "high-protein";

export type Allergen = 
  | "nuts"
  | "dairy"
  | "gluten"
  | "soy"
  | "eggs"
  | "fish"
  | "shellfish"
  | "wheat";

export type Deficiency = 
  | "iron"
  | "calcium"
  | "vitaminD"
  | "vitaminC"
  | "vitaminA"
  | "fiber"
  | "protein"
  | "omega3";

export type Cuisine = 
  | "italian"
  | "mexican"
  | "asian"
  | "mediterranean"
  | "american"
  | "indian"
  | "french"
  | "thai"
  | "japanese"
  | "greek";

export interface Recipe {
  id: string;
  title: string;
  description: string;
  cuisine: Cuisine;
  dietary_tags: DietaryPreference[];
  allergen_free_tags: Allergen[];
  rich_in: Deficiency[];
  image?: string;
  ingredients: Ingredient[];
  instructions: string[];
  nutritional_info: NutritionalInfo;
  prep_time: string;
  cook_time: string;
  servings: number;
  youtube_query?: string;
}

export interface UserPreferences {
  dietary_preferences: DietaryPreference[];
  allergies: Allergen[];
  deficiencies: Deficiency[];
  preferred_cuisines: Cuisine[];
  age?: number;
  gender?: "male" | "female" | "other";
  activity_level?: "sedentary" | "moderate" | "active" | "very_active";
}
