import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import { projectFirestore } from "../../firebase/config"

import { useTheme } from "../../hooks/useTheme"

import "./Recipe.css"

export default function Recipe() {
    const { mode } = useTheme()
    const { id } = useParams()

    const [recipe, setRecipe] = useState(null)
    const [error, setError] = useState(false)
    const [isPending, setIsPending] = useState(false)

    useEffect(() => {
        setIsPending(true)
        const unsub = projectFirestore.collection("recipes").doc(id).onSnapshot(doc => {
            if (doc.exists) {
                setIsPending(false)
                setRecipe(doc.data())
            } else {
                setIsPending(false)
                setError("Could not find that recipe")
            }
        }, err => {
            setIsPending(false)
            setError(err.message)
        })
        return () => unsub()
    }, [id])

    const handleClick = () => {
        projectFirestore.collection("recipes").doc(id).update({
            "title": "Something completely different"
        })
    }

    return (
        <div className={`recipe ${mode}`}>
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading">Loading ...</p>}
            {recipe && (
                <>
                    <h2 className="page-title">{recipe.title}</h2>
                    <p>Takes {recipe.cookingTime} to cook.</p>
                    <ul>
                        {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
                    </ul>
                    <p className="method">{recipe.method}</p>
                    <button onClick={handleClick}>Update me</button>
                </>
            )}
        </div>
    )
}