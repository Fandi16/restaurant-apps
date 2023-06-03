import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Searching Restaurant', () => {
  let presenter;
  let FavoriteRestaurant;

  const searchRestaurant = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    document.body.innerHTML = `
        <div id="Restaurant-search-container">
            <input id="query" type="text">
            <div class="Restaurant-result-container">
                <ul class="Restaurant">
                </ul>
            </div>
        </div>
        `;
  };

  const constructPresenter = () => {
    FavoriteRestaurant = spyOnAllFunctions(FavoriteRestaurantIdb);
    presenter = new FavoriteRestaurantSearchPresenter({favoriteRestaurant: FavoriteRestaurant});
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
      expect(document.querySelectorAll('.Restaurant').length)
        .toEqual(1);

      presenter._showFoundRestaurant([{
        id: 1,
        title: 'Satu',
      }, {
        id: 2,
        title: 'Dua',
      }]);
      expect(document.querySelectorAll('.Restaurant').length)
        .toEqual(2);
    });

    it('should show the title of the found Restaurant', () => {
      presenter._showFoundRestaurant([{
        id: 1,
        title: 'Satu',
      }]);
      expect(document.querySelectorAll('.Restaurant__title')
        .item(0).textContent)
        .toEqual('Satu');
    });

    it('should show the title of the found Restaurant', () => {
      presenter._showFoundRestaurant([{
        id: 1,
        title: 'Satu',
      }]);
      expect(document.querySelectorAll('.Restaurant__title')
        .item(0).textContent)
        .toEqual('Satu');

      presenter._showFoundRestaurant(
        [{
          id: 1,
          title: 'Satu',
        }, {
          id: 2,
          title: 'Dua',
        }],
      );

      const RestaurantTitles = document.querySelectorAll('.Restaurant__title');
          expect(RestaurantTitles.item(0).textContent)
            .toEqual('Satu');
          expect(RestaurantTitles.item(1).textContent)
            .toEqual('Dua');
        });

      it('should show - for found Restaurant without title', () => {
        presenter._showFoundRestaurant([{ id: 1 }]);

        expect(document.querySelectorAll('.Restaurant__title')
            .item(0).textContent)
            .toEqual('-');
      });

  it('should show the Restaurant found by Favorite Restaurant', (done) => {
      document.getElementById('Restaurant-search-container')
        .addEventListener('Restaurant:searched:updated', () => {
          expect(document.querySelectorAll('.Restaurant').length)
            .toEqual(3);
          done();
        });

    FavoriteRestaurant.searchRestaurant.withArgs( 'Restaurant a' )
        .and
        .returnValues([
          {
            id: 111,
            title: 'Restaurant abc',
          },
          {
            id: 222,
            title: 'ada juga Restaurant abcde',
          },
          {
            id: 333,
            title: 'ini juga boleh Restaurant a',
          },
        ]);

      searchRestaurant('Restaurant a');
    });

    it('should show the name of the Restaurant found by Favorite Restaurant', (done) => {
      document.getElementById('Restaurant-search-container')
        .addEventListener('Restaurant:searched:updated', () => {
          const RestaurantTitles = document.querySelectorAll('.Restaurant__title');
          expect(RestaurantTitles.item(0).textContent)
            .toEqual('Restaurant abc');
          expect(RestaurantTitles.item(1).textContent)
            .toEqual('ada juga Restaurant abcde');
          expect(RestaurantTitles.item(2).textContent)
            .toEqual('ini juga boleh Restaurant a');

          done();
        });

      FavoriteRestaurant.searchRestaurant.withArgs('Restaurant a')
        .and
        .returnValues([
          {
            id: 111,
            title: 'Restaurant abc',
          },
          {
            id: 222,
            title: 'ada juga Restaurant abcde',
          },
          {
            id: 333,
            title: 'ini juga boleh Restaurant a',
          },
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
      document.getElementById('Restaurant-search-container')
        .addEventListener('Restaurant:searched:updated', () => {
          expect(document.querySelectorAll('.Restaurant__not__found').length)
            .toEqual(1);
          done();
        });

      FavoriteRestaurant.searchRestaurant.withArgs('Restaurant a').and.returnValues([]);

      searchRestaurant('Restaurant a');
    });

    it('should not show any Restaurant', (done) => {
      document.getElementById('Restaurant-search-container').addEventListener('Restaurant:searched:updated', () => {
        expect(document.querySelectorAll('.Restaurant').length).toEqual(0);
        done();
      });

      FavoriteRestaurant.searchRestaurant.withArgs('Restaurant a').and.returnValues([]);

      searchRestaurant('Restaurant a');
    });
  });
} );
