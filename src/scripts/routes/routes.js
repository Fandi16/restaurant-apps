import Home from '../views/pages/home';
import favorite from '../views/pages/favorite';
import DetailRestaurant from '../views/pages/detail';

const routes = {
  '/': Home,
  '/Home': Home,
  '/favorite': favorite,
  '/detail/:id': DetailRestaurant,
};

export default routes;
