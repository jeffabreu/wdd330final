// import { loadHeaderFooter, searchBar } from "./utils.mjs";
// import Alert from "./alert.js";

// const alertInstance = new Alert();
// alertInstance.AlertsDatafetch().then(() => alertInstance.buildAlertElements());

// async function main() {
  
//   searchBar();
// }

// main();

document.addEventListener('DOMContentLoaded', () => {
  let sliderInterval; // Variable to store the interval ID

  // Fetch the JSON data
  fetch('json/popular.json')
    .then(response => response.json())
    .then(data => {
      // Process the data and update the carousel
      const recipeCarouselElement = document.getElementById('container-images');

      data.forEach(recipe => {
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
      });

      const slider = document.querySelectorAll(".slider");
      const btnPrev = document.getElementById("prev-button");
      const btnNext = document.getElementById("next-button");

      let currentSlide = 0;

      function hideSlider() {
        slider.forEach(item => item.classList.remove("on"));
      }

      function showSlider() {
        slider[currentSlide].classList.add("on");
      }

      function nextSlider() {
        hideSlider();
        if (currentSlide == slider.length - 1) {
          currentSlide = 0;
        } else {
          currentSlide++;
        }
        showSlider();
      }

      function prevSlider() {
        hideSlider();
        if (currentSlide == 0) {
          currentSlide = slider.length - 1;
        } else {
          currentSlide--;
        }
        showSlider();
      }

      function startSliderInterval() {
        sliderInterval = setInterval(nextSlider, 3000); // Change 1000 to the desired interval in milliseconds (1 second in this example)
      }

      function stopSliderInterval() {
        clearInterval(sliderInterval);
      }

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
    })
    .catch(error => console.error('Error fetching data:', error));
});



const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}


// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}