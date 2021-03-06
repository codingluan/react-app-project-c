import { useState, useRef, useEffect } from "react"
import { useHistory } from "react-router-dom"

import { useFetch } from "../../hooks/useFetch"

import "./Create.css"

export default function Create() {
    const [title, setTitle] = useState("")
    const [method, setMethod] = useState("")
    const [cookingTime, setCookingTime] = useState("")
    const [newIngredient, setNewIngredient] = useState("")
    const [ingredients, setIngredients] = useState([])
    const ingredientsInput = useRef(null)
    const { postData, data } = useFetch("http://localhost:3000/recipes", "POST")
    const history = useHistory()

    const handleSubmit = e => {
        e.preventDefault()
        postData({ title, method, cookingTime: cookingTime + " minutes", ingredients })

    }

    useEffect(() => {
        if (data) {
            history.push("/")
        }

    }, [data, history])


    const handleAdd = e => {
        e.preventDefault()
        const ing = newIngredient.trim();

        if (ing && !ingredients.includes(ing)) {
            setIngredients(prevIngredients => {
                return [...prevIngredients, ing]
            })
        }
        setNewIngredient("")
        ingredientsInput.current.focus()
    }
    return (
        <div className="create">
            <h2 className="page-title">Add New Post</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Recipe Title:</span>
                    <input
                        type="text"
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                </label>

                <label>
                    <span>Recipe Ingredients:</span>
                    <div className="ingredients">
                        <input
                            type="text"
                            onChange={e => setNewIngredient(e.target.value)}
                            value={newIngredient}
                            ref={ingredientsInput}
                        />
                        <button className="btn" onClick={handleAdd}>add</button>
                    </div>
                </label>
                <p>Current ingredients: {ingredients.map(ing => <em key={ing}>{ing}, </em>)}</p>

                <label>
                    <span>Recipe Method:</span>
                    <textarea
                        onChange={e => setMethod(e.target.value)}
                        value={method}
                        required
                    />
                </label>

                <label>
                    <span>Cooking Time:</span>
                    <input
                        type="number"
                        onChange={e => setCookingTime(e.target.value)}
                        value={cookingTime}
                        required
                    />
                </label>

                <button className="btn">Submit</button>
            </form>
        </div>
    )
}