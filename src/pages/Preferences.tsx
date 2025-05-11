
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { UserPreferences, DietaryPreference, Allergen, Deficiency, Cuisine } from "@/types/recipe";
import { getAllergens, getCuisines, getDeficiencies, getDietaryPreferences } from "@/data/recipes";

const steps = [
  "Dietary Preferences",
  "Allergies",
  "Nutritional Needs",
  "Cuisine Preferences",
  "Personal Details"
];

const Preferences = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<UserPreferences>({
    dietary_preferences: [],
    allergies: [],
    deficiencies: [],
    preferred_cuisines: []
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNext = () => {
    // Validate current step
    if (currentStep === 0 && preferences.dietary_preferences.length === 0) {
      toast({
        title: "Selection required",
        description: "Please select at least one dietary preference.",
        variant: "destructive"
      });
      return;
    }

    if (currentStep === 2 && preferences.deficiencies.length === 0) {
      toast({
        title: "Selection required",
        description: "Please select at least one nutritional focus area.",
        variant: "destructive"
      });
      return;
    }

    if (currentStep === 3 && preferences.preferred_cuisines.length === 0) {
      toast({
        title: "Selection required",
        description: "Please select at least one cuisine preference.",
        variant: "destructive"
      });
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Form completed
      navigate("/results", { state: { preferences } });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/");
    }
  };

  const toggleDietaryPreference = (preference: DietaryPreference) => {
    setPreferences(prev => {
      if (prev.dietary_preferences.includes(preference)) {
        return {
          ...prev,
          dietary_preferences: prev.dietary_preferences.filter(p => p !== preference)
        };
      } else {
        return {
          ...prev,
          dietary_preferences: [...prev.dietary_preferences, preference]
        };
      }
    });
  };

  const toggleAllergy = (allergy: Allergen) => {
    setPreferences(prev => {
      if (prev.allergies.includes(allergy)) {
        return {
          ...prev,
          allergies: prev.allergies.filter(a => a !== allergy)
        };
      } else {
        return {
          ...prev,
          allergies: [...prev.allergies, allergy]
        };
      }
    });
  };

  const toggleDeficiency = (deficiency: Deficiency) => {
    setPreferences(prev => {
      if (prev.deficiencies.includes(deficiency)) {
        return {
          ...prev,
          deficiencies: prev.deficiencies.filter(d => d !== deficiency)
        };
      } else {
        return {
          ...prev,
          deficiencies: [...prev.deficiencies, deficiency]
        };
      }
    });
  };

  const toggleCuisine = (cuisine: Cuisine) => {
    setPreferences(prev => {
      if (prev.preferred_cuisines.includes(cuisine)) {
        return {
          ...prev,
          preferred_cuisines: prev.preferred_cuisines.filter(c => c !== cuisine)
        };
      } else {
        return {
          ...prev,
          preferred_cuisines: [...prev.preferred_cuisines, cuisine]
        };
      }
    });
  };

  const handleAgeChange = (value: string) => {
    setPreferences(prev => ({
      ...prev,
      age: value ? parseInt(value) : undefined
    }));
  };

  const handleGenderChange = (value: "male" | "female" | "other") => {
    setPreferences(prev => ({
      ...prev,
      gender: value
    }));
  };

  const handleActivityLevelChange = (value: "sedentary" | "moderate" | "active" | "very_active") => {
    setPreferences(prev => ({
      ...prev,
      activity_level: value
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <p className="text-muted-foreground">Select all that apply to your diet:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {getDietaryPreferences().map((preference) => (
                <div key={preference} className="flex items-center space-x-2">
                  <Checkbox
                    id={preference}
                    checked={preferences.dietary_preferences.includes(preference)}
                    onCheckedChange={() => toggleDietaryPreference(preference)}
                  />
                  <Label htmlFor={preference} className="capitalize cursor-pointer">
                    {preference.replace(/-/g, ' ')}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <p className="text-muted-foreground">Select any allergies or intolerances you have:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {getAllergens().map((allergy) => (
                <div key={allergy} className="flex items-center space-x-2">
                  <Checkbox
                    id={allergy}
                    checked={preferences.allergies.includes(allergy)}
                    onCheckedChange={() => toggleAllergy(allergy)}
                  />
                  <Label htmlFor={allergy} className="capitalize cursor-pointer">
                    {allergy}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Select nutrients you'd like to focus on in your diet:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {getDeficiencies().map((deficiency) => (
                <div key={deficiency} className="flex items-center space-x-2">
                  <Checkbox
                    id={deficiency}
                    checked={preferences.deficiencies.includes(deficiency)}
                    onCheckedChange={() => toggleDeficiency(deficiency)}
                  />
                  <Label htmlFor={deficiency} className="capitalize cursor-pointer">
                    {deficiency.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <p className="text-muted-foreground">Select cuisines you enjoy:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {getCuisines().map((cuisine) => (
                <div key={cuisine} className="flex items-center space-x-2">
                  <Checkbox
                    id={cuisine}
                    checked={preferences.preferred_cuisines.includes(cuisine)}
                    onCheckedChange={() => toggleCuisine(cuisine)}
                  />
                  <Label htmlFor={cuisine} className="capitalize cursor-pointer">
                    {cuisine}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Optional: Tell us a bit more about yourself to help personalize recipes.
            </p>
            
            <div className="space-y-4">
              <Label htmlFor="age">Age Range</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {["Under 18", "18-30", "31-45", "46-60", "Over 60"].map((range, index) => (
                  <div key={range} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      id={`age-${index}`}
                      value={`${(index + 1) * 15}`} 
                      checked={preferences.age === (index + 1) * 15}
                      onClick={() => handleAgeChange(`${(index + 1) * 15}`)}
                    />
                    <Label htmlFor={`age-${index}`}>{range}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <Label>Gender</Label>
              <RadioGroup onValueChange={(value: any) => handleGenderChange(value)}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="gender-male" />
                    <Label htmlFor="gender-male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="gender-female" />
                    <Label htmlFor="gender-female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="gender-other" />
                    <Label htmlFor="gender-other">Other/Prefer not to say</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <Label>Activity Level</Label>
              <RadioGroup onValueChange={(value: any) => handleActivityLevelChange(value)}>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sedentary" id="activity-sedentary" />
                    <Label htmlFor="activity-sedentary">Sedentary (little or no exercise)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="activity-moderate" />
                    <Label htmlFor="activity-moderate">Moderate (light exercise 1-3 days/week)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="active" id="activity-active" />
                    <Label htmlFor="activity-active">Active (moderate exercise 3-5 days/week)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="very_active" id="activity-very-active" />
                    <Label htmlFor="activity-very-active">Very Active (hard exercise 6-7 days/week)</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Personalize Your Recipe Experience</CardTitle>
            <CardDescription>
              Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
            </CardDescription>
            <div className="w-full bg-muted h-2 rounded-full mt-4">
              <div 
                className="bg-primary h-full rounded-full transition-all"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`
                }}
              />
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            {renderStepContent()}
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {currentStep === 0 ? "Back to Home" : "Previous"}
            </Button>
            <Button onClick={handleNext}>
              {currentStep < steps.length - 1 ? (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Generate Recipes
                  <Check className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Preferences;
