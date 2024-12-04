import { recipes } from "../json/recipes.js";

document.addEventListener("DOMContentLoaded", () => {
    const recipeContainer = document.getElementById("recipeContainer");

    // Loop through the imported recipes array
    recipes.forEach(recipe => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");

        recipeCard.innerHTML = `
            <img src="${recipe.images[0]?.path || 'images/default.jpg'}" alt="${recipe.name}" class="recipe-photo">
            <div class="recipe-details">
                <div class="recipe-title">${recipe.name}</div>
                <div class="recipe-category">${recipe.category || "Uncategorized"}</div>
                <a href="recipe-detail.html?recipe=${encodeURIComponent(recipe.name)}" class="view-recipe">View Recipe</a>
            </div>
        `;

        recipeContainer.appendChild(recipeCard);
    });
});
