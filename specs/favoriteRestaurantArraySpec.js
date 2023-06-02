import { itActsAsFavoriteRestaurantModel } from './contract/favoriteRestaurantContract';
    
let favoriteRestaurant = [];
    
const FavoriteRestaurantArray = {
    getRestaurant(id) {
    if (!id) {
        return;
    }
    
    return favoriteRestaurant.find((Restaurant) => Restaurant.id == id);
    },
    
    getAllRestaurant() {
    return favoriteRestaurant;
    },
    
    putRestaurant(Restaurant) {
    if (!Restaurant.hasOwnProperty('id')) {
        return;
    }
    
    // pastikan id ini belum ada dalam daftar favoriteRestaurants
    if (this.getRestaurant(Restaurant.id)) {
        return;
    }
    
    favoriteRestaurant.push(Restaurant);
    },
    
    deleteRestaurant(id) {
    favoriteRestaurant = favoriteRestaurant.filter((Restaurant) => Restaurant.id != id);
    },
    searchRestaurant(query) {
    return this.getAllRestaurant()
      .filter((Restaurant) => {
        const loweredCaseRestaurantTitle = (Restaurant.title || '-').toLowerCase();
        const jammedRestaurantTitle = loweredCaseRestaurantTitle.replace(/\s/g, '');

        const loweredCaseQuery = query.toLowerCase();
        const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

        return jammedRestaurantTitle.indexOf(jammedQuery) !== -1;
      });
  },
};
    
describe('Favorite Restaurant Array Contract Test Implementation', () => {
    afterEach(() => favoriteRestaurant = []);
    
    itActsAsFavoriteRestaurantModel(FavoriteRestaurantArray);
});