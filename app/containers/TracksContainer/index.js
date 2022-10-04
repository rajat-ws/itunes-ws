import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { tracksContainerCreators } from './reducer';
import tracksContainerSaga from './saga';
import { selectTrackName, selectTracksContainer, selectTracksData, selectTracksLoading } from './selectors';
import { debounce, get, isEmpty } from 'lodash';
import { Input, Card, Skeleton } from 'antd';
import T from '@components/T';
import For from '@app/components/For';
import If from '@app/components/If';
import TrackComponent from '@app/components/TrackComponent/index';

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
  justify-content: center;
  margin: 0 auto;
`;

export function TracksContainer({
  maxWidth,
  padding,
  tracksData,
  trackName,
  intl,
  dispatchTrackNames,
  dispatchClearTracksData,
  tracksLoading
}) {
  useEffect(() => {
    if (trackName && !tracksData?.results?.length) {
      dispatchTrackNames(trackName);
    }
  }, []);

  const handleOnChange = trackname => {
    if (!isEmpty(trackname)) {
      dispatchTrackNames(trackname);
    } else {
      dispatchClearTracksData();
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
              renderItem={(item, index) => <TrackComponent key={index} imgUrl={item.artworkUrl100} {...item} />}
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
  dispatchTrackNames: PropTypes.func,
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
  tracksContainer: selectTracksContainer(),
  tracksData: selectTracksData(),
  trackName: selectTrackName(),
  tracksLoading: selectTracksLoading()
});

function mapDispatchToProps(dispatch) {
  const { requestGetTracks, clearTracksData } = tracksContainerCreators;
  return {
    dispatchTrackNames: trackName => dispatch(requestGetTracks(trackName)),
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
