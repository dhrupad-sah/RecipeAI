"use client"

import { useState } from 'react'
import Header from '@/components/Header'
import IngredientForm from '@/components/IngredientForm'
import RecipeDisplay from '@/components/RecipeDisplay'

export default function Home() {
  const [recipeData, setRecipeData] = useState<{ recipe: string } | null>(null)

  const handleRecipeGeneration = (data: { recipe: string }) => {
    setRecipeData(data)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <IngredientForm onRecipeGenerated={handleRecipeGeneration} />
        {recipeData && <RecipeDisplay recipeData={recipeData} />}
      </main>
    </div>
  )
}
