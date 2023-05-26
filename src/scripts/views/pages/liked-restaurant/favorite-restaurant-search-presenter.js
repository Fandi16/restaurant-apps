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
    this._latestQuery = latestQuery;
      const foundRestaurant = await this._favoriteRestaurants.searchRestaurant(this.latestQuery);

    this._showFoundRestaurant(foundRestaurant);
  }

  _showFoundRestaurant(Restaurant) {
    const html = Restaurant.reduce(
      (carry, Restaurant) => carry.concat(`<li class="Restaurant"><span class="Restaurant__title">${Restaurant.title || '-'}</span></li>`),
      '',
    );

    document.querySelector( '.Restaurant' ).innerHTML = html;

     document.getElementById('Restaurant-search-container').dispatchEvent(new Event('Restaurants:searched:updated'));
  }



  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteRestaurantSearchPresenter;