import { createrestaurantsItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantSearchView {
  getTemplate() {
    return `
       <div class="content">
       <input id="query" type="text">
           <h2 class="content__heading">Your Liked Restaurant</h2>
           <div id="Restaurant" class="Restaurant">
           </div>
       </div>
       `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showRestaurant(Restaurants) {
    this.showFavoriteRestaurants(Restaurants);
  }

  showFavoriteRestaurant(Restaurants = []) {
    let html;
    if (Restaurants.length) {
      html = Restaurants.reduce((carry, Restaurant) => carry.concat(createrestaurantsItemTemplate(Restaurant)), '');
    } else {
      html = this._getEmptyRestaurantTemplate();
    }

    document.getElementById('Restaurant').innerHTML = html;

    document.getElementById('Restaurant').dispatchEvent(new Event('Restaurant:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return '<div class="Restaurant-item__not__found Restaurant__not__found">Tidak ada Restaurant untuk ditampilkan</div>';
  }
}

export default FavoriteRestaurantSearchView;
