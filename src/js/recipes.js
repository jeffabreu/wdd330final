// recipe-details.js
document.addEventListener('DOMContentLoaded', () => {
  const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
  const recipeList = document.getElementById('recipeList');

  recipes.forEach((recipe, index) => {
      displayRecipeDetails(recipe, index);
  });
});

function displayRecipeDetails(recipe, index) {
  const recipeList = document.getElementById('recipeList');
  const li = document.createElement('li');

  // Display recipe details
  li.innerHTML = `
  <div class="recipe-card">
      <h2>${recipe.name}</h2>
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
      <button onclick="editRecipe(${index})">Edit</button>
      <button onclick="deleteRecipe(${index})">Delete</button>
  </div>
  `;

  recipeList.appendChild(li);
}

function viewAllRecipes() {
  window.location.href = 'recipe-details.html';
}

function editRecipe(index) {
  // Redirect to the form page with the index parameter
  window.location.href = `/add-recipe/index.html?edit=${index}`;
}

function deleteRecipe(index) {
  const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
  
  recipes.splice(index, 1);

  localStorage.setItem('recipes', JSON.stringify(recipes));

  // Reload the page to reflect changes
  window.location.reload();
}
