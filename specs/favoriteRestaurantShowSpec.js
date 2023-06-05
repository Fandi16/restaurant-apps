import FavoriteRestaurantSearchView from '../src/scripts/views/pages/liked-restaurant/FavoriteRestaurantSearchView';
import FavoriteRestauranthowPresenter from '../src/scripts/views/pages/liked-restaurant/favorite-Restaurant-show-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Showing all favorite Restaurant', () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('When no Restaurant have been liked', () => {
    it('should ask for the favorite Restaurant', () => {
      const favoriteRestaurant = spyOnAllFunctions(FavoriteRestaurantIdb);

      new FavoriteRestauranthowPresenter({
        view,
        favoriteRestaurant,
      });

      expect(favoriteRestaurant.getAllRestaurant).toHaveBeenCalledTimes(1);
    });

    it('should show the information that no Restaurant have been liked', (done) => {
      document.getElementById('Restaurant').addEventListener('Restaurant:updated', () => {
        expect(document.querySelectorAll('.Restaurant-item__not__found').length)
          .toEqual(1);

        done();
      });

      const favoriteRestaurant = spyOnAllFunctions(FavoriteRestaurantIdb);
      favoriteRestaurant.getAllRestaurant.and.returnValues([]);

      new FavoriteRestauranthowPresenter({
        view,
        favoriteRestaurant,
      });
    });
  });

  describe('When favorite Restaurant exist', () => {
    it('should show the Restaurant', (done) => {
      document.getElementById('Restaurant').addEventListener('Restaurant:updated', () => {
        expect(document.querySelectorAll('.Restaurant-item').length).toEqual(0);
        done();
      });

      const favoriteRestaurant = spyOnAllFunctions(FavoriteRestaurantIdb);
      favoriteRestaurant.getAllRestaurant.and.returnValues([
        {
          id: 11, title: 'A', vote_average: 3, overview: 'Sebuah Restaurant A',
        },
        {
          id: 22, title: 'B', vote_average: 4, overview: 'Sebuah Restaurant B',
        },
      ]);

      new FavoriteRestauranthowPresenter({
        view,
        favoriteRestaurant,
      });
    });
  });
});