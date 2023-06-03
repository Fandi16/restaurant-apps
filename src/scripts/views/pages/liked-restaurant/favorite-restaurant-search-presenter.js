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
  
_showFoundRestaurant(Restaurant) {
  let html;
  if (Restaurant && Restaurant.length > 0) {
    html = Restaurant.reduce(
      (carry, Restaurant) => carry.concat(`<li class="Restaurant"><span class="Restaurant__title">${Restaurant.title || '-'}</span></li>`),
      '',
    );
  } else {
    html = '<div class="Restaurant__not__found">Restaurant tidak ditemukan</div>';
  }

  document.querySelector('.Restaurant').innerHTML = html;

  document.getElementById('Restaurant-search-container').dispatchEvent(new Event('Restaurant:searched:updated'));
}



  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteRestaurantSearchPresenter;