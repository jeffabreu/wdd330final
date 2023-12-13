// Wait for the DOM content
document.addEventListener('DOMContentLoaded', () => {
    // Check is the edit oarameter in on the url
    const urlParams = new URLSearchParams(window.location.search);
    const editIndex = urlParams.get('edit');
  
    // Check if the edit parameter is present
    if (editIndex !== null) {
      // If editing, retrieve stored recipes from localStorage or initialize an empty array
      const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
  
      // Retrieve the recipe to be edited based on the 'edit' index
      const recipeToEdit = recipes[editIndex];
  
      // Check if the recipe to edit exists
      if (recipeToEdit) {
        // Pre-fill the form with the details of the recipe being edited
        document.getElementById('recipeName').value = recipeToEdit.name;
  
        // Clean existing ingridient
        const ingredientsList = document.getElementById('ingredientsList');
        ingredientsList.innerHTML = '';
  
        // Display ingredien with delete option
        recipeToEdit.ingredients.forEach((ingredient, index) => {
          // Creates a list of items for the ingridients
          const li = document.createElement('li');
          li.textContent = ingredient;
          li.classList.add('ingredient-item'); // Add the 'ingredient-item' class
  
          // Add a delete button
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'x';
  
          // Add an event listener to the delete button to handle ingredient deletion
          deleteButton.addEventListener('click', () => deleteIngredient(index));
  
          // Append the delete button to the list item
          li.appendChild(deleteButton);
  
          // Append the list item to the ingredients list
          ingredientsList.appendChild(li);
        });
  
        // Set the instructions field with the instructions of the recipe being edited from the localstorage
        document.getElementById('instructions').value = recipeToEdit.instructions;
      }
    }
  
    // Call the function to update watch later items quantity
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
  