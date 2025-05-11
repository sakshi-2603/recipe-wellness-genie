
import { useState, useRef } from "react";
import { Recipe } from "@/data/recipes";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Download, Plus, Trash } from "lucide-react";

interface ShoppingListProps {
  recipe: Recipe;
}

const ShoppingList: React.FC<ShoppingListProps> = ({ recipe }) => {
  const [items, setItems] = useState(
    recipe.ingredients.map((ingredient) => ({
      id: crypto.randomUUID(),
      name: `${ingredient.quantity} ${ingredient.unit || ""} ${ingredient.name}`.trim(),
      checked: false,
    }))
  );
  
  const [newItem, setNewItem] = useState("");
  const [servings, setServings] = useState(recipe.servings);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddItem = () => {
    if (newItem.trim()) {
      setItems([
        ...items,
        {
          id: crypto.randomUUID(),
          name: newItem.trim(),
          checked: false,
        },
      ]);
      setNewItem("");
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleAddItem();
    }
  };

  const toggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const adjustServings = (newServings: number) => {
    if (newServings >= 1) {
      setServings(newServings);
    }
  };

  const downloadShoppingList = () => {
    const text = `Shopping List for ${recipe.title} (${servings} servings)\n\n${items
      .map((item) => `□ ${item.name}`)
      .join("\n")}`;
      
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `shopping-list-${recipe.title.toLowerCase().replace(/\s+/g, "-")}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Shopping List</h2>
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => adjustServings(servings - 1)}
            disabled={servings <= 1}
            className="h-8 w-8"
          >
            -
          </Button>
          <span className="mx-2 min-w-[40px] text-center">
            {servings} {servings === 1 ? "serving" : "servings"}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => adjustServings(servings + 1)}
            className="h-8 w-8"
          >
            +
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between group"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={item.id}
                    checked={item.checked}
                    onCheckedChange={() => toggleItem(item.id)}
                  />
                  <Label
                    htmlFor={item.id}
                    className={`${
                      item.checked ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {item.name}
                  </Label>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2 mb-6">
        <Input
          ref={inputRef}
          placeholder="Add item to shopping list"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button size="icon" onClick={handleAddItem}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <Button onClick={downloadShoppingList} className="w-full">
        <Download className="mr-2 h-4 w-4" />
        Download Shopping List
      </Button>
    </div>
  );
};

export default ShoppingList;
