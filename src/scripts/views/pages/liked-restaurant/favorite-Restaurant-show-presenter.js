class FavoriteRestauranthowPresenter {
  constructor({ view, favoriteRestaurant }) {
    this._view = view;
    this._favoriteRestaurant = favoriteRestaurant;

    this._showFavoriteRestaurant();
  }

  async _showFavoriteRestaurant() {
    const Restaurant = await this._favoriteRestaurant.getAllRestaurant();
    this._displayRestaurant(Restaurant);
  }

  _displayRestaurant(Restaurants) {
    this._view.showFavoriteRestaurant(Restaurants);
  }
}

export default FavoriteRestauranthowPresenter;
