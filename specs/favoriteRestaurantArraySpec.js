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
    // cara boros menghapus film dengan meng-copy film yang ada
    // kecuali film dengan id == id
    favoriteRestaurant = favoriteRestaurant.filter((Restaurant) => Restaurant.id != id);
    },
};
    
describe('Favorite Restaurant Array Contract Test Implementation', () => {
    afterEach(() => favoriteRestaurant = []);
    
    itActsAsFavoriteRestaurantModel(FavoriteRestaurantArray);
});