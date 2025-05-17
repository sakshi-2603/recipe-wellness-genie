import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Define types directly in the edge function instead of importing
interface Ingredient {
  name: string;
  quantity: string;
  unit?: string;
}

interface NutritionalInfo {
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
  omega3?: string;
}

type DietaryPreference = 
  | "vegetarian"
  | "vegan"
  | "pescatarian"
  | "keto"
  | "paleo"
  | "gluten-free"
  | "dairy-free"
  | "low-carb"
  | "high-protein";

type Allergen = 
  | "nuts"
  | "dairy"
  | "gluten"
  | "soy"
  | "eggs"
  | "fish"
  | "shellfish"
  | "wheat";

type Deficiency = 
  | "iron"
  | "calcium"
  | "vitaminD"
  | "vitaminC"
  | "vitaminA"
  | "fiber"
  | "protein"
  | "omega3";

type Cuisine = 
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

interface UserPreferences {
  dietary_preferences: DietaryPreference[];
  allergies: Allergen[];
  deficiencies: Deficiency[];
  preferred_cuisines: Cuisine[];
  age?: number;
  gender?: "male" | "female" | "other";
  activity_level?: "sedentary" | "moderate" | "active" | "very_active";
}

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Fallback recipes that can be filtered based on preferences
const fallbackRecipes = [
  {
    id: "ai-fallback-1",
    title: "Quinoa Power Bowl",
    description: "A nutrient-dense bowl filled with protein-rich quinoa, fresh vegetables, and a zesty dressing.",
    cuisine: "mediterranean",
    dietary_tags: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
    allergen_free_tags: ["dairy", "gluten", "eggs", "fish", "shellfish"],
    rich_in: ["protein", "fiber", "iron"],
    ingredients: [
      {name: "quinoa", quantity: "1", unit: "cup"},
      {name: "kale", quantity: "2", unit: "cups"},
      {name: "chickpeas", quantity: "1", unit: "cup"},
      {name: "avocado", quantity: "1", unit: "medium"},
      {name: "cherry tomatoes", quantity: "1", unit: "cup"},
      {name: "cucumber", quantity: "1", unit: "medium"},
      {name: "olive oil", quantity: "2", unit: "tablespoons"},
      {name: "lemon juice", quantity: "2", unit: "tablespoons"},
      {name: "salt", quantity: "1/2", unit: "teaspoon"},
      {name: "black pepper", quantity: "1/4", unit: "teaspoon"}
    ],
    instructions: [
      "Cook quinoa according to package instructions and let it cool.",
      "Chop kale, cucumber, and halve the cherry tomatoes.",
      "Drain and rinse chickpeas.",
      "Slice the avocado.",
      "In a small bowl, whisk together olive oil, lemon juice, salt, and pepper.",
      "In a large bowl, combine quinoa, kale, chickpeas, tomatoes, and cucumber.",
      "Pour dressing over the salad and toss to combine.",
      "Top with sliced avocado and serve."
    ],
    nutritional_info: {
      calories: 380,
      protein: "15g",
      carbs: "45g",
      fat: "16g",
      fiber: "12g",
      iron: "4mg"
    },
    prep_time: "15 minutes",
    cook_time: "20 minutes",
    servings: 4
  },
  {
    id: "ai-fallback-2",
    title: "Calcium-Rich Tofu Stir Fry",
    description: "A colorful and nutritious stir fry packed with calcium from tofu and vegetables.",
    cuisine: "asian",
    dietary_tags: ["vegetarian", "vegan", "dairy-free"],
    allergen_free_tags: ["dairy", "fish", "shellfish", "eggs"],
    rich_in: ["calcium", "protein", "vitaminC", "iron"],
    ingredients: [
      {name: "firm tofu", quantity: "1", unit: "block"},
      {name: "broccoli", quantity: "2", unit: "cups"},
      {name: "bok choy", quantity: "2", unit: "cups"},
      {name: "red bell pepper", quantity: "1", unit: "medium"},
      {name: "carrots", quantity: "2", unit: "medium"},
      {name: "garlic", quantity: "3", unit: "cloves"},
      {name: "ginger", quantity: "1", unit: "inch"},
      {name: "soy sauce", quantity: "3", unit: "tablespoons"},
      {name: "sesame oil", quantity: "2", unit: "tablespoons"},
      {name: "brown rice", quantity: "1", unit: "cup"}
    ],
    instructions: [
      "Press tofu to remove excess water, then cut into 1-inch cubes.",
      "Cook brown rice according to package instructions.",
      "Chop broccoli, bok choy, bell pepper, and carrots.",
      "Mince garlic and ginger.",
      "Heat 1 tablespoon sesame oil in a large wok or pan over medium-high heat.",
      "Add tofu and cook until golden on all sides, about 5 minutes. Remove and set aside.",
      "In the same pan, add the remaining oil, garlic, and ginger. Sauté for 30 seconds.",
      "Add the vegetables, starting with carrots, then broccoli, bell pepper, and finally bok choy.",
      "Stir fry for 5-7 minutes until vegetables are crisp-tender.",
      "Add the tofu back to the pan along with soy sauce. Toss to combine.",
      "Serve over brown rice."
    ],
    nutritional_info: {
      calories: 350,
      protein: "16g",
      carbs: "42g",
      fat: "14g",
      fiber: "8g",
      calcium: "250mg",
      iron: "3mg"
    },
    prep_time: "20 minutes",
    cook_time: "15 minutes",
    servings: 4
  },
  {
    id: "ai-fallback-3",
    title: "Omega-3 Rich Salmon Salad",
    description: "A protein-packed salad featuring salmon, loaded with omega-3 fatty acids and fresh vegetables.",
    cuisine: "mediterranean",
    dietary_tags: ["gluten-free", "high-protein"],
    allergen_free_tags: ["gluten", "nuts", "soy", "wheat"],
    rich_in: ["protein", "omega3", "vitaminD"],
    ingredients: [
      {name: "salmon fillet", quantity: "12", unit: "oz"},
      {name: "mixed greens", quantity: "4", unit: "cups"},
      {name: "cherry tomatoes", quantity: "1", unit: "cup"},
      {name: "cucumber", quantity: "1", unit: "medium"},
      {name: "avocado", quantity: "1", unit: "medium"},
      {name: "red onion", quantity: "1/4", unit: "cup"},
      {name: "olive oil", quantity: "2", unit: "tablespoons"},
      {name: "lemon juice", quantity: "1", unit: "tablespoon"},
      {name: "dijon mustard", quantity: "1", unit: "teaspoon"},
      {name: "salt", quantity: "1/2", unit: "teaspoon"},
      {name: "black pepper", quantity: "1/4", unit: "teaspoon"}
    ],
    instructions: [
      "Preheat oven to 400°F (200°C).",
      "Season salmon with salt and pepper and bake for 12-15 minutes until cooked through.",
      "While salmon is cooking, prepare the salad by combining mixed greens, halved cherry tomatoes, diced cucumber, and thinly sliced red onion.",
      "In a small bowl, whisk together olive oil, lemon juice, dijon mustard, salt, and pepper to make the dressing.",
      "Once salmon is cooked, let it cool slightly, then flake it into large pieces.",
      "Slice the avocado.",
      "Arrange the salad in bowls, top with salmon and avocado slices.",
      "Drizzle with the prepared dressing and serve."
    ],
    nutritional_info: {
      calories: 390,
      protein: "28g",
      carbs: "12g",
      fat: "26g",
      fiber: "6g",
      omega3: "1800mg",
      vitaminD: "12mcg"
    },
    prep_time: "15 minutes",
    cook_time: "15 minutes",
    servings: 4
  }
];

