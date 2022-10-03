import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { tracksContainerCreators } from './reducer';
import tracksContainerSaga from './saga';
import { selectTrackName, selectTracksContainer, selectTracksData } from './selectors';
import { debounce, get, isEmpty } from 'lodash';
import { Input, Card, Skeleton } from 'antd';
import T from '@components/T';
import For from '@app/components/For';
import If from '@app/components/If';
import TrackComponent from '@app/components/TrackComponent/index';

const { Search } = Input;

const TitleCard = styled(Card)`
  && {
    margin: 10px 0;
    max-width: ${props => props.maxwidth}px;
    color: ${props => props.color}px;
  }
`;

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${props => props.maxwidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${props => props.padding}px;
  }
`;

export function TracksContainer({
  maxwidth,
  padding,
  tracksError,
  tracksData,
  trackName,
  intl,
  dispatchTrackNames,
  dispatchClearTracksData
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadedTracksData = get(tracksData, 'results', null) || tracksError;
    if (loading && loadedTracksData) {
      setLoading(false);
    }
  }, [tracksData]);

  useEffect(() => {
    if (trackName && !tracksData?.results?.length) {
      dispatchTrackNames(trackName);
      setLoading(true);
    }
  }, []);

  const handleOnChange = trackname => {
    if (!isEmpty(trackname)) {
      dispatchTrackNames(trackname);
      setLoading(true);
    } else {
      dispatchClearTracksData();
    }
  };

  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderTracksList = () => {
    const loadedTrackSongs = get(tracksData, 'results', []);

    return (
      <If condition={!isEmpty(loadedTrackSongs) || loading}>
        <TitleCard>
          <Skeleton loading={loading} active>
            <For
              of={loadedTrackSongs}
              ParentComponent={Container}
              renderItem={(item, index) => <TrackComponent key={index} {...item} />}
            />
          </Skeleton>
        </TitleCard>
      </If>
    );
  };

  return (
    <Container maxwidth={maxwidth} padding={padding} data-testid="tracks-container">
      <TitleCard title={intl.formatMessage({ id: 'itunes_title' })} maxwidth={maxwidth}>
        <T id="track_search_default" paddingBottom={5} />
        <Search
          type="text"
          data-testid="search-bar"
          defaultValue={trackName}
          onChange={e => debouncedHandleOnChange(e.target.value)}
        />
      </TitleCard>

      {renderTracksList()}
    </Container>
  );
}

TracksContainer.propTypes = {
  maxwidth: PropTypes.number,
  padding: PropTypes.number,
  trackName: PropTypes.string,
  dispatchTrackNames: PropTypes.func,
  dispatchClearTracksData: PropTypes.func,
  intl: PropTypes.object,
  tracksError: PropTypes.object,
  tracksData: PropTypes.shape({
    results: PropTypes.array
  })
};

TracksContainer.defaultProps = {
  maxwidth: 500,
  padding: 20
};

const mapStateToProps = createStructuredSelector({
  tracksContainer: selectTracksContainer(),
  tracksData: selectTracksData(),
  trackName: selectTrackName()
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
