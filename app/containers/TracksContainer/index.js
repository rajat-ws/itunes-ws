import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input, Card, Skeleton } from 'antd';
import { debounce, get, isEmpty } from 'lodash';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { injectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import T from '@components/T';
import For from '@app/components/For';
import If from '@app/components/If';
import TrackComponent from '@app/components/TrackComponent/index';
import tracksContainerSaga from './saga';
import { tracksContainerCreators } from './reducer';
import { selectTrackName, selectTracksData, selectTracksLoading } from './selectors';

const { Search } = Input;

const TitleCard = styled(Card)`
  && {
    margin: 0.5rem 0;
    color: ${props => props.color};
    width: 100%;
    max-width: ${props => props.maxWidth}rem;
  }
`;

const StyledSearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    margin: 0 auto;
    padding: ${props => props.padding}rem;
  }
`;

const TrackGrid = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: 0 auto;
`;

export function TracksContainer({
  maxWidth,
  padding,
  tracksData,
  trackName,
  intl,
  dispatchRequestTracksData,
  dispatchClearTracksData,
  tracksLoading
}) {
  const [currentPlayingTrack, setCurrentPlayingTrack] = useState(null);

  useEffect(() => {
    if (trackName && !tracksData?.results?.length) {
      dispatchRequestTracksData(trackName);
    }
  }, []);

  const handleOnChange = trackname => {
    if (!isEmpty(trackname)) {
      dispatchRequestTracksData(trackname);
    } else {
      dispatchClearTracksData();
    }
  };

  const handlePauseTrackWrapper = ref => {
    //track the current playing track
    setCurrentPlayingTrack(ref);
    const trackPaused = currentPlayingTrack?.current?.paused;
    // check if ref currentSrc matches with current playing track and if not, pause the current track
    if (!trackPaused && ref.current.src !== currentPlayingTrack?.current?.src) {
      currentPlayingTrack?.current?.pause();
    }
  };

  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderTracksList = () => {
    const loadedTrackSongs = get(tracksData, 'results', []);

    return (
      <If condition={!isEmpty(loadedTrackSongs) || tracksLoading}>
        <TitleCard>
          <Skeleton loading={tracksLoading} active>
            <For
              of={loadedTrackSongs}
              ParentComponent={TrackGrid}
              renderItem={(item, index) => (
                <TrackComponent
                  handlePauseTrackWrapper={handlePauseTrackWrapper}
                  trackUrl={item.previewUrl}
                  key={index}
                  imageUrl={item.artworkUrl100}
                  {...item}
                />
              )}
            />
          </Skeleton>
        </TitleCard>
      </If>
    );
  };

  return (
    <>
      <Container maxWidth={maxWidth} padding={padding} data-testid="tracks-container">
        <StyledSearchContainer>
          <TitleCard title={intl.formatMessage({ id: 'itunes_title' })} maxWidth={maxWidth}>
            <T id="track_search_default" paddingBottom={1} />
            <Search
              type="text"
              data-testid="search-bar"
              defaultValue={trackName}
              onChange={e => debouncedHandleOnChange(e.target.value)}
            />
          </TitleCard>
        </StyledSearchContainer>
      </Container>
      {renderTracksList()}
    </>
  );
}

TracksContainer.propTypes = {
  maxWidth: PropTypes.number,
  padding: PropTypes.number,
  trackName: PropTypes.string,
  dispatchRequestTracksData: PropTypes.func,
  dispatchClearTracksData: PropTypes.func,
  intl: PropTypes.object,
  tracksError: PropTypes.object,
  tracksLoading: PropTypes.bool,
  tracksData: PropTypes.shape({
    results: PropTypes.array
  })
};

TracksContainer.defaultProps = {
  padding: 2,
  maxWidth: 32
};

const mapStateToProps = createStructuredSelector({
  tracksData: selectTracksData(),
  trackName: selectTrackName(),
  tracksLoading: selectTracksLoading()
});

function mapDispatchToProps(dispatch) {
  const { requestGetTracks, clearTracksData } = tracksContainerCreators;
  return {
    dispatchRequestTracksData: trackName => dispatch(requestGetTracks(trackName)),
    dispatchClearTracksData: () => dispatch(clearTracksData())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  injectIntl,
  withConnect,
  memo,
  injectSaga({
    key: 'tracksContainer',
    saga: tracksContainerSaga
  })
)(TracksContainer);

export const TracksContainerTest = compose(injectIntl)(TracksContainer);
