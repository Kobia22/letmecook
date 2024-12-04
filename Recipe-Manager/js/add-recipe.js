// Add Ingredient
document.getElementById('addIngredient').addEventListener('click', () => {
    const container = document.getElementById('ingredientsContainer');
    const newRow = document.createElement('div');
    newRow.classList.add('row');
    newRow.innerHTML = `
        <input type="text" name="ingredientName[]" placeholder="Ingredient Name" required>
        <input type="text" name="ingredientQuantity[]" placeholder="Quantity (e.g., 2 cups)" required>
        <select name="ingredientUnit[]">
            <option value="">Select Unit</option>
            <option value="grams">Grams</option>
            <option value="cups">Cups</option>
            <option value="teaspoons">Teaspoons</option>
            <option value="liters">Liters</option>
        </select>
        <button type="button" class="removeIngredient">Remove</button>
    `;
    container.appendChild(newRow);

    newRow.querySelector('.removeIngredient').addEventListener('click', () => {
        container.removeChild(newRow);
    });
});

// Add Procedure Step
document.getElementById('addProcedure').addEventListener('click', () => {
    const container = document.getElementById('procedureContainer');
    const newRow = document.createElement('div');
    newRow.classList.add('row');
    newRow.innerHTML = `
        <textarea name="procedure[]" placeholder="Step description" rows="3" required></textarea>
        <button type="button" class="removeStep">Remove</button>
    `;
    container.appendChild(newRow);

    newRow.querySelector('.removeStep').addEventListener('click', () => {
        container.removeChild(newRow);
    });
});

// Handle Form Submission
document.getElementById('recipeForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect form data
    const recipeName = document.querySelector('input[name="mealName"]').value;
    const recipeCategory = document.querySelector('select[name="mealCategory"]').value;
    const recipePhoto = document.querySelector('input[name="mealPhoto"]').value.replace(/^.*[\\/]/, ''); // Get file name only

    const ingredients = [];
    document.querySelectorAll('#ingredientsContainer .row').forEach(row => {
        const name = row.querySelector('input[name="ingredientName[]"]').value;
        const quantity = row.querySelector('input[name="ingredientQuantity[]"]').value;
        const unit = row.querySelector('select[name="ingredientUnit[]"]').value;
        ingredients.push({ name, quantity, unit });
    });

    const steps = [];
    document.querySelectorAll('#procedureContainer .row').forEach(row => {
        const step = row.querySelector('textarea[name="procedure[]"]').value;
        steps.push(step);
    });

    // Create the recipe object
    const recipe = {
        name: recipeName,
        category: recipeCategory,
        photo: recipePhoto,
        ingredients: ingredients,
        steps: steps
    };

    // Convert the object to JSON
    const recipeJSON = JSON.stringify(recipe, null, 2);

    // Create a downloadable file
    const blob = new Blob([recipeJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `${recipeName.replace(/\s+/g, '_').toLowerCase()}.json`; // File name
    downloadLink.textContent = 'Download Recipe JSON';

    // Add the link to the page temporarily
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // Notify user
    alert('Recipe JSON created! Check your downloads folder.');
});
