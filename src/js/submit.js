
// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Check if recipes are already stored in local storage
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    // Populate existing recipes on the page
    recipes.forEach((recipe, index) => displayRecipe(recipe, index));

    // Form submission event listener
    const recipeForm = document.getElementById('recipeForm');
    recipeForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Retrieve form inputs
        const recipeName = document.getElementById('recipeName').value;
        const ingredients = getIngredients();
        const instructions = document.getElementById('instructions').value;

        // Check if in edit mode by looking for 'edit' parameter in the URL
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
    
    updateWatchLaterItemsQuantity();
});

// Function to add a new ingredient to the ingredients list
function addIngredient() {
    const ingredientInput = document.getElementById('ingredientInput');
    const ingredientsList = document.getElementById('ingredientsList');
    const ingredientValue = ingredientInput.value.trim();

    if (ingredientValue !== '') {
        // Create a list item for the new ingredient with a class 'ingredient-item'
        const li = document.createElement('li');
        li.textContent = ingredientValue;
        li.classList.add('ingredient-item'); // Add the 'ingredient-item' class

        // Create a delete button for the ingredient
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'x';

        // Add an event listener to the delete button to remove the ingredient
        deleteButton.addEventListener('click', function () {
            li.remove(); // Remove the ingredient when the delete button is clicked
        });

        // Append the ingredient and delete button to the list
        li.appendChild(deleteButton);
        ingredientsList.appendChild(li);

        // Clear the input field
        ingredientInput.value = '';
    }
}

// Function to retrieve ingredients from the ingredients list
function getIngredients() {
    const ingredientsList = document.getElementById('ingredientsList');
    return Array.from(ingredientsList.children).map(li => {
        // Remove the delete button text from the ingredient and trim whitespace
        return li.textContent.replace('x', '').trim();
    });
}

// Function to display a recipe in the recipe list
function displayRecipe(recipe) {
    const recipeList = document.getElementById('recipeList');
    const li = document.createElement('li');
    li.textContent = recipe.name;
    recipeList.appendChild(li);
}

// Function to update the watch later items quantity display
function updateWatchLaterItemsQuantity() {
    const watchLaterItems = JSON.parse(localStorage.getItem('watchLaterItems')) || [];
    const watchLaterQuantity = watchLaterItems.length;

    // Update the quantity display
    const toWatchNumber = document.getElementById('to-watch-number');
    toWatchNumber.textContent = watchLaterQuantity.toString();

}