// Load the JSON file using require
const recipes = require('../recipes/json');

// Initialize the search bar and button
const searchBar = document.getElementById('recipe-search');
const addButton = document.getElementById('add-recipe');

// Define the filterRecipes function
function filterRecipes() {
  const searchQuery = searchBar.value.toLowerCase();
  const filteredRecipes = recipes.filter(recipe => {
    return recipe.name.toLowerCase().includes(searchQuery) ||
           recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchQuery)) ||
           recipe.instructions.some(instruction => instruction.toLowerCase().includes(searchQuery));
  });

  // Update the HTML content with the filtered recipes
  const recipeList = document.getElementById('recipe-list');
  recipeList.innerHTML = '';
  filteredRecipes.forEach(recipe => {
    const recipeHTML = `
      <div class="recipe">
        <h2>${recipe.name}</h2>
        <ul>
          ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
        <ol>
          ${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
        </ol>
      </div>
    `;
    recipeList.insertAdjacentHTML('beforeend', recipeHTML);
  });
}

// Add event listener to the search bar
searchBar.addEventListener('keyup', filterRecipes);


document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("recipeModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalImage = document.getElementById("modalImage");
    const modalDescription = document.getElementById("modalDescription");
    const modalIngredients = document.getElementById("modalIngredients");
    const modalInstructions = document.getElementById("modalInstructions");
    const closeButton = document.getElementsByClassName("close-button")[0];

    // Add event listeners to "View More" buttons
    const viewButtons = Array.from(document.getElementsByClassName("view-more-btn"));
    viewButtons.forEach(button => {
        button.addEventListener("click", async () => {
            const recipeName = button.previousElementSibling.previousElementSibling.textContent
                .toLowerCase()
                .replace(/ /g, "_");
            const jsonFilePath = `../recipes/json/${recipeName}.json`; // Path to JSON file

            // Fetch and display the JSON file
            try {
                const response = await fetch(jsonFilePath);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const recipe = await response.json();
                displayRecipeModal(recipe);
            } catch (error) {
                console.error("Error fetching recipe:", error);
            }
        });
    });

    // Function to populate modal with recipe data
    function displayRecipeModal(recipe) {
        modalTitle.textContent = recipe.name;
        modalImage.src = recipe.images[0].path;
        modalImage.alt = recipe.images[0].description;
        modalDescription.textContent = recipe.description;

        // Clear and populate ingredients
        modalIngredients.innerHTML = "";
        recipe.ingredients.forEach(ingredient => {
            const li = document.createElement("li");
            li.textContent = ingredient;
            modalIngredients.appendChild(li);
        });

        // Clear and populate instructions
        modalInstructions.innerHTML = "";
        recipe.instructions.forEach(instruction => {
            const li = document.createElement("li");
            li.textContent = instruction;
            modalInstructions.appendChild(li);
        });

        modal.style.display = "block"; // Show the modal
    }

    // Close modal when the "x" button is clicked
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close modal when clicking outside the modal content
    window.addEventListener("click", event => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

