import LikeButtonPresenter from '/xampp/htdocs/Dicoding/front end expert/restaurant-apps/src/scripts/utils/like-button-presenter';
import FavoriteRestaurantIdb from '../../src/scripts/data/favorite-restaurant-idb';
    
const createLikeButtonPresenterWithRestaurant = async (Restaurant) => {
    await LikeButtonPresenter.init({
        likeButtonContainer: document.querySelector( '#likeButtonContainer' ),
        favoriteRestaurant: FavoriteRestaurantIdb,
        Restaurant,
    });
};
    
export { createLikeButtonPresenterWithRestaurant };