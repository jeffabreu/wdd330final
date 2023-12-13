document.addEventListener('DOMContentLoaded', () => {
    // Get the watch later list from local storage
    const watchLaterItems = JSON.parse(localStorage.getItem('watchLaterItems')) || [];

    // Get the main container to display the watch later list
    const watchLaterListContainer = document.getElementById('watchLaterList');

    // Check if there are items in the watch later list
    if (watchLaterItems.length > 0) {
        // Create HTML for each watch later item with a class which is 'watch-later-item' to style that
        const watchLaterListHTML = watchLaterItems.map(item => `
            <div class="watch-later-item">
                <h2 class="watch-later-title">${item.strMeal}</h2>
                <p class="watch-later-category">${item.strCategory}</p>
                <a class="watch-later-link" href="${item.strYoutube}" target="_blank">Watch Video</a>
                <button class="already-watched-btn" data-id="${item.idMeal}">- Already Watched</button>
            </div>
        `).join('');

        // Update the watch later list container with the HTML
        watchLaterListContainer.innerHTML = watchLaterListHTML;

        // Add event listeners to the "Already Watched" button so it can be deleted
        const alreadyWatchedButtons = document.querySelectorAll('.already-watched-btn');
        alreadyWatchedButtons.forEach(button => {
            button.addEventListener('click', () => {
                removeWatchLaterItem(button.dataset.id);
            });
        });
    } else {
        // Display a message if the watch later list is empty
        watchLaterListContainer.innerHTML = '<p>No items in the watch later list, go the the main page!</p>';
    }
});

// Function to remove a watch later item
function removeWatchLaterItem(id) {
    // Get the watch later list from local storage
    const watchLaterItems = JSON.parse(localStorage.getItem('watchLaterItems')) || [];

    // Find the index of the item with the specified ID
    const itemIndex = watchLaterItems.findIndex(item => item.idMeal === id);

    // Remove the item from the watch later list
    watchLaterItems.splice(itemIndex, 1);

    // Update local storage
    localStorage.setItem('watchLaterItems', JSON.stringify(watchLaterItems));

    // Re-render the watch later list
    document.dispatchEvent(new Event('DOMContentLoaded'));
}

