import LikeButtonPresenter from '/xampp/htdocs/Dicoding/front end expert/restaurant-apps/src/scripts/utils/like-button-presenter';
    
const createLikeButtonPresenterWithRestaurant = async (Restaurant) => {
    await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    Restaurant,
    });
};
    
export { createLikeButtonPresenterWithRestaurant };