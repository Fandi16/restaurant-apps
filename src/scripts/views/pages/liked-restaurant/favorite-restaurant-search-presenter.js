class FavoriteRestaurantSearchPresenter {
  constructor({ favoriteRestaurant }) {
    this._listenToSearchRequestByUser();
    this._favoriteRestaurant = favoriteRestaurant;
  }

  _listenToSearchRequestByUser() {
    this._queryElement = document.getElementById('query');
    this._queryElement.addEventListener('change', (event) => {
        this._searchRestaurant(event.target.value);
    });
    }
  async _searchRestaurant(latestQuery) {
    this._latestQuery = latestQuery.trim();
    let foundRestaurant;
    if (this._latestQuery.length > 0) {
      foundRestaurant = await this._favoriteRestaurant.searchRestaurant(this._latestQuery);
    } else {
      foundRestaurant = await this._favoriteRestaurant.getAllRestaurant();
    }

    this._showFoundRestaurant( foundRestaurant );
  }
  
_showFoundRestaurant(restaurants) {
  let html;
  if (restaurants.length > 0) {
    html = restaurants.reduce(
      (carry, restaurant) => carry.concat(`<li class="Restaurant"><span class="Restaurant__title">${restaurant.title || '-'}</span></li>`),
      '',
    );
  } else {
    html = '<div class="Restaurant__not__found">Film tidak ditemukan</div>';
  }

  document.querySelector('.Restaurant').innerHTML = html;

  document.getElementById('Restaurant-search-container').dispatchEvent(new Event('Restaurant:searched:updated'));
}



  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteRestaurantSearchPresenter;