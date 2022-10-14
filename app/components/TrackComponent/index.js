/**
 *
 * TrackComponent
 *
 */

import React, { memo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Image, Typography } from 'antd';
import { isEmpty } from 'lodash';
import { colors, fonts } from '@app/themes/index';
import If from '@components/If';

const { Paragraph } = Typography;

const TrackCardContainer = styled(Card)`
  && {
    border-radius: 0.5rem;
    width: 25rem;
    border: 1px solid ${colors.secondary};
    text-align: center;
`;

const StyledDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSpan = styled.span`
  && {
    color: ${colors.background};
    ${fonts.weights.bold}
    ${fonts.size.big}
  }
`;

const PlayTrackBtn = styled.button`
  && {
    background-color: ${colors.background};
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    width: 100%;
    cursor: pointer;

    &:hover {
      background-color: ${colors.primaryLight};
      color: ${colors.text};
    }
  }
`;

const ShowDetailsBtn = styled.button`
  && {
    background-color: ${colors.primaryDark};
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    width: 100%;
    cursor: pointer;

    &:hover {
      background-color: ${colors.primaryLight};
      color: ${colors.text};
    }
  }
`;

const ButtonWrapper = styled.div`
  && {
    display: flex;
    gap: 1rem;
  }
`;

const ButtonLabel = styled.span`
  && {
    color: ${colors.text};
    ${fonts.weights.bold}
    ${fonts.size.big}
  }
`;

export function TrackComponent({ trackData, isShowDetailsButton, isShowDetails, handlePauseTrackWrapper }) {
  const [isTrackPlaying, setIsTrackPlaying] = useState(false);

  const {
    artistName,
    artworkUrl100: imageUrl,
    previewUrl,
    trackTimeMillis: trackDuration,
    collectionName,
    trackName,
    trackId,
    country,
    primaryGenreName,
    kind,
    wrapperType
  } = trackData;
  const audioRef = useRef(null);
  const history = useHistory();

  const handlePlayPauseBtn = e => {
    e.preventDefault();

    const isTrackPaused = audioRef.current?.paused;

    if (isTrackPaused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsTrackPlaying(!isTrackPlaying);
    handlePauseTrackWrapper(audioRef);
  };

  const handleTrackDetailsRoute = trackId => history.push(`/tracks/${trackId}`);

  return (
    <TrackCardContainer data-testid="track-component">
      <If condition={!isEmpty(imageUrl)} otherwise={<Image>No image available</Image>}>
        <Image src={imageUrl} width="80%" />
      </If>

      <StyledDescription>
        <If condition={!isEmpty(artistName)} otherwise={<Paragraph>No artist name available</Paragraph>}>
          <Paragraph>
            <StyledSpan> Artist name: </StyledSpan> {artistName}
          </Paragraph>
        </If>

        <If condition={!isEmpty(collectionName)} otherwise={<Paragraph>No collection name available</Paragraph>}>
          <Paragraph>
            <StyledSpan> Collection name: </StyledSpan> {collectionName}
          </Paragraph>
        </If>

        <If condition={!isEmpty(trackName)} otherwise={<Paragraph>No track name available</Paragraph>}>
          <Paragraph>
            <StyledSpan> Track name: </StyledSpan> {trackName}
          </Paragraph>
        </If>
        <If condition={isShowDetails}>
          <Paragraph>
            <StyledSpan> Country: </StyledSpan> {country}
          </Paragraph>
          <Paragraph>
            <StyledSpan> Kind: </StyledSpan> {kind}
          </Paragraph>
          <Paragraph>
            <StyledSpan> Genre: </StyledSpan> {primaryGenreName}
          </Paragraph>
          <Paragraph>
            <StyledSpan> Wrapper Type: </StyledSpan> {wrapperType}
          </Paragraph>

          {trackDuration && (
            <Paragraph>
              <StyledSpan> Duration: </StyledSpan> {Math.floor(trackDuration / 60000)}:
              {Math.floor(trackDuration / 1000) % 60}s
            </Paragraph>
          )}
        </If>
      </StyledDescription>

      <ButtonWrapper>
        <If condition={isShowDetailsButton}>
          <ShowDetailsBtn onClick={() => handleTrackDetailsRoute(trackId)}>
            <ButtonLabel> Show Details </ButtonLabel>
          </ShowDetailsBtn>
        </If>

        <PlayTrackBtn onClick={handlePlayPauseBtn}>
          <If
            condition={!audioRef.current?.paused && audioRef.current?.src}
            otherwise={<ButtonLabel> Play </ButtonLabel>}
          >
            <ButtonLabel> Pause </ButtonLabel>
          </If>
        </PlayTrackBtn>
      </ButtonWrapper>
      <audio src={previewUrl} ref={audioRef} data-testid="trackAudio" />
    </TrackCardContainer>
  );
}

export default memo(TrackComponent);

TrackComponent.defaultProps = {
  trackData: {}
};

TrackComponent.propTypes = {
  trackData: PropTypes.shape({
    artistId: PropTypes.number,
    trackTimeMillis: PropTypes.number,
    trackId: PropTypes.number,
    artistName: PropTypes.string,
    artworkUrl100: PropTypes.string,
    collectionName: PropTypes.string,
    trackName: PropTypes.string,
    maxWidth: PropTypes.number,
    songId: PropTypes.number,
    imageUrl: PropTypes.string,
    wrapperType: PropTypes.string,
    primaryGenreName: PropTypes.string,
    kind: PropTypes.string,
    country: PropTypes.string,
    previewUrl: PropTypes.string
  }),

  isShowDetailsButton: PropTypes.bool,
  isShowDetails: PropTypes.bool,
  handlePauseTrackWrapper: PropTypes.func
};
