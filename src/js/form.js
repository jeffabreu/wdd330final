// form.js
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const editIndex = urlParams.get('edit');

    if (editIndex !== null) {
        // If editing, pre-fill the form with the recipe details
        const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        const recipeToEdit = recipes[editIndex];

        if (recipeToEdit) {
            document.getElementById('recipeName').value = recipeToEdit.name;

            // Clear existing ingredients list
            const ingredientsList = document.getElementById('ingredientsList');
            ingredientsList.innerHTML = '';

            // Display ingredients with delete option
            recipeToEdit.ingredients.forEach((ingredient, index) => {
                const li = document.createElement('li');
                li.textContent = ingredient;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => deleteIngredient(index));

                li.appendChild(deleteButton);
                ingredientsList.appendChild(li);
            });

            document.getElementById('instructions').value = recipeToEdit.instructions;
        }
    }
});

function deleteIngredient(index) {
    const ingredientsList = document.getElementById('ingredientsList');
    ingredientsList.removeChild(ingredientsList.childNodes[index]);
}
