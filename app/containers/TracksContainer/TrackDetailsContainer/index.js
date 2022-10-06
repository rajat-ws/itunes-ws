/**
 *
 * TrackDetailsContainer Container
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import { selectTrackDetails } from '../selectors';
import { tracksContainerCreators } from '../reducer';
import { TrackComponent } from '@app/components/TrackComponent/index';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
`;

const TrackDetailsWrapper = styled.div`
  padding: 2rem;
`;

export function TrackDetailsContainer({ dispatchRequestTrackDetails, trackDetails }) {
  const { trackId } = useParams();

  useEffect(() => {
    dispatchRequestTrackDetails(parseInt(trackId));
  }, [trackId]);

  return (
    <Wrapper>
      <TrackDetailsWrapper>
        <TrackComponent
          collectionName={trackDetails?.collectionName}
          trackName={trackDetails?.trackName}
          imageUrl={trackDetails?.artworkUrl100}
          trackUrl={trackDetails?.previewUrl}
        />
      </TrackDetailsWrapper>
    </Wrapper>
  );
}

TrackDetailsContainer.propTypes = {
  dispatchRequestTrackDetails: PropTypes.func,
  trackDetails: PropTypes.shape({
    artistName: PropTypes.string,
    country: PropTypes.string,
    primaryGenreName: PropTypes.string,
    collectionName: PropTypes.string,
    trackName: PropTypes.string,
    imageUrl: PropTypes.string,
    artworkUrl100: PropTypes.string,
    previewUrl: PropTypes.string
  })
};

const mapStateToProps = createStructuredSelector({
  trackDetails: selectTrackDetails()
});

function mapDispatchToProps(dispatch) {
  const { requestGetTrackDetails } = tracksContainerCreators;
  return {
    dispatchRequestTrackDetails: trackId => dispatch(requestGetTrackDetails(trackId))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(TrackDetailsContainer);

export const TrackDetailsContainerTest = compose(injectIntl)(TrackDetailsContainer);
