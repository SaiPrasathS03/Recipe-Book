async function fetchDetails(){
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
    const content = await response.json();
    console.log(content.meals);
    displayRecipes(content.meals);
}
fetchDetails()
function displayRecipes(meals){
    var recipeContainer = document.getElementById("recipe-container");
    meals.forEach(meal => {

        let recipeName = document.createElement("div");
        recipeName.className="recipe-name";
        recipeName.innerHTML =  `
            <img class="" src="${meal.strMealThumb}" alt="">
            <h3>${meal.strMeal}</h3>
            <a href="${meal.strYoutube}" target="_blank" >Don't know how to do? Click Here!</a>
        `;
        let recipeIng = document.createElement("div");
        recipeIng.className="recipe-ing";
        const ingredientsList = document.createElement("ol");

        for (let i = 1; i <= 20; i++) {
            const ingredientKey = `strIngredient${i}`;
            const measureKey = `strMeasure${i}`;
            const ingredient = meal[ingredientKey];
            const measure = meal[measureKey];

            if (ingredient && ingredient.trim() !== "") {
                const listItem = document.createElement("li");
                listItem.classList.add("ingredient-item");
                listItem.textContent = `${ingredient} - ${measure}`;
                ingredientsList.appendChild(listItem);
            }
        }
        recipeIng.appendChild(ingredientsList);
        let recipeSteps = document.createElement("div");
        recipeSteps.className="recipe-steps";
        recipeSteps.innerHTML =  `
            <p>${meal.strInstructions}</p>
        `;
        

        recipeContainer.appendChild(recipeName);
        recipeContainer.appendChild(recipeIng);
        recipeContainer.appendChild(recipeSteps);

    });
}
