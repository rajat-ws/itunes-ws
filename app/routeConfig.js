import NotFound from '@containers/NotFoundPage/Loadable';
import TracksContainer from '@app/containers/TracksContainer/Loadable';
import routeConstants from '@utils/routeConstants';
import TrackDetailsContainer from './containers/TracksContainer/TrackDetailsContainer/index';
export const routeConfig = {
  itunes: {
    component: TracksContainer,
    ...routeConstants.itunes
  },
  trackDetails: {
    component: TrackDetailsContainer,
    ...routeConstants.trackDetails
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
