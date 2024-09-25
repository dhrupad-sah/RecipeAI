import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'

interface IngredientFormProps {
  onRecipeGenerated: (recipe: { recipe: string }) => void
}

const IngredientForm: React.FC<IngredientFormProps> = ({ onRecipeGenerated }) => {
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:8000/get_recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients, instructions }),
      })
      const data = await response.json()
      onRecipeGenerated(data)
    } catch (error) {
      console.error('Error fetching recipe:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Enter Your Ingredients</CardTitle>
        <CardDescription>Provide ingredients and any special instructions</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ingredients">Ingredients</Label>
            <Textarea 
              id="ingredients"
              placeholder="Enter ingredients (comma-separated)" 
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="instructions">Special Instructions (optional)</Label>
            <Input 
              id="instructions"
              placeholder="E.g., vegetarian, low-carb, spicy" 
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" disabled={isLoading} onClick={handleSubmit} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Recipe...
            </>
          ) : (
            'Get Recipe'
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default IngredientForm
