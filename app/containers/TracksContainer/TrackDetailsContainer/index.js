/**
 *
 * TrackDetailsContainer Container
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import { selectTrackDetails } from '../selectors';
import { tracksContainerCreators } from '../reducer';
import { TrackComponent } from '@app/components/TrackComponent/index';
import If from '@components/If';

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
      <If condition={!isEmpty(trackDetails)} otherwise={`No track details available for track id: ${trackId}`}>
        <TrackDetailsWrapper>
          <TrackComponent trackData={trackDetails} isShowDetails={true} />
        </TrackDetailsWrapper>
      </If>
    </Wrapper>
  );
}

TrackDetailsContainer.propTypes = {
  dispatchRequestTrackDetails: PropTypes.func,
  trackDetails: PropTypes.shape({
    wrapperType: PropTypes.string,
    country: PropTypes.string,
    primaryGenreName: PropTypes.string,
    collectionName: PropTypes.string,
    trackName: PropTypes.string,
    imageUrl: PropTypes.string,
    artworkUrl100: PropTypes.string,
    previewUrl: PropTypes.string,
    duration: PropTypes.number,
    trackTimeMillis: PropTypes.number,
    kind: PropTypes.string
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

// eslint-disable-next-line prettier/prettier
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(TrackDetailsContainer);

export const TrackDetailsContainerTest = compose(injectIntl)(TrackDetailsContainer);