function filterFallbackRecipes(preferences: UserPreferences) {
  return fallbackRecipes
    .filter(recipe => {
      // Filter by dietary preferences
      if (preferences.dietary_preferences.length > 0 &&
          !preferences.dietary_preferences.some(pref => recipe.dietary_tags.includes(pref))) {
        return false;
      }
      
      // Filter out recipes containing allergens
      if (preferences.allergies.length > 0 &&
          !preferences.allergies.every(allergen => recipe.allergen_free_tags.includes(allergen))) {
        return false;
      }
      
      // Filter by nutritional needs
      if (preferences.deficiencies.length > 0 &&
          !preferences.deficiencies.some(def => recipe.rich_in.includes(def))) {
        return false;
      }
      
      // Filter by cuisine preference
      if (preferences.preferred_cuisines.length > 0 &&
          !preferences.preferred_cuisines.includes(recipe.cuisine)) {
        return false;
      }
      
      return true;
    })
    .map(recipe => ({
      ...recipe,
      isAIGenerated: true
    }));
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { preferences, testMode } = await req.json();
    
    // If in test mode, just verify the API key without generating full recipes
    if (testMode) {
      // Check if we have a key configured
      if (!openAIApiKey) {
        return new Response(JSON.stringify({ 
          apiKeyStatus: "invalid",
          message: "OpenAI API key is not configured", 
          fallback: true 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      // Verify the key works by making a simple request
      try {
        const response = await fetch('https://api.openai.com/v1/models', {
          headers: {
            'Authorization': `Bearer ${openAIApiKey}`,
          },
        });
        
        if (response.status === 200) {
          return new Response(JSON.stringify({ 
            apiKeyStatus: "valid",
            message: "OpenAI API key is valid"
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } else {
          return new Response(JSON.stringify({ 
            apiKeyStatus: "invalid",
            message: "OpenAI API key is invalid or has insufficient permissions", 
            fallback: true 
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      } catch (error) {
        return new Response(JSON.stringify({ 
          apiKeyStatus: "invalid",
          message: "Error verifying OpenAI API key: " + error.message, 
          fallback: true 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }
    
    // Try OpenAI API first
    try {
      // Format the preferences for the prompt
      const dietaryString = preferences.dietary_preferences.length > 0 
        ? `Dietary preferences: ${preferences.dietary_preferences.join(', ')}. ` 
        : '';
      
      const allergiesString = preferences.allergies.length > 0 
        ? `Avoid these allergens: ${preferences.allergies.join(', ')}. ` 
        : '';
      
      const deficienciesString = preferences.deficiencies.length > 0 
        ? `Include nutrients for: ${preferences.deficiencies.join(', ')}. ` 
        : '';
      
      const cuisinesString = preferences.preferred_cuisines.length > 0 
        ? `Preferred cuisines: ${preferences.preferred_cuisines.join(', ')}. ` 
        : '';
      
      // Additional personalization if provided
      const ageString = preferences.age ? `Age group: around ${preferences.age}. ` : '';
      const genderString = preferences.gender ? `Gender: ${preferences.gender}. ` : '';
      const activityString = preferences.activity_level 
        ? `Activity level: ${preferences.activity_level.replace('_', ' ')}. ` 
        : '';

      // Create the prompt
      const prompt = `Generate 3 healthy recipes based on the following preferences:
        ${dietaryString}${allergiesString}${deficienciesString}${cuisinesString}${ageString}${genderString}${activityString}
        
        For each recipe, include:
        1. A title
        2. A short description
        3. A list of ingredients with quantities
        4. Step-by-step cooking instructions
        5. Nutritional information
        6. How this recipe addresses the person's nutritional needs
        7. Preparation time and cooking time
        8. Number of servings
        
        Format the response as valid JSON with this structure:
        {
          "recipes": [
            {
              "id": "unique-id-1",
              "title": "Recipe Title",
              "description": "Short description",
              "cuisine": "one of these: italian, mexican, asian, mediterranean, american, indian, french, thai, japanese, greek",
              "dietary_tags": ["list", "of", "applicable", "dietary", "tags"],
              "allergen_free_tags": ["list", "of", "allergens", "not", "in", "recipe"],
              "rich_in": ["key", "nutrients"],
              "ingredients": [
                {"name": "ingredient 1", "quantity": "amount", "unit": "measurement unit"},
                {"name": "ingredient 2", "quantity": "amount", "unit": "measurement unit"}
              ],
              "instructions": ["step 1", "step 2", "step 3"],
              "nutritional_info": {
                "calories": 500,
                "protein": "20g",
                "carbs": "40g",
                "fat": "15g",
                "fiber": "8g",
                "other_nutrients": "values"
              },
              "prep_time": "15 minutes",
              "cook_time": "30 minutes",
              "servings": 4
            }
          ]
        }
      `;

      console.log("Sending request to OpenAI API");
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: 'You are a nutrition expert and professional chef.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      console.log("Received response from OpenAI API");
      
      if (data.error) {
        console.error("OpenAI API error:", data.error);
        throw new Error(data.error.message);
      }

      // Extract and parse the AI response
      const aiResponse = data.choices[0].message.content;
      
      try {
        // Parse the JSON response from GPT
        const parsedRecipes = JSON.parse(aiResponse);
        return new Response(JSON.stringify(parsedRecipes), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (parseError) {
        console.error("Error parsing OpenAI response:", parseError);
        throw new Error("Failed to parse recipe data");
      }
    } catch (aiError) {
      // If OpenAI API fails, use fallback recipes
      console.log("Falling back to predefined recipes due to error:", aiError.message);
      
      const filteredRecipes = filterFallbackRecipes(preferences);
      
      // If no recipes match after filtering, return all fallbacks
      const recipesToReturn = filteredRecipes.length > 0 
        ? filteredRecipes 
        : fallbackRecipes.map(recipe => ({...recipe, isAIGenerated: true}));
      
      return new Response(JSON.stringify({ 
        recipes: recipesToReturn,
        fallback: true,
        message: "Using fallback recipes due to AI service limitations."
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
  } catch (error) {
    console.error('Error in generate-recipes function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      fallback: true,
      recipes: fallbackRecipes.map(recipe => ({...recipe, isAIGenerated: true}))
    }), {
      status: 200, // Return 200 with fallback recipes instead of error
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
