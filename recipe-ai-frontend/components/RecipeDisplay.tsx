import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface RecipeDisplayProps {
  recipeData: { recipe: string } | null
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipeData }) => {
  if (!recipeData || !recipeData.recipe) return null

  const { recipe } = recipeData

  const parseList = (text: string) => {
    return text.split('\n').filter(item => item.trim().startsWith('*')).map(item => item.trim().substring(1).trim())
  }

  const parts = recipe.split('\n')
  if (parts.length === 0) return null

  const [title, ...content] = parts
  const recipeTitle = title.replace('##', '').trim()

  const ingredientsStart = content.findIndex(item => item.includes('**Ingredients:**'))
  const instructionsStart = content.findIndex(item => item.includes('**Instructions:**'))
  const tipsStart = content.findIndex(item => item.includes('**Tips'))

  const ingredientsText = content.slice(ingredientsStart + 1, instructionsStart).join('\n')
  const ingredients = parseList(ingredientsText)

  const instructionsText = content.slice(instructionsStart + 1, tipsStart > -1 ? tipsStart : undefined).join('\n')
  const instructions = instructionsText.split('\n').filter(item => item.trim()).map(item => item.replace(/^\d+\.\s*/, '').replace(/\*\*/g, '').trim())

  const tips = tipsStart > -1 ? parseList(content.slice(tipsStart + 1).join('\n')) : []

  return (
    <Card className="mt-12">
      <CardHeader>
        <CardTitle className="text-4xl">{recipeTitle}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <h3 className="text-2xl font-semibold mb-4">Ingredients:</h3>
          <ul className="list-disc pl-8 space-y-2 text-xl">
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <Separator className="my-8" />
        <div>
          <h3 className="text-2xl font-semibold mb-4">Instructions:</h3>
          <ol className="list-decimal pl-8 space-y-4 text-xl">
            {instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
        {tips.length > 0 && (
          <>
            <Separator className="my-8" />
            <div>
              <h3 className="text-2xl font-semibold mb-4">Tips:</h3>
              <ul className="list-disc pl-8 space-y-2 text-xl">
                {tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default RecipeDisplay
