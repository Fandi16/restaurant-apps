class FavoriteRestaurantSearchPresenter {
  constructor ( { favoriteRestaurant, view } )
  {
    this._view = view;
    this._listenToSearchRequestByUser();
    this._favoriteRestaurant = favoriteRestaurant;
  }

  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
        this._searchRestaurant(latestQuery);
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
  
_showFoundRestaurant(Restaurants) {
  this._view.showFavoriteRestaurant( Restaurants );
}



  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteRestaurantSearchPresenter;