document.addEventListener('DOMContentLoaded', function() {
    function displayRecipes() {
        fetch('recipes/json/blueberry_smoothie.json')
            .then(response => response.json())
            .then(data => {
                const featuredRecipesContainer = document.getElementById('featured-recipes');
                const recipeCard = document.createElement('div');
                recipeCard.classList.add('recipe-card');

                recipeCard.innerHTML = `
                    <h3>${data.name}</h3>
                    <img src="${data.images[0].path}" alt="${data.images[0].description}">
                    <p>${data.description}</p>
                    <button class="view-more-btn" data-recipe='${JSON.stringify(data)}'>View More</button>
                `;

                featuredRecipesContainer.appendChild(recipeCard);

                const viewMoreButton = recipeCard.querySelector('.view-more-btn');
                viewMoreButton.addEventListener('click', function() {
                    const recipeData = JSON.parse(this.getAttribute('data-recipe'));
                    displayRecipeModal(recipeData);
                });
            })
            .catch(error => console.error('Error loading recipe data:', error));
    }

    function displayRecipeModal(recipe) {
        const modal = document.getElementById('recipeModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalImage = document.getElementById('modalImage');
        const modalDescription = document.getElementById('modalDescription');
        const modalIngredients = document.getElementById('modalIngredients');
        const modalInstructions = document.getElementById('modalInstructions');

        modalTitle.textContent = recipe.name;
        modalImage.src = recipe.images[0].path;
        modalImage.alt = recipe.images[0].description;
        modalDescription.textContent = recipe.description;

        modalIngredients.innerHTML = '';
        modalInstructions.innerHTML = '';

        recipe.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            modalIngredients.appendChild(li);
        });

        recipe.instructions.forEach(instruction => {
            const li = document.createElement('li');
            li.textContent = instruction;
            modalInstructions.appendChild(li);
        });

        modal.style.display = 'block';

        const closeButton = document.querySelector('.close-button');
        closeButton.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    displayRecipes();
});
