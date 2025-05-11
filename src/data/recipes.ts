import { Recipe, UserPreferences, Allergen, DietaryPreference, Deficiency, Cuisine } from "../types/recipe";

export const recipes: Recipe[] = [
  {
    id: "1",
    title: "Mediterranean Quinoa Salad",
    description: "A protein-rich quinoa salad with fresh vegetables and herbs, perfect for a light lunch or dinner.",
    cuisine: "mediterranean",
    dietary_tags: ["vegetarian", "gluten-free", "dairy-free"],
    allergen_free_tags: ["nuts", "gluten", "dairy", "eggs"],
    rich_in: ["protein", "fiber", "iron"],
    image: "/placeholder.svg",
    ingredients: [
      { name: "quinoa", quantity: "1", unit: "cup" },
      { name: "cucumber", quantity: "1", unit: "medium" },
      { name: "cherry tomatoes", quantity: "1", unit: "cup" },
      { name: "red onion", quantity: "1/4", unit: "cup" },
      { name: "kalamata olives", quantity: "1/3", unit: "cup" },
      { name: "fresh parsley", quantity: "1/4", unit: "cup" },
      { name: "olive oil", quantity: "3", unit: "tablespoons" },
      { name: "lemon juice", quantity: "2", unit: "tablespoons" },
      { name: "salt", quantity: "1/2", unit: "teaspoon" },
      { name: "black pepper", quantity: "1/4", unit: "teaspoon" }
    ],
    instructions: [
      "Rinse quinoa under cold water and drain.",
      "Cook quinoa according to package instructions and let cool.",
      "Dice cucumber, halve cherry tomatoes, and finely chop red onion.",
      "In a large bowl, combine quinoa, cucumber, tomatoes, red onion, and olives.",
      "Chop parsley and add to the bowl.",
      "In a small bowl, whisk together olive oil, lemon juice, salt, and pepper.",
      "Pour dressing over the salad and toss to combine.",
      "Serve immediately or refrigerate for up to 2 days."
    ],
    nutritional_info: {
      calories: 320,
      protein: "8g",
      carbs: "45g",
      fat: "12g",
      fiber: "6g",
      iron: "2.5mg"
    },
    prep_time: "15 minutes",
    cook_time: "20 minutes",
    servings: 4,
    youtube_query: "mediterranean quinoa salad recipe"
  },
  {
    id: "2",
    title: "Spinach and Lentil Curry",
    description: "A hearty, iron-rich curry that's both fulfilling and nutritious.",
    cuisine: "indian",
    dietary_tags: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
    allergen_free_tags: ["nuts", "gluten", "dairy", "eggs", "soy"],
    rich_in: ["iron", "protein", "fiber"],
    image: "/placeholder.svg",
    ingredients: [
      { name: "red lentils", quantity: "1", unit: "cup" },
      { name: "spinach", quantity: "4", unit: "cups" },
      { name: "onion", quantity: "1", unit: "medium" },
      { name: "garlic", quantity: "3", unit: "cloves" },
      { name: "ginger", quantity: "1", unit: "inch" },
      { name: "curry powder", quantity: "2", unit: "tablespoons" },
      { name: "cumin", quantity: "1", unit: "teaspoon" },
      { name: "turmeric", quantity: "1", unit: "teaspoon" },
      { name: "coconut milk", quantity: "1", unit: "can" },
      { name: "vegetable broth", quantity: "2", unit: "cups" },
      { name: "olive oil", quantity: "2", unit: "tablespoons" },
      { name: "salt", quantity: "1", unit: "teaspoon" }
    ],
    instructions: [
      "Rinse lentils and set aside.",
      "Chop onion, mince garlic and ginger.",
      "Heat olive oil in a large pot over medium heat.",
      "Add onion and sauté until translucent.",
      "Add garlic and ginger, cook for 1 minute.",
      "Add curry powder, cumin, and turmeric, stir for 30 seconds.",
      "Add lentils and vegetable broth, bring to a boil.",
      "Reduce heat and simmer for 15-20 minutes until lentils are tender.",
      "Add coconut milk and spinach, cook until spinach wilts.",
      "Season with salt to taste and serve with rice or naan."
    ],
    nutritional_info: {
      calories: 380,
      protein: "16g",
      carbs: "42g",
      fat: "18g",
      fiber: "12g",
      iron: "6mg"
    },
    prep_time: "10 minutes",
    cook_time: "30 minutes",
    servings: 4,
    youtube_query: "spinach lentil curry recipe"
  },
  {
    id: "3",
    title: "Keto Salmon with Avocado Salsa",
    description: "A delicious keto-friendly salmon dish topped with fresh avocado salsa, rich in omega-3 fatty acids.",
    cuisine: "american",
    dietary_tags: ["keto", "gluten-free", "dairy-free", "low-carb", "high-protein"],
    allergen_free_tags: ["gluten", "dairy", "nuts", "soy"],
    rich_in: ["protein", "omega3", "vitaminD"],
    image: "/placeholder.svg",
    ingredients: [
      { name: "salmon fillets", quantity: "4", unit: "6oz fillets" },
      { name: "avocado", quantity: "2", unit: "ripe" },
      { name: "lime", quantity: "1", unit: "medium" },
      { name: "cherry tomatoes", quantity: "1", unit: "cup" },
      { name: "red onion", quantity: "1/4", unit: "cup" },
      { name: "cilantro", quantity: "1/4", unit: "cup" },
      { name: "olive oil", quantity: "2", unit: "tablespoons" },
      { name: "garlic powder", quantity: "1", unit: "teaspoon" },
      { name: "salt", quantity: "1", unit: "teaspoon" },
      { name: "black pepper", quantity: "1/2", unit: "teaspoon" }
    ],
    instructions: [
      "Preheat oven to 400°F (200°C).",
      "Line a baking sheet with parchment paper.",
      "Place salmon fillets on the sheet and brush with 1 tablespoon olive oil.",
      "Season with salt, pepper, and garlic powder.",
      "Bake for 12-15 minutes until salmon flakes easily with a fork.",
      "While salmon is baking, dice avocados, quarter cherry tomatoes, and finely chop red onion and cilantro.",
      "In a bowl, combine avocados, tomatoes, red onion, and cilantro.",
      "Add lime juice, remaining olive oil, salt, and pepper, and gently mix.",
      "Serve salmon topped with avocado salsa."
    ],
    nutritional_info: {
      calories: 420,
      protein: "34g",
      carbs: "8g",
      fat: "28g",
      vitaminD: "15mcg",
      omega3: "1600mg"
    },
    prep_time: "15 minutes",
    cook_time: "15 minutes",
    servings: 4,
    youtube_query: "keto salmon avocado salsa"
  },
  {
    id: "4",
    title: "Calcium-Rich Tofu Stir Fry",
    description: "A vibrant stir fry featuring calcium-set tofu and bok choy for a nutritional boost.",
    cuisine: "asian",
    dietary_tags: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
    allergen_free_tags: ["dairy", "eggs", "fish", "shellfish"],
    rich_in: ["calcium", "protein", "iron", "vitaminC"],
    image: "/placeholder.svg",
    ingredients: [
      { name: "firm tofu", quantity: "14", unit: "oz" },
      { name: "bok choy", quantity: "3", unit: "cups" },
      { name: "broccoli", quantity: "2", unit: "cups" },
      { name: "red bell pepper", quantity: "1", unit: "medium" },
      { name: "carrots", quantity: "2", unit: "medium" },
      { name: "tamari or soy sauce", quantity: "3", unit: "tablespoons" },
      { name: "rice vinegar", quantity: "1", unit: "tablespoon" },
      { name: "sesame oil", quantity: "2", unit: "teaspoons" },
      { name: "fresh ginger", quantity: "1", unit: "tablespoon" },
      { name: "garlic", quantity: "2", unit: "cloves" },
      { name: "brown rice", quantity: "1", unit: "cup" }
    ],
    instructions: [
      "Press tofu to remove excess water, then cut into 1-inch cubes.",
      "Cook brown rice according to package instructions.",
      "Heat 1 teaspoon sesame oil in a large wok or skillet over medium-high heat.",
      "Add tofu cubes and cook until golden on all sides, about 5-7 minutes, then set aside.",
      "Add remaining sesame oil to the wok.",
      "Add minced ginger and garlic, stir for 30 seconds.",
      "Add chopped vegetables, starting with carrots, then broccoli, bell pepper, and finally bok choy.",
      "Stir fry for about 5-7 minutes until vegetables are crisp-tender.",
      "Return tofu to the wok, add tamari and rice vinegar, toss to combine.",
      "Serve over brown rice."
    ],
    nutritional_info: {
      calories: 340,
      protein: "18g",
      carbs: "45g",
      fat: "10g",
      fiber: "7g",
      calcium: "250mg",
      iron: "3mg",
      vitaminC: "85mg"
    },
    prep_time: "20 minutes",
    cook_time: "20 minutes",
    servings: 4,
    youtube_query: "tofu vegetable stir fry recipe"
  },
  {
    id: "5",
    title: "Vitamin-C Packed Berry Smoothie Bowl",
    description: "A refreshing smoothie bowl loaded with antioxidants and vitamin C to boost your immune system.",
    cuisine: "american",
    dietary_tags: ["vegetarian", "gluten-free"],
    allergen_free_tags: ["gluten", "eggs", "fish", "shellfish", "soy"],
    rich_in: ["vitaminC", "fiber", "vitaminA"],
    image: "/placeholder.svg",
    ingredients: [
      { name: "frozen mixed berries", quantity: "2", unit: "cups" },
      { name: "banana", quantity: "1", unit: "medium" },
      { name: "orange", quantity: "1", unit: "medium" },
      { name: "spinach", quantity: "1", unit: "cup" },
      { name: "Greek yogurt", quantity: "1/2", unit: "cup" },
      { name: "almond milk", quantity: "1/4", unit: "cup" },
      { name: "chia seeds", quantity: "1", unit: "tablespoon" },
      { name: "honey", quantity: "1", unit: "tablespoon" },
      { name: "granola", quantity: "1/4", unit: "cup" },
      { name: "sliced almonds", quantity: "2", unit: "tablespoons" },
      { name: "fresh berries", quantity: "1/4", unit: "cup" }
    ],
    instructions: [
      "In a blender, combine frozen berries, banana, peeled orange, spinach, Greek yogurt, almond milk, and honey.",
      "Blend until smooth and creamy. Add more almond milk if needed to reach desired consistency.",
      "Pour the smoothie into a bowl.",
      "Top with granola, sliced almonds, fresh berries, and chia seeds.",
      "Serve immediately and enjoy with a spoon."
    ],
    nutritional_info: {
      calories: 320,
      protein: "12g",
      carbs: "55g",
      fat: "8g",
      fiber: "10g",
      vitaminC: "120mg",
      vitaminA: "1500IU",
      calcium: "200mg"
    },
    prep_time: "10 minutes",
    cook_time: "0 minutes",
    servings: 2,
    youtube_query: "berry smoothie bowl recipe"
  }
];

