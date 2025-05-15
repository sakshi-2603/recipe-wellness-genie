
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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { preferences } = await req.json();
    
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
      return new Response(JSON.stringify({ error: data.error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
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
      return new Response(JSON.stringify({ 
        error: "Failed to parse recipe data",
        rawResponse: aiResponse
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
  } catch (error) {
    console.error('Error in generate-recipes function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
