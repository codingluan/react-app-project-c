import { useFetch } from "../../hooks/useFetch"

import RecipeList from "../../components/RecipeList"

import "./Home.css"

export default function Home() {
    const { data: recipes, isPending, error } = useFetch("http://localhost:3000/recipes")
    return (
        <div className="home">
            {error && <div className="error">{error}</div>}
            {isPending && <div className="loading">Loading recipes ...</div>}
            {recipes && <RecipeList recipes={recipes} />}
        </div>
    )
}