export const getRandomRecipes = (count: number = 3): Recipe[] => {
  const shuffled = [...recipes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const filterRecipes = (preferences: Partial<UserPreferences>): Recipe[] => {
  let filteredRecipes = [...recipes];
  
  // Filter by dietary preferences
  if (preferences.dietary_preferences && preferences.dietary_preferences.length > 0) {
    filteredRecipes = filteredRecipes.filter((recipe) =>
      preferences.dietary_preferences!.some((pref) => recipe.dietary_tags.includes(pref))
    );
  }
  
  // Filter out recipes containing allergens
  if (preferences.allergies && preferences.allergies.length > 0) {
    filteredRecipes = filteredRecipes.filter((recipe) =>
      preferences.allergies!.every((allergen) => recipe.allergen_free_tags.includes(allergen))
    );
  }
  
  // Filter by nutritional needs
  if (preferences.deficiencies && preferences.deficiencies.length > 0) {
    filteredRecipes = filteredRecipes.filter((recipe) =>
      preferences.deficiencies!.some((deficiency) => recipe.rich_in.includes(deficiency))
    );
  }
  
  // Filter by preferred cuisines
  if (preferences.preferred_cuisines && preferences.preferred_cuisines.length > 0) {
    filteredRecipes = filteredRecipes.filter((recipe) =>
      preferences.preferred_cuisines!.includes(recipe.cuisine)
    );
  }
  
  // If no recipes match all criteria, return a subset of recipes that at least match some criteria
  if (filteredRecipes.length === 0) {
    return getRandomRecipes(3);
  }
  
  return filteredRecipes;
};

export const getRecipeById = (id: string): Recipe | undefined => {
  return recipes.find(recipe => recipe.id === id);
};

export const getAllergens = (): Allergen[] => [
  "nuts", "dairy", "gluten", "soy", "eggs", "fish", "shellfish", "wheat"
];

export const getDietaryPreferences = (): DietaryPreference[] => [
  "vegetarian", "vegan", "pescatarian", "keto", "paleo", "gluten-free", 
  "dairy-free", "low-carb", "high-protein"
];

export const getDeficiencies = (): Deficiency[] => [
  "iron", "calcium", "vitaminD", "vitaminC", "vitaminA", "fiber", "protein", "omega3"
];

export const getCuisines = (): Cuisine[] => [
  "italian", "mexican", "asian", "mediterranean", "american", 
  "indian", "french", "thai", "japanese", "greek"
];
