// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
  let sliderInterval; // Variable to store the interval ID

  // Fetch JSON data from the 'popular.json' file
  fetch('json/popular.json')
    .then(response => response.json())
    .then(data => {
      // Process the data and update the carousel
      const recipeCarouselElement = document.getElementById('container-images');

      // Iterate through each recipe in the data
      data.forEach((recipe, index) => {
        // Create a div element for each recipe and add it to the carousel
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('slider');
        recipeCard.innerHTML = `
          <div><img src="${recipe.imageURL}" alt="${recipe.name}"></div>
          <div class="recipe-info">
            <h2>${recipe.name}</h2>
            <p>Type: ${recipe.type}</p>
            <p>Star Rate: ${recipe.starRate}</p>
          </div>
        `;
        recipeCarouselElement.appendChild(recipeCard);

        recipeCard.addEventListener('click', () => {
          // Redirect to the add recipe page with the recipe data as query parameters
          const queryParams = new URLSearchParams();

          // Check if it's an existing recipe (edit mode)
          if (index !== undefined) {
            queryParams.set('edit', index.toString());
          } else {
            queryParams.set('edit', '0'); // Set to '0' for a new recipe
          }

          // Add recipe data to query parameters
          queryParams.set('name', recipe.name);
          queryParams.set('ingredients', JSON.stringify(recipe.ingredients));
          queryParams.set('instructions', recipe.instructions);

          // Navigate to the add recipe page with the query parameters
          window.location.href = `/add-recipe/index.html?${queryParams.toString()}`;
        });
      });

      // Set up variables and functions for the image slider
      const slider = document.querySelectorAll(".slider");
      const btnPrev = document.getElementById("prev-button");
      const btnNext = document.getElementById("next-button");

      let currentSlide = 0;

      // Function to hide all slides
      function hideSlider() {
        slider.forEach(item => item.classList.remove("on"));
      }

      // Function to show the current slide
      function showSlider() {
        slider[currentSlide].classList.add("on");
      }

      // Function to move to the next slide
      function nextSlider() {
        hideSlider();
        if (currentSlide == slider.length - 1) {
          currentSlide = 0;
        } else {
          currentSlide++;
        }
        showSlider();
      }

      // Function to move to the previous slide
      function prevSlider() {
        hideSlider();
        if (currentSlide == 0) {
          currentSlide = slider.length - 1;
        } else {
          currentSlide--;
        }
        showSlider();
      }

      // Function to start the automatic slider interval
      function startSliderInterval() {
        sliderInterval = setInterval(nextSlider, 3000);
      }

      // Function to stop the automatic slider interval
      function stopSliderInterval() {
        clearInterval(sliderInterval);
      }

      // Event listeners for next and previous buttons
      btnNext.addEventListener("click", () => {
        stopSliderInterval();
        nextSlider();
        startSliderInterval();
      });

      btnPrev.addEventListener("click", () => {
        stopSliderInterval();
        prevSlider();
        startSliderInterval();
      });

      // Start the automatic slider
      startSliderInterval();
      // Call the function to update watch later items quantity
      updateWatchLaterItemsQuantity();
    })
    .catch(error => console.error('Error fetching data:', error));
});

// Additional code for meal search and details
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// Event listeners for search, meal selection, and recipe close
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
  mealDetailsContent.parentElement.classList.remove('showRecipe');
});

// Function to get meal list that matches with the ingredients
function getMealList() {
  let searchInputTxt = document.getElementById('search-input').value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
      let html = "";
      if (data.meals) {
        // Generate HTML for each meal in the list
        data.meals.forEach(meal => {
          html += `
            <div class="meal-item" data-id="${meal.idMeal}">
                <div class="meal-img">
                    <img src="${meal.strMealThumb}" alt="food">
                </div>
                <div class="meal-name">
                    <h3>${meal.strMeal}</h3>
                    <a href="#" class="recipe-btn">Open Recipe</a>
                </div>
            </div>
          `;
        });
        mealList.classList.remove('notFound');
      } else {
        // Display a message if no meals are found
        html = "Sorry, we didn't find anything in our database! Make sure you spelled it right.";
        mealList.classList.add('notFound');
      }

      // Update the meal list HTML
      mealList.innerHTML = html;
    });
}

// Function to get the recipe details of a selected meal
function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains('recipe-btn')) {
    // Retrieve the selected meal item
    let mealItem = e.target.parentElement.parentElement;
    // Fetch the recipe details using the meal's ID
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
      .then(response => response.json())
      .then(data => mealRecipeModal(data.meals));
  }
}

// Function to create a modal with meal recipe details
function mealRecipeModal(meal) {
  meal = meal[0];
  let html = `
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruct">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    <div class="recipe-meal-img">
        <img src="${meal.strMealThumb}" alt="">
    </div>
    <div class="recipe-link">
        <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
    </div>
    <button id="watchLaterBtn" class="watch-later">+ watch later</button>
  `;
  // Update the meal details content with the modal HTML
  mealDetailsContent.innerHTML = html;
  // Display the recipe modal
  mealDetailsContent.parentElement.classList.add('showRecipe');

  // Add event listener for Watch Later button
  const watchLaterBtn = document.getElementById('watchLaterBtn');
  watchLaterBtn.addEventListener('click', () => {
    addToWatchLater(meal);
  });
}

// Function to add a meal to Watch Later
function addToWatchLater(meal) {
  // Retrieve existing Watch Later items from local storage or initialize an empty array
  const watchLaterItems = JSON.parse(localStorage.getItem('watchLaterItems')) || [];

  // Check if the meal is already in Watch Later
  const isAlreadyInWatchLater = watchLaterItems.some(item => item.idMeal === meal.idMeal);

  if (!isAlreadyInWatchLater) {
    // Add the meal to Watch Later
    watchLaterItems.push(meal);

    // Update local storage
    localStorage.setItem('watchLaterItems', JSON.stringify(watchLaterItems));

    // Alert to identify it was added
    alert('Added to Watch Later!');

    // Update the watch later items quantity display
    updateWatchLaterItemsQuantity();
  } else {
    alert('This meal is already in Watch Later.');
  }
}

// Function to update the watch later items quantity display
// obs I need to use this in the other pages
function updateWatchLaterItemsQuantity() {
  const watchLaterItems = JSON.parse(localStorage.getItem('watchLaterItems')) || [];
  const watchLaterQuantity = watchLaterItems.length;

  // Update the quantity display
  const toWatchNumber = document.getElementById('to-watch-number');
  toWatchNumber.textContent = watchLaterQuantity.toString();
}
