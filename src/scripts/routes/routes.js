import Home from '../views/pages/home';
import favorite from '../views/pages/favorite';
import Detail from '../views/pages/detail';

const routes = {
  '/': Home, // default page
  '/Home': Home,
  '/favorite': favorite,
  '/detail/:id': Detail,
};

export default routes;
