import { useState } from "react";

function App() {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);

  const searchRecipe = async () => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${ingredient}`
    );

    const data = await response.json();

    if (data.meals) {
      setRecipes(data.meals);
    } else {
      setRecipes([]);
    }
  };

  return (
    <div>
      <h1>Recipe Search App</h1>

      <input
        type="text"
        placeholder="Enter Ingredient"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
      />

      <button onClick={searchRecipe}>Search</button>

      {recipes.length === 0 ? (
        <h3>No Recipes Found</h3>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.idMeal}>
  <h3>{recipe.strMeal}</h3>

  <img
    src={recipe.strMealThumb}
    alt={recipe.strMeal}
    width="200"
  />

  <p>
    <b>Category:</b> {recipe.strCategory}
  </p>

  <p>
    <b>Area:</b> {recipe.strArea}
  </p>

  <p>
    {recipe.strInstructions?.substring(0, 200)}...
  </p>
</div>
  ))
)}
     </div>
  );
}

export default App;