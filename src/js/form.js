// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the 'edit' parameter from the URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const editIndex = urlParams.get('edit');

    // Check if 'edit' parameter is present
    if (editIndex !== null) {
        // If editing, retrieve stored recipes from localStorage or initialize an empty array
        const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

        // Retrieve the recipe to be edited based on the 'edit' index
        const recipeToEdit = recipes[editIndex];

        // Check if the recipe to edit exists
        if (recipeToEdit) {
            // Pre-fill the form with the details of the recipe being edited
            document.getElementById('recipeName').value = recipeToEdit.name;

            // Clear existing ingredients list
            const ingredientsList = document.getElementById('ingredientsList');
            ingredientsList.innerHTML = '';

            // Display ingredients with delete option
            recipeToEdit.ingredients.forEach((ingredient, index) => {
                // Create a list item for each ingredient with a class 'ingredient-item'
                const li = document.createElement('li');
                li.textContent = ingredient;
                li.classList.add('ingredient-item'); // Add the 'ingredient-item' class

                // Create a delete button for each ingredient
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'x';

                // Add an event listener to the delete button to handle ingredient deletion
                deleteButton.addEventListener('click', () => deleteIngredient(index));

                // Append the delete button to the list item
                li.appendChild(deleteButton);

                // Append the list item to the ingredients list
                ingredientsList.appendChild(li);
            });

            // Set the instructions field with the instructions of the recipe being edited
            document.getElementById('instructions').value = recipeToEdit.instructions;
        }
    };
    updateWatchLaterItemsQuantity();
});

// Function to delete an ingredient based on its index
function deleteIngredient(index) {
    const ingredientsList = document.getElementById('ingredientsList');

    // Remove the list item at the specified index from the ingredients list
    ingredientsList.removeChild(ingredientsList.childNodes[index]);
}

// Function to update the watch later items quantity display
function updateWatchLaterItemsQuantity() {
    const watchLaterItems = JSON.parse(localStorage.getItem('watchLaterItems')) || [];
    const watchLaterQuantity = watchLaterItems.length;

    // Update the quantity display
    const toWatchNumber = document.getElementById('to-watch-number');
    toWatchNumber.textContent = watchLaterQuantity.toString();

}