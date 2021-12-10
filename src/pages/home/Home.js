import { useEffect, useState } from "react"

import { projectFirestore } from "../../firebase/config"

import RecipeList from "../../components/RecipeList"

import "./Home.css"

export default function Home() {
    const [recipes, setRecipes] = useState(null)
    const [error, setError] = useState(false)
    const [isPending, setIsPending] = useState(false)

    useEffect(() => {
        setIsPending(true)
        const unsub = projectFirestore.collection("recipes").onSnapshot(snapshot => {
            if (snapshot.empty) {
                setError("No recipes to load")
                setIsPending(false)
            } else {
                let results = []
                snapshot.docs.forEach(doc => {
                    results.push({ id: doc.id, ...doc.data() })
                })
                setRecipes(results)
                setIsPending(false)
            }
        }, err => {
            setIsPending(false)
            setError(err.message)
        })
        return () => unsub()
    }, [])

    return (
        <div className="home">
            {error && <div className="error">{error}</div>}
            {isPending && <div className="loading">Loading recipes ...</div>}
            {recipes && <RecipeList recipes={recipes} />}
        </div>
    )
}