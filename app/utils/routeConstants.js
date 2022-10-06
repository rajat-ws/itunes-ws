export default {
  itunes: {
    route: '/',
    props: {
      maxWidth: 32,
      padding: 20
    },
    exact: true
  },
  trackDetails: {
    route: '/tracks/:trackId',
    exact: true
  }
};
