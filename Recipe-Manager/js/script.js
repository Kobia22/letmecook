document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("recipeModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalImage = document.getElementById("modalImage");
    const modalDescription = document.getElementById("modalDescription");
    const modalIngredients = document.getElementById("modalIngredients");
    const modalInstructions = document.getElementById("modalInstructions");
    const closeButton = document.querySelector(".close-button");

    // Add event listener to all "View More" buttons
    document.querySelectorAll(".view-more-btn").forEach(button => {
        button.addEventListener("click", () => {
            const recipeName = button.previousElementSibling.previousElementSibling.textContent.toLowerCase().replace(/ /g, "_");
            const jsonFilePath = `json/${recipeName}.json`; // Assumes JSON files match the recipe name in lowercase and underscores

            // Fetch the recipe JSON file
            fetch(jsonFilePath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Could not fetch recipe data for ${recipeName}`);
                    }
                    return response.json();
                })
                .then(recipe => {
                    displayRecipeModal(recipe);
                })
                .catch(error => {
                    console.error("Error fetching recipe data:", error);
                });
        });
    });

    // Function to populate the modal with recipe details
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

        modal.style.display = "block";
    }

    // Close modal when "x" button is clicked
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close modal when clicking outside of it
    window.addEventListener("click", event => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
