const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const resultsContainer = document.getElementById('results');
  const showAllBtn = document.getElementById('showAllBtn');

  let allMeals = [];

  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
      fetchMeals(query);
    }
  });

  showAllBtn.addEventListener('click', () => {
    renderMeals(allMeals.slice(5));
    showAllBtn.style.display = 'none';
  });
  function fetchMeals(query) {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        clearResults();
        if (data.meals) {
          allMeals = data.meals;
          renderMeals(allMeals.slice(0, 5));
          if (allMeals.length > 5) {
            showAllBtn.style.display = 'block';
          }
        } else {
          resultsContainer.innerHTML = '<p class="text-danger">No results found.</p>';
        }
      })
      .catch(error => {
        console.error('Error fetching meals:', error);
      });
  }
  function renderMeals(meals) {
    meals.forEach(meal => {
      const mealCard = document.createElement('div');
      mealCard.className = 'col-md-4 meal-card';
      mealCard.innerHTML = `
        <div class="card">
          <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
          <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">ID: ${meal.idMeal}</p>
            <p class="card-text">${meal.strInstructions.substring(0, 100)}...</p>
          </div>
        </div>
      `;
      resultsContainer.appendChild(mealCard);
    });
  }

  function clearResults() {
    resultsContainer.innerHTML = '';
    showAllBtn.style.display = 'none';
    allMeals = [];
  }