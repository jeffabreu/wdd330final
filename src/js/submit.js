document.addEventListener('DOMContentLoaded', () => {
    // Check if recipes are already stored in local storage
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    // Populate existing recipes
    recipes.forEach((recipe, index) => displayRecipe(recipe, index));

    // Form submission
    const recipeForm = document.getElementById('recipeForm');
    recipeForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const recipeName = document.getElementById('recipeName').value;
        const ingredients = getIngredients();
        const instructions = document.getElementById('instructions').value;

        const urlParams = new URLSearchParams(window.location.search);
        const editIndex = urlParams.get('edit');

        if (editIndex !== null) {
            // If editing, update the existing recipe
            const existingRecipe = recipes[editIndex];
            existingRecipe.name = recipeName;
            existingRecipe.ingredients = ingredients;
            existingRecipe.instructions = instructions;
        } else {
            // If not editing, create a new recipe
            const recipe = { name: recipeName, ingredients, instructions };
            recipes.push(recipe);
        }

        // Save the updated recipes to local storage
        localStorage.setItem('recipes', JSON.stringify(recipes));

        // Reload the page to reflect changes
        window.location.reload();
    });
});

function addIngredient() {
    const ingredientInput = document.getElementById('ingredientInput');
    const ingredientsList = document.getElementById('ingredientsList');
    const ingredientValue = ingredientInput.value.trim();

    if (ingredientValue !== '') {
        const li = document.createElement('li');
        li.textContent = ingredientValue;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () {
            // Remove the ingredient when the delete button is clicked
            li.remove();
        });

        // Append the ingredient and delete button to the list
        li.appendChild(deleteButton);
        ingredientsList.appendChild(li);

        // Clear the input
        ingredientInput.value = '';
    }
}


function getIngredients() {
    const ingredientsList = document.getElementById('ingredientsList');
    return Array.from(ingredientsList.children).map(li => {
        // Remove the delete button text from the ingredient
        return li.textContent.replace('Delete', '').trim();
    });
}

function displayRecipe(recipe) {
    const recipeList = document.getElementById('recipeList');
    const li = document.createElement('li');
    li.textContent = recipe.name;
    recipeList.appendChild(li);
}
