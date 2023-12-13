// Wait for the DOM content
document.addEventListener('DOMContentLoaded', () => {
  // Retrieve stored recipes from localStorage or initialize an empty array
  const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

  // Get the recipe list element
  const recipeList = document.getElementById('recipeList');

  // Iterate through each recipe and display its details
  recipes.forEach((recipe, index) => {
      displayRecipeDetails(recipe, index);
  });
    updateWatchLaterItemsQuantity();
});

// Function to display recipe details in the recipe list
function displayRecipeDetails(recipe, index) {
  // Get the recipe list element
  const recipeList = document.getElementById('recipeList');

  // Create a list item for the recipe
  const li = document.createElement('li');

  // Display recipe details using HTML template
  li.innerHTML = `
    <div class="recipe-card">
        <h2 class="recipe-title">${recipe.name}</h2>
        <div class="recipe-details">
            <div>
                <h3><strong>Ingredients:</strong></h3>
                <ul>
                    ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
            
            <div>
                <h3><strong>Instructions:</strong></h3>
                <p>${recipe.instructions}</p>
            </div>
        </div>
        <div class="recipe-card-buttons">
        <button class="recipe-edit-button" onclick="editRecipe(${index})"><img src="/images/edit.png" alt="" srcset=""></button>
        <button class="recipe-edit-button" onclick="deleteRecipe(${index})"><img src="/images/trash.png" alt="" srcset=""></button>
        </div>
    </div>
  `;

  // Append the list item to the recipe list
  recipeList.appendChild(li);
}

// Function to navigate to the recipe details page
function viewAllRecipes() {
  // Redirect to the recipe details page
  window.location.href = 'recipe-details.html';
}

// Function to navigate to the edit form page with the specified index
function editRecipe(index) {
  // Redirect to the form page with the edit parameter
  window.location.href = `/add-recipe/index.html?edit=${index}`;
}

// Function to delete a recipe at the specified index
function deleteRecipe(index) {
  // Retrieve stored recipes from localStorage or initialize an empty array
  const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

  // Remove the recipe at the specified index
  recipes.splice(index, 1);

  // Update the recipes in localStorage
  localStorage.setItem('recipes', JSON.stringify(recipes));

  // Reload the page to reflect changes
  window.location.reload();
}

// Function to update the watch later items quantity display
function updateWatchLaterItemsQuantity() {
  const watchLaterItems = JSON.parse(localStorage.getItem('watchLaterItems')) || [];
  const watchLaterQuantity = watchLaterItems.length;

  // Update the quantity display
  const toWatchNumber = document.getElementById('to-watch-number');
  toWatchNumber.textContent = watchLaterQuantity.toString();

}