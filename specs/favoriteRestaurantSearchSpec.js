import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/liked-restaurant/FavoriteRestaurantSearchView'

describe('Searching Restaurant', () => {
  let presenter;
  let FavoriteRestaurant;
  let view;

  const searchRestaurant = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () =>
  {
    view = new FavoriteRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    FavoriteRestaurant = spyOnAllFunctions(FavoriteRestaurantIdb);
    presenter = new FavoriteRestaurantSearchPresenter({favoriteRestaurant:FavoriteRestaurant ,view});
  };
    beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

 describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchRestaurant('Restaurant a');
         expect(presenter.latestQuery)
        .toEqual('Restaurant a');
    });

    it('should ask the model to search for Restaurant', () => {
      searchRestaurant( 'Restaurant a' );
    expect( FavoriteRestaurant.searchRestaurant ).toHaveBeenCalledWith( 'Restaurant a' );
    } );
  
    it('should show the found Restaurant', () => {
      presenter._showFoundRestaurant([{ id: 1 }]);
      expect(document.querySelectorAll('.Restaurant-item').length)
        .toEqual(0);

      presenter._showFoundRestaurant([{
        id: 1,
        title: 'Satu',
      }, {
        id: 2,
        title: 'Dua',
      }]);
      expect(document.querySelectorAll('.Restaurant').length)
        .toEqual(1);
    });

    it('should show the title of the found Restaurant', () => {
      presenter._showFoundRestaurant([{
        id: 1,
        title: 'Satu',
      }]);
      expect(document.querySelectorAll('.card_title')
        .item(0).textContent)
        .toEqual('-');
    });

    it('should show - when the Restaurant returned does not contain a title', (done) => {
      document.getElementById('Restaurant').addEventListener('Restaurant:updated', () => {
        const RestaurantTitles = document.querySelectorAll('.card_title');
        expect(RestaurantTitles.item(0).textContent).toEqual('-');

    done();
      });

      FavoriteRestaurant.searchRestaurant.withArgs('Restaurant a').and.returnValues([
        { id: 444 },
      ]);

      searchRestaurant('Restaurant a');
    });
  } );
  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
    searchRestaurant('');
      expect(presenter.latestQuery.length)
        .toEqual(0);

    searchRestaurant('');
      expect(presenter.latestQuery.length)
        .toEqual(0);

    searchRestaurant('');
      expect(presenter.latestQuery.length)
        .toEqual(0);

      searchRestaurant('\t');
      expect(presenter.latestQuery.length)
        .toEqual(0);
    });

    it('should show all favorite Restaurant', () => {
      searchRestaurant('');

    expect(FavoriteRestaurant.getAllRestaurant)
        .toHaveBeenCalled();
    });
  });
  describe('When no favorite Restaurant could be found', () => {
  it('should show the empty message', (done) => {
    document.getElementById('Restaurant').addEventListener('Restaurant:updated', () => {
      expect(document.querySelectorAll('.Restaurant__not__found').length).toEqual(1);
      done();
    });

    FavoriteRestaurant.searchRestaurant.withArgs('Restaurant a').and.returnValues([]);
    searchRestaurant('Restaurant a');
  });

  it('should not show any Restaurant', (done) => {
    document.getElementById('Restaurant').addEventListener('Restaurant:updated', () => {
      expect(document.querySelectorAll('.Restaurant').length).toEqual(1);
      done();
    });

    FavoriteRestaurant.searchRestaurant.withArgs('Restaurant a').and.returnValues([]);
    searchRestaurant('Restaurant a');
  });
});

} );
