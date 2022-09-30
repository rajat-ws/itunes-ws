import NotFound from '@containers/NotFoundPage/Loadable';
import TracksContainer from '@app/containers/TracksContainer/Loadable';
import routeConstants from '@utils/routeConstants';
export const routeConfig = {
  itunes: {
    component: TracksContainer,
    ...routeConstants.repos
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
