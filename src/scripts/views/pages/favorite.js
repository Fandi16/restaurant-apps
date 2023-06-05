import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import FavoriteRestaurantSearchView from '../pages/liked-restaurant/FavoriteRestaurantSearchView';
import FavoriteRestauranthowPresenter from '../pages/liked-restaurant/favorite-Restaurant-show-presenter';
import FavoriteRestaurantSearchPresenter from '../pages/liked-restaurant/favorite-restaurant-search-presenter';

const view = new FavoriteRestaurantSearchView();

const Like = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteRestauranthowPresenter({ view, favoriteRestaurant: FavoriteRestaurantIdb });
    new FavoriteRestaurantSearchPresenter({ view, favoriteRestaurant: FavoriteRestaurantIdb });
  },
};

export default Like;
